import Icon from '@/components/ui/icon';

type SettingsMenuItemProps = {
  icon: string;
  title: string;
  description: string;
  onClick: () => void;
  hideOnDesktop?: boolean;
};

export default function SettingsMenuItem({ 
  icon, 
  title, 
  description, 
  onClick,
  hideOnDesktop = false
}: SettingsMenuItemProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full glass rounded-3xl p-4 md:p-6 flex items-center justify-between hover:bg-muted/50 transition-colors active:scale-95 ${
        hideOnDesktop ? 'md:hidden' : ''
      }`}
    >
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center">
          <Icon name={icon} size={24} className="text-white" />
        </div>
        <div className="text-left">
          <div className="font-semibold text-lg">{title}</div>
          <div className="text-sm text-muted-foreground">{description}</div>
        </div>
      </div>
      <Icon name="ChevronRight" size={20} className="text-muted-foreground" />
    </button>
  );
}
