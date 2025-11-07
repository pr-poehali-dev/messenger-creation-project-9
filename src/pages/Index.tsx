import { useState, useEffect } from 'react';
import { auth } from '@/lib/auth';
import { chatsApi } from '@/lib/chats';
import AuthForm from '@/components/AuthForm';
import ProfileView from '@/components/ProfileView';
import SettingsView from '@/components/SettingsView';
import AppSidebar from '@/components/AppSidebar';
import ChatSection from '@/components/ChatSection';
import NewChatDialog from '@/components/NewChatDialog';
import StoryViewer from '@/components/StoryViewer';
import CreateStoryDialog from '@/components/CreateStoryDialog';
import { useChats } from '@/hooks/useChats';
import { useStories } from '@/hooks/useStories';
import type { User, ChatUser, Section, AuthMode } from '@/types';

export default function Index() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [authMode, setAuthMode] = useState<AuthMode>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [activeSection, setActiveSection] = useState<Section>('chats');
  const [showNewChatDialog, setShowNewChatDialog] = useState(false);
  const [userSearch, setUserSearch] = useState('');
  const [searchResults, setSearchResults] = useState<ChatUser[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showCreateStory, setShowCreateStory] = useState(false);

  const chatsHook = useChats();
  const storiesHook = useStories(user);

  useEffect(() => {
    const checkAuth = async () => {
      const currentUser = await auth.verifyToken();
      setUser(currentUser);
      setIsLoading(false);
      if (currentUser) {
        chatsHook.loadChats();
        storiesHook.loadStories();
      }
    };
    checkAuth();
  }, []);

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
      await chatsHook.handleCreateChat(otherUser);
      setShowNewChatDialog(false);
      setUserSearch('');
      setSearchResults([]);
    } catch (err) {
      console.error('Failed to create chat:', err);
    }
  };

  const handleReplyToStory = async (userId: number, username: string, message: string) => {
    try {
      const existingChat = chatsHook.chats.find(
        chat => !chat.is_group && chat.other_user_id === userId
      );

      let chatId: number;
      
      if (existingChat) {
        chatId = existingChat.id;
      } else {
        chatId = await chatsHook.handleCreateChat({ id: userId, username, email: '', avatar: username.slice(0, 2).toUpperCase() });
      }

      if (chatId) {
        await chatsApi.sendMessage(chatId, `Ответ на историю: ${message}`);
        await chatsHook.loadChats();
        
        const targetChat = chatsHook.chats.find(c => c.id === chatId);
        if (targetChat) {
          chatsHook.setSelectedChat(targetChat);
          setActiveSection('chats');
        }
      }
    } catch (err) {
      console.error('Failed to reply to story:', err);
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
    <div className="flex h-screen bg-background">
      <AppSidebar
        activeSection={activeSection}
        onSectionChange={setActiveSection}
        user={user}
      />

      {activeSection === 'profile' ? (
        <ProfileView 
          user={user} 
          onLogout={handleLogout} 
          onBack={() => setActiveSection('chats')}
        />
      ) : activeSection === 'settings' ? (
        <SettingsView
          onBack={() => setActiveSection('chats')}
        />
      ) : (
        <>
          <ChatSection
            activeSection={activeSection}
            chats={chatsHook.chats}
            selectedChat={chatsHook.selectedChat}
            onChatSelect={chatsHook.setSelectedChat}
            messages={chatsHook.messages}
            messageText={chatsHook.messageText}
            onMessageTextChange={chatsHook.setMessageText}
            onSendMessage={chatsHook.handleSendMessage}
            showStickers={chatsHook.showStickers}
            onToggleStickers={() => chatsHook.setShowStickers(!chatsHook.showStickers)}
            stickers={stickers}
            reactions={reactions}
            onStickerClick={chatsHook.handleStickerClick}
            onAddReaction={chatsHook.addReaction}
            chatSearchQuery={chatsHook.chatSearchQuery}
            onChatSearchChange={chatsHook.setChatSearchQuery}
            messageSearchQuery={chatsHook.messageSearchQuery}
            onMessageSearchChange={chatsHook.setMessageSearchQuery}
            onNewChatClick={() => setShowNewChatDialog(true)}
            stories={storiesHook.stories}
            currentUserId={user.id}
            onStoryClick={storiesHook.handleStoryClick}
            onCreateStory={() => setShowCreateStory(true)}
          />
        </>
      )}

      <NewChatDialog
        open={showNewChatDialog}
        onOpenChange={setShowNewChatDialog}
        userSearch={userSearch}
        onUserSearchChange={setUserSearch}
        searchResults={searchResults}
        isSearching={isSearching}
        onSelectUser={handleCreateChat}
      />

      <CreateStoryDialog
        open={showCreateStory}
        onClose={() => setShowCreateStory(false)}
        onCreateStory={storiesHook.handleCreateStory}
      />

      {storiesHook.showStoryViewer && storiesHook.stories.filter(s => s.items.length > 0).length > 0 && (
        <StoryViewer
          stories={storiesHook.stories.filter(s => s.items.length > 0)}
          initialStoryIndex={storiesHook.currentStoryIndex}
          currentUserId={user.id}
          onClose={() => storiesHook.setShowStoryViewer(false)}
          onDeleteStory={storiesHook.handleDeleteStory}
          onReplyToStory={handleReplyToStory}
        />
      )}
    </div>
  );
}