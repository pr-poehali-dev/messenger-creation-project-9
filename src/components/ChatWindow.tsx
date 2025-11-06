import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';
import type { Chat, Message, User } from '@/types';

type ChatWindowProps = {
  selectedChat: Chat | null;
  messages: Message[];
  currentUser: User;
  messageText: string;
  onMessageTextChange: (value: string) => void;
  onSendMessage: () => void;
  showStickers: boolean;
  onToggleStickers: () => void;
  stickers: string[];
  reactions: string[];
  onStickerClick: (sticker: string) => void;
  onAddReaction: (messageId: number, reaction: string) => void;
};

export default function ChatWindow({
  selectedChat,
  messages,
  currentUser,
  messageText,
  onMessageTextChange,
  onSendMessage,
  showStickers,
  onToggleStickers,
  stickers,
  reactions,
  onStickerClick,
  onAddReaction
}: ChatWindowProps) {
  if (!selectedChat) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center space-y-4 max-w-md">
          <div className="w-32 h-32 mx-auto gradient-primary rounded-full flex items-center justify-center text-6xl">
            💬
          </div>
          <h2 className="text-3xl font-bold gradient-text">Добро пожаловать, {currentUser.username}!</h2>
          <p className="text-muted-foreground">
            Выберите чат слева или создайте новый
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="h-20 glass border-b border-border px-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center text-xl">
              {selectedChat.avatar}
            </div>
            {selectedChat.online && (
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-background" />
            )}
          </div>
          <div>
            <h2 className="font-bold text-lg">{selectedChat.name}</h2>
            <p className="text-sm text-muted-foreground">
              {selectedChat.online ? 'в сети' : 'был(а) недавно'}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button size="icon" variant="ghost" className="rounded-full">
            <Icon name="Phone" size={20} />
          </Button>
          <Button size="icon" variant="ghost" className="rounded-full">
            <Icon name="Video" size={20} />
          </Button>
          <Button size="icon" variant="ghost" className="rounded-full">
            <Icon name="MoreVertical" size={20} />
          </Button>
        </div>
      </div>

      <ScrollArea className="flex-1 p-6">
        <div className="space-y-4 max-w-4xl mx-auto">
          {messages.map(message => {
            const isSent = message.sender_id === currentUser.id;
            return (
              <div
                key={message.id}
                className={`flex items-end gap-2 group ${isSent ? 'flex-row-reverse' : 'flex-row'}`}
              >
                {!isSent && (
                  <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-sm flex-shrink-0">
                    {message.avatar}
                  </div>
                )}
                <div className="relative max-w-md">
                  <div
                    className={`px-4 py-3 rounded-2xl animate-scale-in ${
                      isSent
                        ? 'gradient-primary text-white rounded-br-md'
                        : 'glass rounded-bl-md'
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{message.text}</p>
                    <span
                      className={`text-xs mt-1 block ${
                        isSent ? 'text-white/70' : 'text-muted-foreground'
                      }`}
                    >
                      {new Date(message.created_at).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  {message.reaction && (
                    <div className="absolute -bottom-2 -right-2 bg-muted rounded-full px-2 py-1 text-sm border border-border">
                      {message.reaction}
                    </div>
                  )}
                  <div className="absolute -right-12 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="flex gap-1 bg-card border border-border rounded-full px-2 py-1">
                      {reactions.slice(0, 3).map(reaction => (
                        <button
                          key={reaction}
                          onClick={() => onAddReaction(message.id, reaction)}
                          className="hover:scale-125 transition-transform text-sm"
                        >
                          {reaction}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </ScrollArea>

      <div className="p-6 glass border-t border-border">
        {showStickers && (
          <div className="mb-4 p-4 bg-card rounded-2xl border border-border animate-scale-in">
            <div className="grid grid-cols-6 gap-2">
              {stickers.map(sticker => (
                <button
                  key={sticker}
                  onClick={() => onStickerClick(sticker)}
                  className="text-3xl p-2 hover:scale-125 transition-transform hover:bg-muted rounded-xl"
                >
                  {sticker}
                </button>
              ))}
            </div>
          </div>
        )}
        <div className="flex items-center gap-3">
          <Button
            size="icon"
            variant="ghost"
            className="rounded-full"
            onClick={onToggleStickers}
          >
            <Icon name="Smile" size={22} />
          </Button>
          <Button size="icon" variant="ghost" className="rounded-full">
            <Icon name="Paperclip" size={22} />
          </Button>
          <div className="flex-1 relative">
            <Input
              placeholder="Написать сообщение..."
              value={messageText}
              onChange={(e) => onMessageTextChange(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && onSendMessage()}
              className="rounded-full bg-muted border-0 pr-12"
            />
            <Button
              size="icon"
              variant="ghost"
              className="absolute right-1 top-1/2 -translate-y-1/2 rounded-full"
            >
              <Icon name="Mic" size={20} />
            </Button>
          </div>
          <Button
            size="icon"
            className="rounded-full gradient-primary border-0 hover:scale-110 transition-transform"
            onClick={onSendMessage}
          >
            <Icon name="Send" size={20} />
          </Button>
        </div>
      </div>
    </>
  );
}