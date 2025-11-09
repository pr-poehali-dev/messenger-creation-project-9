import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import type { ChatUser } from '@/types';

type UsersViewProps = {
  users: ChatUser[];
  onUserClick: (user: ChatUser) => void;
};

export default function UsersView({ users, onUserClick }: UsersViewProps) {
  return (
    <ScrollArea className="flex-1">
      <div className="p-4 md:p-6 space-y-2">
        {users.map((user) => (
          <div
            key={user.id}
            onClick={() => onUserClick(user)}
            className="flex items-center gap-3 p-3 hover:bg-muted rounded-xl cursor-pointer transition-colors active:scale-95"
          >
            <Avatar className="h-12 w-12">
              <AvatarFallback className="gradient-primary text-white font-semibold">
                {user.avatar}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-sm md:text-base truncate">
                {user.username}
              </h3>
              <p className="text-xs md:text-sm text-muted-foreground truncate">
                {user.email}
              </p>
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}
