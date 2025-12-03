import json
import os
import psycopg2
from typing import Dict, Any, List, Optional
from decimal import Decimal

def get_db_connection():
    return psycopg2.connect(os.environ['DATABASE_URL'])

def decimal_default(obj):
    if isinstance(obj, Decimal):
        return float(obj)
    raise TypeError

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    conn = get_db_connection()
    cur = conn.cursor()
    
    try:
        if method == 'GET':
            params = event.get('queryStringParameters') or {}
            action = params.get('action', 'products')
            
            if action == 'categories':
                cur.execute("""
                    SELECT id, name, slug, image_url 
                    FROM t_p59162637_messenger_creation_p.categories 
                    ORDER BY name
                """)
                rows = cur.fetchall()
                categories = [
                    {'id': r[0], 'name': r[1], 'slug': r[2], 'image_url': r[3]}
                    for r in rows
                ]
                
                return {
                    'statusCode': 200,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'categories': categories}, default=decimal_default),
                    'isBase64Encoded': False
                }
            
            elif action == 'products':
                category_id = params.get('category_id')
                search = params.get('search', '')
                
                query = """
                    SELECT p.id, p.name, p.slug, p.description, p.price, p.old_price,
                           p.category_id, p.image_url, p.stock, p.rating, p.reviews_count,
                           c.name as category_name
                    FROM t_p59162637_messenger_creation_p.products p
                    LEFT JOIN t_p59162637_messenger_creation_p.categories c ON p.category_id = c.id
                    WHERE 1=1
                """
                
                if category_id:
                    query += f" AND p.category_id = {int(category_id)}"
                if search:
                    query += f" AND (p.name ILIKE '%{search}%' OR p.description ILIKE '%{search}%')"
                
                query += " ORDER BY p.id"
                
                cur.execute(query)
                rows = cur.fetchall()
                products = [
                    {
                        'id': r[0], 'name': r[1], 'slug': r[2], 'description': r[3],
                        'price': r[4], 'old_price': r[5], 'category_id': r[6],
                        'image_url': r[7], 'stock': r[8], 'rating': r[9],
                        'reviews_count': r[10], 'category_name': r[11]
                    }
                    for r in rows
                ]
                
                return {
                    'statusCode': 200,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'products': products}, default=decimal_default),
                    'isBase64Encoded': False
                }
            
            elif action == 'product':
                product_id = params.get('product_id')
                if not product_id:
                    return {
                        'statusCode': 400,
                        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                        'body': json.dumps({'error': 'product_id required'}),
                        'isBase64Encoded': False
                    }
                
                cur.execute("""
                    SELECT p.id, p.name, p.slug, p.description, p.price, p.old_price,
                           p.category_id, p.image_url, p.stock, p.rating, p.reviews_count,
                           c.name as category_name
                    FROM t_p59162637_messenger_creation_p.products p
                    LEFT JOIN t_p59162637_messenger_creation_p.categories c ON p.category_id = c.id
                    WHERE p.id = %s
                """, (int(product_id),))
                
                row = cur.fetchone()
                if not row:
                    return {
                        'statusCode': 404,
                        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                        'body': json.dumps({'error': 'Product not found'}),
                        'isBase64Encoded': False
                    }
                
                product = {
                    'id': row[0], 'name': row[1], 'slug': row[2], 'description': row[3],
                    'price': row[4], 'old_price': row[5], 'category_id': row[6],
                    'image_url': row[7], 'stock': row[8], 'rating': row[9],
                    'reviews_count': row[10], 'category_name': row[11]
                }
                
                return {
                    'statusCode': 200,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'product': product}, default=decimal_default),
                    'isBase64Encoded': False
                }
        
        return {
            'statusCode': 405,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Method not allowed'}),
            'isBase64Encoded': False
        }
    
    finally:
        cur.close()
        conn.close()
