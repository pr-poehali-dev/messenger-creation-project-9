export interface User {
  id: number;
  username: string;
  email?: string;
  phone?: string;
  avatar_url: string | null;
  bio: string | null;
  status: string;
  last_seen: string;
  created_at: string;
  sound_enabled?: boolean;
}

export interface Chat {
  id: number;
  username: string;
  phone?: string;
  avatar_url: string | null;
  bio?: string | null;
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
  voice_url?: string | null;
  voice_duration?: number | null;
  is_edited?: boolean;
  is_removed?: boolean;
  edited_at?: string | null;
  created_at: string;
  sender_name?: string;
  sender_avatar?: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}