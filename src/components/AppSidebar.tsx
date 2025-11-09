import Icon from '@/components/ui/icon';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import type { Section, User } from '@/types';

interface AppSidebarProps {
  activeSection: Section;
  onSectionChange: (section: Section) => void;
  user: User;
  isMobileOpen?: boolean;
  onMobileClose?: () => void;
}

export default function AppSidebar({ activeSection, onSectionChange, user, isMobileOpen, onMobileClose }: AppSidebarProps) {
  const menuItems = [
    { id: 'chats' as Section, icon: 'MessageCircle', label: 'Чаты' },
    { id: 'contacts' as Section, icon: 'Users', label: 'Контакты' },
    { id: 'groups' as Section, icon: 'Users2', label: 'Группы' },
    { id: 'channels' as Section, icon: 'Radio', label: 'Каналы' },
    { id: 'users' as Section, icon: 'UserCircle2', label: 'Пользователи' },
  ];

  return (
    <>
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={onMobileClose}
        />
      )}
      <aside className={`w-16 md:w-20 flex flex-col items-center py-4 md:py-6 gap-3 md:gap-4 border-r border-border bg-muted/30 md:relative fixed left-0 top-0 h-full z-50 transition-transform duration-300 ${
        isMobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
      }`}>
      <div className="w-12 h-12 md:w-12 md:h-12 rounded-2xl gradient-primary flex items-center justify-center mb-2 md:mb-4">
        <Icon name="MessageSquare" size={24} className="text-white" />
      </div>

      <div className="flex-1 flex flex-col gap-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onSectionChange(item.id)}
            className={`w-12 h-12 md:w-12 md:h-12 rounded-2xl flex items-center justify-center transition-all active:scale-95 ${
              activeSection === item.id
                ? 'gradient-primary text-white shadow-lg scale-105 md:scale-110'
                : 'text-muted-foreground hover:bg-muted'
            }`}
            title={item.label}
          >
            <Icon name={item.icon} size={24} />
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-3 items-center">
        <button
          onClick={() => onSectionChange('settings')}
          className="w-12 h-12 md:w-12 md:h-12 rounded-2xl flex items-center justify-center text-muted-foreground hover:bg-muted transition-all active:scale-95"
          title="Настройки"
        >
          <Icon name="Settings" size={24} />
        </button>
        <Avatar className="cursor-pointer hover:scale-110 transition-transform" onClick={() => onSectionChange('profile')} title="Профиль">
          <AvatarImage src="" />
          <AvatarFallback className="gradient-primary text-white font-semibold text-xl">
            {user.avatar}
          </AvatarFallback>
        </Avatar>
      </div>
      </aside>
    </>
  );
}