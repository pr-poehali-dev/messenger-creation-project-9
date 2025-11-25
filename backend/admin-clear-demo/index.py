"""
Business: Очистка всех демо-данных маркетплейса (только для администратора)
Args: event с httpMethod POST, headers с X-Admin-Key
Returns: JSON с результатом очистки
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
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-Admin-Key',
                'Access-Control-Max-Age': '86400'
            },
            'isBase64Encoded': False,
            'body': ''
        }
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'isBase64Encoded': False,
            'body': json.dumps({'error': 'Method not allowed'})
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
    
    conn = psycopg2.connect(DATABASE_URL)
    cur = conn.cursor()
    
    try:
        deleted_counts = {}
        
        cur.execute("DELETE FROM t_p59162637_messenger_creation_p.cart")
        deleted_counts['cart'] = cur.rowcount
        
        cur.execute("DELETE FROM t_p59162637_messenger_creation_p.order_items")
        deleted_counts['order_items'] = cur.rowcount
        
        cur.execute("DELETE FROM t_p59162637_messenger_creation_p.orders")
        deleted_counts['orders'] = cur.rowcount
        
        cur.execute("DELETE FROM t_p59162637_messenger_creation_p.product_images")
        deleted_counts['product_images'] = cur.rowcount
        
        cur.execute("DELETE FROM t_p59162637_messenger_creation_p.products")
        deleted_counts['products'] = cur.rowcount
        
        cur.execute("DELETE FROM t_p59162637_messenger_creation_p.categories")
        deleted_counts['categories'] = cur.rowcount
        
        cur.execute("DELETE FROM t_p59162637_messenger_creation_p.customer_sessions")
        deleted_counts['customer_sessions'] = cur.rowcount
        
        cur.execute("DELETE FROM t_p59162637_messenger_creation_p.customers")
        deleted_counts['customers'] = cur.rowcount
        
        cur.execute("DELETE FROM t_p59162637_messenger_creation_p.sellers")
        deleted_counts['sellers'] = cur.rowcount
        
        conn.commit()
        
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'isBase64Encoded': False,
            'body': json.dumps({
                'success': True,
                'message': 'All demo data cleared',
                'deleted': deleted_counts
            })
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
