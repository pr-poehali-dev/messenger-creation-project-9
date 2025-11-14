"""
Business: Управление профилем пользователя (получение, обновление)
Args: event - dict с httpMethod, headers (X-Auth-Token), body (username, avatar_url, bio)
Returns: HTTP response с данными профиля или ошибкой
"""

import json
import os
import psycopg2
from psycopg2.extras import RealDictCursor
from typing import Dict, Any

DATABASE_URL = os.environ.get('DATABASE_URL')

def get_user_from_token(token: str, cur) -> Dict:
    user_id = int(token.split(':')[0])
    cur.execute(
        f"SELECT id, username, email, avatar_url, bio, status, last_seen, created_at, sound_enabled FROM t_p59162637_messenger_creation_p.users WHERE id = {user_id}"
    )
    return cur.fetchone()

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, PUT, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-Auth-Token',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }
    
    headers = event.get('headers', {})
    token = headers.get('x-auth-token') or headers.get('X-Auth-Token')
    
    if not token:
        return {
            'statusCode': 401,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Требуется авторизация'})
        }
    
    conn = psycopg2.connect(DATABASE_URL)
    cur = conn.cursor(cursor_factory=RealDictCursor)
    
    try:
        user = get_user_from_token(token, cur)
        
        if not user:
            return {
                'statusCode': 401,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Неверный токен'})
            }
        
        if method == 'GET':
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'isBase64Encoded': False,
                'body': json.dumps(dict(user), default=str)
            }
        
        elif method == 'PUT':
            body_data = json.loads(event.get('body', '{}'))
            username = body_data.get('username')
            avatar_url = body_data.get('avatar_url')
            bio = body_data.get('bio')
            sound_enabled = body_data.get('sound_enabled')
            
            updates = []
            if username:
                username_escaped = username.replace("'", "''")
                updates.append(f"username = '{username_escaped}'")
            if avatar_url is not None:
                avatar_escaped = avatar_url.replace("'", "''")
                updates.append(f"avatar_url = '{avatar_escaped}'")
            if bio is not None:
                bio_escaped = bio.replace("'", "''")
                updates.append(f"bio = '{bio_escaped}'")
            if sound_enabled is not None:
                updates.append(f"sound_enabled = {str(sound_enabled).upper()}")
            
            if updates:
                update_str = ', '.join(updates)
                cur.execute(
                    f"UPDATE t_p59162637_messenger_creation_p.users SET {update_str} WHERE id = {user['id']} RETURNING id, username, email, avatar_url, bio, status, last_seen, created_at, sound_enabled"
                )
                updated_user = cur.fetchone()
                conn.commit()
                
                return {
                    'statusCode': 200,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'isBase64Encoded': False,
                    'body': json.dumps(dict(updated_user), default=str)
                }
            
            return {
                'statusCode': 400,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Нет данных для обновления'})
            }
        
        return {
            'statusCode': 405,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Method not allowed'})
        }
    
    finally:
        cur.close()
        conn.close()