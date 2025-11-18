import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createReel } from '@/lib/reelsApi';
import { uploadFile } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

export default function CreateReel() {
  const navigate = useNavigate();
  const [uploading, setUploading] = useState(false);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);
  const [description, setDescription] = useState('');

  const handleVideoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('video/')) {
      toast.error('Пожалуйста, выберите видео файл');
      return;
    }

    const maxSize = 100 * 1024 * 1024;
    if (file.size > maxSize) {
      toast.error('Размер видео не должен превышать 100 МБ');
      return;
    }

    setVideoFile(file);
    const url = URL.createObjectURL(file);
    setVideoPreview(url);
  };

  const handleUpload = async () => {
    if (!videoFile) {
      toast.error('Выберите видео для загрузки');
      return;
    }

    setUploading(true);

    try {
      const videoUrl = await uploadFile(videoFile);
      
      await createReel(videoUrl, undefined, description);
      
      toast.success('Reel успешно загружен!');
      navigate('/reels');
    } catch (error) {
      console.error('Failed to create reel:', error);
      toast.error('Не удалось загрузить Reel');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="max-w-2xl mx-auto p-4">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
          >
            <Icon name="ArrowLeft" size={24} />
            <span>Назад</span>
          </button>
          <h1 className="text-2xl font-bold">Создать Reel</h1>
          <div className="w-20" />
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 space-y-6">
          <div>
            <Label>Видео (9:16)</Label>
            <div className="mt-2">
              {videoPreview ? (
                <div className="relative w-full aspect-[9/16] max-w-sm mx-auto bg-black rounded-lg overflow-hidden">
                  <video
                    src={videoPreview}
                    className="w-full h-full object-contain"
                    controls
                  />
                  <button
                    onClick={() => {
                      setVideoFile(null);
                      setVideoPreview(null);
                    }}
                    className="absolute top-2 right-2 p-2 bg-black/50 rounded-full text-white hover:bg-black/70"
                  >
                    <Icon name="X" size={20} />
                  </button>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center w-full aspect-[9/16] max-w-sm mx-auto border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-primary transition-colors">
                  <Icon name="Video" size={48} className="text-gray-400 mb-4" />
                  <span className="text-sm text-gray-600 mb-2">Нажмите для выбора видео</span>
                  <span className="text-xs text-gray-400">Рекомендуется формат 9:16 (вертикальное)</span>
                  <span className="text-xs text-gray-400">Макс. 100 МБ</span>
                  <input
                    type="file"
                    accept="video/*"
                    onChange={handleVideoSelect}
                    className="hidden"
                  />
                </label>
              )}
            </div>
          </div>

          <div>
            <Label htmlFor="description">Описание</Label>
            <Textarea
              id="description"
              placeholder="Расскажите о вашем видео..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              maxLength={500}
            />
            <p className="text-xs text-gray-500 mt-1">
              {description.length}/500 символов
            </p>
          </div>

          <Button
            onClick={handleUpload}
            disabled={!videoFile || uploading}
            className="w-full"
            size="lg"
          >
            {uploading ? (
              <>
                <Icon name="Loader2" className="animate-spin mr-2" size={18} />
                Загрузка...
              </>
            ) : (
              <>
                <Icon name="Upload" className="mr-2" size={18} />
                Опубликовать Reel
              </>
            )}
          </Button>
        </div>

        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <h3 className="font-semibold mb-2 flex items-center">
            <Icon name="Info" size={18} className="mr-2 text-blue-600" />
            Советы для создания Reels
          </h3>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>• Используйте вертикальный формат 9:16 для лучшего отображения</li>
            <li>• Длительность видео: от 3 до 60 секунд</li>
            <li>• Добавьте описание, чтобы рассказать зрителям о вашем контенте</li>
            <li>• Убедитесь, что видео хорошего качества</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
