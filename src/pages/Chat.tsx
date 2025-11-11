import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import ChatSidebar from '@/components/chat/ChatSidebar';
import ChatWindow from '@/components/chat/ChatWindow';
import ProfilePanel from '@/components/chat/ProfilePanel';
import type { Chat } from '@/types/chat';

export default function Chat() {
  const { user } = useAuth();
  const [chats, setChats] = useState<Chat[]>([]);
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [showProfile, setShowProfile] = useState(false);

  useEffect(() => {
    loadChats();
  }, []);

  const loadChats = async () => {
    // Заглушка - будем загружать чаты из API
    setChats([]);
  };

  return (
    <div className="h-screen flex bg-background overflow-hidden">
      <ChatSidebar
        chats={chats}
        selectedChat={selectedChat}
        onSelectChat={setSelectedChat}
        onShowProfile={() => setShowProfile(true)}
      />
      
      <div className="flex-1 flex flex-col">
        {selectedChat ? (
          <ChatWindow chat={selectedChat} />
        ) : (
          <div className="flex-1 flex items-center justify-center bg-muted/20">
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
        <ProfilePanel onClose={() => setShowProfile(false)} />
      )}
    </div>
  );
}
