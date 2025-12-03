import json
import os
import psycopg2
from typing import Dict, Any
from datetime import datetime, timedelta

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
                'Access-Control-Allow-Methods': 'GET, POST, PUT, OPTIONS',
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
            action = query_params.get('action', 'state')
            
            if action == 'state':
                cursor.execute("""
                    SELECT coins, wood, stone, food, iron, gold, population, max_population
                    FROM player_resources WHERE player_id = %s
                """, (player_id,))
                resources = cursor.fetchone()
                
                if not resources:
                    return {
                        'statusCode': 404,
                        'headers': {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
                        'body': json.dumps({'error': 'Игрок не найден'}),
                        'isBase64Encoded': False
                    }
                
                cursor.execute("""
                    SELECT pb.id, pb.building_type_id, pb.position_x, pb.position_y, 
                           pb.level, pb.is_building, pb.build_complete_at, pb.last_collected,
                           bt.name, bt.category, bt.produces_resource, bt.production_rate, 
                           bt.production_interval, bt.image_url, bt.max_level
                    FROM player_buildings pb
                    JOIN building_types bt ON pb.building_type_id = bt.id
                    WHERE pb.player_id = %s
                """, (player_id,))
                buildings_data = cursor.fetchall()
                
                buildings = []
                for b in buildings_data:
                    buildings.append({
                        'id': b[0],
                        'type_id': b[1],
                        'x': b[2],
                        'y': b[3],
                        'level': b[4],
                        'is_building': b[5],
                        'build_complete_at': b[6].isoformat() if b[6] else None,
                        'last_collected': b[7].isoformat() if b[7] else None,
                        'name': b[8],
                        'category': b[9],
                        'produces': b[10],
                        'production_rate': b[11] * b[4],
                        'production_interval': b[12],
                        'image': b[13],
                        'max_level': b[14]
                    })
                
                return {
                    'statusCode': 200,
                    'headers': {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
                    'body': json.dumps({
                        'resources': {
                            'coins': resources[0],
                            'wood': resources[1],
                            'stone': resources[2],
                            'food': resources[3],
                            'iron': resources[4],
                            'gold': resources[5],
                            'population': resources[6],
                            'max_population': resources[7]
                        },
                        'buildings': buildings
                    }),
                    'isBase64Encoded': False
                }
            
            elif action == 'building_types':
                cursor.execute("""
                    SELECT id, name, category, description, cost_coins, cost_wood, 
                           cost_stone, cost_iron, build_time, produces_resource, 
                           production_rate, production_interval, provides_population, 
                           image_url, max_level, upgrade_cost_multiplier
                    FROM building_types
                    ORDER BY category, cost_coins
                """)
                types = cursor.fetchall()
                
                building_types = []
                for t in types:
                    building_types.append({
                        'id': t[0],
                        'name': t[1],
                        'category': t[2],
                        'description': t[3],
                        'cost': {
                            'coins': t[4],
                            'wood': t[5],
                            'stone': t[6],
                            'iron': t[7]
                        },
                        'build_time': t[8],
                        'produces': t[9],
                        'production_rate': t[10],
                        'production_interval': t[11],
                        'provides_population': t[12],
                        'image': t[13],
                        'max_level': t[14],
                        'upgrade_multiplier': float(t[15])
                    })
                
                return {
                    'statusCode': 200,
                    'headers': {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
                    'body': json.dumps({'building_types': building_types}),
                    'isBase64Encoded': False
                }
        
        elif method == 'POST':
            body = json.loads(event.get('body', '{}'))
            action = body.get('action')
            
            if action == 'build':
                building_type_id = body.get('building_type_id')
                x = body.get('x')
                y = body.get('y')
                
                cursor.execute("""
                    SELECT cost_coins, cost_wood, cost_stone, cost_iron, build_time, name
                    FROM building_types WHERE id = %s
                """, (building_type_id,))
                building_type = cursor.fetchone()
                
                if not building_type:
                    return {
                        'statusCode': 404,
                        'headers': {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
                        'body': json.dumps({'error': 'Тип здания не найден'}),
                        'isBase64Encoded': False
                    }
                
                cost_coins, cost_wood, cost_stone, cost_iron, build_time, building_name = building_type
                
                cursor.execute("""
                    SELECT coins, wood, stone, iron FROM player_resources WHERE player_id = %s
                """, (player_id,))
                resources = cursor.fetchone()
                
                if resources[0] < cost_coins or resources[1] < cost_wood or resources[2] < cost_stone or resources[3] < cost_iron:
                    return {
                        'statusCode': 400,
                        'headers': {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
                        'body': json.dumps({'error': 'Недостаточно ресурсов'}),
                        'isBase64Encoded': False
                    }
                
                cursor.execute("""
                    SELECT id FROM player_buildings WHERE player_id = %s AND position_x = %s AND position_y = %s
                """, (player_id, x, y))
                if cursor.fetchone():
                    return {
                        'statusCode': 400,
                        'headers': {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
                        'body': json.dumps({'error': 'Эта ячейка уже занята'}),
                        'isBase64Encoded': False
                    }
                
                cursor.execute("""
                    UPDATE player_resources 
                    SET coins = coins - %s, wood = wood - %s, stone = stone - %s, iron = iron - %s
                    WHERE player_id = %s
                """, (cost_coins, cost_wood, cost_stone, cost_iron, player_id))
                
                build_complete_at = datetime.now() + timedelta(seconds=build_time)
                cursor.execute("""
                    INSERT INTO player_buildings 
                    (player_id, building_type_id, position_x, position_y, is_building, build_complete_at)
                    VALUES (%s, %s, %s, %s, %s, %s)
                    RETURNING id
                """, (player_id, building_type_id, x, y, True, build_complete_at))
                building_id = cursor.fetchone()[0]
                
                conn.commit()
                
                return {
                    'statusCode': 200,
                    'headers': {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
                    'body': json.dumps({
                        'success': True,
                        'building_id': building_id,
                        'message': f'{building_name} строится...',
                        'complete_at': build_complete_at.isoformat()
                    }),
                    'isBase64Encoded': False
                }
            
            elif action == 'upgrade':
                building_id = body.get('building_id')
                
                cursor.execute("""
                    SELECT pb.level, bt.cost_coins, bt.cost_wood, bt.cost_stone, bt.cost_iron,
                           bt.max_level, bt.upgrade_cost_multiplier, bt.name
                    FROM player_buildings pb
                    JOIN building_types bt ON pb.building_type_id = bt.id
                    WHERE pb.id = %s AND pb.player_id = %s AND pb.is_building = FALSE
                """, (building_id, player_id))
                building = cursor.fetchone()
                
                if not building:
                    return {
                        'statusCode': 404,
                        'headers': {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
                        'body': json.dumps({'error': 'Здание не найдено'}),
                        'isBase64Encoded': False
                    }
                
                current_level, base_coins, base_wood, base_stone, base_iron, max_level, multiplier, name = building
                
                if current_level >= max_level:
                    return {
                        'statusCode': 400,
                        'headers': {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
                        'body': json.dumps({'error': 'Достигнут максимальный уровень'}),
                        'isBase64Encoded': False
                    }
                
                upgrade_coins = int(base_coins * (multiplier ** current_level))
                upgrade_wood = int(base_wood * (multiplier ** current_level))
                upgrade_stone = int(base_stone * (multiplier ** current_level))
                upgrade_iron = int(base_iron * (multiplier ** current_level))
                
                cursor.execute("""
                    SELECT coins, wood, stone, iron FROM player_resources WHERE player_id = %s
                """, (player_id,))
                resources = cursor.fetchone()
                
                if resources[0] < upgrade_coins or resources[1] < upgrade_wood or resources[2] < upgrade_stone or resources[3] < upgrade_iron:
                    return {
                        'statusCode': 400,
                        'headers': {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
                        'body': json.dumps({'error': 'Недостаточно ресурсов для улучшения'}),
                        'isBase64Encoded': False
                    }
                
                cursor.execute("""
                    UPDATE player_resources 
                    SET coins = coins - %s, wood = wood - %s, stone = stone - %s, iron = iron - %s
                    WHERE player_id = %s
                """, (upgrade_coins, upgrade_wood, upgrade_stone, upgrade_iron, player_id))
                
                cursor.execute("""
                    UPDATE player_buildings 
                    SET level = level + 1
                    WHERE id = %s
                """, (building_id,))
                
                conn.commit()
                
                return {
                    'statusCode': 200,
                    'headers': {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
                    'body': json.dumps({
                        'success': True,
                        'message': f'{name} улучшено до уровня {current_level + 1}!',
                        'new_level': current_level + 1
                    }),
                    'isBase64Encoded': False
                }
            
            elif action == 'collect':
                building_id = body.get('building_id')
                
                cursor.execute("""
                    SELECT pb.last_collected, bt.produces_resource, bt.production_rate, 
                           bt.production_interval, pb.level
                    FROM player_buildings pb
                    JOIN building_types bt ON pb.building_type_id = bt.id
                    WHERE pb.id = %s AND pb.player_id = %s AND pb.is_building = FALSE
                """, (building_id, player_id))
                building = cursor.fetchone()
                
                if not building:
                    return {
                        'statusCode': 404,
                        'headers': {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
                        'body': json.dumps({'error': 'Здание не найдено или еще строится'}),
                        'isBase64Encoded': False
                    }
                
                last_collected, resource_type, base_rate, interval, level = building
                
                if not resource_type:
                    return {
                        'statusCode': 400,
                        'headers': {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
                        'body': json.dumps({'error': 'Это здание не производит ресурсы'}),
                        'isBase64Encoded': False
                    }
                
                now = datetime.now()
                time_passed = (now - last_collected).total_seconds()
                
                if time_passed < interval:
                    return {
                        'statusCode': 400,
                        'headers': {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
                        'body': json.dumps({
                            'error': 'Еще рано собирать',
                            'wait_seconds': int(interval - time_passed)
                        }),
                        'isBase64Encoded': False
                    }
                
                periods = int(time_passed / interval)
                rate_with_level = base_rate * level
                amount = rate_with_level * periods
                
                cursor.execute(f"""
                    UPDATE player_resources 
                    SET {resource_type} = {resource_type} + %s
                    WHERE player_id = %s
                """, (amount, player_id))
                
                cursor.execute("""
                    UPDATE player_buildings 
                    SET last_collected = %s
                    WHERE id = %s
                """, (now, building_id))
                
                conn.commit()
                
                return {
                    'statusCode': 200,
                    'headers': {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
                    'body': json.dumps({
                        'success': True,
                        'collected': {
                            'resource': resource_type,
                            'amount': amount
                        }
                    }),
                    'isBase64Encoded': False
                }
            
            elif action == 'complete_building':
                building_id = body.get('building_id')
                
                cursor.execute("""
                    SELECT is_building, build_complete_at, building_type_id
                    FROM player_buildings
                    WHERE id = %s AND player_id = %s
                """, (building_id, player_id))
                building = cursor.fetchone()
                
                if not building or not building[0]:
                    return {
                        'statusCode': 400,
                        'headers': {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
                        'body': json.dumps({'error': 'Здание не строится'}),
                        'isBase64Encoded': False
                    }
                
                if datetime.now() < building[1]:
                    return {
                        'statusCode': 400,
                        'headers': {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
                        'body': json.dumps({'error': 'Строительство еще не завершено'}),
                        'isBase64Encoded': False
                    }
                
                cursor.execute("""
                    UPDATE player_buildings 
                    SET is_building = FALSE, build_complete_at = NULL
                    WHERE id = %s
                """, (building_id,))
                
                cursor.execute("""
                    SELECT provides_population FROM building_types WHERE id = %s
                """, (building[2],))
                provides_pop = cursor.fetchone()[0]
                
                if provides_pop > 0:
                    cursor.execute("""
                        UPDATE player_resources 
                        SET max_population = max_population + %s
                        WHERE player_id = %s
                    """, (provides_pop, player_id))
                
                conn.commit()
                
                return {
                    'statusCode': 200,
                    'headers': {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
                    'body': json.dumps({'success': True, 'message': 'Строительство завершено'}),
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
