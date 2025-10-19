import Container from '../components/Container';
import { Lightbulb, Plus, TrendingUp, CheckCircle, Clock, Target } from 'lucide-react';
import Box from '../components/Box';
import MetricCard from '../components/MetricCard';
import CardInfo from '../components/CardInfo';
import { useHypothesisDrawerStore } from '../store/useHypothesisDrawerStore';

// Interface para hipóteses
interface Hypothesis {
  id: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  status: 'todo' | 'in-progress' | 'done';
  createdAt: string;
  assignedUsers: string[];
  comments: number;
  attachments: number;
  validationDate?: string;
  successRate?: number;
  hypothesis?: {
    belief: string;
    test: string;
    cost: 'low' | 'medium' | 'high';
    time: 'low' | 'medium' | 'high';
    confidence: 'low' | 'medium' | 'high';
  };
}

// Dados das hipóteses
const hypotheses: Hypothesis[] = [
  {
    id: '1',
    title: 'Implementar autenticação social',
    description: 'Login Social',
    priority: 'high',
    status: 'in-progress',
    createdAt: '2024-01-15',
    assignedUsers: ['Ana Silva', 'Carlos Santos'],
    comments: 5,
    attachments: 2,
    validationDate: '2024-02-15',
    successRate: 75,
    hypothesis: {
      belief: 'Permitir login com Google e Facebook vai aumentar as conversões em 25%',
      test: 'Implementar botões de login social e medir taxa de conversão por 30 dias',
      cost: 'medium',
      time: 'medium',
      confidence: 'high'
    }
  },
  {
    id: '2',
    title: 'Reduzir tempo de carregamento',
    description: 'Performance',
    priority: 'medium',
    status: 'todo',
    createdAt: '2024-01-20',
    assignedUsers: ['Maria Costa'],
    comments: 3,
    attachments: 1,
    validationDate: '2024-03-01',
    successRate: 0,
    hypothesis: {
      belief: 'Reduzir o tempo de carregamento vai diminuir a taxa de abandono em 15%',
      test: 'Otimizar imagens, implementar lazy loading e medir métricas de performance',
      cost: 'low',
      time: 'medium',
      confidence: 'medium'
    }
  },
  {
    id: '3',
    title: 'Adicionar notificações push',
    description: 'Engajamento',
    priority: 'high',
    status: 'done',
    createdAt: '2024-01-10',
    assignedUsers: ['Pedro Oliveira', 'Julia Ferreira'],
    comments: 8,
    attachments: 4,
    validationDate: '2024-01-30',
    successRate: 90,
    hypothesis: {
      belief: 'Notificações push vão aumentar o engajamento dos usuários em 40%',
      test: 'Implementar sistema de notificações e medir taxa de abertura e cliques',
      cost: 'high',
      time: 'high',
      confidence: 'high'
    }
  },
  {
    id: '4',
    title: 'Melhorar busca de produtos',
    description: 'Busca Avançada',
    priority: 'medium',
    status: 'in-progress',
    createdAt: '2024-01-25',
    assignedUsers: ['Ana Silva', 'Maria Costa'],
    comments: 6,
    attachments: 3,
    validationDate: '2024-03-15',
    successRate: 0,
    hypothesis: {
      belief: 'Filtros avançados e busca por voz vão aumentar as vendas em 20%',
      test: 'Implementar funcionalidades de busca e medir conversão de busca para compra',
      cost: 'medium',
      time: 'high',
      confidence: 'medium'
    }
  },
  {
    id: '5',
    title: 'Criar programa de fidelidade',
    description: 'Fidelidade',
    priority: 'low',
    status: 'todo',
    createdAt: '2024-02-01',
    assignedUsers: ['Carlos Santos'],
    comments: 2,
    attachments: 1,
    validationDate: '2024-04-01',
    successRate: 0,
    hypothesis: {
      belief: 'Programa de fidelidade vai aumentar a retenção de clientes em 30%',
      test: 'Implementar sistema de pontos e medir taxa de retenção e recompra',
      cost: 'high',
      time: 'high',
      confidence: 'low'
    }
  }
];

// Dados das métricas
const metrics = [
  {
    title: "Hipóteses Ativas",
    value: "12",
    change: "+3",
    icon: TrendingUp,
    color: "text-blue-600"
  },
  {
    title: "Validadas",
    value: "8",
    change: "+2",
    icon: CheckCircle,
    color: "text-green-600"
  },
  {
    title: "Em Teste",
    value: "4",
    change: "+1",
    icon: Clock,
    color: "text-orange-600"
  },
  {
    title: "Taxa de Sucesso",
    value: "68%",
    change: "+5%",
    icon: Target,
    color: "text-purple-600"
  }
];

export default function ProjetosHipoteses() {
  const { openHypothesisDrawer } = useHypothesisDrawerStore();

  const handleNewHypothesis = () => {
    openHypothesisDrawer();
  };

  const handleEditHypothesis = (hypothesis: Hypothesis) => {
    console.log('Editar hipótese:', hypothesis.title);
    // Aqui você pode abrir um modal de edição ou navegar para uma página de edição
  };

  const handleDeleteHypothesis = (hypothesis: Hypothesis) => {
    console.log('Deletar hipótese:', hypothesis.title);
    // Aqui você pode confirmar e deletar a hipótese
  };

  const handleDoubleClickHypothesis = (hypothesis: Hypothesis) => {
    console.log('Duplo clique na hipótese:', hypothesis.title);
    // Aqui você pode abrir detalhes da hipótese
  };

  return (
    <div className="w-full h-full flex gap-4">
      <Container
        icon={Lightbulb}
        title="Hipóteses dos Projetos"
        description="Teste e valide hipóteses para melhorar seus produtos e processos."
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

          {/* Lista de Hipóteses */}
          <Box
            title="HIPÓTESES"
            actionButtonText="Nova Hipótese"
            actionButtonIcon={Plus}
            onActionButtonClick={handleNewHypothesis}
          >
            <div className="space-y-3">
              {hypotheses.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  Nenhuma hipótese encontrada
                </div>
              ) : (
                hypotheses.map((hypothesis) => (
                  <CardInfo
                    key={hypothesis.id}
                    id={hypothesis.id}
                    title={hypothesis.title}
                    description={hypothesis.description}
                    priority={hypothesis.priority}
                    status={hypothesis.status}
                    createdAt={hypothesis.createdAt}
                    assignedUsers={hypothesis.assignedUsers}
                    comments={hypothesis.comments}
                    attachments={hypothesis.attachments}
                    onDoubleClick={(taskId) => handleDoubleClickHypothesis(hypothesis)}
                    onEdit={(taskId) => handleEditHypothesis(hypothesis)}
                    onDelete={(taskId) => handleDeleteHypothesis(hypothesis)}
                    variant="columns"
                    hypothesis={hypothesis.hypothesis}
                  />
                ))
              )}
            </div>
          </Box>
        </div>
      </Container>
    </div>
  );
}
