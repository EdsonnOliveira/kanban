import { Presentation, Eye, Edit, Download, Share, Trash2 } from 'lucide-react';

interface PitchDeckCardProps {
  id: string;
  title: string;
  description: string;
  type: 'evento' | 'conferencia' | 'campanha' | 'investimento' | 'produto' | 'outros';
  status: 'rascunho' | 'revisao' | 'finalizado' | 'apresentado';
  slides: number;
  lastModified: string;
  createdBy: string;
  tags: string[];
  isSelected: boolean;
  onSelect: (id: string) => void;
  onView: (id: string) => void;
  onEdit: (id: string) => void;
  onDownload: (id: string) => void;
  onShare: (id: string) => void;
  onDelete: (id: string) => void;
  className?: string;
}

export default function PitchDeckCard({
  id,
  title,
  description,
  type,
  status,
  slides,
  lastModified,
  createdBy,
  tags,
  isSelected,
  onSelect,
  onView,
  onEdit,
  onDownload,
  onShare,
  onDelete,
  className = ""
}: PitchDeckCardProps) {
  const getTypeLabel = (type: string) => {
    const typeMap = {
      'evento': 'Evento',
      'conferencia': 'Conferência',
      'campanha': 'Campanha',
      'investimento': 'Investimento',
      'produto': 'Produto',
      'outros': 'Outros'
    };
    return typeMap[type as keyof typeof typeMap] || 'Outros';
  };

  const getStatusColor = (status: string) => {
    const statusMap = {
      'rascunho': 'bg-gray-100 text-gray-800',
      'revisao': 'bg-yellow-100 text-yellow-800',
      'finalizado': 'bg-green-100 text-green-800',
      'apresentado': 'bg-blue-100 text-blue-800'
    };
    return statusMap[status as keyof typeof statusMap] || 'bg-gray-100 text-gray-800';
  };

  const getStatusLabel = (status: string) => {
    const statusMap = {
      'rascunho': 'Rascunho',
      'revisao': 'Em Revisão',
      'finalizado': 'Finalizado',
      'apresentado': 'Apresentado'
    };
    return statusMap[status as keyof typeof statusMap] || 'Rascunho';
  };

  return (
    <div
      className={`flex items-center gap-4 p-4 rounded-2xl border transition-all duration-200 hover:shadow-md ${
        isSelected
          ? 'bg-blue-50 border-blue-200'
          : 'border-gray-200 hover:border-gray-300'
      } ${className}`}
    >
      {/* Checkbox de seleção */}
      <div 
        className="w-5 h-5 border-2 border-gray-300 rounded cursor-pointer flex items-center justify-center"
        onClick={() => onSelect(id)}
      >
        {isSelected && (
          <div className="w-3 h-3 bg-blue-500 rounded-sm"></div>
        )}
      </div>

      {/* Ícone do pitch deck */}
      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
        <Presentation size={24} className="text-white" />
      </div>

      {/* Informações do pitch deck */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <h3 className="font-semibold text-gray-900 truncate" title={title}>
            {title}
          </h3>
          <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(status)}`}>
            {getStatusLabel(status)}
          </span>
        </div>
        <p className="text-sm text-gray-600 mb-2 line-clamp-1" title={description}>
          {description}
        </p>
        <div className="flex items-center gap-4 text-xs text-gray-500">
          <span>{getTypeLabel(type)}</span>
          <span>•</span>
          <span>{slides} slides</span>
          <span>•</span>
          <span>{lastModified}</span>
          <span>•</span>
          <span>{createdBy}</span>
        </div>
        <div className="flex items-center gap-1 mt-2">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Menu de ações */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => onView(id)}
          className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center transition-colors"
          title="Visualizar"
        >
          <Eye size={16} className="text-gray-500" />
        </button>
        <button
          onClick={() => onEdit(id)}
          className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center transition-colors"
          title="Editar"
        >
          <Edit size={16} className="text-gray-500" />
        </button>
        <button
          onClick={() => onDownload(id)}
          className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center transition-colors"
          title="Download"
        >
          <Download size={16} className="text-gray-500" />
        </button>
        <button
          onClick={() => onShare(id)}
          className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center transition-colors"
          title="Compartilhar"
        >
          <Share size={16} className="text-gray-500" />
        </button>
        <button
          onClick={() => onDelete(id)}
          className="w-8 h-8 rounded-lg hover:bg-red-100 flex items-center justify-center transition-colors"
          title="Excluir"
        >
          <Trash2 size={16} className="text-red-500" />
        </button>
      </div>
    </div>
  );
}
