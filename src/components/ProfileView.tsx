import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';
import AvatarGalleryDialog from '@/components/AvatarGalleryDialog';
import ImageEditorDialog from '@/components/ImageEditorDialog';
import type { User } from '@/types';

type AvatarMedia = {
  id: string;
  url: string;
  type: 'image' | 'gif' | 'video';
};

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
  const [showAvatarGallery, setShowAvatarGallery] = useState(false);
  const [coverImage, setCoverImage] = useState<string | null>(null);
  const [avatars, setAvatars] = useState<AvatarMedia[]>([
    { id: '1', url: '', type: 'image' }
  ]);
  const [currentAvatarIndex, setCurrentAvatarIndex] = useState(0);
  const coverInputRef = useRef<HTMLInputElement>(null);
  const [showCoverEditor, setShowCoverEditor] = useState(false);
  const [editingCoverUrl, setEditingCoverUrl] = useState<string | null>(null);

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

  const handleAddAvatar = (file: File) => {
    const url = URL.createObjectURL(file);
    const type: 'image' | 'gif' | 'video' = 
      file.type.startsWith('video/') ? 'video' : 
      file.type === 'image/gif' ? 'gif' : 'image';
    
    const newAvatar: AvatarMedia = {
      id: Date.now().toString(),
      url,
      type
    };
    
    setAvatars(prev => [...prev, newAvatar]);
  };

  const handleDeleteAvatar = (id: string) => {
    setAvatars(prev => prev.filter(a => a.id !== id));
    if (currentAvatarIndex >= avatars.length - 1) {
      setCurrentAvatarIndex(Math.max(0, avatars.length - 2));
    }
  };

  const handleSetCurrentAvatar = (index: number) => {
    setCurrentAvatarIndex(index);
  };

  const handleCoverUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast({
        title: "Ошибка",
        description: "Можно загружать только изображения",
        variant: "destructive",
      });
      return;
    }

    const url = URL.createObjectURL(file);
    setEditingCoverUrl(url);
    setShowCoverEditor(true);
  };

  const handleCoverEditorSave = (editedFile: File) => {
    const url = URL.createObjectURL(editedFile);
    setCoverImage(url);
    setShowCoverEditor(false);
    setEditingCoverUrl(null);
    toast({
      title: "Обложка обновлена",
      description: "Фото обложки успешно изменено",
    });
  };

  const currentAvatar = avatars[currentAvatarIndex];

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

      <div className="flex-1 overflow-y-auto">
        <div className="relative">
          <div 
            className="h-64 bg-gradient-to-br from-primary/20 to-secondary/20 relative group cursor-pointer"
            onClick={() => coverInputRef.current?.click()}
          >
            {coverImage && (
              <img src={coverImage} alt="Cover" className="w-full h-full object-cover" />
            )}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
              <Button
                size="icon"
                className="opacity-0 group-hover:opacity-100 transition-opacity rounded-full gradient-primary"
              >
                <Icon name="Camera" size={20} />
              </Button>
            </div>
          </div>
          
          <div className="max-w-2xl mx-auto px-6 -mt-16 relative z-10">
            <div className="glass rounded-3xl p-8 space-y-6">
              <div className="flex flex-col items-center gap-4">
                <div 
                  className="relative cursor-pointer group"
                  onClick={() => setShowAvatarGallery(true)}
                >
                  <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-background shadow-xl">
                    {currentAvatar.url ? (
                      currentAvatar.type === 'video' ? (
                        <video
                          src={currentAvatar.url}
                          className="w-full h-full object-cover"
                          autoPlay
                          loop
                          muted
                          playsInline
                        />
                      ) : (
                        <img
                          src={currentAvatar.url}
                          alt="Avatar"
                          className="w-full h-full object-cover"
                        />
                      )
                    ) : (
                      <div className="w-full h-full gradient-primary flex items-center justify-center text-white font-bold text-5xl">
                        {user.avatar}
                      </div>
                    )}
                  </div>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors rounded-full flex items-center justify-center">
                    <Icon name="Camera" size={24} className="text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  {avatars.length > 1 && (
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
                      {currentAvatarIndex + 1}/{avatars.length}
                    </div>
                  )}
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

      <input
        ref={coverInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleCoverUpload}
      />

      <AvatarGalleryDialog
        open={showAvatarGallery}
        onOpenChange={setShowAvatarGallery}
        avatars={avatars}
        currentIndex={currentAvatarIndex}
        onAddAvatar={handleAddAvatar}
        onDeleteAvatar={handleDeleteAvatar}
        onSetCurrentAvatar={handleSetCurrentAvatar}
      />

      {editingCoverUrl && (
        <ImageEditorDialog
          open={showCoverEditor}
          onOpenChange={setShowCoverEditor}
          imageUrl={editingCoverUrl}
          onSave={handleCoverEditorSave}
        />
      )}
    </div>
  );
}