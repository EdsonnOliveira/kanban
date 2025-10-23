import { ReactNode, useEffect, useState } from 'react';
import { XIcon } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  children: ReactNode;
  w?: string;
  h?: string;
}

export default function Modal({
  isOpen,
  onClose,
  title,
  description,
  children,
  w,
  h
}: ModalProps) {
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
      
      {/* Modal Content */}
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <div 
          className={`
            relative bg-white rounded-3xl shadow-2xl overflow-hidden
            transform transition-all duration-300 ease-in-out
            ${isVisible 
              ? 'scale-100 opacity-100' 
              : 'scale-95 opacity-0'
            }
          `}
          style={{
            width: w || 'max-w-4xl',
            height: h || 'max-h-[90vh]',
            maxWidth: w ? 'none' : '56rem',
            maxHeight: h ? 'none' : '90vh'
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
              <p className="text-gray-600 mt-1">{description}</p>
            </div>
            <XIcon 
              size={24} 
              className="cursor-pointer hover:text-gray-600 transition-colors" 
              onClick={onClose} 
            />
          </div>
          
          {/* Content */}
          <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
            {children}
          </div>
        </div>
      </div>
    </>
  );
}
