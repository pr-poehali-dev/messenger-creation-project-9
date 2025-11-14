"""
Business: Поиск контактов по номеру телефона (как в WhatsApp)
Args: event - dict с httpMethod, body (JSON с массивом phone_numbers)
Returns: HTTP response с массивом найденных контактов
"""

import json
import os
import psycopg2
from psycopg2.extras import RealDictCursor
from typing import Dict, Any, List

DATABASE_URL = os.environ.get('DATABASE_URL')

def extract_user_id(token: str) -> int:
    if not token:
        raise ValueError('Missing token')
    user_id = int(token.split(':')[0])
    return user_id

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
    
    headers = event.get('headers', {})
    token = headers.get('x-auth-token') or headers.get('X-Auth-Token')
    
    if not token:
        return {
            'statusCode': 401,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Unauthorized'})
        }
    
    try:
        current_user_id = extract_user_id(token)
    except Exception:
        return {
            'statusCode': 401,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Invalid token'})
        }
    
    if method == 'POST':
        body_data = json.loads(event.get('body', '{}'))
        phone_numbers = body_data.get('phone_numbers', [])
        
        if not phone_numbers or not isinstance(phone_numbers, list):
            return {
                'statusCode': 400,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'phone_numbers array required'})
            }
        
        conn = psycopg2.connect(DATABASE_URL)
        cur = conn.cursor(cursor_factory=RealDictCursor)
        
        try:
            escaped_phones = [p.replace("'", "''") for p in phone_numbers]
            phones_str = "', '".join(escaped_phones)
            
            cur.execute(
                f"""
                SELECT id, username, phone, avatar_url, bio, status, last_seen
                FROM t_p59162637_messenger_creation_p.users 
                WHERE phone IN ('{phones_str}') AND id != {current_user_id}
                """
            )
            contacts = cur.fetchall()
            
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'isBase64Encoded': False,
                'body': json.dumps({
                    'contacts': [dict(c) for c in contacts]
                }, default=str)
            }
        
        finally:
            cur.close()
            conn.close()
    
    if method == 'GET':
        conn = psycopg2.connect(DATABASE_URL)
        cur = conn.cursor(cursor_factory=RealDictCursor)
        
        try:
            cur.execute(
                f"""
                SELECT id, username, phone, avatar_url, bio, status, last_seen
                FROM t_p59162637_messenger_creation_p.users 
                WHERE id != {current_user_id} AND phone IS NOT NULL
                ORDER BY username
                """
            )
            all_users = cur.fetchall()
            
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'isBase64Encoded': False,
                'body': json.dumps({
                    'contacts': [dict(u) for u in all_users]
                }, default=str)
            }
        
        finally:
            cur.close()
            conn.close()
    
    return {
        'statusCode': 405,
        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'error': 'Method not allowed'})
    }
