/**
 * Business: User registration and authentication with JWT tokens
 * Args: event with httpMethod, body (email, password, username)
 * Returns: HTTP response with JWT token or error
 */

const crypto = require('crypto');
const { Client } = require('pg');

const JWT_SECRET = process.env.JWT_SECRET || '';
const DATABASE_URL = process.env.DATABASE_URL || '';

function hashPassword(password) {
  return crypto.createHash('sha256').update(password).digest('hex');
}

function createJWT(userId, email) {
  const header = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).toString('base64url');
  const payload = Buffer.from(JSON.stringify({ 
    userId, 
    email, 
    exp: Math.floor(Date.now() / 1000) + (30 * 24 * 60 * 60)
  })).toString('base64url');
  
  const signature = crypto
    .createHmac('sha256', JWT_SECRET)
    .update(`${header}.${payload}`)
    .digest('base64url');
  
  return `${header}.${payload}.${signature}`;
}

function verifyJWT(token) {
  try {
    const [header, payload, signature] = token.split('.');
    const expectedSignature = crypto
      .createHmac('sha256', JWT_SECRET)
      .update(`${header}.${payload}`)
      .digest('base64url');
    
    if (signature !== expectedSignature) return null;
    
    const decoded = JSON.parse(Buffer.from(payload, 'base64url').toString());
    if (decoded.exp < Math.floor(Date.now() / 1000)) return null;
    
    return { userId: decoded.userId, email: decoded.email };
  } catch {
    return null;
  }
}

async function queryDB(query) {
  const client = new Client({ connectionString: DATABASE_URL });
  
  try {
    await client.connect();
    const result = await client.query(query);
    return result.rows;
  } finally {
    await client.end();
  }
}

exports.handler = async (event, context) => {
  const { httpMethod } = event;
  
  if (httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, X-Auth-Token',
        'Access-Control-Max-Age': '86400'
      },
      body: ''
    };
  }
  
  if (httpMethod === 'POST') {
    const body = JSON.parse(event.body || '{}');
    const { action, email, password, username } = body;
    
    if (action === 'register') {
      const emailEscaped = email.replace(/'/g, "''");
      const usernameEscaped = username.replace(/'/g, "''");
      const passwordHash = hashPassword(password);
      
      const existingUsers = await queryDB(`SELECT id FROM users WHERE email = '${emailEscaped}'`);
      
      if (existingUsers.length > 0) {
        return {
          statusCode: 400,
          headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
          body: JSON.stringify({ error: 'Email already registered' })
        };
      }
      
      const newUsers = await queryDB(
        `INSERT INTO users (email, password_hash, username) VALUES ('${emailEscaped}', '${passwordHash}', '${usernameEscaped}') RETURNING id, email, username, avatar`
      );
      
      const user = newUsers[0];
      const token = createJWT(user.id, user.email);
      
      return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify({ 
          token, 
          user: { 
            id: user.id, 
            email: user.email, 
            username: user.username, 
            avatar: user.avatar 
          } 
        })
      };
    }
    
    if (action === 'login') {
      const emailEscaped = email.replace(/'/g, "''");
      const passwordHash = hashPassword(password);
      
      const users = await queryDB(
        `SELECT id, email, username, avatar FROM users WHERE email = '${emailEscaped}' AND password_hash = '${passwordHash}'`
      );
      
      if (users.length === 0) {
        return {
          statusCode: 401,
          headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
          body: JSON.stringify({ error: 'Invalid credentials' })
        };
      }
      
      const user = users[0];
      await queryDB(`UPDATE users SET last_seen = CURRENT_TIMESTAMP WHERE id = ${user.id}`);
      const token = createJWT(user.id, user.email);
      
      return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify({ 
          token, 
          user: { 
            id: user.id, 
            email: user.email, 
            username: user.username, 
            avatar: user.avatar 
          } 
        })
      };
    }
  }
  
  if (httpMethod === 'GET') {
    const token = event.headers['x-auth-token'] || event.headers['X-Auth-Token'] || '';
    const verified = verifyJWT(token);
    
    if (!verified) {
      return {
        statusCode: 401,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify({ error: 'Invalid token' })
      };
    }
    
    const users = await queryDB(`SELECT id, email, username, avatar FROM users WHERE id = ${verified.userId}`);
    
    if (users.length === 0) {
      return {
        statusCode: 404,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify({ error: 'User not found' })
      };
    }
    
    await queryDB(`UPDATE users SET last_seen = CURRENT_TIMESTAMP WHERE id = ${verified.userId}`);
    
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ user: users[0] })
    };
  }
  
  return {
    statusCode: 405,
    headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    body: JSON.stringify({ error: 'Method not allowed' })
  };
};