import { Link, useLocation } from 'react-router-dom';
import Icon from '@/components/ui/icon';

export default function MobileNav() {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 dark:bg-[#1a1a2e]/95 backdrop-blur-xl border-t border-purple-100/50 dark:border-purple-800/30 shadow-lg">
      <div className="grid grid-cols-4 gap-1 px-2 py-2">
        <Link 
          to="/" 
          className={`flex flex-col items-center gap-1 py-2 px-3 rounded-xl transition-all ${
            isActive('/') 
              ? 'bg-gradient-to-r from-primary to-accent text-white shadow-lg' 
              : 'text-muted-foreground hover:bg-purple-50 dark:hover:bg-purple-800/30'
          }`}
        >
          <Icon name="Home" size={20} />
          <span className="text-[10px] font-medium">Главная</span>
        </Link>
        
        <Link 
          to="/seller" 
          className={`flex flex-col items-center gap-1 py-2 px-3 rounded-xl transition-all ${
            isActive('/seller') 
              ? 'bg-gradient-to-r from-primary to-accent text-white shadow-lg' 
              : 'text-muted-foreground hover:bg-purple-50 dark:hover:bg-purple-800/30'
          }`}
        >
          <Icon name="Store" size={20} />
          <span className="text-[10px] font-medium">Продавцы</span>
        </Link>
        
        <Link 
          to="/help" 
          className={`flex flex-col items-center gap-1 py-2 px-3 rounded-xl transition-all ${
            isActive('/help') 
              ? 'bg-gradient-to-r from-primary to-accent text-white shadow-lg' 
              : 'text-muted-foreground hover:bg-purple-50 dark:hover:bg-purple-800/30'
          }`}
        >
          <Icon name="HelpCircle" size={20} />
          <span className="text-[10px] font-medium">Помощь</span>
        </Link>
        
        <Link 
          to="/profile" 
          className={`flex flex-col items-center gap-1 py-2 px-3 rounded-xl transition-all ${
            isActive('/profile') 
              ? 'bg-gradient-to-r from-primary to-accent text-white shadow-lg' 
              : 'text-muted-foreground hover:bg-purple-50 dark:hover:bg-purple-800/30'
          }`}
        >
          <Icon name="User" size={20} />
          <span className="text-[10px] font-medium">Профиль</span>
        </Link>
      </div>
    </nav>
  );
}