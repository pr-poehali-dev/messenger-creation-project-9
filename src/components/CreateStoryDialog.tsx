import { useState, useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface CreateStoryDialogProps {
  open: boolean;
  onClose: () => void;
  onCreateStory: (files: File[]) => void;
}

export default function CreateStoryDialog({ open, onClose, onCreateStory }: CreateStoryDialogProps) {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const validFiles = files.filter(file => {
      const isImage = file.type.startsWith('image/');
      const isVideo = file.type.startsWith('video/');
      return isImage || isVideo;
    });

    if (validFiles.length === 0) return;

    setSelectedFiles(prev => [...prev, ...validFiles]);

    validFiles.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setPreviewUrls(prev => [...prev, e.target!.result as string]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleRemoveFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
    setPreviewUrls(prev => prev.filter((_, i) => i !== index));
  };

  const handleCreate = () => {
    if (selectedFiles.length > 0) {
      onCreateStory(selectedFiles);
      handleClose();
    }
  };

  const handleClose = () => {
    setSelectedFiles([]);
    setPreviewUrls([]);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Создать историю</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*,video/*"
            multiple
            onChange={handleFileSelect}
            className="hidden"
          />

          <div className="grid gap-4">
            {selectedFiles.length === 0 ? (
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-border rounded-lg p-12 flex flex-col items-center justify-center gap-4 cursor-pointer hover:border-primary transition-colors"
              >
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <Icon name="Upload" size={32} className="text-primary" />
                </div>
                <div className="text-center">
                  <p className="font-semibold text-lg">Выберите фото или видео</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Можно выбрать несколько файлов
                  </p>
                </div>
                <Button>
                  <Icon name="Image" size={18} className="mr-2" />
                  Выбрать файлы
                </Button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-3 gap-3">
                  {previewUrls.map((url, index) => (
                    <div key={index} className="relative aspect-square rounded-lg overflow-hidden group">
                      {selectedFiles[index].type.startsWith('video/') ? (
                        <video
                          src={url}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <img
                          src={url}
                          alt={`Preview ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      )}
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Button
                          size="icon"
                          variant="destructive"
                          className="rounded-full"
                          onClick={() => handleRemoveFile(index)}
                        >
                          <Icon name="Trash2" size={18} />
                        </Button>
                      </div>
                      {selectedFiles[index].type.startsWith('video/') && (
                        <div className="absolute top-2 right-2 bg-black/70 px-2 py-1 rounded text-white text-xs flex items-center gap-1">
                          <Icon name="Video" size={12} />
                          Видео
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <Button
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full"
                >
                  <Icon name="Plus" size={18} className="mr-2" />
                  Добавить ещё
                </Button>
              </>
            )}
          </div>

          <div className="flex gap-3">
            <Button variant="outline" onClick={handleClose} className="flex-1">
              Отмена
            </Button>
            <Button
              onClick={handleCreate}
              disabled={selectedFiles.length === 0}
              className="flex-1"
            >
              <Icon name="Send" size={18} className="mr-2" />
              Опубликовать ({selectedFiles.length})
            </Button>
          </div>

          <div className="bg-muted rounded-lg p-4 text-sm text-muted-foreground space-y-2">
            <div className="flex items-start gap-2">
              <Icon name="Info" size={16} className="mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-foreground mb-1">Советы по созданию историй:</p>
                <ul className="space-y-1 ml-1">
                  <li>• Можно выбрать несколько фото и видео</li>
                  <li>• Истории видны 24 часа</li>
                  <li>• Поддерживаются форматы: JPG, PNG, MP4, MOV</li>
                  <li>• Рекомендуемое соотношение сторон: 9:16</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
