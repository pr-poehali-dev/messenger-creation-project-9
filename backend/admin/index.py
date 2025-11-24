'''
Business: Admin API for managing marketplace (auth, categories, products CRUD)
Args: event - dict with httpMethod, body, queryStringParameters, headers
      context - object with attributes: request_id, function_name
Returns: HTTP response dict with JSON data
'''

import json
import os
from typing import Dict, Any
import psycopg2
from psycopg2.extras import RealDictCursor
import hashlib

ADMIN_EMAIL = 'swi79@bk.ru'
ADMIN_PASSWORD_HASH = hashlib.sha256('3gQ_8*~)wx_@xN)Fx+U4%E2cw+b(E^'.encode()).hexdigest()

def get_db_connection():
    dsn = os.environ.get('DATABASE_URL')
    return psycopg2.connect(dsn, cursor_factory=RealDictCursor)

def verify_admin_token(headers: Dict[str, str]) -> bool:
    token = headers.get('X-Admin-Token', '')
    expected_token = hashlib.sha256(f"{ADMIN_EMAIL}:{ADMIN_PASSWORD_HASH}".encode()).hexdigest()
    return token == expected_token

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-Admin-Token',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }
    
    headers = event.get('headers', {})
    params = event.get('queryStringParameters') or {}
    endpoint = params.get('endpoint', '')
    
    # Auth endpoint - no token required
    if endpoint == 'auth' and method == 'POST':
        body_data = json.loads(event.get('body', '{}'))
        email = body_data.get('email', '')
        password = body_data.get('password', '')
        
        password_hash = hashlib.sha256(password.encode()).hexdigest()
        
        if email == ADMIN_EMAIL and password_hash == ADMIN_PASSWORD_HASH:
            token = hashlib.sha256(f"{ADMIN_EMAIL}:{ADMIN_PASSWORD_HASH}".encode()).hexdigest()
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'token': token, 'email': email})
            }
        
        return {
            'statusCode': 401,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Invalid credentials'})
        }
    
    # All other endpoints require auth
    if not verify_admin_token(headers):
        return {
            'statusCode': 401,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Unauthorized'})
        }
    
    conn = get_db_connection()
    cursor = conn.cursor()
    
    try:
        # Categories endpoints
        if endpoint == 'categories':
            if method == 'GET':
                cursor.execute('''
                    SELECT id, slug, name, image_url, created_at
                    FROM categories
                    ORDER BY created_at
                ''')
                categories = cursor.fetchall()
                return {
                    'statusCode': 200,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps([dict(cat) for cat in categories], default=str)
                }
            
            elif method == 'POST':
                body_data = json.loads(event.get('body', '{}'))
                slug = body_data.get('slug')
                name = body_data.get('name')
                image_url = body_data.get('image_url')
                
                cursor.execute('''
                    INSERT INTO categories (slug, name, image_url)
                    VALUES (%s, %s, %s)
                    RETURNING id, slug, name, image_url, created_at
                ''', (slug, name, image_url))
                
                category = cursor.fetchone()
                conn.commit()
                
                return {
                    'statusCode': 201,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps(dict(category), default=str)
                }
            
            elif method == 'PUT':
                body_data = json.loads(event.get('body', '{}'))
                cat_id = body_data.get('id')
                slug = body_data.get('slug')
                name = body_data.get('name')
                image_url = body_data.get('image_url')
                
                cursor.execute('''
                    UPDATE categories
                    SET slug = %s, name = %s, image_url = %s
                    WHERE id = %s
                    RETURNING id, slug, name, image_url, created_at
                ''', (slug, name, image_url, cat_id))
                
                category = cursor.fetchone()
                conn.commit()
                
                return {
                    'statusCode': 200,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps(dict(category), default=str)
                }
            
            elif method == 'DELETE':
                cat_id = params.get('id')
                cursor.execute('DELETE FROM categories WHERE id = %s', (cat_id,))
                conn.commit()
                
                return {
                    'statusCode': 200,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps({'success': True})
                }
        
        # Products endpoints
        elif endpoint == 'products':
            if method == 'GET':
                cursor.execute('''
                    SELECT 
                        p.id, p.name, p.price, p.rating, p.reviews_count,
                        p.image_url, p.category_id, p.description, p.stock,
                        p.created_at, c.slug as category_slug
                    FROM products p
                    JOIN categories c ON p.category_id = c.id
                    ORDER BY p.created_at DESC
                ''')
                products = cursor.fetchall()
                return {
                    'statusCode': 200,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps([dict(prod) for prod in products], default=str)
                }
            
            elif method == 'POST':
                body_data = json.loads(event.get('body', '{}'))
                name = body_data.get('name')
                price = body_data.get('price')
                rating = body_data.get('rating', 4.5)
                reviews_count = body_data.get('reviews_count', 0)
                image_url = body_data.get('image_url')
                category_id = body_data.get('category_id')
                description = body_data.get('description', '')
                stock = body_data.get('stock', 10)
                
                cursor.execute('''
                    INSERT INTO products 
                    (name, price, rating, reviews_count, image_url, category_id, description, stock)
                    VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
                    RETURNING id, name, price, rating, reviews_count, image_url, 
                              category_id, description, stock, created_at
                ''', (name, price, rating, reviews_count, image_url, category_id, description, stock))
                
                product = cursor.fetchone()
                conn.commit()
                
                return {
                    'statusCode': 201,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps(dict(product), default=str)
                }
            
            elif method == 'PUT':
                body_data = json.loads(event.get('body', '{}'))
                prod_id = body_data.get('id')
                name = body_data.get('name')
                price = body_data.get('price')
                rating = body_data.get('rating')
                reviews_count = body_data.get('reviews_count')
                image_url = body_data.get('image_url')
                category_id = body_data.get('category_id')
                description = body_data.get('description')
                stock = body_data.get('stock')
                
                cursor.execute('''
                    UPDATE products
                    SET name = %s, price = %s, rating = %s, reviews_count = %s,
                        image_url = %s, category_id = %s, description = %s, stock = %s
                    WHERE id = %s
                    RETURNING id, name, price, rating, reviews_count, image_url,
                              category_id, description, stock, created_at
                ''', (name, price, rating, reviews_count, image_url, category_id, 
                      description, stock, prod_id))
                
                product = cursor.fetchone()
                conn.commit()
                
                return {
                    'statusCode': 200,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps(dict(product), default=str)
                }
            
            elif method == 'DELETE':
                prod_id = params.get('id')
                cursor.execute('DELETE FROM products WHERE id = %s', (prod_id,))
                conn.commit()
                
                return {
                    'statusCode': 200,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps({'success': True})
                }
        
        return {
            'statusCode': 404,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Endpoint not found'})
        }
    
    finally:
        cursor.close()
        conn.close()
