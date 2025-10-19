import { ArrowLeft } from 'lucide-react';

interface BackButtonProps {
  onClick: () => void;
  text?: string;
  className?: string;
}

export default function BackButton({ 
  onClick, 
  text = "Voltar", 
  className = "" 
}: BackButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors cursor-pointer ${className}`}
    >
      <ArrowLeft size={20} />
      <span className="text-sm font-medium">{text}</span>
    </button>
  );
}
