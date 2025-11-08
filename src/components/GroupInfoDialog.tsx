import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Icon from '@/components/ui/icon';
import type { Chat, ChatUser } from '@/types';

type GroupInfoDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  group: Chat;
  members: ChatUser[];
  isAdmin: boolean;
  currentUserId: number;
  onLeaveGroup: () => void;
  onDeleteGroup?: () => void;
  onRemoveMember?: (userId: number) => void;
  onAddMembers?: () => void;
  onCopyInviteLink: () => void;
};

export default function GroupInfoDialog({
  open,
  onOpenChange,
  group,
  members,
  isAdmin,
  currentUserId,
  onLeaveGroup,
  onDeleteGroup,
  onRemoveMember,
  onAddMembers,
  onCopyInviteLink
}: GroupInfoDialogProps) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Icon name="Info" size={20} />
            Информация о группе
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto space-y-4">
          <div className="flex flex-col items-center gap-3 p-6 bg-muted rounded-xl">
            <Avatar className="w-24 h-24">
              <AvatarImage src={group.avatar} />
              <AvatarFallback className="gradient-primary text-white text-2xl">
                {group.name.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="text-center">
              <h3 className="font-bold text-xl">{group.name}</h3>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                <Icon name="Users" size={14} />
                <span>{members.length} участников</span>
              </div>
            </div>
          </div>

          {group.description && (
            <div className="p-4 bg-muted rounded-xl">
              <div className="flex items-center gap-2 mb-2">
                <Icon name="FileText" size={16} className="text-primary" />
                <span className="font-medium text-sm">Описание</span>
              </div>
              <p className="text-sm text-muted-foreground">{group.description}</p>
            </div>
          )}

          {isAdmin && (
            <div className="flex items-center gap-3 p-3 bg-muted rounded-xl">
              <Icon name="Shield" size={20} className="text-primary" />
              <div className="flex-1">
                <div className="font-medium">Вы администратор</div>
                <div className="text-sm text-muted-foreground">Управление группой</div>
              </div>
            </div>
          )}

          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-semibold flex items-center gap-2">
                <Icon name="Users" size={18} />
                Участники ({members.length})
              </h4>
              {isAdmin && onAddMembers && (
                <Button size="sm" variant="outline" onClick={onAddMembers}>
                  <Icon name="UserPlus" size={16} className="mr-1" />
                  Добавить
                </Button>
              )}
            </div>
            <div className="space-y-2">
              {members.map((member) => (
                <div
                  key={member.id}
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted transition-colors"
                >
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={member.avatar} />
                    <AvatarFallback className="gradient-primary text-white">
                      {member.username.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium truncate">{member.username}</div>
                    <div className="text-sm text-muted-foreground truncate">{member.email}</div>
                  </div>
                  {member.id === group.creator_id && (
                    <div className="px-2 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                      Создатель
                    </div>
                  )}
                  {isAdmin && member.id !== currentUserId && member.id !== group.creator_id && onRemoveMember && (
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                      onClick={() => onRemoveMember(member.id)}
                    >
                      <Icon name="UserMinus" size={16} />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2 pb-4">
            <Button
              variant="outline"
              className="w-full justify-start gap-3"
              onClick={onCopyInviteLink}
            >
              <Icon name="Link" size={20} />
              <div className="text-left flex-1">
                <div className="font-medium">Пригласить участников</div>
                <div className="text-xs text-muted-foreground">Скопировать ссылку</div>
              </div>
            </Button>

            {!showDeleteConfirm ? (
              <Button
                variant="destructive"
                className="w-full justify-start gap-3"
                onClick={() => {
                  if (isAdmin) {
                    setShowDeleteConfirm(true);
                  } else {
                    onLeaveGroup();
                  }
                }}
              >
                <Icon name={isAdmin ? 'Trash2' : 'LogOut'} size={20} />
                <div className="text-left flex-1">
                  <div className="font-medium">{isAdmin ? 'Удалить группу' : 'Покинуть группу'}</div>
                  <div className="text-xs text-white/70">
                    {isAdmin ? 'Безвозвратное удаление' : 'Выйти из группы'}
                  </div>
                </div>
              </Button>
            ) : (
              <div className="p-4 bg-destructive/10 border border-destructive rounded-xl space-y-3">
                <div className="flex items-center gap-2 text-destructive">
                  <Icon name="AlertTriangle" size={20} />
                  <span className="font-semibold">Подтвердите удаление</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Группа будет удалена навсегда. Все сообщения будут потеряны. Это действие нельзя отменить.
                </p>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => setShowDeleteConfirm(false)}
                  >
                    Отмена
                  </Button>
                  <Button
                    variant="destructive"
                    className="flex-1"
                    onClick={() => {
                      onDeleteGroup?.();
                      onOpenChange(false);
                    }}
                  >
                    Удалить
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
