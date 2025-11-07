import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';

type Theme = 'light' | 'dark' | 'auto';

type ThemeDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  theme: Theme;
  onThemeChange: (theme: Theme) => void;
};

export default function ThemeDialog({ open, onOpenChange, theme, onThemeChange }: ThemeDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Icon name="Palette" size={20} />
            Темы оформления
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-3">
            {[
              { value: 'light' as Theme, label: 'Светлая тема', icon: 'Sun' },
              { value: 'dark' as Theme, label: 'Тёмная тема', icon: 'Moon' },
              { value: 'auto' as Theme, label: 'Как в системе', icon: 'Monitor' },
            ].map(({ value, label, icon }) => (
              <button
                key={value}
                onClick={() => onThemeChange(value)}
                className={`w-full p-4 rounded-xl flex items-center justify-between transition-colors ${
                  theme === value ? 'bg-primary/10 border-2 border-primary' : 'bg-muted border-2 border-transparent'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon name={icon} size={20} />
                  <span className="font-medium">{label}</span>
                </div>
                {theme === value && <Icon name="Check" size={20} className="text-primary" />}
              </button>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
