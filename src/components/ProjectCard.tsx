import { useState, useEffect } from 'react';
import Modal from './Modal';
import TabBar from './TabBar';
import CardInfo from './CardInfo';
import Table, { TableColumn } from './Table';
import Button from './Button';
import { Mail, Phone, Plus, Calendar } from 'lucide-react';
import { useHypothesisDrawerStore } from '../store/useHypothesisDrawerStore';
import { useTestDrawerStore } from '../store/useTestDrawerStore';
import { useMemberDrawerStore } from '../store/useMemberDrawerStore';

interface ProjectCardProps {
  id: string;
  name: string;
  deadline: string;
  status: string;
  priority: string;
  progress: number;
  color: string;
  team: string[];
}

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

export default function ProjectCard({
  name,
  deadline,
  status,
  priority,
  progress,
  color,
  team
}: ProjectCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('sobre');
  const [wasModalOpenBeforeDrawer, setWasModalOpenBeforeDrawer] = useState(false);
  
  // Stores dos drawers
  const { openHypothesisDrawer, isHypothesisDrawerOpen } = useHypothesisDrawerStore();
  const { openTestDrawer, isTestDrawerOpen } = useTestDrawerStore();
  const { openMemberDrawer, isMemberDrawerOpen } = useMemberDrawerStore();

  // Controlar modal baseado nos drawers
  useEffect(() => {
    const isAnyDrawerOpen = isHypothesisDrawerOpen || isTestDrawerOpen || isMemberDrawerOpen;
    
    if (isAnyDrawerOpen && isModalOpen) {
      // Se algum drawer abrir e o modal estiver aberto, salva o estado e fecha o modal
      setWasModalOpenBeforeDrawer(true);
      setIsModalOpen(false);
    } else if (!isAnyDrawerOpen && wasModalOpenBeforeDrawer) {
      // Se todos os drawers fecharem e o modal estava aberto antes, reabre o modal
      setWasModalOpenBeforeDrawer(false);
      setIsModalOpen(true);
    }
  }, [isHypothesisDrawerOpen, isTestDrawerOpen, isMemberDrawerOpen, isModalOpen, wasModalOpenBeforeDrawer]);

  // Dados das atividades
  const activities = [
    {
      id: 1,
      title: "Reunião agendada",
      company: "TechCorp Solutions",
      user: "João Silva",
      time: "1 hora atrás",
      avatar: "J"
    },
    {
      id: 2,
      title: "Proposta enviada",
      company: "Digital Agency",
      user: "Maria Santos",
      time: "3 horas atrás",
      avatar: "M"
    },
    {
      id: 3,
      title: "Contrato assinado",
      company: "StartupXYZ",
      user: "Pedro Costa",
      time: "1 dia atrás",
      avatar: "P"
    }
  ];

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
      role: "Backend Developer",
      status: "active",
      projects: 4,
      lastActivity: "3 horas atrás",
      joinDate: "10 Fev, 2023",
      avatar: "M",
      phone: "(11) 99999-3333"
    },
    {
      id: 4,
      name: "João Silva",
      email: "joao.silva@empresa.com",
      role: "UI/UX Designer",
      status: "pending",
      projects: 1,
      lastActivity: "1 semana atrás",
      joinDate: "05 Jan, 2024",
      avatar: "J"
    }
  ];

  // Funções auxiliares para status
  const getStatusColor = (status: string) => {
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

  const getStatusLabel = (status: string) => {
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

  // Definição das colunas da tabela
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

  const tabs = [
    {
      id: 'sobre',
      label: 'Sobre',
      content: (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-800 mb-2">Progresso</h3>
              <p className="text-2xl font-bold text-blue-600">{progress}%</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="font-semibold text-green-800 mb-2">Status</h3>
              <p className="text-lg font-medium text-green-600">{status}</p>
            </div>
            <div className="bg-orange-50 p-4 rounded-lg">
              <h3 className="font-semibold text-orange-800 mb-2">Prioridade</h3>
              <p className="text-lg font-medium text-orange-600">{priority}</p>
            </div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-800 mb-2">Informações do Projeto</h3>
            <p className="text-gray-600"><strong>Nome:</strong> {name}</p>
            <p className="text-gray-600"><strong>Prazo:</strong> {deadline}</p>
            <p className="text-gray-600"><strong>Equipe:</strong> {team.join(', ')}</p>
          </div>
        </div>
      )
    },
    {
      id: 'hipoteses',
      label: 'Hipóteses',
      content: (
        <div className="space-y-4">
          <div className="flex justify-end w-40">
            <Button
              text="Nova Hipótese"
              leftIcon={Plus}
              onClick={openHypothesisDrawer}
              size="small"
            />
          </div>
          <CardInfo
            id="1"
            title="Implementar autenticação social"
            description="Login Social"
            priority="high"
            status="in-progress"
            createdAt="2024-01-15"
            assignedUsers={['Ana Silva', 'Carlos Santos']}
            comments={5}
            attachments={2}
            variant="columns"
            hypothesis={{
              belief: 'Permitir login com Google e Facebook vai aumentar as conversões em 25%',
              test: 'Implementar botões de login social e medir taxa de conversão por 30 dias',
              cost: 'medium',
              time: 'medium',
              confidence: 'high'
            }}
          />
          <CardInfo
            id="2"
            title="Otimizar carregamento de imagens"
            description="Performance"
            priority="medium"
            status="todo"
            createdAt="2024-01-20"
            assignedUsers={['João Silva']}
            comments={2}
            attachments={1}
            variant="columns"
            hypothesis={{
              belief: 'Reduzir o tamanho das imagens vai diminuir o tempo de carregamento em 40%',
              test: 'Implementar compressão de imagens e medir tempo de carregamento',
              cost: 'low',
              time: 'low',
              confidence: 'medium'
            }}
          />
          <CardInfo
            id="3"
            title="Implementar notificações push"
            description="Engajamento"
            priority="high"
            status="done"
            createdAt="2024-01-10"
            assignedUsers={['Maria Santos', 'Pedro Costa']}
            comments={8}
            attachments={3}
            variant="columns"
            hypothesis={{
              belief: 'Notificações push vão aumentar o engajamento dos usuários em 30%',
              test: 'Enviar notificações personalizadas e medir taxa de abertura',
              cost: 'high',
              time: 'high',
              confidence: 'high'
            }}
          />
        </div>
      )
    },
    {
      id: 'testes',
      label: 'Testes',
      content: (
        <div className="space-y-4">
          <div className="flex justify-end w-40">
            <Button
              text="Novo Teste"
              leftIcon={Plus}
              onClick={openTestDrawer}
              size="small"
            />
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold text-gray-800 mb-2">Teste A/B</h3>
            <p className="text-gray-600">Testando duas versões da landing page para medir conversão</p>
            <div className="mt-2">
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">Em andamento</span>
            </div>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold text-gray-800 mb-2">Teste de Usabilidade</h3>
            <p className="text-gray-600">Avaliando a experiência do usuário com o novo design</p>
            <div className="mt-2">
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">Concluído</span>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'membros',
      label: 'Membros',
      content: (
        <div className="space-y-4">
          <div className="flex justify-end w-40">
            <Button
              text="Novo Membro"
              leftIcon={Plus}
              onClick={openMemberDrawer}
              size="small"
            />
          </div>
          <Table
            data={members}
            columns={columns}
            onRowClick={(member) => console.log('Membro clicado:', member.name)}
            emptyMessage="Nenhum membro encontrado"
          />
        </div>
      )
    },
    {
      id: 'atividades',
      label: 'Atividades',
      content: (
        <div className="space-y-4">
          <div className="flex justify-end w-40">
            <Button
              text="Ver Todas"
              leftIcon={Calendar}
              onClick={() => console.log('Ver todas as atividades')}
              size="small"
              style="white"
            />
          </div>
          <div className="space-y-3">
            {activities.map((activity) => (
              <div key={activity.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                {/* Avatar */}
                <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-gray-700 font-medium">
                  {activity.avatar}
                </div>
                
                {/* Content */}
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800">{activity.title}</h3>
                  <p className="text-sm text-gray-600">{activity.company}</p>
                  <p className="text-sm text-gray-500">{activity.user} • {activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )
    }
  ];

  return (
    <>
      <div 
        className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl cursor-pointer hover:bg-gray-100 transition-colors"
        onClick={() => setIsModalOpen(true)}
      >
      {/* Status indicator */}
      <div className={`w-3 h-3 ${color} rounded-full`}></div>
      
      {/* Project info */}
      <div className="flex-1">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold text-gray-800">{name}</h3>
          <span className="text-sm text-gray-500">{deadline}</span>
        </div>
        
        <div className="flex items-center gap-4 mb-3">
          <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-xs font-medium">
            {status}
          </span>
          <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-xs font-medium">
            {priority}
          </span>
        </div>
        
        {/* Progress bar */}
        <div className="mb-2">
          <div className="flex justify-between text-sm text-gray-600 mb-1">
            <span>Progresso</span>
            <span>{progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className={`h-2 rounded-full ${color}`}
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
        
        {/* Team */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Equipe:</span>
          <div className="flex -space-x-2">
            {team.map((member, memberIndex) => (
              <div key={memberIndex} className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center text-xs font-medium text-gray-600 border-2 border-white">
                {member}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>

    {/* Modal */}
    <Modal
      isOpen={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      title={name}
      description={`Projeto ${name} - ${status}`}
      w="1200px"
      h="800px"
    >
      <TabBar
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
    </Modal>
    </>
  );
}
