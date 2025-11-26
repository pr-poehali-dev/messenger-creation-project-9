import json
import os
import psycopg2
import uuid
from typing import Dict, Any

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: API для регистрации продавцов и управления товарами
    Args: event - dict с httpMethod, body, queryStringParameters
          context - объект с request_id
    Returns: HTTP response с данными продавца или товаров
    '''
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
    
    dsn = os.environ.get('DATABASE_URL')
    conn = psycopg2.connect(dsn)
    cur = conn.cursor()
    
    if method == 'GET':
        params = event.get('queryStringParameters') or {}
        seller_id = params.get('seller_id')
        
        if not seller_id:
            cur.close()
            conn.close()
            return {
                'statusCode': 400,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'error': 'seller_id is required'}),
                'isBase64Encoded': False
            }
        
        cur.execute(
            "SELECT id, name, description, price, image FROM t_p59162637_messenger_creation_p.products WHERE seller_id = %s ORDER BY created_at DESC",
            (seller_id,)
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
                'image': row[4]
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
    
    if method == 'POST':
        body_data = json.loads(event.get('body', '{}'))
        action = body_data.get('action')
        
        if action == 'add_product':
            seller_id = body_data.get('seller_id')
            product = body_data.get('product', {})
            
            if not seller_id or not product:
                cur.close()
                conn.close()
                return {
                    'statusCode': 400,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps({'error': 'seller_id and product are required'}),
                    'isBase64Encoded': False
                }
            
            product_id = str(uuid.uuid4())
            cur.execute(
                "INSERT INTO t_p59162637_messenger_creation_p.products (id, seller_id, name, description, price, image) VALUES (%s, %s, %s, %s, %s, %s)",
                (product_id, seller_id, product.get('name'), product.get('description'), product.get('price'), product.get('image'))
            )
            conn.commit()
            cur.close()
            conn.close()
            
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'product_id': product_id}),
                'isBase64Encoded': False
            }
        else:
            name = body_data.get('name', '')
            
            if not name:
                cur.close()
                conn.close()
                return {
                    'statusCode': 400,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps({'error': 'Name is required'}),
                    'isBase64Encoded': False
                }
            
            seller_id = str(uuid.uuid4())
            cur.execute(
                "INSERT INTO t_p59162637_messenger_creation_p.sellers (id, name) VALUES (%s, %s)",
                (seller_id, name)
            )
            conn.commit()
            cur.close()
            conn.close()
            
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'seller': {'id': seller_id, 'name': name}}),
                'isBase64Encoded': False
            }
    
    cur.close()
    conn.close()
    return {
        'statusCode': 405,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'body': json.dumps({'error': 'Method not allowed'}),
        'isBase64Encoded': False
    }