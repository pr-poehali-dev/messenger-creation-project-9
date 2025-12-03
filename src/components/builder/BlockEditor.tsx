import { useState } from 'react';
import { Block } from '../../types/builder';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import Icon from '../ui/icon';

interface BlockEditorProps {
  block: Block | null;
  onSave: (block: Block) => void;
  onClose: () => void;
}

export default function BlockEditor({ block, onSave, onClose }: BlockEditorProps) {
  const [editedBlock, setEditedBlock] = useState<Block | null>(block);

  if (!editedBlock) return null;

  const handleUpdate = (field: string, value: string) => {
    setEditedBlock({
      ...editedBlock,
      content: {
        ...editedBlock.content,
        [field]: value
      }
    });
  };

  const handleSave = () => {
    if (editedBlock) {
      onSave(editedBlock);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-800">Редактировать блок</h2>
          <Button variant="outline" size="sm" onClick={onClose}>
            <Icon name="X" size={18} />
          </Button>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Заголовок
            </label>
            <Input
              value={editedBlock.content.title || ''}
              onChange={(e) => handleUpdate('title', e.target.value)}
              placeholder="Введите заголовок"
            />
          </div>

          {(editedBlock.type === 'hero' || editedBlock.type === 'cta') && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Подзаголовок
              </label>
              <Input
                value={editedBlock.content.subtitle || ''}
                onChange={(e) => handleUpdate('subtitle', e.target.value)}
                placeholder="Введите подзаголовок"
              />
            </div>
          )}

          {editedBlock.type === 'text' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Текст
              </label>
              <textarea
                value={editedBlock.content.text || ''}
                onChange={(e) => handleUpdate('text', e.target.value)}
                placeholder="Введите текст"
                rows={6}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}

          {(editedBlock.type === 'hero' || editedBlock.type === 'cta' || editedBlock.type === 'form') && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Текст кнопки
              </label>
              <Input
                value={editedBlock.content.buttonText || ''}
                onChange={(e) => handleUpdate('buttonText', e.target.value)}
                placeholder="Введите текст кнопки"
              />
            </div>
          )}

          {(editedBlock.type === 'hero' || editedBlock.type === 'cta') && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ссылка кнопки
              </label>
              <Input
                value={editedBlock.content.buttonLink || ''}
                onChange={(e) => handleUpdate('buttonLink', e.target.value)}
                placeholder="https://example.com"
              />
            </div>
          )}

          {editedBlock.type === 'image' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                URL изображения
              </label>
              <Input
                value={editedBlock.content.imageUrl || ''}
                onChange={(e) => handleUpdate('imageUrl', e.target.value)}
                placeholder="https://example.com/image.jpg"
              />
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Цвет фона
              </label>
              <div className="flex gap-2">
                <Input
                  type="color"
                  value={editedBlock.content.backgroundColor || '#ffffff'}
                  onChange={(e) => handleUpdate('backgroundColor', e.target.value)}
                  className="w-16 h-10"
                />
                <Input
                  type="text"
                  value={editedBlock.content.backgroundColor || '#ffffff'}
                  onChange={(e) => handleUpdate('backgroundColor', e.target.value)}
                  placeholder="#ffffff"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Цвет текста
              </label>
              <div className="flex gap-2">
                <Input
                  type="color"
                  value={editedBlock.content.textColor || '#000000'}
                  onChange={(e) => handleUpdate('textColor', e.target.value)}
                  className="w-16 h-10"
                />
                <Input
                  type="text"
                  value={editedBlock.content.textColor || '#000000'}
                  onChange={(e) => handleUpdate('textColor', e.target.value)}
                  placeholder="#000000"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 p-4 flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>
            Отмена
          </Button>
          <Button onClick={handleSave}>
            <Icon name="Save" size={16} className="mr-2" />
            Сохранить
          </Button>
        </div>
      </div>
    </div>
  );
}
