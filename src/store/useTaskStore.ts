import { create } from 'zustand';

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  status: 'todo' | 'in-progress' | 'done';
  assignedUsers: string[];
  comments: number;
  attachments: number;
  createdAt: string;
  updatedAt: string;
}

interface TaskFormData {
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  assignedUsers: string[];
}

interface TaskStore {
  // Estado das tarefas
  tasks: Task[];
  
  // Ações das tarefas
  addTask: (formData: TaskFormData) => void;
  updateTask: (id: string, formData: Partial<TaskFormData>) => void;
  deleteTask: (id: string) => void;
  moveTask: (taskId: string, newStatus: Task['status']) => void;
  getTasksByStatus: (status: Task['status']) => Task[];
  getTask: (id: string) => Task | undefined;
}

export const useTaskStore = create<TaskStore>((set, get) => ({
  // Estado inicial com tarefas de exemplo
  tasks: [
    {
      id: '1',
      title: 'Design Landing Page Hero',
      description: 'Create a clean and engaging hero section for the landing page with modern design principles',
      priority: 'high',
      status: 'todo',
      assignedUsers: ['user1', 'user2'],
      comments: 12,
      attachments: 8,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: '2',
      title: 'Write Blog Article Draft',
      description: 'Initial draft for "Top 10 UI Trends in 2024" article with research and examples',
      priority: 'low',
      status: 'todo',
      assignedUsers: ['user3'],
      comments: 4,
      attachments: 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: '3',
      title: 'Implement User Authentication',
      description: 'Set up secure user authentication system with JWT tokens and password hashing',
      priority: 'high',
      status: 'in-progress',
      assignedUsers: ['user1'],
      comments: 8,
      attachments: 3,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: '4',
      title: 'Database Schema Design',
      description: 'Design and implement the database schema for the application',
      priority: 'medium',
      status: 'done',
      assignedUsers: ['user2', 'user3'],
      comments: 15,
      attachments: 5,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ],

  // Ações das tarefas
  addTask: (formData: TaskFormData) => {
    const newTask: Task = {
      id: Date.now().toString(),
      title: formData.title,
      description: formData.description,
      priority: formData.priority,
      status: 'todo',
      assignedUsers: formData.assignedUsers,
      comments: 0,
      attachments: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    set((state) => ({
      tasks: [...state.tasks, newTask],
    }));

    console.log('Tarefa adicionada:', newTask);
  },

  updateTask: (id: string, formData: Partial<TaskFormData>) => {
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id
          ? {
              ...task,
              ...formData,
              updatedAt: new Date().toISOString(),
            }
          : task
      ),
    }));
  },

  deleteTask: (id: string) => {
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== id),
    }));
  },

  moveTask: (taskId: string, newStatus: Task['status']) => {
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              status: newStatus,
              updatedAt: new Date().toISOString(),
            }
          : task
      ),
    }));
  },

  getTasksByStatus: (status: Task['status']) => {
    const state = get();
    return state.tasks.filter((task) => task.status === status);
  },

  getTask: (id: string) => {
    const state = get();
    return state.tasks.find((task) => task.id === id);
  },
}));
