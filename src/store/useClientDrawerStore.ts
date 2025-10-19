import { create } from 'zustand';

// Interface para dados do formulário de cliente
export interface ClientFormData {
  clientName: string;
  company: string;
  email: string;
  phone: string;
  industry: string;
  status: string;
  contactPerson: string;
  address: string;
  notes: string;
}

// Interface para o store do Client Drawer
export interface ClientDrawerStore {
  isClientDrawerOpen: boolean;
  openClientDrawer: () => void;
  closeClientDrawer: () => void;
  saveClient: (data: ClientFormData) => void;
}

export const useClientDrawerStore = create<ClientDrawerStore>((set) => ({
  isClientDrawerOpen: false,
  openClientDrawer: () => set({ isClientDrawerOpen: true }),
  closeClientDrawer: () => set({ isClientDrawerOpen: false }),
  saveClient: (data) => {
    console.log('Salvando cliente:', data);
    // Aqui você pode implementar a lógica de salvamento
  }
}));
