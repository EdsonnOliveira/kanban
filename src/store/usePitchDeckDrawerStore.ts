import { create } from 'zustand';

// Interface para dados do formulário de pitch deck
export interface PitchDeckFormData {
  title: string;
  description: string;
  type: string;
  status: string;
  targetAudience: string;
  objective: string;
  duration: string;
  presenter: string;
  location: string;
  notes: string;
}

// Interface para o store do Pitch Deck Drawer
export interface PitchDeckDrawerStore {
  isPitchDeckDrawerOpen: boolean;
  openPitchDeckDrawer: () => void;
  closePitchDeckDrawer: () => void;
  savePitchDeck: (data: PitchDeckFormData) => void;
}

export const usePitchDeckDrawerStore = create<PitchDeckDrawerStore>((set) => ({
  isPitchDeckDrawerOpen: false,
  openPitchDeckDrawer: () => set({ isPitchDeckDrawerOpen: true }),
  closePitchDeckDrawer: () => set({ isPitchDeckDrawerOpen: false }),
  savePitchDeck: (data) => {
    console.log('Salvando pitch deck:', data);
    // Aqui você pode implementar a lógica de salvamento
  }
}));
