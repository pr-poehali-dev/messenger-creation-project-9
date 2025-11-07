import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';
import ImageEditorDialog from '@/components/ImageEditorDialog';

type AvatarMedia = {
  id: string;
  url: string;
  type: 'image' | 'gif' | 'video';
};

type AvatarGalleryDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  avatars: AvatarMedia[];
  currentIndex: number;
  onAddAvatar: (file: File) => void;
  onDeleteAvatar: (id: string) => void;
  onSetCurrentAvatar: (index: number) => void;
};

export default function AvatarGalleryDialog({
  open,
  onOpenChange,
  avatars,
  currentIndex,
  onAddAvatar,
  onDeleteAvatar,
  onSetCurrentAvatar
}: AvatarGalleryDialogProps) {
  const { toast } = useToast();
  const [viewIndex, setViewIndex] = useState(currentIndex);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showEditor, setShowEditor] = useState(false);
  const [editingImageUrl, setEditingImageUrl] = useState<string | null>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'video/mp4', 'video/webm'];
    
    if (!validTypes.includes(file.type)) {
      toast({
        title: "Ошибка",
        description: "Поддерживаются только изображения и видео",
        variant: "destructive",
      });
      return;
    }

    if (file.size > 50 * 1024 * 1024) {
      toast({
        title: "Ошибка",
        description: "Файл слишком большой (макс. 50 МБ)",
        variant: "destructive",
      });
      return;
    }

    if (file.type.startsWith('video/')) {
      onAddAvatar(file);
      toast({
        title: "Видео добавлено",
        description: "Видео успешно загружено в галерею",
      });
    } else {
      const url = URL.createObjectURL(file);
      setEditingImageUrl(url);
      setShowEditor(true);
    }
  };

  const handleEditorSave = (editedFile: File) => {
    onAddAvatar(editedFile);
    setShowEditor(false);
    setEditingImageUrl(null);
  };

  const handlePrev = () => {
    setViewIndex((prev) => (prev > 0 ? prev - 1 : avatars.length - 1));
  };

  const handleNext = () => {
    setViewIndex((prev) => (prev < avatars.length - 1 ? prev + 1 : 0));
  };

  const handleSetCurrent = () => {
    onSetCurrentAvatar(viewIndex);
    toast({
      title: "Аватарка установлена",
      description: "Главная аватарка обновлена",
    });
  };

  const handleDelete = () => {
    if (avatars.length === 1) {
      toast({
        title: "Ошибка",
        description: "Нельзя удалить последнюю аватарку",
        variant: "destructive",
      });
      return;
    }
    
    const currentId = avatars[viewIndex].id;
    onDeleteAvatar(currentId);
    setViewIndex((prev) => (prev > 0 ? prev - 1 : 0));
    toast({
      title: "Аватарка удалена",
      description: "Фото удалено из галереи",
    });
  };

  const currentMedia = avatars[viewIndex];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl p-0 overflow-hidden bg-black/95">
        <DialogHeader className="absolute top-0 left-0 right-0 z-10 p-4 bg-gradient-to-b from-black/80 to-transparent">
          <DialogTitle className="text-white flex items-center justify-between">
            <span>Галерея аватарок</span>
            <span className="text-sm font-normal">{viewIndex + 1} / {avatars.length}</span>
          </DialogTitle>
        </DialogHeader>

        <div className="relative aspect-square bg-black flex items-center justify-center">
          {currentMedia.type === 'video' ? (
            <video
              src={currentMedia.url}
              className="max-w-full max-h-full object-contain"
              autoPlay
              loop
              muted
              playsInline
            />
          ) : (
            <img
              src={currentMedia.url}
              alt="Avatar"
              className="max-w-full max-h-full object-contain"
            />
          )}

          {avatars.length > 1 && (
            <>
              <Button
                size="icon"
                variant="ghost"
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full"
                onClick={handlePrev}
              >
                <Icon name="ChevronLeft" size={24} />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full"
                onClick={handleNext}
              >
                <Icon name="ChevronRight" size={24} />
              </Button>
            </>
          )}

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1">
            {avatars.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setViewIndex(idx)}
                className={`w-2 h-2 rounded-full transition-all ${
                  idx === viewIndex ? 'bg-white w-6' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
          <div className="flex gap-2 justify-center">
            <Button
              onClick={handleSetCurrent}
              className="bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm"
              disabled={viewIndex === currentIndex}
            >
              <Icon name="Check" size={18} className="mr-2" />
              Сделать главной
            </Button>
            
            <Button
              onClick={() => fileInputRef.current?.click()}
              className="bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm"
            >
              <Icon name="Plus" size={18} className="mr-2" />
              Добавить
            </Button>
            
            <Button
              onClick={handleDelete}
              variant="ghost"
              className="bg-red-500/20 hover:bg-red-500/30 text-white backdrop-blur-sm"
            >
              <Icon name="Trash2" size={18} className="mr-2" />
              Удалить
            </Button>
          </div>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*,video/mp4,video/webm"
          className="hidden"
          onChange={handleFileSelect}
        />
      </DialogContent>

      {editingImageUrl && (
        <ImageEditorDialog
          open={showEditor}
          onOpenChange={setShowEditor}
          imageUrl={editingImageUrl}
          onSave={handleEditorSave}
        />
      )}
    </Dialog>
  );
}