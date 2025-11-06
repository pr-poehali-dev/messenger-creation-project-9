import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import HighlightText from '@/components/HighlightText';
import type { Chat } from '@/types';

type ChatListProps = {
  chats: Chat[];
  selectedChatId: number | null;
  onSelectChat: (chat: Chat) => void;
  searchQuery?: string;
};

export default function ChatList({ chats, selectedChatId, onSelectChat, searchQuery = '' }: ChatListProps) {
  if (chats.length === 0) {
    return (
      <ScrollArea className="flex-1 px-3">
        <div className="text-center py-12 text-muted-foreground">
          <Icon name="SearchX" size={48} className="mx-auto mb-3 opacity-50" />
          <p>Ничего не найдено</p>
          <p className="text-sm mt-2">Попробуйте изменить запрос</p>
        </div>
      </ScrollArea>
    );
  }

  return (
    <ScrollArea className="flex-1 px-3">
      <div className="space-y-1">
        {chats.map(chat => (
          <div
            key={chat.id}
            onClick={() => onSelectChat(chat)}
            className={`flex items-center gap-3 p-3 rounded-2xl cursor-pointer transition-all hover:bg-muted ${
              selectedChatId === chat.id ? 'bg-muted' : ''
            }`}
          >
            <div className="relative">
              <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center text-xl">
                {chat.avatar}
              </div>
              {chat.online && (
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-background" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <HighlightText text={chat.name} highlight={searchQuery} className="font-semibold truncate block" />
                <span className="text-xs text-muted-foreground flex-shrink-0 ml-2">
                  {chat.last_message_time ? new Date(chat.last_message_time).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }) : ''}
                </span>
              </div>
              <HighlightText text={chat.last_message || 'Начните общение'} highlight={searchQuery} className="text-sm text-muted-foreground truncate block" />
            </div>
            {chat.unread_count > 0 && (
              <Badge className="gradient-primary border-0 h-6 min-w-6 flex items-center justify-center">
                {chat.unread_count}
              </Badge>
            )}
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}