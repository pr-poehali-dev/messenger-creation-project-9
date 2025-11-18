import { useState, useEffect, useRef } from 'react';
import { useAuth } from '@/context/AuthContext';
import ChatHeader from './ChatHeader';
import MessageList from './MessageList';
import ChatInput from './ChatInput';
import ForwardDialog from './ForwardDialog';
import { getMessages, sendMessage, uploadFile, uploadVoice, editMessage, deleteMessage, setTypingStatus, getTypingStatus } from '@/lib/api';
import { toast } from 'sonner';
import type { Chat, Message } from '@/types/chat';

interface ChatWindowProps {
  chat: Chat;
  onBack?: () => void;
}

export default function ChatWindow({ chat, onBack }: ChatWindowProps) {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [editingMessageId, setEditingMessageId] = useState<number | null>(null);
  const [editingContent, setEditingContent] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [forwardingMessage, setForwardingMessage] = useState<Message | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const prevMessagesLengthRef = useRef<number>(0);

  const playNotificationSound = () => {
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      
      const oscillator1 = audioContext.createOscillator();
      const oscillator2 = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator1.frequency.setValueAtTime(800, audioContext.currentTime);
      oscillator2.frequency.setValueAtTime(1000, audioContext.currentTime);
      
      oscillator1.type = 'sine';
      oscillator2.type = 'sine';
      
      oscillator1.connect(gainNode);
      oscillator2.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      gainNode.gain.setValueAtTime(0, audioContext.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.3, audioContext.currentTime + 0.01);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
      
      oscillator1.start(audioContext.currentTime);
      oscillator2.start(audioContext.currentTime);
      oscillator1.stop(audioContext.currentTime + 0.5);
      oscillator2.stop(audioContext.currentTime + 0.5);
      
      if ('vibrate' in navigator && user?.vibration_enabled !== false) {
        navigator.vibrate([200, 100, 200]);
      }
    } catch (err) {
      console.log('Audio play failed:', err);
    }
  };

  useEffect(() => {
    loadMessages();
    const interval = setInterval(loadMessages, 2000);
    return () => clearInterval(interval);
  }, [chat.id]);

  useEffect(() => {
    const checkTyping = async () => {
      try {
        const status = await getTypingStatus(chat.id);
        setIsTyping(status.is_typing);
      } catch (error) {
        console.error('Failed to check typing status:', error);
      }
    };

    checkTyping();
    const interval = setInterval(checkTyping, 1000);
    return () => clearInterval(interval);
  }, [chat.id]);

  useEffect(() => {
    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
      setTypingStatus(chat.id, false).catch(console.error);
    };
  }, [chat.id]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const loadMessages = async () => {
    setLoading(true);
    try {
      const data = await getMessages(chat.id);
      
      if (prevMessagesLengthRef.current > 0 && data.length > prevMessagesLengthRef.current) {
        const newMessages = data.slice(prevMessagesLengthRef.current);
        const hasNewMessageFromOther = newMessages.some(
          (msg: Message) => msg.sender_id !== user?.id
        );
        
        if (hasNewMessageFromOther && user?.sound_enabled !== false) {
          playNotificationSound();
        }
      }
      
      prevMessagesLengthRef.current = data.length;
      setMessages(data);
    } catch (error) {
      console.error('Failed to load messages:', error);
    }
    setLoading(false);
  };

  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    try {
      const message = await sendMessage(chat.id, newMessage);
      setMessages([...messages, message]);
      setNewMessage('');
    } catch (error) {
      console.error('Failed to send message:', error);
      toast.error('Ошибка отправки сообщения');
    }
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      toast.error('Размер файла не должен превышать 10 МБ');
      return;
    }

    setUploading(true);
    try {
      const uploadResult = await uploadFile(file) as any;
      const message = await sendMessage(
        chat.id,
        newMessage || '',
        uploadResult.url,
        uploadResult.file_name,
        uploadResult.file_type
      );
      setMessages([...messages, message]);
      setNewMessage('');
      toast.success('Файл отправлен');
    } catch (error) {
      console.error('Failed to upload file:', error);
      toast.error('Ошибка загрузки файла');
    }
    setUploading(false);
  };

  const handleVoiceRecord = () => {
    setIsRecording(true);
  };

  const handleVoiceComplete = async (audioBlob: Blob, duration: number) => {
    setIsRecording(false);
    setUploading(true);
    try {
      const uploadResult = await uploadVoice(audioBlob) as any;
      const message = await sendMessage(
        chat.id,
        '',
        undefined,
        undefined,
        undefined,
        uploadResult.url,
        duration
      );
      setMessages([...messages, message]);
      toast.success('Голосовое отправлено');
    } catch (error) {
      console.error('Failed to send voice:', error);
      toast.error('Ошибка отправки голосового');
    }
    setUploading(false);
  };

  const handleVoiceCancel = () => {
    setIsRecording(false);
  };

  const handleEditMessage = (messageId: number, content: string) => {
    setEditingMessageId(messageId);
    setEditingContent(content);
  };

  const handleSaveEdit = async (messageId: number) => {
    if (!editingContent.trim()) return;

    try {
      await editMessage(messageId, editingContent);
      setMessages(messages.map(m => 
        m.id === messageId 
          ? { ...m, content: editingContent, is_edited: true }
          : m
      ));
      setEditingMessageId(null);
      setEditingContent('');
      toast.success('Сообщение изменено');
    } catch (error) {
      console.error('Failed to edit message:', error);
      toast.error('Ошибка редактирования');
    }
  };

  const handleCancelEdit = () => {
    setEditingMessageId(null);
    setEditingContent('');
  };

  const handleDeleteMessage = async (messageId: number) => {
    try {
      await deleteMessage(messageId);
      setMessages(messages.filter(m => m.id !== messageId));
      toast.success('Сообщение удалено');
    } catch (error) {
      console.error('Failed to delete message:', error);
      toast.error('Ошибка удаления');
    }
  };

  const handleForwardMessage = (message: Message) => {
    setForwardingMessage(message);
  };

  const handleForwardComplete = async (forwardUser: Chat) => {
    if (!forwardingMessage) return;

    try {
      await sendMessage(
        forwardUser.id,
        forwardingMessage.content,
        forwardingMessage.file_url || undefined,
        forwardingMessage.file_name || undefined,
        forwardingMessage.file_type || undefined,
        forwardingMessage.voice_url || undefined,
        forwardingMessage.voice_duration || undefined
      );
      toast.success(`Сообщение переслано пользователю ${forwardUser.username}`);
      setForwardingMessage(null);
    } catch (error) {
      console.error('Failed to forward message:', error);
      toast.error('Ошибка пересылки');
    }
  };

  const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage(e.target.value);
    
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    
    if (e.target.value.trim()) {
      setTypingStatus(chat.id, true).catch(console.error);
      
      typingTimeoutRef.current = setTimeout(() => {
        setTypingStatus(chat.id, false).catch(console.error);
      }, 3000);
    } else {
      setTypingStatus(chat.id, false).catch(console.error);
    }
  };

  return (
    <div className="flex-1 flex flex-col h-screen md:h-auto">
      <ChatHeader 
        chat={chat} 
        isTyping={isTyping} 
        onBack={onBack} 
      />

      <MessageList
        messages={messages}
        loading={loading}
        userId={user?.id}
        editingMessageId={editingMessageId}
        editingContent={editingContent}
        scrollRef={scrollRef}
        onEdit={handleEditMessage}
        onSaveEdit={handleSaveEdit}
        onCancelEdit={handleCancelEdit}
        onDelete={handleDeleteMessage}
        onForward={handleForwardMessage}
        setEditingContent={setEditingContent}
      />

      <ForwardDialog
        open={!!forwardingMessage}
        onClose={() => setForwardingMessage(null)}
        onSelectUser={handleForwardComplete}
      />

      <ChatInput
        newMessage={newMessage}
        uploading={uploading}
        isRecording={isRecording}
        onMessageChange={handleMessageChange}
        onSend={handleSend}
        onFileSelect={handleFileSelect}
        onVoiceRecord={handleVoiceRecord}
        onVoiceComplete={handleVoiceComplete}
        onVoiceCancel={handleVoiceCancel}
      />
    </div>
  );
}