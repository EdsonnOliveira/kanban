import { create } from 'zustand';

export interface Company {
  name: string;
  image: string;
  path: string;
}

interface CompanyState {
  selectedCompany: Company | null;
  companies: Company[];
  setSelectedCompany: (company: Company) => void;
  setCompanies: (companies: Company[]) => void;
}

export const useCompanyStore = create<CompanyState>((set) => ({
  selectedCompany: null,
  companies: [
    {
      name: "Gloda",
      image: "/companies/company1.jpg",
      path: "/dashboard/gloda"
    },
    {
      name: "Blackoding",
      image: "/companies/company2.png",
      path: "/dashboard/blackoding"
    }
  ],
  setSelectedCompany: (company) => set({ selectedCompany: company }),
  setCompanies: (companies) => set({ companies }),
}));
