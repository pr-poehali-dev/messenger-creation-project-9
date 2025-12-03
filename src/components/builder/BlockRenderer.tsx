import { Block } from '../../types/builder';
import { Button } from '../ui/button';
import Icon from '../ui/icon';

interface BlockRendererProps {
  block: Block;
  isEditing: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
  onMoveUp?: () => void;
  onMoveDown?: () => void;
}

export default function BlockRenderer({
  block,
  isEditing,
  onEdit,
  onDelete,
  onMoveUp,
  onMoveDown
}: BlockRendererProps) {
  const renderBlockContent = () => {
    const bg = block.content.backgroundColor || '#ffffff';
    const color = block.content.textColor || '#000000';

    switch (block.type) {
      case 'hero':
        return (
          <div
            className="py-20 px-8 text-center"
            style={{ backgroundColor: bg, color }}
          >
            <h1 className="text-5xl font-bold mb-4">
              {block.content.title || 'Заголовок Hero'}
            </h1>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              {block.content.subtitle || 'Подзаголовок для Hero секции'}
            </p>
            {block.content.buttonText && (
              <Button size="lg">{block.content.buttonText}</Button>
            )}
          </div>
        );

      case 'text':
        return (
          <div
            className="py-12 px-8"
            style={{ backgroundColor: bg, color }}
          >
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold mb-4">
                {block.content.title || 'Заголовок'}
              </h2>
              <p className="text-lg leading-relaxed">
                {block.content.text || 'Текстовое содержимое блока. Добавьте ваш текст здесь.'}
              </p>
            </div>
          </div>
        );

      case 'image':
        return (
          <div
            className="py-12 px-8"
            style={{ backgroundColor: bg }}
          >
            <div className="max-w-4xl mx-auto">
              {block.content.imageUrl ? (
                <img
                  src={block.content.imageUrl}
                  alt={block.content.title || 'Изображение'}
                  className="w-full h-auto rounded-lg shadow-lg"
                />
              ) : (
                <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center">
                  <Icon name="Image" size={64} className="text-gray-400" />
                </div>
              )}
            </div>
          </div>
        );

      case 'features':
        return (
          <div
            className="py-16 px-8"
            style={{ backgroundColor: bg, color }}
          >
            <h2 className="text-3xl font-bold text-center mb-12">
              {block.content.title || 'Наши преимущества'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[1, 2, 3].map((i) => (
                <div key={i} className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon name="CheckCircle" size={32} className="text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Преимущество {i}</h3>
                  <p>Описание преимущества номер {i}</p>
                </div>
              ))}
            </div>
          </div>
        );

      case 'gallery':
        return (
          <div
            className="py-12 px-8"
            style={{ backgroundColor: bg }}
          >
            <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="aspect-square bg-gray-200 rounded-lg" />
              ))}
            </div>
          </div>
        );

      case 'form':
        return (
          <div
            className="py-16 px-8"
            style={{ backgroundColor: bg, color }}
          >
            <div className="max-w-md mx-auto">
              <h2 className="text-3xl font-bold text-center mb-8">
                {block.content.title || 'Свяжитесь с нами'}
              </h2>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Имя"
                  className="w-full px-4 py-2 border rounded-lg"
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full px-4 py-2 border rounded-lg"
                />
                <textarea
                  placeholder="Сообщение"
                  rows={4}
                  className="w-full px-4 py-2 border rounded-lg"
                />
                <Button className="w-full">
                  {block.content.buttonText || 'Отправить'}
                </Button>
              </div>
            </div>
          </div>
        );

      case 'cta':
        return (
          <div
            className="py-16 px-8 text-center"
            style={{ backgroundColor: bg, color }}
          >
            <h2 className="text-4xl font-bold mb-4">
              {block.content.title || 'Готовы начать?'}
            </h2>
            <p className="text-xl mb-8">
              {block.content.subtitle || 'Присоединяйтесь к нам прямо сейчас'}
            </p>
            <Button size="lg">
              {block.content.buttonText || 'Начать'}
            </Button>
          </div>
        );

      case 'footer':
        return (
          <div
            className="py-12 px-8"
            style={{ backgroundColor: bg || '#1f2937', color: color || '#ffffff' }}
          >
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="font-bold mb-4">О компании</h3>
                <p className="text-sm opacity-80">Информация о вашей компании</p>
              </div>
              <div>
                <h3 className="font-bold mb-4">Контакты</h3>
                <p className="text-sm opacity-80">Email: info@example.com</p>
                <p className="text-sm opacity-80">Телефон: +7 (XXX) XXX-XX-XX</p>
              </div>
              <div>
                <h3 className="font-bold mb-4">Социальные сети</h3>
                <div className="flex gap-4">
                  <Icon name="Facebook" size={24} />
                  <Icon name="Twitter" size={24} />
                  <Icon name="Instagram" size={24} />
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return <div>Неизвестный тип блока</div>;
    }
  };

  return (
    <div className={`relative group ${isEditing ? 'ring-2 ring-blue-500' : ''}`}>
      {renderBlockContent()}
      
      {isEditing && (
        <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button size="sm" variant="outline" onClick={onMoveUp}>
            <Icon name="ChevronUp" size={16} />
          </Button>
          <Button size="sm" variant="outline" onClick={onMoveDown}>
            <Icon name="ChevronDown" size={16} />
          </Button>
          <Button size="sm" variant="outline" onClick={onEdit}>
            <Icon name="Edit" size={16} />
          </Button>
          <Button size="sm" variant="outline" onClick={onDelete}>
            <Icon name="Trash2" size={16} />
          </Button>
        </div>
      )}
    </div>
  );
}
