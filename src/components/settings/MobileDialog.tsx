import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import Icon from '@/components/ui/icon';

type MobileDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  hapticFeedback: boolean;
  onHapticFeedbackChange: (value: boolean) => void;
  autoPlayVideos: boolean;
  onAutoPlayVideosChange: (value: boolean) => void;
  reducedMotion: boolean;
  onReducedMotionChange: (value: boolean) => void;
  onShowSwipeHint?: () => void;
  onBack: () => void;
};

export default function MobileDialog({ 
  open, 
  onOpenChange,
  hapticFeedback,
  onHapticFeedbackChange,
  autoPlayVideos,
  onAutoPlayVideosChange,
  reducedMotion,
  onReducedMotionChange,
  onShowSwipeHint,
  onBack
}: MobileDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Icon name="Smartphone" size={20} />
            Настройки мобильной версии
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="p-4 bg-muted rounded-xl space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Icon name="Vibrate" size={20} />
                <div>
                  <div className="font-medium">Тактильный отклик</div>
                  <div className="text-sm text-muted-foreground">Вибрация при нажатиях</div>
                </div>
              </div>
              <Switch
                checked={hapticFeedback}
                onCheckedChange={(checked) => {
                  onHapticFeedbackChange(checked);
                  localStorage.setItem('hapticFeedback', String(checked));
                  if (checked && navigator.vibrate) {
                    navigator.vibrate(10);
                  }
                }}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Icon name="Play" size={20} />
                <div>
                  <div className="font-medium">Автовоспроизведение</div>
                  <div className="text-sm text-muted-foreground">Видео и GIF в чатах</div>
                </div>
              </div>
              <Switch
                checked={autoPlayVideos}
                onCheckedChange={(checked) => {
                  onAutoPlayVideosChange(checked);
                  localStorage.setItem('autoPlayVideos', String(checked));
                }}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Icon name="Zap" size={20} />
                <div>
                  <div className="font-medium">Уменьшить анимации</div>
                  <div className="text-sm text-muted-foreground">Для экономии батареи</div>
                </div>
              </div>
              <Switch
                checked={reducedMotion}
                onCheckedChange={(checked) => {
                  onReducedMotionChange(checked);
                  localStorage.setItem('reducedMotion', String(checked));
                  if (checked) {
                    document.documentElement.style.setProperty('--animation-duration', '0.01s');
                  } else {
                    document.documentElement.style.removeProperty('--animation-duration');
                  }
                }}
              />
            </div>
          </div>

          {onShowSwipeHint && (
            <button
              onClick={() => {
                onOpenChange(false);
                onShowSwipeHint();
                onBack();
              }}
              className="w-full p-4 bg-primary/10 hover:bg-primary/20 rounded-xl flex items-center justify-between transition-colors active:scale-95"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                  <Icon name="Hand" size={20} className="text-white" />
                </div>
                <div className="text-left">
                  <div className="font-medium">Показать подсказку</div>
                  <div className="text-sm text-muted-foreground">Как открыть меню свайпом</div>
                </div>
              </div>
              <Icon name="ChevronsRight" size={20} className="text-primary" />
            </button>
          )}

          <div className="text-xs text-muted-foreground text-center pt-2">
            Эти настройки доступны только на мобильных устройствах
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
