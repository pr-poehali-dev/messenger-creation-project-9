import json
import os
import psycopg2
import uuid
from typing import Dict, Any

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: API для авторизации покупателей
    Args: event - dict с httpMethod, body (phone, name)
          context - объект с request_id
    Returns: HTTP response с данными пользователя
    '''
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    if method == 'POST':
        body_data = json.loads(event.get('body', '{}'))
        phone = body_data.get('phone', '')
        name = body_data.get('name', '')
        
        if not phone or not name:
            return {
                'statusCode': 400,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'error': 'Phone and name are required'}),
                'isBase64Encoded': False
            }
        
        dsn = os.environ.get('DATABASE_URL')
        conn = psycopg2.connect(dsn)
        cur = conn.cursor()
        
        cur.execute("SELECT id, name, phone FROM t_p59162637_messenger_creation_p.customers WHERE phone = %s", (phone,))
        row = cur.fetchone()
        
        if row:
            user = {'id': row[0], 'name': row[1], 'phone': row[2]}
        else:
            user_id = str(uuid.uuid4())
            cur.execute(
                "INSERT INTO t_p59162637_messenger_creation_p.customers (id, name, phone) VALUES (%s, %s, %s)",
                (user_id, name, phone)
            )
            conn.commit()
            user = {'id': user_id, 'name': name, 'phone': phone}
        
        cur.close()
        conn.close()
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'user': user}),
            'isBase64Encoded': False
        }
    
    return {
        'statusCode': 405,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'body': json.dumps({'error': 'Method not allowed'}),
        'isBase64Encoded': False
    }