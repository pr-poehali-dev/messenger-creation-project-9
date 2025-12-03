import { useState, useEffect } from 'react';
import { Project } from './types';
import { useProjectStore } from './store/projectStore';
import Dashboard from './components/screens/Dashboard';
import Editor from './components/screens/Editor';

export default function App() {
  const [screen, setScreen] = useState<'dashboard' | 'editor'>('dashboard');
  const [projects, setProjects] = useState<Project[]>([]);
  const { setProject } = useProjectStore();

  useEffect(() => {
    const saved = localStorage.getItem('website-builder-projects');
    if (saved) {
      setProjects(JSON.parse(saved));
    }
  }, []);

  const saveProjects = (updatedProjects: Project[]) => {
    setProjects(updatedProjects);
    localStorage.setItem('website-builder-projects', JSON.stringify(updatedProjects));
  };

  const handleCreateProject = (name: string, template?: any) => {
    const newProject: Project = {
      id: `project-${Date.now()}`,
      name,
      description: template ? `На основе шаблона ${template.name}` : 'Новый проект',
      pages: template ? template.pages : [
        {
          id: 'page-1',
          name: 'Главная',
          path: '/',
          components: []
        }
      ],
      theme: {
        primaryColor: '#4f46e5',
        secondaryColor: '#10b981',
        fontFamily: 'system-ui, sans-serif'
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const updatedProjects = [...projects, newProject];
    saveProjects(updatedProjects);
    setProject(newProject);
    setScreen('editor');
  };

  const handleOpenProject = (project: Project) => {
    setProject(project);
    setScreen('editor');
  };

  const handleBackToDashboard = () => {
    const currentProject = useProjectStore.getState().currentProject;
    if (currentProject) {
      const updatedProjects = projects.map(p =>
        p.id === currentProject.id ? currentProject : p
      );
      saveProjects(updatedProjects);
    }
    setScreen('dashboard');
  };

  if (screen === 'editor') {
    return <Editor onBack={handleBackToDashboard} />;
  }

  return (
    <Dashboard
      onCreateProject={handleCreateProject}
      onOpenProject={handleOpenProject}
      projects={projects}
    />
  );
}
