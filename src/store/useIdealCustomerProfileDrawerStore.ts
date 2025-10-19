import { create } from 'zustand';

// Interface para dados do formulário de Ideal Customer Profile
export interface IdealCustomerProfileFormData {
  name: string;
  description: string;
  status: string;
  // Dados Demográficos
  ageRange: string;
  gender: string;
  location: string;
  education: string;
  income: string;
  // Dados Psicográficos
  interests: string;
  values: string;
  lifestyle: string;
  personality: string;
  // Dados Comportamentais
  buyingBehavior: string;
  decisionProcess: string;
  painPoints: string;
  goals: string;
  // Dados Técnicos/Profissionais
  industry: string;
  companySize: string;
  jobTitle: string;
  technology: string;
  // Dados de Contato
  preferredChannels: string;
  communicationStyle: string;
  timeZone: string;
  // Métricas
  lifetimeValue: string;
  acquisitionCost: string;
  retentionRate: string;
  satisfactionScore: string;
}

// Interface para o store do Ideal Customer Profile Drawer
export interface IdealCustomerProfileDrawerStore {
  isIdealCustomerProfileDrawerOpen: boolean;
  openIdealCustomerProfileDrawer: () => void;
  closeIdealCustomerProfileDrawer: () => void;
  saveIdealCustomerProfile: (data: IdealCustomerProfileFormData) => void;
}

export const useIdealCustomerProfileDrawerStore = create<IdealCustomerProfileDrawerStore>((set) => ({
  isIdealCustomerProfileDrawerOpen: false,
  openIdealCustomerProfileDrawer: () => set({ isIdealCustomerProfileDrawerOpen: true }),
  closeIdealCustomerProfileDrawer: () => set({ isIdealCustomerProfileDrawerOpen: false }),
  saveIdealCustomerProfile: (data) => {
    console.log('Salvando Ideal Customer Profile:', data);
    // Aqui você pode implementar a lógica de salvamento
  }
}));
