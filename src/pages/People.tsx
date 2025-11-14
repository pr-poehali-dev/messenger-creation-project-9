import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import UserGrid from '@/components/chat/UserGrid';
import ProfilePanel from '@/components/chat/ProfilePanel';
import { getUsers, getUnreadCounts } from '@/lib/api';
import type { Chat } from '@/types/chat';

export default function People() {
  const navigate = useNavigate();
  const [users, setUsers] = useState<Chat[]>([]);
  const [showProfile, setShowProfile] = useState(false);
  const [unreadCounts, setUnreadCounts] = useState<Record<number, number>>({});

  useEffect(() => {
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
    } catch (error) {
      console.error('Failed to check unread:', error);
    }
  };

  const handleSelectUser = (user: Chat) => {
    navigate('/chat', { state: { selectedUserId: user.id } });
  };

  return (
    <div className="h-screen flex flex-col bg-background overflow-hidden">
      <header className="border-b p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/chat')}
            className="shrink-0"
          >
            <Icon name="ArrowLeft" size={20} />
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Люди</h1>
            <p className="text-sm text-muted-foreground">Выберите человека для общения</p>
          </div>
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

      {showProfile && (
        <div className="fixed inset-0 z-50 bg-background">
          <ProfilePanel onClose={() => setShowProfile(false)} />
        </div>
      )}
    </div>
  );
}
