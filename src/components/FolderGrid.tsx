import { FolderOpen, MoreHorizontal, Download, Share, Trash2 } from 'lucide-react';
import { useState } from 'react';

// Interface para pastas
export interface Folder {
  id: string;
  name: string;
  description?: string;
  filesCount: number;
  lastModified: string;
  color: string;
  shared: boolean;
  owner: string;
}

interface FolderGridProps {
  folders: Folder[];
  onFolderClick?: (folderId: string) => void;
  onFolderDoubleClick?: (folderId: string) => void;
  onAction?: (action: string, folderId: string) => void;
  showSelection?: boolean;
  className?: string;
}

export default function FolderGrid({ 
  folders, 
  onFolderClick, 
  onFolderDoubleClick, 
  onAction,
  showSelection = true,
  className = ""
}: FolderGridProps) {
  const [selectedFolders, setSelectedFolders] = useState<string[]>([]);

  const handleFolderClick = (folderId: string) => {
    onFolderClick?.(folderId);
  };

  const handleFolderDoubleClick = (folderId: string) => {
    onFolderDoubleClick?.(folderId);
  };

  const handleFolderSelect = (folderId: string, event: React.MouseEvent) => {
    event.stopPropagation();
    setSelectedFolders(prev => 
      prev.includes(folderId) 
        ? prev.filter(id => id !== folderId)
        : [...prev, folderId]
    );
  };

  const handleAction = (action: string, folderId: string) => {
    onAction?.(action, folderId);
  };

  return (
    <div className={`flex flex-col gap-6 ${className}`}>
      {/* Grid de Pastas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {folders.map((folder) => (
          <div
            key={folder.id}
            onClick={() => handleFolderClick(folder.id)}
            onDoubleClick={() => handleFolderDoubleClick(folder.id)}
            className={`relative bg-white rounded-2xl p-6 border-2 cursor-pointer transition-all duration-200 hover:shadow-lg ${
              selectedFolders.includes(folder.id)
                ? 'border-blue-500 shadow-lg'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            {/* Checkbox de seleção */}
            {showSelection && (
              <div 
                className="absolute top-4 left-4 w-5 h-5 border-2 border-gray-300 rounded cursor-pointer flex items-center justify-center"
                onClick={(e) => handleFolderSelect(folder.id, e)}
              >
                {selectedFolders.includes(folder.id) && (
                  <div className="w-3 h-3 bg-blue-500 rounded-sm"></div>
                )}
              </div>
            )}

            {/* Menu de ações */}
            <div className="absolute top-4 right-4">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  console.log('Menu de ações da pasta:', folder.id);
                }}
                className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors"
              >
                <MoreHorizontal size={16} className="text-gray-500" />
              </button>
            </div>

            {/* Ícone da pasta */}
            <div className="flex justify-center mb-4 mt-6">
              <div className={`w-16 h-16 ${folder.color} rounded-2xl flex items-center justify-center shadow-lg`}>
                <FolderOpen size={32} className="text-white" />
              </div>
            </div>

            {/* Informações da pasta */}
            <div className="text-center">
              <h3 className="font-semibold text-gray-900 mb-1 truncate" title={folder.name}>
                {folder.name}
              </h3>
              
              {folder.description && (
                <p className="text-sm text-gray-500 mb-3 line-clamp-2" title={folder.description}>
                  {folder.description}
                </p>
              )}

              <div className="space-y-2 text-xs text-gray-500">
                <div className="flex justify-between">
                  <span>Arquivos:</span>
                  <span className="font-medium">{folder.filesCount}</span>
                </div>
                <div className="flex justify-between">
                  <span>Modificado:</span>
                  <span className="font-medium">{folder.lastModified}</span>
                </div>
                <div className="flex justify-between">
                  <span>Proprietário:</span>
                  <span className="font-medium truncate ml-2" title={folder.owner}>
                    {folder.owner}
                  </span>
                </div>
                {folder.shared && (
                  <div className="flex items-center justify-center gap-1 text-blue-600">
                    <Share size={12} />
                    <span className="font-medium">Compartilhada</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Ações em lote (quando pastas estão selecionadas) */}
      {showSelection && selectedFolders.length > 0 && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-white rounded-2xl shadow-lg border border-gray-200 p-4 flex items-center gap-4">
          <span className="text-sm text-gray-600">
            {selectedFolders.length} pasta(s) selecionada(s)
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleAction('download', selectedFolders.join(','))}
              className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center transition-colors"
              title="Download"
            >
              <Download size={16} className="text-gray-600" />
            </button>
            <button
              onClick={() => handleAction('share', selectedFolders.join(','))}
              className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center transition-colors"
              title="Compartilhar"
            >
              <Share size={16} className="text-gray-600" />
            </button>
            <button
              onClick={() => handleAction('delete', selectedFolders.join(','))}
              className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center transition-colors"
              title="Excluir"
            >
              <Trash2 size={16} className="text-red-600" />
            </button>
          </div>
          <button
            onClick={() => setSelectedFolders([])}
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            Cancelar
          </button>
        </div>
      )}
    </div>
  );
}
