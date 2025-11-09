import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';
import type { Chat } from '@/types';

type ChatHeaderProps = {
  selectedChat: Chat;
  isTyping: boolean;
  messageSearchQuery: string;
  onMessageSearchChange: (value: string) => void;
  matchedIndices: number[];
  currentMatchIndex: number;
  onPrevMatch: () => void;
  onNextMatch: () => void;
  onStartCall: (type: 'video' | 'audio') => void;
};

export default function ChatHeader({
  selectedChat,
  isTyping,
  messageSearchQuery,
  onMessageSearchChange,
  matchedIndices,
  currentMatchIndex,
  onPrevMatch,
  onNextMatch,
  onStartCall
}: ChatHeaderProps) {
  return (
    <div className="h-16 md:h-20 glass border-b border-border px-4 md:px-6 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="relative">
          <div className="w-12 h-12 md:w-12 md:h-12 rounded-full bg-muted flex items-center justify-center text-xl">
            {selectedChat.avatar}
          </div>
          {selectedChat.online && (
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-background" />
          )}
        </div>
        <div>
          <h2 className="font-bold text-base md:text-lg">{selectedChat.name}</h2>
          <p className="text-xs md:text-sm text-muted-foreground">
            {isTyping ? (
              <span className="text-primary flex items-center gap-1">
                печатает
                <span className="flex gap-0.5">
                  <span className="w-1 h-1 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-1 h-1 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-1 h-1 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </span>
              </span>
            ) : (
              selectedChat.online ? 'в сети' : 'был(а) недавно'
            )}
          </p>
        </div>
      </div>
      <div className="hidden lg:flex flex-1 max-w-md mx-4">
        <div className="relative">
          <Icon name="Search" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Поиск в сообщениях..."
            value={messageSearchQuery}
            onChange={(e) => onMessageSearchChange(e.target.value)}
            className="pl-9 pr-32 rounded-full bg-muted border-0 h-9 text-sm"
          />
          {messageSearchQuery && matchedIndices.length > 0 && (
            <div className="absolute right-1 top-1/2 -translate-y-1/2 flex items-center gap-1 bg-card border border-border rounded-full px-2 py-1">
              <span className="text-xs text-muted-foreground px-1">
                {currentMatchIndex + 1} / {matchedIndices.length}
              </span>
              <Button
                size="icon"
                variant="ghost"
                className="rounded-full h-6 w-6"
                onClick={onPrevMatch}
              >
                <Icon name="ChevronUp" size={14} />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className="rounded-full h-6 w-6"
                onClick={onNextMatch}
              >
                <Icon name="ChevronDown" size={14} />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className="rounded-full h-6 w-6"
                onClick={() => onMessageSearchChange('')}
              >
                <Icon name="X" size={14} />
              </Button>
            </div>
          )}
          {messageSearchQuery && matchedIndices.length === 0 && (
            <Button
              size="icon"
              variant="ghost"
              className="absolute right-1 top-1/2 -translate-y-1/2 rounded-full h-7 w-7"
              onClick={() => onMessageSearchChange('')}
            >
              <Icon name="X" size={14} />
            </Button>
          )}
        </div>
      </div>
      <div className="flex gap-2">
        <Button size="icon" variant="ghost" className="rounded-full h-10 w-10" onClick={() => onStartCall('audio')}>
          <Icon name="Phone" size={20} />
        </Button>
        <Button size="icon" variant="ghost" className="rounded-full h-10 w-10" onClick={() => onStartCall('video')}>
          <Icon name="Video" size={20} />
        </Button>
        <Button size="icon" variant="ghost" className="rounded-full h-10 w-10">
          <Icon name="MoreVertical" size={20} />
        </Button>
      </div>
    </div>
  );
}
