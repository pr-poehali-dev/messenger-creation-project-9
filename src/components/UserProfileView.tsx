import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import Icon from '@/components/ui/icon';
import type { ChatUser } from '@/types';

type UserProfileViewProps = {
  user: ChatUser;
  onBack: () => void;
  onSendMessage: (user: ChatUser) => void;
};

export default function UserProfileView({ user, onBack, onSendMessage }: UserProfileViewProps) {
  return (
    <div className="flex-1 flex flex-col bg-background">
      <div className="h-16 md:h-20 glass border-b border-border px-4 md:px-6 flex items-center gap-3">
        <Button
          size="icon"
          variant="ghost"
          onClick={onBack}
          className="rounded-full h-10 w-10"
        >
          <Icon name="ArrowLeft" size={20} />
        </Button>
        <h1 className="text-lg md:text-xl font-bold">Профиль</h1>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-md space-y-6">
          <div className="flex flex-col items-center gap-4">
            <Avatar className="h-32 w-32">
              <AvatarFallback className="gradient-primary text-white font-semibold text-5xl">
                {user.avatar}
              </AvatarFallback>
            </Avatar>
            
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold">{user.username}</h2>
              <p className="text-muted-foreground">{user.email}</p>
            </div>
          </div>

          <div className="space-y-3">
            <Button 
              className="w-full gradient-primary"
              onClick={() => onSendMessage(user)}
            >
              <Icon name="MessageCircle" size={20} className="mr-2" />
              Написать сообщение
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
