import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { getUsers } from '@/lib/api';
import type { Chat } from '@/types/chat';

interface ForwardDialogProps {
  open: boolean;
  onClose: () => void;
  onSelectUser: (user: Chat) => void;
}

export default function ForwardDialog({ open, onClose, onSelectUser }: ForwardDialogProps) {
  const [search, setSearch] = useState('');
  const [users, setUsers] = useState<Chat[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open) {
      loadUsers();
    }
  }, [open]);

  const loadUsers = async () => {
    setLoading(true);
    try {
      const allUsers = await getUsers();
      setUsers(allUsers);
    } catch (error) {
      console.error('Failed to load users:', error);
    }
    setLoading(false);
  };

  const filteredUsers = users.filter(user => 
    user.username?.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelectUser = (user: Chat) => {
    onSelectUser(user);
    onClose();
    setSearch('');
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md w-[95vw] max-h-[85vh]">
        <DialogHeader>
          <DialogTitle>Переслать сообщение</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="relative">
            <Icon name="Search" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Поиск пользователей..."
              className="pl-10"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <ScrollArea className="h-[400px]">
            {loading ? (
              <div className="flex items-center justify-center h-full">
                <Icon name="Loader2" size={32} className="animate-spin text-muted-foreground" />
              </div>
            ) : filteredUsers.length === 0 ? (
              <div className="flex items-center justify-center h-full">
                <div className="text-center space-y-2">
                  <div className="w-16 h-16 mx-auto rounded-full bg-muted flex items-center justify-center mb-4">
                    <Icon name="Users" size={24} className="text-muted-foreground" />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {search ? 'Пользователи не найдены' : 'Нет пользователей'}
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-1">
                {filteredUsers.map((user) => (
                  <div
                    key={user.id}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted cursor-pointer transition-colors"
                    onClick={() => handleSelectUser(user)}
                  >
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={user.avatar_url || undefined} />
                      <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                        {user.username[0]?.toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm truncate">{user.username}</p>
                      <p className="text-xs text-muted-foreground">
                        {user.status === 'online' ? 'Онлайн' : 'Не в сети'}
                      </p>
                    </div>
                    <Button size="sm" variant="ghost">
                      <Icon name="Send" size={16} />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  );
}
