import { FolderOpen, MoreHorizontal, Eye, FileText, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { DockItem } from './DockFile';
import Popover from './Popover';

interface FolderListViewProps {
  folders: DockItem[];
  onFolderClick?: (folderId: string) => void;
  onFolderDoubleClick?: (folderId: string) => void;
  onAction?: (action: string, folderId: string) => void;
  showSelection?: boolean;
  className?: string;
}

export default function FolderListView({ 
  folders, 
  onFolderClick, 
  onFolderDoubleClick, 
  onAction,
  showSelection = true,
  className = ""
}: FolderListViewProps) {
  const [selectedFolders, setSelectedFolders] = useState<string[]>([]);
  const [openPopover, setOpenPopover] = useState<string | null>(null);
  const [popoverPosition, setPopoverPosition] = useState<{ x: number; y: number } | undefined>();

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
    setOpenPopover(null);
  };

  const handleMenuClick = (e: React.MouseEvent, folderId: string) => {
    e.stopPropagation();
    const rect = e.currentTarget.getBoundingClientRect();
    setPopoverPosition({
      x: rect.left,
      y: rect.bottom + 4
    });
    setOpenPopover(openPopover === folderId ? null : folderId);
  };

  const getFolderTypeLabel = () => {
    return 'Pasta';
  };

  return (
    <div className={`flex flex-col gap-6 ${className}`}>
      {/* Lista de Pastas */}
      <div className="bg-white rounded-3xl border border-gray-200 shadow-sm">
        <div className="p-6">
          <div className="space-y-3">
            {folders.map((folder) => (
              <div
                key={folder.id}
                onClick={() => handleFolderClick(folder.id)}
                onDoubleClick={() => handleFolderDoubleClick(folder.id)}
                className={`flex items-center gap-4 p-4 rounded-2xl cursor-pointer transition-all duration-200 hover:bg-gray-50 ${
                  selectedFolders.includes(folder.id)
                    ? 'bg-blue-50 border-2 border-blue-200'
                    : 'border border-transparent hover:border-gray-200'
                }`}
              >
                {/* Checkbox de seleção */}
                {showSelection && (
                  <div 
                    className="w-5 h-5 border-2 border-gray-300 rounded cursor-pointer flex items-center justify-center"
                    onClick={(e) => handleFolderSelect(folder.id, e)}
                  >
                    {selectedFolders.includes(folder.id) && (
                      <div className="w-3 h-3 bg-blue-500 rounded-sm"></div>
                    )}
                  </div>
                )}

                {/* Ícone da pasta */}
                <div className={`w-12 h-12 ${folder.color || 'bg-blue-500'} rounded-xl flex items-center justify-center shadow-lg`}>
                  <FolderOpen size={24} className="text-white" />
                </div>

                {/* Informações da pasta */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-gray-900 truncate" title={folder.name}>
                      {folder.name}
                    </h3>
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                      PASTA
                    </span>
                    {folder.shared && (
                      <div className="flex items-center gap-1 text-blue-600">
                        <Eye size={12} />
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span>{getFolderTypeLabel()}</span>
                    <span>•</span>
                    <span>{folder.filesCount || 0} arquivos</span>
                    <span>•</span>
                    <span>{folder.lastModified}</span>
                    <span>•</span>
                    <span>{folder.owner}</span>
                  </div>
                  {folder.description && (
                    <p className="text-sm text-gray-600 mt-1 line-clamp-1" title={folder.description}>
                      {folder.description}
                    </p>
                  )}
                </div>

                {/* Menu de ações */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAction('view', folder.id);
                    }}
                    className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center transition-colors"
                    title="Visualizar"
                  >
                    <Eye size={16} className="text-gray-500" />
                  </button>
                  <button
                    onClick={(e) => handleMenuClick(e, folder.id)}
                    className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center transition-colors"
                    title="Mais ações"
                  >
                    <MoreHorizontal size={16} className="text-gray-500" />
                  </button>
                  
                  {/* Popover */}
                  <Popover
                    isOpen={openPopover === folder.id}
                    onClose={() => setOpenPopover(null)}
                    position={popoverPosition}
                  >
                    <div className="py-1">
                      <button
                        onClick={() => handleAction('view', folder.id)}
                        className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                      >
                        <Eye size={16} className="text-gray-500" />
                        Ver
                      </button>
                      <button
                        onClick={() => handleAction('rename', folder.id)}
                        className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                      >
                        <FileText size={16} className="text-gray-500" />
                        Renomear
                      </button>
                      <button
                        onClick={() => handleAction('delete', folder.id)}
                        className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                      >
                        <Trash2 size={16} className="text-red-500" />
                        Excluir
                      </button>
                    </div>
                  </Popover>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Ações em lote (quando pastas estão selecionadas) */}
      {showSelection && selectedFolders.length > 0 && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-white rounded-2xl shadow-lg border border-gray-200 p-4 flex items-center gap-4">
          <span className="text-sm text-gray-600">
            {selectedFolders.length} pasta(s) selecionada(s)
          </span>
          <div className="flex items-center gap-2">
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
