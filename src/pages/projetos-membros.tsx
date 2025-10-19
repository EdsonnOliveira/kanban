import Container from '../components/Container';
import { Users, Plus, TrendingUp, CheckCircle, Clock, Star, Mail, Phone } from 'lucide-react';
import Box from '../components/Box';
import MetricCard from '../components/MetricCard';
import Table, { TableColumn } from '../components/Table';
import { useMemberDrawerStore } from '../store/useMemberDrawerStore';

// Interface para membros
interface Member {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive' | 'pending';
  projects: number;
  lastActivity: string;
  joinDate: string;
  avatar: string;
  phone?: string;
}

// Dados dos membros
const members: Member[] = [
  {
    id: 1,
    name: "Ana Silva",
    email: "ana.silva@empresa.com",
    role: "Product Manager",
    status: "active",
    projects: 3,
    lastActivity: "2 horas atrás",
    joinDate: "15 Jan, 2023",
    avatar: "A",
    phone: "(11) 99999-1111"
  },
  {
    id: 2,
    name: "Carlos Santos",
    email: "carlos.santos@empresa.com",
    role: "Frontend Developer",
    status: "active",
    projects: 2,
    lastActivity: "1 dia atrás",
    joinDate: "22 Mar, 2023",
    avatar: "C",
    phone: "(11) 99999-2222"
  },
  {
    id: 3,
    name: "Maria Costa",
    email: "maria.costa@empresa.com",
    role: "UX Designer",
    status: "active",
    projects: 4,
    lastActivity: "30 min atrás",
    joinDate: "10 Fev, 2023",
    avatar: "M",
    phone: "(11) 99999-3333"
  },
  {
    id: 4,
    name: "Pedro Oliveira",
    email: "pedro.oliveira@empresa.com",
    role: "Backend Developer",
    status: "inactive",
    projects: 1,
    lastActivity: "1 semana atrás",
    joinDate: "05 Abr, 2023",
    avatar: "P"
  },
  {
    id: 5,
    name: "Julia Ferreira",
    email: "julia.ferreira@empresa.com",
    role: "QA Tester",
    status: "pending",
    projects: 0,
    lastActivity: "Nunca",
    joinDate: "20 Jan, 2024",
    avatar: "J"
  }
];

// Dados das métricas
const metrics = [
  {
    title: "Membros Ativos",
    value: "18",
    change: "+2",
    icon: TrendingUp,
    color: "text-blue-600"
  },
  {
    title: "Novos Membros",
    value: "3",
    change: "+1",
    icon: CheckCircle,
    color: "text-green-600"
  },
  {
    title: "Inativos",
    value: "2",
    change: "0",
    icon: Clock,
    color: "text-orange-600"
  },
  {
    title: "Projetos Médios",
    value: "2.4",
    change: "+0.3",
    icon: Star,
    color: "text-purple-600"
  }
];

export default function ProjetosMembros() {
  const { openMemberDrawer } = useMemberDrawerStore();

  const getStatusColor = (status: Member['status']) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-700';
      case 'inactive':
        return 'bg-red-100 text-red-700';
      case 'pending':
        return 'bg-yellow-100 text-yellow-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusLabel = (status: Member['status']) => {
    switch (status) {
      case 'active':
        return 'Ativo';
      case 'inactive':
        return 'Inativo';
      case 'pending':
        return 'Pendente';
      default:
        return 'Desconhecido';
    }
  };

  const columns: TableColumn<Member>[] = [
    {
      key: 'name',
      title: 'Membro',
      render: (_, member) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-medium">
            {member.avatar}
          </div>
          <div>
            <div className="text-sm font-medium text-gray-900">{member.name}</div>
            <div className="text-sm text-gray-500">{member.role}</div>
          </div>
        </div>
      )
    },
    {
      key: 'email',
      title: 'Contato',
      render: (_, member) => (
        <div>
          <div className="text-sm text-gray-900 flex items-center gap-1">
            <Mail size={12} className="text-gray-400" />
            {member.email}
          </div>
          {member.phone && (
            <div className="text-sm text-gray-500 flex items-center gap-1">
              <Phone size={12} className="text-gray-400" />
              {member.phone}
            </div>
          )}
        </div>
      )
    },
    {
      key: 'status',
      title: 'Status',
      render: (_, member) => (
        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-md ${getStatusColor(member.status)}`}>
          {getStatusLabel(member.status)}
        </span>
      )
    },
    {
      key: 'projects',
      title: 'Projetos',
      align: 'center',
      render: (_, member) => (
        <span className="text-sm font-medium text-gray-900">
          {member.projects}
        </span>
      )
    },
    {
      key: 'lastActivity',
      title: 'Última Atividade',
      render: (_, member) => (
        <span className="text-sm text-gray-500">
          {member.lastActivity}
        </span>
      )
    },
    {
      key: 'joinDate',
      title: 'Data de Entrada',
      render: (_, member) => (
        <span className="text-sm text-gray-500">
          {member.joinDate}
        </span>
      )
    }
  ];

  return (
    <div className="w-full h-full flex gap-4">
      <Container
        icon={Users}
        title="Membros dos Projetos"
        description="Gerencie e acompanhe todos os membros da equipe de projetos."
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

          {/* Tabela de Membros */}
          <Box
            title="MEMBROS DA EQUIPE"
            actionButtonText="Adicionar Membro"
            actionButtonIcon={Plus}
            onActionButtonClick={openMemberDrawer}
          >
            <Table
              data={members}
              columns={columns}
              onRowClick={(member) => console.log('Membro clicado:', member.name)}
              emptyMessage="Nenhum membro encontrado"
            />
          </Box>
        </div>
      </Container>
    </div>
  );
}
