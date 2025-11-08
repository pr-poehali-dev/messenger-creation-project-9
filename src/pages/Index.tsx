import { useState, useEffect, useRef } from 'react';
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
import CreateChannelDialog, { type ChannelData } from '@/components/CreateChannelDialog';
import CreateGroupDialog, { type GroupData } from '@/components/CreateGroupDialog';
import ChannelInfoDialog from '@/components/ChannelInfoDialog';
import GroupInfoDialog from '@/components/GroupInfoDialog';
import { useChats } from '@/hooks/useChats';
import { useStories } from '@/hooks/useStories';
import Icon from '@/components/ui/icon';
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
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showSwipeHint, setShowSwipeHint] = useState(false);
  const [showCreateChannel, setShowCreateChannel] = useState(false);
  const [showCreateGroup, setShowCreateGroup] = useState(false);
  const [showChannelInfo, setShowChannelInfo] = useState(false);
  const [showGroupInfo, setShowGroupInfo] = useState(false);
  const [channels, setChannels] = useState<any[]>([]);
  const [groups, setGroups] = useState<any[]>([]);
  const [contacts, setContacts] = useState<ChatUser[]>([]);

  const chatsHook = useChats();
  const storiesHook = useStories(user);
  const touchStartX = useRef<number>(0);
  const touchCurrentX = useRef<number>(0);

  useEffect(() => {
    const checkAuth = async () => {
      const currentUser = await auth.verifyToken();
      setUser(currentUser);
      setIsLoading(false);
    };
    checkAuth();
  }, []);

  useEffect(() => {
    if (user) {
      const loadContacts = async () => {
        try {
          const contactsList = await chatsApi.getContacts();
          setContacts(contactsList);
        } catch (err) {
          console.error('Failed to load contacts:', err);
        }
      };
      loadContacts();
    }
  }, [user]);

  useEffect(() => {
    if (user && !isLoading) {
      const hasSeenHint = localStorage.getItem('hasSeenSwipeHint');
      const isMobile = window.innerWidth < 768;
      
      if (!hasSeenHint && isMobile) {
        setTimeout(() => {
          setShowSwipeHint(true);
          setTimeout(() => {
            setShowSwipeHint(false);
            localStorage.setItem('hasSeenSwipeHint', 'true');
          }, 3000);
        }, 1000);
      }
    }
  }, [user, isLoading]);

  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      touchStartX.current = e.touches[0].clientX;
      touchCurrentX.current = e.touches[0].clientX;
    };

    const handleTouchMove = (e: TouchEvent) => {
      touchCurrentX.current = e.touches[0].clientX;
    };

    const handleTouchEnd = () => {
      const diff = touchCurrentX.current - touchStartX.current;
      
      if (touchStartX.current < 50 && diff > 80) {
        setIsSidebarOpen(true);
      }
      
      if (isSidebarOpen && diff < -80) {
        setIsSidebarOpen(false);
      }
    };

    document.addEventListener('touchstart', handleTouchStart);
    document.addEventListener('touchmove', handleTouchMove);
    document.addEventListener('touchend', handleTouchEnd);

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isSidebarOpen]);

  useEffect(() => {
    if (user) {
      chatsHook.loadChats();
      storiesHook.loadStories();
    }
  }, [user]);

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

  const handleContactClick = async (contact: ChatUser) => {
    try {
      const existingChat = chatsHook.chats.find(
        chat => !chat.is_group && chat.other_user_id === contact.id
      );

      if (existingChat) {
        chatsHook.setSelectedChat(existingChat);
        setActiveSection('chats');
      } else {
        const newChat = await chatsHook.handleCreateChat(contact);
        if (newChat) {
          chatsHook.setSelectedChat(newChat);
          setActiveSection('chats');
        }
      }
      
      setIsSidebarOpen(false);
    } catch (err) {
      console.error('Failed to open chat with contact:', err);
    }
  };

  const handleCreateChannel = (data: ChannelData) => {
    const newChannel = {
      id: Date.now(),
      name: data.name,
      description: data.description,
      avatar: data.avatar || '',
      is_group: true,
      is_channel: true,
      is_public: data.isPublic,
      members_count: 1,
      creator_id: user?.id,
      is_admin: true,
      last_message: null,
      last_message_time: null,
      unread_count: 0,
      invite_link: `https://app.com/join/${Date.now()}`
    };
    setChannels(prev => [...prev, newChannel]);
  };

  const handleCreateGroup = (data: GroupData) => {
    const newGroup = {
      id: Date.now(),
      name: data.name,
      description: data.description,
      avatar: data.avatar || '',
      is_group: true,
      is_channel: false,
      members_count: data.members.length + 1,
      creator_id: user?.id,
      is_admin: true,
      last_message: null,
      last_message_time: null,
      unread_count: 0,
      invite_link: `https://app.com/join/${Date.now()}`
    };
    setGroups(prev => [...prev, newGroup]);
  };

  const handleNewChatClick = () => {
    if (activeSection === 'channels') {
      setShowCreateChannel(true);
    } else if (activeSection === 'groups') {
      setShowCreateGroup(true);
    } else {
      setShowNewChatDialog(true);
    }
  };

  const stickers = [
    '😀', '😃', '😄', '😁', '😆', '😅', '🤣', '😂', 
    '😊', '😇', '🙂', '🙃', '😉', '😌', '😍', '🥰',
    '😘', '😗', '😙', '😚', '😋', '😛', '😝', '😜',
    '🤪', '🤨', '🧐', '🤓', '😎', '🥸', '🤩', '🥳',
    '😏', '😒', '😞', '😔', '😟', '😕', '🙁', '😣',
    '😖', '😫', '😩', '🥺', '😢', '😭', '😤', '😠',
    '😡', '🤬', '🤯', '😳', '🥵', '🥶', '😱', '😨',
    '😰', '😥', '😓', '🤗', '🤔', '🤭', '🤫', '🤥',
    '😶', '😐', '😑', '😬', '🙄', '😯', '😦', '😧',
    '😮', '😲', '🥱', '😴', '🤤', '😪', '😵', '🤐',
    '🥴', '🤢', '🤮', '🤧', '😷', '🤒', '🤕', '🤑',
    '🤠', '👻', '💀', '👽', '👾', '🤖', '🎃', '😺',
    '😸', '😹', '😻', '😼', '😽', '🙀', '😿', '😾',
    '❤️', '🧡', '💛', '💚', '💙', '💜', '🖤', '🤍',
    '🤎', '💔', '❤️‍🔥', '💕', '💞', '💓', '💗', '💖',
    '💘', '💝', '💟', '☮️', '✝️', '☪️', '🕉️', '☸️',
    '👍', '👎', '👌', '🤌', '🤏', '✌️', '🤞', '🤟',
    '🤘', '🤙', '👈', '👉', '👆', '👇', '☝️', '👋',
    '🤚', '🖐️', '✋', '🖖', '👏', '🙌', '👐', '🤲',
    '🤝', '🙏', '✍️', '💅', '🤳', '💪', '🦾', '🦿',
    '🔥', '💥', '💫', '⭐', '🌟', '✨', '⚡', '💦',
    '🎉', '🎊', '🎈', '🎁', '🏆', '🥇', '🥈', '🥉',
    '⚽', '🏀', '🏈', '⚾', '🥎', '🎾', '🏐', '🏉',
    '🎱', '🎮', '🎯', '🎲', '🎰', '🎳', '🎪', '🎭',
    '🎨', '🎬', '🎤', '🎧', '🎼', '🎹', '🥁', '🎷',
    '🍕', '🍔', '🍟', '🌭', '🍿', '🧂', '🥓', '🥚',
    '🍳', '🧇', '🥞', '🧈', '🍞', '🥐', '🥨', '🥯',
    '🍎', '🍏', '🍊', '🍋', '🍌', '🍉', '🍇', '🍓',
    '🫐', '🍈', '🍒', '🍑', '🥭', '🍍', '🥥', '🥝',
    '☕', '🍵', '🧃', '🥤', '🧋', '🍶', '🍺', '🍻',
    '🥂', '🍷', '🥃', '🍸', '🍹', '🧉', '🍾', '🧊',
    '🚗', '🚕', '🚙', '🚌', '🚎', '🏎️', '🚓', '🚑',
    '🚒', '🚐', '🛻', '🚚', '🚛', '🚜', '🛴', '🚲',
    '🛵', '🏍️', '✈️', '🚀', '🛸', '🚁', '🛶', '⛵',
    '🏠', '🏡', '🏢', '🏣', '🏤', '🏥', '🏦', '🏨',
    '🏩', '🏪', '🏫', '🏬', '🏭', '🏯', '🏰', '💒',
    '🌍', '🌎', '🌏', '🌐', '🗺️', '🏔️', '⛰️', '🌋',
    '🗻', '🏕️', '🏖️', '🏜️', '🏝️', '🏞️', '🏟️', '🏛️',
    '⚽', '🏀', '🏈', '⚾', '🥎', '🎾', '🏐', '🏉',
    '💰', '💴', '💵', '💶', '💷', '💸', '💳', '🧾',
    '💎', '⚖️', '🧰', '🔧', '🔨', '⚒️', '🛠️', '⛏️',
    '🔩', '⚙️', '🧱', '⛓️', '🧲', '🔫', '💣', '🧨'
  ];
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
    <div className="flex h-screen bg-background overflow-hidden">
      <AppSidebar
        activeSection={activeSection}
        onSectionChange={(section) => {
          setActiveSection(section);
          setIsSidebarOpen(false);
        }}
        user={user}
        isMobileOpen={isSidebarOpen}
        onMobileClose={() => setIsSidebarOpen(false)}
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
          onShowSwipeHint={() => {
            localStorage.removeItem('hasSeenSwipeHint');
            setShowSwipeHint(true);
            setTimeout(() => {
              setShowSwipeHint(false);
            }, 3000);
          }}
        />
      ) : (
        <>
          <ChatSection
            activeSection={activeSection}
            chats={chatsHook.chats}
            selectedChat={chatsHook.selectedChat}
            onChatSelect={chatsHook.setSelectedChat}
            onMenuClick={() => setIsSidebarOpen(true)}
            currentUser={user}
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
            onNewChatClick={handleNewChatClick}
            stories={storiesHook.stories}
            currentUserId={user.id}
            onStoryClick={storiesHook.handleStoryClick}
            onCreateStory={() => setShowCreateStory(true)}
            channels={channels}
            groups={groups}
            contacts={contacts}
            onContactClick={handleContactClick}
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

      <CreateChannelDialog
        open={showCreateChannel}
        onOpenChange={setShowCreateChannel}
        onCreateChannel={handleCreateChannel}
      />

      <CreateGroupDialog
        open={showCreateGroup}
        onOpenChange={setShowCreateGroup}
        contacts={contacts}
        onCreateGroup={handleCreateGroup}
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

      {showSwipeHint && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-none md:hidden">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 animate-pulse">
            <div className="flex items-center gap-3 bg-primary/90 text-white px-6 py-4 rounded-r-2xl shadow-2xl backdrop-blur-sm">
              <div className="flex items-center gap-2 animate-bounce-x">
                <Icon name="ChevronsRight" size={32} className="text-white" />
                <Icon name="ChevronsRight" size={32} className="text-white/60" />
              </div>
              <div className="text-left">
                <div className="font-bold text-lg">Свайп вправо</div>
                <div className="text-sm text-white/90">Чтобы открыть меню</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}