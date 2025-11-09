import type { Chat, Message, ChatUser } from '@/types';

const CHATS_API_URL = 'https://functions.poehali.dev/fe62a1f5-6c6e-4d99-ba0c-8ceed33a9b17';

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
  
  async sendMessage(chatId: number, text: string): Promise<{ message: Message }> {
    const headers = getAuthHeaders();
    console.log('Sending message with headers:', headers);
    console.log('ChatId:', chatId, 'Text:', text);
    
    const response = await fetch(CHATS_API_URL, {
      method: 'POST',
      headers,
      body: JSON.stringify({ action: 'send_message', chatId, text })
    });
    
    console.log('Response status:', response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error response:', errorText);
      throw new Error(`Failed to send message: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('Message sent successfully:', data);
    return data;
  },
  
  async addReaction(messageId: number, reaction: string): Promise<void> {
    const response = await fetch(CHATS_API_URL, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ action: 'add_reaction', messageId, reaction })
    });
    
    if (!response.ok) throw new Error('Failed to add reaction');
  },

  async removeReaction(reactionId: number): Promise<void> {
    const response = await fetch(CHATS_API_URL, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ action: 'remove_reaction', reactionId })
    });
    
    if (!response.ok) throw new Error('Failed to remove reaction');
  },

  async deleteMessage(messageId: number): Promise<void> {
    const response = await fetch(CHATS_API_URL, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ action: 'delete_message', messageId })
    });
    
    if (!response.ok) throw new Error('Failed to delete message');
  },

  async uploadMedia(messageId: number, mediaType: string, mediaData: string, duration?: number): Promise<any> {
    const response = await fetch(CHATS_API_URL, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ action: 'upload_media', messageId, mediaType, mediaData, duration })
    });
    
    if (!response.ok) throw new Error('Failed to upload media');
    
    return await response.json();
  },

  async getContacts(): Promise<ChatUser[]> {
    const response = await fetch(`${CHATS_API_URL}?action=contacts`, {
      method: 'GET',
      headers: getAuthHeaders()
    });
    
    if (!response.ok) throw new Error('Failed to fetch contacts');
    
    const data = await response.json();
    return data.contacts || [];
  },

  async setTyping(chatId: number, isTyping: boolean): Promise<void> {
    const response = await fetch(CHATS_API_URL, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ action: 'set_typing', chatId, isTyping })
    });
    
    if (!response.ok) throw new Error('Failed to set typing status');
  },

  async getTypingStatus(chatId: number): Promise<{ isTyping: boolean; userId?: number; username?: string }> {
    const response = await fetch(`${CHATS_API_URL}?action=typing_status&chatId=${chatId}`, {
      method: 'GET',
      headers: getAuthHeaders()
    });
    
    if (!response.ok) throw new Error('Failed to get typing status');
    
    const data = await response.json();
    return data;
  }
};