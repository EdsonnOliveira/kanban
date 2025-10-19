import Container from '../components/Container';
import { Activity, Plus, BarChart3, Check, TrendingUp, CheckCircle, Clock, Users } from 'lucide-react';
import Box from '../components/Box';
import MetricCard from '../components/MetricCard';

// Dados dos projetos
const projects = [
  {
    percentage: "53.83%",
    date: "21 Sep, 2021",
    category: "Design UI",
    title: "Design de Produto",
    members: ["M", "A", "S"],
    color: "bg-orange-500"
  },
  {
    percentage: "78.12%",
    date: "22 Sep, 2021", 
    category: "After Effects",
    title: "Design de Movimento",
    members: ["M", "A"],
    color: "bg-red-500"
  },
  {
    percentage: "91.45%",
    date: "23 Sep, 2021",
    category: "Mídia Social",
    title: "Promoção Social",
    members: ["M", "A", "S", "J"],
    color: "bg-blue-500"
  }
];

// Dados dos membros
const members = [
  {
    id: 1,
    name: "Max Maraston",
    project: "Promoção So...",
    projectColor: "bg-orange-500",
    role: "Administrador",
    avatar: "M"
  },
  {
    id: 2,
    name: "Anna Smith",
    project: "Design de Produto",
    projectColor: "bg-red-500",
    role: "Admin",
    avatar: "A"
  },
  {
    id: 3,
    name: "John Doe",
    project: "Design de Movimento",
    projectColor: "bg-blue-500",
    role: "Membro",
    avatar: "J"
  }
];

// Dados das tarefas
const tasks = [
  {
    id: 1,
    title: "Design do Logo",
    description: "Por favor use o Pass...",
    avatar: "M",
    completed: false
  },
  {
    id: 2,
    title: "Stories Insta...",
    description: "Promoção",
    avatar: "A",
    completed: false
  },
  {
    id: 3,
    title: "Identidade Visual",
    description: "Mudança de identidade...",
    avatar: "J",
    completed: true
  }
];

// Dados das métricas
const metrics = [
  {
    title: "Atividades Ativas",
    value: "15",
    change: "+3",
    icon: TrendingUp,
    color: "text-blue-600"
  },
  {
    title: "Concluídas",
    value: "28",
    change: "+5",
    icon: CheckCircle,
    color: "text-green-600"
  },
  {
    title: "Em Atraso",
    value: "4",
    change: "-1",
    icon: Clock,
    color: "text-red-600"
  },
  {
    title: "Membros Ativos",
    value: "12",
    change: "+2",
    icon: Users,
    color: "text-purple-600"
  }
];

export default function Atividades() {
  return (
    <div className="w-full h-full flex gap-4">
      <Container
        icon={Activity}
        title="Gerencie suas atividades"
        description="Crie, edite e gerencie suas atividades de forma simples e eficiente."
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

          {/* Top Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Product Status Card */}
            <div className="lg:col-span-3">
              <Box
                title="STATUS DO PRODUTO"
                value="72"
                filterOptions={[{ label: "Design", value: "design" }]}
                onFilterChange={(value) => console.log('Filter changed:', value)}
                actionButtonText="Monitorar itens"
                actionButtonIcon={BarChart3}
                onActionButtonClick={() => console.log('Monitorar itens clicked')}
              >
                {/* Project Items */}
                <div className="space-y-4">
                  {projects.map((project, index) => (
                    <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl">
                      {/* Color indicator */}
                      <div className={`w-1 h-16 ${project.color} rounded-full`}></div>
                      
                      {/* Project info */}
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-2xl font-bold text-gray-800">{project.percentage}</span>
                          <span className="text-sm text-gray-500">{project.date}</span>
                        </div>
                        
                        <div className="flex items-center gap-3 mb-2">
                          <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-xs font-medium">
                            {project.category}
                          </span>
                          <h3 className="font-semibold text-gray-800">{project.title}</h3>
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
                          <button className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-300 transition-colors">
                            <Plus size={12} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Box>
            </div>
            
          </div>
          
          {/* Bottom Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Member Status Card */}
            <Box
              title="STATUS DOS MEMBROS"
              actionButtonText="Novo Membro"
              actionButtonIcon={Plus}
              onActionButtonClick={() => console.log('Novo Membro clicked')}
            >
              {/* Members List */}
              <div className="space-y-4">
                {members.map((member) => (
                  <div key={member.id} className="flex items-center gap-4 p-3 bg-gray-50 rounded-2xl">
                    {/* Number */}
                    <span className="text-sm font-medium text-gray-500 w-6">{member.id}</span>
                    
                    {/* Avatar */}
                    <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-sm font-medium text-gray-600">
                      {member.avatar}
                    </div>
                    
                    {/* Member Info */}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-gray-800">{member.name}</span>
                      </div>
                      
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <span>Trabalha em</span>
                          <div className="flex items-center gap-1">
                            <div className={`w-2 h-2 ${member.projectColor} rounded-full`}></div>
                            <span>{member.project}</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <span>Acesso</span>
                          <span className="font-medium">{member.role}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Box>
            
            {/* Today Tasks Card */}
            <Box
              title="TAREFAS DE HOJE"
              actionButtonText="Nova Tarefa"
              actionButtonIcon={Plus}
              onActionButtonClick={() => console.log('Nova Tarefa clicked')}
            >
              {/* Tasks List */}
              <div className="space-y-4">
                {tasks.map((task) => (
                  <div key={task.id} className="flex items-center gap-4 p-3 bg-gray-50 rounded-2xl">
                    {/* Checkbox */}
                    <button className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                      task.completed 
                        ? 'bg-green-500 border-green-500' 
                        : 'border-gray-300 hover:border-gray-400'
                    }`}>
                      {task.completed && <Check size={14} className="text-white" />}
                    </button>
                    
                    {/* Avatar */}
                    <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-sm font-medium text-gray-600">
                      {task.avatar}
                    </div>
                    
                    {/* Task Info */}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm text-gray-500">Tarefa</span>
                        <span className="font-semibold text-gray-800">{task.title}</span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-500">Descrição</span>
                        <span className="text-sm text-gray-600">{task.description}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Box>
          </div>
        </div>
      </Container>
    </div>
  );
}
