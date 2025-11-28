import { Link } from 'react-router-dom';
import Icon from './ui/icon';
import { getAuthState } from '@/lib/auth';
import { getCartCount } from '@/lib/cart';
import { useEffect, useState } from 'react';

export default function MobileMenu() {
  const { user, isAuthenticated } = getAuthState();
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    setCartCount(getCartCount());
    const handleCartUpdate = () => setCartCount(getCartCount());
    window.addEventListener('cartUpdated', handleCartUpdate);
    return () => window.removeEventListener('cartUpdated', handleCartUpdate);
  }, []);

  const menuItems = [
    {
      icon: 'Home',
      label: 'Главная',
      path: '/',
      badge: null
    },
    {
      icon: 'Store',
      label: 'Продавцам',
      path: '/seller-info',
      badge: null
    },
    {
      icon: 'ShoppingCart',
      label: 'Корзина',
      path: '/cart',
      badge: cartCount > 0 ? cartCount : null
    },
    {
      icon: isAuthenticated ? 'User' : 'LogIn',
      label: isAuthenticated ? 'Профиль' : 'Войти',
      path: isAuthenticated ? (user?.role === 'seller' ? '/seller/dashboard' : '/profile') : '/buyer/auth',
      badge: null
    }
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
      <div className="grid grid-cols-4 gap-1 px-2 py-2">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className="flex flex-col items-center gap-1 py-2 px-1 rounded-lg hover:bg-purple-50 transition-colors relative"
          >
            <div className="relative">
              <Icon name={item.icon as any} size={24} className="text-gray-600" />
              {item.badge && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                  {item.badge}
                </span>
              )}
            </div>
            <span className="text-xs font-medium text-gray-700">{item.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}