"""
Business: Управление статусом набора текста пользователем
Args: event - dict с httpMethod, headers (X-Auth-Token), body (receiver_id, is_typing)
Returns: HTTP response с подтверждением или статусом набора
"""

import json
import os
import psycopg2
from psycopg2.extras import RealDictCursor
from typing import Dict, Any
from datetime import datetime, timedelta

DATABASE_URL = os.environ.get('DATABASE_URL')

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
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
    
    user_id = int(token.split(':')[0])
    
    conn = psycopg2.connect(DATABASE_URL)
    cur = conn.cursor(cursor_factory=RealDictCursor)
    
    try:
        if method == 'POST':
            body_data = json.loads(event.get('body', '{}'))
            receiver_id = body_data.get('receiver_id')
            is_typing = body_data.get('is_typing', False)
            
            if not receiver_id:
                return {
                    'statusCode': 400,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'receiver_id обязателен'})
                }
            
            if is_typing:
                cur.execute(
                    f"""
                    UPDATE t_p59162637_messenger_creation_p.users
                    SET typing_to = {receiver_id}, typing_updated_at = NOW()
                    WHERE id = {user_id}
                    """
                )
            else:
                cur.execute(
                    f"""
                    UPDATE t_p59162637_messenger_creation_p.users
                    SET typing_to = NULL, typing_updated_at = NULL
                    WHERE id = {user_id}
                    """
                )
            
            conn.commit()
            
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'isBase64Encoded': False,
                'body': json.dumps({'success': True})
            }
        
        elif method == 'GET':
            params = event.get('queryStringParameters', {})
            check_user_id = params.get('user_id')
            
            if not check_user_id:
                return {
                    'statusCode': 400,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'user_id обязателен'})
                }
            
            cur.execute(
                f"""
                SELECT typing_to, typing_updated_at
                FROM t_p59162637_messenger_creation_p.users
                WHERE id = {check_user_id}
                """
            )
            result = cur.fetchone()
            
            if not result:
                return {
                    'statusCode': 404,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Пользователь не найден'})
                }
            
            is_typing = False
            if result['typing_to'] == user_id and result['typing_updated_at']:
                time_diff = datetime.now() - result['typing_updated_at']
                if time_diff < timedelta(seconds=5):
                    is_typing = True
            
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'isBase64Encoded': False,
                'body': json.dumps({
                    'is_typing': is_typing,
                    'typing_to': result['typing_to']
                })
            }
        
        return {
            'statusCode': 405,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Method not allowed'})
        }
    
    finally:
        cur.close()
        conn.close()
