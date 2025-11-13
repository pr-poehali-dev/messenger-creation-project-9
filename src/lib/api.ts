const API_BASE = 'https://functions.poehali.dev';

const ENDPOINTS = {
  auth: 'a314e807-6e5b-4f06-8089-b94fc502bbb6',
  profile: '2226a8fb-8e71-4feb-9d44-d61530b8901f',
  users: '00ed3702-3b94-4509-98b4-7e00e9c0cdc7',
  messages: '7be37ffa-612b-4b3a-be7e-f913adcff7b7',
  upload: 'f8e8749d-0a77-41ab-8723-b5bfc696ef38',
};

function getToken(): string | null {
  return localStorage.getItem('token');
}

export async function getUsers() {
  const token = getToken();
  const response = await fetch(`${API_BASE}/${ENDPOINTS.users}`, {
    headers: {
      'X-Auth-Token': token || '',
    },
  });
  
  if (!response.ok) {
    throw new Error('Failed to fetch users');
  }
  
  return response.json();
}

export async function getMessages(userId: number) {
  const token = getToken();
  const response = await fetch(`${API_BASE}/${ENDPOINTS.messages}?user_id=${userId}`, {
    headers: {
      'X-Auth-Token': token || '',
    },
  });
  
  if (!response.ok) {
    throw new Error('Failed to fetch messages');
  }
  
  return response.json();
}

export async function sendMessage(
  receiverId: number, 
  content: string, 
  fileUrl?: string, 
  fileName?: string, 
  fileType?: string
) {
  const token = getToken();
  const response = await fetch(`${API_BASE}/${ENDPOINTS.messages}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Auth-Token': token || '',
    },
    body: JSON.stringify({
      receiver_id: receiverId,
      content,
      file_url: fileUrl,
      file_name: fileName,
      file_type: fileType,
    }),
  });
  
  if (!response.ok) {
    throw new Error('Failed to send message');
  }
  
  return response.json();
}

export async function getProfile() {
  const token = getToken();
  const response = await fetch(`${API_BASE}/${ENDPOINTS.profile}`, {
    headers: {
      'X-Auth-Token': token || '',
    },
  });
  
  if (!response.ok) {
    throw new Error('Failed to fetch profile');
  }
  
  return response.json();
}

export async function updateProfile(data: { username?: string; avatar_url?: string; bio?: string }) {
  const token = getToken();
  const response = await fetch(`${API_BASE}/${ENDPOINTS.profile}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'X-Auth-Token': token || '',
    },
    body: JSON.stringify(data),
  });
  
  if (!response.ok) {
    throw new Error('Failed to update profile');
  }
  
  return response.json();
}

export async function getUnreadCounts() {
  const token = getToken();
  const users = await getUsers();
  
  const counts: Record<number, number> = {};
  
  for (const user of users) {
    const messages = await getMessages(user.id);
    const unread = messages.filter((m: any) => m.receiver_id === getUserIdFromToken() && !m.is_read).length;
    if (unread > 0) {
      counts[user.id] = unread;
    }
  }
  
  return counts;
}

function getUserIdFromToken(): number | null {
  const token = getToken();
  if (!token) return null;
  return parseInt(token.split(':')[0]);
}

export async function uploadFile(file: File) {
  const token = getToken();
  
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = async () => {
      try {
        const base64 = (reader.result as string).split(',')[1];
        
        const response = await fetch(`${API_BASE}/${ENDPOINTS.upload}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Auth-Token': token || '',
          },
          body: JSON.stringify({
            file: base64,
            fileName: file.name,
            fileType: file.type,
          }),
        });
        
        if (!response.ok) {
          throw new Error('Failed to upload file');
        }
        
        const data = await response.json();
        resolve(data);
      } catch (error) {
        reject(error);
      }
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}