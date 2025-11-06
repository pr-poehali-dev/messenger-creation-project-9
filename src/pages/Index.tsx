import { useState, useEffect } from 'react';
import Icon from '@/components/ui/icon';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { auth } from '@/lib/auth';
import { chatsApi } from '@/lib/chats';
import AuthForm from '@/components/AuthForm';
import ChatList from '@/components/ChatList';
import ChatWindow from '@/components/ChatWindow';
import NewChatDialog from '@/components/NewChatDialog';
import type { User, Chat, Message, ChatUser, Section, AuthMode } from '@/types';

export default function Index() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [authMode, setAuthMode] = useState<AuthMode>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  
  const [activeSection, setActiveSection] = useState<Section>('chats');
  const [chats, setChats] = useState<Chat[]>([]);
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [messageText, setMessageText] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [showStickers, setShowStickers] = useState(false);
  const [showNewChatDialog, setShowNewChatDialog] = useState(false);
  const [userSearch, setUserSearch] = useState('');
  const [searchResults, setSearchResults] = useState<ChatUser[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  
  useEffect(() => {
    const checkAuth = async () => {
      const currentUser = await auth.verifyToken();
      setUser(currentUser);
      setIsLoading(false);
      if (currentUser) {
        loadChats();
      }
    };
    checkAuth();
  }, []);
  
  useEffect(() => {
    if (selectedChat) {
      loadMessages(selectedChat.id);
    }
  }, [selectedChat]);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      if (userSearch.trim()) {
        searchUsers();
      } else {
        setSearchResults([]);
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [userSearch]);
  
  const loadChats = async () => {
    try {
      const data = await chatsApi.getChats();
      setChats(data);
    } catch (err) {
      console.error('Failed to load chats:', err);
    }
  };
  
  const loadMessages = async (chatId: number) => {
    try {
      const data = await chatsApi.getMessages(chatId);
      setMessages(data);
    } catch (err) {
      console.error('Failed to load messages:', err);
    }
  };
  
  const searchUsers = async () => {
    setIsSearching(true);
    try {
      const data = await chatsApi.searchUsers(userSearch);
      setSearchResults(data);
    } catch (err) {
      console.error('Failed to search users:', err);
    }
    setIsSearching(false);
  };
  
  const handleCreateChat = async (otherUser: ChatUser) => {
    try {
      const chatId = await chatsApi.createChat(otherUser.id);
      await loadChats();
      const newChat = chats.find(c => c.id === chatId);
      if (newChat) {
        setSelectedChat(newChat);
      }
      setShowNewChatDialog(false);
      setUserSearch('');
      setSearchResults([]);
    } catch (err) {
      console.error('Failed to create chat:', err);
    }
  };
  
  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      if (authMode === 'register') {
        const { user: newUser } = await auth.register(email, password, username);
        setUser(newUser);
      } else {
        const { user: loggedUser } = await auth.login(email, password);
        setUser(loggedUser);
      }
    } catch (err: any) {
      setError(err.message);
    }
  };
  
  const handleLogout = () => {
    auth.logout();
    setUser(null);
  };

  const stickers = ['😀', '😂', '❤️', '🔥', '👍', '🎉', '😍', '💯', '✨', '🚀', '💪', '🤖'];
  const reactions = ['👍', '❤️', '😂', '😮', '😢', '🔥'];

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

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <div className="text-center space-y-4">
          <div className="w-20 h-20 mx-auto gradient-primary rounded-full animate-pulse" />
          <p className="text-muted-foreground">Загрузка...</p>
        </div>
      </div>
    );
  }
  
  if (!user) {
    return (
      <AuthForm
        authMode={authMode}
        email={email}
        password={password}
        username={username}
        error={error}
        onEmailChange={setEmail}
        onPasswordChange={setPassword}
        onUsernameChange={setUsername}
        onSubmit={handleAuth}
        onToggleMode={() => {
          setAuthMode(authMode === 'login' ? 'register' : 'login');
          setError('');
        }}
      />
    );
  }

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <aside className="w-20 glass flex flex-col items-center py-6 space-y-6 border-r border-border">
        <div className="gradient-primary w-12 h-12 rounded-2xl flex items-center justify-center text-2xl font-bold cursor-pointer hover:scale-110 transition-transform">
          T
        </div>
        
        <nav className="flex-1 flex flex-col space-y-4">
          {[
            { icon: 'MessageSquare', section: 'chats' as Section, label: 'Чаты' },
            { icon: 'Users', section: 'contacts' as Section, label: 'Контакты' },
            { icon: 'Users2', section: 'groups' as Section, label: 'Группы' },
            { icon: 'Radio', section: 'channels' as Section, label: 'Каналы' },
          ].map(({ icon, section, label }) => (
            <button
              key={section}
              onClick={() => setActiveSection(section)}
              className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${
                activeSection === section
                  ? 'gradient-primary text-white'
                  : 'text-muted-foreground hover:bg-muted'
              }`}
              title={label}
            >
              <Icon name={icon} size={24} />
            </button>
          ))}
        </nav>

        <div className="space-y-4">
          <button
            onClick={() => setActiveSection('settings')}
            className="w-12 h-12 rounded-2xl flex items-center justify-center text-muted-foreground hover:bg-muted transition-all"
            title="Настройки"
          >
            <Icon name="Settings" size={24} />
          </button>
          <Avatar className="cursor-pointer hover:scale-110 transition-transform" onClick={handleLogout} title="Выйти">
            <AvatarImage src="" />
            <AvatarFallback className="gradient-primary text-white font-semibold text-xl">
              {user.avatar}
            </AvatarFallback>
          </Avatar>
        </div>
      </aside>

      <div className="w-96 flex flex-col border-r border-border">
        <div className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold gradient-text">
              {activeSection === 'chats' && 'Чаты'}
              {activeSection === 'contacts' && 'Контакты'}
              {activeSection === 'groups' && 'Группы'}
              {activeSection === 'channels' && 'Каналы'}
              {activeSection === 'settings' && 'Настройки'}
            </h1>
            <div className="flex gap-2">
              <Button size="icon" variant="ghost" className="rounded-full">
                <Icon name="Search" size={20} />
              </Button>
              <Button size="icon" variant="ghost" className="rounded-full" onClick={() => setShowNewChatDialog(true)}>
                <Icon name="Plus" size={20} />
              </Button>
            </div>
          </div>

          <div className="relative">
            <Icon name="Search" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Поиск..."
              className="pl-10 rounded-full bg-muted border-0"
            />
          </div>
        </div>

        {activeSection === 'chats' && (
          <ChatList
            chats={chats}
            selectedChatId={selectedChat?.id || null}
            onSelectChat={setSelectedChat}
          />
        )}

        {activeSection === 'settings' && (
          <div className="flex-1 px-6 py-4 space-y-4">
            <div className="space-y-3">
              {[
                { icon: 'Palette', label: 'Темы оформления', desc: 'Измените внешний вид' },
                { icon: 'Bell', label: 'Уведомления', desc: 'Настройте оповещения' },
                { icon: 'Lock', label: 'Приватность', desc: 'Управление безопасностью' },
                { icon: 'Database', label: 'Данные', desc: 'Хранилище и кэш' },
                { icon: 'Languages', label: 'Язык', desc: 'Русский' },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 p-4 rounded-2xl glass hover:bg-muted/50 cursor-pointer transition-all"
                >
                  <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center">
                    <Icon name={item.icon} size={20} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold">{item.label}</h4>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                  <Icon name="ChevronRight" size={20} className="text-muted-foreground" />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="flex-1 flex flex-col">
        <ChatWindow
          selectedChat={selectedChat}
          messages={messages}
          currentUser={user}
          messageText={messageText}
          onMessageTextChange={setMessageText}
          onSendMessage={handleSendMessage}
          showStickers={showStickers}
          onToggleStickers={() => setShowStickers(!showStickers)}
          stickers={stickers}
          reactions={reactions}
          onStickerClick={handleStickerClick}
          onAddReaction={addReaction}
        />
      </div>
      
      <NewChatDialog
        open={showNewChatDialog}
        onOpenChange={setShowNewChatDialog}
        userSearch={userSearch}
        onUserSearchChange={setUserSearch}
        searchResults={searchResults}
        isSearching={isSearching}
        onSelectUser={handleCreateChat}
      />
    </div>
  );
}