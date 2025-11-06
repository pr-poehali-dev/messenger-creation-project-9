export type User = {
  id: number;
  email: string;
  username: string;
  avatar: string;
};

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

export type Section = 'chats' | 'contacts' | 'groups' | 'channels' | 'settings';

export type AuthMode = 'login' | 'register';
