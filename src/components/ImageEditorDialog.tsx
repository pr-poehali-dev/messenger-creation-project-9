import { useState, useCallback, useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';
import Cropper from 'react-easy-crop';
import { useToast } from '@/hooks/use-toast';

type TextOverlay = {
  id: string;
  text: string;
  x: number;
  y: number;
  fontSize: number;
  color: string;
  fontWeight: 'normal' | 'bold';
};

type StickerOverlay = {
  id: string;
  emoji: string;
  x: number;
  y: number;
  size: number;
};

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
  const previewRef = useRef<HTMLDivElement>(null);
  
  const [textOverlays, setTextOverlays] = useState<TextOverlay[]>([]);
  const [stickerOverlays, setStickerOverlays] = useState<StickerOverlay[]>([]);
  const [activeTab, setActiveTab] = useState<'filters' | 'text' | 'stickers'>('filters');
  const [newText, setNewText] = useState('');
  const [textColor, setTextColor] = useState('#ffffff');
  const [textSize, setTextSize] = useState(32);
  const [selectedTextId, setSelectedTextId] = useState<string | null>(null);
  const [selectedStickerId, setSelectedStickerId] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

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

      ctx.filter = 'none';

      textOverlays.forEach(overlay => {
        ctx.font = `${overlay.fontWeight} ${overlay.fontSize}px Arial`;
        ctx.fillStyle = overlay.color;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.strokeStyle = 'rgba(0, 0, 0, 0.5)';
        ctx.lineWidth = 2;
        ctx.strokeText(overlay.text, overlay.x, overlay.y);
        ctx.fillText(overlay.text, overlay.x, overlay.y);
      });

      stickerOverlays.forEach(overlay => {
        ctx.font = `${overlay.size}px Arial`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(overlay.emoji, overlay.x, overlay.y);
      });

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

  const handleAddText = () => {
    if (!newText.trim()) return;
    const overlay: TextOverlay = {
      id: Date.now().toString(),
      text: newText,
      x: 250,
      y: 200,
      fontSize: textSize,
      color: textColor,
      fontWeight: 'bold',
    };
    setTextOverlays(prev => [...prev, overlay]);
    setNewText('');
    toast({
      title: "Текст добавлен",
      description: "Перетащите текст на нужное место",
    });
  };

  const handleAddSticker = (emoji: string) => {
    const overlay: StickerOverlay = {
      id: Date.now().toString(),
      emoji,
      x: 250,
      y: 200,
      size: 48,
    };
    setStickerOverlays(prev => [...prev, overlay]);
    toast({
      title: "Стикер добавлен",
      description: "Перетащите стикер на нужное место",
    });
  };

  const handleTextMouseDown = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const overlay = textOverlays.find(o => o.id === id);
    if (!overlay) return;
    setSelectedTextId(id);
    setIsDragging(true);
    setDragOffset({ x: e.clientX - overlay.x, y: e.clientY - overlay.y });
  };

  const handleStickerMouseDown = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const overlay = stickerOverlays.find(o => o.id === id);
    if (!overlay) return;
    setSelectedStickerId(id);
    setIsDragging(true);
    setDragOffset({ x: e.clientX - overlay.x, y: e.clientY - overlay.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    
    if (selectedTextId) {
      setTextOverlays(prev => prev.map(overlay => 
        overlay.id === selectedTextId
          ? { ...overlay, x: e.clientX - dragOffset.x, y: e.clientY - dragOffset.y }
          : overlay
      ));
    }
    
    if (selectedStickerId) {
      setStickerOverlays(prev => prev.map(overlay => 
        overlay.id === selectedStickerId
          ? { ...overlay, x: e.clientX - dragOffset.x, y: e.clientY - dragOffset.y }
          : overlay
      ));
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setSelectedTextId(null);
    setSelectedStickerId(null);
  };

  const handleDeleteText = (id: string) => {
    setTextOverlays(prev => prev.filter(o => o.id !== id));
  };

  const handleDeleteSticker = (id: string) => {
    setStickerOverlays(prev => prev.filter(o => o.id !== id));
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
    setTextOverlays([]);
    setStickerOverlays([]);
  };

  const stickers = [
    '😀', '😂', '🥰', '😎', '🤔', '😱', '🔥', '❤️', '💯', '✨', '🎉', '👍',
    '👏', '🙌', '💪', '🚀', '⭐', '🌈', '☀️', '🌙', '💕', '💖', '🎈', '🎊'
  ];

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
          <div 
            ref={previewRef}
            className="relative h-96 bg-black rounded-xl overflow-hidden"
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
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
            
            {textOverlays.map(overlay => (
              <div
                key={overlay.id}
                className="absolute cursor-move select-none group"
                style={{
                  left: overlay.x,
                  top: overlay.y,
                  transform: 'translate(-50%, -50%)',
                  fontSize: overlay.fontSize,
                  color: overlay.color,
                  fontWeight: overlay.fontWeight,
                  textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                }}
                onMouseDown={(e) => handleTextMouseDown(overlay.id, e)}
              >
                {overlay.text}
                <button
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteText(overlay.id);
                  }}
                >
                  ×
                </button>
              </div>
            ))}
            
            {stickerOverlays.map(overlay => (
              <div
                key={overlay.id}
                className="absolute cursor-move select-none group"
                style={{
                  left: overlay.x,
                  top: overlay.y,
                  transform: 'translate(-50%, -50%)',
                  fontSize: overlay.size,
                }}
                onMouseDown={(e) => handleStickerMouseDown(overlay.id, e)}
              >
                {overlay.emoji}
                <button
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteSticker(overlay.id);
                  }}
                >
                  ×
                </button>
              </div>
            ))}
          </div>

          <div className="glass rounded-xl p-3">
            <div className="flex gap-2">
              <Button
                variant={activeTab === 'filters' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setActiveTab('filters')}
                className={activeTab === 'filters' ? 'gradient-primary' : ''}
              >
                <Icon name="Palette" size={16} className="mr-2" />
                Фильтры
              </Button>
              <Button
                variant={activeTab === 'text' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setActiveTab('text')}
                className={activeTab === 'text' ? 'gradient-primary' : ''}
              >
                <Icon name="Type" size={16} className="mr-2" />
                Текст
              </Button>
              <Button
                variant={activeTab === 'stickers' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setActiveTab('stickers')}
                className={activeTab === 'stickers' ? 'gradient-primary' : ''}
              >
                <Icon name="Smile" size={16} className="mr-2" />
                Стикеры
              </Button>
            </div>
          </div>

          {activeTab === 'filters' && (
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
          )}

          {activeTab === 'filters' && (
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
          )}

          {activeTab === 'text' && (
            <div className="glass rounded-xl p-4 space-y-4">
              <div className="space-y-3">
                <div className="flex gap-2">
                  <Input
                    placeholder="Введите текст..."
                    value={newText}
                    onChange={(e) => setNewText(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleAddText()}
                    className="flex-1"
                  />
                  <Button onClick={handleAddText} className="gradient-primary">
                    <Icon name="Plus" size={18} />
                  </Button>
                </div>
                
                <div className="flex gap-3 items-center">
                  <div className="flex-1">
                    <label className="text-sm font-medium mb-2 block">Размер текста</label>
                    <Slider
                      value={[textSize]}
                      onValueChange={(val) => setTextSize(val[0])}
                      min={16}
                      max={72}
                      step={4}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Цвет</label>
                    <input
                      type="color"
                      value={textColor}
                      onChange={(e) => setTextColor(e.target.value)}
                      className="w-12 h-12 rounded-lg cursor-pointer"
                    />
                  </div>
                </div>

                {textOverlays.length > 0 && (
                  <div className="mt-4">
                    <p className="text-sm text-muted-foreground mb-2">Добавленные тексты:</p>
                    <div className="space-y-2">
                      {textOverlays.map(overlay => (
                        <div key={overlay.id} className="flex items-center justify-between p-2 bg-muted rounded-lg">
                          <span className="text-sm truncate flex-1">{overlay.text}</span>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleDeleteText(overlay.id)}
                          >
                            <Icon name="Trash2" size={14} />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'stickers' && (
            <div className="glass rounded-xl p-4">
              <p className="text-sm font-medium mb-3">Выберите стикер</p>
              <div className="grid grid-cols-6 gap-2 max-h-64 overflow-y-auto">
                {stickers.map((emoji, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleAddSticker(emoji)}
                    className="text-4xl p-3 rounded-xl hover:bg-muted transition-all hover:scale-110"
                  >
                    {emoji}
                  </button>
                ))}
              </div>
              {stickerOverlays.length > 0 && (
                <div className="mt-4">
                  <p className="text-sm text-muted-foreground mb-2">Добавленные стикеры:</p>
                  <div className="flex flex-wrap gap-2">
                    {stickerOverlays.map(overlay => (
                      <button
                        key={overlay.id}
                        onClick={() => handleDeleteSticker(overlay.id)}
                        className="text-2xl p-2 bg-muted rounded-lg hover:bg-destructive/20 transition-all"
                        title="Нажмите для удаления"
                      >
                        {overlay.emoji}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

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