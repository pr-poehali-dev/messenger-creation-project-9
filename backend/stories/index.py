"""
Business: Управление Stories (создание, просмотр, реакции)
Args: event - dict с httpMethod, body, headers с токеном
Returns: HTTP response с историями и статистикой
"""

import json
import os
import psycopg2
from psycopg2.extras import RealDictCursor
from typing import Dict, Any
import requests

DATABASE_URL = os.environ.get('DATABASE_URL')
NOTIFICATIONS_URL = os.environ.get('NOTIFICATIONS_URL', '')

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
            path = event.get('queryStringParameters', {}).get('action', 'create')
            body_data = json.loads(event.get('body', '{}'))
            
            if path == 'create':
                media_url = body_data.get('media_url')
                media_type = body_data.get('media_type', 'image')
                caption = body_data.get('caption', '')
                background_color = body_data.get('background_color')
                font_style = body_data.get('font_style')
                duration = body_data.get('duration', 5)
                mentions = body_data.get('mentions', [])
                
                if not media_url:
                    return {
                        'statusCode': 400,
                        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                        'body': json.dumps({'error': 'media_url required'})
                    }
                
                media_url_escaped = media_url.replace("'", "''")
                media_type_escaped = media_type.replace("'", "''")
                caption_escaped = caption.replace("'", "''") if caption else ''
                bg_escaped = background_color.replace("'", "''") if background_color else 'NULL'
                font_escaped = font_style.replace("'", "''") if font_style else 'NULL'
                
                bg_value = f"'{bg_escaped}'" if background_color else 'NULL'
                font_value = f"'{font_escaped}'" if font_style else 'NULL'
                
                cur.execute(
                    f"""
                    INSERT INTO t_p59162637_messenger_creation_p.stories 
                    (user_id, media_url, media_type, caption, background_color, font_style, duration)
                    VALUES ({current_user_id}, '{media_url_escaped}', '{media_type_escaped}', 
                            '{caption_escaped}', {bg_value}, {font_value}, {duration})
                    RETURNING id, user_id, media_url, media_type, caption, background_color, 
                              font_style, duration, views_count, created_at, expires_at
                    """
                )
                story = cur.fetchone()
                story_id = story['id']
                
                if mentions and isinstance(mentions, list):
                    for user_id in mentions:
                        try:
                            cur.execute(
                                f"""
                                INSERT INTO t_p59162637_messenger_creation_p.story_mentions 
                                (story_id, mentioned_user_id)
                                VALUES ({story_id}, {int(user_id)})
                                ON CONFLICT (story_id, mentioned_user_id) DO NOTHING
                                """
                            )
                        except Exception:
                            pass
                
                conn.commit()
                
                if mentions and isinstance(mentions, list) and NOTIFICATIONS_URL:
                    cur.execute(
                        f"""
                        SELECT username FROM t_p59162637_messenger_creation_p.users
                        WHERE id = {current_user_id}
                        """
                    )
                    author = cur.fetchone()
                    author_name = author['username'] if author else 'Кто-то'
                    
                    try:
                        requests.post(
                            f"{NOTIFICATIONS_URL}?action=send",
                            headers={'X-Auth-Token': f'{current_user_id}:internal'},
                            json={
                                'user_ids': mentions,
                                'title': f'{author_name} упомянул вас в Stories',
                                'body': caption if caption else 'Посмотрите новую историю',
                                'data': {
                                    'type': 'story_mention',
                                    'story_id': story_id,
                                    'user_id': current_user_id
                                }
                            },
                            timeout=5
                        )
                    except Exception:
                        pass
                
                return {
                    'statusCode': 200,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'isBase64Encoded': False,
                    'body': json.dumps({'story': dict(story)}, default=str)
                }
            
            elif path == 'view':
                story_id = body_data.get('story_id')
                
                if not story_id:
                    return {
                        'statusCode': 400,
                        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                        'body': json.dumps({'error': 'story_id required'})
                    }
                
                cur.execute(
                    f"""
                    INSERT INTO t_p59162637_messenger_creation_p.story_views (story_id, viewer_id)
                    VALUES ({story_id}, {current_user_id})
                    ON CONFLICT (story_id, viewer_id) DO NOTHING
                    """
                )
                
                cur.execute(
                    f"""
                    UPDATE t_p59162637_messenger_creation_p.stories 
                    SET views_count = views_count + 1
                    WHERE id = {story_id}
                    """
                )
                conn.commit()
                
                return {
                    'statusCode': 200,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'isBase64Encoded': False,
                    'body': json.dumps({'message': 'View recorded'})
                }
            
            elif path == 'react':
                story_id = body_data.get('story_id')
                reaction = body_data.get('reaction', '❤️')
                
                if not story_id:
                    return {
                        'statusCode': 400,
                        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                        'body': json.dumps({'error': 'story_id required'})
                    }
                
                reaction_escaped = reaction.replace("'", "''")
                
                cur.execute(
                    f"""
                    INSERT INTO t_p59162637_messenger_creation_p.story_reactions (story_id, user_id, reaction)
                    VALUES ({story_id}, {current_user_id}, '{reaction_escaped}')
                    ON CONFLICT (story_id, user_id) DO UPDATE SET reaction = '{reaction_escaped}'
                    RETURNING id
                    """
                )
                conn.commit()
                
                return {
                    'statusCode': 200,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'isBase64Encoded': False,
                    'body': json.dumps({'message': 'Reaction added'})
                }
        
        if method == 'GET':
            action = event.get('queryStringParameters', {}).get('action', 'all')
            
            if action == 'mentions':
                cur.execute(
                    f"""
                    SELECT s.id, s.user_id, s.media_url, s.media_type, s.caption,
                           s.background_color, s.font_style, s.duration, s.views_count,
                           s.created_at, s.expires_at,
                           u.username, u.avatar_url
                    FROM t_p59162637_messenger_creation_p.story_mentions sm
                    JOIN t_p59162637_messenger_creation_p.stories s ON s.id = sm.story_id
                    JOIN t_p59162637_messenger_creation_p.users u ON u.id = s.user_id
                    WHERE sm.mentioned_user_id = {current_user_id} 
                      AND s.expires_at > NOW()
                    ORDER BY s.created_at DESC
                    """
                )
                stories = cur.fetchall()
                
                return {
                    'statusCode': 200,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'isBase64Encoded': False,
                    'body': json.dumps({'stories': [dict(s) for s in stories]}, default=str)
                }
            
            if action == 'all':
                cur.execute(
                    f"""
                    SELECT DISTINCT ON (s.user_id)
                        s.id, s.user_id, s.media_url, s.media_type, s.caption,
                        s.background_color, s.font_style, s.duration, s.views_count,
                        s.created_at, s.expires_at,
                        u.username, u.avatar_url,
                        CASE WHEN sv.viewer_id IS NOT NULL THEN true ELSE false END as is_viewed,
                        (SELECT COUNT(*) FROM t_p59162637_messenger_creation_p.stories 
                         WHERE user_id = s.user_id AND expires_at > NOW()) as stories_count
                    FROM t_p59162637_messenger_creation_p.stories s
                    JOIN t_p59162637_messenger_creation_p.users u ON u.id = s.user_id
                    LEFT JOIN t_p59162637_messenger_creation_p.story_views sv 
                        ON sv.story_id = s.id AND sv.viewer_id = {current_user_id}
                    WHERE s.expires_at > NOW()
                    ORDER BY s.user_id, s.created_at DESC
                    """
                )
                stories = cur.fetchall()
                
                return {
                    'statusCode': 200,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'isBase64Encoded': False,
                    'body': json.dumps({'stories': [dict(s) for s in stories]}, default=str)
                }
            
            elif action == 'user':
                user_id = event.get('queryStringParameters', {}).get('user_id', current_user_id)
                
                cur.execute(
                    f"""
                    SELECT s.*, u.username, u.avatar_url,
                           CASE WHEN sv.viewer_id IS NOT NULL THEN true ELSE false END as is_viewed
                    FROM t_p59162637_messenger_creation_p.stories s
                    JOIN t_p59162637_messenger_creation_p.users u ON u.id = s.user_id
                    LEFT JOIN t_p59162637_messenger_creation_p.story_views sv 
                        ON sv.story_id = s.id AND sv.viewer_id = {current_user_id}
                    WHERE s.user_id = {user_id} AND s.expires_at > NOW()
                    ORDER BY s.created_at ASC
                    """
                )
                user_stories = cur.fetchall()
                
                return {
                    'statusCode': 200,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'isBase64Encoded': False,
                    'body': json.dumps({'stories': [dict(s) for s in user_stories]}, default=str)
                }
            
            elif action == 'viewers':
                story_id = event.get('queryStringParameters', {}).get('story_id')
                
                if not story_id:
                    return {
                        'statusCode': 400,
                        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                        'body': json.dumps({'error': 'story_id required'})
                    }
                
                cur.execute(
                    f"""
                    SELECT u.id, u.username, u.avatar_url, sv.viewed_at
                    FROM t_p59162637_messenger_creation_p.story_views sv
                    JOIN t_p59162637_messenger_creation_p.users u ON u.id = sv.viewer_id
                    WHERE sv.story_id = {story_id}
                    ORDER BY sv.viewed_at DESC
                    """
                )
                viewers = cur.fetchall()
                
                return {
                    'statusCode': 200,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'isBase64Encoded': False,
                    'body': json.dumps({'viewers': [dict(v) for v in viewers]}, default=str)
                }
        
        if method == 'DELETE':
            story_id = event.get('queryStringParameters', {}).get('story_id')
            
            if not story_id:
                return {
                    'statusCode': 400,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'story_id required'})
                }
            
            cur.execute(
                f"""
                UPDATE t_p59162637_messenger_creation_p.stories 
                SET expires_at = NOW()
                WHERE id = {story_id} AND user_id = {current_user_id}
                RETURNING id
                """
            )
            deleted = cur.fetchone()
            conn.commit()
            
            if not deleted:
                return {
                    'statusCode': 404,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Story not found'})
                }
            
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'isBase64Encoded': False,
                'body': json.dumps({'message': 'Story deleted'})
            }
        
        return {
            'statusCode': 405,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Method not allowed'})
        }
    
    finally:
        cur.close()
        conn.close()