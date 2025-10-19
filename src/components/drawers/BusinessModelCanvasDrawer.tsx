import { useState } from 'react';
import { 
  Building2, 
  Handshake, 
  Activity, 
  Target, 
  Users, 
  UserCheck, 
  Wrench, 
  Share2, 
  DollarSign, 
  TrendingUp, 
  ChevronDown 
} from 'lucide-react';
import Drawer from '../Drawer';
import Input from '../Input';
import Select from '../Select';
import { useBusinessModelCanvasDrawerStore, BusinessModelCanvasFormData } from '../../store/useBusinessModelCanvasDrawerStore';

export default function BusinessModelCanvasDrawer() {
  const { isBusinessModelCanvasDrawerOpen, closeBusinessModelCanvasDrawer, saveBusinessModelCanvas } = useBusinessModelCanvasDrawerStore();
  
  // Estado local do formulário
  const [formData, setFormData] = useState<BusinessModelCanvasFormData>({
    name: '',
    description: '',
    status: 'rascunho',
    keyPartnerships: '',
    keyActivities: '',
    valuePropositions: '',
    customerRelationships: '',
    customerSegments: '',
    keyResources: '',
    channels: '',
    costStructure: '',
    revenueStreams: ''
  });

  const handleInputChange = (field: keyof BusinessModelCanvasFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    saveBusinessModelCanvas(formData);
    // Resetar formulário após salvar
    setFormData({
      name: '',
      description: '',
      status: 'rascunho',
      keyPartnerships: '',
      keyActivities: '',
      valuePropositions: '',
      customerRelationships: '',
      customerSegments: '',
      keyResources: '',
      channels: '',
      costStructure: '',
      revenueStreams: ''
    });
    closeBusinessModelCanvasDrawer();
  };

  const handleClose = () => {
    closeBusinessModelCanvasDrawer();
    // Resetar formulário ao fechar
    setFormData({
      name: '',
      description: '',
      status: 'rascunho',
      keyPartnerships: '',
      keyActivities: '',
      valuePropositions: '',
      customerRelationships: '',
      customerSegments: '',
      keyResources: '',
      channels: '',
      costStructure: '',
      revenueStreams: ''
    });
  };

  return (
    <Drawer
      isOpen={isBusinessModelCanvasDrawerOpen}
      onClose={handleClose}
      onSave={handleSave}
      title="Novo Business Model Canvas"
      width="w-[500px]"
    >
      {/* Nome do Canvas */}
      <Input
        placeholder="Digite o nome do canvas"
        size="middle"
        label="Nome do Canvas"
        leftIcon={Building2}
        value={formData.name}
        onChange={(value) => handleInputChange('name', value)}
      />

      {/* Descrição */}
      <Input
        type="textarea"
        placeholder="Descrição do canvas"
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

      {/* Parcerias Principais */}
      <Input
        type="textarea"
        placeholder="Liste as principais parcerias estratégicas"
        size="middle"
        label="Parcerias Principais"
        leftIcon={Handshake}
        rows={3}
        value={formData.keyPartnerships}
        onChange={(value) => handleInputChange('keyPartnerships', value)}
      />

      {/* Atividades Principais */}
      <Input
        type="textarea"
        placeholder="Descreva as atividades-chave do seu negócio"
        size="middle"
        label="Atividades Principais"
        leftIcon={Activity}
        rows={3}
        value={formData.keyActivities}
        onChange={(value) => handleInputChange('keyActivities', value)}
      />

      {/* Proposta de Valor */}
      <Input
        type="textarea"
        placeholder="O que torna seu produto/serviço único?"
        size="middle"
        label="Proposta de Valor"
        leftIcon={Target}
        rows={3}
        value={formData.valuePropositions}
        onChange={(value) => handleInputChange('valuePropositions', value)}
      />

      {/* Relacionamento com Clientes */}
      <Input
        type="textarea"
        placeholder="Como você se relaciona com seus clientes?"
        size="middle"
        label="Relacionamento com Clientes"
        leftIcon={Users}
        rows={3}
        value={formData.customerRelationships}
        onChange={(value) => handleInputChange('customerRelationships', value)}
      />

      {/* Segmentos de Clientes */}
      <Input
        type="textarea"
        placeholder="Quem são seus clientes-alvo?"
        size="middle"
        label="Segmentos de Clientes"
        leftIcon={UserCheck}
        rows={3}
        value={formData.customerSegments}
        onChange={(value) => handleInputChange('customerSegments', value)}
      />

      {/* Recursos Principais */}
      <Input
        type="textarea"
        placeholder="Quais são seus recursos mais importantes?"
        size="middle"
        label="Recursos Principais"
        leftIcon={Wrench}
        rows={3}
        value={formData.keyResources}
        onChange={(value) => handleInputChange('keyResources', value)}
      />

      {/* Canais */}
      <Input
        type="textarea"
        placeholder="Como você chega aos seus clientes?"
        size="middle"
        label="Canais"
        leftIcon={Share2}
        rows={3}
        value={formData.channels}
        onChange={(value) => handleInputChange('channels', value)}
      />

      {/* Estrutura de Custos */}
      <Input
        type="textarea"
        placeholder="Quais são seus principais custos?"
        size="middle"
        label="Estrutura de Custos"
        leftIcon={DollarSign}
        rows={3}
        value={formData.costStructure}
        onChange={(value) => handleInputChange('costStructure', value)}
      />

      {/* Fontes de Receita */}
      <Input
        type="textarea"
        placeholder="Como seu negócio gera receita?"
        size="middle"
        label="Fontes de Receita"
        leftIcon={TrendingUp}
        rows={3}
        value={formData.revenueStreams}
        onChange={(value) => handleInputChange('revenueStreams', value)}
      />
    </Drawer>
  );
}
