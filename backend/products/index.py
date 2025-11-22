"""
Business: API для получения категорий и товаров маркетплейса
Args: event с httpMethod GET, queryStringParameters с category_id
Returns: JSON с categories и products
"""

import json
import os
import psycopg2
from psycopg2.extras import RealDictCursor
from typing import Dict, Any

DATABASE_URL = os.environ.get('DATABASE_URL')

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
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
            'isBase64Encoded': False,
            'body': ''
        }
    
    if method != 'GET':
        return {
            'statusCode': 405,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'isBase64Encoded': False,
            'body': json.dumps({'error': 'Method not allowed'})
        }
    
    conn = psycopg2.connect(DATABASE_URL)
    cur = conn.cursor(cursor_factory=RealDictCursor)
    
    try:
        params = event.get('queryStringParameters') or {}
        category_id = params.get('category_id')
        
        cur.execute("SELECT id, name, slug, image_url FROM t_p59162637_messenger_creation_p.categories ORDER BY id")
        categories = [dict(row) for row in cur.fetchall()]
        
        if category_id:
            cur.execute(
                f"SELECT id, name, slug, description, price, old_price, category_id, image_url, stock, rating, reviews_count FROM t_p59162637_messenger_creation_p.products WHERE category_id = {int(category_id)} ORDER BY id"
            )
        else:
            cur.execute(
                "SELECT id, name, slug, description, price, old_price, category_id, image_url, stock, rating, reviews_count FROM t_p59162637_messenger_creation_p.products ORDER BY id"
            )
        
        products = [dict(row) for row in cur.fetchall()]
        
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'isBase64Encoded': False,
            'body': json.dumps({
                'categories': categories,
                'products': products
            }, default=str)
        }
    
    finally:
        cur.close()
        conn.close()
