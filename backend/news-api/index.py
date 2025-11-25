"""
Business: API для управления новостями (получение, создание, редактирование, удаление)
Args: event с httpMethod GET/POST/PUT/DELETE, headers с X-Admin-Token для защищенных операций
Returns: JSON с новостями или результатом операции
"""

import json
import os
import psycopg2
from typing import Dict, Any

DATABASE_URL = os.environ.get('DATABASE_URL')
ADMIN_KEY = os.environ.get('ADMIN_KEY', 'demo-admin-key-12345')

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-Admin-Key',
                'Access-Control-Max-Age': '86400'
            },
            'isBase64Encoded': False,
            'body': ''
        }
    
    conn = psycopg2.connect(DATABASE_URL)
    cur = conn.cursor()
    
    try:
        if method == 'GET':
            query_params = event.get('queryStringParameters', {}) or {}
            news_id = query_params.get('id')
            slug = query_params.get('slug')
            
            if news_id:
                cur.execute("""
                    SELECT id, title, slug, content, image_url, author, published_at, is_published
                    FROM t_p59162637_messenger_creation_p.news 
                    WHERE id = %s
                """, (news_id,))
                row = cur.fetchone()
                if row:
                    news = {
                        'id': row[0], 'title': row[1], 'slug': row[2], 'content': row[3],
                        'image_url': row[4], 'author': row[5], 
                        'published_at': row[6].isoformat() if row[6] else None,
                        'is_published': row[7]
                    }
                    return {
                        'statusCode': 200,
                        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                        'isBase64Encoded': False,
                        'body': json.dumps(news)
                    }
                else:
                    return {
                        'statusCode': 404,
                        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                        'isBase64Encoded': False,
                        'body': json.dumps({'error': 'News not found'})
                    }
            
            elif slug:
                cur.execute("""
                    SELECT id, title, slug, content, image_url, author, published_at, is_published
                    FROM t_p59162637_messenger_creation_p.news 
                    WHERE slug = %s AND is_published = true
                """, (slug,))
                row = cur.fetchone()
                if row:
                    news = {
                        'id': row[0], 'title': row[1], 'slug': row[2], 'content': row[3],
                        'image_url': row[4], 'author': row[5], 
                        'published_at': row[6].isoformat() if row[6] else None,
                        'is_published': row[7]
                    }
                    return {
                        'statusCode': 200,
                        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                        'isBase64Encoded': False,
                        'body': json.dumps(news)
                    }
                else:
                    return {
                        'statusCode': 404,
                        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                        'isBase64Encoded': False,
                        'body': json.dumps({'error': 'News not found'})
                    }
            
            else:
                cur.execute("""
                    SELECT id, title, slug, content, image_url, author, published_at, is_published
                    FROM t_p59162637_messenger_creation_p.news 
                    WHERE is_published = true
                    ORDER BY published_at DESC
                """)
                rows = cur.fetchall()
                news_list = []
                for row in rows:
                    news_list.append({
                        'id': row[0], 'title': row[1], 'slug': row[2], 'content': row[3],
                        'image_url': row[4], 'author': row[5], 
                        'published_at': row[6].isoformat() if row[6] else None,
                        'is_published': row[7]
                    })
                
                return {
                    'statusCode': 200,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'isBase64Encoded': False,
                    'body': json.dumps(news_list)
                }
        
        headers = event.get('headers', {})
        admin_key = headers.get('x-admin-key') or headers.get('X-Admin-Key')
        
        if admin_key != ADMIN_KEY:
            return {
                'statusCode': 403,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'isBase64Encoded': False,
                'body': json.dumps({'error': 'Forbidden: Invalid admin key'})
            }
        
        if method == 'POST':
            body_data = json.loads(event.get('body', '{}'))
            title = body_data.get('title')
            slug = body_data.get('slug')
            content = body_data.get('content')
            image_url = body_data.get('image_url', '')
            author = body_data.get('author', 'Admin')
            is_published = body_data.get('is_published', True)
            
            cur.execute("""
                INSERT INTO t_p59162637_messenger_creation_p.news 
                (title, slug, content, image_url, author, is_published)
                VALUES (%s, %s, %s, %s, %s, %s)
                RETURNING id
            """, (title, slug, content, image_url, author, is_published))
            
            news_id = cur.fetchone()[0]
            conn.commit()
            
            return {
                'statusCode': 201,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'isBase64Encoded': False,
                'body': json.dumps({'success': True, 'id': news_id})
            }
        
        elif method == 'PUT':
            body_data = json.loads(event.get('body', '{}'))
            news_id = body_data.get('id')
            title = body_data.get('title')
            slug = body_data.get('slug')
            content = body_data.get('content')
            image_url = body_data.get('image_url')
            author = body_data.get('author')
            is_published = body_data.get('is_published')
            
            cur.execute("""
                UPDATE t_p59162637_messenger_creation_p.news 
                SET title = %s, slug = %s, content = %s, image_url = %s, 
                    author = %s, is_published = %s, updated_at = CURRENT_TIMESTAMP
                WHERE id = %s
            """, (title, slug, content, image_url, author, is_published, news_id))
            
            conn.commit()
            
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'isBase64Encoded': False,
                'body': json.dumps({'success': True})
            }
        
        elif method == 'DELETE':
            query_params = event.get('queryStringParameters', {}) or {}
            news_id = query_params.get('id')
            
            cur.execute("""
                DELETE FROM t_p59162637_messenger_creation_p.news WHERE id = %s
            """, (news_id,))
            
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
            'isBase64Encoded': False,
            'body': json.dumps({'error': 'Method not allowed'})
        }
    
    except Exception as e:
        conn.rollback()
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'isBase64Encoded': False,
            'body': json.dumps({'error': str(e)})
        }
    
    finally:
        cur.close()
        conn.close()
