import json
import os
import psycopg2
import psycopg2.extras
import hashlib
import secrets
from typing import Dict, Any

def hash_password(password: str, salt: str = None) -> tuple[str, str]:
    """Hash password with salt"""
    if salt is None:
        salt = secrets.token_hex(32)
    hashed = hashlib.pbkdf2_hmac('sha256', password.encode('utf-8'), salt.encode('utf-8'), 100000)
    return hashed.hex(), salt

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: User registration, login and session management
    Args: event with httpMethod, body
    Returns: User data with session token or error
    '''
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
            'body': ''
        }
    
    dsn = os.environ.get('DATABASE_URL')
    conn = psycopg2.connect(dsn)
    conn.autocommit = True
    cur = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
    
    try:
        if method == 'POST':
            body = json.loads(event.get('body', '{}'))
            action = body.get('action')
            
            if action == 'register':
                username = body.get('username', '').strip()
                email = body.get('email', '').strip()
                password = body.get('password', '')
                
                if len(username) < 3:
                    return {
                        'statusCode': 400,
                        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                        'body': json.dumps({'error': 'Имя пользователя должно быть минимум 3 символа'})
                    }
                
                if len(password) < 6:
                    return {
                        'statusCode': 400,
                        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                        'body': json.dumps({'error': 'Пароль должен быть минимум 6 символов'})
                    }
                
                cur.execute("SELECT id FROM users WHERE username = %s OR email = %s", (username, email))
                if cur.fetchone():
                    return {
                        'statusCode': 400,
                        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                        'body': json.dumps({'error': 'Пользователь с таким именем или email уже существует'})
                    }
                
                password_hash, salt = hash_password(password)
                session_token = secrets.token_urlsafe(32)
                
                cur.execute("""
                    INSERT INTO users (username, email, password_hash, salt, session_token, avatar_url)
                    VALUES (%s, %s, %s, %s, %s, %s)
                    RETURNING id, username, email, avatar_url, created_at
                """, (username, email, password_hash, salt, session_token, f'https://api.dicebear.com/7.x/avataaars/svg?seed={username}'))
                
                user = dict(cur.fetchone())
                user['session_token'] = session_token
                
                return {
                    'statusCode': 200,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps(user, default=str)
                }
            
            elif action == 'login':
                username = body.get('username', '').strip()
                password = body.get('password', '')
                
                cur.execute("SELECT * FROM users WHERE username = %s OR email = %s", (username, username))
                user = cur.fetchone()
                
                if not user:
                    return {
                        'statusCode': 401,
                        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                        'body': json.dumps({'error': 'Неверное имя пользователя или пароль'})
                    }
                
                password_hash, _ = hash_password(password, user['salt'])
                
                if password_hash != user['password_hash']:
                    return {
                        'statusCode': 401,
                        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                        'body': json.dumps({'error': 'Неверное имя пользователя или пароль'})
                    }
                
                session_token = secrets.token_urlsafe(32)
                cur.execute("UPDATE users SET session_token = %s, last_seen = NOW() WHERE id = %s", (session_token, user['id']))
                
                result = {
                    'id': user['id'],
                    'username': user['username'],
                    'email': user['email'],
                    'avatar_url': user['avatar_url'] or f'https://api.dicebear.com/7.x/avataaars/svg?seed={user["username"]}',
                    'bio': user.get('bio', ''),
                    'created_at': str(user['created_at']),
                    'session_token': session_token
                }
                
                return {
                    'statusCode': 200,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps(result)
                }
            
            elif action == 'verify':
                session_token = event.get('headers', {}).get('x-session-token') or event.get('headers', {}).get('X-Session-Token')
                
                if not session_token:
                    return {
                        'statusCode': 401,
                        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                        'body': json.dumps({'error': 'Нет токена сессии'})
                    }
                
                cur.execute("SELECT id, username, email, avatar_url, bio, created_at FROM users WHERE session_token = %s", (session_token,))
                user = cur.fetchone()
                
                if not user:
                    return {
                        'statusCode': 401,
                        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                        'body': json.dumps({'error': 'Неверный токен сессии'})
                    }
                
                cur.execute("UPDATE users SET last_seen = NOW() WHERE id = %s", (user['id'],))
                
                return {
                    'statusCode': 200,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps(dict(user), default=str)
                }
        
        return {
            'statusCode': 405,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Method not allowed'})
        }
    
    finally:
        cur.close()
        conn.close()