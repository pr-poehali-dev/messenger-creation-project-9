import { useState, useEffect, useRef } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import Icon from '@/components/ui/icon';
import { getMessages, sendMessage, uploadFile } from '@/lib/api';
import { toast } from 'sonner';
import type { Chat, Message } from '@/types/chat';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

interface ChatWindowProps {
  chat: Chat;
}

export default function ChatWindow({ chat }: ChatWindowProps) {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    loadMessages();
    const interval = setInterval(loadMessages, 2000);
    return () => clearInterval(interval);
  }, [chat.id]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const loadMessages = async () => {
    setLoading(true);
    try {
      const data = await getMessages(chat.id);
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
    <div className="flex-1 flex flex-col">
      <div className="h-16 border-b px-6 flex items-center justify-between bg-background">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={getChatAvatar() || undefined} />
            <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
              {getChatName()[0]?.toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold">{getChatName()}</p>
            {getOnlineStatus() && (
              <p className="text-xs text-muted-foreground">{getOnlineStatus()}</p>
            )}
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" size="icon">
            <Icon name="Phone" size={20} />
          </Button>
          <Button variant="ghost" size="icon">
            <Icon name="Video" size={20} />
          </Button>
          <Button variant="ghost" size="icon">
            <Icon name="MoreVertical" size={20} />
          </Button>
        </div>
      </div>

      <ScrollArea className="flex-1 p-6">
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
              return (
                <div
                  key={message.id}
                  className={`flex gap-3 ${isOwn ? 'flex-row-reverse' : ''}`}
                >
                  {!isOwn && (
                    <Avatar className="h-8 w-8 shrink-0">
                      <AvatarImage src={message.sender_avatar || undefined} />
                      <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-xs">
                        {message.sender_name?.[0]?.toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  )}
                  <div className={`flex flex-col ${isOwn ? 'items-end' : 'items-start'} max-w-md`}>
                    {!isOwn && (
                      <span className="text-xs font-medium mb-1 px-1">
                        {message.sender_name}
                      </span>
                    )}
                    <div
                      className={`rounded-2xl px-4 py-2 ${
                        isOwn
                          ? 'bg-blue-600 text-white'
                          : 'bg-muted'
                      }`}
                    >
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
                      {message.content && (
                        <p className="text-sm whitespace-pre-wrap break-words">{message.content}</p>
                      )}
                    </div>
                    <span className="text-xs text-muted-foreground mt-1 px-1">
                      {format(new Date(message.created_at), 'HH:mm', { locale: ru })}
                    </span>
                  </div>
                </div>
              );
            })}
            <div ref={scrollRef} />
          </div>
        )}
      </ScrollArea>

      <div className="border-t p-4 bg-background">
        <form onSubmit={handleSend} className="flex gap-2">
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
            placeholder="Написать сообщение..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="flex-1"
            disabled={uploading}
          />
          <Button type="button" variant="ghost" size="icon">
            <Icon name="Smile" size={20} />
          </Button>
          <Button type="submit" size="icon" disabled={!newMessage.trim() || uploading}>
            <Icon name="Send" size={20} />
          </Button>
        </form>
      </div>
    </div>
  );
}