import { LucideIcon, Target, Brain, BarChart3, MessageSquare } from 'lucide-react';

interface DocumentTypeCardProps {
  title: string;
  icon: LucideIcon;
  color: string;
  onClick: () => void;
}

export default function DocumentTypeCard({
  title,
  icon: Icon,
  color,
  onClick
}: DocumentTypeCardProps) {
  return (
    <div 
      className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-center gap-4">
        <div className={`p-3 rounded-full bg-gray-100 ${color}`}>
          <Icon size={24} />
        </div>
        <div>
          <h3 className="font-semibold text-gray-800 text-lg">{title}</h3>
        </div>
      </div>
    </div>
  );
}

// Dados dos tipos de documento
export const documentTypes = [
  {
    id: 'identidade',
    title: 'Identidade',
    icon: Target,
    color: 'text-blue-600',
    route: '/planos'
  },
  {
    id: 'cultura',
    title: 'Cultura',
    icon: Brain,
    color: 'text-purple-600',
    route: '/planos'
  },
  {
    id: 'planejamento',
    title: 'Planejamento',
    icon: BarChart3,
    color: 'text-orange-600',
    route: '/planos'
  },
  {
    id: 'expressao',
    title: 'Expressão',
    icon: MessageSquare,
    color: 'text-pink-600',
    route: '/planos'
  }
];
