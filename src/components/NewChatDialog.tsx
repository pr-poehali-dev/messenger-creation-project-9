import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import Icon from '@/components/ui/icon';
import type { ChatUser } from '@/types';

type NewChatDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userSearch: string;
  onUserSearchChange: (value: string) => void;
  searchResults: ChatUser[];
  isSearching: boolean;
  onSelectUser: (user: ChatUser) => void;
};

export default function NewChatDialog({
  open,
  onOpenChange,
  userSearch,
  onUserSearchChange,
  searchResults,
  isSearching,
  onSelectUser
}: NewChatDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md glass">
        <DialogHeader>
          <DialogTitle className="gradient-text">Новый чат</DialogTitle>
          <DialogDescription>
            Найдите пользователя и начните общение
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="relative">
            <Icon name="Search" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Поиск по имени или email..."
              value={userSearch}
              onChange={(e) => onUserSearchChange(e.target.value)}
              className="pl-10 bg-muted border-0"
            />
          </div>
          <ScrollArea className="h-[300px] pr-4">
            {isSearching ? (
              <div className="text-center py-8 text-muted-foreground">
                <p>Поиск...</p>
              </div>
            ) : searchResults.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <p>{userSearch ? 'Пользователи не найдены' : 'Введите имя для поиска'}</p>
              </div>
            ) : (
              <div className="space-y-2">
                {searchResults.map(foundUser => (
                  <div
                    key={foundUser.id}
                    onClick={() => onSelectUser(foundUser)}
                    className="flex items-center gap-3 p-3 rounded-2xl glass hover:bg-muted cursor-pointer transition-all"
                  >
                    <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center text-xl">
                      {foundUser.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold truncate">{foundUser.username}</h4>
                      <p className="text-sm text-muted-foreground truncate">{foundUser.email}</p>
                    </div>
                    <Icon name="MessageSquarePlus" size={20} className="text-primary" />
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