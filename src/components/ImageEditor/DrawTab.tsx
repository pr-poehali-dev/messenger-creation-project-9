import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import Icon from '@/components/ui/icon';
import type { DrawingPath } from './types';

type DrawTabProps = {
  drawColor: string;
  drawWidth: number;
  drawTool: 'brush' | 'pen';
  drawingPaths: DrawingPath[];
  onDrawColorChange: (color: string) => void;
  onDrawWidthChange: (width: number) => void;
  onDrawToolChange: (tool: 'brush' | 'pen') => void;
  onDeletePath: (id: string) => void;
  onClearDrawing: () => void;
};

export default function DrawTab({
  drawColor,
  drawWidth,
  drawTool,
  drawingPaths,
  onDrawColorChange,
  onDrawWidthChange,
  onDrawToolChange,
  onDeletePath,
  onClearDrawing,
}: DrawTabProps) {
  const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff', '#ffffff', '#000000'];

  return (
    <div className="glass rounded-xl p-4 space-y-4">
      <div className="space-y-3">
        <Label>Инструмент</Label>
        <div className="flex gap-2">
          <Button
            variant={drawTool === 'brush' ? 'default' : 'outline'}
            size="sm"
            onClick={() => onDrawToolChange('brush')}
            className={drawTool === 'brush' ? 'gradient-primary' : ''}
          >
            <Icon name="Brush" size={16} className="mr-2" />
            Кисть
          </Button>
          <Button
            variant={drawTool === 'pen' ? 'default' : 'outline'}
            size="sm"
            onClick={() => onDrawToolChange('pen')}
            className={drawTool === 'pen' ? 'gradient-primary' : ''}
          >
            <Icon name="Pen" size={16} className="mr-2" />
            Карандаш
          </Button>
        </div>
      </div>

      <div className="space-y-3">
        <Label>Цвет ({drawColor})</Label>
        <div className="grid grid-cols-8 gap-2">
          {colors.map(color => (
            <button
              key={color}
              onClick={() => onDrawColorChange(color)}
              className={`w-10 h-10 rounded-lg border-2 transition-all hover:scale-110 ${
                drawColor === color ? 'border-primary scale-110' : 'border-border'
              }`}
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
        <div className="flex gap-2">
          <input
            type="color"
            value={drawColor}
            onChange={(e) => onDrawColorChange(e.target.value)}
            className="w-full h-10 rounded-lg border border-border cursor-pointer"
          />
        </div>
      </div>

      <div className="space-y-3">
        <Label>Толщина линии: {drawWidth}px</Label>
        <Slider
          value={[drawWidth]}
          onValueChange={(values) => onDrawWidthChange(values[0])}
          min={1}
          max={20}
          step={1}
          className="w-full"
        />
        <div className="flex justify-center">
          <div 
            className="rounded-full"
            style={{ 
              width: `${drawWidth}px`, 
              height: `${drawWidth}px`, 
              backgroundColor: drawColor 
            }} 
          />
        </div>
      </div>

      {drawingPaths.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label>Линии ({drawingPaths.length})</Label>
            <Button
              size="sm"
              variant="ghost"
              onClick={onClearDrawing}
              className="text-destructive hover:text-destructive"
            >
              <Icon name="Trash2" size={14} className="mr-1" />
              Очистить всё
            </Button>
          </div>
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {drawingPaths.map((path, index) => (
              <div
                key={path.id}
                className="flex items-center justify-between p-2 bg-muted rounded-lg group"
              >
                <div className="flex items-center gap-2">
                  <div
                    className="w-6 h-6 rounded border border-border"
                    style={{ backgroundColor: path.color }}
                  />
                  <span className="text-sm">
                    {path.tool === 'brush' ? '🖌️' : '✏️'} Линия {index + 1} ({path.width}px)
                  </span>
                </div>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => onDeletePath(path.id)}
                  className="h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Icon name="X" size={14} />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="p-3 bg-muted/50 rounded-lg text-sm text-muted-foreground">
        <Icon name="Info" size={14} className="inline mr-1" />
        Нажмите и перетащите курсор по фото для рисования
      </div>
    </div>
  );
}
