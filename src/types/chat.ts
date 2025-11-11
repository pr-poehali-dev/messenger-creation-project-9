export interface User {
  id: number;
  username: string;
  email: string;
  full_name: string | null;
  avatar_url: string | null;
  bio: string | null;
  is_online: boolean;
  last_seen: string;
  created_at: string;
}

export interface Chat {
  id: number;
  name: string | null;
  is_group: boolean;
  avatar_url: string | null;
  created_at: string;
  last_message?: Message;
  unread_count?: number;
  other_user?: User;
}

export interface Message {
  id: number;
  chat_id: number;
  user_id: number;
  content: string;
  created_at: string;
  is_edited: boolean;
  user?: User;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}
