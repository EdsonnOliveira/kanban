import { Eye, Trash2, ChevronRight, ChevronLeft } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

interface KanbanColumnPopoverProps {
  isOpen: boolean;
  onClose: () => void;
  onView?: () => void;
  onDelete?: () => void;
  onMoveRight?: () => void;
  onMoveLeft?: () => void;
  canMoveRight?: boolean;
  canMoveLeft?: boolean;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
}

export default function KanbanColumnPopover({ 
  isOpen, 
  onClose, 
  onView,
  onDelete,
  onMoveRight,
  onMoveLeft,
  canMoveRight = true,
  canMoveLeft = true,
  triggerRef 
}: KanbanColumnPopoverProps) {
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
    onView?.();
    onClose();
  };

  const handleDelete = () => {
    onDelete?.();
    onClose();
  };

  const handleMoveRight = () => {
    onMoveRight?.();
    onClose();
  };

  const handleMoveLeft = () => {
    onMoveLeft?.();
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
          className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3 transition-colors duration-200 cursor-pointer"
        >
          <Eye size={16} className="text-gray-500" />
          <span>Ver</span>
        </button>

        {/* Mover para Esquerda */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleMoveLeft();
          }}
          disabled={!canMoveLeft}
          className={`w-full px-4 py-2 text-left text-sm flex items-center gap-3 transition-colors duration-200 ${
            canMoveLeft 
              ? 'text-gray-700 hover:bg-gray-50 cursor-pointer' 
              : 'text-gray-400 cursor-not-allowed'
          }`}
        >
          <ChevronLeft size={16} className={canMoveLeft ? "text-gray-500" : "text-gray-400"} />
          <span>Mover para Esquerda</span>
        </button>

        {/* Mover para Direita */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleMoveRight();
          }}
          disabled={!canMoveRight}
          className={`w-full px-4 py-2 text-left text-sm flex items-center gap-3 transition-colors duration-200 ${
            canMoveRight 
              ? 'text-gray-700 hover:bg-gray-50 cursor-pointer' 
              : 'text-gray-400 cursor-not-allowed'
          }`}
        >
          <ChevronRight size={16} className={canMoveRight ? "text-gray-500" : "text-gray-400"} />
          <span>Mover para Direita</span>
        </button>

        {/* Divisor */}
        <div className="border-t border-gray-100 my-1" />

        {/* Excluir */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleDelete();
          }}
          className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-3 transition-colors duration-200 cursor-pointer"
        >
          <Trash2 size={16} className="text-red-500" />
          <span>Excluir</span>
        </button>
      </div>
    </>
  );
}
