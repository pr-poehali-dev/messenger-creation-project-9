import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';
import ChatList from '@/components/ChatList';
import ChatWindow from '@/components/ChatWindow';
import StoriesBar from '@/components/StoriesBar';
import type { Chat, Message, Section, Story } from '@/types';

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
      <div className="w-96 flex flex-col border-r border-border">
        {activeSection === 'chats' && stories.length > 0 && (
          <StoriesBar
            stories={stories}
            currentUserId={currentUserId}
            onStoryClick={onStoryClick}
            onCreateStory={onCreateStory}
          />
        )}

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
              <Button size="icon" variant="ghost" className="rounded-full" onClick={onNewChatClick}>
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
                className="pl-10 rounded-full bg-muted border-0"
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
          <div className="flex-1 px-6 py-4 space-y-3">
            {[
              { name: 'Алексей Петров', avatar: 'АП', online: true },
              { name: 'Мария Иванова', avatar: 'МИ', online: false },
              { name: 'Дмитрий Сидоров', avatar: 'ДС', online: true },
            ].map((contact, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-2xl glass hover:bg-muted/50 cursor-pointer transition-all">
                <div className="relative">
                  <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center text-white font-semibold">
                    {contact.avatar}
                  </div>
                  {contact.online && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-background" />
                  )}
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold">{contact.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    {contact.online ? 'в сети' : 'был(а) недавно'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeSection === 'groups' && (
          <div className="flex-1 px-6 py-4 space-y-3">
            {[
              { name: 'Команда проекта', avatar: 'КП', members: 12 },
              { name: 'Семья', avatar: 'СМ', members: 5 },
            ].map((group, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-2xl glass hover:bg-muted/50 cursor-pointer transition-all">
                <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center text-white font-semibold">
                  {group.avatar}
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold">{group.name}</h4>
                  <p className="text-sm text-muted-foreground">{group.members} участников</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeSection === 'channels' && (
          <div className="flex-1 px-6 py-4 space-y-3">
            {[
              { name: 'Новости технологий', avatar: 'НТ', subscribers: 1234 },
              { name: 'Музыка', avatar: 'МЗ', subscribers: 567 },
            ].map((channel, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-2xl glass hover:bg-muted/50 cursor-pointer transition-all">
                <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center text-white font-semibold">
                  {channel.avatar}
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold">{channel.name}</h4>
                  <p className="text-sm text-muted-foreground">{channel.subscribers} подписчиков</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex-1 flex flex-col">
        <ChatWindow
          selectedChat={selectedChat}
          messages={filteredMessages}
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
