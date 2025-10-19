import { ReactNode, useRef, useEffect } from 'react';

interface PopoverProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  position?: { x: number; y: number };
  className?: string;
}

export default function Popover({ isOpen, onClose, children, position, className = "" }: PopoverProps) {
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const popoverStyle = position ? {
    left: `${position.x}px`,
    top: `${position.y}px`,
  } : {};

  return (
    <div className="fixed inset-0 z-50">
      <div 
        ref={popoverRef}
        style={popoverStyle}
        className={`absolute bg-white rounded-xl shadow-lg border border-gray-200 py-2 min-w-[120px] ${className}`}
      >
        {children}
      </div>
    </div>
  );
}
