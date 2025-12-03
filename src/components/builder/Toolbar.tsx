import { Button } from '../ui/button';
import Icon from '../ui/icon';

interface ToolbarProps {
  onAddBlock: (type: string) => void;
  onPreview: () => void;
  onSave: () => void;
  onExport: () => void;
}

export default function Toolbar({ onAddBlock, onPreview, onSave, onExport }: ToolbarProps) {
  const blockTypes = [
    { type: 'hero', icon: 'Layout', label: 'Hero' },
    { type: 'text', icon: 'Type', label: 'Текст' },
    { type: 'image', icon: 'Image', label: 'Изображение' },
    { type: 'features', icon: 'Grid3x3', label: 'Преимущества' },
    { type: 'gallery', icon: 'Images', label: 'Галерея' },
    { type: 'form', icon: 'FileText', label: 'Форма' },
    { type: 'cta', icon: 'Megaphone', label: 'CTA' },
    { type: 'footer', icon: 'PanelBottom', label: 'Футер' }
  ];

  return (
    <div className="bg-white border-b border-gray-200 p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-bold text-gray-800 mr-4">Блоки</h2>
          <div className="flex gap-2 flex-wrap">
            {blockTypes.map((block) => (
              <Button
                key={block.type}
                variant="outline"
                size="sm"
                onClick={() => onAddBlock(block.type)}
                className="gap-2"
              >
                <Icon name={block.icon as any} size={16} />
                {block.label}
              </Button>
            ))}
          </div>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={onPreview}>
            <Icon name="Eye" size={16} className="mr-2" />
            Просмотр
          </Button>
          <Button variant="outline" size="sm" onClick={onSave}>
            <Icon name="Save" size={16} className="mr-2" />
            Сохранить
          </Button>
          <Button size="sm" onClick={onExport}>
            <Icon name="Download" size={16} className="mr-2" />
            Экспорт
          </Button>
        </div>
      </div>
    </div>
  );
}
