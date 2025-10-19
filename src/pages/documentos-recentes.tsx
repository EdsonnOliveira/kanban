import Container from '../components/Container';
import { Clock, FileText } from 'lucide-react';
import { useState } from 'react';
import FileList from '../components/FileList';
import DockGrid from '../components/DockGrid';
import ViewToggle from '../components/ViewToggle';

// Tipo compatível com ambos os componentes
type CompatibleFileItem = {
  id: string;
  name: string;
  type: 'document' | 'image' | 'pdf' | 'spreadsheet' | 'presentation';
  size: string;
  lastModified: string;
  owner: string;
  shared: boolean;
  extension: string;
};

// Dados dos arquivos recentes (ordenados por data de modificação)
const recentFiles: CompatibleFileItem[] = [
  {
    id: '1',
    name: 'Apresentação Cliente Final',
    type: 'presentation',
    size: '8.1 MB',
    lastModified: 'há 2 horas',
    owner: 'Pedro Oliveira',
    shared: true,
    extension: 'pptx'
  },
  {
    id: '2',
    name: 'Relatório de Vendas Q1',
    type: 'spreadsheet',
    size: '1.2 MB',
    lastModified: 'há 4 horas',
    owner: 'Carlos Santos',
    shared: true,
    extension: 'xlsx'
  },
  {
    id: '3',
    name: 'Manual do Usuário',
    type: 'document',
    size: '3.7 MB',
    lastModified: 'há 6 horas',
    owner: 'Ana Silva',
    shared: true,
    extension: 'pdf'
  },
  {
    id: '4',
    name: 'Wireframes Mobile App',
    type: 'image',
    size: '5.8 MB',
    lastModified: 'há 1 dia',
    owner: 'Maria Costa',
    shared: false,
    extension: 'fig'
  },
  {
    id: '5',
    name: 'Logo Empresa Versão Final',
    type: 'image',
    size: '2.1 MB',
    lastModified: 'há 1 dia',
    owner: 'Maria Costa',
    shared: true,
    extension: 'svg'
  },
  {
    id: '6',
    name: 'Planejamento Estratégico 2024',
    type: 'document',
    size: '2.4 MB',
    lastModified: 'há 2 dias',
    owner: 'Ana Silva',
    shared: true,
    extension: 'docx'
  },
  {
    id: '7',
    name: 'Contrato de Prestação de Serviços',
    type: 'pdf',
    size: '456 KB',
    lastModified: 'há 3 dias',
    owner: 'Julia Ferreira',
    shared: false,
    extension: 'pdf'
  },
  {
    id: '8',
    name: 'Análise de Mercado',
    type: 'spreadsheet',
    size: '1.8 MB',
    lastModified: 'há 5 dias',
    owner: 'Carlos Santos',
    shared: false,
    extension: 'xlsx'
  },
  {
    id: '9',
    name: 'Proposta Comercial Q2',
    type: 'document',
    size: '1.5 MB',
    lastModified: 'há 1 semana',
    owner: 'Pedro Oliveira',
    shared: true,
    extension: 'docx'
  },
  {
    id: '10',
    name: 'Mockups Dashboard',
    type: 'image',
    size: '4.2 MB',
    lastModified: 'há 1 semana',
    owner: 'Maria Costa',
    shared: true,
    extension: 'fig'
  }
];

export default function DocumentosRecentes() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');

  const handleFileClick = (fileId: string) => {
    console.log('Abrir arquivo:', fileId);
    // Aqui você pode implementar a abertura do arquivo
  };

  const handleFileDoubleClick = (fileId: string) => {
    console.log('Abrir arquivo (duplo clique):', fileId);
    // Aqui você pode implementar a abertura do arquivo
  };

  const handleAction = (action: string, fileId: string) => {
    console.log(`${action} arquivo:`, fileId);
    // Aqui você pode implementar as ações específicas
  };

  return (
    <div className="w-full h-full flex gap-4">
      <Container
        icon={Clock}
        title="Documentos Recentes"
        description="Últimos arquivos adicionados e modificados."
      >
        <div className="flex flex-col gap-6">
          {/* Header com toggle de visualização */}
          <div className="flex items-center justify-end">
            <ViewToggle
              currentView={viewMode}
              onViewChange={setViewMode}
            />
          </div>

          {/* Estatísticas rápidas */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-2xl p-4 border border-gray-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                  <FileText size={20} className="text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Total de Arquivos</p>
                  <p className="text-lg font-semibold text-gray-900">{recentFiles.length}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl p-4 border border-gray-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                  <Clock size={20} className="text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Modificados Hoje</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {recentFiles.filter(file => file.lastModified.includes('horas')).length}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl p-4 border border-gray-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                  <FileText size={20} className="text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Compartilhados</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {recentFiles.filter(file => file.shared).length}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Lista de Arquivos Recentes */}
          {viewMode === 'grid' ? (
            <DockGrid
              items={recentFiles}
              onItemClick={handleFileClick}
              onItemDoubleClick={handleFileDoubleClick}
              onAction={handleAction}
            />
          ) : (
            <FileList
              files={recentFiles}
              onFileClick={handleFileClick}
              onFileDoubleClick={handleFileDoubleClick}
              onAction={handleAction}
              showSelection={true}
            />
          )}
        </div>
      </Container>
    </div>
  );
}
