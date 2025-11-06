const CHATS_API_URL = 'https://functions.poehali.dev/fe62a1f5-6c6e-4d99-ba0c-8ceed33a9b17';

export type ChatUser = {
  id: number;
  username: string;
  email: string;
  avatar: string;
};

export type Chat = {
  id: number;
  name: string;
  avatar: string;
  is_group: boolean;
  last_message: string | null;
  last_message_time: string | null;
  unread_count: number;
  online?: boolean;
  other_user_id?: number;
};

export type Message = {
  id: number;
  text: string;
  reaction: string | null;
  created_at: string;
  sender_id: number;
  username: string;
  avatar: string;
};

function getAuthHeaders() {
  const token = localStorage.getItem('auth_token');
  return {
    'Content-Type': 'application/json',
    'X-Auth-Token': token || ''
  };
}

export const chatsApi = {
  async getChats(): Promise<Chat[]> {
    const response = await fetch(CHATS_API_URL, {
      method: 'GET',
      headers: getAuthHeaders()
    });
    
    if (!response.ok) throw new Error('Failed to fetch chats');
    
    const data = await response.json();
    return data.chats;
  },
  
  async searchUsers(search: string): Promise<ChatUser[]> {
    const response = await fetch(`${CHATS_API_URL}?action=users&search=${encodeURIComponent(search)}`, {
      method: 'GET',
      headers: getAuthHeaders()
    });
    
    if (!response.ok) throw new Error('Failed to search users');
    
    const data = await response.json();
    return data.users;
  },
  
  async createChat(otherUserId: number): Promise<number> {
    const response = await fetch(CHATS_API_URL, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ action: 'create_chat', otherUserId })
    });
    
    if (!response.ok) throw new Error('Failed to create chat');
    
    const data = await response.json();
    return data.chatId;
  },
  
  async getMessages(chatId: number): Promise<Message[]> {
    const response = await fetch(`${CHATS_API_URL}?action=messages&chatId=${chatId}`, {
      method: 'GET',
      headers: getAuthHeaders()
    });
    
    if (!response.ok) throw new Error('Failed to fetch messages');
    
    const data = await response.json();
    return data.messages;
  },
  
  async sendMessage(chatId: number, text: string): Promise<Message> {
    const response = await fetch(CHATS_API_URL, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ action: 'send_message', chatId, text })
    });
    
    if (!response.ok) throw new Error('Failed to send message');
    
    const data = await response.json();
    return data.message;
  },
  
  async addReaction(messageId: number, reaction: string): Promise<void> {
    const response = await fetch(CHATS_API_URL, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ action: 'add_reaction', messageId, reaction })
    });
    
    if (!response.ok) throw new Error('Failed to add reaction');
  }
};
