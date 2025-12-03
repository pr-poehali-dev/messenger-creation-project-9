import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import Icon from '../ui/icon';
import { Project } from '../../types';
import { templates } from '../../data/templates';

interface DashboardProps {
  onCreateProject: (name: string, template?: any) => void;
  onOpenProject: (project: Project) => void;
  projects: Project[];
}

export default function Dashboard({ onCreateProject, onOpenProject, projects }: DashboardProps) {
  const [showNewProject, setShowNewProject] = useState(false);
  const [projectName, setProjectName] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

  const handleCreate = () => {
    if (projectName.trim()) {
      const template = templates.find(t => t.id === selectedTemplate);
      onCreateProject(projectName, template);
      setProjectName('');
      setSelectedTemplate(null);
      setShowNewProject(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">🚀 Конструктор сайтов</h1>
              <p className="text-gray-600 mt-1">Создавайте профессиональные сайты без кода</p>
            </div>
            <Button size="lg" onClick={() => setShowNewProject(true)}>
              <Icon name="Plus" size={20} className="mr-2" />
              Новый проект
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 py-12">
        {projects.length === 0 && !showNewProject ? (
          <div className="text-center py-20">
            <div className="text-8xl mb-6">🎨</div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Начните создавать</h2>
            <p className="text-xl text-gray-600 mb-8">
              Создайте свой первый сайт за несколько минут
            </p>
            <Button size="lg" onClick={() => setShowNewProject(true)}>
              <Icon name="Sparkles" size={20} className="mr-2" />
              Создать проект
            </Button>
          </div>
        ) : (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Мои проекты</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow p-6 cursor-pointer"
                  onClick={() => onOpenProject(project)}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-800 mb-2">{project.name}</h3>
                      <p className="text-sm text-gray-600">{project.description}</p>
                    </div>
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-2xl">
                      🌐
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>{project.pages.length} страниц</span>
                    <span>{new Date(project.updatedAt).toLocaleDateString('ru-RU')}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {showNewProject && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-800">Создать новый проект</h2>
              <Button variant="outline" onClick={() => setShowNewProject(false)}>
                <Icon name="X" size={20} />
              </Button>
            </div>

            <div className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Название проекта
                </label>
                <Input
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  placeholder="Мой новый сайт"
                  className="text-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-4">
                  Выберите шаблон или начните с чистого листа
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div
                    className={`border-2 rounded-xl p-4 cursor-pointer transition-all ${
                      selectedTemplate === null
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedTemplate(null)}
                  >
                    <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg mb-3 flex items-center justify-center">
                      <Icon name="FileText" size={48} className="text-gray-400" />
                    </div>
                    <h3 className="font-bold text-gray-800">Пустой проект</h3>
                    <p className="text-sm text-gray-600">Начните с нуля</p>
                  </div>

                  {templates.map((template) => (
                    <div
                      key={template.id}
                      className={`border-2 rounded-xl p-4 cursor-pointer transition-all ${
                        selectedTemplate === template.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => setSelectedTemplate(template.id)}
                    >
                      <div className="aspect-video bg-gray-200 rounded-lg mb-3 overflow-hidden">
                        <img
                          src={template.preview}
                          alt={template.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <h3 className="font-bold text-gray-800">{template.name}</h3>
                      <p className="text-sm text-gray-600">{template.category}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 p-6 flex justify-end gap-3">
              <Button variant="outline" onClick={() => setShowNewProject(false)}>
                Отмена
              </Button>
              <Button onClick={handleCreate} disabled={!projectName.trim()}>
                <Icon name="Rocket" size={18} className="mr-2" />
                Создать проект
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
