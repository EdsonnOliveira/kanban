import { Eye, Copy, Trash2 } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Task } from '../store/useTaskStore';

interface TaskCardPopoverProps {
  isOpen: boolean;
  onClose: () => void;
  task: Task;
  onView?: (task: Task) => void;
  onCopyUrl?: (task: Task) => void;
  onDelete?: (taskId: string) => void;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
}

export default function TaskCardPopover({ 
  isOpen, 
  onClose, 
  task, 
  onView, 
  onCopyUrl, 
  onDelete, 
  triggerRef 
}: TaskCardPopoverProps) {
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && triggerRef.current) {
      const triggerRect = triggerRef.current.getBoundingClientRect();
      setPosition({
        top: triggerRect.bottom + 8,
        left: triggerRect.right - 200, // Ajusta para não sair da tela
      });
    }
  }, [isOpen, triggerRef]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popoverRef.current && 
        !popoverRef.current.contains(event.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen, onClose, triggerRef]);

  if (!isOpen) return null;

  const handleView = () => {
    onView?.(task);
    onClose();
  };

  const handleCopyUrl = () => {
    onCopyUrl?.(task);
    onClose();
  };

  const handleDelete = () => {
    onDelete?.(task.id);
    onClose();
  };

  return (
    <>
      {/* Backdrop invisível para capturar cliques fora */}
      <div 
        className="fixed inset-0 z-40"
        onClick={onClose}
      />
      
      {/* Popover */}
      <div
        ref={popoverRef}
        className="fixed z-50 w-48 bg-white rounded-lg border border-gray-200 shadow-lg py-2"
        style={{
          top: position.top,
          left: position.left,
        }}
        onMouseDown={(e) => e.stopPropagation()}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Ver */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleView();
          }}
          className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3 transition-colors duration-200"
        >
          <Eye size={16} className="text-gray-500" />
          <span>Ver</span>
        </button>

        {/* Copiar URL */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleCopyUrl();
          }}
          className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3 transition-colors duration-200"
        >
          <Copy size={16} className="text-gray-500" />
          <span>Copiar URL</span>
        </button>

        {/* Divisor */}
        <div className="border-t border-gray-100 my-1" />

        {/* Excluir */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleDelete();
          }}
          className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-3 transition-colors duration-200"
        >
          <Trash2 size={16} className="text-red-500" />
          <span>Excluir</span>
        </button>
      </div>
    </>
  );
}
