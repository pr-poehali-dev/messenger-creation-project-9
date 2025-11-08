/**
 * Business: Manage chats and messages between users
 * Args: event with httpMethod, body, X-Auth-Token header
 * Returns: HTTP response with chats, messages or operation result
 */

const crypto = require('crypto');
const { Client } = require('pg');

const JWT_SECRET = process.env.JWT_SECRET || '';
const DATABASE_URL = process.env.DATABASE_URL || '';

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
  
  const token = event.headers['x-auth-token'] || event.headers['X-Auth-Token'] || '';
  const verified = verifyJWT(token);
  
  if (!verified) {
    return {
      statusCode: 401,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ error: 'Unauthorized' })
    };
  }
  
  const userId = verified.userId;
  
  if (httpMethod === 'GET') {
    const params = event.queryStringParameters || {};
    const action = params.action;
    
    if (action === 'users') {
      const search = params.search || '';
      const searchEscaped = search.replace(/'/g, "''");
      
      const users = await queryDB(
        `SELECT id, username, email, avatar FROM users 
         WHERE id != ${userId} 
         ${search ? `AND (username ILIKE '%${searchEscaped}%' OR email ILIKE '%${searchEscaped}%')` : ''}
         ORDER BY username LIMIT 20`
      );
      
      return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify({ users })
      };
    }
    
    if (action === 'messages') {
      const chatId = params.chatId;
      if (!chatId) {
        return {
          statusCode: 400,
          headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
          body: JSON.stringify({ error: 'chatId required' })
        };
      }
      
      const messages = await queryDB(
        `SELECT m.id, m.text, m.reaction, m.created_at, m.sender_id, u.username, u.avatar,
         mm.message_type, mm.media_url, mm.media_duration, mm.media_thumbnail,
         (SELECT COUNT(*) FROM t_p59162637_messenger_creation_p.removed_messages WHERE message_id = m.id) as is_removed
         FROM messages m
         JOIN users u ON m.sender_id = u.id
         LEFT JOIN t_p59162637_messenger_creation_p.media_messages mm ON m.id = mm.message_id
         WHERE m.chat_id = ${chatId}
         ORDER BY m.created_at ASC`
      );
      
      const validMessages = messages.filter(msg => msg.is_removed === 0);
      
      for (const msg of validMessages) {
        const reactions = await queryDB(
          `SELECT r.reaction, r.user_id, u.username 
           FROM t_p59162637_messenger_creation_p.message_reactions r
           JOIN users u ON r.user_id = u.id
           WHERE r.message_id = ${msg.id}`
        );
        msg.reactions = reactions;
      }
      
      return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify({ messages: validMessages })
      };
    }
    
    if (action === 'contacts') {
      const contacts = await queryDB(
        `SELECT DISTINCT u.id, u.username, u.email, u.avatar
         FROM users u
         WHERE u.id != ${userId}
         ORDER BY u.username`
      );
      
      return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify({ contacts })
      };
    }
    
    const chats = await queryDB(
      `SELECT DISTINCT c.id, c.name, c.avatar, c.is_group,
        (SELECT text FROM messages WHERE chat_id = c.id ORDER BY created_at DESC LIMIT 1) as last_message,
        (SELECT created_at FROM messages WHERE chat_id = c.id ORDER BY created_at DESC LIMIT 1) as last_message_time,
        (SELECT COUNT(*) FROM messages WHERE chat_id = c.id AND sender_id != ${userId} 
         AND created_at > COALESCE((SELECT last_seen FROM users WHERE id = ${userId}), '1970-01-01')) as unread_count
       FROM chats c
       JOIN chat_members cm ON c.id = cm.chat_id
       WHERE cm.user_id = ${userId}
       ORDER BY last_message_time DESC NULLS LAST`
    );
    
    for (const chat of chats) {
      if (!chat.is_group) {
        const otherMembers = await queryDB(
          `SELECT u.id, u.username, u.avatar, u.last_seen
           FROM users u
           JOIN chat_members cm ON u.id = cm.user_id
           WHERE cm.chat_id = ${chat.id} AND u.id != ${userId}
           LIMIT 1`
        );
        
        if (otherMembers.length > 0) {
          const other = otherMembers[0];
          chat.name = other.username;
          chat.avatar = other.avatar;
          chat.other_user_id = other.id;
          const lastSeenMinutes = Math.floor((Date.now() - new Date(other.last_seen).getTime()) / 60000);
          chat.online = lastSeenMinutes < 5;
        }
      }
    }
    
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ chats })
    };
  }
  
  if (httpMethod === 'POST') {
    const body = JSON.parse(event.body || '{}');
    const { action } = body;
    
    if (action === 'create_chat') {
      const { otherUserId } = body;
      
      const existingChats = await queryDB(
        `SELECT c.id FROM chats c
         JOIN chat_members cm1 ON c.id = cm1.chat_id AND cm1.user_id = ${userId}
         JOIN chat_members cm2 ON c.id = cm2.chat_id AND cm2.user_id = ${otherUserId}
         WHERE c.is_group = false
         LIMIT 1`
      );
      
      if (existingChats.length > 0) {
        return {
          statusCode: 200,
          headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
          body: JSON.stringify({ chatId: existingChats[0].id })
        };
      }
      
      const newChats = await queryDB(
        `INSERT INTO chats (is_group) VALUES (false) RETURNING id`
      );
      
      const chatId = newChats[0].id;
      
      await queryDB(
        `INSERT INTO chat_members (chat_id, user_id) VALUES (${chatId}, ${userId}), (${chatId}, ${otherUserId})`
      );
      
      return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify({ chatId })
      };
    }
    
    if (action === 'send_message') {
      const { chatId, text } = body;
      const textEscaped = text.replace(/'/g, "''");
      
      const newMessages = await queryDB(
        `INSERT INTO messages (chat_id, sender_id, text) 
         VALUES (${chatId}, ${userId}, '${textEscaped}')
         RETURNING id, text, created_at, sender_id`
      );
      
      await queryDB(`UPDATE users SET last_seen = CURRENT_TIMESTAMP WHERE id = ${userId}`);
      
      return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify({ message: newMessages[0] })
      };
    }
    
    if (action === 'add_reaction') {
      const { messageId, reaction } = body;
      const reactionEscaped = reaction.replace(/'/g, "''");
      
      await queryDB(
        `INSERT INTO t_p59162637_messenger_creation_p.message_reactions (message_id, user_id, reaction)
         VALUES (${messageId}, ${userId}, '${reactionEscaped}')
         ON CONFLICT (message_id, user_id, reaction) DO NOTHING`
      );
      
      return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify({ success: true })
      };
    }
    
    if (action === 'remove_reaction') {
      const { reactionId } = body;
      
      await queryDB(
        `UPDATE t_p59162637_messenger_creation_p.message_reactions 
         SET reaction = NULL 
         WHERE id = ${reactionId} AND user_id = ${userId}`
      );
      
      return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify({ success: true })
      };
    }
    
    if (action === 'delete_message') {
      const { messageId } = body;
      
      await queryDB(
        `INSERT INTO t_p59162637_messenger_creation_p.removed_messages (message_id, removed_by)
         VALUES (${messageId}, ${userId})
         ON CONFLICT (message_id) DO NOTHING`
      );
      
      return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify({ success: true })
      };
    }
    
    if (action === 'upload_media') {
      const { messageId, mediaType, duration } = body;
      
      const mediaUrl = `https://storage.example.com/media/${messageId}.${mediaType}`;
      const thumbnailUrl = mediaType === 'video' ? `https://storage.example.com/media/${messageId}_thumb.jpg` : null;
      
      await queryDB(
        `INSERT INTO t_p59162637_messenger_creation_p.media_messages 
         (message_id, message_type, media_url, media_duration, media_thumbnail)
         VALUES (${messageId}, '${mediaType}', '${mediaUrl}', ${duration || 'NULL'}, ${thumbnailUrl ? `'${thumbnailUrl}'` : 'NULL'})
         ON CONFLICT (message_id) DO UPDATE SET
           message_type = EXCLUDED.message_type,
           media_url = EXCLUDED.media_url,
           media_duration = EXCLUDED.media_duration,
           media_thumbnail = EXCLUDED.media_thumbnail`
      );
      
      return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify({ mediaUrl, thumbnailUrl, messageId })
      };
    }
    
    if (action === 'initiate_call') {
      const { receiverId, callType } = body;
      const callId = `call_${userId}_${receiverId}_${Date.now()}`;
      
      await queryDB(
        `INSERT INTO t_p59162637_messenger_creation_p.calls 
         (chat_id, caller_id, receiver_id, call_type, status)
         VALUES (0, ${userId}, ${receiverId}, '${callType}', 'pending')`
      );
      
      return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify({ callId, status: 'initiated' })
      };
    }
    
    if (action === 'end_call') {
      const { callId } = body;
      
      return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify({ status: 'call_ended' })
      };
    }
  }
  
  return {
    statusCode: 405,
    headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    body: JSON.stringify({ error: 'Method not allowed' })
  };
};