import { create } from 'zustand';

export interface TestFormData {
  insightName: string;
  responsible: string;
  learningDate: string;
  relatedHypothesis?: string;
  hypothesis: string;
  observations: string;
  learnings: string;
  decisions: string;
  dataReliability: 'baixa' | 'media' | 'alta';
  requiredAction: 'documentar' | 'compartilhar' | 'implementar' | 'investigar';
}

interface TestDrawerStore {
  isTestDrawerOpen: boolean;
  openTestDrawer: () => void;
  closeTestDrawer: () => void;
  saveTest: (formData: TestFormData) => void;
}

export const useTestDrawerStore = create<TestDrawerStore>((set) => ({
  isTestDrawerOpen: false,
  
  openTestDrawer: () => set({ isTestDrawerOpen: true }),
  
  closeTestDrawer: () => set({ isTestDrawerOpen: false }),
  
  saveTest: (formData: TestFormData) => {
    console.log('Salvando teste:', formData);
    // Aqui você pode implementar a lógica para salvar o teste
    // Por exemplo, adicionar ao store de testes ou fazer uma chamada à API
  }
}));
