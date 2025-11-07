import Icon from '@/components/ui/icon';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import type { Section, User } from '@/types';

interface AppSidebarProps {
  activeSection: Section;
  onSectionChange: (section: Section) => void;
  user: User;
}

export default function AppSidebar({ activeSection, onSectionChange, user }: AppSidebarProps) {
  const menuItems = [
    { id: 'chats' as Section, icon: 'MessageCircle', label: 'Чаты' },
    { id: 'contacts' as Section, icon: 'Users', label: 'Контакты' },
    { id: 'groups' as Section, icon: 'Users2', label: 'Группы' },
    { id: 'channels' as Section, icon: 'Radio', label: 'Каналы' },
  ];

  return (
    <aside className="w-20 flex flex-col items-center py-6 gap-4 border-r border-border bg-muted/30">
      <div className="w-12 h-12 rounded-2xl gradient-primary flex items-center justify-center mb-4">
        <Icon name="MessageSquare" size={24} className="text-white" />
      </div>

      <div className="flex-1 flex flex-col gap-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onSectionChange(item.id)}
            className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${
              activeSection === item.id
                ? 'gradient-primary text-white shadow-lg scale-110'
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
          className="w-12 h-12 rounded-2xl flex items-center justify-center text-muted-foreground hover:bg-muted transition-all"
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
  );
}
