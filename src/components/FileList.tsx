import { FileText, Image, File, Download, Share, Trash2, MoreHorizontal, Eye } from 'lucide-react';
import { useState } from 'react';
import NextImage from 'next/image';
import Popover from './Popover';

// Interface para arquivos
export interface FileItem {
  id: string;
  name: string;
  type: 'document' | 'image' | 'pdf' | 'spreadsheet' | 'presentation';
  size: string;
  lastModified: string;
  owner: string;
  shared: boolean;
  extension: string;
}

interface FileListProps {
  files: FileItem[];
  onFileClick?: (fileId: string) => void;
  onFileDoubleClick?: (fileId: string) => void;
  onAction?: (action: string, fileId: string) => void;
  showSelection?: boolean;
  className?: string;
}

export default function FileList({ 
  files, 
  onFileClick, 
  onFileDoubleClick, 
  onAction,
  showSelection = true,
  className = ""
}: FileListProps) {
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  const [openPopover, setOpenPopover] = useState<string | null>(null);
  const [popoverPosition, setPopoverPosition] = useState<{ x: number; y: number } | undefined>();

  const handleFileClick = (fileId: string) => {
    onFileClick?.(fileId);
  };

  const handleFileDoubleClick = (fileId: string) => {
    onFileDoubleClick?.(fileId);
  };

  const handleFileSelect = (fileId: string, event: React.MouseEvent) => {
    event.stopPropagation();
    setSelectedFiles(prev => 
      prev.includes(fileId) 
        ? prev.filter(id => id !== fileId)
        : [...prev, fileId]
    );
  };

  const handleAction = (action: string, fileId: string) => {
    onAction?.(action, fileId);
    setOpenPopover(null);
  };

  const handleMenuClick = (e: React.MouseEvent, fileId: string) => {
    e.stopPropagation();
    const rect = e.currentTarget.getBoundingClientRect();
    setPopoverPosition({
      x: rect.left,
      y: rect.bottom + 4
    });
    setOpenPopover(openPopover === fileId ? null : fileId);
  };

  const getFileIcon = (type: string, extension?: string) => {
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

  const getFileTypeLabel = (type: string) => {
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
      default:
        return 'Arquivo';
    }
  };

  return (
    <div className={`flex flex-col gap-6 ${className}`}>
      {/* Lista de Arquivos */}
      <div className="bg-white rounded-3xl border border-gray-200 shadow-sm">
        <div className="p-6">
          <div className="space-y-3">
            {files.map((file) => (
              <div
                key={file.id}
                onClick={() => handleFileClick(file.id)}
                onDoubleClick={() => handleFileDoubleClick(file.id)}
                className={`flex items-center gap-4 p-4 rounded-2xl cursor-pointer transition-all duration-200 hover:bg-gray-50 ${
                  selectedFiles.includes(file.id)
                    ? 'bg-blue-50 border-2 border-blue-200'
                    : 'border border-transparent hover:border-gray-200'
                }`}
              >
                {/* Checkbox de seleção */}
                {showSelection && (
                  <div 
                    className="w-5 h-5 border-2 border-gray-300 rounded cursor-pointer flex items-center justify-center"
                    onClick={(e) => handleFileSelect(file.id, e)}
                  >
                    {selectedFiles.includes(file.id) && (
                      <div className="w-3 h-3 bg-blue-500 rounded-sm"></div>
                    )}
                  </div>
                )}

                {/* Ícone do arquivo */}
                <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                  {getFileIcon(file.type, file.extension)}
                </div>

                {/* Informações do arquivo */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-gray-900 truncate" title={file.name}>
                      {file.name}
                    </h3>
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                      {file.extension.toUpperCase()}
                    </span>
                    {file.shared && (
                      <div className="flex items-center gap-1 text-blue-600">
                        <Share size={12} />
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span>{getFileTypeLabel(file.type)}</span>
                    <span>•</span>
                    <span>{file.size}</span>
                    <span>•</span>
                    <span>{file.lastModified}</span>
                    <span>•</span>
                    <span>{file.owner}</span>
                  </div>
                </div>

                {/* Menu de ações */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAction('view', file.id);
                    }}
                    className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center transition-colors"
                    title="Visualizar"
                  >
                    <Eye size={16} className="text-gray-500" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAction('download', file.id);
                    }}
                    className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center transition-colors"
                    title="Download"
                  >
                    <Download size={16} className="text-gray-500" />
                  </button>
                  <button
                    onClick={(e) => handleMenuClick(e, file.id)}
                    className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center transition-colors"
                    title="Mais ações"
                  >
                    <MoreHorizontal size={16} className="text-gray-500" />
                  </button>
                  
                  {/* Popover */}
                  <Popover
                    isOpen={openPopover === file.id}
                    onClose={() => setOpenPopover(null)}
                    position={popoverPosition}
                  >
                    <div className="py-1">
                      <button
                        onClick={() => handleAction('view', file.id)}
                        className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                      >
                        <Eye size={16} className="text-gray-500" />
                        Ver
                      </button>
                      <button
                        onClick={() => handleAction('download', file.id)}
                        className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                      >
                        <Download size={16} className="text-gray-500" />
                        Download
                      </button>
                      <button
                        onClick={() => handleAction('share', file.id)}
                        className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                      >
                        <Share size={16} className="text-gray-500" />
                        Compartilhar
                      </button>
                      <button
                        onClick={() => handleAction('delete', file.id)}
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

      {/* Ações em lote (quando arquivos estão selecionados) */}
      {showSelection && selectedFiles.length > 0 && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-white rounded-2xl shadow-lg border border-gray-200 p-4 flex items-center gap-4">
          <span className="text-sm text-gray-600">
            {selectedFiles.length} arquivo(s) selecionado(s)
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleAction('download', selectedFiles.join(','))}
              className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center transition-colors"
              title="Download"
            >
              <Download size={16} className="text-gray-600" />
            </button>
            <button
              onClick={() => handleAction('share', selectedFiles.join(','))}
              className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center transition-colors"
              title="Compartilhar"
            >
              <Share size={16} className="text-gray-600" />
            </button>
            <button
              onClick={() => handleAction('delete', selectedFiles.join(','))}
              className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center transition-colors"
              title="Excluir"
            >
              <Trash2 size={16} className="text-red-600" />
            </button>
          </div>
          <button
            onClick={() => setSelectedFiles([])}
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            Cancelar
          </button>
        </div>
      )}
    </div>
  );
}
