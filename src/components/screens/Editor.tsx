import { useState } from 'react';
import { useProjectStore } from '../../store/projectStore';
import { Component } from '../../types';
import { Button } from '../ui/button';
import Icon from '../ui/icon';
import Sidebar from '../editor/Sidebar';
import ComponentRenderer from '../editor/ComponentRenderer';
import PropertyPanel from '../editor/PropertyPanel';

interface EditorProps {
  onBack: () => void;
}

export default function Editor({ onBack }: EditorProps) {
  const {
    currentProject,
    currentPageId,
    selectedComponentId,
    setSelectedComponent,
    addComponent,
    updateComponent,
    deleteComponent,
    moveComponent
  } = useProjectStore();

  const [showPropertyPanel, setShowPropertyPanel] = useState(false);

  if (!currentProject || !currentPageId) return null;

  const currentPage = currentProject.pages.find(p => p.id === currentPageId);
  if (!currentPage) return null;

  const handleAddComponent = (type: Component['type']) => {
    const newComponent: Component = {
      id: `comp-${Date.now()}`,
      type,
      props: getDefaultProps(type),
      styles: {
        backgroundColor: type === 'footer' ? '#1f2937' : '#ffffff',
        textColor: type === 'footer' ? '#ffffff' : '#000000',
        padding: '60px 20px'
      }
    };
    addComponent(newComponent);
  };

  const getDefaultProps = (type: Component['type']) => {
    switch (type) {
      case 'navbar':
        return { logo: '🚀 MySite', links: ['Главная', 'О нас', 'Контакты'] };
      case 'hero':
        return {
          title: 'Заголовок Hero секции',
          subtitle: 'Подзаголовок для вашей страницы',
          buttonText: 'Начать'
        };
      case 'features':
        return {
          title: 'Наши преимущества',
          features: [
            { icon: '⚡', title: 'Быстро', description: 'Высокая скорость работы' },
            { icon: '🔒', title: 'Безопасно', description: 'Защита данных' },
            { icon: '📱', title: 'Удобно', description: 'Простой интерфейс' }
          ]
        };
      case 'cta':
        return {
          title: 'Готовы начать?',
          subtitle: 'Присоединяйтесь к нам прямо сейчас',
          buttonText: 'Начать'
        };
      case 'form':
        return { title: 'Свяжитесь с нами', buttonText: 'Отправить' };
      case 'footer':
        return {
          companyName: 'Моя компания',
          description: 'Описание компании',
          email: 'info@example.com',
          phone: '+7 (XXX) XXX-XX-XX'
        };
      default:
        return { title: 'Заголовок' };
    }
  };

  const handleSave = () => {
    localStorage.setItem('website-builder-project', JSON.stringify(currentProject));
    alert('Проект сохранён!');
  };

  const handleExport = () => {
    const html = generateHTML();
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${currentProject.name}.html`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const generateHTML = () => {
    return `<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${currentProject.name}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: system-ui, -apple-system, sans-serif; }
  </style>
</head>
<body>
  ${currentPage.components.map(c => `<div>${c.type}: ${c.props.title || 'Component'}</div>`).join('\n')}
</body>
</html>`;
  };

  const selectedComponent = currentPage.components.find(c => c.id === selectedComponentId);

  return (
    <div className="flex h-screen">
      <Sidebar onAddComponent={handleAddComponent} />

      <div className="flex-1 flex flex-col">
        <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" onClick={onBack}>
              <Icon name="ArrowLeft" size={18} className="mr-2" />
              Назад
            </Button>
            <div>
              <h1 className="text-xl font-bold text-gray-800">{currentProject.name}</h1>
              <p className="text-sm text-gray-600">{currentPage.name}</p>
            </div>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleSave}>
              <Icon name="Save" size={18} className="mr-2" />
              Сохранить
            </Button>
            <Button size="sm" onClick={handleExport}>
              <Icon name="Download" size={18} className="mr-2" />
              Экспорт HTML
            </Button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto bg-gray-100">
          {currentPage.components.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <div className="text-6xl mb-4">👈</div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  Добавьте первый компонент
                </h2>
                <p className="text-gray-600">
                  Выберите компонент из панели слева
                </p>
              </div>
            </div>
          ) : (
            <div className="max-w-full">
              {currentPage.components.map((component) => (
                <ComponentRenderer
                  key={component.id}
                  component={component}
                  isSelected={component.id === selectedComponentId}
                  onSelect={() => setSelectedComponent(component.id)}
                  onEdit={() => {
                    setSelectedComponent(component.id);
                    setShowPropertyPanel(true);
                  }}
                  onDelete={() => deleteComponent(component.id)}
                  onMoveUp={() => moveComponent(component.id, 'up')}
                  onMoveDown={() => moveComponent(component.id, 'down')}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {showPropertyPanel && selectedComponent && (
        <PropertyPanel
          component={selectedComponent}
          onUpdate={(updates) => updateComponent(selectedComponent.id, updates)}
          onClose={() => setShowPropertyPanel(false)}
        />
      )}
    </div>
  );
}
