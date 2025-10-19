import { FileText, Image, File, FolderOpen, MoreHorizontal, Share, Trash2, Eye } from 'lucide-react';
import { useState } from 'react';
import NextImage from 'next/image';
import Popover from './Popover';

// Interface para itens do dock (arquivos ou pastas)
export interface DockItem {
  id: string;
  name: string;
  type: 'document' | 'image' | 'pdf' | 'spreadsheet' | 'presentation' | 'folder';
  size?: string;
  lastModified: string;
  owner: string;
  shared: boolean;
  extension?: string;
  description?: string;
  filesCount?: number;
  color?: string;
}

interface DockFileProps {
  item: DockItem;
  onItemClick?: (itemId: string) => void;
  onItemDoubleClick?: (itemId: string) => void;
  onAction?: (action: string, itemId: string) => void;
  showSelection?: boolean;
  isSelected?: boolean;
  onSelect?: (itemId: string, event: React.MouseEvent) => void;
  className?: string;
}

export default function DockFile({ 
  item, 
  onItemClick, 
  onItemDoubleClick, 
  onAction,
  showSelection = true,
  isSelected = false,
  onSelect,
  className = ""
}: DockFileProps) {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [popoverPosition, setPopoverPosition] = useState<{ x: number; y: number } | undefined>();
  const handleItemClick = () => {
    onItemClick?.(item.id);
  };

  const handleItemDoubleClick = () => {
    onItemDoubleClick?.(item.id);
  };

  const handleSelect = (event: React.MouseEvent) => {
    event.stopPropagation();
    onSelect?.(item.id, event);
  };

  const handleAction = (action: string) => {
    onAction?.(action, item.id);
    setIsPopoverOpen(false);
  };

  const handleMenuClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const rect = e.currentTarget.getBoundingClientRect();
    setPopoverPosition({
      x: rect.left,
      y: rect.bottom + 4
    });
    setIsPopoverOpen(!isPopoverOpen);
  };

  const getItemIcon = (type: string, extension?: string) => {
    // Para pastas, sempre usar ícone
    if (type === 'folder') {
      return <FolderOpen size={32} className="text-white" />;
    }

    // Para arquivos, verificar extensão específica
    if (extension) {
      switch (extension.toLowerCase()) {
        case 'pptx':
          return <NextImage src="/icons/pptx.png" alt="PowerPoint" width={24} height={24} />;
        case 'pdf':
          return <NextImage src="/icons/pdf.png" alt="PDF" width={24} height={24} />;
        case 'docx':
        case 'doc':
          return <NextImage src="/icons/word.png" alt="Word" width={24} height={24} />;
        case 'xlsx':
        case 'xls':
          return <NextImage src="/icons/excel.webp" alt="Excel" width={24} height={24} />;
      }
    }

    // Fallback para tipos sem imagem específica
    switch (type) {
      case 'document':
        return <FileText size={24} className="text-blue-600" />;
      case 'image':
        return <Image size={24} className="text-green-600" />;
      case 'pdf':
        return <File size={24} className="text-red-600" />;
      case 'spreadsheet':
        return <FileText size={24} className="text-green-600" />;
      case 'presentation':
        return <FileText size={24} className="text-orange-600" />;
      default:
        return <File size={24} className="text-gray-600" />;
    }
  };

  const getItemTypeLabel = (type: string) => {
    switch (type) {
      case 'document':
        return 'Documento';
      case 'image':
        return 'Imagem';
      case 'pdf':
        return 'PDF';
      case 'spreadsheet':
        return 'Planilha';
      case 'presentation':
        return 'Apresentação';
      case 'folder':
        return 'Pasta';
      default:
        return 'Arquivo';
    }
  };

  const isFolder = item.type === 'folder';

  return (
    <div
      onClick={handleItemClick}
      onDoubleClick={handleItemDoubleClick}
      className={`relative bg-white rounded-2xl p-6 border-2 cursor-pointer transition-all duration-200 hover:shadow-lg ${
        isSelected
          ? 'border-blue-500 shadow-lg'
          : 'border-gray-200 hover:border-gray-300'
      } ${className}`}
    >
      {/* Checkbox de seleção */}
      {showSelection && (
        <div 
          className="absolute top-4 left-4 w-5 h-5 border-2 border-gray-300 rounded cursor-pointer flex items-center justify-center"
          onClick={handleSelect}
        >
          {isSelected && (
            <div className="w-3 h-3 bg-blue-500 rounded-sm"></div>
          )}
        </div>
      )}

      {/* Menu de ações */}
      <div className="absolute top-4 right-4">
        <button
          onClick={handleMenuClick}
          className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors"
        >
          <MoreHorizontal size={16} className="text-gray-500" />
        </button>
        
        {/* Popover */}
        <Popover
          isOpen={isPopoverOpen}
          onClose={() => setIsPopoverOpen(false)}
          position={popoverPosition}
        >
          <div className="py-1">
            <button
              onClick={() => handleAction('view')}
              className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
            >
              <Eye size={16} className="text-gray-500" />
              Ver
            </button>
            <button
              onClick={() => handleAction('rename')}
              className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
            >
              <FileText size={16} className="text-gray-500" />
              Renomear
            </button>
            <button
              onClick={() => handleAction('delete')}
              className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
            >
              <Trash2 size={16} className="text-red-500" />
              Excluir
            </button>
          </div>
        </Popover>
      </div>

      {/* Ícone do item */}
      <div className="flex justify-center mb-4 mt-6">
        {isFolder ? (
          <div className={`w-16 h-16 ${item.color || 'bg-blue-500'} rounded-2xl flex items-center justify-center shadow-lg`}>
            {getItemIcon(item.type)}
          </div>
        ) : (
          <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
            {getItemIcon(item.type, item.extension)}
          </div>
        )}
      </div>

      {/* Informações do item */}
      <div className="text-center">
        <h3 className="font-semibold text-gray-900 mb-1 truncate" title={item.name}>
          {item.name}
        </h3>
        
        {item.description && (
          <p className="text-sm text-gray-500 mb-3 line-clamp-2" title={item.description}>
            {item.description}
          </p>
        )}

        <div className="space-y-2 text-xs text-gray-500">
          {isFolder ? (
            <>
              <div className="flex justify-between">
                <span>Arquivos:</span>
                <span className="font-medium">{item.filesCount || 0}</span>
              </div>
              <div className="flex justify-between">
                <span>Modificado:</span>
                <span className="font-medium">{item.lastModified}</span>
              </div>
              <div className="flex justify-between">
                <span>Proprietário:</span>
                <span className="font-medium truncate ml-2" title={item.owner}>
                  {item.owner}
                </span>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                  {item.extension?.toUpperCase()}
                </span>
                {item.shared && (
                  <div className="flex items-center gap-1 text-blue-600">
                    <Share size={12} />
                  </div>
                )}
              </div>
              <div className="flex items-center gap-4">
                <span>{getItemTypeLabel(item.type)}</span>
                <span>•</span>
                <span>{item.size}</span>
                <span>•</span>
                <span>{item.lastModified}</span>
                <span>•</span>
                <span>{item.owner}</span>
              </div>
            </>
          )}
          
          {item.shared && (
            <div className="flex items-center justify-center gap-1 text-blue-600">
              <Share size={12} />
              <span className="font-medium">Compartilhado</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
