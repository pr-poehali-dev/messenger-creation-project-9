import json
import os
import psycopg2
import bcrypt
import secrets
from typing import Dict, Any, Optional
from datetime import datetime

def get_db_connection():
    dsn = os.environ.get('DATABASE_URL')
    return psycopg2.connect(dsn)

def hash_password(password: str) -> str:
    salt = bcrypt.gensalt()
    return bcrypt.hashpw(password.encode('utf-8'), salt).decode('utf-8')

def verify_password(password: str, hashed: str) -> bool:
    return bcrypt.checkpw(password.encode('utf-8'), hashed.encode('utf-8'))

def generate_session_token() -> str:
    return secrets.token_urlsafe(32)

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    method = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-Session-Token',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    conn = None
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        
        if method == 'POST':
            body = json.loads(event.get('body', '{}'))
            action = body.get('action')
            
            if action == 'register':
                username = body.get('username', '').strip()
                email = body.get('email', '').strip()
                password = body.get('password', '')
                
                if not username or not email or not password:
                    return {
                        'statusCode': 400,
                        'headers': {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
                        'body': json.dumps({'error': 'Все поля обязательны'}),
                        'isBase64Encoded': False
                    }
                
                if len(username) < 3:
                    return {
                        'statusCode': 400,
                        'headers': {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
                        'body': json.dumps({'error': 'Имя пользователя должно быть не менее 3 символов'}),
                        'isBase64Encoded': False
                    }
                
                cursor.execute("SELECT id FROM players WHERE username = %s OR email = %s", (username, email))
                if cursor.fetchone():
                    return {
                        'statusCode': 400,
                        'headers': {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
                        'body': json.dumps({'error': 'Пользователь с таким именем или email уже существует'}),
                        'isBase64Encoded': False
                    }
                
                password_hash = hash_password(password)
                cursor.execute(
                    "INSERT INTO players (username, email, password_hash) VALUES (%s, %s, %s) RETURNING id",
                    (username, email, password_hash)
                )
                player_id = cursor.fetchone()[0]
                
                cursor.execute(
                    "INSERT INTO player_resources (player_id) VALUES (%s)",
                    (player_id,)
                )
                
                session_token = generate_session_token()
                conn.commit()
                
                return {
                    'statusCode': 200,
                    'headers': {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
                    'body': json.dumps({
                        'success': True,
                        'player_id': player_id,
                        'username': username,
                        'session_token': session_token
                    }),
                    'isBase64Encoded': False
                }
            
            elif action == 'login':
                username = body.get('username', '').strip()
                password = body.get('password', '')
                
                if not username or not password:
                    return {
                        'statusCode': 400,
                        'headers': {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
                        'body': json.dumps({'error': 'Введите имя пользователя и пароль'}),
                        'isBase64Encoded': False
                    }
                
                cursor.execute(
                    "SELECT id, username, password_hash FROM players WHERE username = %s OR email = %s",
                    (username, username)
                )
                player = cursor.fetchone()
                
                if not player or not verify_password(password, player[2]):
                    return {
                        'statusCode': 401,
                        'headers': {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
                        'body': json.dumps({'error': 'Неверное имя пользователя или пароль'}),
                        'isBase64Encoded': False
                    }
                
                player_id, username = player[0], player[1]
                session_token = generate_session_token()
                
                cursor.execute(
                    "UPDATE players SET last_login = CURRENT_TIMESTAMP WHERE id = %s",
                    (player_id,)
                )
                conn.commit()
                
                return {
                    'statusCode': 200,
                    'headers': {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
                    'body': json.dumps({
                        'success': True,
                        'player_id': player_id,
                        'username': username,
                        'session_token': session_token
                    }),
                    'isBase64Encoded': False
                }
        
        return {
            'statusCode': 405,
            'headers': {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
            'body': json.dumps({'error': 'Метод не поддерживается'}),
            'isBase64Encoded': False
        }
    
    except Exception as e:
        if conn:
            conn.rollback()
        return {
            'statusCode': 500,
            'headers': {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
            'body': json.dumps({'error': str(e)}),
            'isBase64Encoded': False
        }
    
    finally:
        if conn:
            cursor.close()
            conn.close()
