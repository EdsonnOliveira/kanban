import { LucideIcon, XIcon, CheckIcon } from 'lucide-react';
import { ReactNode, useEffect, useState } from 'react';
import Button from './Button';

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSave?: () => void;
  title?: string;
  children: ReactNode;
  saveButtonText?: string;
  saveButtonIcon?: LucideIcon;
  className?: string;
  width?: string;
}

export default function Drawer({
  isOpen,
  onClose,
  onSave,
  title,
  children,
  saveButtonText = "Salvar",
  saveButtonIcon: SaveIcon = CheckIcon,
  className = "",
  width = "w-96"
}: DrawerProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      // Pequeno delay para garantir que o DOM foi atualizado
      setTimeout(() => setIsVisible(true), 10);
    } else {
      setIsVisible(false);
      // Aguarda a animação terminar antes de remover do DOM
      setTimeout(() => setShouldRender(false), 300);
    }
  }, [isOpen]);

  if (!shouldRender) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`
          fixed inset-0 bg-black z-40
          transition-opacity duration-300 ease-in-out
          ${isVisible ? 'opacity-50' : 'opacity-0'}
        `}
        onClick={onClose}
      />
      
      {/* Drawer */}
      <div 
        className={`
          fixed right-4 top-4 h-[calc(100vh-2rem)] z-50
          ${width} p-4 bg-gradient-to-r from-[#F2F2F2] to-white rounded-3xl flex flex-col gap-4
          transform transition-all duration-300 ease-in-out
          ${isVisible 
            ? 'translate-x-0 opacity-100' 
            : 'translate-x-full opacity-0'
          }
          ${className}
        `}
      >
      {/* Header */}
      <div className="w-full flex items-center justify-between text-black">
        <XIcon size={24} className="cursor-pointer hover:text-gray-600 transition-colors" onClick={onClose} />
        <Button
          text={saveButtonText}
          onClick={onSave}
          size="small"
          className="max-w-24"
          rightIcon={SaveIcon}
          rightIconClassName="text-white"
        />
      </div>
      
      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="space-y-4">
          {title && (
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              {title}
            </h2>
          )}
          {children}
        </div>
      </div>
    </div>
    </>
  );
}
