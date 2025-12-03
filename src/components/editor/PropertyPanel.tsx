import { useState } from 'react';
import { Component } from '../../types';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import Icon from '../ui/icon';

interface PropertyPanelProps {
  component: Component | null;
  onUpdate: (updates: Partial<Component>) => void;
  onClose: () => void;
}

export default function PropertyPanel({ component, onUpdate, onClose }: PropertyPanelProps) {
  const [localComponent, setLocalComponent] = useState(component);

  if (!localComponent) return null;

  const updateProp = (key: string, value: any) => {
    const updated = {
      ...localComponent,
      props: { ...localComponent.props, [key]: value }
    };
    setLocalComponent(updated);
  };

  const updateStyle = (key: string, value: string) => {
    const updated = {
      ...localComponent,
      styles: { ...localComponent.styles, [key]: value }
    };
    setLocalComponent(updated);
  };

  const handleSave = () => {
    if (localComponent) {
      onUpdate(localComponent);
      onClose();
    }
  };

  const renderFields = () => {
    switch (localComponent.type) {
      case 'navbar':
        return (
          <>
            <div>
              <label className="block text-sm font-medium mb-2">Логотип</label>
              <Input
                value={localComponent.props.logo || ''}
                onChange={(e) => updateProp('logo', e.target.value)}
                placeholder="🚀 MyBrand"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Ссылки меню (через запятую)</label>
              <Input
                value={(localComponent.props.links || []).join(', ')}
                onChange={(e) => updateProp('links', e.target.value.split(',').map((s: string) => s.trim()))}
                placeholder="Главная, О нас, Контакты"
              />
            </div>
          </>
        );

      case 'hero':
      case 'cta':
        return (
          <>
            <div>
              <label className="block text-sm font-medium mb-2">Заголовок</label>
              <Input
                value={localComponent.props.title || ''}
                onChange={(e) => updateProp('title', e.target.value)}
                placeholder="Заголовок"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Подзаголовок</label>
              <textarea
                value={localComponent.props.subtitle || ''}
                onChange={(e) => updateProp('subtitle', e.target.value)}
                placeholder="Подзаголовок"
                rows={3}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Текст кнопки</label>
              <Input
                value={localComponent.props.buttonText || ''}
                onChange={(e) => updateProp('buttonText', e.target.value)}
                placeholder="Начать"
              />
            </div>
          </>
        );

      case 'features':
        return (
          <>
            <div>
              <label className="block text-sm font-medium mb-2">Заголовок</label>
              <Input
                value={localComponent.props.title || ''}
                onChange={(e) => updateProp('title', e.target.value)}
                placeholder="Наши преимущества"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Количество преимуществ</label>
              <div className="text-sm text-gray-600 mb-2">
                Текущих: {(localComponent.props.features || []).length}
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  const features = [...(localComponent.props.features || [])];
                  features.push({ icon: '⭐', title: 'Новое преимущество', description: 'Описание' });
                  updateProp('features', features);
                }}
              >
                <Icon name="Plus" size={16} className="mr-2" />
                Добавить преимущество
              </Button>
            </div>
          </>
        );

      case 'text':
        return (
          <>
            <div>
              <label className="block text-sm font-medium mb-2">Заголовок</label>
              <Input
                value={localComponent.props.title || ''}
                onChange={(e) => updateProp('title', e.target.value)}
                placeholder="Заголовок"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Содержимое</label>
              <textarea
                value={localComponent.props.content || ''}
                onChange={(e) => updateProp('content', e.target.value)}
                placeholder="Текст содержимого..."
                rows={6}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
          </>
        );

      case 'image':
        return (
          <>
            <div>
              <label className="block text-sm font-medium mb-2">URL изображения</label>
              <Input
                value={localComponent.props.imageUrl || ''}
                onChange={(e) => updateProp('imageUrl', e.target.value)}
                placeholder="https://example.com/image.jpg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Alt текст</label>
              <Input
                value={localComponent.props.alt || ''}
                onChange={(e) => updateProp('alt', e.target.value)}
                placeholder="Описание изображения"
              />
            </div>
          </>
        );

      case 'form':
        return (
          <>
            <div>
              <label className="block text-sm font-medium mb-2">Заголовок</label>
              <Input
                value={localComponent.props.title || ''}
                onChange={(e) => updateProp('title', e.target.value)}
                placeholder="Свяжитесь с нами"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Текст кнопки</label>
              <Input
                value={localComponent.props.buttonText || ''}
                onChange={(e) => updateProp('buttonText', e.target.value)}
                placeholder="Отправить"
              />
            </div>
          </>
        );

      case 'footer':
        return (
          <>
            <div>
              <label className="block text-sm font-medium mb-2">Название компании</label>
              <Input
                value={localComponent.props.companyName || ''}
                onChange={(e) => updateProp('companyName', e.target.value)}
                placeholder="Моя компания"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Описание</label>
              <textarea
                value={localComponent.props.description || ''}
                onChange={(e) => updateProp('description', e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="О компании..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <Input
                value={localComponent.props.email || ''}
                onChange={(e) => updateProp('email', e.target.value)}
                placeholder="info@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Телефон</label>
              <Input
                value={localComponent.props.phone || ''}
                onChange={(e) => updateProp('phone', e.target.value)}
                placeholder="+7 (XXX) XXX-XX-XX"
              />
            </div>
          </>
        );

      default:
        return (
          <div>
            <label className="block text-sm font-medium mb-2">Заголовок</label>
            <Input
              value={localComponent.props.title || ''}
              onChange={(e) => updateProp('title', e.target.value)}
              placeholder="Заголовок"
            />
          </div>
        );
    }
  };

  return (
    <div className="w-96 bg-white border-l border-gray-200 h-screen overflow-y-auto">
      <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between">
        <h2 className="text-lg font-bold text-gray-800">Настройки</h2>
        <Button size="sm" variant="outline" onClick={onClose}>
          <Icon name="X" size={18} />
        </Button>
      </div>

      <div className="p-6 space-y-6">
        <div>
          <h3 className="font-semibold text-gray-700 mb-4 flex items-center gap-2">
            <Icon name="Settings" size={18} />
            Свойства компонента
          </h3>
          <div className="space-y-4">
            {renderFields()}
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-gray-700 mb-4 flex items-center gap-2">
            <Icon name="Palette" size={18} />
            Стили
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Цвет фона</label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={localComponent.styles.backgroundColor || '#ffffff'}
                  onChange={(e) => updateStyle('backgroundColor', e.target.value)}
                  className="w-14 h-10 rounded cursor-pointer"
                />
                <Input
                  value={localComponent.styles.backgroundColor || '#ffffff'}
                  onChange={(e) => updateStyle('backgroundColor', e.target.value)}
                  placeholder="#ffffff"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Цвет текста</label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={localComponent.styles.textColor || '#000000'}
                  onChange={(e) => updateStyle('textColor', e.target.value)}
                  className="w-14 h-10 rounded cursor-pointer"
                />
                <Input
                  value={localComponent.styles.textColor || '#000000'}
                  onChange={(e) => updateStyle('textColor', e.target.value)}
                  placeholder="#000000"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Отступы (padding)</label>
              <Input
                value={localComponent.styles.padding || '60px 20px'}
                onChange={(e) => updateStyle('padding', e.target.value)}
                placeholder="60px 20px"
              />
            </div>
          </div>
        </div>

        <div className="pt-4 border-t">
          <Button onClick={handleSave} className="w-full">
            <Icon name="Save" size={18} className="mr-2" />
            Применить изменения
          </Button>
        </div>
      </div>
    </div>
  );
}
