'''
Business: Seller API for registration, authentication, and managing products/orders
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
import secrets

def get_db_connection():
    dsn = os.environ.get('DATABASE_URL')
    return psycopg2.connect(dsn, cursor_factory=RealDictCursor)

def generate_token(seller_id: int, email: str) -> str:
    random_part = secrets.token_hex(16)
    return hashlib.sha256(f"{seller_id}:{email}:{random_part}".encode()).hexdigest()

def verify_seller_token(headers: Dict[str, str], conn) -> Dict[str, Any]:
    token = headers.get('X-Seller-Token', '')
    if not token:
        return None
    
    cursor = conn.cursor()
    cursor.execute('''
        SELECT id, email, shop_name, is_active
        FROM t_p59162637_messenger_creation_p.sellers
        WHERE password_hash LIKE %s AND is_active = true
    ''', (f'%{token[:32]}%',))
    
    seller = cursor.fetchone()
    cursor.close()
    
    return dict(seller) if seller else None

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-Seller-Token',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }
    
    headers = event.get('headers', {})
    params = event.get('queryStringParameters') or {}
    endpoint = params.get('endpoint', '')
    
    conn = get_db_connection()
    cursor = conn.cursor()
    
    try:
        # Registration endpoint - no token required
        if endpoint == 'register' and method == 'POST':
            body_data = json.loads(event.get('body', '{}'))
            email = body_data.get('email', '')
            password = body_data.get('password', '')
            shop_name = body_data.get('shop_name', '')
            phone = body_data.get('phone', '')
            
            cursor.execute('''
                SELECT id FROM t_p59162637_messenger_creation_p.sellers WHERE email = %s
            ''', (email,))
            
            if cursor.fetchone():
                return {
                    'statusCode': 400,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps({'error': 'Email already registered'})
                }
            
            password_hash = hashlib.sha256(password.encode()).hexdigest()
            
            cursor.execute('''
                INSERT INTO t_p59162637_messenger_creation_p.sellers 
                (email, password_hash, shop_name, phone)
                VALUES (%s, %s, %s, %s)
                RETURNING id, email, shop_name, created_at
            ''', (email, password_hash, shop_name, phone))
            
            seller = cursor.fetchone()
            conn.commit()
            
            token = generate_token(seller['id'], seller['email'])
            
            return {
                'statusCode': 201,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({
                    'token': token,
                    'seller': dict(seller)
                }, default=str)
            }
        
        # Login endpoint - no token required
        if endpoint == 'login' and method == 'POST':
            body_data = json.loads(event.get('body', '{}'))
            email = body_data.get('email', '')
            password = body_data.get('password', '')
            
            password_hash = hashlib.sha256(password.encode()).hexdigest()
            
            cursor.execute('''
                SELECT id, email, shop_name, phone, description, logo_url, is_active, created_at
                FROM t_p59162637_messenger_creation_p.sellers
                WHERE email = %s AND password_hash = %s
            ''', (email, password_hash))
            
            seller = cursor.fetchone()
            
            if not seller:
                return {
                    'statusCode': 401,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps({'error': 'Invalid credentials'})
                }
            
            if not seller['is_active']:
                return {
                    'statusCode': 403,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps({'error': 'Account is deactivated'})
                }
            
            token = generate_token(seller['id'], seller['email'])
            
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({
                    'token': token,
                    'seller': dict(seller)
                }, default=str)
            }
        
        # All other endpoints require authentication
        seller = verify_seller_token(headers, conn)
        if not seller:
            return {
                'statusCode': 401,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'error': 'Unauthorized'})
            }
        
        seller_id = seller['id']
        
        # Get seller profile
        if endpoint == 'profile' and method == 'GET':
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps(seller, default=str)
            }
        
        # Update seller profile
        if endpoint == 'profile' and method == 'PUT':
            body_data = json.loads(event.get('body', '{}'))
            shop_name = body_data.get('shop_name', seller['shop_name'])
            phone = body_data.get('phone', seller.get('phone'))
            description = body_data.get('description', seller.get('description'))
            logo_url = body_data.get('logo_url', seller.get('logo_url'))
            
            cursor.execute('''
                UPDATE t_p59162637_messenger_creation_p.sellers
                SET shop_name = %s, phone = %s, description = %s, logo_url = %s
                WHERE id = %s
                RETURNING id, email, shop_name, phone, description, logo_url, is_active, created_at
            ''', (shop_name, phone, description, logo_url, seller_id))
            
            updated_seller = cursor.fetchone()
            conn.commit()
            
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps(dict(updated_seller), default=str)
            }
        
        # Get seller products
        if endpoint == 'products' and method == 'GET':
            cursor.execute('''
                SELECT 
                    p.id, p.name, p.price, p.rating, p.reviews_count,
                    p.image_url, p.category_id, p.description, p.stock,
                    p.created_at, c.slug as category_slug, c.name as category_name
                FROM t_p59162637_messenger_creation_p.products p
                LEFT JOIN t_p59162637_messenger_creation_p.categories c ON p.category_id = c.id
                WHERE p.seller_id = %s
                ORDER BY p.created_at DESC
            ''', (seller_id,))
            
            products = cursor.fetchall()
            
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps([dict(p) for p in products], default=str)
            }
        
        # Add product
        if endpoint == 'products' and method == 'POST':
            body_data = json.loads(event.get('body', '{}'))
            name = body_data.get('name')
            price = body_data.get('price')
            category_id = body_data.get('category_id')
            description = body_data.get('description', '')
            stock = body_data.get('stock', 10)
            image_url = body_data.get('image_url', '')
            
            cursor.execute('''
                INSERT INTO t_p59162637_messenger_creation_p.products
                (name, price, category_id, description, stock, image_url, seller_id, rating, reviews_count)
                VALUES (%s, %s, %s, %s, %s, %s, %s, 4.5, 0)
                RETURNING id, name, price, rating, reviews_count, image_url, 
                          category_id, description, stock, seller_id, created_at
            ''', (name, price, category_id, description, stock, image_url, seller_id))
            
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
        
        # Update product
        if endpoint == 'products' and method == 'PUT':
            body_data = json.loads(event.get('body', '{}'))
            product_id = body_data.get('id')
            
            cursor.execute('''
                SELECT id FROM t_p59162637_messenger_creation_p.products
                WHERE id = %s AND seller_id = %s
            ''', (product_id, seller_id))
            
            if not cursor.fetchone():
                return {
                    'statusCode': 403,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps({'error': 'Product not found or access denied'})
                }
            
            name = body_data.get('name')
            price = body_data.get('price')
            category_id = body_data.get('category_id')
            description = body_data.get('description')
            stock = body_data.get('stock')
            image_url = body_data.get('image_url')
            
            cursor.execute('''
                UPDATE t_p59162637_messenger_creation_p.products
                SET name = %s, price = %s, category_id = %s, description = %s, 
                    stock = %s, image_url = %s
                WHERE id = %s AND seller_id = %s
                RETURNING id, name, price, rating, reviews_count, image_url,
                          category_id, description, stock, seller_id, created_at
            ''', (name, price, category_id, description, stock, image_url, product_id, seller_id))
            
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
        
        # Get seller orders
        if endpoint == 'orders' and method == 'GET':
            cursor.execute('''
                SELECT 
                    o.id, o.product_id, o.quantity, o.total_price, o.status,
                    o.customer_email, o.customer_phone, o.created_at,
                    p.name as product_name, p.image_url as product_image
                FROM t_p59162637_messenger_creation_p.orders o
                JOIN t_p59162637_messenger_creation_p.products p ON o.product_id = p.id
                WHERE o.seller_id = %s
                ORDER BY o.created_at DESC
            ''', (seller_id,))
            
            orders = cursor.fetchall()
            
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps([dict(o) for o in orders], default=str)
            }
        
        # Update order status
        if endpoint == 'orders' and method == 'PUT':
            body_data = json.loads(event.get('body', '{}'))
            order_id = body_data.get('id')
            status = body_data.get('status')
            
            cursor.execute('''
                UPDATE t_p59162637_messenger_creation_p.orders o
                SET status = %s
                FROM t_p59162637_messenger_creation_p.products p
                WHERE o.id = %s AND o.product_id = p.id AND p.seller_id = %s
                RETURNING o.id, o.status
            ''', (status, order_id, seller_id))
            
            order = cursor.fetchone()
            
            if not order:
                return {
                    'statusCode': 403,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps({'error': 'Order not found or access denied'})
                }
            
            conn.commit()
            
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps(dict(order), default=str)
            }
        
        # Get statistics
        if endpoint == 'stats' and method == 'GET':
            cursor.execute('''
                SELECT COUNT(*) as total_products
                FROM t_p59162637_messenger_creation_p.products
                WHERE seller_id = %s
            ''', (seller_id,))
            stats_products = cursor.fetchone()
            
            cursor.execute('''
                SELECT COUNT(*) as total_orders, 
                       COALESCE(SUM(total_price), 0) as total_revenue
                FROM t_p59162637_messenger_creation_p.orders o
                JOIN t_p59162637_messenger_creation_p.products p ON o.product_id = p.id
                WHERE p.seller_id = %s
            ''', (seller_id,))
            stats_orders = cursor.fetchone()
            
            stats = {
                'total_products': stats_products['total_products'],
                'total_orders': stats_orders['total_orders'],
                'total_revenue': float(stats_orders['total_revenue'])
            }
            
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps(stats)
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
