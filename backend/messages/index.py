"""
Business: Получение и отправка сообщений между пользователями
Args: event - dict с httpMethod, headers (X-Auth-Token), body (receiver_id, content)
Returns: HTTP response с сообщениями или подтверждением отправки
"""

import json
import os
import psycopg2
from psycopg2.extras import RealDictCursor
from typing import Dict, Any
import urllib.request

DATABASE_URL = os.environ.get('DATABASE_URL')
PUSH_NOTIFICATION_URL = 'https://functions.poehali.dev/349e57c3-d568-47bc-9b6a-3d8bcefee4d7'

def send_push_notification(receiver_id: int, sender_name: str, message_content: str, cur):
    """Отправка push-уведомления получателю"""
    try:
        cur.execute(
            f"SELECT push_subscription FROM t_p59162637_messenger_creation_p.users WHERE id = {receiver_id}"
        )
        user = cur.fetchone()
        
        if not user or not user.get('push_subscription'):
            return
        
        subscription = json.loads(user['push_subscription'])
        
        notification_data = {
            'action': 'send',
            'subscription': subscription,
            'data': {
                'title': f'Сообщение от {sender_name}',
                'body': message_content[:100],
                'url': '/',
                'tag': 'new-message'
            }
        }
        
        req = urllib.request.Request(
            PUSH_NOTIFICATION_URL,
            data=json.dumps(notification_data).encode('utf-8'),
            headers={'Content-Type': 'application/json'},
            method='POST'
        )
        
        with urllib.request.urlopen(req, timeout=5) as response:
            pass
            
    except Exception as e:
        print(f'Failed to send push notification: {e}')

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
            'body': json.dumps({'error': 'Требуется авторизация'})
        }
    
    user_id = int(token.split(':')[0])
    
    conn = psycopg2.connect(DATABASE_URL)
    cur = conn.cursor(cursor_factory=RealDictCursor)
    
    try:
        if method == 'GET':
            query_params = event.get('queryStringParameters', {})
            other_user_id = query_params.get('user_id')
            
            if not other_user_id:
                return {
                    'statusCode': 400,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'user_id обязателен'})
                }
            
            cur.execute(
                f"""
                SELECT m.id, m.sender_id, m.receiver_id, m.text as content, m.file_url, m.file_name, m.file_type, 
                       m.created_at, m.is_edited, m.is_removed, m.edited_at,
                       u.username as sender_name, u.avatar_url as sender_avatar
                FROM t_p59162637_messenger_creation_p.messages m
                JOIN t_p59162637_messenger_creation_p.users u ON m.sender_id = u.id
                WHERE ((m.sender_id = {user_id} AND m.receiver_id = {other_user_id})
                   OR (m.sender_id = {other_user_id} AND m.receiver_id = {user_id}))
                   AND m.is_removed = false
                ORDER BY m.created_at ASC
                """
            )
            messages = cur.fetchall()
            
            cur.execute(
                f"UPDATE t_p59162637_messenger_creation_p.messages SET is_read = true WHERE receiver_id = {user_id} AND sender_id = {other_user_id}"
            )
            conn.commit()
            
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'isBase64Encoded': False,
                'body': json.dumps([dict(m) for m in messages], default=str)
            }
        
        elif method == 'POST':
            body_data = json.loads(event.get('body', '{}'))
            receiver_id = body_data.get('receiver_id')
            content = body_data.get('content', '')
            file_url = body_data.get('file_url')
            file_name = body_data.get('file_name')
            file_type = body_data.get('file_type')
            voice_url = body_data.get('voice_url')
            voice_duration = body_data.get('voice_duration')
            
            if not receiver_id or (not content and not file_url and not voice_url):
                return {
                    'statusCode': 400,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'receiver_id и content, file_url или voice_url обязательны'})
                }
            
            content_escaped = content.replace("'", "''") if content else ''
            file_url_escaped = file_url.replace("'", "''") if file_url else 'NULL'
            file_name_escaped = file_name.replace("'", "''") if file_name else 'NULL'
            file_type_escaped = file_type.replace("'", "''") if file_type else 'NULL'
            voice_url_escaped = voice_url.replace("'", "''") if voice_url else 'NULL'
            
            cur.execute(
                f"""
                INSERT INTO t_p59162637_messenger_creation_p.messages 
                (sender_id, receiver_id, text, file_url, file_name, file_type, voice_url, voice_duration, created_at, is_read)
                VALUES ({user_id}, {receiver_id}, '{content_escaped}', 
                        {f"'{file_url_escaped}'" if file_url else 'NULL'}, 
                        {f"'{file_name_escaped}'" if file_name else 'NULL'}, 
                        {f"'{file_type_escaped}'" if file_type else 'NULL'},
                        {f"'{voice_url_escaped}'" if voice_url else 'NULL'},
                        {voice_duration if voice_duration else 'NULL'}, 
                        NOW(), false)
                RETURNING id, sender_id, receiver_id, text as content, file_url, file_name, file_type, voice_url, voice_duration, created_at
                """
            )
            message = cur.fetchone()
            conn.commit()
            
            cur.execute(
                f"SELECT username FROM t_p59162637_messenger_creation_p.users WHERE id = {user_id}"
            )
            sender = cur.fetchone()
            sender_name = sender['username'] if sender else 'Пользователь'
            
            notification_text = content if content else ('Голосовое сообщение' if voice_url else 'Файл')
            send_push_notification(receiver_id, sender_name, notification_text, cur)
            
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'isBase64Encoded': False,
                'body': json.dumps(dict(message), default=str)
            }
        
        elif method == 'PUT':
            body_data = json.loads(event.get('body', '{}'))
            message_id = body_data.get('message_id')
            new_content = body_data.get('content')
            
            if not message_id or not new_content:
                return {
                    'statusCode': 400,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'message_id и content обязательны'})
                }
            
            cur.execute(
                f"SELECT sender_id FROM t_p59162637_messenger_creation_p.messages WHERE id = {message_id}"
            )
            message = cur.fetchone()
            
            if not message or message['sender_id'] != user_id:
                return {
                    'statusCode': 403,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Нет прав на редактирование'})
                }
            
            content_escaped = new_content.replace("'", "''")
            cur.execute(
                f"""
                UPDATE t_p59162637_messenger_creation_p.messages 
                SET text = '{content_escaped}', is_edited = true, edited_at = NOW()
                WHERE id = {message_id}
                RETURNING id, sender_id, receiver_id, text as content, file_url, file_name, file_type, created_at, is_edited, edited_at
                """
            )
            updated_message = cur.fetchone()
            conn.commit()
            
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'isBase64Encoded': False,
                'body': json.dumps(dict(updated_message), default=str)
            }
        
        elif method == 'DELETE':
            query_params = event.get('queryStringParameters', {})
            message_id = query_params.get('message_id')
            
            if not message_id:
                return {
                    'statusCode': 400,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'message_id обязателен'})
                }
            
            cur.execute(
                f"SELECT sender_id FROM t_p59162637_messenger_creation_p.messages WHERE id = {message_id}"
            )
            message = cur.fetchone()
            
            if not message or message['sender_id'] != user_id:
                return {
                    'statusCode': 403,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Нет прав на удаление'})
                }
            
            cur.execute(
                f"UPDATE t_p59162637_messenger_creation_p.messages SET is_removed = true WHERE id = {message_id}"
            )
            conn.commit()
            
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'isBase64Encoded': False,
                'body': json.dumps({'success': True})
            }
        
        return {
            'statusCode': 405,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Method not allowed'})
        }
    
    finally:
        cur.close()
        conn.close()