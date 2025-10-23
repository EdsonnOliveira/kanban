import Container from '../components/Container';
import { Target, Plus, Calendar } from 'lucide-react';
import Box from '../components/Box';
import Button from '../components/Button';
import DocumentTypeCard, { documentTypes } from '../components/DocumentTypeCard';
import Modal from '../components/Modal';
import TabBar from '../components/TabBar';
import IdentityForm from '../components/IdentityForm';
import CultureForm from '../components/CultureForm';
import PlanningForm from '../components/PlanningForm';
import ExpressionForm from '../components/ExpressionForm';
import PDFUpload from '../components/PDFUpload';
import { useNavigationStore } from '../store/useNavigationStore';
import { useState } from 'react';

// Dados dos planos
const plans = [
  {
    id: 1,
    name: "Plano Estratégico 2024",
    status: "Em execução",
    progress: 60,
    responsible: "Ana Silva",
    deadline: "31 Mar, 2024",
    priority: "Alta",
    color: "bg-blue-500",
    avatar: "A"
  },
  {
    id: 2,
    name: "Plano de Marketing Q1",
    status: "Revisão",
    progress: 85,
    responsible: "Carlos Santos",
    deadline: "15 Fev, 2024",
    priority: "Média",
    color: "bg-orange-500",
    avatar: "C"
  },
  {
    id: 3,
    name: "Plano de Expansão",
    status: "Aprovado",
    progress: 100,
    responsible: "Maria Costa",
    deadline: "10 Jan, 2024",
    priority: "Baixa",
    color: "bg-green-500",
    avatar: "M"
  }
];

// Dados das métricas (comentado para evitar warning de variável não utilizada)
/*
const metrics = [
  {
    title: "Planos Ativos",
    value: "8",
    change: "+1",
    icon: TrendingUp,
    color: "text-blue-600"
  },
  {
    title: "Aprovados",
    value: "5",
    change: "+2",
    icon: CheckCircle,
    color: "text-green-600"
  },
  {
    title: "Em Revisão",
    value: "2",
    change: "0",
    icon: Clock,
    color: "text-orange-600"
  },
  {
    title: "Responsáveis",
    value: "12",
    change: "+1",
    icon: Users,
    color: "text-purple-600"
  }
];
*/

// Dados das atividades recentes
const recentActivities = [
  {
    id: 1,
    action: "Plano aprovado",
    plan: "Plano de Expansão",
    user: "Maria Costa",
    time: "1 hora atrás",
    avatar: "M"
  },
  {
    id: 2,
    action: "Revisão solicitada",
    plan: "Plano de Marketing Q1",
    user: "Carlos Santos",
    time: "3 horas atrás",
    avatar: "C"
  },
  {
    id: 3,
    action: "Meta atualizada",
    plan: "Plano Estratégico 2024",
    user: "Ana Silva",
    time: "1 dia atrás",
    avatar: "A"
  }
];

export default function Planos() {
  const { setCurrentPage } = useNavigationStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDocumentType, setSelectedDocumentType] = useState<{
    title: string;
    description: string;
  } | null>(null);
  const [activeTab, setActiveTab] = useState('formulario');

  const handleVerTodas = () => {
    setCurrentPage('tarefas');
  };

  const handleDocumentTypeClick = (docType: { id: string; title: string; icon: React.ComponentType<{ size?: number; className?: string }>; color: string; route: string }) => {
    setSelectedDocumentType({
      title: docType.title,
      description: getDocumentDescription(docType.id)
    });
    setIsModalOpen(true);
  };

  const getDocumentDescription = (id: string) => {
    const descriptions: Record<string, string> = {
      'identidade': 'Defina a identidade da sua empresa, incluindo missão, visão, valores e posicionamento no mercado.',
      'cultura': 'Estabeleça a cultura organizacional, valores compartilhados e ambiente de trabalho da sua empresa.',
      'planejamento': 'Crie planos estratégicos, objetivos e metas para o crescimento sustentável do seu negócio.',
      'expressao': 'Desenvolva a expressão visual e comunicacional da sua marca para o mercado.'
    };
    return descriptions[id] || 'Configure este tipo de documento para sua empresa.';
  };

  const getFormComponent = (documentType: string) => {
    switch (documentType) {
      case 'identidade':
        return <IdentityForm />;
      case 'cultura':
        return <CultureForm />;
      case 'planejamento':
        return <PlanningForm />;
      case 'expressão':
        return <ExpressionForm />;
      default:
        return <IdentityForm />;
    }
  };

  const tabs = [
    {
      id: 'formulario',
      label: 'Formulário',
      content: selectedDocumentType ? getFormComponent(selectedDocumentType.title.toLowerCase()) : <IdentityForm />
    },
    {
      id: 'anexar',
      label: 'Anexar PDF',
      content: <PDFUpload />
    }
  ];

  return (
    <div className="w-full h-full flex gap-4">
      <Container
        icon={Target}
        title="Escreva seu propósito..."
        description="Crie, edite e gerencie seus planos de forma simples e eficiente."
        enableEdit={['title', 'description', 'icon', 'banner']}
      >
        <div className="flex flex-col gap-6">
          {/* Tipos de Documento */}
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {documentTypes.map((docType) => (
                <DocumentTypeCard
                  key={docType.id}
                  title={docType.title}
                  icon={docType.icon}
                  color={docType.color}
                  onClick={() => handleDocumentTypeClick(docType)}
                />
              ))}
            </div>
          </div>

          {/* Planos e Atividades */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Lista de Planos */}
            <div className="lg:col-span-2">
              <Box
                title="PLANOS"
                actionButtonText="Novo Plano"
                actionButtonIcon={Plus}
                onActionButtonClick={() => console.log('Novo Plano clicked')}
              >
                <div className="space-y-4">
                  {plans.map((plan) => (
                    <div key={plan.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl">
                      {/* Status indicator */}
                      <div className={`w-3 h-3 ${plan.color} rounded-full`}></div>
                      
                      {/* Plan info */}
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold text-gray-800">{plan.name}</h3>
                          <span className="text-sm text-gray-500">{plan.deadline}</span>
                        </div>
                        
                        <div className="flex items-center gap-4 mb-3">
                          <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-xs font-medium">
                            {plan.status}
                          </span>
                          <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-xs font-medium">
                            {plan.priority}
                          </span>
                        </div>
                        
                        {/* Progress bar */}
                        <div className="mb-2">
                          <div className="flex justify-between text-sm text-gray-600 mb-1">
                            <span>Progresso</span>
                            <span>{plan.progress}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full ${plan.color}`}
                              style={{ width: `${plan.progress}%` }}
                            ></div>
                          </div>
                        </div>
                        
                        {/* Responsible */}
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-600">Responsável:</span>
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center text-xs font-medium text-gray-600">
                              {plan.avatar}
                            </div>
                            <span className="text-sm text-gray-700">{plan.responsible}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Box>
            </div>
            
            {/* Atividades Recentes */}
            <div>
              <Box
                title="OBJETIVOS"
                actionButtonText="Novo Objetivo"
                actionButtonIcon={Plus}
                onActionButtonClick={() => console.log('Novo Objetivo clicked')}
              >
                <div className="space-y-4">
                  {recentActivities.map((activity) => (
                    <div key={activity.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-2xl">
                      {/* Avatar */}
                      <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-sm font-medium text-gray-600">
                        {activity.avatar}
                      </div>
                      
                      {/* Activity info */}
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-800">{activity.action}</p>
                        <p className="text-sm text-gray-600">{activity.plan}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs text-gray-500">{activity.user}</span>
                          <span className="text-xs text-gray-400">•</span>
                          <span className="text-xs text-gray-500">{activity.time}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {/* Botão Ver Todas abaixo da lista */}
                  <div className="pt-2">
                    <Button
                      text="Ver Todos"
                      leftIcon={Calendar}
                      onClick={handleVerTodas}
                      size="small"
                      style="white"
                      className="w-full"
                    />
                  </div>
                </div>
              </Box>
            </div>
          </div>
        </div>
      </Container>

      {/* Modal */}
      {selectedDocumentType && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={selectedDocumentType.title}
          description={selectedDocumentType.description}
        >
          <TabBar
            tabs={tabs}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />
        </Modal>
      )}
    </div>
  );
}
