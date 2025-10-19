import { create } from 'zustand';

interface MemberFormData {
  profilePhoto?: string;
  fullName: string;
  role: string;
  email: string;
  phone: string;
  hierarchicalLevel: string;
}

interface MemberDrawerStore {
  isMemberDrawerOpen: boolean;
  openMemberDrawer: () => void;
  closeMemberDrawer: () => void;
  saveMember: (formData: MemberFormData) => void;
}

export const useMemberDrawerStore = create<MemberDrawerStore>((set) => ({
  isMemberDrawerOpen: false,
  
  openMemberDrawer: () => set({ isMemberDrawerOpen: true }),
  
  closeMemberDrawer: () => set({ isMemberDrawerOpen: false }),
  
  saveMember: (formData: MemberFormData) => {
    console.log('Salvando membro:', formData);
    // Aqui você pode implementar a lógica para salvar o membro
    // Por exemplo, adicionar ao store de membros ou fazer uma chamada à API
  }
}));
