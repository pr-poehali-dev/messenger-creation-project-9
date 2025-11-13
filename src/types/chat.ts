export interface User {
  id: number;
  username: string;
  email?: string;
  avatar_url: string | null;
  bio: string | null;
  status: string;
  last_seen: string;
  created_at: string;
}

export interface Chat {
  id: number;
  username: string;
  avatar_url: string | null;
  status: string;
  last_seen: string;
  unread_count?: number;
  last_message?: Message;
}

export interface Message {
  id: number;
  sender_id: number;
  receiver_id: number;
  content: string;
  file_url?: string | null;
  file_name?: string | null;
  file_type?: string | null;
  created_at: string;
  sender_name?: string;
  sender_avatar?: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}