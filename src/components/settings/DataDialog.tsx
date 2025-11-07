import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

type DataDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function DataDialog({ open, onOpenChange }: DataDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Icon name="Database" size={20} />
            Управление данными
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-3">
            <Button 
              variant="outline" 
              className="w-full justify-start gap-3 h-auto p-4"
              onClick={() => {
                localStorage.clear();
                alert('Кэш очищен');
              }}
            >
              <Icon name="Trash2" size={20} />
              <div className="text-left flex-1">
                <div className="font-medium">Очистить кэш</div>
                <div className="text-sm text-muted-foreground font-normal">Удалить временные файлы</div>
              </div>
            </Button>

            <Button 
              variant="outline" 
              className="w-full justify-start gap-3 h-auto p-4"
            >
              <Icon name="Download" size={20} />
              <div className="text-left flex-1">
                <div className="font-medium">Экспорт данных</div>
                <div className="text-sm text-muted-foreground font-normal">Скачать все сообщения</div>
              </div>
            </Button>

            <Button 
              variant="destructive" 
              className="w-full justify-start gap-3 h-auto p-4"
            >
              <Icon name="AlertTriangle" size={20} />
              <div className="text-left flex-1">
                <div className="font-medium">Удалить аккаунт</div>
                <div className="text-sm text-white/70 font-normal">Безвозвратное удаление</div>
              </div>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
