import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';

type Language = 'ru' | 'en';

type LanguageDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  language: Language;
  onLanguageChange: (language: Language) => void;
};

export default function LanguageDialog({ open, onOpenChange, language, onLanguageChange }: LanguageDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Icon name="Languages" size={20} />
            Выбор языка
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-3">
            {[
              { value: 'ru' as Language, label: 'Русский', flag: '🇷🇺' },
              { value: 'en' as Language, label: 'English', flag: '🇬🇧' },
            ].map(({ value, label, flag }) => (
              <button
                key={value}
                onClick={() => onLanguageChange(value)}
                className={`w-full p-4 rounded-xl flex items-center justify-between transition-colors ${
                  language === value ? 'bg-primary/10 border-2 border-primary' : 'bg-muted border-2 border-transparent'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{flag}</span>
                  <span className="font-medium">{label}</span>
                </div>
                {language === value && <Icon name="Check" size={20} className="text-primary" />}
              </button>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
