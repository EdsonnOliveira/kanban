import { 
  PanelLeft as PanelLeftIcon, 
  Plus, 
  LucideIcon, 
  ChevronDown, 
  Settings, 
  HelpCircle,
  House,
  Target,
  Brain,
  BarChart3,
  MessageSquare,
  Lightbulb,
  Users,
  Calendar,
  Video,
  CheckSquare,
  FolderOpen,
  FileText,
  Presentation,
  Grid3X3,
  UserCheck,
  Shield,
  Wrench,
  Briefcase,
  Star
} from 'lucide-react';
import { useState } from 'react';
import Button from './Button';
import Stroke from './Stroke';
import Option from './Option';
import { useProjectStore } from '@/store/useProjectStore';
import { useActivityStore } from '@/store/useActivityStore';

export type ListOption = {
  icon: LucideIcon;
  text: string;
  page?: string;
};

export type ListSection = {
  title: string;
  list: ListOption[];
  actionButton?: {
    icon: LucideIcon;
    text: string;
    onClick: () => void;
  };
};

interface PanelLeftProps {
  title: string;
  buttonText: string;
  buttonIcon?: LucideIcon;
}

export default function PanelLeft({
  title,
  buttonText,
  buttonIcon
}: PanelLeftProps) {
  const { openProjectsDrawer } = useProjectStore();
  const { openActivitiesDrawer } = useActivityStore();

  const list: ListSection[] = [
    {
      title: "Planos",
      list: [
        { icon: House, text: "Geral" },
        { icon: Target, text: "Identidade" },
        { icon: Brain, text: "Cultura" },
        { icon: BarChart3, text: "Planejamento" },
        { icon: MessageSquare, text: "Expressão" }
      ]
    },
    {
      title: "Projetos",
      list: [
        { icon: House, text: "Geral" },
        { icon: Lightbulb, text: "Hipóteses" },
        { icon: Users, text: "Membros" },
      ],
      actionButton: {
        icon: Plus,
        text: "Novo Projeto",
        onClick: () => openProjectsDrawer()
      }
    },
    {
      title: "Atividades",
      list: [
        { icon: House, text: "Geral", page: "atividades" },
        { icon: CheckSquare, text: "Tarefas", page: "tarefas" },
        { icon: Calendar, text: "Cronograma" },
        { icon: Video, text: "Reuniões" }
      ],
      actionButton: {
        icon: Plus,
        text: "Nova Atividade",
        onClick: () => openActivitiesDrawer()
      }
    },
    {
      title: "Documentos",
      list: [
        { icon: FolderOpen, text: "Pastas" },
        { icon: FileText, text: "Recentes" }
      ],
      actionButton: {
        icon: Plus,
        text: "Novo Documento",
        onClick: () => console.log("Criar novo documento")
      }
    },
    {
      title: "Clientes",
      list: [
        { icon: House, text: "Geral" }
      ],
      actionButton: {
        icon: Plus,
        text: "Novo Cliente",
        onClick: () => console.log("Criar novo cliente")
      }
    },
    {
      title: "Ferramentas",
      list: [
        { icon: Presentation, text: "Pitch Deck" },
        { icon: Grid3X3, text: "Business Model Canvas" },
        { icon: UserCheck, text: "Ideal Customer Profile" },
        { icon: Shield, text: "SWOT" },
        { icon: Wrench, text: "Outros" }
      ]
    },
    {
      title: "Assistentes",
      list: [
        { icon: MessageSquare, text: "Anotador de Reuniões" },
        { icon: Briefcase, text: "Representante Comercial" },
        { icon: Star, text: "Conselheiro Executivo" },
        { icon: Plus, text: "Criar Assistente" }
      ]
    }
  ];

  const [expandedSections, setExpandedSections] = useState<Record<number, boolean>>(
    // Por padrão, todas as seções começam expandidas
    list.reduce((acc, _, index) => ({ ...acc, [index]: true }), {})
  );

  const toggleSection = (sectionIndex: number) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionIndex]: !prev[sectionIndex]
    }));
  };

  return (
    <div className="w-72 h-full p-3 bg-gradient-to-br from-white to-[#EDF6FF] rounded-3xl flex flex-col">
      {/* Cabeçalho fixo */}
      <div className="flex-shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
            <PanelLeftIcon size={16} />
          </div>
          <h1 className="font-semibold">{title}</h1>
        </div>
        <Button
          leftIcon={buttonIcon}
          className="mt-4"
          text={buttonText}
        />
        <Stroke className="my-4" />
      </div>

      {/* Área com scroll */}
      <div className="flex-1 overflow-y-auto">
        <div className="space-y-4">
          {list.map((section, sectionIndex) => (
            <div key={sectionIndex} className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleSection(sectionIndex)}
                    className="flex items-center gap-1 hover:bg-gray-100 rounded-md p-1 transition-colors"
                  >
                    <ChevronDown 
                      size={14} 
                      className={`text-gray-500 transition-transform duration-200 ${
                        expandedSections[sectionIndex] ? 'rotate-0' : '-rotate-90'
                      }`}
                    />
                    <h2 className="text-sm font-medium text-gray-700">{section.title}</h2>
                  </button>
                </div>
                {section.actionButton && (
                  <button 
                    onClick={section.actionButton.onClick}
                    className="cursor-pointer text-white w-6 h-6 bg-gray-900 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
                    title={section.actionButton.text}
                  >
                    <section.actionButton.icon size={12} />
                  </button>
                )}
              </div>
              
              {expandedSections[sectionIndex] && (
                <div className="space-y-2"> 
                  {section.list.map((option, optionIndex) => (
                    <Option 
                      key={optionIndex}
                      icon={option.icon} 
                      text={option.text} 
                      page={option.page}
                    />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Rodapé fixo */}
      <div className="flex-shrink-0 flex flex-col gap-2">
        <Stroke className="my-4" />
        <Option
          icon={Settings}
          text="Configurações"
        />
        <Option
          icon={HelpCircle}
          text="Ajuda & Suporte"
        />
      </div>
    </div>
  );
}
