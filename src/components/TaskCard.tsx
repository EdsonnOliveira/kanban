import { MoreHorizontal, MessageCircle, Link } from 'lucide-react';
import { useDraggable } from '@dnd-kit/core';
import { Task } from '../store/useTaskStore';
import { useRef, useState } from 'react';
import TaskCardPopover from './TaskCardPopover';

interface TaskCardProps {
  task: Task;
  onEdit?: (task: Task) => void;
  onDelete?: (taskId: string) => void;
  onDoubleClick?: (task: Task) => void;
  onView?: (task: Task) => void;
  onCopyUrl?: (task: Task) => void;
}

export default function TaskCard({ task, onEdit, onDelete, onDoubleClick, onView, onCopyUrl }: TaskCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    isDragging,
  } = useDraggable({
    id: task.id,
    data: {
      task,
    },
  });

  const clickTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isDraggingRef = useRef(false);
  const mouseDownPosRef = useRef({ x: 0, y: 0 });
  const dragThreshold = 5; // pixels de movimento para ativar drag
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : undefined;

  const handleMouseDown = (e: React.MouseEvent) => {
    isDraggingRef.current = false;
    mouseDownPosRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (mouseDownPosRef.current) {
      const deltaX = Math.abs(e.clientX - mouseDownPosRef.current.x);
      const deltaY = Math.abs(e.clientY - mouseDownPosRef.current.y);
      
      // Só ativa drag se o movimento for significativo
      if (deltaX > dragThreshold || deltaY > dragThreshold) {
        isDraggingRef.current = true;
      }
    }
  };

  const handleDoubleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onDoubleClick?.(task);
  };

  const handleClick = (e: React.MouseEvent) => {
    // Só processa clique se não foi um drag
    if (!isDraggingRef.current) {
      // Limpa qualquer timeout anterior
      if (clickTimeoutRef.current) {
        clearTimeout(clickTimeoutRef.current);
      }
      
      // Aguarda um pouco para ver se é duplo clique
      clickTimeoutRef.current = setTimeout(() => {
        clickTimeoutRef.current = null;
        // Aqui poderia adicionar lógica para clique simples se necessário
      }, 200);
    }
  };
  const getPriorityColor = (priority: Task['priority']) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-700';
      case 'medium':
        return 'bg-yellow-100 text-yellow-700';
      case 'low':
        return 'bg-green-100 text-green-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getPriorityLabel = (priority: Task['priority']) => {
    switch (priority) {
      case 'high':
        return 'Alta';
      case 'medium':
        return 'Média';
      case 'low':
        return 'Baixa';
      default:
        return 'Baixa';
    }
  };

  return (
    <div 
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      className={`bg-white rounded-xl border border-gray-200 p-4 shadow-sm hover:shadow-md transition-shadow duration-200 cursor-grab active:cursor-grabbing ${
        isDragging ? 'opacity-50' : ''
      }`}
    >
      {/* Header com prioridade e menu */}
      <div className="flex items-start justify-between mb-3">
        <div className={`px-2 py-1 rounded-md text-xs font-medium ${getPriorityColor(task.priority)}`}>
          {getPriorityLabel(task.priority)}
        </div>
        <button 
          ref={menuButtonRef}
          className="p-1 hover:bg-gray-100 rounded-md transition-colors duration-200"
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            setIsPopoverOpen(!isPopoverOpen);
          }}
          onMouseDown={(e) => {
            e.stopPropagation();
            e.preventDefault();
          }}
        >
          <MoreHorizontal size={16} className="text-gray-400" />
        </button>
      </div>

      {/* Título da tarefa */}
      <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
        {task.title}
      </h3>

      {/* Descrição da tarefa */}
      <p className="text-sm text-gray-500 mb-4 line-clamp-2">
        {task.description}
      </p>

      {/* Footer com usuários e métricas */}
      <div className="flex items-center justify-between">
        {/* Avatares dos usuários */}
        <div className="flex -space-x-2">
          {task.assignedUsers.slice(0, 3).map((userId, index) => (
            <div
              key={userId}
              className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 border-2 border-white flex items-center justify-center text-xs font-medium text-white"
            >
              {userId.charAt(0).toUpperCase()}
            </div>
          ))}
          {task.assignedUsers.length > 3 && (
            <div className="w-6 h-6 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-xs font-medium text-gray-600">
              +{task.assignedUsers.length - 3}
            </div>
          )}
        </div>

        {/* Métricas */}
        <div className="flex items-center gap-3 text-xs text-gray-400">
          {task.comments > 0 && (
            <div className="flex items-center gap-1">
              <MessageCircle size={12} />
              <span>{task.comments}</span>
            </div>
          )}
          {task.attachments > 0 && (
            <div className="flex items-center gap-1">
              <Link size={12} />
              <span>{task.attachments}</span>
            </div>
          )}
        </div>
      </div>

      {/* Popover do menu */}
      <TaskCardPopover
        isOpen={isPopoverOpen}
        onClose={() => setIsPopoverOpen(false)}
        task={task}
        onView={onView}
        onCopyUrl={onCopyUrl}
        onDelete={onDelete}
        triggerRef={menuButtonRef}
      />
    </div>
  );
}
