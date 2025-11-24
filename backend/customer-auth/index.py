'''
Business: Customer authentication API - registration, login, profile management
Args: event with httpMethod, body, headers (X-Customer-Token)
Returns: HTTP response with customer data or auth token
'''

import json
import os
import hashlib
import secrets
from datetime import datetime, timedelta
from typing import Dict, Any, Optional
import psycopg2
from psycopg2.extras import RealDictCursor

def get_db_connection():
    '''Get database connection using DATABASE_URL from environment'''
    return psycopg2.connect(os.environ['DATABASE_URL'], cursor_factory=RealDictCursor)

def hash_password(password: str) -> str:
    '''Hash password using SHA-256'''
    return hashlib.sha256(password.encode()).hexdigest()

def generate_token() -> str:
    '''Generate secure random token'''
    return secrets.token_urlsafe(32)

def create_session(conn, customer_id: int) -> str:
    '''Create new session for customer'''
    token = generate_token()
    expires_at = datetime.now() + timedelta(days=30)
    
    with conn.cursor() as cur:
        cur.execute(
            "INSERT INTO customer_sessions (customer_id, token, expires_at) VALUES (%s, %s, %s)",
            (customer_id, token, expires_at)
        )
    conn.commit()
    return token

def validate_session(conn, token: str) -> Optional[Dict[str, Any]]:
    '''Validate session token and return customer data'''
    with conn.cursor() as cur:
        cur.execute("""
            SELECT c.id, c.email, c.full_name, c.phone, c.avatar_url, c.address, c.city, c.created_at
            FROM customers c
            JOIN customer_sessions cs ON c.id = cs.customer_id
            WHERE cs.token = %s AND cs.expires_at > NOW()
        """, (token,))
        return cur.fetchone()

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    method = event.get('httpMethod', 'GET')
    
    # Handle CORS preflight
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-Customer-Token',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }
    
    conn = get_db_connection()
    
    try:
        # GET - validate session and return customer profile
        if method == 'GET':
            token = event.get('headers', {}).get('X-Customer-Token', '')
            if not token:
                return {
                    'statusCode': 401,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'No token provided'})
                }
            
            customer = validate_session(conn, token)
            if not customer:
                return {
                    'statusCode': 401,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Invalid or expired token'})
                }
            
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps(dict(customer), default=str)
            }
        
        # POST - register or login
        if method == 'POST':
            body = json.loads(event.get('body', '{}'))
            action = body.get('action')  # 'register' or 'login'
            
            if action == 'register':
                email = body.get('email', '').strip().lower()
                password = body.get('password', '')
                full_name = body.get('full_name', '').strip()
                phone = body.get('phone', '').strip()
                
                if not email or not password or not full_name:
                    return {
                        'statusCode': 400,
                        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                        'body': json.dumps({'error': 'Email, password and full name are required'})
                    }
                
                # Check if email already exists
                with conn.cursor() as cur:
                    cur.execute("SELECT id FROM customers WHERE email = %s", (email,))
                    if cur.fetchone():
                        return {
                            'statusCode': 400,
                            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                            'body': json.dumps({'error': 'Email already registered'})
                        }
                
                # Create new customer
                password_hash = hash_password(password)
                with conn.cursor() as cur:
                    cur.execute("""
                        INSERT INTO customers (email, password_hash, full_name, phone)
                        VALUES (%s, %s, %s, %s)
                        RETURNING id, email, full_name, phone, created_at
                    """, (email, password_hash, full_name, phone))
                    customer = cur.fetchone()
                conn.commit()
                
                # Create session
                token = create_session(conn, customer['id'])
                
                return {
                    'statusCode': 200,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({
                        'token': token,
                        'customer': dict(customer)
                    }, default=str)
                }
            
            elif action == 'login':
                email = body.get('email', '').strip().lower()
                password = body.get('password', '')
                
                if not email or not password:
                    return {
                        'statusCode': 400,
                        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                        'body': json.dumps({'error': 'Email and password are required'})
                    }
                
                # Find customer and verify password
                password_hash = hash_password(password)
                with conn.cursor() as cur:
                    cur.execute("""
                        SELECT id, email, full_name, phone, avatar_url, address, city, created_at
                        FROM customers
                        WHERE email = %s AND password_hash = %s
                    """, (email, password_hash))
                    customer = cur.fetchone()
                
                if not customer:
                    return {
                        'statusCode': 401,
                        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                        'body': json.dumps({'error': 'Invalid email or password'})
                    }
                
                # Create session
                token = create_session(conn, customer['id'])
                
                return {
                    'statusCode': 200,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({
                        'token': token,
                        'customer': dict(customer)
                    }, default=str)
                }
        
        # PUT - update profile
        if method == 'PUT':
            token = event.get('headers', {}).get('X-Customer-Token', '')
            if not token:
                return {
                    'statusCode': 401,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'No token provided'})
                }
            
            customer = validate_session(conn, token)
            if not customer:
                return {
                    'statusCode': 401,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Invalid or expired token'})
                }
            
            body = json.loads(event.get('body', '{}'))
            full_name = body.get('full_name', '').strip()
            phone = body.get('phone', '').strip()
            address = body.get('address', '').strip()
            city = body.get('city', '').strip()
            avatar_url = body.get('avatar_url', '').strip()
            
            # Update customer profile
            with conn.cursor() as cur:
                cur.execute("""
                    UPDATE customers
                    SET full_name = %s, phone = %s, address = %s, city = %s, 
                        avatar_url = %s, updated_at = NOW()
                    WHERE id = %s
                    RETURNING id, email, full_name, phone, avatar_url, address, city, created_at, updated_at
                """, (full_name, phone, address, city, avatar_url, customer['id']))
                updated_customer = cur.fetchone()
            conn.commit()
            
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps(dict(updated_customer), default=str)
            }
        
        return {
            'statusCode': 405,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Method not allowed'})
        }
    
    finally:
        conn.close()
