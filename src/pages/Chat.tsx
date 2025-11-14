import { useState, useEffect, useRef } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import UserGrid from '@/components/chat/UserGrid';
import ChatWindow from '@/components/chat/ChatWindow';
import ProfilePanel from '@/components/chat/ProfilePanel';
import { getUsers, getUnreadCounts } from '@/lib/api';
import { useNotifications } from '@/hooks/useNotifications';
import type { Chat } from '@/types/chat';

export default function Chat() {
  const { user } = useAuth();
  const [users, setUsers] = useState<Chat[]>([]);
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [showProfile, setShowProfile] = useState(false);
  const [unreadCounts, setUnreadCounts] = useState<Record<number, number>>({});
  const { showNotification, requestPermission } = useNotifications();
  const prevUnreadRef = useRef<Record<number, number>>({});

  useEffect(() => {
    requestPermission();
    loadUsers();
    checkUnreadMessages();
    
    const usersInterval = setInterval(loadUsers, 5000);
    const unreadInterval = setInterval(checkUnreadMessages, 3000);
    
    return () => {
      clearInterval(usersInterval);
      clearInterval(unreadInterval);
    };
  }, []);

  useEffect(() => {
    loadUsers();
  }, [unreadCounts]);

  useEffect(() => {
    const totalUnread = Object.values(unreadCounts).reduce((sum, count) => sum + count, 0);
    if (totalUnread > 0) {
      document.title = `(${totalUnread}) Peeky — Онлайн чат`;
    } else {
      document.title = 'Peeky — Онлайн чат';
    }
  }, [unreadCounts]);

  const loadUsers = async () => {
    try {
      const usersData = await getUsers();
      const usersWithUnread = usersData.map((user: Chat) => ({
        ...user,
        unread_count: unreadCounts[user.id] || 0
      }));
      setUsers(usersWithUnread);
    } catch (error) {
      console.error('Failed to load users:', error);
    }
  };

  const checkUnreadMessages = async () => {
    try {
      const counts = await getUnreadCounts();
      setUnreadCounts(counts);
      
      Object.entries(counts).forEach(([userId, count]) => {
        const prevCount = prevUnreadRef.current[Number(userId)] || 0;
        if (count > prevCount) {
          const user = users.find(u => u.id === Number(userId));
          if (user && selectedChat?.id !== Number(userId)) {
            showNotification(
              `Новое сообщение от ${user.username}`,
              `У вас ${count} новых сообщений`,
              user.avatar_url || undefined
            );
          }
        }
      });
      
      prevUnreadRef.current = counts;
    } catch (error) {
      console.error('Failed to check unread:', error);
    }
  };

  const handleSelectUser = (user: Chat) => {
    setSelectedChat(user);
    setUnreadCounts(prev => ({
      ...prev,
      [user.id]: 0
    }));
  };

  const handleBackToUsers = () => {
    setSelectedChat(null);
  };

  return (
    <div className="h-screen flex flex-col bg-background overflow-hidden">
      {selectedChat ? (
        <ChatWindow chat={selectedChat} onBack={handleBackToUsers} />
      ) : (
        <>
          <header className="border-b p-4 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Peeky</h1>
              <p className="text-sm text-muted-foreground">Выберите человека для общения</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowProfile(true)}
              className="shrink-0"
            >
              <Icon name="User" size={20} />
            </Button>
          </header>

          <div className="flex-1 overflow-y-auto">
            <UserGrid users={users} onSelectUser={handleSelectUser} />
          </div>
        </>
      )}

      {showProfile && (
        <div className="fixed inset-0 z-50 bg-background">
          <ProfilePanel onClose={() => setShowProfile(false)} />
        </div>
      )}
    </div>
  );
}