import Container from '../components/Container';
import { Brain, Plus, Users, TrendingUp, Clock, CheckCircle } from 'lucide-react';
import Box from '../components/Box';
import ProjectCard from '../components/ProjectCard';
import MetricCard from '../components/MetricCard';
import { useProjectStore } from '../store/useProjectStore';
// import { useNavigationStore } from '../store/useNavigationStore';

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

// Dados das atividades recentes (comentado para evitar warning de variável não utilizada)
/*
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
*/

export default function Projetos() {
  const { openProjectsDrawer } = useProjectStore();
  // const { setCurrentPage } = useNavigationStore();

  // const handleVerTodas = () => {
  //   setCurrentPage('tarefas');
  // };

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
            <div className="col-span-3">
              <Box
                title="PROJETOS"
                actionButtonText="Novo Projeto"
                actionButtonIcon={Plus}
                onActionButtonClick={openProjectsDrawer}
              >
                <div className="space-y-4">
                  {projects.map((project) => (
                    <ProjectCard
                      key={project.id}
                      id={project.id.toString()}
                      name={project.name}
                      deadline={project.deadline}
                      status={project.status}
                      priority={project.priority}
                      progress={project.progress}
                      color={project.color}
                      team={project.team}
                    />
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
