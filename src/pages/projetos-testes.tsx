import Container from '../components/Container';
import { TestTube, Plus, TrendingUp, CheckCircle, Clock, BookOpen } from 'lucide-react';
import Box from '../components/Box';
import MetricCard from '../components/MetricCard';
import CardInfo from '../components/CardInfo';
import { useTestDrawerStore } from '../store/useTestDrawerStore';

// Interface para testes
interface Test {
  id: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  status: 'todo' | 'in-progress' | 'done';
  createdAt: string;
  assignedUsers: string[];
  comments: number;
  attachments: number;
  test?: {
    belief: string;
    test: string;
    cost: 'low' | 'medium' | 'high';
    time: 'low' | 'medium' | 'high';
    confidence: 'low' | 'medium' | 'high';
  };
}

// Dados dos testes
const tests: Test[] = [
  {
    id: '1',
    title: 'Teste de Autenticação Social',
    description: 'Login Social',
    priority: 'high',
    status: 'done',
    createdAt: '2024-01-15',
    assignedUsers: ['Ana Silva', 'Carlos Santos'],
    comments: 8,
    attachments: 3,
    test: {
      belief: 'Login social vai aumentar conversões em 25%',
      test: 'Implementar botões de login social e medir taxa de conversão',
      cost: 'medium',
      time: 'medium',
      confidence: 'high'
    }
  },
  {
    id: '2',
    title: 'Teste de Performance',
    description: 'Otimização',
    priority: 'medium',
    status: 'in-progress',
    createdAt: '2024-01-20',
    assignedUsers: ['Maria Costa'],
    comments: 5,
    attachments: 2,
    test: {
      belief: 'Reduzir tempo de carregamento vai diminuir abandono em 15%',
      test: 'Otimizar imagens e implementar lazy loading',
      cost: 'low',
      time: 'medium',
      confidence: 'medium'
    }
  },
  {
    id: '3',
    title: 'Teste de Notificações',
    description: 'Engajamento',
    priority: 'high',
    status: 'done',
    createdAt: '2024-01-10',
    assignedUsers: ['Pedro Oliveira', 'Julia Ferreira'],
    comments: 12,
    attachments: 5,
    test: {
      belief: 'Notificações push vão aumentar engajamento em 40%',
      test: 'Implementar sistema de notificações e medir taxa de abertura',
      cost: 'high',
      time: 'high',
      confidence: 'high'
    }
  },
  {
    id: '4',
    title: 'Teste de Busca Avançada',
    description: 'Funcionalidade',
    priority: 'medium',
    status: 'todo',
    createdAt: '2024-01-25',
    assignedUsers: ['Ana Silva', 'Maria Costa'],
    comments: 3,
    attachments: 1,
    test: {
      belief: 'Filtros avançados vão aumentar vendas em 20%',
      test: 'Implementar funcionalidades de busca e medir conversão',
      cost: 'medium',
      time: 'high',
      confidence: 'medium'
    }
  },
  {
    id: '5',
    title: 'Teste de Programa de Fidelidade',
    description: 'Retenção',
    priority: 'low',
    status: 'todo',
    createdAt: '2024-02-01',
    assignedUsers: ['Carlos Santos'],
    comments: 2,
    attachments: 1,
    test: {
      belief: 'Programa de fidelidade vai aumentar retenção em 30%',
      test: 'Implementar sistema de pontos e medir taxa de retenção',
      cost: 'high',
      time: 'high',
      confidence: 'low'
    }
  }
];

// Dados das métricas
const metrics = [
  {
    title: "Testes Realizados",
    value: "24",
    change: "+5",
    icon: TrendingUp,
    color: "text-blue-600"
  },
  {
    title: "Testes Concluídos",
    value: "18",
    change: "+3",
    icon: CheckCircle,
    color: "text-green-600"
  },
  {
    title: "Em Andamento",
    value: "6",
    change: "+2",
    icon: Clock,
    color: "text-orange-600"
  },
  {
    title: "Taxa de Sucesso",
    value: "75%",
    change: "+8%",
    icon: BookOpen,
    color: "text-purple-600"
  }
];

export default function ProjetosTestes() {
  const { openTestDrawer } = useTestDrawerStore();

  const handleNewTest = () => {
    openTestDrawer();
  };

  const handleEditTest = (test: Test) => {
    console.log('Editar teste:', test.title);
    // Aqui você pode abrir um modal de edição ou navegar para uma página de edição
  };

  const handleDeleteTest = (test: Test) => {
    console.log('Deletar teste:', test.title);
    // Aqui você pode confirmar e deletar o teste
  };

  const handleDoubleClickTest = (test: Test) => {
    console.log('Duplo clique no teste:', test.title);
    // Aqui você pode abrir detalhes do teste
  };

  return (
    <div className="w-full h-full flex gap-4">
      <Container
        icon={TestTube}
        title="Testes dos Projetos"
        description="Gerencie e acompanhe todos os testes e experimentos dos projetos."
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

          {/* Lista de Testes */}
          <Box
            title="TESTES"
            actionButtonText="Novo Teste"
            actionButtonIcon={Plus}
            onActionButtonClick={handleNewTest}
          >
            <div className="space-y-3">
              {tests.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  Nenhum teste encontrado
                </div>
              ) : (
                tests.map((test) => (
                  <CardInfo
                    key={test.id}
                    id={test.id}
                    title={test.title}
                    description={test.description}
                    priority={test.priority}
                    status={test.status}
                    createdAt={test.createdAt}
                    assignedUsers={test.assignedUsers}
                    comments={test.comments}
                    attachments={test.attachments}
                    onDoubleClick={(taskId) => handleDoubleClickTest(test)}
                    onEdit={(taskId) => handleEditTest(test)}
                    onDelete={(taskId) => handleDeleteTest(test)}
                    variant="columns"
                    hypothesis={test.test}
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
