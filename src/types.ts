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
  is_channel?: boolean;
  description?: string;
  members_count?: number;
  last_message: string | null;
  last_message_time: string | null;
  unread_count: number;
  online?: boolean;
  other_user_id?: number;
  creator_id?: number;
  is_admin?: boolean;
  is_public?: boolean;
  invite_link?: string;
};

export type MessageReaction = {
  id: number;
  reaction: string;
  user_id: number;
  username: string;
};

export type Message = {
  id: number;
  text: string;
  reaction: string | null;
  created_at: string;
  sender_id: number;
  username: string;
  avatar: string;
  message_type?: 'text' | 'audio' | 'video' | 'image' | 'sticker';
  media_url?: string;
  media_duration?: number;
  media_thumbnail?: string;
  reactions?: MessageReaction[];
  is_removed?: number;
  sender_username?: string;
  timestamp?: string;
  chat_id?: number;
  is_read?: boolean;
};

export type Call = {
  id: number;
  chat_id: number;
  caller_id: number;
  receiver_id: number;
  call_type: 'video' | 'audio';
  status: 'pending' | 'active' | 'ended' | 'rejected';
  started_at: string;
  ended_at?: string;
  duration?: number;
};

export type Section = 'chats' | 'contacts' | 'groups' | 'channels' | 'settings' | 'profile';

export type AuthMode = 'login' | 'register';

export type StoryItem = {
  id: number;
  url: string;
  type: 'image' | 'video';
  created_at: string;
};

export type Story = {
  id: number;
  user_id: number;
  username: string;
  avatar: string;
  items: StoryItem[];
  viewed: boolean;
};