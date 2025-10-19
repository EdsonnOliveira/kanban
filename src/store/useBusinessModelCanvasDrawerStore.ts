import { create } from 'zustand';

// Interface para dados do formulário de Business Model Canvas
export interface BusinessModelCanvasFormData {
  name: string;
  description: string;
  status: string;
  // Parcerias Principais
  keyPartnerships: string;
  // Atividades Principais
  keyActivities: string;
  // Proposta de Valor
  valuePropositions: string;
  // Relacionamento com Clientes
  customerRelationships: string;
  // Segmentos de Clientes
  customerSegments: string;
  // Recursos Principais
  keyResources: string;
  // Canais
  channels: string;
  // Estrutura de Custos
  costStructure: string;
  // Fontes de Receita
  revenueStreams: string;
}

// Interface para o store do Business Model Canvas Drawer
export interface BusinessModelCanvasDrawerStore {
  isBusinessModelCanvasDrawerOpen: boolean;
  openBusinessModelCanvasDrawer: () => void;
  closeBusinessModelCanvasDrawer: () => void;
  saveBusinessModelCanvas: (data: BusinessModelCanvasFormData) => void;
}

export const useBusinessModelCanvasDrawerStore = create<BusinessModelCanvasDrawerStore>((set) => ({
  isBusinessModelCanvasDrawerOpen: false,
  openBusinessModelCanvasDrawer: () => set({ isBusinessModelCanvasDrawerOpen: true }),
  closeBusinessModelCanvasDrawer: () => set({ isBusinessModelCanvasDrawerOpen: false }),
  saveBusinessModelCanvas: (data) => {
    console.log('Salvando Business Model Canvas:', data);
    // Aqui você pode implementar a lógica de salvamento
  }
}));
