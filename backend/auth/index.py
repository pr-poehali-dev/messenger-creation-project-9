"""
Business: Авторизация и регистрация пользователей с JWT токенами
Args: event - dict с httpMethod, body (JSON с email, password, username)
Returns: HTTP response с user и token или ошибкой
"""

import json
import os
import psycopg2
from psycopg2.extras import RealDictCursor
from typing import Dict, Any
import hashlib
import secrets
from datetime import datetime, timedelta

DATABASE_URL = os.environ.get('DATABASE_URL')
JWT_SECRET = os.environ.get('JWT_SECRET', 'default-secret-key')

def hash_password(password: str) -> str:
    return hashlib.sha256(password.encode()).hexdigest()

def generate_token(user_id: int) -> str:
    payload = f"{user_id}:{secrets.token_urlsafe(32)}"
    return payload

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-Auth-Token',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Method not allowed'})
        }
    
    body_data = json.loads(event.get('body', '{}'))
    path = event.get('queryStringParameters', {}).get('action', 'login')
    
    conn = psycopg2.connect(DATABASE_URL)
    cur = conn.cursor(cursor_factory=RealDictCursor)
    
    try:
        if path == 'register':
            username = body_data.get('username')
            email = body_data.get('email')
            password = body_data.get('password')
            full_name = body_data.get('full_name')
            
            if not username or not email or not password:
                return {
                    'statusCode': 400,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Username, email и password обязательны'})
                }
            
            email_escaped = email.replace("'", "''")
            username_escaped = username.replace("'", "''")
            cur.execute(
                f"SELECT id FROM t_p59162637_messenger_creation_p.users WHERE email = '{email_escaped}' OR username = '{username_escaped}'"
            )
            if cur.fetchone():
                return {
                    'statusCode': 400,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Email или username уже используется'})
                }
            
            password_hash = hash_password(password)
            full_name_escaped = full_name.replace("'", "''") if full_name else ''
            
            cur.execute(
                f"""
                INSERT INTO t_p59162637_messenger_creation_p.users 
                (username, email, password_hash, status, last_seen, created_at)
                VALUES ('{username_escaped}', '{email_escaped}', '{password_hash}', 'online', NOW(), NOW())
                RETURNING id, username, email, avatar_url, bio, status, last_seen, created_at
                """
            )
            user = cur.fetchone()
            conn.commit()
            
            token = generate_token(user['id'])
            
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'isBase64Encoded': False,
                'body': json.dumps({
                    'user': dict(user),
                    'token': token
                }, default=str)
            }
        
        else:
            email = body_data.get('email')
            password = body_data.get('password')
            
            if not email or not password:
                return {
                    'statusCode': 400,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Email и password обязательны'})
                }
            
            password_hash = hash_password(password)
            email_escaped = email.replace("'", "''")
            
            cur.execute(
                f"""
                SELECT id, username, email, avatar_url, bio, status, last_seen, created_at
                FROM t_p59162637_messenger_creation_p.users 
                WHERE email = '{email_escaped}' AND password_hash = '{password_hash}'
                """
            )
            user = cur.fetchone()
            
            if not user:
                return {
                    'statusCode': 401,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Неверный email или пароль'})
                }
            
            cur.execute(
                f"UPDATE t_p59162637_messenger_creation_p.users SET status = 'online', last_seen = NOW() WHERE id = {user['id']}"
            )
            conn.commit()
            
            token = generate_token(user['id'])
            
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'isBase64Encoded': False,
                'body': json.dumps({
                    'user': dict(user),
                    'token': token
                }, default=str)
            }
    
    finally:
        cur.close()
        conn.close()