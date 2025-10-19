import { Calendar, User, MessageCircle, Link, MoreHorizontal, Edit, Trash2, Grid3X3 } from 'lucide-react';

interface CardInfoProps {
  id: string | number;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  status: 'todo' | 'in-progress' | 'done';
  createdAt: string | Date;
  assignedUsers: string[];
  comments?: number;
  attachments?: number;
  onDoubleClick?: (task: string) => void;
  onEdit?: (task: string) => void;
  onDelete?: (task: string) => void;
  className?: string;
  variant?: 'default' | 'columns';
  // Props específicas para variant columns
  hypothesis?: {
    belief: string;
    test: string;
    cost: 'low' | 'medium' | 'high';
    time: 'low' | 'medium' | 'high';
    confidence: 'low' | 'medium' | 'high';
  };
}

export default function CardInfo({
  id,
  title,
  description,
  priority,
  status,
  createdAt,
  assignedUsers,
  comments = 0,
  attachments = 0,
  onDoubleClick,
  onEdit,
  onDelete,
  className = "",
  variant = 'default',
  hypothesis
}: CardInfoProps) {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'low':
        return 'bg-green-100 text-green-700';
      case 'medium':
        return 'bg-yellow-100 text-yellow-700';
      case 'high':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case 'low':
        return 'Baixa';
      case 'medium':
        return 'Média';
      case 'high':
        return 'Alta';
      default:
        return 'Baixa';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'todo':
        return 'bg-purple-100 text-purple-700';
      case 'in-progress':
        return 'bg-orange-100 text-orange-700';
      case 'done':
        return 'bg-green-100 text-green-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'todo':
        return 'A fazer';
      case 'in-progress':
        return 'Andamento';
      case 'done':
        return 'Concluído';
      default:
        return 'A fazer';
    }
  };

  const getLevelLabel = (level: string) => {
    switch (level) {
      case 'low':
        return 'Baixo';
      case 'medium':
        return 'Médio';
      case 'high':
        return 'Alto';
      default:
        return 'Médio';
    }
  };

  const getPriorityLabelForColumns = (priority: string) => {
    switch (priority) {
      case 'low':
        return 'Baixa';
      case 'medium':
        return 'Média';
      case 'high':
        return 'Alta';
      default:
        return 'Média';
    }
  };


  if (variant === 'columns' && hypothesis) {
    return (
      <div
        onDoubleClick={() => onDoubleClick?.(String(id))}
        className={`bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition-shadow duration-200 cursor-pointer ${className}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Grid3X3 size={16} className="text-gray-400" />
            <h3 className="font-semibold text-gray-900">{title}</h3>
          </div>
          <div className="flex items-center gap-2">
            <button 
              className="p-1 hover:bg-gray-100 rounded-md transition-colors duration-200"
              onClick={() => onEdit?.(String(id))}
            >
              <Edit size={16} className="text-gray-400" />
            </button>
            <button 
              className="p-1 hover:bg-gray-100 rounded-md transition-colors duration-200"
              onClick={() => onDelete?.(String(id))}
            >
              <Trash2 size={16} className="text-gray-400" />
            </button>
          </div>
        </div>

        {/* Badges */}
        <div className="flex items-center gap-2 mb-4">
          <div className={`px-2 py-1 rounded-md text-xs font-medium ${getPriorityColor(priority)}`}>
            Criticidade: {getPriorityLabelForColumns(priority)}
          </div>
          <div className="px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-700">
            {new Date(createdAt).toLocaleDateString('pt-BR')}
          </div>
          <div className="px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-700">
            {description}
          </div>
        </div>

        {/* Content - Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Section - Belief and Test */}
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Nós acreditamos que:</h4>
              <p className="text-sm text-gray-600">{hypothesis.belief}</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Para verificar isso, faremos:</h4>
              <p className="text-sm text-gray-600">{hypothesis.test}</p>
            </div>
          </div>

          {/* Right Section - Metrics */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Custo:</span>
              <span className="text-sm font-semibold text-gray-900">{getLevelLabel(hypothesis.cost)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Tempo:</span>
              <span className="text-sm font-semibold text-gray-900">{getLevelLabel(hypothesis.time)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Confiança nos dados:</span>
              <span className="text-sm font-semibold text-gray-900">{getLevelLabel(hypothesis.confidence)}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Default variant
  return (
    <div
      onDoubleClick={() => onDoubleClick?.(String(id))}
      className={`bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition-shadow duration-200 cursor-pointer ${className}`}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-3">
            <div className={`px-2 py-1 rounded-md text-xs font-medium ${getPriorityColor(priority)}`}>
              {getPriorityLabel(priority)}
            </div>
            <div className={`px-2 py-1 rounded-md text-xs font-medium ${getStatusColor(status)}`}>
              {getStatusLabel(status)}
            </div>
          </div>
          
          <h3 className="font-semibold text-gray-900 mb-2">
            {title}
          </h3>
          
          <p className="text-sm text-gray-500 mb-4">
            {description}
          </p>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 text-xs text-gray-400">
              <div className="flex items-center gap-1">
                <Calendar size={12} />
                <span>{new Date(createdAt).toLocaleDateString('pt-BR')}</span>
              </div>
              <div className="flex items-center gap-1">
                <User size={12} />
                <span>{assignedUsers.length} usuário(s)</span>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              {comments > 0 && (
                <div className="flex items-center gap-1 text-xs text-gray-400">
                  <MessageCircle size={12} />
                  <span>{comments}</span>
                </div>
              )}
              {attachments > 0 && (
                <div className="flex items-center gap-1 text-xs text-gray-400">
                  <Link size={12} />
                  <span>{attachments}</span>
                </div>
              )}
              <button 
                className="p-1 hover:bg-gray-100 rounded-md transition-colors duration-200"
                onClick={() => onEdit?.(String(id))}
              >
                <MoreHorizontal size={16} className="text-gray-400" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
