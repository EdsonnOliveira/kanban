import Container from '../components/Container';
import { Shield } from 'lucide-react';
import { useState } from 'react';
import Button from '../components/Button';
import { useSWOTDrawerStore } from '../store/useSWOTDrawerStore';
import { Plus, Save, Download, Share, Edit, Eye } from 'lucide-react';

// Interface para a análise SWOT
interface SWOTAnalysis {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  lastModified: string;
  createdBy: string;
  status: 'rascunho' | 'revisao' | 'finalizado' | 'apresentado';
  // Strengths (Forças)
  strengths: string[];
  // Weaknesses (Fraquezas)
  weaknesses: string[];
  // Opportunities (Oportunidades)
  opportunities: string[];
  // Threats (Ameaças)
  threats: string[];
  // Análise adicional
  strategicRecommendations: string[];
  priorityActions: string[];
  riskLevel: 'baixo' | 'medio' | 'alto';
  marketPosition: string;
  competitiveAdvantage: string;
}

// Dados de exemplo
const sampleSWOTs: SWOTAnalysis[] = [
  {
    id: '1',
    name: 'SWOT - Startup Tech',
    description: 'Análise SWOT para startup de tecnologia',
    createdAt: '2024-01-15',
    lastModified: '2024-01-20',
    createdBy: 'João Silva',
    status: 'finalizado',
    strengths: [
      'Equipe técnica experiente',
      'Tecnologia inovadora',
      'Parcerias estratégicas',
      'Capital inicial disponível',
      'Produto MVP validado'
    ],
    weaknesses: [
      'Falta de experiência em vendas',
      'Recursos limitados para marketing',
      'Processos internos não definidos',
      'Dependência de poucos clientes',
      'Falta de marca reconhecida'
    ],
    opportunities: [
      'Mercado em crescimento',
      'Tecnologias emergentes',
      'Parcerias com grandes empresas',
      'Expansão internacional',
      'Novos segmentos de mercado'
    ],
    threats: [
      'Concorrência estabelecida',
      'Mudanças regulatórias',
      'Crise econômica',
      'Perda de talentos',
      'Tecnologia obsoleta'
    ],
    strategicRecommendations: [
      'Investir em marketing digital',
      'Desenvolver processos internos',
      'Diversificar base de clientes',
      'Fortalecer equipe comercial'
    ],
    priorityActions: [
      'Contratar gerente de vendas',
      'Implementar CRM',
      'Lançar campanha de marketing',
      'Definir processos operacionais'
    ],
    riskLevel: 'medio',
    marketPosition: 'Emergente',
    competitiveAdvantage: 'Tecnologia inovadora e equipe experiente'
  },
  {
    id: '2',
    name: 'SWOT - E-commerce B2B',
    description: 'Análise SWOT para plataforma de e-commerce B2B',
    createdAt: '2024-01-10',
    lastModified: '2024-01-18',
    createdBy: 'Maria Santos',
    status: 'revisao',
    strengths: [
      'Plataforma robusta e escalável',
      'Equipe de desenvolvimento experiente',
      'Base de clientes fidelizada',
      'Suporte técnico 24/7',
      'Integração com ERPs'
    ],
    weaknesses: [
      'Alto custo de aquisição de clientes',
      'Dependência de fornecedores',
      'Processo de onboarding complexo',
      'Falta de recursos para inovação',
      'Concorrência de preços'
    ],
    opportunities: [
      'Digitalização acelerada pós-pandemia',
      'Novos mercados B2B',
      'Tecnologias de IA e automação',
      'Parcerias com consultorias',
      'Expansão para outros países'
    ],
    threats: [
      'Entrada de grandes players',
      'Mudanças nas preferências do cliente',
      'Custos de infraestrutura',
      'Regulamentações de privacidade',
      'Crise de supply chain'
    ],
    strategicRecommendations: [
      'Reduzir custos operacionais',
      'Investir em automação',
      'Melhorar experiência do usuário',
      'Diversificar oferta de produtos'
    ],
    priorityActions: [
      'Implementar automação de vendas',
      'Otimizar processo de onboarding',
      'Desenvolver novos recursos',
      'Expandir equipe comercial'
    ],
    riskLevel: 'baixo',
    marketPosition: 'Estabelecida',
    competitiveAdvantage: 'Plataforma robusta e suporte especializado'
  }
];

export default function FerramentasSWOT() {
  const [swotList] = useState<SWOTAnalysis[]>(sampleSWOTs);
  const { openSWOTDrawer } = useSWOTDrawerStore();

  const handleCreateSwot = () => {
    openSWOTDrawer();
  };

  const handleEditSwot = (swotId: string) => {
    console.log('Editar SWOT:', swotId);
    // Aqui você pode implementar a edição da análise SWOT
  };


  const handleViewSwot = (swotId: string) => {
    console.log('Visualizar SWOT:', swotId);
  };

  const handleSaveSwot = (swotId: string) => {
    console.log('Salvar SWOT:', swotId);
    // Aqui você pode implementar o salvamento
  };

  const handleDownloadSwot = (swotId: string) => {
    console.log('Download SWOT:', swotId);
    // Aqui você pode implementar o download
  };

  const handleShareSwot = (swotId: string) => {
    console.log('Compartilhar SWOT:', swotId);
    // Aqui você pode implementar o compartilhamento
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'rascunho': return 'bg-gray-100 text-gray-800';
      case 'revisao': return 'bg-yellow-100 text-yellow-800';
      case 'finalizado': return 'bg-green-100 text-green-800';
      case 'apresentado': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'rascunho': return 'Rascunho';
      case 'revisao': return 'Em Revisão';
      case 'finalizado': return 'Finalizado';
      case 'apresentado': return 'Apresentado';
      default: return 'Rascunho';
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'baixo': return 'bg-green-100 text-green-800';
      case 'medio': return 'bg-yellow-100 text-yellow-800';
      case 'alto': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRiskLabel = (risk: string) => {
    switch (risk) {
      case 'baixo': return 'Baixo';
      case 'medio': return 'Médio';
      case 'alto': return 'Alto';
      default: return 'Baixo';
    }
  };

  return (
    <Container
      icon={Shield}
      title="Análise SWOT"
      description="Identifique forças, fraquezas, oportunidades e ameaças para tomar decisões estratégicas informadas."
    >
      {/* Header com título e botão */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Análise SWOT</h1>
          <p className="text-sm text-gray-500">{swotList.length} análises criadas</p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            leftIcon={Plus}
            text="Nova Análise"
            onClick={handleCreateSwot}
            size="small"
          />
        </div>
      </div>

      {/* Lista de Análises SWOT */}
      <div className="space-y-4">
        {swotList.map((swot) => (
          <div
            key={swot.id}
            className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{swot.name}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(swot.status)}`}>
                    {getStatusLabel(swot.status)}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRiskColor(swot.riskLevel)}`}>
                    Risco {getRiskLabel(swot.riskLevel)}
                  </span>
                </div>
                <p className="text-gray-600 mb-4">{swot.description}</p>
                
                {/* Grid SWOT */}
                <div className="flex justify-center mb-4">
                  <div className="grid grid-cols-2 gap-4 max-w-4xl">
                  {/* Strengths */}
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-800 mb-2">Forças ({swot.strengths.length})</h4>
                    <div className="space-y-1">
                      {swot.strengths.slice(0, 3).map((strength, index) => (
                        <p key={index} className="text-sm text-green-700">• {strength}</p>
                      ))}
                      {swot.strengths.length > 3 && (
                        <p className="text-xs text-green-600">+{swot.strengths.length - 3} mais</p>
                      )}
                    </div>
                  </div>

                  {/* Weaknesses */}
                  <div className="bg-red-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-red-800 mb-2">Fraquezas ({swot.weaknesses.length})</h4>
                    <div className="space-y-1">
                      {swot.weaknesses.slice(0, 3).map((weakness, index) => (
                        <p key={index} className="text-sm text-red-700">• {weakness}</p>
                      ))}
                      {swot.weaknesses.length > 3 && (
                        <p className="text-xs text-red-600">+{swot.weaknesses.length - 3} mais</p>
                      )}
                    </div>
                  </div>

                  {/* Opportunities */}
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-800 mb-2">Oportunidades ({swot.opportunities.length})</h4>
                    <div className="space-y-1">
                      {swot.opportunities.slice(0, 3).map((opportunity, index) => (
                        <p key={index} className="text-sm text-blue-700">• {opportunity}</p>
                      ))}
                      {swot.opportunities.length > 3 && (
                        <p className="text-xs text-blue-600">+{swot.opportunities.length - 3} mais</p>
                      )}
                    </div>
                  </div>

                  {/* Threats */}
                  <div className="bg-orange-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-orange-800 mb-2">Ameaças ({swot.threats.length})</h4>
                    <div className="space-y-1">
                      {swot.threats.slice(0, 3).map((threat, index) => (
                        <p key={index} className="text-sm text-orange-700">• {threat}</p>
                      ))}
                      {swot.threats.length > 3 && (
                        <p className="text-xs text-orange-600">+{swot.threats.length - 3} mais</p>
                      )}
                    </div>
                  </div>
                  </div>
                </div>

                {/* Informações adicionais */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide">Posição no Mercado</p>
                    <p className="text-sm font-medium">{swot.marketPosition}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide">Vantagem Competitiva</p>
                    <p className="text-sm font-medium">{swot.competitiveAdvantage}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide">Ações Prioritárias</p>
                    <p className="text-sm font-medium">{swot.priorityActions.length} ações</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span>Criado por {swot.createdBy}</span>
                  <span>•</span>
                  <span>Modificado em {new Date(swot.lastModified).toLocaleDateString('pt-BR')}</span>
                </div>
              </div>

              {/* Botões de ação */}
              <div className="flex items-center gap-2 ml-4">
                <Button
                  leftIcon={Eye}
                  text="Ver"
                  onClick={() => handleViewSwot(swot.id)}
                  size="small"
                  variant="square"
                />
                <Button
                  leftIcon={Edit}
                  text="Editar"
                  onClick={() => handleEditSwot(swot.id)}
                  size="small"
                  variant="square"
                />
                <Button
                  leftIcon={Save}
                  text="Salvar"
                  onClick={() => handleSaveSwot(swot.id)}
                  size="small"
                  variant="square"
                />
                <Button
                  leftIcon={Download}
                  text="Download"
                  onClick={() => handleDownloadSwot(swot.id)}
                  size="small"
                  variant="square"
                />
                <Button
                  leftIcon={Share}
                  text="Compartilhar"
                  onClick={() => handleShareSwot(swot.id)}
                  size="small"
                  variant="square"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Estado vazio */}
      {swotList.length === 0 && (
        <div className="text-center py-12">
          <Shield className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">Nenhuma análise SWOT criada</h3>
          <p className="mt-1 text-sm text-gray-500">Comece criando sua primeira análise SWOT.</p>
          <div className="mt-6">
            <Button
              leftIcon={Plus}
              text="Criar Primeira Análise"
              onClick={handleCreateSwot}
              size="small"
            />
          </div>
        </div>
      )}
    </Container>
  );
}
