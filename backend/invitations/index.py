"""
Business: Управление приглашениями друзей по номеру телефона
Args: event - dict с httpMethod, body (JSON с phone), headers с токеном
Returns: HTTP response с приглашениями или результатом операции
"""

import json
import os
import psycopg2
from psycopg2.extras import RealDictCursor
from typing import Dict, Any

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
            body_data = json.loads(event.get('body', '{}'))
            receiver_phone = body_data.get('phone')
            
            if not receiver_phone:
                return {
                    'statusCode': 400,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Phone required'})
                }
            
            phone_escaped = receiver_phone.replace("'", "''")
            
            cur.execute(
                f"SELECT id FROM t_p59162637_messenger_creation_p.users WHERE phone = '{phone_escaped}'"
            )
            existing_user = cur.fetchone()
            
            if existing_user:
                return {
                    'statusCode': 400,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'User already exists with this phone'})
                }
            
            cur.execute(
                f"""
                INSERT INTO t_p59162637_messenger_creation_p.friend_invitations 
                (sender_id, receiver_phone, status) 
                VALUES ({current_user_id}, '{phone_escaped}', 'pending')
                ON CONFLICT (sender_id, receiver_phone) DO NOTHING
                RETURNING id, sender_id, receiver_phone, status, created_at
                """
            )
            invitation = cur.fetchone()
            conn.commit()
            
            if not invitation:
                return {
                    'statusCode': 400,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Invitation already sent'})
                }
            
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'isBase64Encoded': False,
                'body': json.dumps({
                    'invitation': dict(invitation),
                    'message': 'Invitation sent successfully'
                }, default=str)
            }
        
        if method == 'GET':
            cur.execute(
                f"""
                SELECT phone FROM t_p59162637_messenger_creation_p.users WHERE id = {current_user_id}
                """
            )
            current_user = cur.fetchone()
            
            if not current_user or not current_user.get('phone'):
                return {
                    'statusCode': 200,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'isBase64Encoded': False,
                    'body': json.dumps({'invitations': []})
                }
            
            current_phone = current_user['phone']
            phone_escaped = current_phone.replace("'", "''")
            
            cur.execute(
                f"""
                SELECT 
                    fi.id,
                    fi.sender_id,
                    fi.receiver_phone,
                    fi.status,
                    fi.created_at,
                    u.username as sender_name,
                    u.avatar_url as sender_avatar,
                    u.phone as sender_phone
                FROM t_p59162637_messenger_creation_p.friend_invitations fi
                JOIN t_p59162637_messenger_creation_p.users u ON u.id = fi.sender_id
                WHERE fi.receiver_phone = '{phone_escaped}' AND fi.status = 'pending'
                ORDER BY fi.created_at DESC
                """
            )
            invitations = cur.fetchall()
            
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'isBase64Encoded': False,
                'body': json.dumps({
                    'invitations': [dict(inv) for inv in invitations]
                }, default=str)
            }
        
        if method == 'PUT':
            body_data = json.loads(event.get('body', '{}'))
            invitation_id = body_data.get('invitation_id')
            action = body_data.get('action')
            
            if not invitation_id or action not in ['accept', 'reject']:
                return {
                    'statusCode': 400,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Invalid request'})
                }
            
            cur.execute(
                f"""
                SELECT phone FROM t_p59162637_messenger_creation_p.users WHERE id = {current_user_id}
                """
            )
            current_user = cur.fetchone()
            
            if not current_user or not current_user.get('phone'):
                return {
                    'statusCode': 403,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'User phone not found'})
                }
            
            current_phone = current_user['phone']
            phone_escaped = current_phone.replace("'", "''")
            
            new_status = 'accepted' if action == 'accept' else 'rejected'
            
            cur.execute(
                f"""
                UPDATE t_p59162637_messenger_creation_p.friend_invitations 
                SET status = '{new_status}'
                WHERE id = {invitation_id} AND receiver_phone = '{phone_escaped}' AND status = 'pending'
                RETURNING id, sender_id
                """
            )
            updated = cur.fetchone()
            conn.commit()
            
            if not updated:
                return {
                    'statusCode': 404,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Invitation not found'})
                }
            
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'isBase64Encoded': False,
                'body': json.dumps({
                    'message': f'Invitation {action}ed successfully',
                    'sender_id': updated['sender_id']
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
