"""
Business: Отправка push-уведомлений через Firebase Cloud Messaging
Args: event - dict с httpMethod, body, headers с токеном
Returns: HTTP response с результатом отправки
"""

import json
import os
import psycopg2
from psycopg2.extras import RealDictCursor
from typing import Dict, Any, List
import requests

DATABASE_URL = os.environ.get('DATABASE_URL')
FCM_SERVER_KEY = os.environ.get('FCM_SERVER_KEY')

def extract_user_id(token: str) -> int:
    if not token:
        raise ValueError('Missing token')
    user_id = int(token.split(':')[0])
    return user_id

def send_push_notification(token: str, title: str, body: str, data: Dict = None) -> bool:
    if not FCM_SERVER_KEY or not token:
        return False
    
    headers = {
        'Authorization': f'key={FCM_SERVER_KEY}',
        'Content-Type': 'application/json'
    }
    
    payload = {
        'to': token,
        'notification': {
            'title': title,
            'body': body,
            'icon': '/icon-192.png',
            'badge': '/icon-192.png'
        },
        'data': data or {}
    }
    
    try:
        response = requests.post(
            'https://fcm.googleapis.com/fcm/send',
            headers=headers,
            json=payload,
            timeout=10
        )
        return response.status_code == 200
    except Exception:
        return False

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
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
    
    conn = psycopg2.connect(DATABASE_URL)
    cur = conn.cursor(cursor_factory=RealDictCursor)
    
    try:
        if method == 'POST':
            action = event.get('queryStringParameters', {}).get('action', 'register')
            body_data = json.loads(event.get('body', '{}'))
            
            if action == 'register':
                push_token = body_data.get('push_token')
                
                if not push_token:
                    return {
                        'statusCode': 400,
                        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                        'body': json.dumps({'error': 'push_token required'})
                    }
                
                push_token_escaped = push_token.replace("'", "''")
                
                cur.execute(
                    f"""
                    UPDATE t_p59162637_messenger_creation_p.users
                    SET push_token = '{push_token_escaped}', push_enabled = true
                    WHERE id = {current_user_id}
                    """
                )
                conn.commit()
                
                return {
                    'statusCode': 200,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'isBase64Encoded': False,
                    'body': json.dumps({'message': 'Push token registered'})
                }
            
            elif action == 'toggle':
                enabled = body_data.get('enabled', True)
                
                cur.execute(
                    f"""
                    UPDATE t_p59162637_messenger_creation_p.users
                    SET push_enabled = {enabled}
                    WHERE id = {current_user_id}
                    """
                )
                conn.commit()
                
                return {
                    'statusCode': 200,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'isBase64Encoded': False,
                    'body': json.dumps({'message': 'Push settings updated'})
                }
            
            elif action == 'send':
                user_ids: List[int] = body_data.get('user_ids', [])
                title: str = body_data.get('title', '')
                body_text: str = body_data.get('body', '')
                data: Dict = body_data.get('data', {})
                
                if not user_ids or not title or not body_text:
                    return {
                        'statusCode': 400,
                        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                        'body': json.dumps({'error': 'user_ids, title, body required'})
                    }
                
                user_ids_str = ','.join(str(uid) for uid in user_ids)
                
                cur.execute(
                    f"""
                    SELECT push_token FROM t_p59162637_messenger_creation_p.users
                    WHERE id IN ({user_ids_str}) AND push_enabled = true AND push_token IS NOT NULL
                    """
                )
                users = cur.fetchall()
                
                sent_count = 0
                for user in users:
                    if send_push_notification(user['push_token'], title, body_text, data):
                        sent_count += 1
                
                return {
                    'statusCode': 200,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'isBase64Encoded': False,
                    'body': json.dumps({'sent': sent_count, 'total': len(users)})
                }
        
        return {
            'statusCode': 405,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Method not allowed'})
        }
    
    except Exception as e:
        conn.rollback()
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': str(e)})
        }
    finally:
        cur.close()
        conn.close()
