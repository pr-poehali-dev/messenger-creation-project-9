import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import SettingsMenuItem from '@/components/settings/SettingsMenuItem';
import ThemeDialog from '@/components/settings/ThemeDialog';
import NotificationsDialog from '@/components/settings/NotificationsDialog';
import PrivacyDialog from '@/components/settings/PrivacyDialog';
import DataDialog from '@/components/settings/DataDialog';
import LanguageDialog from '@/components/settings/LanguageDialog';
import MobileDialog from '@/components/settings/MobileDialog';

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
          <SettingsMenuItem
            icon="Palette"
            title="Темы оформления"
            description="Измените внешний вид"
            onClick={() => setShowThemeDialog(true)}
          />

          <SettingsMenuItem
            icon="Bell"
            title="Уведомления"
            description="Настройте оповещения"
            onClick={() => setShowNotificationsDialog(true)}
          />

          <SettingsMenuItem
            icon="Lock"
            title="Приватность"
            description="Управление безопасностью"
            onClick={() => setShowPrivacyDialog(true)}
          />

          <SettingsMenuItem
            icon="Database"
            title="Данные"
            description="Хранилище и кэш"
            onClick={() => setShowDataDialog(true)}
          />

          <SettingsMenuItem
            icon="Languages"
            title="Язык"
            description={language === 'ru' ? 'Русский' : 'English'}
            onClick={() => setShowLanguageDialog(true)}
          />

          <SettingsMenuItem
            icon="Smartphone"
            title="Мобильная версия"
            description="Настройки для смартфона"
            onClick={() => setShowMobileDialog(true)}
            hideOnDesktop={true}
          />
        </div>
      </div>

      <ThemeDialog
        open={showThemeDialog}
        onOpenChange={setShowThemeDialog}
        theme={theme}
        onThemeChange={setTheme}
      />

      <NotificationsDialog
        open={showNotificationsDialog}
        onOpenChange={setShowNotificationsDialog}
        messageNotifications={messageNotifications}
        onMessageNotificationsChange={setMessageNotifications}
      />

      <PrivacyDialog
        open={showPrivacyDialog}
        onOpenChange={setShowPrivacyDialog}
        showOnlineStatus={showOnlineStatus}
        onShowOnlineStatusChange={setShowOnlineStatus}
        whoCanWriteMe={whoCanWriteMe}
        onWhoCanWriteMeChange={setWhoCanWriteMe}
      />

      <DataDialog
        open={showDataDialog}
        onOpenChange={setShowDataDialog}
      />

      <LanguageDialog
        open={showLanguageDialog}
        onOpenChange={setShowLanguageDialog}
        language={language}
        onLanguageChange={setLanguage}
      />

      <MobileDialog
        open={showMobileDialog}
        onOpenChange={setShowMobileDialog}
        hapticFeedback={hapticFeedback}
        onHapticFeedbackChange={setHapticFeedback}
        autoPlayVideos={autoPlayVideos}
        onAutoPlayVideosChange={setAutoPlayVideos}
        reducedMotion={reducedMotion}
        onReducedMotionChange={setReducedMotion}
        onShowSwipeHint={onShowSwipeHint}
        onBack={onBack}
      />
    </div>
  );
}
