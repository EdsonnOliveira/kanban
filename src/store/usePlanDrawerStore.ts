import { create } from 'zustand';

export interface PlanFormData {
  planName: string;
  description: string;
  category: 'identidade' | 'cultura' | 'planejamento' | 'expressao' | 'objetivos';
  priority: 'baixa' | 'media' | 'alta';
  startDate: string;
  endDate: string;
  responsible: string;
  status: 'rascunho' | 'em-andamento' | 'concluido' | 'pausado';
  tags: string;
  notes: string;
}

interface PlanDrawerStore {
  isPlanDrawerOpen: boolean;
  openPlanDrawer: () => void;
  closePlanDrawer: () => void;
  savePlan: (plan: PlanFormData) => void;
}

export const usePlanDrawerStore = create<PlanDrawerStore>((set) => ({
  isPlanDrawerOpen: false,
  openPlanDrawer: () => set({ isPlanDrawerOpen: true }),
  closePlanDrawer: () => set({ isPlanDrawerOpen: false }),
  savePlan: (plan) => {
    console.log('Salvando plano:', plan);
    // Aqui você pode implementar a lógica para salvar o plano
    set({ isPlanDrawerOpen: false });
  },
}));
