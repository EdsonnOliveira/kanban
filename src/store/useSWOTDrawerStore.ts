import { create } from 'zustand';

// Interface para dados do formulário de Análise SWOT
export interface SWOTFormData {
  name: string;
  description: string;
  status: string;
  // Strengths (Forças)
  strengths: string;
  // Weaknesses (Fraquezas)
  weaknesses: string;
  // Opportunities (Oportunidades)
  opportunities: string;
  // Threats (Ameaças)
  threats: string;
  // Análise adicional
  strategicRecommendations: string;
  priorityActions: string;
  riskLevel: string;
  marketPosition: string;
  competitiveAdvantage: string;
}

// Interface para o store do SWOT Drawer
export interface SWOTDrawerStore {
  isSWOTDrawerOpen: boolean;
  openSWOTDrawer: () => void;
  closeSWOTDrawer: () => void;
  saveSWOT: (data: SWOTFormData) => void;
}

export const useSWOTDrawerStore = create<SWOTDrawerStore>((set) => ({
  isSWOTDrawerOpen: false,
  openSWOTDrawer: () => set({ isSWOTDrawerOpen: true }),
  closeSWOTDrawer: () => set({ isSWOTDrawerOpen: false }),
  saveSWOT: (data) => {
    console.log('Salvando Análise SWOT:', data);
    // Aqui você pode implementar a lógica de salvamento
  }
}));
