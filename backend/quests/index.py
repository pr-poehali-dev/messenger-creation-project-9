import json
import os
import psycopg2
from typing import Dict, Any
from datetime import datetime

def get_db_connection():
    dsn = os.environ.get('DATABASE_URL')
    return psycopg2.connect(dsn)

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    method = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-Player-Id',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    headers_dict = event.get('headers', {})
    player_id = headers_dict.get('X-Player-Id') or headers_dict.get('x-player-id')
    
    if not player_id:
        return {
            'statusCode': 401,
            'headers': {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
            'body': json.dumps({'error': 'Необходима авторизация'}),
            'isBase64Encoded': False
        }
    
    conn = None
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        
        if method == 'GET':
            query_params = event.get('queryStringParameters') or {}
            action = query_params.get('action', 'list')
            
            if action == 'list':
                cursor.execute("SELECT level FROM players WHERE id = %s", (player_id,))
                player_level = cursor.fetchone()[0]
                
                cursor.execute("""
                    SELECT q.id, q.title, q.description, q.quest_type, q.target_value,
                           q.reward_coins, q.reward_wood, q.reward_stone, q.reward_food, 
                           q.reward_iron, q.reward_experience, q.required_level, q.icon,
                           pq.current_progress, pq.completed, pq.id as player_quest_id
                    FROM quests q
                    LEFT JOIN player_quests pq ON q.id = pq.quest_id AND pq.player_id = %s
                    WHERE q.required_level <= %s
                    ORDER BY q.required_level, q.id
                """, (player_id, player_level))
                
                quests_data = cursor.fetchall()
                quests = []
                
                for q in quests_data:
                    quests.append({
                        'id': q[0],
                        'title': q[1],
                        'description': q[2],
                        'type': q[3],
                        'target': q[4],
                        'rewards': {
                            'coins': q[5],
                            'wood': q[6],
                            'stone': q[7],
                            'food': q[8],
                            'iron': q[9],
                            'experience': q[10]
                        },
                        'required_level': q[11],
                        'icon': q[12],
                        'progress': q[13] or 0,
                        'completed': q[14] or False,
                        'player_quest_id': q[15],
                        'active': q[15] is not None and not (q[14] or False)
                    })
                
                return {
                    'statusCode': 200,
                    'headers': {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
                    'body': json.dumps({'quests': quests}),
                    'isBase64Encoded': False
                }
        
        elif method == 'POST':
            body = json.loads(event.get('body', '{}'))
            action = body.get('action')
            
            if action == 'start':
                quest_id = body.get('quest_id')
                
                cursor.execute("""
                    SELECT required_level FROM quests WHERE id = %s
                """, (quest_id,))
                quest = cursor.fetchone()
                
                if not quest:
                    return {
                        'statusCode': 404,
                        'headers': {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
                        'body': json.dumps({'error': 'Квест не найден'}),
                        'isBase64Encoded': False
                    }
                
                cursor.execute("SELECT level FROM players WHERE id = %s", (player_id,))
                player_level = cursor.fetchone()[0]
                
                if player_level < quest[0]:
                    return {
                        'statusCode': 400,
                        'headers': {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
                        'body': json.dumps({'error': 'Недостаточный уровень'}),
                        'isBase64Encoded': False
                    }
                
                cursor.execute("""
                    INSERT INTO player_quests (player_id, quest_id, current_progress)
                    VALUES (%s, %s, 0)
                    ON CONFLICT (player_id, quest_id) DO NOTHING
                    RETURNING id
                """, (player_id, quest_id))
                
                result = cursor.fetchone()
                if result:
                    conn.commit()
                    return {
                        'statusCode': 200,
                        'headers': {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
                        'body': json.dumps({'success': True, 'message': 'Квест начат'}),
                        'isBase64Encoded': False
                    }
                else:
                    return {
                        'statusCode': 400,
                        'headers': {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
                        'body': json.dumps({'error': 'Квест уже активен'}),
                        'isBase64Encoded': False
                    }
            
            elif action == 'claim':
                quest_id = body.get('quest_id')
                
                cursor.execute("""
                    SELECT pq.current_progress, q.target_value, q.reward_coins, q.reward_wood,
                           q.reward_stone, q.reward_food, q.reward_iron, q.reward_experience,
                           pq.completed
                    FROM player_quests pq
                    JOIN quests q ON pq.quest_id = q.id
                    WHERE pq.player_id = %s AND pq.quest_id = %s
                """, (player_id, quest_id))
                
                quest_data = cursor.fetchone()
                
                if not quest_data:
                    return {
                        'statusCode': 404,
                        'headers': {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
                        'body': json.dumps({'error': 'Квест не найден или не начат'}),
                        'isBase64Encoded': False
                    }
                
                progress, target, r_coins, r_wood, r_stone, r_food, r_iron, r_exp, completed = quest_data
                
                if completed:
                    return {
                        'statusCode': 400,
                        'headers': {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
                        'body': json.dumps({'error': 'Квест уже завершен'}),
                        'isBase64Encoded': False
                    }
                
                if progress < target:
                    return {
                        'statusCode': 400,
                        'headers': {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
                        'body': json.dumps({'error': 'Квест еще не выполнен'}),
                        'isBase64Encoded': False
                    }
                
                cursor.execute("""
                    UPDATE player_resources
                    SET coins = coins + %s, wood = wood + %s, stone = stone + %s,
                        food = food + %s, iron = iron + %s
                    WHERE player_id = %s
                """, (r_coins, r_wood, r_stone, r_food, r_iron, player_id))
                
                cursor.execute("""
                    UPDATE players
                    SET experience = experience + %s
                    WHERE id = %s
                """, (r_exp, player_id))
                
                cursor.execute("""
                    UPDATE player_quests
                    SET completed = TRUE, completed_at = CURRENT_TIMESTAMP
                    WHERE player_id = %s AND quest_id = %s
                """, (player_id, quest_id))
                
                cursor.execute("SELECT experience FROM players WHERE id = %s", (player_id,))
                exp = cursor.fetchone()[0]
                new_level = 1 + (exp // 1000)
                
                cursor.execute("UPDATE players SET level = %s WHERE id = %s", (new_level, player_id))
                
                conn.commit()
                
                return {
                    'statusCode': 200,
                    'headers': {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
                    'body': json.dumps({
                        'success': True,
                        'message': 'Награда получена!',
                        'rewards': {
                            'coins': r_coins,
                            'wood': r_wood,
                            'stone': r_stone,
                            'food': r_food,
                            'iron': r_iron,
                            'experience': r_exp
                        }
                    }),
                    'isBase64Encoded': False
                }
        
        return {
            'statusCode': 405,
            'headers': {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
            'body': json.dumps({'error': 'Метод не поддерживается'}),
            'isBase64Encoded': False
        }
    
    except Exception as e:
        if conn:
            conn.rollback()
        return {
            'statusCode': 500,
            'headers': {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
            'body': json.dumps({'error': str(e)}),
            'isBase64Encoded': False
        }
    
    finally:
        if conn:
            cursor.close()
            conn.close()
