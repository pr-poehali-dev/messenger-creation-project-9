import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import Icon from '@/components/ui/icon';
import type { Chat } from '@/types/chat';
import { formatDistanceToNow } from 'date-fns';
import { ru } from 'date-fns/locale';

interface ChatSidebarProps {
  chats: Chat[];
  selectedChat: Chat | null;
  onSelectChat: (chat: Chat) => void;
  onShowProfile: () => void;
}

export default function ChatSidebar({ chats, selectedChat, onSelectChat, onShowProfile }: ChatSidebarProps) {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [search, setSearch] = useState('');
  const [invitationsCount, setInvitationsCount] = useState(0);
  const [mentionsCount, setMentionsCount] = useState(0);

  useEffect(() => {
    loadInvitationsCount();
    loadMentionsCount();
    const interval = setInterval(() => {
      loadInvitationsCount();
      loadMentionsCount();
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const loadInvitationsCount = async () => {
    try {
      const token = localStorage.getItem('chat_auth');
      if (!token) return;

      const authData = JSON.parse(token);
      const response = await fetch('https://functions.poehali.dev/39372316-affa-49c6-8682-2d9a8d564b70', {
        method: 'GET',
        headers: { 'X-Auth-Token': authData.token }
      });

      if (response.ok) {
        const data = await response.json();
        setInvitationsCount(data.invitations?.length || 0);
      }
    } catch (error) {
      console.error('Failed to load invitations count:', error);
    }
  };

  const loadMentionsCount = async () => {
    try {
      const token = localStorage.getItem('chat_auth');
      if (!token) return;

      const authData = JSON.parse(token);
      const response = await fetch('https://functions.poehali.dev/17805d36-3b7d-454a-a234-d68790671878?action=mentions', {
        method: 'GET',
        headers: { 'X-Auth-Token': authData.token }
      });

      if (response.ok) {
        const data = await response.json();
        setMentionsCount(data.stories?.length || 0);
      }
    } catch (error) {
      console.error('Failed to load mentions count:', error);
    }
  };

  const filteredChats = chats.filter(chat => 
    chat.username?.toLowerCase().includes(search.toLowerCase())
  );

  const totalUnread = chats.reduce((sum, chat) => sum + (chat.unread_count || 0), 0);
  const totalNotifications = invitationsCount + mentionsCount;

  const getChatName = (chat: Chat) => {
    return chat.username || 'Пользователь';
  };

  const getChatAvatar = (chat: Chat) => {
    return chat.avatar_url;
  };

  return (
    <div className="w-full md:w-80 border-r flex flex-col bg-background h-screen md:h-auto">
      <div className="p-3 md:p-4 border-b space-y-3 md:space-y-4 shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 md:gap-3 cursor-pointer flex-1 min-w-0" onClick={onShowProfile}>
            <div className="relative shrink-0">
              <Avatar className="h-9 w-9 md:h-10 md:w-10">
                <AvatarImage src={user?.avatar_url || undefined} />
                <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                  {user?.username[0]?.toUpperCase()}
                </AvatarFallback>
              </Avatar>
              {(totalUnread > 0 || totalNotifications > 0) && (
                <div className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 rounded-full flex items-center justify-center">
                  <span className="text-[10px] font-bold text-white">
                    {(totalUnread + totalNotifications) > 9 ? '9+' : (totalUnread + totalNotifications)}
                  </span>
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm truncate">{user?.username}</p>
              <p className="text-xs text-muted-foreground">Онлайн</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="h-9 w-9 md:h-10 md:w-10 shrink-0" onClick={logout}>
            <Icon name="LogOut" size={18} />
          </Button>
        </div>

        <div className="relative touch-manipulation">
          <Icon name="Search" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Поиск чатов..."
            className="pl-10 h-10 text-base md:text-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="flex gap-2">
          <Button className="flex-1 gap-2 h-10 md:h-9 touch-manipulation" onClick={() => navigate('/contacts')}>
            <Icon name="Users" size={18} />
            Контакты
          </Button>
          <Button 
            variant="outline" 
            size="icon" 
            className="h-10 md:h-9 w-10 md:w-9 shrink-0 relative" 
            onClick={() => navigate('/invitations')}
          >
            <Icon name="Mail" size={18} />
            {invitationsCount > 0 && (
              <div className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-[10px] font-bold text-white">{invitationsCount > 9 ? '9+' : invitationsCount}</span>
              </div>
            )}
          </Button>
          <Button 
            variant="outline" 
            size="icon" 
            className="h-10 md:h-9 w-10 md:w-9 shrink-0 relative" 
            onClick={() => navigate('/mentions')}
          >
            <Icon name="AtSign" size={18} />
            {mentionsCount > 0 && (
              <div className="absolute -top-1 -right-1 h-5 w-5 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-[10px] font-bold text-white">{mentionsCount > 9 ? '9+' : mentionsCount}</span>
              </div>
            )}
          </Button>
        </div>
      </div>

      <ScrollArea className="flex-1">
        {filteredChats.length === 0 ? (
          <div className="p-8 text-center">
            <div className="w-16 h-16 mx-auto rounded-full bg-muted flex items-center justify-center mb-4">
              <Icon name="MessageSquare" size={24} className="text-muted-foreground" />
            </div>
            <p className="text-sm text-muted-foreground">Нет чатов</p>
            <p className="text-xs text-muted-foreground mt-1">Начните новый разговор</p>
          </div>
        ) : (
          <div className="divide-y">
            {filteredChats.map((chat) => (
              <div
                key={chat.id}
                className={`p-3 md:p-4 cursor-pointer transition-colors hover:bg-muted/50 active:bg-muted/70 touch-manipulation ${
                  selectedChat?.id === chat.id ? 'bg-muted' : ''
                }`}
                onClick={() => onSelectChat(chat)}
              >
                <div className="flex items-start gap-2 md:gap-3">
                  <Avatar className="h-11 w-11 md:h-12 md:w-12 shrink-0">
                    <AvatarImage src={getChatAvatar(chat) || undefined} />
                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                      {getChatName(chat)[0]?.toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline justify-between mb-1">
                      <p className="font-semibold text-sm truncate">{getChatName(chat)}</p>
                      {chat.last_message && (
                        <span className="text-xs text-muted-foreground ml-2 shrink-0">
                          {formatDistanceToNow(new Date(chat.last_message.created_at), { 
                            addSuffix: true, 
                            locale: ru 
                          })}
                        </span>
                      )}
                    </div>
                    {chat.last_message && (
                      <p className="text-sm text-muted-foreground truncate">
                        {chat.last_message.content}
                      </p>
                    )}
                    {chat.unread_count && chat.unread_count > 0 && (
                      <div className="mt-1">
                        <span className="inline-flex items-center justify-center h-5 px-2 text-xs font-semibold text-white bg-blue-600 rounded-full">
                          {chat.unread_count}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </ScrollArea>


    </div>
  );
}