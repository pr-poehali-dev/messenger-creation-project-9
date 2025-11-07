import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';
import { useImageEditor } from './ImageEditor/useImageEditor';
import EditorPreview from './ImageEditor/EditorPreview';
import FilterTab from './ImageEditor/FilterTab';
import TextTab from './ImageEditor/TextTab';
import StickerTab from './ImageEditor/StickerTab';
import DrawTab from './ImageEditor/DrawTab';

type ImageEditorDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  imageUrl: string;
  onSave: (editedFile: File) => void;
};

export default function ImageEditorDialog({ open, onOpenChange, imageUrl, onSave }: ImageEditorDialogProps) {
  const { toast } = useToast();
  const editor = useImageEditor(imageUrl);

  const handleSave = async () => {
    try {
      const croppedBlob = await editor.getCroppedImg();
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
          <EditorPreview
            imageUrl={imageUrl}
            crop={editor.crop}
            zoom={editor.zoom}
            rotation={editor.rotation}
            filter={editor.filter}
            brightness={editor.brightness}
            contrast={editor.contrast}
            saturation={editor.saturation}
            textOverlays={editor.textOverlays}
            stickerOverlays={editor.stickerOverlays}
            drawingPaths={editor.drawingPaths}
            currentPath={editor.currentPath}
            isDrawing={editor.isDrawing}
            drawColor={editor.drawColor}
            drawWidth={editor.drawWidth}
            activeTab={editor.activeTab}
            onCropChange={editor.setCrop}
            onZoomChange={editor.setZoom}
            onCropComplete={editor.onCropComplete}
            onTextMouseDown={editor.handleTextMouseDown}
            onStickerMouseDown={editor.handleStickerMouseDown}
            onDeleteText={editor.handleDeleteText}
            onDeleteSticker={editor.handleDeleteSticker}
            onMouseMove={editor.handleMouseMove}
            onMouseUp={editor.handleMouseUp}
            onDrawStart={editor.handleDrawStart}
            onDrawMove={editor.handleDrawMove}
            onDrawEnd={editor.handleDrawEnd}
          />

          <div className="glass rounded-xl p-3">
            <div className="flex gap-2">
              <Button
                variant={editor.activeTab === 'filters' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => editor.setActiveTab('filters')}
                className={editor.activeTab === 'filters' ? 'gradient-primary' : ''}
              >
                <Icon name="Palette" size={16} className="mr-2" />
                Фильтры
              </Button>
              <Button
                variant={editor.activeTab === 'text' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => editor.setActiveTab('text')}
                className={editor.activeTab === 'text' ? 'gradient-primary' : ''}
              >
                <Icon name="Type" size={16} className="mr-2" />
                Текст
              </Button>
              <Button
                variant={editor.activeTab === 'stickers' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => editor.setActiveTab('stickers')}
                className={editor.activeTab === 'stickers' ? 'gradient-primary' : ''}
              >
                <Icon name="Smile" size={16} className="mr-2" />
                Стикеры
              </Button>
              <Button
                variant={editor.activeTab === 'draw' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => editor.setActiveTab('draw')}
                className={editor.activeTab === 'draw' ? 'gradient-primary' : ''}
              >
                <Icon name="Brush" size={16} className="mr-2" />
                Рисование
              </Button>
            </div>
          </div>

          {editor.activeTab === 'filters' && (
            <FilterTab
              zoom={editor.zoom}
              rotation={editor.rotation}
              brightness={editor.brightness}
              contrast={editor.contrast}
              saturation={editor.saturation}
              filter={editor.filter}
              onZoomChange={editor.setZoom}
              onRotationChange={editor.setRotation}
              onBrightnessChange={editor.setBrightness}
              onContrastChange={editor.setContrast}
              onSaturationChange={editor.setSaturation}
              onFilterChange={editor.setFilter}
            />
          )}

          {editor.activeTab === 'text' && (
            <TextTab
              newText={editor.newText}
              textColor={editor.textColor}
              textSize={editor.textSize}
              textOverlays={editor.textOverlays}
              onNewTextChange={editor.setNewText}
              onTextColorChange={editor.setTextColor}
              onTextSizeChange={editor.setTextSize}
              onAddText={editor.handleAddText}
              onDeleteText={editor.handleDeleteText}
            />
          )}

          {editor.activeTab === 'stickers' && (
            <StickerTab
              stickerOverlays={editor.stickerOverlays}
              onAddSticker={editor.handleAddSticker}
              onDeleteSticker={editor.handleDeleteSticker}
            />
          )}

          {editor.activeTab === 'draw' && (
            <DrawTab
              drawColor={editor.drawColor}
              drawWidth={editor.drawWidth}
              drawTool={editor.drawTool}
              drawingPaths={editor.drawingPaths}
              onDrawColorChange={editor.setDrawColor}
              onDrawWidthChange={editor.setDrawWidth}
              onDrawToolChange={editor.setDrawTool}
              onDeletePath={editor.handleDeletePath}
              onClearDrawing={editor.handleClearDrawing}
            />
          )}

          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={editor.resetAll}
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