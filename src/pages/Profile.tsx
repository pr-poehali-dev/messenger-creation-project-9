import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

const CHAT_URL = 'https://functions.poehali.dev/222c0ed1-f2c7-446b-b11f-df723890c2fe';

interface ProfileData {
  id: number;
  username: string;
  email: string;
  avatar_url: string;
  bio?: string;
  created_at: string;
  messages_count: number;
}

export default function Profile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, sessionToken, logout } = useAuth();
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [bio, setBio] = useState('');
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const isOwnProfile = !id || (user && id === String(user.id));

  useEffect(() => {
    if (!sessionToken) {
      navigate('/login');
      return;
    }
    fetchProfile();
  }, [id, sessionToken]);

  const fetchProfile = async () => {
    try {
      const url = id
        ? `${CHAT_URL}?action=profile&id=${id}`
        : `${CHAT_URL}?action=profile`;

      const response = await fetch(url, {
        headers: { 'X-Session-Token': sessionToken! },
      });

      if (response.ok) {
        const data = await response.json();
        setProfile(data);
        setBio(data.bio || '');
        setUsername(data.username);
      }
    } catch (error) {
      console.error('Failed to fetch profile:', error);
    }
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(CHAT_URL, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-Session-Token': sessionToken!,
        },
        body: JSON.stringify({ bio, username }),
      });

      if (response.ok) {
        await fetchProfile();
        setIsEditing(false);
      }
    } catch (error) {
      console.error('Failed to update profile:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b px-4 py-3 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => navigate('/chat')}>
            <Icon name="ArrowLeft" size={20} />
          </Button>
          <h1 className="font-semibold text-lg">Профиль</h1>
        </div>
        {isOwnProfile && (
          <Button variant="ghost" size="icon" onClick={handleLogout}>
            <Icon name="LogOut" size={20} />
          </Button>
        )}
      </header>

      <div className="max-w-2xl mx-auto p-4 sm:p-6 space-y-6">
        <div className="bg-white rounded-2xl shadow-sm p-6 space-y-6">
          <div className="flex flex-col items-center text-center space-y-4">
            <img
              src={profile.avatar_url}
              alt={profile.username}
              className="w-32 h-32 rounded-full border-4 border-blue-100"
            />
            
            {isEditing ? (
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="text-2xl font-bold text-center border-b-2 border-blue-500 focus:outline-none"
                placeholder="Имя пользователя"
              />
            ) : (
              <h2 className="text-2xl font-bold">{profile.username}</h2>
            )}
            
            <p className="text-muted-foreground">{profile.email}</p>
          </div>

          <div className="grid grid-cols-2 gap-4 py-4">
            <div className="text-center p-4 bg-blue-50 rounded-xl">
              <p className="text-3xl font-bold text-blue-600">{profile.messages_count}</p>
              <p className="text-sm text-muted-foreground">Сообщений</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-xl">
              <p className="text-3xl font-bold text-purple-600">
                {Math.floor((Date.now() - new Date(profile.created_at).getTime()) / (1000 * 60 * 60 * 24))}
              </p>
              <p className="text-sm text-muted-foreground">Дней с нами</p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold flex items-center gap-2">
                <Icon name="Info" size={18} />
                О себе
              </h3>
              {isOwnProfile && !isEditing && (
                <Button variant="ghost" size="sm" onClick={() => setIsEditing(true)}>
                  <Icon name="Edit2" size={16} />
                </Button>
              )}
            </div>

            {isEditing ? (
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Расскажите о себе (до 200 символов)"
                rows={4}
                maxLength={200}
              />
            ) : (
              <p className="text-muted-foreground p-3 bg-gray-50 rounded-lg min-h-[80px]">
                {profile.bio || 'Информация не заполнена'}
              </p>
            )}
          </div>

          {isEditing && (
            <div className="flex gap-3">
              <Button onClick={handleSave} className="flex-1" disabled={isLoading}>
                {isLoading ? 'Сохранение...' : 'Сохранить'}
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setIsEditing(false);
                  setBio(profile.bio || '');
                  setUsername(profile.username);
                }}
                className="flex-1"
              >
                Отмена
              </Button>
            </div>
          )}

          <div className="pt-4 border-t space-y-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Icon name="Calendar" size={16} />
              <span>Регистрация: {new Date(profile.created_at).toLocaleDateString('ru-RU')}</span>
            </div>
          </div>
        </div>

        {isOwnProfile && (
          <div className="bg-white rounded-2xl shadow-sm p-6 space-y-4">
            <h3 className="font-semibold flex items-center gap-2">
              <Icon name="Settings" size={18} />
              Настройки
            </h3>
            <Button variant="outline" className="w-full justify-start" onClick={() => navigate('/chat')}>
              <Icon name="MessageCircle" size={18} />
              Перейти в чат
            </Button>
            <Button variant="outline" className="w-full justify-start text-red-600 hover:text-red-700" onClick={handleLogout}>
              <Icon name="LogOut" size={18} />
              Выйти из аккаунта
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
