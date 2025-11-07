import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import Icon from '@/components/ui/icon';

type NotificationsDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  messageNotifications: boolean;
  onMessageNotificationsChange: (value: boolean) => void;
};

export default function NotificationsDialog({ 
  open, 
  onOpenChange, 
  messageNotifications, 
  onMessageNotificationsChange 
}: NotificationsDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Icon name="Bell" size={20} />
            Настройки уведомлений
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="p-4 bg-muted rounded-xl space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Icon name="MessageSquare" size={20} />
                <div>
                  <div className="font-medium">Уведомления о сообщениях</div>
                  <div className="text-sm text-muted-foreground">Получать push-уведомления</div>
                </div>
              </div>
              <Switch
                checked={messageNotifications}
                onCheckedChange={onMessageNotificationsChange}
              />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
