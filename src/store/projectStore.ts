import { create } from 'zustand';
import { Project, Page, Component } from '../types';

interface ProjectStore {
  currentProject: Project | null;
  currentPageId: string | null;
  selectedComponentId: string | null;
  
  setProject: (project: Project) => void;
  setCurrentPage: (pageId: string) => void;
  setSelectedComponent: (componentId: string | null) => void;
  
  addComponent: (component: Component) => void;
  updateComponent: (componentId: string, updates: Partial<Component>) => void;
  deleteComponent: (componentId: string) => void;
  moveComponent: (componentId: string, direction: 'up' | 'down') => void;
  
  addPage: (page: Page) => void;
  updatePage: (pageId: string, updates: Partial<Page>) => void;
  deletePage: (pageId: string) => void;
  
  updateTheme: (theme: Partial<Project['theme']>) => void;
}

export const useProjectStore = create<ProjectStore>((set) => ({
  currentProject: null,
  currentPageId: null,
  selectedComponentId: null,

  setProject: (project) => set({ currentProject: project, currentPageId: project.pages[0]?.id }),
  
  setCurrentPage: (pageId) => set({ currentPageId: pageId, selectedComponentId: null }),
  
  setSelectedComponent: (componentId) => set({ selectedComponentId: componentId }),

  addComponent: (component) => set((state) => {
    if (!state.currentProject || !state.currentPageId) return state;
    
    const updatedPages = state.currentProject.pages.map((page) =>
      page.id === state.currentPageId
        ? { ...page, components: [...page.components, component] }
        : page
    );

    return {
      currentProject: {
        ...state.currentProject,
        pages: updatedPages,
        updatedAt: new Date().toISOString(),
      },
    };
  }),

  updateComponent: (componentId, updates) => set((state) => {
    if (!state.currentProject || !state.currentPageId) return state;

    const updatedPages = state.currentProject.pages.map((page) =>
      page.id === state.currentPageId
        ? {
            ...page,
            components: page.components.map((comp) =>
              comp.id === componentId ? { ...comp, ...updates } : comp
            ),
          }
        : page
    );

    return {
      currentProject: {
        ...state.currentProject,
        pages: updatedPages,
        updatedAt: new Date().toISOString(),
      },
    };
  }),

  deleteComponent: (componentId) => set((state) => {
    if (!state.currentProject || !state.currentPageId) return state;

    const updatedPages = state.currentProject.pages.map((page) =>
      page.id === state.currentPageId
        ? { ...page, components: page.components.filter((c) => c.id !== componentId) }
        : page
    );

    return {
      currentProject: {
        ...state.currentProject,
        pages: updatedPages,
        updatedAt: new Date().toISOString(),
      },
      selectedComponentId: state.selectedComponentId === componentId ? null : state.selectedComponentId,
    };
  }),

  moveComponent: (componentId, direction) => set((state) => {
    if (!state.currentProject || !state.currentPageId) return state;

    const page = state.currentProject.pages.find((p) => p.id === state.currentPageId);
    if (!page) return state;

    const index = page.components.findIndex((c) => c.id === componentId);
    if (index === -1) return state;

    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= page.components.length) return state;

    const newComponents = [...page.components];
    [newComponents[index], newComponents[newIndex]] = [newComponents[newIndex], newComponents[index]];

    const updatedPages = state.currentProject.pages.map((p) =>
      p.id === state.currentPageId ? { ...p, components: newComponents } : p
    );

    return {
      currentProject: {
        ...state.currentProject,
        pages: updatedPages,
        updatedAt: new Date().toISOString(),
      },
    };
  }),

  addPage: (page) => set((state) => {
    if (!state.currentProject) return state;

    return {
      currentProject: {
        ...state.currentProject,
        pages: [...state.currentProject.pages, page],
        updatedAt: new Date().toISOString(),
      },
    };
  }),

  updatePage: (pageId, updates) => set((state) => {
    if (!state.currentProject) return state;

    const updatedPages = state.currentProject.pages.map((page) =>
      page.id === pageId ? { ...page, ...updates } : page
    );

    return {
      currentProject: {
        ...state.currentProject,
        pages: updatedPages,
        updatedAt: new Date().toISOString(),
      },
    };
  }),

  deletePage: (pageId) => set((state) => {
    if (!state.currentProject) return state;

    return {
      currentProject: {
        ...state.currentProject,
        pages: state.currentProject.pages.filter((p) => p.id !== pageId),
        updatedAt: new Date().toISOString(),
      },
      currentPageId: state.currentPageId === pageId ? state.currentProject.pages[0]?.id : state.currentPageId,
    };
  }),

  updateTheme: (theme) => set((state) => {
    if (!state.currentProject) return state;

    return {
      currentProject: {
        ...state.currentProject,
        theme: { ...state.currentProject.theme, ...theme },
        updatedAt: new Date().toISOString(),
      },
    };
  }),
}));
