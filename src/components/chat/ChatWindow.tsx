import { useState, useEffect, useRef } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import Icon from '@/components/ui/icon';
import MessageMenu from './MessageMenu';
import VoiceRecorder from './VoiceRecorder';
import VoicePlayer from './VoicePlayer';
import ForwardDialog from './ForwardDialog';
import { getMessages, sendMessage, uploadFile, uploadVoice, editMessage, deleteMessage, setTypingStatus, getTypingStatus } from '@/lib/api';
import { toast } from 'sonner';
import type { Chat, Message } from '@/types/chat';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

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
  const fileInputRef = useRef<HTMLInputElement>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const prevMessagesLengthRef = useRef<number>(0);

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio(
        'data:audio/mp3;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4Ljc2LjEwMAAAAAAAAAAAAAAA//tQwAAAAAAAAAAAAAAAAAAAAAAASW5mbwAAAA8AAAASAAAeMwAUFBQUFCIiIiIiIjAwMDAwPj4+Pj4+TExMTExZWVlZWVlnZ2dnZ3V1dXV1dYODg4ODkZGRkZGRn5+fn5+frKysrKy6urq6urrIyMjIyNbW1tbW1uTk5OTk8vLy8vLy//////8AAAAATGF2YzU4LjEzAAAAAAAAAAAAAAAAJAQKAAAAAAAAHjOZTf9/AAAAAAAAAAAAAAAAAAAAAP/7UMQAAAGkAimlBIAImYtNqyUnwAACmQJAQACAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA//NExGQPkPIMAAwYAP////////////5EAQBQIAAAD/////////////////////////////////5//NExH0P2M4EABhEAP////////////////////////////////////////////5//NExIsPeKngAABMAP////////////////////////////////////////////5AAAH/2U='
      );
    }
    
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
        
        if (hasNewMessageFromOther && audioRef.current && user?.sound_enabled !== false) {
          audioRef.current.currentTime = 0;
          audioRef.current.play().catch(err => console.log('Audio play failed:', err));
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
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
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

  const getChatName = () => {
    return chat.username || 'Пользователь';
  };

  const getChatAvatar = () => {
    return chat.avatar_url;
  };

  const getOnlineStatus = () => {
    return chat.status === 'online' ? 'Онлайн' : 'Не в сети';
  };

  return (
    <div className="flex-1 flex flex-col h-screen md:h-auto">
      <div className="h-14 md:h-16 border-b px-3 md:px-6 flex items-center justify-between bg-background shrink-0">
        {onBack && (
          <Button variant="ghost" size="icon" onClick={onBack} className="md:hidden mr-2">
            <Icon name="ArrowLeft" size={20} />
          </Button>
        )}
        <div className="flex items-center gap-2 md:gap-3 flex-1 min-w-0">
          <Avatar className="h-9 w-9 md:h-10 md:w-10 shrink-0">
            <AvatarImage src={getChatAvatar() || undefined} />
            <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
              {getChatName()[0]?.toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1">
            <p className="font-semibold text-sm md:text-base truncate">{getChatName()}</p>
            {isTyping ? (
              <p className="text-xs text-blue-500">печатает...</p>
            ) : getOnlineStatus() ? (
              <p className="text-xs text-muted-foreground">{getOnlineStatus()}</p>
            ) : null}
          </div>
        </div>
        <div className="flex gap-1 md:gap-2 shrink-0">
          <Button variant="ghost" size="icon" className="hidden md:flex">
            <Icon name="Phone" size={20} />
          </Button>
          <Button variant="ghost" size="icon" className="hidden md:flex">
            <Icon name="Video" size={20} />
          </Button>
          <Button variant="ghost" size="icon" className="h-9 w-9 md:h-10 md:w-10">
            <Icon name="MoreVertical" size={18} />
          </Button>
        </div>
      </div>

      <ScrollArea className="flex-1 p-3 md:p-6">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <Icon name="Loader2" size={32} className="animate-spin text-muted-foreground" />
          </div>
        ) : messages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center space-y-2">
              <div className="w-16 h-16 mx-auto rounded-full bg-muted flex items-center justify-center mb-4">
                <Icon name="MessageSquare" size={24} className="text-muted-foreground" />
              </div>
              <p className="text-muted-foreground">Нет сообщений</p>
              <p className="text-sm text-muted-foreground">Начните общение</p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((message) => {
              const isOwn = message.sender_id === user?.id;
              const isEditing = editingMessageId === message.id;
              
              return (
                <div
                  key={message.id}
                  className={`flex gap-3 group ${isOwn ? 'flex-row-reverse' : ''}`}
                >
                  {!isOwn && (
                    <Avatar className="h-8 w-8 shrink-0">
                      <AvatarImage src={message.sender_avatar || undefined} />
                      <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-xs">
                        {message.sender_name?.[0]?.toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  )}
                  <div className={`flex flex-col ${isOwn ? 'items-end' : 'items-start'} max-w-md flex-1`}>
                    <div className="flex items-center gap-2 mb-1">
                      {!isOwn && (
                        <span className="text-xs font-medium px-1">
                          {message.sender_name}
                        </span>
                      )}
                      <MessageMenu
                        onEdit={() => handleEditMessage(message.id, message.content)}
                        onDelete={() => handleDeleteMessage(message.id)}
                        onForward={() => handleForwardMessage(message)}
                        isOwnMessage={isOwn}
                      />
                    </div>
                    <div
                      className={`rounded-2xl px-4 py-2 ${
                        isOwn
                          ? 'bg-blue-600 text-white'
                          : 'bg-muted'
                      }`}
                    >
                      {message.voice_url && (
                        <VoicePlayer 
                          voiceUrl={message.voice_url} 
                          duration={message.voice_duration || 0} 
                        />
                      )}
                      {message.file_url && (
                        <div className="mb-2">
                          {message.file_type?.startsWith('image/') ? (
                            <img
                              src={message.file_url}
                              alt={message.file_name || 'Image'}
                              className="max-w-full max-h-64 rounded-lg"
                            />
                          ) : (
                            <a
                              href={message.file_url}
                              download={message.file_name}
                              className="flex items-center gap-2 p-2 rounded bg-background/10 hover:bg-background/20 transition-colors"
                            >
                              <Icon name="FileText" size={20} />
                              <span className="text-sm">{message.file_name || 'Файл'}</span>
                            </a>
                          )}
                        </div>
                      )}
                      {isEditing ? (
                        <div className="space-y-2 w-full">
                          <Input
                            value={editingContent}
                            onChange={(e) => setEditingContent(e.target.value)}
                            className="text-sm"
                            autoFocus
                          />
                          <div className="flex gap-2">
                            <Button size="sm" onClick={() => handleSaveEdit(message.id)}>
                              Сохранить
                            </Button>
                            <Button size="sm" variant="outline" onClick={handleCancelEdit}>
                              Отмена
                            </Button>
                          </div>
                        </div>
                      ) : (
                        message.content && (
                          <p className="text-sm whitespace-pre-wrap break-words">{message.content}</p>
                        )
                      )}
                    </div>
                    {!isEditing && (
                      <span className="text-xs text-muted-foreground mt-1 px-1">
                        {format(new Date(message.created_at), 'HH:mm', { locale: ru })}
                        {message.is_edited && ' (изменено)'}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
            <div ref={scrollRef} />
          </div>
        )}
      </ScrollArea>

      <ForwardDialog
        open={!!forwardingMessage}
        onClose={() => setForwardingMessage(null)}
        onSelectUser={handleForwardComplete}
      />

      <div className="border-t p-3 md:p-4 bg-background shrink-0 safe-area-bottom">
        {isRecording ? (
          <VoiceRecorder 
            onRecordComplete={handleVoiceComplete}
            onCancel={handleVoiceCancel}
          />
        ) : (
          <form onSubmit={handleSend} className="flex gap-2 items-center">
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            onChange={handleFileSelect}
            accept="image/*,application/pdf,.doc,.docx,.txt"
          />
          <Button 
            type="button" 
            variant="ghost" 
            size="icon"
            className="h-10 w-10 shrink-0"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
          >
            {uploading ? (
              <Icon name="Loader2" size={20} className="animate-spin" />
            ) : (
              <Icon name="Paperclip" size={20} />
            )}
          </Button>
          <Input
            placeholder="Сообщение..."
            value={newMessage}
            onChange={(e) => {
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
            }}
            className="flex-1"
            disabled={uploading}
          />
          <Button type="button" variant="ghost" size="icon" className="hidden md:flex h-10 w-10 shrink-0">
            <Icon name="Smile" size={20} />
          </Button>
          {newMessage.trim() ? (
            <Button type="submit" size="icon" className="h-10 w-10 shrink-0" disabled={uploading}>
              <Icon name="Send" size={20} />
            </Button>
          ) : (
            <Button 
              type="button" 
              size="icon" 
              className="h-10 w-10 shrink-0" 
              onClick={handleVoiceRecord}
              disabled={uploading}
            >
              <Icon name="Mic" size={20} />
            </Button>
          )}
        </form>
        )}
      </div>
    </div>
  );
}