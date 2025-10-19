import { create } from 'zustand';

interface NavigationStore {
  currentPage: string;
  setCurrentPage: (page: string) => void;
}

export const useNavigationStore = create<NavigationStore>((set) => ({
  currentPage: 'dashboard',
  setCurrentPage: (page: string) => set({ currentPage: page }),
}));
