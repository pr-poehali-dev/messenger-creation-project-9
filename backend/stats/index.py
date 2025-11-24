import json
import os
import psycopg2
from typing import Dict, Any

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Get marketplace statistics (products, categories, sellers, customers count)
    Args: event with httpMethod
          context with request_id
    Returns: HTTP response with statistics data
    '''
    method: str = event.get('httpMethod', 'GET')
    
    # Handle CORS OPTIONS request
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
    
    if method != 'GET':
        return {
            'statusCode': 405,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Method not allowed'}),
            'isBase64Encoded': False
        }
    
    database_url = os.environ.get('DATABASE_URL')
    if not database_url:
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Database not configured'}),
            'isBase64Encoded': False
        }
    
    conn = psycopg2.connect(database_url)
    cursor = conn.cursor()
    
    # Get schema name from DATABASE_URL
    schema_name = 't_p59162637_messenger_creation_p'
    
    # Get counts
    cursor.execute(f'SELECT COUNT(*) FROM {schema_name}.products')
    products_count = cursor.fetchone()[0]
    
    cursor.execute(f'SELECT COUNT(*) FROM {schema_name}.categories')
    categories_count = cursor.fetchone()[0]
    
    cursor.execute(f'SELECT COUNT(*) FROM {schema_name}.sellers')
    sellers_count = cursor.fetchone()[0]
    
    cursor.execute(f'SELECT COUNT(*) FROM {schema_name}.customers')
    customers_count = cursor.fetchone()[0]
    
    cursor.close()
    conn.close()
    
    result = {
        'products': products_count,
        'categories': categories_count,
        'sellers': sellers_count,
        'customers': customers_count
    }
    
    return {
        'statusCode': 200,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'body': json.dumps(result),
        'isBase64Encoded': False
    }