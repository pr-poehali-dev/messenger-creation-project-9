import json
import os
import psycopg2
from typing import Dict, Any

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Заполнение базы тестовыми данными для маркетплейса
    Args: event - dict с httpMethod
          context - объект с request_id
    Returns: HTTP response с результатом
    '''
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    if method == 'POST':
        dsn = os.environ.get('DATABASE_URL')
        conn = psycopg2.connect(dsn)
        cur = conn.cursor()
        
        sellers_data = [
            ('550e8400-e29b-41d4-a716-446655440001', 'Электроника Про'),
            ('550e8400-e29b-41d4-a716-446655440002', 'Модный Стиль'),
            ('550e8400-e29b-41d4-a716-446655440003', 'Книжный Мир')
        ]
        
        for seller_id, name in sellers_data:
            cur.execute(
                "INSERT INTO t_p59162637_messenger_creation_p.sellers (id, name) VALUES (%s, %s) ON CONFLICT (id) DO NOTHING",
                (seller_id, name)
            )
        
        customers_data = [
            ('650e8400-e29b-41d4-a716-446655440001', 'Иван Петров', '+79991234567'),
            ('650e8400-e29b-41d4-a716-446655440002', 'Мария Сидорова', '+79991234568'),
            ('650e8400-e29b-41d4-a716-446655440003', 'Алексей Кузнецов', '+79991234569')
        ]
        
        for customer_id, name, phone in customers_data:
            cur.execute(
                "INSERT INTO t_p59162637_messenger_creation_p.customers (id, name, phone) VALUES (%s, %s, %s) ON CONFLICT (id) DO NOTHING",
                (customer_id, name, phone)
            )
        
        products_data = [
            ('750e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440001', 'Беспроводные наушники', 'Качественные беспроводные наушники с активным шумоподавлением', 5990.00, 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=800&fit=crop'),
            ('750e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440001', 'Смартфон Pro Max', 'Флагманский смартфон с отличной камерой и быстрой зарядкой', 79990.00, 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&h=800&fit=crop'),
            ('750e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440001', 'Умные часы', 'Фитнес-трекер с мониторингом сердечного ритма', 12990.00, 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=800&fit=crop'),
            ('750e8400-e29b-41d4-a716-446655440004', '550e8400-e29b-41d4-a716-446655440002', 'Кожаная куртка', 'Стильная кожаная куртка из натуральной кожи', 24990.00, 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&h=800&fit=crop'),
            ('750e8400-e29b-41d4-a716-446655440005', '550e8400-e29b-41d4-a716-446655440002', 'Джинсы классические', 'Удобные джинсы классического кроя', 4990.00, 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&h=800&fit=crop'),
            ('750e8400-e29b-41d4-a716-446655440006', '550e8400-e29b-41d4-a716-446655440002', 'Кроссовки спортивные', 'Легкие кроссовки для бега и тренировок', 7990.00, 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=800&h=800&fit=crop'),
            ('750e8400-e29b-41d4-a716-446655440007', '550e8400-e29b-41d4-a716-446655440003', 'Книга "Искусство программирования"', 'Классический учебник по программированию', 2990.00, 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800&h=800&fit=crop'),
            ('750e8400-e29b-41d4-a716-446655440008', '550e8400-e29b-41d4-a716-446655440003', 'Художественный роман', 'Бестселлер современной литературы', 990.00, 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800&h=800&fit=crop')
        ]
        
        for product_id, seller_id, name, description, price, image in products_data:
            cur.execute(
                "INSERT INTO t_p59162637_messenger_creation_p.products (id, seller_id, name, description, price, image) VALUES (%s, %s, %s, %s, %s, %s) ON CONFLICT (id) DO NOTHING",
                (product_id, seller_id, name, description, price, image)
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
            'body': json.dumps({'success': True, 'message': 'Test data added successfully'}),
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
