import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Icon from '@/components/ui/icon';
import type { ChatUser } from '@/types';

type CreateGroupDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  contacts: ChatUser[];
  onCreateGroup: (data: GroupData) => void;
};

export type GroupData = {
  name: string;
  description: string;
  members: number[];
  avatar?: string;
};

export default function CreateGroupDialog({ open, onOpenChange, contacts, onCreateGroup }: CreateGroupDialogProps) {
  const [step, setStep] = useState<'members' | 'info'>('members');
  const [selectedMembers, setSelectedMembers] = useState<number[]>([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [avatarPreview, setAvatarPreview] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredContacts = contacts.filter(contact =>
    contact.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleMember = (userId: number) => {
    setSelectedMembers(prev =>
      prev.includes(userId) ? prev.filter(id => id !== userId) : [...prev, userId]
    );
  };

  const handleNext = () => {
    if (selectedMembers.length > 0) {
      setStep('info');
    }
  };

  const handleCreate = () => {
    if (!name.trim()) return;
    
    onCreateGroup({
      name: name.trim(),
      description: description.trim(),
      members: selectedMembers,
      avatar: avatarPreview || undefined
    });
    
    setStep('members');
    setSelectedMembers([]);
    setName('');
    setDescription('');
    setAvatarPreview('');
    setSearchQuery('');
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
    <Dialog open={open} onOpenChange={(open) => {
      if (!open) {
        setStep('members');
        setSelectedMembers([]);
        setSearchQuery('');
      }
      onOpenChange(open);
    }}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {step === 'members' ? (
              <>
                <Icon name="Users" size={20} />
                Выбор участников
              </>
            ) : (
              <>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => setStep('members')}
                  className="h-8 w-8 rounded-full -ml-2"
                >
                  <Icon name="ArrowLeft" size={18} />
                </Button>
                Информация о группе
              </>
            )}
          </DialogTitle>
        </DialogHeader>

        {step === 'members' ? (
          <div className="flex-1 overflow-hidden flex flex-col space-y-4">
            <div className="relative">
              <Icon name="Search" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Поиск контактов..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {selectedMembers.length > 0 && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Icon name="Users" size={16} />
                <span>Выбрано: {selectedMembers.length}</span>
              </div>
            )}

            <div className="flex-1 overflow-y-auto space-y-2 pr-2">
              {filteredContacts.map((contact) => (
                <label
                  key={contact.id}
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted cursor-pointer transition-colors"
                >
                  <Checkbox
                    checked={selectedMembers.includes(contact.id)}
                    onCheckedChange={() => toggleMember(contact.id)}
                  />
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={contact.avatar} />
                    <AvatarFallback className="gradient-primary text-white">
                      {contact.username.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium truncate">{contact.username}</div>
                    <div className="text-sm text-muted-foreground truncate">{contact.email}</div>
                  </div>
                </label>
              ))}
            </div>

            <div className="flex gap-2 pt-2 border-t">
              <Button variant="outline" className="flex-1" onClick={() => onOpenChange(false)}>
                Отмена
              </Button>
              <Button className="flex-1" onClick={handleNext} disabled={selectedMembers.length === 0}>
                Далее
                <Icon name="ArrowRight" size={18} className="ml-2" />
              </Button>
            </div>
          </div>
        ) : (
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
              <label className="text-sm font-medium">Название группы</label>
              <Input
                placeholder="Моя группа"
                value={name}
                onChange={(e) => setName(e.target.value)}
                maxLength={50}
              />
              <div className="text-xs text-muted-foreground text-right">{name.length}/50</div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Описание</label>
              <Textarea
                placeholder="О чём эта группа..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                maxLength={200}
                rows={3}
              />
              <div className="text-xs text-muted-foreground text-right">{description.length}/200</div>
            </div>

            <div className="p-4 bg-muted rounded-xl flex items-center gap-3">
              <Icon name="Users" size={20} className="text-primary" />
              <div>
                <div className="font-medium">Участников: {selectedMembers.length}</div>
                <div className="text-sm text-muted-foreground">+ вы</div>
              </div>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" className="flex-1" onClick={() => setStep('members')}>
                Назад
              </Button>
              <Button className="flex-1" onClick={handleCreate} disabled={!name.trim()}>
                <Icon name="Plus" size={18} className="mr-2" />
                Создать
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
