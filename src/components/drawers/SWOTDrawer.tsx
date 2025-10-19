import { useState } from 'react';
import { 
  Shield, 
  TrendingUp, 
  AlertTriangle, 
  Target, 
  Lightbulb, 
  CheckCircle, 
  AlertCircle, 
  Building2, 
  Star, 
  ChevronDown 
} from 'lucide-react';
import Drawer from '../Drawer';
import Input from '../Input';
import Select from '../Select';
import { useSWOTDrawerStore, SWOTFormData } from '../../store/useSWOTDrawerStore';

export default function SWOTDrawer() {
  const { isSWOTDrawerOpen, closeSWOTDrawer, saveSWOT } = useSWOTDrawerStore();
  
  // Estado local do formulário
  const [formData, setFormData] = useState<SWOTFormData>({
    name: '',
    description: '',
    status: 'rascunho',
    strengths: '',
    weaknesses: '',
    opportunities: '',
    threats: '',
    strategicRecommendations: '',
    priorityActions: '',
    riskLevel: 'medio',
    marketPosition: '',
    competitiveAdvantage: ''
  });

  const handleInputChange = (field: keyof SWOTFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    saveSWOT(formData);
    // Resetar formulário após salvar
    setFormData({
      name: '',
      description: '',
      status: 'rascunho',
      strengths: '',
      weaknesses: '',
      opportunities: '',
      threats: '',
      strategicRecommendations: '',
      priorityActions: '',
      riskLevel: 'medio',
      marketPosition: '',
      competitiveAdvantage: ''
    });
    closeSWOTDrawer();
  };

  const handleClose = () => {
    closeSWOTDrawer();
    // Resetar formulário ao fechar
    setFormData({
      name: '',
      description: '',
      status: 'rascunho',
      strengths: '',
      weaknesses: '',
      opportunities: '',
      threats: '',
      strategicRecommendations: '',
      priorityActions: '',
      riskLevel: 'medio',
      marketPosition: '',
      competitiveAdvantage: ''
    });
  };

  return (
    <Drawer
      isOpen={isSWOTDrawerOpen}
      onClose={handleClose}
      onSave={handleSave}
      title="Nova Análise SWOT"
      width="w-[500px]"
    >
      {/* Nome da Análise */}
      <Input
        placeholder="Digite o nome da análise SWOT"
        size="middle"
        label="Nome da Análise"
        leftIcon={Shield}
        value={formData.name}
        onChange={(value) => handleInputChange('name', value)}
      />

      {/* Descrição */}
      <Input
        type="textarea"
        placeholder="Descrição da análise SWOT"
        size="middle"
        label="Descrição"
        rows={3}
        value={formData.description}
        onChange={(value) => handleInputChange('description', value)}
      />

      {/* Status */}
      <Select
        placeholder="Selecione o status"
        size="middle"
        label="Status"
        rightIcon={ChevronDown}
        options={[
          { value: "rascunho", label: "Rascunho" },
          { value: "revisao", label: "Em Revisão" },
          { value: "finalizado", label: "Finalizado" },
          { value: "apresentado", label: "Apresentado" }
        ]}
        value={formData.status}
        onChange={(value) => handleInputChange('status', value)}
      />

      {/* Análise SWOT - Os 4 Pilares */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">Análise SWOT</h3>
        
        {/* Strengths (Forças) */}
        <Input
          type="textarea"
          placeholder="Liste as principais forças internas da empresa"
          size="middle"
          label="Forças (Strengths)"
          leftIcon={TrendingUp}
          rows={4}
          value={formData.strengths}
          onChange={(value) => handleInputChange('strengths', value)}
        />

        {/* Weaknesses (Fraquezas) */}
        <Input
          type="textarea"
          placeholder="Identifique as principais fraquezas internas"
          size="middle"
          label="Fraquezas (Weaknesses)"
          leftIcon={AlertTriangle}
          rows={4}
          value={formData.weaknesses}
          onChange={(value) => handleInputChange('weaknesses', value)}
        />

        {/* Opportunities (Oportunidades) */}
        <Input
          type="textarea"
          placeholder="Descreva as oportunidades externas identificadas"
          size="middle"
          label="Oportunidades (Opportunities)"
          leftIcon={Target}
          rows={4}
          value={formData.opportunities}
          onChange={(value) => handleInputChange('opportunities', value)}
        />

        {/* Threats (Ameaças) */}
        <Input
          type="textarea"
          placeholder="Liste as principais ameaças externas"
          size="middle"
          label="Ameaças (Threats)"
          leftIcon={AlertCircle}
          rows={4}
          value={formData.threats}
          onChange={(value) => handleInputChange('threats', value)}
        />
      </div>

      {/* Análise Estratégica */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">Análise Estratégica</h3>
        
        {/* Recomendações Estratégicas */}
        <Input
          type="textarea"
          placeholder="Defina as recomendações estratégicas baseadas na análise"
          size="middle"
          label="Recomendações Estratégicas"
          leftIcon={Lightbulb}
          rows={4}
          value={formData.strategicRecommendations}
          onChange={(value) => handleInputChange('strategicRecommendations', value)}
        />

        {/* Ações Prioritárias */}
        <Input
          type="textarea"
          placeholder="Liste as ações prioritárias a serem implementadas"
          size="middle"
          label="Ações Prioritárias"
          leftIcon={CheckCircle}
          rows={4}
          value={formData.priorityActions}
          onChange={(value) => handleInputChange('priorityActions', value)}
        />

        {/* Nível de Risco */}
        <Select
          placeholder="Selecione o nível de risco"
          size="middle"
          label="Nível de Risco"
          rightIcon={ChevronDown}
          options={[
            { value: "baixo", label: "Baixo" },
            { value: "medio", label: "Médio" },
            { value: "alto", label: "Alto" }
          ]}
          value={formData.riskLevel}
          onChange={(value) => handleInputChange('riskLevel', value)}
        />
      </div>

      {/* Informações Adicionais */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">Informações Adicionais</h3>
        
        {/* Posição no Mercado */}
        <Input
          placeholder="Ex: Emergente, Estabelecida, Líder"
          size="middle"
          label="Posição no Mercado"
          leftIcon={Building2}
          value={formData.marketPosition}
          onChange={(value) => handleInputChange('marketPosition', value)}
        />

        {/* Vantagem Competitiva */}
        <Input
          type="textarea"
          placeholder="Descreva a principal vantagem competitiva"
          size="middle"
          label="Vantagem Competitiva"
          leftIcon={Star}
          rows={3}
          value={formData.competitiveAdvantage}
          onChange={(value) => handleInputChange('competitiveAdvantage', value)}
        />
      </div>
    </Drawer>
  );
}
