"""
Администраторская функция для начисления бонусов игрокам
Требует секретный ADMIN_KEY для доступа
"""
import json
import os
import psycopg2
from typing import Dict, Any

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    """
    Начисляет бонусы (золотые монеты, обычные монеты) игроку по username
    
    Args:
        event - dict с httpMethod, headers, body
        context - объект с атрибутами request_id и др.
    
    Returns:
        HTTP response dict
    """
    method: str = event.get('httpMethod', 'GET')
    
    # CORS
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-Admin-Key',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {'Content-Type': 'application/json'},
            'body': json.dumps({'error': 'Method not allowed'}),
            'isBase64Encoded': False
        }
    
    # Проверка admin ключа
    headers = event.get('headers', {})
    admin_key = headers.get('X-Admin-Key') or headers.get('x-admin-key')
    
    if not admin_key or admin_key != os.environ.get('ADMIN_KEY'):
        return {
            'statusCode': 403,
            'headers': {'Content-Type': 'application/json'},
            'body': json.dumps({'error': 'Forbidden: Invalid admin key'}),
            'isBase64Encoded': False
        }
    
    # Парсим body
    body_data = json.loads(event.get('body', '{}'))
    username = body_data.get('username')
    gold_coins = body_data.get('gold_coins', 0)
    coins = body_data.get('coins', 0)
    
    if not username:
        return {
            'statusCode': 400,
            'headers': {'Content-Type': 'application/json'},
            'body': json.dumps({'error': 'Username is required'}),
            'isBase64Encoded': False
        }
    
    # Подключаемся к БД
    conn = psycopg2.connect(os.environ['DATABASE_URL'])
    cur = conn.cursor()
    
    try:
        # Находим игрока
        cur.execute(
            "SELECT id FROM t_p59162637_messenger_creation_p.players WHERE username = %s",
            (username,)
        )
        player = cur.fetchone()
        
        if not player:
            cur.close()
            conn.close()
            return {
                'statusCode': 404,
                'headers': {'Content-Type': 'application/json'},
                'body': json.dumps({'error': f'Player {username} not found'}),
                'isBase64Encoded': False
            }
        
        player_id = player[0]
        
        # Обновляем ресурсы
        if gold_coins > 0:
            cur.execute(
                """UPDATE t_p59162637_messenger_creation_p.player_resources 
                   SET gold_coins = gold_coins + %s, updated_at = NOW() 
                   WHERE player_id = %s""",
                (gold_coins, player_id)
            )
        
        if coins > 0:
            cur.execute(
                """UPDATE t_p59162637_messenger_creation_p.player_resources 
                   SET coins = coins + %s, updated_at = NOW() 
                   WHERE player_id = %s""",
                (coins, player_id)
            )
        
        conn.commit()
        
        # Получаем обновленные данные
        cur.execute(
            """SELECT coins, gold_coins FROM t_p59162637_messenger_creation_p.player_resources 
               WHERE player_id = %s""",
            (player_id,)
        )
        resources = cur.fetchone()
        
        cur.close()
        conn.close()
        
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json'},
            'body': json.dumps({
                'success': True,
                'username': username,
                'added_gold_coins': gold_coins,
                'added_coins': coins,
                'total_coins': resources[0],
                'total_gold_coins': resources[1]
            }),
            'isBase64Encoded': False
        }
        
    except Exception as e:
        conn.rollback()
        cur.close()
        conn.close()
        
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json'},
            'body': json.dumps({'error': f'Database error: {str(e)}'}),
            'isBase64Encoded': False
        }
