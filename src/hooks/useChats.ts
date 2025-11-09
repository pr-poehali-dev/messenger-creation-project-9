import { useState, useEffect, useCallback, useRef } from 'react';
import { chatsApi } from '@/lib/chats';
import type { Chat, Message, ChatUser, User } from '@/types';
import { useRealtime } from './useRealtime';

export function useChats(currentUser?: User | null) {
  const [chats, setChats] = useState<Chat[]>([]);
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [messageText, setMessageText] = useState('');
  const [showStickers, setShowStickers] = useState(false);
  const [chatSearchQuery, setChatSearchQuery] = useState('');
  const [messageSearchQuery, setMessageSearchQuery] = useState('');
  const [isRealtimeEnabled, setIsRealtimeEnabled] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const loadChats = useCallback(async () => {
    try {
      const data = await chatsApi.getChats();
      setChats(data);
    } catch (err) {
      console.error('Failed to load chats:', err);
    }
  }, []);

  const loadMessages = useCallback(async (chatId: number) => {
    try {
      const data = await chatsApi.getMessages(chatId);
      setMessages(data);
    } catch (err) {
      console.error('Failed to load messages:', err);
    }
  }, []);

  useEffect(() => {
    if (selectedChat) {
      loadMessages(selectedChat.id);
    }
  }, [selectedChat, loadMessages]);

  const handleSendMessage = async () => {
    console.log('handleSendMessage called!', { messageText, selectedChat: selectedChat?.id, currentUser: currentUser?.id });
    
    if (messageText.trim() && selectedChat && currentUser) {
      const currentText = messageText;
      const tempId = -Date.now();
      
      console.log('Creating optimistic message...');
      const optimisticMessage: Message = {
        id: tempId,
        chat_id: selectedChat.id,
        sender_id: currentUser.id,
        username: currentUser.username,
        avatar: currentUser.avatar,
        text: currentText,
        created_at: new Date().toISOString(),
        reaction: null,
        reactions: []
      };
      
      setMessages(prev => {
        console.log('Adding optimistic message to state');
        return [...prev, optimisticMessage];
      });
      setMessageText('');

      try {
        console.log('Sending message to backend...');
        const result = await chatsApi.sendMessage(selectedChat.id, currentText);
        console.log('Message sent successfully:', result);
        
        await loadMessages(selectedChat.id);
        await loadChats();
        console.log('Messages and chats reloaded');
      } catch (err) {
        console.error('Failed to send message:', err);
        setMessages(prev => prev.filter(m => m.id !== tempId));
        setMessageText(currentText);
      }
    } else {
      console.log('Cannot send message:', { 
        hasText: messageText.trim().length > 0, 
        hasChat: !!selectedChat, 
        hasUser: !!currentUser 
      });
    }
  };

  const handleStickerClick = async (sticker: string) => {
    if (selectedChat) {
      try {
        await chatsApi.sendMessage(selectedChat.id, sticker);
        setShowStickers(false);
        await loadMessages(selectedChat.id);
        await loadChats();
      } catch (err) {
        console.error('Failed to send sticker:', err);
      }
    }
  };

  const addReaction = async (messageId: number, reaction: string) => {
    try {
      await chatsApi.addReaction(messageId, reaction);
      await loadMessages(selectedChat!.id);
    } catch (err) {
      console.error('Failed to add reaction:', err);
    }
  };

  const handleCreateChat = async (otherUser: ChatUser) => {
    try {
      const chatId = await chatsApi.createChat(otherUser.id);
      const updatedChats = await chatsApi.getChats();
      setChats(updatedChats);
      
      const newChat = updatedChats.find(c => c.id === chatId);
      if (newChat) {
        setSelectedChat(newChat);
        return newChat;
      }
      return null;
    } catch (err) {
      console.error('Failed to create chat:', err);
      throw err;
    }
  };

  const reloadChats = useCallback(async () => {
    const token = localStorage.getItem('auth_token');
    if (!token) return;
    
    try {
      const data = await chatsApi.getChats();
      setChats(data);
    } catch (err) {
      console.error('Failed to reload chats:', err);
    }
  }, []);

  const reloadMessages = useCallback(async () => {
    if (!selectedChat) return;
    
    const token = localStorage.getItem('auth_token');
    if (!token) return;
    
    try {
      const data = await chatsApi.getMessages(selectedChat.id);
      setMessages(data);
    } catch (err) {
      console.error('Failed to reload messages:', err);
    }
  }, [selectedChat]);

  useRealtime({ 
    onUpdate: reloadChats, 
    enabled: isRealtimeEnabled,
    interval: 5000 
  });

  useRealtime({ 
    onUpdate: reloadMessages, 
    enabled: isRealtimeEnabled && !!selectedChat,
    interval: 3000 
  });

  return {
    chats,
    selectedChat,
    setSelectedChat,
    messages,
    messageText,
    setMessageText,
    showStickers,
    setShowStickers,
    chatSearchQuery,
    setChatSearchQuery,
    messageSearchQuery,
    setMessageSearchQuery,
    loadChats,
    handleSendMessage,
    handleStickerClick,
    addReaction,
    handleCreateChat,
    isRealtimeEnabled,
    setIsRealtimeEnabled,
    messagesEndRef,
  };
}