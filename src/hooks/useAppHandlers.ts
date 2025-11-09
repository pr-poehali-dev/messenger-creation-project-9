import { auth } from '@/lib/auth';
import { chatsApi } from '@/lib/chats';
import type { ChatUser, Section } from '@/types';
import type { ChannelData } from '@/components/CreateChannelDialog';
import type { GroupData } from '@/components/CreateGroupDialog';

type UseAppHandlersProps = {
  chatsHook: any;
  storiesHook: any;
  setShowNewChatDialog: (show: boolean) => void;
  setUserSearch: (search: string) => void;
  setSearchResults: (results: ChatUser[]) => void;
  setActiveSection: (section: Section) => void;
  setIsSidebarOpen: (open: boolean) => void;
  setError: (error: string) => void;
  setUser: (user: any) => void;
  setSelectedUserProfile: (user: ChatUser | null) => void;
  setChannels: (fn: (prev: any[]) => any[]) => void;
  setGroups: (fn: (prev: any[]) => any[]) => void;
  setShowCreateChannel: (show: boolean) => void;
  setShowCreateGroup: (show: boolean) => void;
  setShowNewChatDialog: (show: boolean) => void;
  authMode: string;
  email: string;
  password: string;
  username: string;
  activeSection: Section;
  user: any;
};

export function useAppHandlers({
  chatsHook,
  storiesHook,
  setShowNewChatDialog,
  setUserSearch,
  setSearchResults,
  setActiveSection,
  setIsSidebarOpen,
  setError,
  setUser,
  setSelectedUserProfile,
  setChannels,
  setGroups,
  setShowCreateChannel,
  setShowCreateGroup,
  authMode,
  email,
  password,
  username,
  activeSection,
  user,
}: UseAppHandlersProps) {
  
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
        (chat: any) => !chat.is_group && chat.other_user_id === userId
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
        
        const targetChat = chatsHook.chats.find((c: any) => c.id === chatId);
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
        (chat: any) => !chat.is_group && chat.other_user_id === contact.id
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

  const handleUserClick = (clickedUser: ChatUser) => {
    setSelectedUserProfile(clickedUser);
  };

  const handleSendMessageToUser = async (clickedUser: ChatUser) => {
    try {
      const existingChat = chatsHook.chats.find(
        (chat: any) => !chat.is_group && chat.other_user_id === clickedUser.id
      );

      if (existingChat) {
        chatsHook.setSelectedChat(existingChat);
      } else {
        const newChat = await chatsHook.handleCreateChat(clickedUser);
        if (newChat) {
          chatsHook.setSelectedChat(newChat);
        }
      }
      
      setSelectedUserProfile(null);
      setActiveSection('chats');
      setIsSidebarOpen(false);
    } catch (err) {
      console.error('Failed to open chat with user:', err);
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
    setChannels((prev: any[]) => [...prev, newChannel]);
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
    setGroups((prev: any[]) => [...prev, newGroup]);
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

  return {
    handleCreateChat,
    handleReplyToStory,
    handleAuth,
    handleLogout,
    handleContactClick,
    handleUserClick,
    handleSendMessageToUser,
    handleCreateChannel,
    handleCreateGroup,
    handleNewChatClick,
  };
}
