import { create } from 'zustand';

// Interface para dados do formulário de arquivo
export interface DocumentFileFormData {
  fileName: string;
  fileType: string;
  fileSize: string;
  description: string;
  owner: string;
  shared: boolean;
  tags: string;
}

// Interface para dados do formulário de pasta
export interface DocumentFolderFormData {
  folderName: string;
  description: string;
  color: string;
  owner: string;
  shared: boolean;
}

// Interface para o store do Document Drawer
export interface DocumentDrawerStore {
  isDocumentDrawerOpen: boolean;
  drawerType: 'file' | 'folder' | null;
  openDocumentDrawer: (type: 'file' | 'folder') => void;
  openDocumentDrawerSelector: () => void;
  closeDocumentDrawer: () => void;
  saveDocument: (data: DocumentFileFormData | DocumentFolderFormData) => void;
}

export const useDocumentDrawerStore = create<DocumentDrawerStore>((set) => ({
  isDocumentDrawerOpen: false,
  drawerType: null,
  openDocumentDrawer: (type) => set({ 
    isDocumentDrawerOpen: true, 
    drawerType: type 
  }),
  openDocumentDrawerSelector: () => set({ 
    isDocumentDrawerOpen: true, 
    drawerType: null 
  }),
  closeDocumentDrawer: () => set({ 
    isDocumentDrawerOpen: false, 
    drawerType: null 
  }),
  saveDocument: (data) => {
    console.log('Salvando documento:', data);
    // Aqui você pode implementar a lógica de salvamento
  }
}));
