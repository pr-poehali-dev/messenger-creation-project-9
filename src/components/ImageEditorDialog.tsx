import { useState, useCallback, useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import Icon from '@/components/ui/icon';
import Cropper from 'react-easy-crop';
import { useToast } from '@/hooks/use-toast';

type ImageEditorDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  imageUrl: string;
  onSave: (editedFile: File) => void;
};

type Filter = 'none' | 'grayscale' | 'sepia' | 'vintage' | 'cool' | 'warm' | 'bright' | 'contrast';

const filterStyles: Record<Filter, string> = {
  none: '',
  grayscale: 'grayscale(100%)',
  sepia: 'sepia(100%)',
  vintage: 'sepia(50%) contrast(120%) saturate(80%)',
  cool: 'hue-rotate(180deg) saturate(120%)',
  warm: 'hue-rotate(30deg) saturate(130%)',
  bright: 'brightness(120%) saturate(110%)',
  contrast: 'contrast(150%) saturate(90%)',
};

export default function ImageEditorDialog({ open, onOpenChange, imageUrl, onSave }: ImageEditorDialogProps) {
  const { toast } = useToast();
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);
  const [filter, setFilter] = useState<Filter>('none');
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [saturation, setSaturation] = useState(100);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const onCropComplete = useCallback((_: any, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const createImage = (url: string): Promise<HTMLImageElement> =>
    new Promise((resolve, reject) => {
      const image = new Image();
      image.addEventListener('load', () => resolve(image));
      image.addEventListener('error', (error) => reject(error));
      image.src = url;
    });

  const getCroppedImg = async (): Promise<Blob | null> => {
    try {
      const image = await createImage(imageUrl);
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      if (!ctx || !croppedAreaPixels) return null;

      const scaleX = image.naturalWidth / image.width;
      const scaleY = image.naturalHeight / image.height;

      canvas.width = croppedAreaPixels.width;
      canvas.height = croppedAreaPixels.height;

      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate((rotation * Math.PI) / 180);
      ctx.translate(-canvas.width / 2, -canvas.height / 2);

      ctx.filter = [
        filterStyles[filter],
        `brightness(${brightness}%)`,
        `contrast(${contrast}%)`,
        `saturate(${saturation}%)`,
      ].filter(Boolean).join(' ');

      ctx.drawImage(
        image,
        croppedAreaPixels.x * scaleX,
        croppedAreaPixels.y * scaleY,
        croppedAreaPixels.width * scaleX,
        croppedAreaPixels.height * scaleY,
        0,
        0,
        croppedAreaPixels.width,
        croppedAreaPixels.height
      );

      return new Promise((resolve) => {
        canvas.toBlob((blob) => {
          resolve(blob);
        }, 'image/jpeg', 0.95);
      });
    } catch (e) {
      console.error('Error cropping image:', e);
      return null;
    }
  };

  const handleSave = async () => {
    try {
      const croppedBlob = await getCroppedImg();
      if (!croppedBlob) {
        toast({
          title: "Ошибка",
          description: "Не удалось обработать изображение",
          variant: "destructive",
        });
        return;
      }

      const file = new File([croppedBlob], 'edited-image.jpg', { type: 'image/jpeg' });
      onSave(file);
      onOpenChange(false);
      toast({
        title: "Фото сохранено",
        description: "Изображение успешно отредактировано",
      });
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Произошла ошибка при сохранении",
        variant: "destructive",
      });
    }
  };

  const resetAll = () => {
    setZoom(1);
    setRotation(0);
    setFilter('none');
    setBrightness(100);
    setContrast(100);
    setSaturation(100);
  };

  const filters: { name: Filter; label: string; icon: string }[] = [
    { name: 'none', label: 'Оригинал', icon: 'ImageOff' },
    { name: 'grayscale', label: 'ЧБ', icon: 'Palette' },
    { name: 'sepia', label: 'Сепия', icon: 'Palette' },
    { name: 'vintage', label: 'Винтаж', icon: 'Camera' },
    { name: 'cool', label: 'Холод', icon: 'Snowflake' },
    { name: 'warm', label: 'Тепло', icon: 'Sun' },
    { name: 'bright', label: 'Яркий', icon: 'Sparkles' },
    { name: 'contrast', label: 'Контраст', icon: 'Circle' },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Icon name="Scissors" size={20} />
            Редактор фотографий
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="relative h-96 bg-black rounded-xl overflow-hidden">
            <Cropper
              image={imageUrl}
              crop={crop}
              zoom={zoom}
              rotation={rotation}
              aspect={1}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onCropComplete}
              style={{
                containerStyle: {
                  filter: [
                    filterStyles[filter],
                    `brightness(${brightness}%)`,
                    `contrast(${contrast}%)`,
                    `saturate(${saturation}%)`,
                  ].filter(Boolean).join(' '),
                },
              }}
            />
          </div>

          <div className="glass rounded-xl p-4 space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium flex items-center gap-2">
                  <Icon name="ZoomIn" size={16} />
                  Масштаб
                </label>
                <span className="text-sm text-muted-foreground">{Math.round(zoom * 100)}%</span>
              </div>
              <Slider
                value={[zoom]}
                onValueChange={(val) => setZoom(val[0])}
                min={1}
                max={3}
                step={0.1}
                className="w-full"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium flex items-center gap-2">
                  <Icon name="RotateCw" size={16} />
                  Поворот
                </label>
                <span className="text-sm text-muted-foreground">{rotation}°</span>
              </div>
              <Slider
                value={[rotation]}
                onValueChange={(val) => setRotation(val[0])}
                min={0}
                max={360}
                step={15}
                className="w-full"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium flex items-center gap-2">
                  <Icon name="Sun" size={16} />
                  Яркость
                </label>
                <span className="text-sm text-muted-foreground">{brightness}%</span>
              </div>
              <Slider
                value={[brightness]}
                onValueChange={(val) => setBrightness(val[0])}
                min={50}
                max={150}
                step={5}
                className="w-full"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium flex items-center gap-2">
                  <Icon name="Circle" size={16} />
                  Контраст
                </label>
                <span className="text-sm text-muted-foreground">{contrast}%</span>
              </div>
              <Slider
                value={[contrast]}
                onValueChange={(val) => setContrast(val[0])}
                min={50}
                max={150}
                step={5}
                className="w-full"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium flex items-center gap-2">
                  <Icon name="Droplet" size={16} />
                  Насыщенность
                </label>
                <span className="text-sm text-muted-foreground">{saturation}%</span>
              </div>
              <Slider
                value={[saturation]}
                onValueChange={(val) => setSaturation(val[0])}
                min={0}
                max={200}
                step={10}
                className="w-full"
              />
            </div>
          </div>

          <div className="glass rounded-xl p-4">
            <label className="text-sm font-medium mb-3 block flex items-center gap-2">
              <Icon name="Palette" size={16} />
              Фильтры
            </label>
            <div className="grid grid-cols-4 gap-2">
              {filters.map((f) => (
                <button
                  key={f.name}
                  onClick={() => setFilter(f.name)}
                  className={`p-3 rounded-xl transition-all flex flex-col items-center gap-2 ${
                    filter === f.name
                      ? 'gradient-primary text-white'
                      : 'bg-muted hover:bg-muted/70'
                  }`}
                >
                  <Icon name={f.icon} size={20} />
                  <span className="text-xs font-medium">{f.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={resetAll}
              className="flex-1"
            >
              <Icon name="RotateCcw" size={18} className="mr-2" />
              Сбросить
            </Button>
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1"
            >
              <Icon name="X" size={18} className="mr-2" />
              Отмена
            </Button>
            <Button
              onClick={handleSave}
              className="flex-1 gradient-primary"
            >
              <Icon name="Check" size={18} className="mr-2" />
              Сохранить
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
