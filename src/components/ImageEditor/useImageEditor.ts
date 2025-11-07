import { useState, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import type { TextOverlay, StickerOverlay, Filter, EditorTab, DrawingPath, DrawingPoint } from './types';
import { filterStyles } from './types';

export function useImageEditor(imageUrl: string) {
  const { toast } = useToast();
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);
  const [filter, setFilter] = useState<Filter>('none');
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [saturation, setSaturation] = useState(100);

  const [textOverlays, setTextOverlays] = useState<TextOverlay[]>([]);
  const [stickerOverlays, setStickerOverlays] = useState<StickerOverlay[]>([]);
  const [drawingPaths, setDrawingPaths] = useState<DrawingPath[]>([]);
  const [activeTab, setActiveTab] = useState<EditorTab>('filters');
  const [newText, setNewText] = useState('');
  const [textColor, setTextColor] = useState('#ffffff');
  const [textSize, setTextSize] = useState(32);
  const [selectedTextId, setSelectedTextId] = useState<string | null>(null);
  const [selectedStickerId, setSelectedStickerId] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentPath, setCurrentPath] = useState<DrawingPoint[]>([]);
  const [drawColor, setDrawColor] = useState('#ff0000');
  const [drawWidth, setDrawWidth] = useState(5);
  const [drawTool, setDrawTool] = useState<'brush' | 'pen'>('brush');

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

      drawingPaths.forEach(path => {
        if (path.points.length < 2) return;
        ctx.strokeStyle = path.color;
        ctx.lineWidth = path.width;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.beginPath();
        ctx.moveTo(path.points[0].x, path.points[0].y);
        for (let i = 1; i < path.points.length; i++) {
          ctx.lineTo(path.points[i].x, path.points[i].y);
        }
        ctx.stroke();
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

  const handleDrawStart = (e: React.MouseEvent<HTMLDivElement>) => {
    if (activeTab !== 'draw') return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setIsDrawing(true);
    setCurrentPath([{ x, y }]);
  };

  const handleDrawMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDrawing || activeTab !== 'draw') return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setCurrentPath(prev => [...prev, { x, y }]);
  };

  const handleDrawEnd = () => {
    if (!isDrawing || currentPath.length < 2) {
      setIsDrawing(false);
      setCurrentPath([]);
      return;
    }
    const newPath: DrawingPath = {
      id: Date.now().toString(),
      points: currentPath,
      color: drawColor,
      width: drawWidth,
      tool: drawTool,
    };
    setDrawingPaths(prev => [...prev, newPath]);
    setIsDrawing(false);
    setCurrentPath([]);
  };

  const handleDeletePath = (id: string) => {
    setDrawingPaths(prev => prev.filter(p => p.id !== id));
  };

  const handleClearDrawing = () => {
    setDrawingPaths([]);
    toast({
      title: "Рисунок очищен",
      description: "Все линии удалены",
    });
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
    setDrawingPaths([]);
  };

  return {
    crop,
    zoom,
    rotation,
    filter,
    brightness,
    contrast,
    saturation,
    textOverlays,
    stickerOverlays,
    drawingPaths,
    currentPath,
    isDrawing,
    drawColor,
    drawWidth,
    drawTool,
    activeTab,
    newText,
    textColor,
    textSize,
    setCrop,
    setZoom,
    setRotation,
    setFilter,
    setBrightness,
    setContrast,
    setSaturation,
    setActiveTab,
    setNewText,
    setTextColor,
    setTextSize,
    setDrawColor,
    setDrawWidth,
    setDrawTool,
    onCropComplete,
    getCroppedImg,
    handleAddText,
    handleAddSticker,
    handleTextMouseDown,
    handleStickerMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleDeleteText,
    handleDeleteSticker,
    handleDrawStart,
    handleDrawMove,
    handleDrawEnd,
    handleDeletePath,
    handleClearDrawing,
    resetAll,
  };
}