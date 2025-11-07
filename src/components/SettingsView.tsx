import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type SettingsViewProps = {
  onBack: () => void;
  onShowSwipeHint?: () => void;
};

type Theme = 'light' | 'dark' | 'auto';
type Language = 'ru' | 'en';
type PrivacyOption = 'all' | 'contacts' | 'nobody';

export default function SettingsView({ onBack, onShowSwipeHint }: SettingsViewProps) {
  const [theme, setTheme] = useState<Theme>('dark');
  const [language, setLanguage] = useState<Language>('ru');
  const [showOnlineStatus, setShowOnlineStatus] = useState(true);
  const [messageNotifications, setMessageNotifications] = useState(true);
  const [whoCanWriteMe, setWhoCanWriteMe] = useState<PrivacyOption>('all');
  const [hapticFeedback, setHapticFeedback] = useState(
    localStorage.getItem('hapticFeedback') !== 'false'
  );
  const [autoPlayVideos, setAutoPlayVideos] = useState(
    localStorage.getItem('autoPlayVideos') !== 'false'
  );
  const [reducedMotion, setReducedMotion] = useState(
    localStorage.getItem('reducedMotion') === 'true'
  );
  
  const [showThemeDialog, setShowThemeDialog] = useState(false);
  const [showNotificationsDialog, setShowNotificationsDialog] = useState(false);
  const [showPrivacyDialog, setShowPrivacyDialog] = useState(false);
  const [showDataDialog, setShowDataDialog] = useState(false);
  const [showLanguageDialog, setShowLanguageDialog] = useState(false);
  const [showMobileDialog, setShowMobileDialog] = useState(false);

  return (
    <div className="flex-1 flex flex-col bg-background">
      <div className="h-16 md:h-20 glass border-b border-border px-4 md:px-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button size="icon" variant="ghost" className="rounded-full h-12 w-12 md:h-10 md:w-10" onClick={onBack}>
            <Icon name="ArrowLeft" size={20} />
          </Button>
          <h2 className="font-bold text-lg md:text-xl">Настройки</h2>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 md:p-6">
        <div className="max-w-2xl mx-auto space-y-4">
          <button
            onClick={() => setShowThemeDialog(true)}
            className="w-full glass rounded-3xl p-4 md:p-6 flex items-center justify-between hover:bg-muted/50 transition-colors active:scale-95"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center">
                <Icon name="Palette" size={24} className="text-white" />
              </div>
              <div className="text-left">
                <div className="font-semibold text-lg">Темы оформления</div>
                <div className="text-sm text-muted-foreground">Измените внешний вид</div>
              </div>
            </div>
            <Icon name="ChevronRight" size={20} className="text-muted-foreground" />
          </button>

          <button
            onClick={() => setShowNotificationsDialog(true)}
            className="w-full glass rounded-3xl p-4 md:p-6 flex items-center justify-between hover:bg-muted/50 transition-colors active:scale-95"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center">
                <Icon name="Bell" size={24} className="text-white" />
              </div>
              <div className="text-left">
                <div className="font-semibold text-lg">Уведомления</div>
                <div className="text-sm text-muted-foreground">Настройте оповещения</div>
              </div>
            </div>
            <Icon name="ChevronRight" size={20} className="text-muted-foreground" />
          </button>

          <button
            onClick={() => setShowPrivacyDialog(true)}
            className="w-full glass rounded-3xl p-4 md:p-6 flex items-center justify-between hover:bg-muted/50 transition-colors active:scale-95"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center">
                <Icon name="Lock" size={24} className="text-white" />
              </div>
              <div className="text-left">
                <div className="font-semibold text-lg">Приватность</div>
                <div className="text-sm text-muted-foreground">Управление безопасностью</div>
              </div>
            </div>
            <Icon name="ChevronRight" size={20} className="text-muted-foreground" />
          </button>

          <button
            onClick={() => setShowDataDialog(true)}
            className="w-full glass rounded-3xl p-4 md:p-6 flex items-center justify-between hover:bg-muted/50 transition-colors active:scale-95"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center">
                <Icon name="Database" size={24} className="text-white" />
              </div>
              <div className="text-left">
                <div className="font-semibold text-lg">Данные</div>
                <div className="text-sm text-muted-foreground">Хранилище и кэш</div>
              </div>
            </div>
            <Icon name="ChevronRight" size={20} className="text-muted-foreground" />
          </button>

          <button
            onClick={() => setShowLanguageDialog(true)}
            className="w-full glass rounded-3xl p-4 md:p-6 flex items-center justify-between hover:bg-muted/50 transition-colors active:scale-95"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center">
                <Icon name="Languages" size={24} className="text-white" />
              </div>
              <div className="text-left">
                <div className="font-semibold text-lg">Язык</div>
                <div className="text-sm text-muted-foreground">
                  {language === 'ru' ? 'Русский' : 'English'}
                </div>
              </div>
            </div>
            <Icon name="ChevronRight" size={20} className="text-muted-foreground" />
          </button>

          <button
            onClick={() => setShowMobileDialog(true)}
            className="w-full glass rounded-3xl p-4 md:p-6 flex items-center justify-between hover:bg-muted/50 transition-colors active:scale-95 md:hidden"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center">
                <Icon name="Smartphone" size={24} className="text-white" />
              </div>
              <div className="text-left">
                <div className="font-semibold text-lg">Мобильная версия</div>
                <div className="text-sm text-muted-foreground">Настройки для смартфона</div>
              </div>
            </div>
            <Icon name="ChevronRight" size={20} className="text-muted-foreground" />
          </button>
        </div>
      </div>

      <Dialog open={showThemeDialog} onOpenChange={setShowThemeDialog}>
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
                  onClick={() => setTheme(value)}
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

      <Dialog open={showNotificationsDialog} onOpenChange={setShowNotificationsDialog}>
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
                  onCheckedChange={setMessageNotifications}
                />
              </div>
            </div>

            <div className="p-4 bg-muted rounded-xl space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Icon name="Volume2" size={20} />
                  <div>
                    <div className="font-medium">Звук уведомлений</div>
                    <div className="text-sm text-muted-foreground">Воспроизводить звуки</div>
                  </div>
                </div>
                <Switch defaultChecked={true} />
              </div>
            </div>

            <div className="p-4 bg-muted rounded-xl space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Icon name="Eye" size={20} />
                  <div>
                    <div className="font-medium">Превью сообщений</div>
                    <div className="text-sm text-muted-foreground">Показывать текст в уведомлении</div>
                  </div>
                </div>
                <Switch defaultChecked={true} />
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showPrivacyDialog} onOpenChange={setShowPrivacyDialog}>
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
                  onCheckedChange={setShowOnlineStatus}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Кто может писать мне</Label>
              <Select value={whoCanWriteMe} onValueChange={(value) => setWhoCanWriteMe(value as PrivacyOption)}>
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

            <div className="p-4 bg-muted rounded-xl space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Icon name="Shield" size={20} />
                  <div>
                    <div className="font-medium">Двухфакторная аутентификация</div>
                    <div className="text-sm text-muted-foreground">Дополнительная защита</div>
                  </div>
                </div>
                <Switch defaultChecked={false} />
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showDataDialog} onOpenChange={setShowDataDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Icon name="Database" size={20} />
              Данные и хранилище
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="p-4 bg-muted rounded-xl">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Использовано</span>
                <span className="font-bold">2.4 ГБ</span>
              </div>
              <div className="w-full h-2 bg-background rounded-full overflow-hidden">
                <div className="h-full w-[60%] gradient-primary" />
              </div>
              <div className="text-xs text-muted-foreground mt-2">из 4 ГБ доступно</div>
            </div>

            <div className="space-y-2">
              <Button variant="outline" className="w-full justify-between">
                <div className="flex items-center gap-2">
                  <Icon name="Image" size={18} />
                  <span>Фото и видео</span>
                </div>
                <span className="text-muted-foreground">1.8 ГБ</span>
              </Button>
              
              <Button variant="outline" className="w-full justify-between">
                <div className="flex items-center gap-2">
                  <Icon name="FileText" size={18} />
                  <span>Документы</span>
                </div>
                <span className="text-muted-foreground">450 МБ</span>
              </Button>
              
              <Button variant="outline" className="w-full justify-between">
                <div className="flex items-center gap-2">
                  <Icon name="Music" size={18} />
                  <span>Голосовые сообщения</span>
                </div>
                <span className="text-muted-foreground">150 МБ</span>
              </Button>
            </div>

            <Button variant="destructive" className="w-full">
              <Icon name="Trash2" size={18} className="mr-2" />
              Очистить кэш
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showLanguageDialog} onOpenChange={setShowLanguageDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Icon name="Languages" size={20} />
              Выбор языка
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            {[
              { value: 'ru' as Language, label: 'Русский', flag: '🇷🇺' },
              { value: 'en' as Language, label: 'English', flag: '🇺🇸' },
            ].map(({ value, label, flag }) => (
              <button
                key={value}
                onClick={() => setLanguage(value)}
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
        </DialogContent>
      </Dialog>

      <Dialog open={showMobileDialog} onOpenChange={setShowMobileDialog}>
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
                    setHapticFeedback(checked);
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
                    setAutoPlayVideos(checked);
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
                    setReducedMotion(checked);
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
                  setShowMobileDialog(false);
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
    </div>
  );
}