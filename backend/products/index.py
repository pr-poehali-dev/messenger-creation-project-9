import json
import os
import psycopg2
from typing import Dict, Any

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: API для работы с товарами маркетплейса
    Args: event - dict с httpMethod, queryStringParameters
          context - объект с request_id, function_name и др.
    Returns: HTTP response с товарами
    '''
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
            'body': '',
            'isBase64Encoded': False
        }
    
    if method == 'GET':
        params = event.get('queryStringParameters') or {}
        product_id = params.get('id')
        
        dsn = os.environ.get('DATABASE_URL')
        conn = psycopg2.connect(dsn)
        cur = conn.cursor()
        
        if product_id:
            cur.execute(
                "SELECT p.id, p.name, p.description, p.price, p.image, s.name as seller_name, s.id as seller_id "
                "FROM t_p59162637_messenger_creation_p.products p JOIN t_p59162637_messenger_creation_p.sellers s ON p.seller_id = s.id WHERE p.id = %s",
                (product_id,)
            )
            row = cur.fetchone()
            cur.close()
            conn.close()
            
            if row:
                product = {
                    'id': row[0],
                    'name': row[1],
                    'description': row[2],
                    'price': row[3],
                    'image': row[4],
                    'seller_name': row[5],
                    'seller_id': row[6]
                }
                return {
                    'statusCode': 200,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps({'product': product}),
                    'isBase64Encoded': False
                }
            else:
                return {
                    'statusCode': 404,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps({'error': 'Product not found'}),
                    'isBase64Encoded': False
                }
        else:
            cur.execute(
                "SELECT p.id, p.name, p.description, p.price, p.image, s.name as seller_name "
                "FROM t_p59162637_messenger_creation_p.products p JOIN t_p59162637_messenger_creation_p.sellers s ON p.seller_id = s.id ORDER BY p.created_at DESC"
            )
            rows = cur.fetchall()
            cur.close()
            conn.close()
            
            products = [
                {
                    'id': row[0],
                    'name': row[1],
                    'description': row[2],
                    'price': row[3],
                    'image': row[4],
                    'seller_name': row[5]
                }
                for row in rows
            ]
            
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'products': products}),
                'isBase64Encoded': False
            }
    
    return {
        'statusCode': 405,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'body': json.dumps({'error': 'Method not allowed'}),
        'isBase64Encoded': False
    }