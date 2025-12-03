import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import Icon from './ui/icon';

interface User {
  user_id: number;
  username: string;
  email: string;
  avatar_url: string | null;
  bio: string | null;
  phone: string | null;
  created_at: string | null;
}

interface ProfileScreenProps {
  sessionToken: string;
  onBack: () => void;
  onLogout: () => void;
}

export default function ProfileScreen({ sessionToken, onBack, onLogout }: ProfileScreenProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch(
        `https://functions.poehali.dev/70c7b012-ff7c-4a70-b3ab-c5d806b807aa?action=profile&session_token=${sessionToken}`
      );
      
      const data = await response.json();
      
      if (response.ok) {
        setUser(data);
      } else {
        setError(data.error || 'Не удалось загрузить профиль');
        if (response.status === 401) {
          setTimeout(onLogout, 2000);
        }
      }
    } catch (err) {
      setError('Ошибка подключения к серверу');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Неизвестно';
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <Icon name="Loader2" size={48} className="mx-auto text-blue-600 animate-spin mb-4" />
          <p className="text-gray-600">Загрузка профиля...</p>
        </div>
      </div>
    );
  }

  if (error && !user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <Icon name="AlertCircle" size={64} className="mx-auto text-red-500 mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Ошибка</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <Button onClick={onLogout} className="w-full">
            Вернуться к входу
          </Button>
        </div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="bg-white shadow-md sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" onClick={onBack}>
              <Icon name="ArrowLeft" size={18} />
            </Button>
            <h1 className="text-2xl font-bold text-gray-800">Личный кабинет</h1>
          </div>
          <Button variant="outline" size="sm" onClick={onLogout}>
            <Icon name="LogOut" size={18} className="mr-2" />
            Выйти
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-32"></div>
          
          <div className="px-8 pb-8">
            <div className="flex items-start gap-6 -mt-16 mb-6">
              <div className="bg-white rounded-full p-2 shadow-xl">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-4xl font-bold">
                  {user.username.charAt(0).toUpperCase()}
                </div>
              </div>
              
              <div className="flex-1 mt-20">
                <h2 className="text-3xl font-bold text-gray-800 mb-1">{user.username}</h2>
                <p className="text-gray-600 flex items-center gap-2">
                  <Icon name="Mail" size={16} />
                  {user.email}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Icon name="User" size={16} className="inline mr-2" />
                    Имя пользователя
                  </label>
                  <Input value={user.username} disabled />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Icon name="Mail" size={16} className="inline mr-2" />
                    Email
                  </label>
                  <Input value={user.email} disabled />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Icon name="Phone" size={16} className="inline mr-2" />
                    Телефон
                  </label>
                  <Input 
                    value={user.phone || 'Не указан'} 
                    disabled 
                    placeholder="Не указан"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Icon name="Calendar" size={16} className="inline mr-2" />
                    Дата регистрации
                  </label>
                  <Input value={formatDate(user.created_at)} disabled />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Icon name="FileText" size={16} className="inline mr-2" />
                    О себе
                  </label>
                  <textarea
                    className="w-full px-3 py-2 border border-gray-300 rounded-md resize-none bg-gray-50"
                    rows={4}
                    value={user.bio || 'Информация не указана'}
                    disabled
                    placeholder="Информация не указана"
                  />
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Статистика</h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-blue-50 rounded-xl p-4 text-center">
                  <Icon name="ShoppingBag" size={32} className="mx-auto text-blue-600 mb-2" />
                  <div className="text-2xl font-bold text-gray-800">0</div>
                  <div className="text-sm text-gray-600">Заказов</div>
                </div>
                <div className="bg-purple-50 rounded-xl p-4 text-center">
                  <Icon name="Heart" size={32} className="mx-auto text-purple-600 mb-2" />
                  <div className="text-2xl font-bold text-gray-800">0</div>
                  <div className="text-sm text-gray-600">Избранное</div>
                </div>
                <div className="bg-pink-50 rounded-xl p-4 text-center">
                  <Icon name="Star" size={32} className="mx-auto text-pink-600 mb-2" />
                  <div className="text-2xl font-bold text-gray-800">0</div>
                  <div className="text-sm text-gray-600">Отзывов</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
