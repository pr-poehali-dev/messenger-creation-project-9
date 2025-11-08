import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import Icon from '@/components/ui/icon';

type CreateChannelDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreateChannel: (data: ChannelData) => void;
};

export type ChannelData = {
  name: string;
  description: string;
  isPublic: boolean;
  avatar?: string;
};

export default function CreateChannelDialog({ open, onOpenChange, onCreateChannel }: CreateChannelDialogProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [isPublic, setIsPublic] = useState(true);
  const [avatarPreview, setAvatarPreview] = useState<string>('');

  const handleCreate = () => {
    if (!name.trim()) return;
    
    onCreateChannel({
      name: name.trim(),
      description: description.trim(),
      isPublic,
      avatar: avatarPreview || undefined
    });
    
    setName('');
    setDescription('');
    setIsPublic(true);
    setAvatarPreview('');
    onOpenChange(false);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Icon name="Radio" size={20} />
            Создать канал
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex justify-center">
            <label className="cursor-pointer group">
              <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden border-2 border-primary/20 group-hover:border-primary transition-colors">
                {avatarPreview ? (
                  <img src={avatarPreview} alt="Avatar" className="w-full h-full object-cover" />
                ) : (
                  <Icon name="Camera" size={32} className="text-primary" />
                )}
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Название канала</label>
            <Input
              placeholder="Мой канал"
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={50}
            />
            <div className="text-xs text-muted-foreground text-right">{name.length}/50</div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Описание</label>
            <Textarea
              placeholder="Расскажите о чём ваш канал..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              maxLength={200}
              rows={3}
            />
            <div className="text-xs text-muted-foreground text-right">{description.length}/200</div>
          </div>

          <div className="flex items-center justify-between p-4 bg-muted rounded-xl">
            <div className="flex items-center gap-3">
              <Icon name={isPublic ? 'Globe' : 'Lock'} size={20} />
              <div>
                <div className="font-medium">Публичный канал</div>
                <div className="text-sm text-muted-foreground">
                  {isPublic ? 'Любой может найти и подписаться' : 'Только по приглашению'}
                </div>
              </div>
            </div>
            <Switch checked={isPublic} onCheckedChange={setIsPublic} />
          </div>

          <div className="flex gap-2">
            <Button variant="outline" className="flex-1" onClick={() => onOpenChange(false)}>
              Отмена
            </Button>
            <Button className="flex-1" onClick={handleCreate} disabled={!name.trim()}>
              <Icon name="Plus" size={18} className="mr-2" />
              Создать
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
