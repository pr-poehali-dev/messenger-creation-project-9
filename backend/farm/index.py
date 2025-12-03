import json
import os
import psycopg2
from typing import Dict, Any
from datetime import datetime, timedelta

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Нано-Ферма игровая логика (посадка, сбор, состояние)
    Args: event - httpMethod, body, queryStringParameters
          context - request_id, function_name
    Returns: HTTP response с данными фермы
    '''
    method = event.get('httpMethod', 'GET')
    
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
        params = event.get('queryStringParameters', {})
        player_id = int(params.get('player_id', 0))
        action = params.get('action', 'state')
        
        if action == 'state':
            cur.execute(
                "SELECT id, username, coins, crystals, energy, max_energy, experience, level, last_energy_update FROM nano_players WHERE id = %s",
                (player_id,)
            )
            player = cur.fetchone()
            
            last_update = player[8]
            now = datetime.now()
            energy_diff = int((now - last_update).total_seconds() / 60)
            new_energy = min(player[4] + energy_diff, player[5])
            
            if energy_diff > 0:
                cur.execute("UPDATE nano_players SET energy = %s, last_energy_update = %s WHERE id = %s", (new_energy, now, player_id))
                conn.commit()
            
            cur.execute(
                "SELECT pb.id, pb.bed_number, pb.plant_type_id, pb.planted_at, pb.ready_at, pb.is_ready, pb.is_withered, pt.name, pt.emoji, pt.grow_time FROM nano_player_beds pb LEFT JOIN nano_plant_types pt ON pb.plant_type_id = pt.id WHERE pb.player_id = %s ORDER BY pb.bed_number",
                (player_id,)
            )
            beds = cur.fetchall()
            
            beds_data = []
            for bed in beds:
                bed_data = {
                    'id': bed[0],
                    'bed_number': bed[1],
                    'plant_type_id': bed[2],
                    'planted_at': bed[3].isoformat() if bed[3] else None,
                    'ready_at': bed[4].isoformat() if bed[4] else None,
                    'is_ready': bed[5],
                    'is_withered': bed[6],
                    'plant_name': bed[7],
                    'plant_emoji': bed[8],
                    'grow_time': bed[9]
                }
                beds_data.append(bed_data)
            
            cur.execute("SELECT pt.* FROM nano_plant_types pt INNER JOIN nano_player_discovered_plants pd ON pt.id = pd.plant_type_id WHERE pd.player_id = %s", (player_id,))
            discovered_plants = cur.fetchall()
            
            plants_data = []
            for plant in discovered_plants:
                plants_data.append({
                    'id': plant[0],
                    'name': plant[1],
                    'emoji': plant[2],
                    'plant_type': plant[3],
                    'grow_time': plant[4],
                    'yield_coins': plant[5],
                    'yield_energy': plant[6],
                    'energy_cost': plant[7],
                    'price_coins': plant[8],
                    'required_level': plant[10]
                })
            
            cur.close()
            conn.close()
            
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({
                    'player': {
                        'id': player[0],
                        'username': player[1],
                        'coins': player[2],
                        'crystals': player[3],
                        'energy': new_energy,
                        'max_energy': player[5],
                        'experience': player[6],
                        'level': player[7]
                    },
                    'beds': beds_data,
                    'discovered_plants': plants_data
                }),
                'isBase64Encoded': False
            }
    
    elif method == 'POST':
        body = json.loads(event.get('body', '{}'))
        player_id = body.get('player_id')
        action = body.get('action')
        
        if action == 'plant':
            bed_number = body.get('bed_number')
            plant_type_id = body.get('plant_type_id')
            
            cur.execute("SELECT energy, coins FROM nano_players WHERE id = %s", (player_id,))
            player = cur.fetchone()
            
            cur.execute("SELECT energy_cost, price_coins, grow_time FROM nano_plant_types WHERE id = %s", (plant_type_id,))
            plant = cur.fetchone()
            
            if player[0] < plant[0]:
                cur.close()
                conn.close()
                return {
                    'statusCode': 400,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Недостаточно энергии'}),
                    'isBase64Encoded': False
                }
            
            if player[1] < plant[1]:
                cur.close()
                conn.close()
                return {
                    'statusCode': 400,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Недостаточно монет'}),
                    'isBase64Encoded': False
                }
            
            now = datetime.now()
            ready_at = now + timedelta(seconds=plant[2])
            
            cur.execute(
                "UPDATE nano_player_beds SET plant_type_id = %s, planted_at = %s, ready_at = %s, is_ready = FALSE, is_withered = FALSE WHERE player_id = %s AND bed_number = %s",
                (plant_type_id, now, ready_at, player_id, bed_number)
            )
            
            new_energy = player[0] - plant[0]
            new_coins = player[1] - plant[1]
            cur.execute("UPDATE nano_players SET energy = %s, coins = %s WHERE id = %s", (new_energy, new_coins, player_id))
            
            conn.commit()
            cur.close()
            conn.close()
            
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'message': 'Растение посажено'}),
                'isBase64Encoded': False
            }
        
        elif action == 'harvest':
            bed_number = body.get('bed_number')
            
            cur.execute(
                "SELECT pb.plant_type_id, pb.ready_at, pt.yield_coins, pt.yield_energy FROM nano_player_beds pb INNER JOIN nano_plant_types pt ON pb.plant_type_id = pt.id WHERE pb.player_id = %s AND pb.bed_number = %s",
                (player_id, bed_number)
            )
            bed = cur.fetchone()
            
            if not bed or bed[1] > datetime.now():
                cur.close()
                conn.close()
                return {
                    'statusCode': 400,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Растение еще не готово'}),
                    'isBase64Encoded': False
                }
            
            cur.execute("UPDATE nano_player_beds SET plant_type_id = NULL, planted_at = NULL, ready_at = NULL, is_ready = FALSE WHERE player_id = %s AND bed_number = %s", (player_id, bed_number))
            
            cur.execute("SELECT coins, energy, max_energy, experience, level FROM nano_players WHERE id = %s", (player_id,))
            player = cur.fetchone()
            
            new_coins = player[0] + bed[2]
            new_energy = min(player[1] + bed[3], player[2])
            new_exp = player[3] + 10
            new_level = player[4]
            
            if new_exp >= new_level * 100:
                new_level += 1
            
            cur.execute("UPDATE nano_players SET coins = %s, energy = %s, experience = %s, level = %s WHERE id = %s", (new_coins, new_energy, new_exp, new_level, player_id))
            
            cur.execute("SELECT id FROM nano_player_inventory WHERE player_id = %s AND plant_type_id = %s", (player_id, bed[0]))
            inventory = cur.fetchone()
            
            if inventory:
                cur.execute("UPDATE nano_player_inventory SET quantity = quantity + 1 WHERE id = %s", (inventory[0],))
            else:
                cur.execute("INSERT INTO nano_player_inventory (player_id, plant_type_id, quantity) VALUES (%s, %s, 1)", (player_id, bed[0]))
            
            cur.execute("UPDATE nano_player_quests SET progress = progress + 1 WHERE player_id = %s AND quest_id IN (SELECT id FROM nano_quests WHERE quest_type = 'harvest') AND is_completed = FALSE", (player_id,))
            
            conn.commit()
            cur.close()
            conn.close()
            
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'message': 'Урожай собран', 'coins': bed[2], 'energy': bed[3]}),
                'isBase64Encoded': False
            }
    
    cur.close()
    conn.close()
    return {'statusCode': 405, 'headers': {'Access-Control-Allow-Origin': '*'}, 'body': json.dumps({'error': 'Method not allowed'}), 'isBase64Encoded': False}
