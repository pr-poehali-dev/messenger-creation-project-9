import type { Call } from '@/types';

const CHATS_API_URL = 'https://functions.poehali.dev/fe62a1f5-6c6e-4d99-ba0c-8ceed33a9b17';

function getAuthHeaders() {
  const token = localStorage.getItem('auth_token');
  const userId = localStorage.getItem('user_id');
  return {
    'Content-Type': 'application/json',
    'X-Auth-Token': token || '',
    'X-User-Id': userId || ''
  };
}

export const webrtc = {
  async initiateCall(receiverId: number, callType: 'video' | 'audio'): Promise<string> {
    const response = await fetch(CHATS_API_URL, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({
        action: 'initiate_call',
        receiverId,
        callType
      })
    });
    
    if (!response.ok) throw new Error('Failed to initiate call');
    
    const data = await response.json();
    return data.callId;
  },

  async endCall(callId: string): Promise<void> {
    const response = await fetch(CHATS_API_URL, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({
        action: 'end_call',
        callId
      })
    });
    
    if (!response.ok) throw new Error('Failed to end call');
  }
};