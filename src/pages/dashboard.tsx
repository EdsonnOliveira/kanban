
import Container from '../components/Container';
import { BarChart3, Plus, TrendingUp, CheckCircle, Users, Target, Brain, Calendar } from 'lucide-react';
import Box from '../components/Box';
import MetricCard from '../components/MetricCard';
import { useNavigationStore } from '../store/useNavigationStore';

// Dados das métricas gerais
const generalMetrics = [
  {
    title: "Total de Projetos",
    value: "24",
    change: "+3",
    icon: Target,
    color: "text-blue-600"
  },
  {
    title: "Atividades Ativas",
    value: "15",
    change: "+3",
    icon: TrendingUp,
    color: "text-green-600"
  },
  {
    title: "Planos Concluídos",
    value: "8",
    change: "+2",
    icon: CheckCircle,
    color: "text-purple-600"
  },
  {
    title: "Clientes Ativos",
    value: "12",
    change: "+1",
    icon: Users,
    color: "text-orange-600"
  }
];

// Dados dos projetos recentes
const recentProjects = [
  {
    id: 1,
    name: "Design de Produto",
    category: "Design UI",
    progress: "75%",
    members: ["M", "A", "S"],
    color: "bg-blue-500",
    status: "Em Andamento"
  },
  {
    id: 2,
    name: "Campanha Marketing",
    category: "Marketing",
    progress: "45%",
    members: ["J", "L"],
    color: "bg-green-500",
    status: "Em Andamento"
  },
  {
    id: 3,
    name: "Identidade Visual",
    category: "Branding",
    progress: "100%",
    members: ["M", "A"],
    color: "bg-purple-500",
    status: "Concluído"
  }
];

// Dados das atividades recentes
const recentActivities = [
  {
    id: 1,
    title: "Reunião de Planejamento",
    type: "Reunião",
    time: "10:00",
    participants: ["M", "A", "S"],
    status: "Agendada"
  },
  {
    id: 2,
    title: "Review do Design",
    type: "Revisão",
    time: "14:30",
    participants: ["M", "J"],
    status: "Em Andamento"
  },
  {
    id: 3,
    title: "Apresentação Cliente",
    type: "Apresentação",
    time: "16:00",
    participants: ["A", "L"],
    status: "Concluída"
  }
];

// Dados dos planos em andamento
const activePlans = [
  {
    id: 1,
    name: "Plano de Marketing Q1",
    category: "Marketing",
    progress: "60%",
    deadline: "31 Mar",
    responsible: "Ana Silva"
  },
  {
    id: 2,
    name: "Estratégia de Produto",
    category: "Produto",
    progress: "30%",
    deadline: "15 Abr",
    responsible: "João Santos"
  },
  {
    id: 3,
    name: "Expansão de Mercado",
    category: "Vendas",
    progress: "80%",
    deadline: "30 Mar",
    responsible: "Maria Costa"
  }
];

export default function Dashboard() {
  const { setCurrentPage } = useNavigationStore();

  const handleNavigateToPage = (page: string) => {
    setCurrentPage(page);
  };

  return (
    <div className="w-full h-full flex gap-4">
      <Container
        icon={BarChart3}
        title="Dashboard Geral"
        description="Visão geral de todos os projetos, atividades, planos e clientes da sua empresa."
      >
        <div className="flex flex-col gap-6">
          {/* Métricas Gerais */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {generalMetrics.map((metric, index) => (
              <MetricCard
                key={index}
                title={metric.title}
                value={metric.value}
                change={metric.change}
                icon={metric.icon}
                color={metric.color}
              />
            ))}
          </div>

          {/* Grid Principal */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Projetos Recentes */}
            <Box
              title="SEUS PROJETOS"
              actionButtonText="Ver Todos"
              actionButtonIcon={Plus}
              onActionButtonClick={() => handleNavigateToPage('projetos')}
            >
              <div className="space-y-4">
                {recentProjects.map((project) => (
                  <div key={project.id} className="flex items-center gap-4 p-3 bg-gray-50 rounded-2xl">
                    {/* Color indicator */}
                    <div className={`w-1 h-12 ${project.color} rounded-full`}></div>
                    
                    {/* Project info */}
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-gray-800">{project.name}</h3>
                        <span className="text-sm text-gray-500">{project.progress}</span>
                      </div>
                      
                      <div className="flex items-center gap-3 mb-2">
                        <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-xs font-medium">
                          {project.category}
                        </span>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          project.status === 'Concluído' 
                            ? 'bg-green-100 text-green-600' 
                            : 'bg-blue-100 text-blue-600'
                        }`}>
                          {project.status}
                        </span>
                      </div>
                      
                      {/* Members */}
                      <div className="flex items-center gap-2">
                        <div className="flex -space-x-2">
                          {project.members.map((member, memberIndex) => (
                            <div key={memberIndex} className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center text-xs font-medium text-gray-600 border-2 border-white">
                              {member}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Box>

            {/* Atividades Recentes */}
            <Box
              title="SUAS ATIVIDADES"
              actionButtonText="Ver Todas"
              actionButtonIcon={Plus}
              onActionButtonClick={() => handleNavigateToPage('atividades')}
            >
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-center gap-4 p-3 bg-gray-50 rounded-2xl">
                    {/* Time */}
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium text-blue-600">{activity.time}</span>
                    </div>
                    
                    {/* Activity info */}
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-semibold text-gray-800">{activity.title}</h3>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          activity.status === 'Concluída' 
                            ? 'bg-green-100 text-green-600' 
                            : activity.status === 'Em Andamento'
                            ? 'bg-blue-100 text-blue-600'
                            : 'bg-gray-100 text-gray-600'
                        }`}>
                          {activity.status}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-xs font-medium">
                          {activity.type}
                        </span>
                        
                        {/* Participants */}
                        <div className="flex -space-x-2">
                          {activity.participants.map((participant, participantIndex) => (
                            <div key={participantIndex} className="w-5 h-5 bg-gray-300 rounded-full flex items-center justify-center text-xs font-medium text-gray-600 border-2 border-white">
                              {participant}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Box>
          </div>

          {/* Planos em Andamento */}
          <Box
            title="PLANOS EM ANDAMENTO"
            actionButtonText="Ver Todos"
            actionButtonIcon={Plus}
            onActionButtonClick={() => handleNavigateToPage('planos')}
          >
            <div className="space-y-4">
              {activePlans.map((plan) => (
                <div key={plan.id} className="flex items-center gap-4 p-3 bg-gray-50 rounded-2xl">
                  {/* Progress indicator */}
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-white">{plan.progress}</span>
                  </div>
                  
                  {/* Plan info */}
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-gray-800">{plan.name}</h3>
                      <span className="text-sm text-gray-500">Prazo: {plan.deadline}</span>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-xs font-medium">
                        {plan.category}
                      </span>
                      <span className="text-sm text-gray-600">Responsável: {plan.responsible}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Box>

          {/* Acesso Rápido */}
          <Box
            title="ACESSO RÁPIDO"
            hideHeader={false}
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <button
                onClick={() => handleNavigateToPage('projetos')}
                className="flex flex-col items-center gap-2 p-4 bg-blue-50 rounded-2xl hover:bg-blue-100 transition-colors"
              >
                <Target className="w-8 h-8 text-blue-600" />
                <span className="text-sm font-medium text-blue-800">Projetos</span>
              </button>
              
              <button
                onClick={() => handleNavigateToPage('atividades')}
                className="flex flex-col items-center gap-2 p-4 bg-green-50 rounded-2xl hover:bg-green-100 transition-colors"
              >
                <Calendar className="w-8 h-8 text-green-600" />
                <span className="text-sm font-medium text-green-800">Atividades</span>
              </button>
              
              <button
                onClick={() => handleNavigateToPage('planos')}
                className="flex flex-col items-center gap-2 p-4 bg-purple-50 rounded-2xl hover:bg-purple-100 transition-colors"
              >
                <Brain className="w-8 h-8 text-purple-600" />
                <span className="text-sm font-medium text-purple-800">Planos</span>
              </button>
              
              <button
                onClick={() => handleNavigateToPage('clientes')}
                className="flex flex-col items-center gap-2 p-4 bg-orange-50 rounded-2xl hover:bg-orange-100 transition-colors"
              >
                <Users className="w-8 h-8 text-orange-600" />
                <span className="text-sm font-medium text-orange-800">Clientes</span>
              </button>
            </div>
          </Box>
        </div>
      </Container>
    </div>
  );
}
