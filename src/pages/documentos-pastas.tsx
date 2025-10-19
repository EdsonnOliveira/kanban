import Container from '../components/Container';
import { FolderOpen } from 'lucide-react';
import { useState } from 'react';
import { useNavigationStore } from '../store/useNavigationStore';
import DockGrid from '../components/DockGrid';
import FolderListView from '../components/FolderListView';
import ViewToggle from '../components/ViewToggle';
import { DockItem } from '../components/DockFile';

// Dados das pastas
const folders: DockItem[] = [
  {
    id: '1',
    name: 'Projetos 2024',
    description: 'Documentos relacionados aos projetos do ano',
    type: 'folder',
    filesCount: 24,
    lastModified: '2 dias atrás',
    color: 'bg-blue-500',
    shared: true,
    owner: 'Ana Silva'
  },
  {
    id: '2',
    name: 'Relatórios Financeiros',
    description: 'Relatórios mensais e trimestrais',
    type: 'folder',
    filesCount: 12,
    lastModified: '1 semana atrás',
    color: 'bg-green-500',
    shared: false,
    owner: 'Carlos Santos'
  },
  {
    id: '3',
    name: 'Design Assets',
    description: 'Logos, ícones e recursos visuais',
    type: 'folder',
    filesCount: 45,
    lastModified: '3 dias atrás',
    color: 'bg-purple-500',
    shared: true,
    owner: 'Maria Costa'
  },
  {
    id: '4',
    name: 'Documentação Técnica',
    description: 'Manuais e guias de desenvolvimento',
    type: 'folder',
    filesCount: 18,
    lastModified: '5 dias atrás',
    color: 'bg-orange-500',
    shared: true,
    owner: 'Pedro Oliveira'
  },
  {
    id: '5',
    name: 'Reuniões e Atas',
    description: 'Registros de reuniões e decisões',
    type: 'folder',
    filesCount: 32,
    lastModified: '1 dia atrás',
    color: 'bg-red-500',
    shared: false,
    owner: 'Julia Ferreira'
  },
  {
    id: '6',
    name: 'Contratos e Acordos',
    description: 'Documentos legais e contratuais',
    type: 'folder',
    filesCount: 8,
    lastModified: '2 semanas atrás',
    color: 'bg-yellow-500',
    shared: false,
    owner: 'Ana Silva'
  },
  {
    id: '7',
    name: 'Marketing e Vendas',
    description: 'Materiais promocionais e estratégias',
    type: 'folder',
    filesCount: 28,
    lastModified: '4 dias atrás',
    color: 'bg-pink-500',
    shared: true,
    owner: 'Carlos Santos'
  },
  {
    id: '8',
    name: 'Recursos Humanos',
    description: 'Políticas, procedimentos e formulários',
    type: 'folder',
    filesCount: 15,
    lastModified: '1 semana atrás',
    color: 'bg-indigo-500',
    shared: false,
    owner: 'Maria Costa'
  }
];

export default function DocumentosPastas() {
  const { setCurrentPage } = useNavigationStore();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const handleItemClick = (itemId: string) => {
    console.log('Abrir item:', itemId);
    // Aqui você pode implementar a navegação para dentro da pasta
  };

  const handleItemDoubleClick = (itemId: string) => {
    console.log('Abrir item (duplo clique):', itemId);
    setCurrentPage('documentos-arquivos');
  };

  const handleAction = (action: string, itemId: string) => {
    console.log(`${action} item:`, itemId);
    
    switch (action) {
      case 'view':
        console.log('Visualizar pasta:', itemId);
        // Implementar visualização da pasta
        break;
      case 'rename':
        console.log('Renomear pasta:', itemId);
        // Implementar renomeação da pasta
        break;
      case 'delete':
        console.log('Excluir pasta:', itemId);
        // Implementar exclusão da pasta
        break;
      default:
        console.log('Ação não reconhecida:', action);
    }
  };

  return (
    <div className="w-full h-full flex gap-4">
      <Container
        icon={FolderOpen}
        title="Documentos e Pastas"
        description="Organize e gerencie seus documentos e arquivos."
      >
        <div className="flex flex-col gap-6">
          {/* Header com toggle de visualização */}
          <div className="flex items-center justify-end">
            <ViewToggle
              currentView={viewMode}
              onViewChange={setViewMode}
            />
          </div>

          {/* Grid ou Lista de Pastas */}
          {viewMode === 'grid' ? (
            <DockGrid
              items={folders}
              onItemClick={handleItemClick}
              onItemDoubleClick={handleItemDoubleClick}
              onAction={handleAction}
            />
          ) : (
            <FolderListView
              folders={folders}
              onFolderClick={handleItemClick}
              onFolderDoubleClick={handleItemDoubleClick}
              onAction={handleAction}
              showSelection={true}
            />
          )}
        </div>
      </Container>
    </div>
  );
}
