import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import Icon from '@/components/ui/icon';
import type { TextOverlay } from './types';

type TextTabProps = {
  newText: string;
  textColor: string;
  textSize: number;
  textOverlays: TextOverlay[];
  onNewTextChange: (text: string) => void;
  onTextColorChange: (color: string) => void;
  onTextSizeChange: (size: number) => void;
  onAddText: () => void;
  onDeleteText: (id: string) => void;
};

export default function TextTab({
  newText,
  textColor,
  textSize,
  textOverlays,
  onNewTextChange,
  onTextColorChange,
  onTextSizeChange,
  onAddText,
  onDeleteText,
}: TextTabProps) {
  return (
    <div className="glass rounded-xl p-4 space-y-4">
      <div className="space-y-3">
        <div className="flex gap-2">
          <Input
            placeholder="Введите текст..."
            value={newText}
            onChange={(e) => onNewTextChange(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && onAddText()}
            className="flex-1"
          />
          <Button onClick={onAddText} className="gradient-primary">
            <Icon name="Plus" size={18} />
          </Button>
        </div>

        <div className="flex gap-3 items-center">
          <div className="flex-1">
            <label className="text-sm font-medium mb-2 block">Размер текста</label>
            <Slider
              value={[textSize]}
              onValueChange={(val) => onTextSizeChange(val[0])}
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
              onChange={(e) => onTextColorChange(e.target.value)}
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
                    onClick={() => onDeleteText(overlay.id)}
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
  );
}
