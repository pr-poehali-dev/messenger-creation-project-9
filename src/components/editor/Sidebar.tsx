import { Button } from '../ui/button';
import Icon from '../ui/icon';
import { Component } from '../../types';

interface SidebarProps {
  onAddComponent: (type: Component['type']) => void;
}

export default function Sidebar({ onAddComponent }: SidebarProps) {
  const components = [
    { type: 'navbar' as const, icon: 'Menu', label: 'Навигация', color: 'bg-blue-50' },
    { type: 'hero' as const, icon: 'Sparkles', label: 'Hero', color: 'bg-purple-50' },
    { type: 'features' as const, icon: 'Grid3x3', label: 'Преимущества', color: 'bg-green-50' },
    { type: 'pricing' as const, icon: 'DollarSign', label: 'Тарифы', color: 'bg-yellow-50' },
    { type: 'testimonials' as const, icon: 'MessageSquare', label: 'Отзывы', color: 'bg-pink-50' },
    { type: 'gallery' as const, icon: 'Images', label: 'Галерея', color: 'bg-indigo-50' },
    { type: 'form' as const, icon: 'FileText', label: 'Форма', color: 'bg-teal-50' },
    { type: 'cta' as const, icon: 'Megaphone', label: 'Призыв', color: 'bg-orange-50' },
    { type: 'text' as const, icon: 'Type', label: 'Текст', color: 'bg-gray-50' },
    { type: 'image' as const, icon: 'Image', label: 'Изображение', color: 'bg-red-50' },
    { type: 'footer' as const, icon: 'PanelBottom', label: 'Футер', color: 'bg-slate-50' }
  ];

  return (
    <div className="w-80 bg-white border-r border-gray-200 h-screen overflow-y-auto">
      <div className="p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <Icon name="PlusCircle" size={24} />
          Компоненты
        </h2>
        
        <div className="space-y-2">
          {components.map((comp) => (
            <button
              key={comp.type}
              onClick={() => onAddComponent(comp.type)}
              className={`w-full flex items-center gap-3 p-4 rounded-lg ${comp.color} hover:shadow-md transition-all group`}
            >
              <div className="p-2 bg-white rounded-lg group-hover:scale-110 transition-transform">
                <Icon name={comp.icon as any} size={20} className="text-gray-700" />
              </div>
              <span className="font-medium text-gray-800">{comp.label}</span>
            </button>
          ))}
        </div>

        <div className="mt-8 p-4 bg-blue-50 rounded-lg">
          <div className="text-sm text-blue-800">
            <Icon name="Info" size={16} className="inline mr-1" />
            <strong>Совет:</strong> Кликните на компонент, чтобы добавить его на страницу
          </div>
        </div>
      </div>
    </div>
  );
}
