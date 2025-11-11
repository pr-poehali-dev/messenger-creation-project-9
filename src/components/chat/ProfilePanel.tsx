import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

interface ProfilePanelProps {
  onClose: () => void;
}

export default function ProfilePanel({ onClose }: ProfilePanelProps) {
  const { user, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    username: user?.username || '',
    full_name: user?.full_name || '',
    bio: user?.bio || '',
    avatar_url: user?.avatar_url || ''
  });

  const handleSave = async () => {
    setLoading(true);
    try {
      // Здесь будет обновление через API
      toast.success('Профиль обновлён!');
      setIsEditing(false);
    } catch (error) {
      toast.error('Ошибка обновления профиля');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-96 border-l bg-background flex flex-col">
      <div className="p-4 border-b flex items-center justify-between">
        <h2 className="font-semibold">Профиль</h2>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <Icon name="X" size={20} />
        </Button>
      </div>

      <div className="flex-1 overflow-auto p-6 space-y-6">
        <div className="text-center space-y-4">
          <div className="relative inline-block">
            <Avatar className="h-32 w-32">
              <AvatarImage src={formData.avatar_url || undefined} />
              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-4xl">
                {formData.username[0]?.toUpperCase()}
              </AvatarFallback>
            </Avatar>
            {isEditing && (
              <Button
                size="icon"
                className="absolute bottom-0 right-0 rounded-full h-10 w-10"
              >
                <Icon name="Camera" size={18} />
              </Button>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Имя пользователя</Label>
            <Input
              id="username"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              disabled={!isEditing}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="full_name">Полное имя</Label>
            <Input
              id="full_name"
              value={formData.full_name}
              onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
              disabled={!isEditing}
              placeholder="Не указано"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio">О себе</Label>
            <Textarea
              id="bio"
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              disabled={!isEditing}
              placeholder="Расскажите о себе"
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label>Email</Label>
            <Input value={user?.email} disabled />
          </div>
        </div>

        <div className="border-t pt-6 space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Дата регистрации</span>
            <span className="font-medium">
              {user?.created_at && new Date(user.created_at).toLocaleDateString('ru-RU')}
            </span>
          </div>
        </div>
      </div>

      <div className="p-4 border-t space-y-2">
        {isEditing ? (
          <>
            <Button className="w-full" onClick={handleSave} disabled={loading}>
              {loading ? (
                <>
                  <Icon name="Loader2" size={18} className="animate-spin mr-2" />
                  Сохранение...
                </>
              ) : (
                'Сохранить'
              )}
            </Button>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => {
                setIsEditing(false);
                setFormData({
                  username: user?.username || '',
                  full_name: user?.full_name || '',
                  bio: user?.bio || '',
                  avatar_url: user?.avatar_url || ''
                });
              }}
            >
              Отмена
            </Button>
          </>
        ) : (
          <Button className="w-full" onClick={() => setIsEditing(true)}>
            <Icon name="Edit" size={18} className="mr-2" />
            Редактировать профиль
          </Button>
        )}
      </div>
    </div>
  );
}
