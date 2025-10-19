import { create } from 'zustand';

export interface Project {
  id: string;
  name: string;
  description: string;
  leader: string;
  status: 'planejamento' | 'em-andamento' | 'concluido' | 'pausado';
  startDate: string;
  deliveryDate: string;
  createdAt: string;
  updatedAt: string;
}

interface ProjectFormData {
  projectName: string;
  description: string;
  projectLeader: string;
  status: string;
  startDate: string;
  deliveryDate: string;
}

interface ProjectStore {
  // Estado dos drawers
  isProjectsDrawerOpen: boolean;
  
  // Lista de projetos
  projects: Project[];
  
  // Ações dos drawers
  openProjectsDrawer: () => void;
  closeProjectsDrawer: () => void;
  
  // Ações dos projetos
  saveProject: (formData: ProjectFormData) => void;
  updateProject: (id: string, formData: ProjectFormData) => void;
  deleteProject: (id: string) => void;
  getProject: (id: string) => Project | undefined;
}

export const useProjectStore = create<ProjectStore>((set, get) => ({
  // Estado inicial
  isProjectsDrawerOpen: false,
  projects: [],

  // Ações dos drawers
  openProjectsDrawer: () => set({ isProjectsDrawerOpen: true }),
  closeProjectsDrawer: () => set({ isProjectsDrawerOpen: false }),

  // Ações dos projetos
  saveProject: (formData: ProjectFormData) => {
    const newProject: Project = {
      id: Date.now().toString(),
      name: formData.projectName,
      description: formData.description,
      leader: formData.projectLeader,
      status: formData.status as Project['status'],
      startDate: formData.startDate,
      deliveryDate: formData.deliveryDate,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    set((state) => ({
      projects: [...state.projects, newProject],
    }));

    console.log('Projeto salvo:', newProject);
  },

  updateProject: (id: string, formData: ProjectFormData) => {
    set((state) => ({
      projects: state.projects.map((project) =>
        project.id === id
          ? {
              ...project,
              name: formData.projectName,
              description: formData.description,
              leader: formData.projectLeader,
              status: formData.status as Project['status'],
              startDate: formData.startDate,
              deliveryDate: formData.deliveryDate,
              updatedAt: new Date().toISOString(),
            }
          : project
      ),
    }));
  },

  deleteProject: (id: string) => {
    set((state) => ({
      projects: state.projects.filter((project) => project.id !== id),
    }));
  },

  getProject: (id: string) => {
    const state = get();
    return state.projects.find((project) => project.id === id);
  },
}));
