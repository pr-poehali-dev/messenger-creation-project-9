import json
import os
import psycopg2
import hashlib
import secrets
from typing import Dict, Any

def get_db_connection():
    return psycopg2.connect(os.environ['DATABASE_URL'])

def hash_password(password: str, salt: str) -> str:
    return hashlib.sha256((password + salt).encode()).hexdigest()

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    conn = get_db_connection()
    cur = conn.cursor()
    
    try:
        if method == 'POST':
            body = json.loads(event.get('body', '{}'))
            action = body.get('action')
            
            if action == 'register':
                email = body.get('email', '').strip().lower()
                username = body.get('username', '').strip()
                password = body.get('password', '')
                
                if not email or not username or not password:
                    return {
                        'statusCode': 400,
                        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                        'body': json.dumps({'error': 'Все поля обязательны'}),
                        'isBase64Encoded': False
                    }
                
                cur.execute(
                    "SELECT id FROM t_p59162637_messenger_creation_p.users WHERE email = %s",
                    (email,)
                )
                if cur.fetchone():
                    return {
                        'statusCode': 400,
                        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                        'body': json.dumps({'error': 'Email уже зарегистрирован'}),
                        'isBase64Encoded': False
                    }
                
                salt = secrets.token_hex(16)
                password_hash = hash_password(password, salt)
                session_token = secrets.token_hex(32)
                
                cur.execute("""
                    INSERT INTO t_p59162637_messenger_creation_p.users 
                    (email, username, password_hash, salt, session_token, created_at, last_seen)
                    VALUES (%s, %s, %s, %s, %s, NOW(), NOW())
                    RETURNING id
                """, (email, username, password_hash, salt, session_token))
                
                user_id = cur.fetchone()[0]
                conn.commit()
                
                return {
                    'statusCode': 200,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({
                        'user_id': user_id,
                        'username': username,
                        'email': email,
                        'session_token': session_token
                    }),
                    'isBase64Encoded': False
                }
            
            elif action == 'login':
                email = body.get('email', '').strip().lower()
                password = body.get('password', '')
                
                if not email or not password:
                    return {
                        'statusCode': 400,
                        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                        'body': json.dumps({'error': 'Email и пароль обязательны'}),
                        'isBase64Encoded': False
                    }
                
                cur.execute("""
                    SELECT id, username, email, password_hash, salt 
                    FROM t_p59162637_messenger_creation_p.users 
                    WHERE email = %s
                """, (email,))
                
                user = cur.fetchone()
                if not user:
                    return {
                        'statusCode': 401,
                        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                        'body': json.dumps({'error': 'Неверный email или пароль'}),
                        'isBase64Encoded': False
                    }
                
                user_id, username, user_email, stored_hash, salt = user
                
                if not salt:
                    return {
                        'statusCode': 500,
                        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                        'body': json.dumps({'error': 'Ошибка данных пользователя'}),
                        'isBase64Encoded': False
                    }
                
                password_hash = hash_password(password, salt)
                
                if password_hash != stored_hash:
                    return {
                        'statusCode': 401,
                        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                        'body': json.dumps({'error': 'Неверный email или пароль'}),
                        'isBase64Encoded': False
                    }
                
                session_token = secrets.token_hex(32)
                cur.execute("""
                    UPDATE t_p59162637_messenger_creation_p.users 
                    SET session_token = %s, last_seen = NOW() 
                    WHERE id = %s
                """, (session_token, user_id))
                conn.commit()
                
                return {
                    'statusCode': 200,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({
                        'user_id': user_id,
                        'username': username,
                        'email': user_email,
                        'session_token': session_token
                    }),
                    'isBase64Encoded': False
                }
        
        elif method == 'GET':
            params = event.get('queryStringParameters') or {}
            action = params.get('action')
            
            if action == 'profile':
                session_token = params.get('session_token')
                if not session_token:
                    return {
                        'statusCode': 401,
                        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                        'body': json.dumps({'error': 'Не авторизован'}),
                        'isBase64Encoded': False
                    }
                
                cur.execute("""
                    SELECT id, username, email, avatar_url, bio, phone, created_at
                    FROM t_p59162637_messenger_creation_p.users 
                    WHERE session_token = %s
                """, (session_token,))
                
                user = cur.fetchone()
                if not user:
                    return {
                        'statusCode': 401,
                        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                        'body': json.dumps({'error': 'Сессия недействительна'}),
                        'isBase64Encoded': False
                    }
                
                cur.execute("""
                    UPDATE t_p59162637_messenger_creation_p.users 
                    SET last_seen = NOW() 
                    WHERE session_token = %s
                """, (session_token,))
                conn.commit()
                
                return {
                    'statusCode': 200,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({
                        'user_id': user[0],
                        'username': user[1],
                        'email': user[2],
                        'avatar_url': user[3],
                        'bio': user[4],
                        'phone': user[5],
                        'created_at': user[6].isoformat() if user[6] else None
                    }),
                    'isBase64Encoded': False
                }
        
        return {
            'statusCode': 405,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Method not allowed'}),
            'isBase64Encoded': False
        }
    
    finally:
        cur.close()
        conn.close()