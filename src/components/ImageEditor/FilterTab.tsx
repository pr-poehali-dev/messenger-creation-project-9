import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import Icon from '@/components/ui/icon';
import type { Filter } from './types';

type FilterTabProps = {
  zoom: number;
  rotation: number;
  brightness: number;
  contrast: number;
  saturation: number;
  filter: Filter;
  onZoomChange: (value: number) => void;
  onRotationChange: (value: number) => void;
  onBrightnessChange: (value: number) => void;
  onContrastChange: (value: number) => void;
  onSaturationChange: (value: number) => void;
  onFilterChange: (filter: Filter) => void;
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

export default function FilterTab({
  zoom,
  rotation,
  brightness,
  contrast,
  saturation,
  filter,
  onZoomChange,
  onRotationChange,
  onBrightnessChange,
  onContrastChange,
  onSaturationChange,
  onFilterChange,
}: FilterTabProps) {
  return (
    <>
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
            onValueChange={(val) => onZoomChange(val[0])}
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
            onValueChange={(val) => onRotationChange(val[0])}
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
            onValueChange={(val) => onBrightnessChange(val[0])}
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
            onValueChange={(val) => onContrastChange(val[0])}
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
            onValueChange={(val) => onSaturationChange(val[0])}
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
              onClick={() => onFilterChange(f.name)}
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
    </>
  );
}
