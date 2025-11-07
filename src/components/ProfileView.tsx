import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';
import type { User } from '@/types';

type ProfileViewProps = {
  user: User;
  onLogout: () => void;
  onBack: () => void;
};

export default function ProfileView({ user, onLogout, onBack }: ProfileViewProps) {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSaveProfile = () => {
    toast({
      title: "Профиль обновлен",
      description: "Ваши данные успешно сохранены",
    });
    setIsEditing(false);
  };

  const handleChangePassword = () => {
    if (newPassword !== confirmPassword) {
      toast({
        title: "Ошибка",
        description: "Пароли не совпадают",
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "Пароль изменен",
      description: "Ваш пароль успешно обновлен",
    });
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  return (
    <div className="flex-1 flex flex-col bg-background">
      <div className="h-20 glass border-b border-border px-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button size="icon" variant="ghost" className="rounded-full" onClick={onBack}>
            <Icon name="ArrowLeft" size={20} />
          </Button>
          <h2 className="font-bold text-xl">Мой профиль</h2>
        </div>
        <Button variant="ghost" onClick={onLogout} className="text-destructive hover:text-destructive">
          <Icon name="LogOut" size={20} className="mr-2" />
          Выйти
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="glass rounded-3xl p-8 space-y-6">
            <div className="flex flex-col items-center gap-4">
              <div className="relative">
                <Avatar className="w-32 h-32">
                  <AvatarImage src="" />
                  <AvatarFallback className="gradient-primary text-white font-bold text-5xl">
                    {user.avatar}
                  </AvatarFallback>
                </Avatar>
                <Button
                  size="icon"
                  className="absolute bottom-0 right-0 rounded-full gradient-primary"
                >
                  <Icon name="Camera" size={18} />
                </Button>
              </div>
              <div className="text-center">
                <h3 className="text-2xl font-bold">{user.username}</h3>
                <p className="text-muted-foreground">{user.email}</p>
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-lg font-semibold">Информация профиля</h4>
                {!isEditing && (
                  <Button variant="ghost" size="sm" onClick={() => setIsEditing(true)}>
                    <Icon name="Pencil" size={16} className="mr-2" />
                    Редактировать
                  </Button>
                )}
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="username">Имя пользователя</Label>
                  <Input
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    disabled={!isEditing}
                    className="rounded-xl"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={!isEditing}
                    className="rounded-xl"
                  />
                </div>

                {isEditing && (
                  <div className="flex gap-3 pt-2">
                    <Button onClick={handleSaveProfile} className="gradient-primary flex-1">
                      <Icon name="Check" size={18} className="mr-2" />
                      Сохранить
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setIsEditing(false);
                        setUsername(user.username);
                        setEmail(user.email);
                      }}
                      className="flex-1"
                    >
                      <Icon name="X" size={18} className="mr-2" />
                      Отмена
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="glass rounded-3xl p-8 space-y-6">
            <h4 className="text-lg font-semibold">Безопасность</h4>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current-password">Текущий пароль</Label>
                <Input
                  id="current-password"
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="rounded-xl"
                  placeholder="••••••••"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="new-password">Новый пароль</Label>
                <Input
                  id="new-password"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="rounded-xl"
                  placeholder="••••••••"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirm-password">Подтвердите пароль</Label>
                <Input
                  id="confirm-password"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="rounded-xl"
                  placeholder="••••••••"
                />
              </div>

              <Button 
                onClick={handleChangePassword} 
                className="w-full gradient-primary"
                disabled={!currentPassword || !newPassword || !confirmPassword}
              >
                <Icon name="Lock" size={18} className="mr-2" />
                Изменить пароль
              </Button>
            </div>
          </div>

          <div className="glass rounded-3xl p-8 space-y-4">
            <h4 className="text-lg font-semibold">Статистика</h4>
            
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 bg-muted rounded-xl">
                <div className="text-3xl font-bold gradient-text">127</div>
                <div className="text-sm text-muted-foreground mt-1">Чатов</div>
              </div>
              <div className="text-center p-4 bg-muted rounded-xl">
                <div className="text-3xl font-bold gradient-text">1.5k</div>
                <div className="text-sm text-muted-foreground mt-1">Сообщений</div>
              </div>
              <div className="text-center p-4 bg-muted rounded-xl">
                <div className="text-3xl font-bold gradient-text">89</div>
                <div className="text-sm text-muted-foreground mt-1">Контактов</div>
              </div>
            </div>
          </div>

          <div className="glass rounded-3xl p-8 space-y-4">
            <h4 className="text-lg font-semibold flex items-center gap-2">
              <Icon name="Settings" size={20} />
              Настройки приватности
            </h4>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-muted rounded-xl">
                <div className="flex items-center gap-3">
                  <Icon name="Eye" size={20} className="text-muted-foreground" />
                  <div>
                    <div className="font-medium">Показывать статус онлайн</div>
                    <div className="text-sm text-muted-foreground">Другие видят когда вы в сети</div>
                  </div>
                </div>
                <Button variant="outline" size="sm">Вкл</Button>
              </div>

              <div className="flex items-center justify-between p-3 bg-muted rounded-xl">
                <div className="flex items-center gap-3">
                  <Icon name="MessageSquare" size={20} className="text-muted-foreground" />
                  <div>
                    <div className="font-medium">Уведомления о сообщениях</div>
                    <div className="text-sm text-muted-foreground">Получать push-уведомления</div>
                  </div>
                </div>
                <Button variant="outline" size="sm">Вкл</Button>
              </div>

              <div className="flex items-center justify-between p-3 bg-muted rounded-xl">
                <div className="flex items-center gap-3">
                  <Icon name="Users" size={20} className="text-muted-foreground" />
                  <div>
                    <div className="font-medium">Кто может писать мне</div>
                    <div className="text-sm text-muted-foreground">Все пользователи</div>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  <Icon name="ChevronRight" size={16} />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
