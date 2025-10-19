import { create } from 'zustand';

export interface HypothesisFormData {
  testName: string;
  deliveryDate: string;
  responsible: string;
  belief: string;
  criticality: 'baixa' | 'media' | 'alta';
  cost: 'baixo' | 'medio' | 'alto';
  test: string;
  expectedTime: 'baixo' | 'medio' | 'alto';
  dataConfidence: 'baixa' | 'media' | 'alta';
  metrics: string;
  successCriteria: string;
}

interface HypothesisDrawerStore {
  isHypothesisDrawerOpen: boolean;
  openHypothesisDrawer: () => void;
  closeHypothesisDrawer: () => void;
  saveHypothesis: (formData: HypothesisFormData) => void;
}

export const useHypothesisDrawerStore = create<HypothesisDrawerStore>((set) => ({
  isHypothesisDrawerOpen: false,
  
  openHypothesisDrawer: () => set({ isHypothesisDrawerOpen: true }),
  
  closeHypothesisDrawer: () => set({ isHypothesisDrawerOpen: false }),
  
  saveHypothesis: (formData: HypothesisFormData) => {
    console.log('Salvando hipótese:', formData);
    // Aqui você pode implementar a lógica para salvar a hipótese
    // Por exemplo, adicionar ao store de hipóteses ou fazer uma chamada à API
  }
}));
