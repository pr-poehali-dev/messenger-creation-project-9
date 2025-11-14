import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Icon from '@/components/ui/icon';
import type { Chat } from '@/types/chat';

interface ChatHeaderProps {
  chat: Chat;
  isTyping: boolean;
  onBack?: () => void;
}

export default function ChatHeader({ chat, isTyping, onBack }: ChatHeaderProps) {
  const getChatName = () => {
    return chat.username || 'Пользователь';
  };

  const getChatAvatar = () => {
    return chat.avatar_url;
  };

  const getOnlineStatus = () => {
    return chat.status === 'online' ? 'Онлайн' : 'Не в сети';
  };

  return (
    <div className="h-14 md:h-16 border-b px-3 md:px-6 flex items-center justify-between bg-background shrink-0">
      {onBack && (
        <Button variant="ghost" size="icon" onClick={onBack} className="md:hidden mr-2">
          <Icon name="ArrowLeft" size={20} />
        </Button>
      )}
      <div className="flex items-center gap-2 md:gap-3 flex-1 min-w-0">
        <Avatar className="h-9 w-9 md:h-10 md:w-10 shrink-0">
          <AvatarImage src={getChatAvatar() || undefined} />
          <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
            {getChatName()[0]?.toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="min-w-0 flex-1">
          <p className="font-semibold text-sm md:text-base truncate">{getChatName()}</p>
          {isTyping ? (
            <p className="text-xs text-blue-500">печатает...</p>
          ) : getOnlineStatus() ? (
            <p className="text-xs text-muted-foreground">{getOnlineStatus()}</p>
          ) : null}
        </div>
      </div>
      <div className="flex gap-1 md:gap-2 shrink-0">
        <Button variant="ghost" size="icon" className="hidden md:flex">
          <Icon name="Phone" size={20} />
        </Button>
        <Button variant="ghost" size="icon" className="hidden md:flex">
          <Icon name="Video" size={20} />
        </Button>
        <Button variant="ghost" size="icon" className="h-9 w-9 md:h-10 md:w-10">
          <Icon name="MoreVertical" size={18} />
        </Button>
      </div>
    </div>
  );
}
