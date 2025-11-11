import json
import os
import psycopg2
import psycopg2.extras
from typing import Dict, Any

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Chat messages, users list and profile management
    Args: event with httpMethod, body, headers with session token
    Returns: Messages, users list, profile data or operation result
    '''
    method = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-Session-Token',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }
    
    session_token = event.get('headers', {}).get('x-session-token') or event.get('headers', {}).get('X-Session-Token')
    
    if not session_token:
        return {
            'statusCode': 401,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Требуется авторизация'})
        }
    
    dsn = os.environ.get('DATABASE_URL')
    conn = psycopg2.connect(dsn)
    conn.autocommit = True
    cur = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
    
    try:
        cur.execute("SELECT id, username, avatar_url FROM users WHERE session_token = %s", (session_token,))
        current_user = cur.fetchone()
        
        if not current_user:
            return {
                'statusCode': 401,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Неверный токен сессии'})
            }
        
        if method == 'GET':
            params = event.get('queryStringParameters') or {}
            action = params.get('action', 'messages')
            
            if action == 'messages':
                limit = int(params.get('limit', 50))
                offset = int(params.get('offset', 0))
                
                cur.execute("""
                    SELECT m.id, m.user_id, m.message, m.created_at,
                           u.username, u.avatar_url
                    FROM messages m
                    JOIN users u ON m.user_id = u.id
                    ORDER BY m.created_at DESC
                    LIMIT %s OFFSET %s
                """, (limit, offset))
                
                messages = [dict(row) for row in cur.fetchall()]
                messages.reverse()
                
                return {
                    'statusCode': 200,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps(messages, default=str)
                }
            
            elif action == 'users':
                cur.execute("""
                    SELECT id, username, avatar_url, bio, 
                           last_seen, created_at,
                           CASE 
                               WHEN last_seen > NOW() - INTERVAL '5 minutes' THEN true 
                               ELSE false 
                           END as is_online
                    FROM users
                    ORDER BY is_online DESC, last_seen DESC
                """)
                
                users = [dict(row) for row in cur.fetchall()]
                
                return {
                    'statusCode': 200,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps(users, default=str)
                }
            
            elif action == 'profile':
                user_id = params.get('id')
                
                if user_id:
                    cur.execute("""
                        SELECT id, username, email, avatar_url, bio, created_at, last_seen,
                               (SELECT COUNT(*) FROM messages WHERE user_id = users.id) as messages_count
                        FROM users WHERE id = %s
                    """, (user_id,))
                else:
                    cur.execute("""
                        SELECT id, username, email, avatar_url, bio, created_at, last_seen,
                               (SELECT COUNT(*) FROM messages WHERE user_id = users.id) as messages_count
                        FROM users WHERE id = %s
                    """, (current_user['id'],))
                
                user = cur.fetchone()
                
                if not user:
                    return {
                        'statusCode': 404,
                        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                        'body': json.dumps({'error': 'Пользователь не найден'})
                    }
                
                return {
                    'statusCode': 200,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps(dict(user), default=str)
                }
        
        elif method == 'POST':
            body = json.loads(event.get('body', '{}'))
            message = body.get('message', '').strip()
            
            if not message:
                return {
                    'statusCode': 400,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Сообщение не может быть пустым'})
                }
            
            if len(message) > 1000:
                return {
                    'statusCode': 400,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Сообщение слишком длинное'})
                }
            
            cur.execute("""
                INSERT INTO messages (user_id, message)
                VALUES (%s, %s)
                RETURNING id, user_id, message, created_at
            """, (current_user['id'], message))
            
            new_message = dict(cur.fetchone())
            new_message['username'] = current_user['username']
            new_message['avatar_url'] = current_user['avatar_url']
            
            cur.execute("UPDATE users SET last_seen = NOW() WHERE id = %s", (current_user['id'],))
            
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps(new_message, default=str)
            }
        
        elif method == 'PUT':
            body = json.loads(event.get('body', '{}'))
            
            updates = []
            params_list = []
            
            if 'bio' in body:
                bio = body['bio'].strip()
                if len(bio) > 200:
                    return {
                        'statusCode': 400,
                        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                        'body': json.dumps({'error': 'Биография слишком длинная (максимум 200 символов)'})
                    }
                updates.append("bio = %s")
                params_list.append(bio)
            
            if 'avatar_url' in body:
                updates.append("avatar_url = %s")
                params_list.append(body['avatar_url'])
            
            if 'username' in body:
                username = body['username'].strip()
                if len(username) < 3:
                    return {
                        'statusCode': 400,
                        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                        'body': json.dumps({'error': 'Имя пользователя должно быть минимум 3 символа'})
                    }
                
                cur.execute("SELECT id FROM users WHERE username = %s AND id != %s", (username, current_user['id']))
                if cur.fetchone():
                    return {
                        'statusCode': 400,
                        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                        'body': json.dumps({'error': 'Это имя пользователя уже занято'})
                    }
                
                updates.append("username = %s")
                params_list.append(username)
            
            if not updates:
                return {
                    'statusCode': 400,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Нет данных для обновления'})
                }
            
            params_list.append(current_user['id'])
            query = f"UPDATE users SET {', '.join(updates)} WHERE id = %s RETURNING id, username, email, avatar_url, bio, created_at"
            
            cur.execute(query, params_list)
            updated_user = dict(cur.fetchone())
            
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps(updated_user, default=str)
            }
        
        elif method == 'DELETE':
            params = event.get('queryStringParameters') or {}
            message_id = params.get('id')
            
            if not message_id:
                return {
                    'statusCode': 400,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Не указан ID сообщения'})
                }
            
            cur.execute("SELECT user_id FROM messages WHERE id = %s", (message_id,))
            message = cur.fetchone()
            
            if not message:
                return {
                    'statusCode': 404,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Сообщение не найдено'})
                }
            
            if message['user_id'] != current_user['id']:
                return {
                    'statusCode': 403,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Можно удалять только свои сообщения'})
                }
            
            cur.execute("DELETE FROM messages WHERE id = %s", (message_id,))
            
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
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