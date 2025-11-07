import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';

type PrivacyOption = 'all' | 'contacts' | 'nobody';

type PrivacyDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  showOnlineStatus: boolean;
  onShowOnlineStatusChange: (value: boolean) => void;
  whoCanWriteMe: PrivacyOption;
  onWhoCanWriteMeChange: (value: PrivacyOption) => void;
};

export default function PrivacyDialog({ 
  open, 
  onOpenChange, 
  showOnlineStatus, 
  onShowOnlineStatusChange,
  whoCanWriteMe,
  onWhoCanWriteMeChange
}: PrivacyDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Icon name="Lock" size={20} />
            Настройки приватности
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="p-4 bg-muted rounded-xl space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Icon name="Eye" size={20} />
                <div>
                  <div className="font-medium">Показывать статус онлайн</div>
                  <div className="text-sm text-muted-foreground">Другие видят когда вы в сети</div>
                </div>
              </div>
              <Switch
                checked={showOnlineStatus}
                onCheckedChange={onShowOnlineStatusChange}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Кто может писать мне</Label>
            <Select value={whoCanWriteMe} onValueChange={(value) => onWhoCanWriteMeChange(value as PrivacyOption)}>
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">
                  <div className="flex items-center gap-2">
                    <Icon name="Users" size={16} />
                    Все пользователи
                  </div>
                </SelectItem>
                <SelectItem value="contacts">
                  <div className="flex items-center gap-2">
                    <Icon name="UserCheck" size={16} />
                    Только контакты
                  </div>
                </SelectItem>
                <SelectItem value="nobody">
                  <div className="flex items-center gap-2">
                    <Icon name="UserX" size={16} />
                    Никто
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
