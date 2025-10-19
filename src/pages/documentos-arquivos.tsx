import Container from '../components/Container';
import { FileText } from 'lucide-react';
import { useState } from 'react';
import { useNavigationStore } from '../store/useNavigationStore';
import DockGrid from '../components/DockGrid';
import FileListView from '../components/FileListView';
import ViewToggle from '../components/ViewToggle';
import BackButton from '../components/BackButton';
import { DockItem } from '../components/DockFile';

// Dados dos arquivos (exemplo para pasta "Projetos 2024")
const files: DockItem[] = [
  {
    id: '1',
    name: 'Planejamento Estratégico 2024',
    type: 'document',
    size: '2.4 MB',
    lastModified: '2 dias atrás',
    owner: 'Ana Silva',
    shared: true,
    extension: 'docx'
  },
  {
    id: '2',
    name: 'Wireframes Mobile App',
    type: 'image',
    size: '5.8 MB',
    lastModified: '1 semana atrás',
    owner: 'Maria Costa',
    shared: false,
    extension: 'fig'
  },
  {
    id: '3',
    name: 'Relatório de Vendas Q1',
    type: 'spreadsheet',
    size: '1.2 MB',
    lastModified: '3 dias atrás',
    owner: 'Carlos Santos',
    shared: true,
    extension: 'xlsx'
  },
  {
    id: '4',
    name: 'Apresentação Cliente Final',
    type: 'presentation',
    size: '8.1 MB',
    lastModified: '1 dia atrás',
    owner: 'Pedro Oliveira',
    shared: true,
    extension: 'pptx'
  },
  {
    id: '5',
    name: 'Contrato de Prestação de Serviços',
    type: 'pdf',
    size: '456 KB',
    lastModified: '5 dias atrás',
    owner: 'Julia Ferreira',
    shared: false,
    extension: 'pdf'
  },
  {
    id: '6',
    name: 'Logo Empresa Versão Final',
    type: 'image',
    size: '2.1 MB',
    lastModified: '1 semana atrás',
    owner: 'Maria Costa',
    shared: true,
    extension: 'svg'
  },
  {
    id: '7',
    name: 'Manual do Usuário',
    type: 'document',
    size: '3.7 MB',
    lastModified: '4 dias atrás',
    owner: 'Ana Silva',
    shared: true,
    extension: 'pdf'
  },
  {
    id: '8',
    name: 'Análise de Mercado',
    type: 'spreadsheet',
    size: '1.8 MB',
    lastModified: '2 semanas atrás',
    owner: 'Carlos Santos',
    shared: false,
    extension: 'xlsx'
  }
];

export default function DocumentosArquivos() {
  const { setCurrentPage } = useNavigationStore();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');

  const handleBackToFolders = () => {
    setCurrentPage('documentos-pastas');
  };

  const handleItemClick = (itemId: string) => {
    console.log('Abrir item:', itemId);
    // Aqui você pode implementar a abertura do arquivo
  };

  const handleItemDoubleClick = (itemId: string) => {
    console.log('Abrir item (duplo clique):', itemId);
    // Aqui você pode implementar a abertura do arquivo
  };

  const handleAction = (action: string, itemId: string) => {
    console.log(`${action} item:`, itemId);
    
    switch (action) {
      case 'view':
        console.log('Visualizar arquivo:', itemId);
        // Implementar visualização do arquivo
        break;
      case 'rename':
        console.log('Renomear arquivo:', itemId);
        // Implementar renomeação do arquivo
        break;
      case 'delete':
        console.log('Excluir arquivo:', itemId);
        // Implementar exclusão do arquivo
        break;
      default:
        console.log('Ação não reconhecida:', action);
    }
  };

  return (
    <div className="w-full h-full flex gap-4">
      <Container
        icon={FileText}
        title="Projetos 2024"
        description="Arquivos da pasta Projetos 2024"
      >
        <div className="flex flex-col gap-6">
          {/* Header com botão voltar e toggle de visualização */}
          <div className="flex items-center justify-between">
            <BackButton
              onClick={handleBackToFolders}
              text="Voltar para Pastas"
            />
            
            <ViewToggle
              currentView={viewMode}
              onViewChange={setViewMode}
            />
          </div>

          {/* Lista de Arquivos */}
          {viewMode === 'grid' ? (
            <DockGrid
              items={files}
              onItemClick={handleItemClick}
              onItemDoubleClick={handleItemDoubleClick}
              onAction={handleAction}
            />
          ) : (
            <FileListView
              files={files}
              onFileClick={handleItemClick}
              onFileDoubleClick={handleItemDoubleClick}
              onAction={handleAction}
            />
          )}
        </div>
      </Container>
    </div>
  );
}
