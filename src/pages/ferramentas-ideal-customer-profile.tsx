import Container from '../components/Container';
import { UserCheck } from 'lucide-react';
import { useState } from 'react';
import Button from '../components/Button';
import { useIdealCustomerProfileDrawerStore } from '../store/useIdealCustomerProfileDrawerStore';
import { Plus, Save, Download, Share, Edit, Eye } from 'lucide-react';

// Interface para o Ideal Customer Profile
interface IdealCustomerProfile {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  lastModified: string;
  createdBy: string;
  status: 'rascunho' | 'revisao' | 'finalizado' | 'validado';
  // Dados Demográficos
  ageRange: string;
  gender: string;
  location: string;
  education: string;
  income: string;
  // Dados Psicográficos
  interests: string[];
  values: string[];
  lifestyle: string;
  personality: string;
  // Dados Comportamentais
  buyingBehavior: string;
  decisionProcess: string;
  painPoints: string[];
  goals: string[];
  // Dados Técnicos/Profissionais
  industry: string;
  companySize: string;
  jobTitle: string;
  technology: string[];
  // Dados de Contato
  preferredChannels: string[];
  communicationStyle: string;
  timeZone: string;
  // Métricas
  lifetimeValue: string;
  acquisitionCost: string;
  retentionRate: string;
  satisfactionScore: string;
}

// Dados de exemplo
const sampleICPs: IdealCustomerProfile[] = [
  {
    id: '1',
    name: 'ICP - Startup Tech',
    description: 'Perfil ideal para produtos de tecnologia para startups',
    createdAt: '2024-01-15',
    lastModified: '2024-01-20',
    createdBy: 'João Silva',
    status: 'finalizado',
    ageRange: '25-35 anos',
    gender: 'Misto',
    location: 'São Paulo, SP',
    education: 'Superior completo',
    income: 'R$ 8.000 - R$ 15.000',
    interests: ['Tecnologia', 'Inovação', 'Empreendedorismo', 'Marketing Digital'],
    values: ['Agilidade', 'Eficiência', 'Crescimento', 'Inovação'],
    lifestyle: 'Dinâmico, conectado, focado em resultados',
    personality: 'Analítico, orientado a dados, tomador de decisões rápidas',
    buyingBehavior: 'Pesquisa online, compara preços, decisão em equipe',
    decisionProcess: 'Avaliação técnica, ROI, implementação rápida',
    painPoints: ['Falta de tempo', 'Orçamento limitado', 'Integração complexa'],
    goals: ['Crescimento rápido', 'Automação', 'Eficiência operacional'],
    industry: 'Tecnologia',
    companySize: '10-50 funcionários',
    jobTitle: 'CEO, CTO, Head de Produto',
    technology: ['React', 'Node.js', 'AWS', 'Docker'],
    preferredChannels: ['Email', 'LinkedIn', 'WhatsApp'],
    communicationStyle: 'Direto, objetivo, baseado em dados',
    timeZone: 'GMT-3 (Brasil)',
    lifetimeValue: 'R$ 50.000',
    acquisitionCost: 'R$ 2.500',
    retentionRate: '85%',
    satisfactionScore: '4.7/5'
  },
  {
    id: '2',
    name: 'ICP - E-commerce B2B',
    description: 'Perfil ideal para soluções de e-commerce B2B',
    createdAt: '2024-01-10',
    lastModified: '2024-01-18',
    createdBy: 'Maria Santos',
    status: 'revisao',
    ageRange: '30-45 anos',
    gender: 'Misto',
    location: 'Brasil (todas as regiões)',
    education: 'Superior completo',
    income: 'R$ 12.000 - R$ 25.000',
    interests: ['Vendas', 'Marketing', 'Logística', 'Gestão'],
    values: ['Qualidade', 'Confiabilidade', 'Parceria', 'Resultados'],
    lifestyle: 'Profissional, focado em negócios, viajante',
    personality: 'Relacionamento, orientado a vendas, estratégico',
    buyingBehavior: 'Processo longo, múltiplos stakeholders, demonstrações',
    decisionProcess: 'Avaliação técnica, financeira, jurídica, implementação',
    painPoints: ['Integração com sistemas legados', 'Treinamento da equipe', 'Suporte técnico'],
    goals: ['Aumentar vendas', 'Melhorar eficiência', 'Expandir mercado'],
    industry: 'Varejo, Distribuição, Manufatura',
    companySize: '50-500 funcionários',
    jobTitle: 'Diretor Comercial, Gerente de Vendas, CTO',
    technology: ['ERP', 'CRM', 'WMS', 'API'],
    preferredChannels: ['Telefone', 'Email', 'Reuniões presenciais'],
    communicationStyle: 'Formal, detalhado, baseado em relacionamento',
    timeZone: 'GMT-3 (Brasil)',
    lifetimeValue: 'R$ 150.000',
    acquisitionCost: 'R$ 8.000',
    retentionRate: '92%',
    satisfactionScore: '4.5/5'
  }
];

export default function FerramentasIdealCustomerProfile() {
  const [icpList] = useState<IdealCustomerProfile[]>(sampleICPs);
  const { openIdealCustomerProfileDrawer } = useIdealCustomerProfileDrawerStore();

  const handleCreateIcp = () => {
    openIdealCustomerProfileDrawer();
  };

  const handleEditIcp = (icpId: string) => {
    console.log('Editar ICP:', icpId);
    // Aqui você pode implementar a edição do ICP
  };


  const handleViewIcp = (icpId: string) => {
    console.log('Visualizar ICP:', icpId);
  };

  const handleSaveIcp = (icpId: string) => {
    console.log('Salvar ICP:', icpId);
    // Aqui você pode implementar o salvamento
  };

  const handleDownloadIcp = (icpId: string) => {
    console.log('Download ICP:', icpId);
    // Aqui você pode implementar o download
  };

  const handleShareIcp = (icpId: string) => {
    console.log('Compartilhar ICP:', icpId);
    // Aqui você pode implementar o compartilhamento
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'rascunho': return 'bg-gray-100 text-gray-800';
      case 'revisao': return 'bg-yellow-100 text-yellow-800';
      case 'finalizado': return 'bg-green-100 text-green-800';
      case 'validado': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'rascunho': return 'Rascunho';
      case 'revisao': return 'Em Revisão';
      case 'finalizado': return 'Finalizado';
      case 'validado': return 'Validado';
      default: return 'Rascunho';
    }
  };

  return (
    <Container
      icon={UserCheck}
      title="Ideal Customer Profile"
      description="Defina e gerencie perfis ideais de clientes para otimizar suas estratégias de marketing e vendas."
    >
      {/* Header com título e botão */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Ideal Customer Profile</h1>
          <p className="text-sm text-gray-500">{icpList.length} perfis criados</p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            leftIcon={Plus}
            text="Novo ICP"
            onClick={handleCreateIcp}
            size="small"
          />
        </div>
      </div>

      {/* Lista de ICPs */}
      <div className="space-y-4">
        {icpList.map((icp) => (
          <div
            key={icp.id}
            className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{icp.name}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(icp.status)}`}>
                    {getStatusLabel(icp.status)}
                  </span>
                </div>
                <p className="text-gray-600 mb-4">{icp.description}</p>
                
                {/* Informações do ICP */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide">Idade</p>
                    <p className="text-sm font-medium">{icp.ageRange}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide">Localização</p>
                    <p className="text-sm font-medium">{icp.location}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide">Indústria</p>
                    <p className="text-sm font-medium">{icp.industry}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide">Empresa</p>
                    <p className="text-sm font-medium">{icp.companySize}</p>
                  </div>
                </div>

                {/* Pain Points e Goals */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Principais Dores</p>
                    <div className="flex flex-wrap gap-1">
                      {icp.painPoints.slice(0, 3).map((pain, index) => (
                        <span key={index} className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">
                          {pain}
                        </span>
                      ))}
                      {icp.painPoints.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                          +{icp.painPoints.length - 3} mais
                        </span>
                      )}
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Objetivos</p>
                    <div className="flex flex-wrap gap-1">
                      {icp.goals.slice(0, 3).map((goal, index) => (
                        <span key={index} className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                          {goal}
                        </span>
                      ))}
                      {icp.goals.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                          +{icp.goals.length - 3} mais
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Métricas */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide">LTV</p>
                    <p className="text-sm font-medium text-green-600">{icp.lifetimeValue}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide">CAC</p>
                    <p className="text-sm font-medium text-blue-600">{icp.acquisitionCost}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide">Retenção</p>
                    <p className="text-sm font-medium text-purple-600">{icp.retentionRate}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide">Satisfação</p>
                    <p className="text-sm font-medium text-orange-600">{icp.satisfactionScore}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span>Criado por {icp.createdBy}</span>
                  <span>•</span>
                  <span>Modificado em {new Date(icp.lastModified).toLocaleDateString('pt-BR')}</span>
                </div>
              </div>

              {/* Botões de ação */}
              <div className="flex items-center gap-2 ml-4">
                <Button
                  leftIcon={Eye}
                  text="Ver"
                  onClick={() => handleViewIcp(icp.id)}
                  size="small"
                  variant="square"
                />
                <Button
                  leftIcon={Edit}
                  text="Editar"
                  onClick={() => handleEditIcp(icp.id)}
                  size="small"
                  variant="square"
                />
                <Button
                  leftIcon={Save}
                  text="Salvar"
                  onClick={() => handleSaveIcp(icp.id)}
                  size="small"
                  variant="square"
                />
                <Button
                  leftIcon={Download}
                  text="Download"
                  onClick={() => handleDownloadIcp(icp.id)}
                  size="small"
                  variant="square"
                />
                <Button
                  leftIcon={Share}
                  text="Compartilhar"
                  onClick={() => handleShareIcp(icp.id)}
                  size="small"
                  variant="square"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Estado vazio */}
      {icpList.length === 0 && (
        <div className="text-center py-12">
          <UserCheck className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">Nenhum ICP criado</h3>
          <p className="mt-1 text-sm text-gray-500">Comece criando seu primeiro Ideal Customer Profile.</p>
          <div className="mt-6">
            <Button
              leftIcon={Plus}
              text="Criar Primeiro ICP"
              onClick={handleCreateIcp}
              size="small"
            />
          </div>
        </div>
      )}
    </Container>
  );
}
