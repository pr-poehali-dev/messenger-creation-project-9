import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

const STORIES_URL = 'https://functions.poehali.dev/17805d36-3b7d-454a-a234-d68790671878';
const UPLOAD_URL = 'https://functions.poehali.dev/d98e5aa5-ef04-4f79-bc77-e6e38ad1e6e7';

interface StoryCreatorProps {
  onClose: () => void;
  onCreated: () => void;
}

const backgroundColors = [
  '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', 
  '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E2'
];

const fontStyles = [
  { name: 'Classic', value: 'font-sans' },
  { name: 'Modern', value: 'font-serif' },
  { name: 'Typewriter', value: 'font-mono' },
  { name: 'Neon', value: 'font-bold tracking-wider' }
];

export default function StoryCreator({ onClose, onCreated }: StoryCreatorProps) {
  const [mediaFile, setMediaFile] = useState<File | null>(null);
  const [mediaPreview, setMediaPreview] = useState<string>('');
  const [mediaType, setMediaType] = useState<'image' | 'video'>('image');
  const [caption, setCaption] = useState('');
  const [backgroundColor, setBackgroundColor] = useState(backgroundColors[0]);
  const [fontStyle, setFontStyle] = useState(fontStyles[0].value);
  const [textMode, setTextMode] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/') && !file.type.startsWith('video/')) {
      toast.error('Выберите изображение или видео');
      return;
    }

    setMediaFile(file);
    setMediaType(file.type.startsWith('video/') ? 'video' : 'image');
    setTextMode(false);

    const reader = new FileReader();
    reader.onload = (e) => {
      setMediaPreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleTextMode = () => {
    setTextMode(true);
    setMediaFile(null);
    setMediaPreview('');
  };

  const uploadFile = async (file: File): Promise<string> => {
    const token = localStorage.getItem('chat_auth');
    if (!token) throw new Error('No auth token');

    const authData = JSON.parse(token);
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(UPLOAD_URL, {
      method: 'POST',
      headers: {
        'X-Auth-Token': authData.token
      },
      body: formData
    });

    if (!response.ok) {
      throw new Error('Upload failed');
    }

    const data = await response.json();
    return data.file_url;
  };

  const handleCreate = async () => {
    if (!textMode && !mediaFile) {
      toast.error('Выберите медиа или создайте текстовую историю');
      return;
    }

    if (textMode && !caption.trim()) {
      toast.error('Введите текст для истории');
      return;
    }

    setUploading(true);
    try {
      const token = localStorage.getItem('chat_auth');
      if (!token) return;

      const authData = JSON.parse(token);
      let mediaUrl = '';

      if (mediaFile) {
        mediaUrl = await uploadFile(mediaFile);
      } else {
        mediaUrl = 'https://placehold.co/400x800/png';
      }

      const response = await fetch(`${STORIES_URL}?action=create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Auth-Token': authData.token
        },
        body: JSON.stringify({
          media_url: mediaUrl,
          media_type: textMode ? 'text' : mediaType,
          caption: caption || null,
          background_color: textMode ? backgroundColor : null,
          font_style: textMode ? fontStyle : null,
          duration: 5
        })
      });

      if (response.ok) {
        toast.success('История опубликована!');
        onCreated();
        onClose();
      } else {
        const error = await response.json();
        toast.error(error.error || 'Ошибка публикации');
      }
    } catch (error) {
      toast.error('Ошибка загрузки');
      console.error(error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
      <div className="relative w-full h-full max-w-md mx-auto bg-background">
        <div className="absolute top-0 left-0 right-0 z-10 p-4 bg-gradient-to-b from-black/60 to-transparent">
          <div className="flex items-center justify-between">
            <h2 className="text-white font-bold text-lg">Создать историю</h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-white hover:bg-white/20"
            >
              <Icon name="X" size={24} />
            </Button>
          </div>
        </div>

        <div 
          className="w-full h-full flex flex-col items-center justify-center p-8"
          style={textMode ? { backgroundColor } : {}}
        >
          {!mediaPreview && !textMode ? (
            <div className="text-center space-y-6">
              <div className="space-y-4">
                <Button
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full h-16 text-lg gap-2"
                >
                  <Icon name="Image" size={24} />
                  Фото или видео
                </Button>
                <Button
                  onClick={handleTextMode}
                  variant="outline"
                  className="w-full h-16 text-lg gap-2"
                >
                  <Icon name="Type" size={24} />
                  Текстовая история
                </Button>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*,video/*"
                className="hidden"
                onChange={handleFileSelect}
              />
            </div>
          ) : textMode ? (
            <div className="w-full space-y-6">
              <Textarea
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                placeholder="Напишите что-нибудь..."
                className={`w-full h-64 bg-transparent border-none text-white text-2xl text-center resize-none focus-visible:ring-0 ${fontStyle}`}
                maxLength={200}
              />
              
              <div className="space-y-4">
                <div>
                  <p className="text-white text-sm mb-2">Цвет фона</p>
                  <div className="flex gap-2 flex-wrap">
                    {backgroundColors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setBackgroundColor(color)}
                        className={`w-10 h-10 rounded-full border-2 ${
                          backgroundColor === color ? 'border-white scale-110' : 'border-white/30'
                        }`}
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-white text-sm mb-2">Стиль текста</p>
                  <div className="flex gap-2 flex-wrap">
                    {fontStyles.map((style) => (
                      <Button
                        key={style.value}
                        onClick={() => setFontStyle(style.value)}
                        variant={fontStyle === style.value ? 'default' : 'outline'}
                        size="sm"
                        className={fontStyle === style.value ? '' : 'text-white border-white/30'}
                      >
                        {style.name}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="relative w-full h-full">
              {mediaType === 'video' ? (
                <video
                  src={mediaPreview}
                  className="w-full h-full object-contain"
                  controls
                />
              ) : (
                <img
                  src={mediaPreview}
                  alt="Preview"
                  className="w-full h-full object-contain"
                />
              )}
              
              <div className="absolute bottom-20 left-0 right-0 px-4">
                <Input
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  placeholder="Добавьте подпись..."
                  className="bg-black/50 border-white/30 text-white placeholder:text-white/70"
                  maxLength={200}
                />
              </div>
            </div>
          )}
        </div>

        {(mediaPreview || textMode) && (
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
            <Button
              onClick={handleCreate}
              disabled={uploading}
              className="w-full h-14 text-lg"
            >
              {uploading ? (
                <>
                  <Icon name="Loader2" size={24} className="animate-spin mr-2" />
                  Загрузка...
                </>
              ) : (
                <>
                  <Icon name="Send" size={24} className="mr-2" />
                  Опубликовать
                </>
              )}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
