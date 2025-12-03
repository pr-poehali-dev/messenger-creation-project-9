import json
import os
import psycopg2
import bcrypt
import secrets
from typing import Dict, Any

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Нано-Ферма авторизация
    Args: event - httpMethod, body
          context - request_id, function_name
    Returns: player данные с токеном
    '''
    method = event.get('httpMethod', 'GET')
    
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
    
    dsn = os.environ.get('DATABASE_URL')
    conn = psycopg2.connect(dsn)
    cur = conn.cursor()
    
    if method == 'POST':
        body = json.loads(event.get('body', '{}'))
        action = body.get('action')
        
        if action == 'register':
            username = body.get('username')
            email = body.get('email')
            password = body.get('password')
            
            salt = bcrypt.gensalt()
            password_hash = bcrypt.hashpw(password.encode('utf-8'), salt).decode('utf-8')
            session_token = secrets.token_urlsafe(32)
            
            cur.execute(
                "INSERT INTO nano_players (username, email, password_hash, session_token) VALUES (%s, %s, %s, %s) RETURNING id, username, coins, crystals, energy, level",
                (username, email, password_hash, session_token)
            )
            player = cur.fetchone()
            
            for i in range(9):
                cur.execute("INSERT INTO nano_player_beds (player_id, bed_number) VALUES (%s, %s)", (player[0], i))
            
            cur.execute("SELECT id FROM nano_plant_types WHERE id IN (1, 2)")
            for plant in cur.fetchall():
                cur.execute("INSERT INTO nano_player_discovered_plants (player_id, plant_type_id) VALUES (%s, %s)", (player[0], plant[0]))
            
            cur.execute("SELECT id FROM nano_quests WHERE required_level <= 1")
            for quest in cur.fetchall():
                cur.execute("INSERT INTO nano_player_quests (player_id, quest_id) VALUES (%s, %s)", (player[0], quest[0]))
            
            conn.commit()
            cur.close()
            conn.close()
            
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'player_id': player[0], 'username': player[1], 'session_token': session_token}),
                'isBase64Encoded': False
            }
        
        elif action == 'login':
            username = body.get('username')
            password = body.get('password')
            
            cur.execute("SELECT id, username, password_hash FROM nano_players WHERE username = %s", (username,))
            player = cur.fetchone()
            
            if not player or not bcrypt.checkpw(password.encode('utf-8'), player[2].encode('utf-8')):
                cur.close()
                conn.close()
                return {
                    'statusCode': 401,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Неверный логин или пароль'}),
                    'isBase64Encoded': False
                }
            
            session_token = secrets.token_urlsafe(32)
            cur.execute("UPDATE nano_players SET session_token = %s WHERE id = %s", (session_token, player[0]))
            conn.commit()
            cur.close()
            conn.close()
            
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'player_id': player[0], 'username': player[1], 'session_token': session_token}),
                'isBase64Encoded': False
            }
    
    cur.close()
    conn.close()
    return {'statusCode': 405, 'headers': {'Access-Control-Allow-Origin': '*'}, 'body': json.dumps({'error': 'Method not allowed'}), 'isBase64Encoded': False}
