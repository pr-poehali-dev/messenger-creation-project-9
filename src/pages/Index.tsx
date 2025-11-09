import AuthForm from '@/components/AuthForm';
import ProfileView from '@/components/ProfileView';
import SettingsView from '@/components/SettingsView';
import AppSidebar from '@/components/AppSidebar';
import ChatSection from '@/components/ChatSection';
import NewChatDialog from '@/components/NewChatDialog';
import StoryViewer from '@/components/StoryViewer';
import CreateStoryDialog from '@/components/CreateStoryDialog';
import CreateChannelDialog from '@/components/CreateChannelDialog';
import CreateGroupDialog from '@/components/CreateGroupDialog';
import ChannelInfoDialog from '@/components/ChannelInfoDialog';
import GroupInfoDialog from '@/components/GroupInfoDialog';
import UserProfileView from '@/components/UserProfileView';
import Icon from '@/components/ui/icon';
import { useAppState } from '@/hooks/useAppState';
import { useAppHandlers } from '@/hooks/useAppHandlers';
import { useTouchGestures } from '@/hooks/useTouchGestures';

export default function Index() {
  const state = useAppState();
  
  const handlers = useAppHandlers({
    chatsHook: state.chatsHook,
    storiesHook: state.storiesHook,
    setShowNewChatDialog: state.setShowNewChatDialog,
    setUserSearch: state.setUserSearch,
    setSearchResults: state.setSearchResults,
    setActiveSection: state.setActiveSection,
    setIsSidebarOpen: state.setIsSidebarOpen,
    setError: state.setError,
    setUser: state.setUser,
    setSelectedUserProfile: state.setSelectedUserProfile,
    setChannels: state.setChannels,
    setGroups: state.setGroups,
    setShowCreateChannel: state.setShowCreateChannel,
    setShowCreateGroup: state.setShowCreateGroup,
    authMode: state.authMode,
    email: state.email,
    password: state.password,
    username: state.username,
    activeSection: state.activeSection,
    user: state.user,
  });

  useTouchGestures({
    touchStartX: state.touchStartX,
    touchCurrentX: state.touchCurrentX,
    isSidebarOpen: state.isSidebarOpen,
    setIsSidebarOpen: state.setIsSidebarOpen,
  });

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

  if (state.isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <div className="text-center space-y-4">
          <div className="w-20 h-20 mx-auto gradient-primary rounded-full animate-pulse" />
          <p className="text-muted-foreground">Загрузка...</p>
        </div>
      </div>
    );
  }

  if (!state.user) {
    return (
      <AuthForm
        authMode={state.authMode}
        email={state.email}
        password={state.password}
        username={state.username}
        error={state.error}
        onEmailChange={state.setEmail}
        onPasswordChange={state.setPassword}
        onUsernameChange={state.setUsername}
        onSubmit={handlers.handleAuth}
        onToggleMode={() => {
          state.setAuthMode(state.authMode === 'login' ? 'register' : 'login');
          state.setError('');
        }}
      />
    );
  }

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <AppSidebar
        activeSection={state.activeSection}
        onSectionChange={(section) => {
          state.setActiveSection(section);
          state.setIsSidebarOpen(false);
        }}
        user={state.user}
        isMobileOpen={state.isSidebarOpen}
        onMobileClose={() => state.setIsSidebarOpen(false)}
      />

      {state.selectedUserProfile ? (
        <UserProfileView 
          user={state.selectedUserProfile}
          onBack={() => state.setSelectedUserProfile(null)}
          onSendMessage={handlers.handleSendMessageToUser}
        />
      ) : state.activeSection === 'profile' ? (
        <ProfileView 
          user={state.user} 
          onLogout={handlers.handleLogout} 
          onBack={() => state.setActiveSection('chats')}
        />
      ) : state.activeSection === 'settings' ? (
        <SettingsView
          onBack={() => state.setActiveSection('chats')}
          onShowSwipeHint={() => {
            localStorage.removeItem('hasSeenSwipeHint');
            state.setShowSwipeHint(true);
            setTimeout(() => {
              state.setShowSwipeHint(false);
            }, 3000);
          }}
        />
      ) : (
        <>
          <ChatSection
            activeSection={state.activeSection}
            chats={state.chatsHook.chats}
            selectedChat={state.chatsHook.selectedChat}
            onChatSelect={state.chatsHook.setSelectedChat}
            onMenuClick={() => state.setIsSidebarOpen(true)}
            currentUser={state.user}
            messages={state.chatsHook.messages}
            messageText={state.chatsHook.messageText}
            onMessageTextChange={state.chatsHook.setMessageText}
            onSendMessage={state.chatsHook.handleSendMessage}
            showStickers={state.chatsHook.showStickers}
            onToggleStickers={() => state.chatsHook.setShowStickers(!state.chatsHook.showStickers)}
            stickers={stickers}
            reactions={reactions}
            onStickerClick={state.chatsHook.handleStickerClick}
            onAddReaction={state.chatsHook.addReaction}
            chatSearchQuery={state.chatsHook.chatSearchQuery}
            onChatSearchChange={state.chatsHook.setChatSearchQuery}
            messageSearchQuery={state.chatsHook.messageSearchQuery}
            onMessageSearchChange={state.chatsHook.setMessageSearchQuery}
            onNewChatClick={handlers.handleNewChatClick}
            stories={state.storiesHook.stories}
            currentUserId={state.user.id}
            onStoryClick={state.storiesHook.handleStoryClick}
            onCreateStory={() => state.setShowCreateStory(true)}
            channels={state.channels}
            groups={state.groups}
            contacts={state.contacts}
            onContactClick={handlers.handleContactClick}
            allUsers={state.allUsers}
            onUserClick={handlers.handleUserClick}
          />
        </>
      )}

      <NewChatDialog
        open={state.showNewChatDialog}
        onOpenChange={state.setShowNewChatDialog}
        userSearch={state.userSearch}
        onUserSearchChange={state.setUserSearch}
        searchResults={state.searchResults}
        isSearching={state.isSearching}
        onSelectUser={handlers.handleCreateChat}
      />

      <CreateStoryDialog
        open={state.showCreateStory}
        onClose={() => state.setShowCreateStory(false)}
        onCreateStory={state.storiesHook.handleCreateStory}
      />

      <CreateChannelDialog
        open={state.showCreateChannel}
        onOpenChange={state.setShowCreateChannel}
        onCreateChannel={handlers.handleCreateChannel}
      />

      <CreateGroupDialog
        open={state.showCreateGroup}
        onOpenChange={state.setShowCreateGroup}
        contacts={state.contacts}
        onCreateGroup={handlers.handleCreateGroup}
      />

      {state.storiesHook.showStoryViewer && state.storiesHook.stories.filter(s => s.items.length > 0).length > 0 && (
        <StoryViewer
          stories={state.storiesHook.stories.filter(s => s.items.length > 0)}
          currentStoryIndex={state.storiesHook.currentStoryIndex}
          onClose={state.storiesHook.closeStoryViewer}
          onReply={handlers.handleReplyToStory}
        />
      )}

      {state.showChannelInfo && state.chatsHook.selectedChat && state.chatsHook.selectedChat.is_channel && (
        <ChannelInfoDialog
          channel={state.chatsHook.selectedChat}
          onClose={() => state.setShowChannelInfo(false)}
        />
      )}

      {state.showGroupInfo && state.chatsHook.selectedChat && state.chatsHook.selectedChat.is_group && !state.chatsHook.selectedChat.is_channel && (
        <GroupInfoDialog
          group={state.chatsHook.selectedChat}
          onClose={() => state.setShowGroupInfo(false)}
        />
      )}

      {state.showSwipeHint && (
        <div className="fixed top-4 left-4 bg-primary text-primary-foreground px-6 py-3 rounded-full shadow-lg z-50 animate-slide-in-left flex items-center gap-2">
          <Icon name="ChevronRight" size={20} />
          <span className="font-medium">Свайпните вправо для меню</span>
        </div>
      )}
    </div>
  );
}
