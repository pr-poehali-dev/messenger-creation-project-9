import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Icon from '@/components/ui/icon';
import type { Chat } from '@/types';

type ChannelInfoDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  channel: Chat;
  isAdmin: boolean;
  onLeaveChannel: () => void;
  onDeleteChannel?: () => void;
  onCopyInviteLink: () => void;
};

export default function ChannelInfoDialog({
  open,
  onOpenChange,
  channel,
  isAdmin,
  onLeaveChannel,
  onDeleteChannel,
  onCopyInviteLink
}: ChannelInfoDialogProps) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Icon name="Info" size={20} />
            Информация о канале
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex flex-col items-center gap-3 p-6 bg-muted rounded-xl">
            <Avatar className="w-24 h-24">
              <AvatarImage src={channel.avatar} />
              <AvatarFallback className="gradient-primary text-white text-2xl">
                {channel.name.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="text-center">
              <h3 className="font-bold text-xl">{channel.name}</h3>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                <Icon name="Users" size={14} />
                <span>{channel.members_count || 0} подписчиков</span>
              </div>
            </div>
          </div>

          {channel.description && (
            <div className="p-4 bg-muted rounded-xl">
              <div className="flex items-center gap-2 mb-2">
                <Icon name="FileText" size={16} className="text-primary" />
                <span className="font-medium text-sm">Описание</span>
              </div>
              <p className="text-sm text-muted-foreground">{channel.description}</p>
            </div>
          )}

          <div className="space-y-2">
            <div className="flex items-center gap-3 p-3 bg-muted rounded-xl">
              <Icon name={channel.is_public ? 'Globe' : 'Lock'} size={20} className="text-primary" />
              <div className="flex-1">
                <div className="font-medium">{channel.is_public ? 'Публичный' : 'Приватный'} канал</div>
                <div className="text-sm text-muted-foreground">
                  {channel.is_public ? 'Виден в поиске' : 'Только по приглашению'}
                </div>
              </div>
            </div>

            {isAdmin && (
              <div className="flex items-center gap-3 p-3 bg-muted rounded-xl">
                <Icon name="Shield" size={20} className="text-primary" />
                <div className="flex-1">
                  <div className="font-medium">Вы администратор</div>
                  <div className="text-sm text-muted-foreground">Управление каналом</div>
                </div>
              </div>
            )}
          </div>

          <div className="space-y-2">
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
                    onLeaveChannel();
                  }
                }}
              >
                <Icon name={isAdmin ? 'Trash2' : 'LogOut'} size={20} />
                <div className="text-left flex-1">
                  <div className="font-medium">{isAdmin ? 'Удалить канал' : 'Покинуть канал'}</div>
                  <div className="text-xs text-white/70">
                    {isAdmin ? 'Безвозвратное удаление' : 'Отписаться от канала'}
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
                  Канал будет удалён навсегда. Все сообщения будут потеряны. Это действие нельзя отменить.
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
                      onDeleteChannel?.();
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
