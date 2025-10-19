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
  TestTube,
  Video,
  CheckSquare,
  FolderOpen,
  FileText,
  Presentation,
  Grid3X3,
  UserCheck,
  Shield,
  Briefcase,
  Star,
  LayoutDashboard
} from 'lucide-react';
import { useState } from 'react';
import Button from './Button';
import Stroke from './Stroke';
import Option from './Option';
import { useProjectStore } from '@/store/useProjectStore';
import { useActivityStore } from '@/store/useActivityStore';
import { useDocumentDrawerStore } from '@/store/useDocumentDrawerStore';
import { useClientDrawerStore } from '@/store/useClientDrawerStore';

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
  buttonOnClick?: () => void;
}

export default function PanelLeft({
  title,
  buttonText,
  buttonIcon,
  buttonOnClick
}: PanelLeftProps) {
  const { openProjectsDrawer } = useProjectStore();
  const { openActivitiesDrawer } = useActivityStore();
  const { openDocumentDrawerSelector } = useDocumentDrawerStore();
  const { openClientDrawer } = useClientDrawerStore();

  const list: ListSection[] = [
    {
      title: "Planos",
      list: [
        { icon: House, text: "Geral", page: "planos" },
        { icon: Target, text: "Identidade", page: "planos-identidade" },
        { icon: Target, text: "Objetivos", page: "planos-objetivos" },
        { icon: Brain, text: "Cultura", page: "planos-cultura" },
        { icon: BarChart3, text: "Planejamento", page: "planos-planejamento" },
        { icon: MessageSquare, text: "Expressão", page: "planos-expressao" }
      ]
    },
    {
      title: "Projetos",
      list: [
        { icon: House, text: "Geral", page: "projetos" },
        { icon: Lightbulb, text: "Hipóteses", page: "projetos-hipoteses" },
        { icon: TestTube, text: "Testes", page: "projetos-testes" },
        { icon: Users, text: "Membros", page: "projetos-membros" },
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
        { icon: Calendar, text: "Cronograma", page: "atividades-cronograma" },
        { icon: Video, text: "Reuniões", page: "atividades-reunioes" }
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
        { icon: FolderOpen, text: "Pastas", page: "documentos-pastas" },
        { icon: FileText, text: "Recentes", page: "documentos-recentes" }
      ],
      actionButton: {
        icon: Plus,
        text: "Novo Documento",
        onClick: () => openDocumentDrawerSelector()
      }
    },
    {
      title: "Clientes",
      list: [
        { icon: House, text: "Geral", page: "clientes" }
      ],
      actionButton: {
        icon: Plus,
        text: "Novo Cliente",
        onClick: () => openClientDrawer()
      }
    },
    {
      title: "Ferramentas",
      list: [
        { icon: Presentation, text: "Pitch Deck", page: "ferramentas-pitch-deck" },
        { icon: Grid3X3, text: "Business Model Canvas", page: "ferramentas-business-model-canvas" },
        { icon: UserCheck, text: "Ideal Customer Profile", page: "ferramentas-ideal-customer-profile" },
        { icon: Shield, text: "SWOT", page: "ferramentas-swot" },
      ]
    },
    {
      title: "Assistentes",
      list: [
        { icon: MessageSquare, text: "Anotador de Reuniões" },
        { icon: Briefcase, text: "Representante Comercial" },
        { icon: Star, text: "Conselheiro Executivo" },
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
    <div className="w-64 sm:w-72 lg:w-80 h-full p-2 sm:p-3 bg-gradient-to-br from-white to-[#EDF6FF] rounded-2xl sm:rounded-3xl flex flex-col">
      {/* Cabeçalho fixo */}
      <div className="flex-shrink-0">
        <div className="flex items-center gap-1 sm:gap-2">
          <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gray-100 rounded-full flex items-center justify-center">
            <PanelLeftIcon size={12} className="sm:w-4 sm:h-4" />
          </div>
          <h1 className="font-semibold text-sm sm:text-base truncate">{title}</h1>
        </div>
        <Button
          leftIcon={buttonIcon}
          className="mt-3 sm:mt-4"
          text={buttonText}
          onClick={buttonOnClick}
          size="small"
        />
        <Stroke className="my-3 sm:my-4" />
      </div>

      {/* Área com scroll */}
      <div className="flex-1 overflow-y-auto">
        <div className="space-y-3 sm:space-y-4">
          <Option
            icon={LayoutDashboard}
            text="Dashboard"
            page="dashboard"
          />
          {list.map((section, sectionIndex) => (
            <div key={sectionIndex} className="space-y-2 sm:space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 sm:gap-2">
                  <button
                    onClick={() => toggleSection(sectionIndex)}
                    className="flex items-center gap-1 hover:bg-gray-100 rounded-md p-1 transition-colors"
                  >
                    <ChevronDown 
                      size={12} 
                      className={`text-gray-500 transition-transform duration-200 sm:w-3.5 sm:h-3.5 ${
                        expandedSections[sectionIndex] ? 'rotate-0' : '-rotate-90'
                      }`}
                    />
                    <h2 className="text-xs sm:text-sm font-medium text-gray-700">{section.title}</h2>
                  </button>
                </div>
                {section.actionButton && (
                  <button 
                    onClick={section.actionButton.onClick}
                    className="cursor-pointer text-white w-5 h-5 sm:w-6 sm:h-6 bg-gray-900 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
                    title={section.actionButton.text}
                  >
                    <section.actionButton.icon size={10} className="sm:w-3 sm:h-3" />
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
      <div className="flex-shrink-0 flex flex-col gap-1 sm:gap-2">
        <Stroke className="my-3 sm:my-4" />
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
