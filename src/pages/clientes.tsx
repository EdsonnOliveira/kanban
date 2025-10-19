import Container from '../components/Container';
import { Users, Plus, Calendar, TrendingUp, CheckCircle, Clock, Star } from 'lucide-react';
import Box from '../components/Box';
import MetricCard from '../components/MetricCard';
import { useNavigationStore } from '../store/useNavigationStore';

// Dados dos clientes
const clients = [
  {
    id: 1,
    name: "TechCorp Solutions",
    status: "Ativo",
    value: "R$ 45.000",
    lastContact: "2 dias atrás",
    priority: "Alta",
    color: "bg-blue-500",
    avatar: "T",
    contact: "João Silva"
  },
  {
    id: 2,
    name: "Digital Agency",
    status: "Prospecto",
    value: "R$ 12.000",
    lastContact: "1 semana atrás",
    priority: "Média",
    color: "bg-orange-500",
    avatar: "D",
    contact: "Maria Santos"
  },
  {
    id: 3,
    name: "StartupXYZ",
    status: "Inativo",
    value: "R$ 8.500",
    lastContact: "1 mês atrás",
    priority: "Baixa",
    color: "bg-gray-500",
    avatar: "S",
    contact: "Pedro Costa"
  }
];

// Dados das métricas
const metrics = [
  {
    title: "Clientes Ativos",
    value: "24",
    change: "+3",
    icon: TrendingUp,
    color: "text-blue-600"
  },
  {
    title: "Novos Clientes",
    value: "8",
    change: "+2",
    icon: CheckCircle,
    color: "text-green-600"
  },
  {
    title: "Em Negociação",
    value: "5",
    change: "+1",
    icon: Clock,
    color: "text-orange-600"
  },
  {
    title: "Faturamento",
    value: "R$ 180k",
    change: "+15%",
    icon: Star,
    color: "text-purple-600"
  }
];

// Dados das atividades recentes
const recentActivities = [
  {
    id: 1,
    action: "Reunião agendada",
    client: "TechCorp Solutions",
    user: "João Silva",
    time: "1 hora atrás",
    avatar: "J"
  },
  {
    id: 2,
    action: "Proposta enviada",
    client: "Digital Agency",
    user: "Maria Santos",
    time: "3 horas atrás",
    avatar: "M"
  },
  {
    id: 3,
    action: "Contrato assinado",
    client: "StartupXYZ",
    user: "Pedro Costa",
    time: "1 dia atrás",
    avatar: "P"
  }
];

export default function Clientes() {
  const { setCurrentPage } = useNavigationStore();

  const handleVerTodas = () => {
    setCurrentPage('tarefas');
  };

  return (
    <div className="w-full h-full flex gap-4">
      <Container
        icon={Users}
        title="Gerencie seus clientes"
        description="Crie, edite e gerencie seus clientes de forma simples e eficiente."
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

          {/* Clientes e Atividades */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Lista de Clientes */}
            <div className="lg:col-span-2">
              <Box
                title="CLIENTES"
                actionButtonText="Novo Cliente"
                actionButtonIcon={Plus}
                onActionButtonClick={() => console.log('Novo Cliente clicked')}
              >
                <div className="space-y-4">
                  {clients.map((client) => (
                    <div key={client.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl">
                      {/* Status indicator */}
                      <div className={`w-3 h-3 ${client.color} rounded-full`}></div>
                      
                      {/* Client info */}
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold text-gray-800">{client.name}</h3>
                          <span className="text-sm text-gray-500">{client.lastContact}</span>
                        </div>
                        
                        <div className="flex items-center gap-4 mb-3">
                          <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-xs font-medium">
                            {client.status}
                          </span>
                          <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-xs font-medium">
                            {client.priority}
                          </span>
                        </div>
                        
                        {/* Value and Contact */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-600">Valor:</span>
                            <span className="text-sm font-semibold text-gray-800">{client.value}</span>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-600">Contato:</span>
                            <div className="flex items-center gap-2">
                              <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center text-xs font-medium text-gray-600">
                                {client.avatar}
                              </div>
                              <span className="text-sm text-gray-700">{client.contact}</span>
                            </div>
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
                        <p className="text-sm text-gray-600">{activity.client}</p>
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
