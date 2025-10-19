import { create } from 'zustand';

export interface Activity {
  id: string;
  title: string;
  description: string;
  responsible: string;
  priority: 'baixa' | 'media' | 'alta' | 'urgente';
  status: 'pendente' | 'em-andamento' | 'concluida' | 'cancelada';
  dueDate: string;
  createdAt: string;
  updatedAt: string;
}

interface ActivityFormData {
  title: string;
  description: string;
  responsible: string;
  priority: string;
  status: string;
  dueDate: string;
}

interface ActivityStore {
  // Estado dos drawers
  isActivitiesDrawerOpen: boolean;
  
  // Lista de atividades
  activities: Activity[];
  
  // Ações dos drawers
  openActivitiesDrawer: () => void;
  closeActivitiesDrawer: () => void;
  
  // Ações das atividades
  saveActivity: (formData: ActivityFormData) => void;
  updateActivity: (id: string, formData: ActivityFormData) => void;
  deleteActivity: (id: string) => void;
  getActivity: (id: string) => Activity | undefined;
}

export const useActivityStore = create<ActivityStore>((set, get) => ({
  // Estado inicial
  isActivitiesDrawerOpen: false,
  activities: [],

  // Ações dos drawers
  openActivitiesDrawer: () => set({ isActivitiesDrawerOpen: true }),
  closeActivitiesDrawer: () => set({ isActivitiesDrawerOpen: false }),

  // Ações das atividades
  saveActivity: (formData: ActivityFormData) => {
    const newActivity: Activity = {
      id: Date.now().toString(),
      title: formData.title,
      description: formData.description,
      responsible: formData.responsible,
      priority: formData.priority as Activity['priority'],
      status: formData.status as Activity['status'],
      dueDate: formData.dueDate,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    set((state) => ({
      activities: [...state.activities, newActivity],
    }));

    console.log('Atividade salva:', newActivity);
  },

  updateActivity: (id: string, formData: ActivityFormData) => {
    set((state) => ({
      activities: state.activities.map((activity) =>
        activity.id === id
          ? {
              ...activity,
              title: formData.title,
              description: formData.description,
              responsible: formData.responsible,
              priority: formData.priority as Activity['priority'],
              status: formData.status as Activity['status'],
              dueDate: formData.dueDate,
              updatedAt: new Date().toISOString(),
            }
          : activity
      ),
    }));
  },

  deleteActivity: (id: string) => {
    set((state) => ({
      activities: state.activities.filter((activity) => activity.id !== id),
    }));
  },

  getActivity: (id: string) => {
    const state = get();
    return state.activities.find((activity) => activity.id === id);
  },
}));
