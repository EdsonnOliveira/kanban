import Container from '../components/Container';
import { Brain, Plus, Users, Calendar, TrendingUp, Clock, CheckCircle } from 'lucide-react';
import Box from '../components/Box';
import MetricCard from '../components/MetricCard';
import { useProjectStore } from '../store/useProjectStore';
import { useNavigationStore } from '../store/useNavigationStore';

// Dados dos projetos
const projects = [
  {
    id: 1,
    name: "E-commerce Platform",
    status: "Em andamento",
    progress: 75,
    team: ["A", "B", "C"],
    deadline: "15 Jan, 2024",
    priority: "Alta",
    color: "bg-blue-500"
  },
  {
    id: 2,
    name: "Mobile App",
    status: "Planejamento",
    progress: 25,
    team: ["D", "E"],
    deadline: "28 Fev, 2024",
    priority: "Média",
    color: "bg-orange-500"
  },
  {
    id: 3,
    name: "Website Redesign",
    status: "Concluído",
    progress: 100,
    team: ["F", "G", "H"],
    deadline: "10 Jan, 2024",
    priority: "Baixa",
    color: "bg-green-500"
  }
];

// Dados das métricas
const metrics = [
  {
    title: "Projetos Ativos",
    value: "12",
    change: "+2",
    icon: TrendingUp,
    color: "text-blue-600"
  },
  {
    title: "Concluídos",
    value: "8",
    change: "+1",
    icon: CheckCircle,
    color: "text-green-600"
  },
  {
    title: "Em Atraso",
    value: "3",
    change: "-1",
    icon: Clock,
    color: "text-red-600"
  },
  {
    title: "Membros",
    value: "24",
    change: "+3",
    icon: Users,
    color: "text-purple-600"
  }
];

// Dados das atividades recentes
const recentActivities = [
  {
    id: 1,
    action: "Projeto criado",
    project: "E-commerce Platform",
    user: "João Silva",
    time: "2 horas atrás",
    avatar: "J"
  },
  {
    id: 2,
    action: "Tarefa concluída",
    project: "Mobile App",
    user: "Maria Santos",
    time: "4 horas atrás",
    avatar: "M"
  },
  {
    id: 3,
    action: "Reunião agendada",
    project: "Website Redesign",
    user: "Pedro Costa",
    time: "1 dia atrás",
    avatar: "P"
  }
];

export default function Projetos() {
  const { openProjectsDrawer } = useProjectStore();
  const { setCurrentPage } = useNavigationStore();

  const handleVerTodas = () => {
    setCurrentPage('tarefas');
  };

  return (
    <div className="w-full h-full flex gap-4">
      <Container
        icon={Brain}
        title="Gerencie seus projetos"
        description="Crie, edite e gerencie seus projetos de forma simples e eficiente."
      >
        <div className="flex flex-col gap-6">
          {/* Métricas */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {metrics.map((metric, index) => (
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

          {/* Projetos e Atividades */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Lista de Projetos */}
            <div className="lg:col-span-2">
              <Box
                title="PROJETOS"
                actionButtonText="Novo Projeto"
                actionButtonIcon={Plus}
                onActionButtonClick={openProjectsDrawer}
              >
                <div className="space-y-4">
                  {projects.map((project) => (
                    <div key={project.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl">
                      {/* Status indicator */}
                      <div className={`w-3 h-3 ${project.color} rounded-full`}></div>
                      
                      {/* Project info */}
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold text-gray-800">{project.name}</h3>
                          <span className="text-sm text-gray-500">{project.deadline}</span>
                        </div>
                        
                        <div className="flex items-center gap-4 mb-3">
                          <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-xs font-medium">
                            {project.status}
                          </span>
                          <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-xs font-medium">
                            {project.priority}
                          </span>
                        </div>
                        
                        {/* Progress bar */}
                        <div className="mb-2">
                          <div className="flex justify-between text-sm text-gray-600 mb-1">
                            <span>Progresso</span>
                            <span>{project.progress}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full ${project.color}`}
                              style={{ width: `${project.progress}%` }}
                            ></div>
                          </div>
                        </div>
                        
                        {/* Team */}
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-600">Equipe:</span>
                          <div className="flex -space-x-2">
                            {project.team.map((member, memberIndex) => (
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
            </div>
            
            {/* Atividades Recentes */}
            <div>
              <Box
                title="ATIVIDADES RECENTES"
                actionButtonText="Ver Todas"
                actionButtonIcon={Calendar}
                onActionButtonClick={handleVerTodas}
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
                        <p className="text-sm text-gray-600">{activity.project}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs text-gray-500">{activity.user}</span>
                          <span className="text-xs text-gray-400">•</span>
                          <span className="text-xs text-gray-500">{activity.time}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Box>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
