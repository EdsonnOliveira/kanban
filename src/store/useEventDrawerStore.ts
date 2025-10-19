import { create } from 'zustand';

// Interface para dados do formulário de evento
export interface EventFormData {
  eventTitle: string;
  description: string;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  location: string;
  attendees: string;
  eventType: string;
  priority: string;
  reminder: string;
  notes: string;
}

// Interface para o store do Event Drawer
export interface EventDrawerStore {
  isEventDrawerOpen: boolean;
  openEventDrawer: () => void;
  closeEventDrawer: () => void;
  saveEvent: (data: EventFormData) => void;
}

export const useEventDrawerStore = create<EventDrawerStore>((set) => ({
  isEventDrawerOpen: false,
  openEventDrawer: () => set({ isEventDrawerOpen: true }),
  closeEventDrawer: () => set({ isEventDrawerOpen: false }),
  saveEvent: (data) => {
    console.log('Salvando evento:', data);
    // Aqui você pode implementar a lógica de salvamento
  }
}));
