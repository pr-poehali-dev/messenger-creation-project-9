import { useState, useEffect, useCallback } from 'react';
import { chatsApi } from '@/lib/chats';
import type { Chat, Message, ChatUser } from '@/types';

export function useChats() {
  const [chats, setChats] = useState<Chat[]>([]);
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [messageText, setMessageText] = useState('');
  const [showStickers, setShowStickers] = useState(false);
  const [chatSearchQuery, setChatSearchQuery] = useState('');
  const [messageSearchQuery, setMessageSearchQuery] = useState('');

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
    if (messageText.trim() && selectedChat) {
      try {
        await chatsApi.sendMessage(selectedChat.id, messageText);
        setMessageText('');
        await loadMessages(selectedChat.id);
        await loadChats();
      } catch (err) {
        console.error('Failed to send message:', err);
      }
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
      await loadChats();
      const newChat = chats.find(c => c.id === chatId);
      if (newChat) {
        setSelectedChat(newChat);
      }
      return chatId;
    } catch (err) {
      console.error('Failed to create chat:', err);
      throw err;
    }
  };

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
  };
}