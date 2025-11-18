import json
import os
import psycopg2
from psycopg2.extras import RealDictCursor
from typing import Dict, Any

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: API для работы с Reels - получение, создание, лайки, комментарии
    Args: event с httpMethod, body, queryStringParameters, headers
    Returns: HTTP response с данными reels
    '''
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-User-Id, X-Auth-Token',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }
    
    headers = event.get('headers', {})
    user_id_str = headers.get('x-user-id') or headers.get('X-User-Id')
    
    database_url = os.environ.get('DATABASE_URL')
    conn = psycopg2.connect(database_url)
    cursor = conn.cursor(cursor_factory=RealDictCursor)
    
    try:
        params = event.get('queryStringParameters', {}) or {}
        action = params.get('action', 'feed')
        
        if method == 'GET' and action == 'feed':
            limit = int(params.get('limit', '20'))
            offset = int(params.get('offset', '0'))
            
            query = '''
                SELECT r.*, u.username, u.avatar_url,
                       COALESCE(rl.is_liked, FALSE) as is_liked
                FROM reels r
                JOIN users u ON r.user_id = u.id
                LEFT JOIN (
                    SELECT reel_id, TRUE as is_liked
                    FROM reel_likes
                    WHERE user_id = %s
                ) rl ON r.id = rl.reel_id
                ORDER BY r.created_at DESC
                LIMIT %s OFFSET %s
            '''
            cursor.execute(query, (user_id_str or 0, limit, offset))
            reels = cursor.fetchall()
            
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'reels': [dict(r) for r in reels]}, default=str)
            }
        
        elif method == 'POST':
            if not user_id_str and action not in ['view']:
                return {
                    'statusCode': 401,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Unauthorized'})
                }
            
            body = json.loads(event.get('body', '{}'))
            
            if action == 'create':
                video_url = body.get('video_url')
                thumbnail_url = body.get('thumbnail_url')
                description = body.get('description', '')
                
                if not video_url:
                    return {
                        'statusCode': 400,
                        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                        'body': json.dumps({'error': 'video_url required'})
                    }
                
                cursor.execute(
                    '''INSERT INTO reels (user_id, video_url, thumbnail_url, description)
                       VALUES (%s, %s, %s, %s) RETURNING id''',
                    (user_id_str, video_url, thumbnail_url, description)
                )
                reel_id = cursor.fetchone()['id']
                conn.commit()
                
                return {
                    'statusCode': 201,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'id': reel_id, 'message': 'Reel created'})
                }
        
            elif action == 'like':
                reel_id = body.get('reel_id')
                
                cursor.execute(
                    'SELECT id FROM reel_likes WHERE reel_id = %s AND user_id = %s',
                    (reel_id, user_id_str)
                )
                existing = cursor.fetchone()
                
                if existing:
                    cursor.execute(
                        'DELETE FROM reel_likes WHERE reel_id = %s AND user_id = %s',
                        (reel_id, user_id_str)
                    )
                    cursor.execute(
                        'UPDATE reels SET likes_count = likes_count - 1 WHERE id = %s',
                        (reel_id,)
                    )
                    is_liked = False
                else:
                    cursor.execute(
                        'INSERT INTO reel_likes (reel_id, user_id) VALUES (%s, %s)',
                        (reel_id, user_id_str)
                    )
                    cursor.execute(
                        'UPDATE reels SET likes_count = likes_count + 1 WHERE id = %s',
                        (reel_id,)
                    )
                    is_liked = True
                
                conn.commit()
                
                cursor.execute('SELECT likes_count FROM reels WHERE id = %s', (reel_id,))
                likes_count = cursor.fetchone()['likes_count']
                
                return {
                    'statusCode': 200,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'is_liked': is_liked, 'likes_count': likes_count})
                }
        
            elif action == 'comment':
                reel_id = body.get('reel_id')
                content = body.get('content', '')
                
                if not content:
                    return {
                        'statusCode': 400,
                        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                        'body': json.dumps({'error': 'content required'})
                    }
                
                cursor.execute(
                    '''INSERT INTO reel_comments (reel_id, user_id, content)
                       VALUES (%s, %s, %s) RETURNING id''',
                    (reel_id, user_id_str, content)
                )
                comment_id = cursor.fetchone()['id']
                
                cursor.execute(
                    'UPDATE reels SET comments_count = comments_count + 1 WHERE id = %s',
                    (reel_id,)
                )
                conn.commit()
                
                return {
                    'statusCode': 201,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'id': comment_id, 'message': 'Comment added'})
                }
        
            elif action == 'view':
                reel_id = body.get('reel_id')
                
                cursor.execute(
                    'UPDATE reels SET views_count = views_count + 1 WHERE id = %s',
                    (reel_id,)
                )
                conn.commit()
                
                return {
                    'statusCode': 200,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'message': 'View recorded'})
                }
        
        elif method == 'GET' and action == 'comments':
            reel_id = params.get('reel_id')
            
            cursor.execute(
                '''SELECT rc.*, u.username, u.avatar_url
                   FROM reel_comments rc
                   JOIN users u ON rc.user_id = u.id
                   WHERE rc.reel_id = %s
                   ORDER BY rc.created_at DESC''',
                (reel_id,)
            )
            comments = cursor.fetchall()
            
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'comments': [dict(c) for c in comments]}, default=str)
            }
        
        return {
            'statusCode': 404,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Not found'})
        }
        
    finally:
        cursor.close()
        conn.close()