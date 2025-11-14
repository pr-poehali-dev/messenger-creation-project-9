import { useState, useEffect, useRef } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useLocation } from 'react-router-dom';
import ChatSidebar from '@/components/chat/ChatSidebar';
import ChatWindow from '@/components/chat/ChatWindow';
import ProfilePanel from '@/components/chat/ProfilePanel';
import StoriesBar from '@/components/stories/StoriesBar';
import StoryViewer from '@/components/stories/StoryViewer';
import StoryCreator from '@/components/stories/StoryCreator';
import { getUsers, getUnreadCounts } from '@/lib/api';
import { useNotifications } from '@/hooks/useNotifications';
import { useSwipe } from '@/hooks/useSwipe';
import type { Chat as ChatType } from '@/types/chat';

export default function Chat() {
  const { user } = useAuth();
  const location = useLocation();
  const [chats, setChats] = useState<ChatType[]>([]);
  const [selectedChat, setSelectedChat] = useState<ChatType | null>(null);
  const [showProfile, setShowProfile] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true);
  const [unreadCounts, setUnreadCounts] = useState<Record<number, number>>({});
  const [showStoryViewer, setShowStoryViewer] = useState(false);
  const [storyUserId, setStoryUserId] = useState<number | null>(null);
  const [showStoryCreator, setShowStoryCreator] = useState(false);
  const { showNotification, requestPermission } = useNotifications();
  const prevUnreadRef = useRef<Record<number, number>>({});

  useEffect(() => {
    requestPermission();
    loadChats();
    checkUnreadMessages();
    
    const chatsInterval = setInterval(loadChats, 5000);
    const unreadInterval = setInterval(checkUnreadMessages, 3000);
    
    return () => {
      clearInterval(chatsInterval);
      clearInterval(unreadInterval);
    };
  }, []);

  useEffect(() => {
    loadChats();
  }, [unreadCounts]);

  useEffect(() => {
    if (location.state?.selectedUserId) {
      const user = chats.find(c => c.id === location.state.selectedUserId);
      if (user) {
        handleSelectChat(user);
      }
    }
  }, [location.state, chats]);

  useEffect(() => {
    const totalUnread = Object.values(unreadCounts).reduce((sum, count) => sum + count, 0);
    if (totalUnread > 0) {
      document.title = `(${totalUnread}) Peeky — Онлайн чат`;
    } else {
      document.title = 'Peeky — Онлайн чат';
    }
  }, [unreadCounts]);

  const loadChats = async () => {
    try {
      const users = await getUsers();
      const chatsWithUnread = users.map((user: ChatType) => ({
        ...user,
        unread_count: unreadCounts[user.id] || 0
      }));
      setChats(chatsWithUnread);
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
          const chat = chats.find(c => c.id === Number(userId));
          if (chat && selectedChat?.id !== Number(userId)) {
            showNotification(
              `Новое сообщение от ${chat.username}`,
              `У вас ${count} новых сообщений`,
              chat.avatar_url || undefined
            );
          }
        }
      });
      
      prevUnreadRef.current = counts;
    } catch (error) {
      console.error('Failed to check unread:', error);
    }
  };

  const handleSelectChat = (chat: ChatType) => {
    setSelectedChat(chat);
    setShowSidebar(false);
    setUnreadCounts(prev => ({
      ...prev,
      [chat.id]: 0
    }));
  };

  const handleBackToChats = () => {
    setSelectedChat(null);
    setShowSidebar(true);
  };

  const handleStoryClick = (userId: number) => {
    setStoryUserId(userId);
    setShowStoryViewer(true);
  };

  const handleAddStory = () => {
    setShowStoryCreator(true);
  };

  const handleStoryCreated = () => {
    // Обновить список историй
  };

  const handleNextChat = () => {
    if (!selectedChat) return;
    const currentIndex = chats.findIndex(c => c.id === selectedChat.id);
    if (currentIndex < chats.length - 1) {
      handleSelectChat(chats[currentIndex + 1]);
    }
  };

  const handlePrevChat = () => {
    if (!selectedChat) return;
    const currentIndex = chats.findIndex(c => c.id === selectedChat.id);
    if (currentIndex > 0) {
      handleSelectChat(chats[currentIndex - 1]);
    }
  };

  const swipeHandlers = useSwipe({
    onSwipeRight: () => {
      if (selectedChat && !showSidebar) {
        handleBackToChats();
      }
    },
    onSwipeLeft: handleNextChat,
  });

  return (
    <div 
      className="h-screen flex bg-background overflow-hidden"
      onTouchStart={swipeHandlers.onTouchStart}
      onTouchMove={swipeHandlers.onTouchMove}
      onTouchEnd={swipeHandlers.onTouchEnd}
    >
      <div className={`${
        showSidebar ? 'flex' : 'hidden'
      } md:flex w-full md:w-auto flex-col`}>
        <ChatSidebar
          chats={chats}
          selectedChat={selectedChat}
          onSelectChat={handleSelectChat}
          onShowProfile={() => setShowProfile(true)}
        />
      </div>
      
      <div className={`${
        showSidebar ? 'hidden' : 'flex'
      } md:flex flex-1 flex-col w-full`}>
        <StoriesBar onStoryClick={handleStoryClick} onAddStory={handleAddStory} />
        
        {selectedChat ? (
          <ChatWindow chat={selectedChat} onBack={handleBackToChats} />
        ) : (
          <div className="hidden md:flex flex-1 items-center justify-center bg-muted/20">
            <div className="text-center space-y-4">
              <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-5xl">
                💬
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-2">Добро пожаловать, {user?.username}!</h2>
                <p className="text-muted-foreground">Выберите чат или создайте новый</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {showProfile && (
        <div className="fixed inset-0 md:relative md:inset-auto z-50">
          <ProfilePanel onClose={() => setShowProfile(false)} />
        </div>
      )}

      {showStoryViewer && storyUserId && (
        <StoryViewer
          userId={storyUserId}
          onClose={() => {
            setShowStoryViewer(false);
            setStoryUserId(null);
          }}
          onNext={() => {
            // TODO: Переключение на следующую историю
          }}
          onPrev={() => {
            // TODO: Переключение на предыдущую историю
          }}
        />
      )}

      {showStoryCreator && (
        <StoryCreator
          onClose={() => setShowStoryCreator(false)}
          onCreated={handleStoryCreated}
        />
      )}
    </div>
  );
}