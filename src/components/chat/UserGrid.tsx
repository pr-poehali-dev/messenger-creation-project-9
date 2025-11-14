import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import type { Chat } from '@/types/chat';

interface UserGridProps {
  users: Chat[];
  onSelectUser: (user: Chat) => void;
}

export default function UserGrid({ users, onSelectUser }: UserGridProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 p-4">
      {users.map((user) => (
        <button
          key={user.id}
          onClick={() => onSelectUser(user)}
          className="group relative overflow-hidden rounded-2xl aspect-square transition-transform hover:scale-105 active:scale-95"
        >
          <Avatar className="w-full h-full rounded-2xl">
            <AvatarImage 
              src={user.avatar_url || undefined} 
              className="object-cover"
            />
            <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-2xl rounded-2xl">
              {user.username[0].toUpperCase()}
            </AvatarFallback>
          </Avatar>
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          
          <div className="absolute bottom-0 left-0 right-0 p-3">
            <p className="text-white font-semibold text-sm drop-shadow-lg truncate">
              {user.username}
            </p>
            {user.is_online && (
              <div className="flex items-center gap-1.5 mt-1">
                <div className="w-2 h-2 bg-green-400 rounded-full" />
                <span className="text-xs text-white/90">онлайн</span>
              </div>
            )}
          </div>

          {user.unread_count > 0 && (
            <div className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center shadow-lg">
              {user.unread_count > 9 ? '9+' : user.unread_count}
            </div>
          )}
        </button>
      ))}
    </div>
  );
}
