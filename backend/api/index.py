import json
import os
import psycopg2
from psycopg2.extras import RealDictCursor
from typing import Dict, Any, Optional

def get_db_connection():
    """
    Создаёт подключение к PostgreSQL базе данных
    """
    dsn = os.environ.get('DATABASE_URL')
    return psycopg2.connect(dsn, cursor_factory=RealDictCursor)

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    """
    Business: API для получения категорий и товаров из базы данных
    Args: event - dict с httpMethod, queryStringParameters
          context - объект с атрибутами request_id, function_name
    Returns: HTTP response с данными из БД
    """
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }
    
    if method != 'GET':
        return {
            'statusCode': 405,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Method not allowed'})
        }
    
    params = event.get('queryStringParameters') or {}
    endpoint = params.get('endpoint', '')
    
    conn = get_db_connection()
    cursor = conn.cursor()
    
    try:
        if endpoint == 'categories':
            cursor.execute('''
                SELECT 
                    slug as id,
                    name,
                    image_url as icon,
                    'from-violet-500 to-fuchsia-500' as gradient
                FROM categories 
                ORDER BY created_at
            ''')
            categories = cursor.fetchall()
            
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'isBase64Encoded': False,
                'body': json.dumps(categories, default=str)
            }
        
        elif endpoint == 'products':
            category_id = params.get('category')
            
            if category_id:
                cursor.execute('''
                    SELECT 
                        p.id,
                        p.name,
                        CAST(p.price AS INTEGER) as price,
                        CAST(p.rating AS FLOAT) as rating,
                        p.reviews_count as reviews,
                        p.image_url as image,
                        c.slug as category,
                        p.description,
                        CASE WHEN p.stock > 0 THEN true ELSE false END as "inStock"
                    FROM products p
                    JOIN categories c ON p.category_id = c.id
                    WHERE c.slug = %s
                    ORDER BY p.created_at DESC
                ''', (category_id,))
            else:
                cursor.execute('''
                    SELECT 
                        p.id,
                        p.name,
                        CAST(p.price AS INTEGER) as price,
                        CAST(p.rating AS FLOAT) as rating,
                        p.reviews_count as reviews,
                        p.image_url as image,
                        c.slug as category,
                        p.description,
                        CASE WHEN p.stock > 0 THEN true ELSE false END as "inStock"
                    FROM products p
                    JOIN categories c ON p.category_id = c.id
                    ORDER BY p.created_at DESC
                ''')
            
            products = cursor.fetchall()
            
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'isBase64Encoded': False,
                'body': json.dumps(products, default=str)
            }
        
        elif endpoint == 'product':
            product_id = params.get('id')
            
            if not product_id:
                return {
                    'statusCode': 400,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Product ID is required'})
                }
            
            cursor.execute('''
                SELECT 
                    p.id,
                    p.name,
                    CAST(p.price AS INTEGER) as price,
                    CAST(p.rating AS FLOAT) as rating,
                    p.reviews_count as reviews,
                    p.image_url as image,
                    c.slug as category,
                    p.description,
                    CASE WHEN p.stock > 0 THEN true ELSE false END as "inStock"
                FROM products p
                JOIN categories c ON p.category_id = c.id
                WHERE p.id = %s
            ''', (product_id,))
            
            product = cursor.fetchone()
            
            if not product:
                return {
                    'statusCode': 404,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Product not found'})
                }
            
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'isBase64Encoded': False,
                'body': json.dumps(product, default=str)
            }
        
        else:
            return {
                'statusCode': 400,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Invalid endpoint. Use: categories, products, or product'})
            }
    
    finally:
        cursor.close()
        conn.close()
