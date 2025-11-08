import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';
import ChatList from '@/components/ChatList';
import ChatWindow from '@/components/ChatWindow';
import StoriesBar from '@/components/StoriesBar';
import type { Chat, Message, Section, Story, ChatUser } from '@/types';

interface ChatSectionProps {
  activeSection: Section;
  chats: Chat[];
  selectedChat: Chat | null;
  onChatSelect: (chat: Chat) => void;
  messages: Message[];
  messageText: string;
  onMessageTextChange: (text: string) => void;
  onSendMessage: () => void;
  showStickers: boolean;
  onToggleStickers: () => void;
  stickers: string[];
  reactions: string[];
  onStickerClick: (sticker: string) => void;
  onAddReaction: (messageId: number, reaction: string) => void;
  chatSearchQuery: string;
  onChatSearchChange: (query: string) => void;
  messageSearchQuery: string;
  onMessageSearchChange: (query: string) => void;
  onNewChatClick: () => void;
  stories: Story[];
  currentUserId: number;
  onStoryClick: (story: Story) => void;
  onCreateStory: () => void;
  onMenuClick?: () => void;
  currentUser: { id: number; username: string; email: string; avatar: string };
  channels?: Chat[];
  groups?: Chat[];
  contacts?: ChatUser[];
  onContactClick?: (contact: ChatUser) => void;
}

export default function ChatSection({
  activeSection,
  chats,
  selectedChat,
  onChatSelect,
  messages,
  messageText,
  onMessageTextChange,
  onSendMessage,
  showStickers,
  onToggleStickers,
  stickers,
  reactions,
  onStickerClick,
  onAddReaction,
  chatSearchQuery,
  onChatSearchChange,
  messageSearchQuery,
  onMessageSearchChange,
  onNewChatClick,
  stories,
  currentUserId,
  onStoryClick,
  onCreateStory,
  onMenuClick,
  currentUser,
  channels = [],
  groups = [],
  contacts = [],
  onContactClick,
}: ChatSectionProps) {
  const filteredChats = chats.filter(chat => {
    if (!chatSearchQuery.trim()) return true;
    const query = chatSearchQuery.toLowerCase();
    return (
      chat.name.toLowerCase().includes(query) ||
      (chat.last_message && chat.last_message.toLowerCase().includes(query))
    );
  });

  const filteredMessages = messages.filter(message => {
    if (!messageSearchQuery.trim()) return true;
    const query = messageSearchQuery.toLowerCase();
    return message.text.toLowerCase().includes(query);
  });

  return (
    <>
      <div className="w-full md:w-96 flex flex-col border-r border-border">
        {activeSection === 'chats' && stories.length > 0 && (
          <StoriesBar
            stories={stories}
            currentUserId={currentUserId}
            onStoryClick={onStoryClick}
            onCreateStory={onCreateStory}
          />
        )}

        <div className="p-4 md:p-6 space-y-4">
          <div className="flex items-center justify-between">
            <Button 
              size="icon" 
              variant="ghost" 
              className="md:hidden rounded-full h-10 w-10 mr-2" 
              onClick={onMenuClick}
            >
              <Icon name="Menu" size={24} />
            </Button>
            <h1 className="text-2xl md:text-3xl font-bold gradient-text flex-1">
              {activeSection === 'chats' && 'Чаты'}
              {activeSection === 'contacts' && 'Контакты'}
              {activeSection === 'groups' && 'Группы'}
              {activeSection === 'channels' && 'Каналы'}
              {activeSection === 'settings' && 'Настройки'}
            </h1>
            <div className="flex gap-2">
              <Button size="icon" variant="ghost" className="rounded-full h-10 w-10 md:h-9 md:w-9" onClick={onNewChatClick}>
                <Icon name="Plus" size={20} />
              </Button>
            </div>
          </div>

          {activeSection === 'chats' && (
            <div className="relative">
              <Icon name="Search" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Поиск по чатам..."
                value={chatSearchQuery}
                onChange={(e) => onChatSearchChange(e.target.value)}
                className="pl-10 rounded-full bg-muted border-0 h-11 md:h-10 text-base md:text-sm"
              />
              {chatSearchQuery && (
                <Button
                  size="icon"
                  variant="ghost"
                  className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full"
                  onClick={() => onChatSearchChange('')}
                >
                  <Icon name="X" size={14} />
                </Button>
              )}
            </div>
          )}
        </div>

        {activeSection === 'chats' && (
          <ChatList
            chats={filteredChats}
            selectedChat={selectedChat}
            onChatSelect={onChatSelect}
          />
        )}

        {activeSection === 'contacts' && (
          <div className="flex-1 px-4 md:px-6 py-4 space-y-3">
            {contacts.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <Icon name="Users" size={48} className="mx-auto mb-3 opacity-50" />
                <p>У вас пока нет контактов</p>
                <p className="text-sm mt-2">Начните новый чат чтобы добавить контакт</p>
              </div>
            ) : (
              contacts.map((contact) => (
                <div 
                  key={contact.id} 
                  className="flex items-center gap-3 p-3 rounded-2xl glass hover:bg-muted/50 cursor-pointer transition-all"
                  onClick={() => onContactClick?.(contact)}
                >
                  <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center text-white font-semibold">
                    {contact.avatar}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold">{contact.username}</h4>
                    <p className="text-sm text-muted-foreground">{contact.email}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {activeSection === 'groups' && (
          <div className="flex-1 px-4 md:px-6 py-4 space-y-3">
            {groups.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <Icon name="Users" size={48} className="mx-auto mb-3 opacity-50" />
                <p>У вас пока нет групп</p>
                <p className="text-sm mt-2">Нажмите + чтобы создать</p>
              </div>
            ) : (
              groups.map((group) => (
                <div key={group.id} className="flex items-center gap-3 p-3 rounded-2xl glass hover:bg-muted/50 cursor-pointer transition-all" onClick={() => onChatSelect(group)}>
                  <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center text-white font-semibold">
                    {group.avatar || group.name.slice(0, 2).toUpperCase()}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold">{group.name}</h4>
                    <p className="text-sm text-muted-foreground">{group.members_count} участников</p>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {activeSection === 'channels' && (
          <div className="flex-1 px-4 md:px-6 py-4 space-y-3">
            {channels.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <Icon name="Radio" size={48} className="mx-auto mb-3 opacity-50" />
                <p>У вас пока нет каналов</p>
                <p className="text-sm mt-2">Нажмите + чтобы создать</p>
              </div>
            ) : (
              channels.map((channel) => (
                <div key={channel.id} className="flex items-center gap-3 p-3 rounded-2xl glass hover:bg-muted/50 cursor-pointer transition-all" onClick={() => onChatSelect(channel)}>
                  <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center text-white font-semibold">
                    {channel.avatar || channel.name.slice(0, 2).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold truncate">{channel.name}</h4>
                      {channel.is_public && <Icon name="Globe" size={14} className="text-primary flex-shrink-0" />}
                    </div>
                    <p className="text-sm text-muted-foreground">{channel.members_count} подписчиков</p>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      <div className="flex-1 flex flex-col">
        <ChatWindow
          selectedChat={selectedChat}
          messages={filteredMessages}
          currentUser={currentUser}
          messageText={messageText}
          onMessageTextChange={onMessageTextChange}
          onSendMessage={onSendMessage}
          showStickers={showStickers}
          onToggleStickers={onToggleStickers}
          stickers={stickers}
          reactions={reactions}
          onStickerClick={onStickerClick}
          onAddReaction={onAddReaction}
          messageSearchQuery={messageSearchQuery}
          onMessageSearchChange={onMessageSearchChange}
        />
      </div>
    </>
  );
}