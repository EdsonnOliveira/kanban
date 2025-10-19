import { create } from 'zustand';

export type ViewType = 'board' | 'list' | 'table' | 'timeline';

interface ViewStore {
  currentView: ViewType;
  setView: (view: ViewType) => void;
}

export const useViewStore = create<ViewStore>((set) => ({
  currentView: 'board',
  setView: (view: ViewType) => set({ currentView: view }),
}));
