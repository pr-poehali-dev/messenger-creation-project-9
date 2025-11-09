import { useState, useEffect, useRef } from 'react';
import { auth } from '@/lib/auth';
import { chatsApi } from '@/lib/chats';
import { useChats } from '@/hooks/useChats';
import { useStories } from '@/hooks/useStories';
import type { User, ChatUser, Section, AuthMode } from '@/types';

export function useAppState() {
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
  const [allUsers, setAllUsers] = useState<ChatUser[]>([]);
  const [selectedUserProfile, setSelectedUserProfile] = useState<ChatUser | null>(null);

  const chatsHook = useChats(user);
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

      const loadAllUsers = async () => {
        try {
          const usersList = await chatsApi.searchUsers('');
          setAllUsers(usersList);
        } catch (err) {
          console.error('Failed to load users:', err);
        }
      };
      loadAllUsers();
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

  return {
    user,
    setUser,
    isLoading,
    authMode,
    setAuthMode,
    email,
    setEmail,
    password,
    setPassword,
    username,
    setUsername,
    error,
    setError,
    activeSection,
    setActiveSection,
    showNewChatDialog,
    setShowNewChatDialog,
    userSearch,
    setUserSearch,
    searchResults,
    setSearchResults,
    isSearching,
    showCreateStory,
    setShowCreateStory,
    isSidebarOpen,
    setIsSidebarOpen,
    showSwipeHint,
    setShowSwipeHint,
    showCreateChannel,
    setShowCreateChannel,
    showCreateGroup,
    setShowCreateGroup,
    showChannelInfo,
    setShowChannelInfo,
    showGroupInfo,
    setShowGroupInfo,
    channels,
    setChannels,
    groups,
    setGroups,
    contacts,
    allUsers,
    selectedUserProfile,
    setSelectedUserProfile,
    chatsHook,
    storiesHook,
    touchStartX,
    touchCurrentX,
  };
}
