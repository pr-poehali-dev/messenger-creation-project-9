import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { getAuthState, logout } from '@/lib/auth';

export default function Profile() {
  const navigate = useNavigate();
  const { user, isAuthenticated } = getAuthState();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/auth');
    }
  }, [isAuthenticated, navigate]);

  if (!user) return null;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const menuItems = [
    { icon: 'Package', label: 'Мои заказы', path: '/orders' },
    { icon: 'Heart', label: 'Избранное', path: '/favorites' },
    { icon: 'MapPin', label: 'Адреса доставки', path: '/addresses' },
    { icon: 'CreditCard', label: 'Способы оплаты', path: '/payment-methods' },
    { icon: 'Bell', label: 'Уведомления', path: '/notifications' },
    { icon: 'HelpCircle', label: 'Помощь', path: '/help' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <Icon name="ArrowLeft" size={24} />
              <span className="font-medium">На главную</span>
            </Link>
            <h1 className="text-xl font-bold">Профиль</h1>
            <div className="w-20" />
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Card className="mb-6 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center text-white text-3xl font-bold">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div className="flex-grow">
                <h2 className="text-2xl font-bold text-gray-900">{user.name}</h2>
                <p className="text-gray-600">{user.email}</p>
                <p className="text-gray-600">{user.phone}</p>
                <div className="mt-2">
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
                    <Icon name={user.role === 'seller' ? 'Store' : 'ShoppingBag'} size={14} />
                    {user.role === 'seller' ? 'Продавец' : 'Покупатель'}
                  </span>
                </div>
              </div>
              <Button variant="outline" onClick={handleLogout} className="gap-2">
                <Icon name="LogOut" size={18} />
                Выйти
              </Button>
            </div>
          </CardContent>
        </Card>

        {user.role === 'seller' && (
          <Card className="mb-6 shadow-lg border-2 border-purple-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-purple-100 p-3 rounded-xl">
                    <Icon name="Store" size={24} className="text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Кабинет продавца</h3>
                    <p className="text-gray-600 text-sm">Управление товарами и заказами</p>
                  </div>
                </div>
                <Link to="/seller/dashboard">
                  <Button className="gap-2">
                    Перейти
                    <Icon name="ArrowRight" size={18} />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid md:grid-cols-2 gap-4">
          {menuItems.map((item) => (
            <Card key={item.path} className="shadow-lg hover:shadow-xl transition-shadow cursor-pointer group">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="bg-purple-100 p-3 rounded-xl group-hover:bg-purple-200 transition-colors">
                    <Icon name={item.icon as any} size={24} className="text-purple-600" />
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-semibold text-gray-900">{item.label}</h3>
                  </div>
                  <Icon name="ChevronRight" size={20} className="text-gray-400" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="mt-6 shadow-lg border-red-200">
          <CardContent className="p-6">
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 text-red-600 hover:text-red-700 w-full"
            >
              <Icon name="LogOut" size={20} />
              <span className="font-medium">Выйти из аккаунта</span>
            </button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
