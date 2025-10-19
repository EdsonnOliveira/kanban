import Container from '../components/Container';
import { Building2 } from 'lucide-react';
import { useState } from 'react';
import Button from '../components/Button';
import { useBusinessModelCanvasDrawerStore } from '../store/useBusinessModelCanvasDrawerStore';
import { Plus, Save, Download, Share } from 'lucide-react';

// Interface para o Business Model Canvas
interface BusinessModelCanvas {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  lastModified: string;
  createdBy: string;
  status: 'rascunho' | 'revisao' | 'finalizado' | 'apresentado';
  // Parcerias Principais
  keyPartnerships: string[];
  // Atividades Principais
  keyActivities: string[];
  // Proposta de Valor
  valuePropositions: string[];
  // Relacionamento com Clientes
  customerRelationships: string[];
  // Segmentos de Clientes
  customerSegments: string[];
  // Recursos Principais
  keyResources: string[];
  // Canais
  channels: string[];
  // Estrutura de Custos
  costStructure: string[];
  // Fontes de Receita
  revenueStreams: string[];
}

// Dados de exemplo
const sampleCanvas: BusinessModelCanvas[] = [
  {
    id: '1',
    name: 'Canvas - Startup Tech',
    description: 'Business Model Canvas para startup de tecnologia',
    createdAt: '2024-01-15',
    lastModified: '2024-01-20',
    createdBy: 'João Silva',
    status: 'finalizado',
    keyPartnerships: [
      'Parceiros tecnológicos',
      'Fornecedores de infraestrutura',
      'Consultores especializados'
    ],
    keyActivities: [
      'Desenvolvimento de software',
      'Marketing digital',
      'Atendimento ao cliente'
    ],
    valuePropositions: [
      'Solução inovadora',
      'Preço competitivo',
      'Suporte 24/7'
    ],
    customerRelationships: [
      'Atendimento personalizado',
      'Comunidade online',
      'Suporte técnico'
    ],
    customerSegments: [
      'Pequenas empresas',
      'Startups',
      'Freelancers'
    ],
    keyResources: [
      'Equipe de desenvolvimento',
      'Tecnologia proprietária',
      'Base de dados'
    ],
    channels: [
      'Website',
      'Redes sociais',
      'Parceiros'
    ],
    costStructure: [
      'Desenvolvimento',
      'Marketing',
      'Infraestrutura'
    ],
    revenueStreams: [
      'Assinaturas mensais',
      'Vendas únicas',
      'Serviços premium'
    ]
  },
  {
    id: '2',
    name: 'Canvas - E-commerce',
    description: 'Modelo de negócio para plataforma de e-commerce',
    createdAt: '2024-01-10',
    lastModified: '2024-01-18',
    createdBy: 'Maria Santos',
    status: 'revisao',
    keyPartnerships: [
      'Fornecedores',
      'Logística',
      'Pagamentos'
    ],
    keyActivities: [
      'Gestão de produtos',
      'Marketing',
      'Logística'
    ],
    valuePropositions: [
      'Variedade de produtos',
      'Entrega rápida',
      'Preços baixos'
    ],
    customerRelationships: [
      'Self-service',
      'Atendimento online',
      'Programa de fidelidade'
    ],
    customerSegments: [
      'Consumidores finais',
      'Empresas B2B',
      'Revendedores'
    ],
    keyResources: [
      'Plataforma online',
      'Estoque',
      'Equipe'
    ],
    channels: [
      'Website',
      'App mobile',
      'Marketplaces'
    ],
    costStructure: [
      'Estoque',
      'Marketing',
      'Operações'
    ],
    revenueStreams: [
      'Comissões',
      'Vendas diretas',
      'Anúncios'
    ]
  }
];

export default function FerramentasBusinessModelCanvas() {
  const [canvasList] = useState<BusinessModelCanvas[]>(sampleCanvas);
  const { openBusinessModelCanvasDrawer } = useBusinessModelCanvasDrawerStore();

  const handleCreateCanvas = () => {
    openBusinessModelCanvasDrawer();
  };


  const handleSaveCanvas = (canvasId: string) => {
    console.log('Salvar canvas:', canvasId);
    // Aqui você pode implementar o salvamento
  };

  const handleDownloadCanvas = (canvasId: string) => {
    console.log('Download canvas:', canvasId);
    // Aqui você pode implementar o download
  };

  const handleShareCanvas = (canvasId: string) => {
    console.log('Compartilhar canvas:', canvasId);
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

  return (
    <Container
      icon={Building2}
      title="Business Model Canvas"
      description="Crie e gerencie modelos de negócio usando a metodologia Canvas."
    >
      {/* Header com título e botão */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Business Model Canvas</h1>
          <p className="text-sm text-gray-500">{canvasList.length} canvas criados</p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            leftIcon={Plus}
            text="Novo Canvas"
            onClick={handleCreateCanvas}
            size="small"
          />
        </div>
      </div>

      {/* Lista de Canvas */}
      <div className="space-y-4">
        {canvasList.map((canvas) => (
          <div
            key={canvas.id}
            className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{canvas.name}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(canvas.status)}`}>
                    {getStatusLabel(canvas.status)}
                  </span>
                </div>
                <p className="text-gray-600 mb-3">{canvas.description}</p>
                
                {/* Informações do Canvas */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide">Parcerias</p>
                    <p className="text-sm font-medium">{canvas.keyPartnerships.length}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide">Atividades</p>
                    <p className="text-sm font-medium">{canvas.keyActivities.length}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide">Valor</p>
                    <p className="text-sm font-medium">{canvas.valuePropositions.length}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide">Clientes</p>
                    <p className="text-sm font-medium">{canvas.customerSegments.length}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span>Criado por {canvas.createdBy}</span>
                  <span>•</span>
                  <span>Modificado em {new Date(canvas.lastModified).toLocaleDateString('pt-BR')}</span>
                </div>
              </div>

              {/* Botões de ação */}
              <div className="flex items-center gap-2 ml-4">
                <Button
                  leftIcon={Save}
                  text="Salvar"
                  onClick={() => handleSaveCanvas(canvas.id)}
                  size="small"
                  variant="square"
                />
                <Button
                  leftIcon={Download}
                  text="Download"
                  onClick={() => handleDownloadCanvas(canvas.id)}
                  size="small"
                  variant="square"
                />
                <Button
                  leftIcon={Share}
                  text="Compartilhar"
                  onClick={() => handleShareCanvas(canvas.id)}
                  size="small"
                  variant="square"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Estado vazio */}
      {canvasList.length === 0 && (
        <div className="text-center py-12">
          <Building2 className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">Nenhum canvas criado</h3>
          <p className="mt-1 text-sm text-gray-500">Comece criando seu primeiro Business Model Canvas.</p>
          <div className="mt-6">
            <Button
              leftIcon={Plus}
              text="Criar Primeiro Canvas"
              onClick={handleCreateCanvas}
              size="small"
            />
          </div>
        </div>
      )}
    </Container>
  );
}
