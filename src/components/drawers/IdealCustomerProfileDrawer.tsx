import { useState } from 'react';
import { 
  UserCheck, 
  Calendar, 
  MapPin, 
  DollarSign, 
  Heart, 
  Target, 
  Brain, 
  ShoppingCart, 
  Building2, 
  Users, 
  Wrench, 
  MessageSquare, 
  Clock, 
  TrendingUp, 
  ChevronDown 
} from 'lucide-react';
import Drawer from '../Drawer';
import Input from '../Input';
import Select from '../Select';
import { useIdealCustomerProfileDrawerStore, IdealCustomerProfileFormData } from '../../store/useIdealCustomerProfileDrawerStore';

export default function IdealCustomerProfileDrawer() {
  const { isIdealCustomerProfileDrawerOpen, closeIdealCustomerProfileDrawer, saveIdealCustomerProfile } = useIdealCustomerProfileDrawerStore();
  
  // Estado local do formulário
  const [formData, setFormData] = useState<IdealCustomerProfileFormData>({
    name: '',
    description: '',
    status: 'rascunho',
    ageRange: '',
    gender: '',
    location: '',
    education: '',
    income: '',
    interests: '',
    values: '',
    lifestyle: '',
    personality: '',
    buyingBehavior: '',
    decisionProcess: '',
    painPoints: '',
    goals: '',
    industry: '',
    companySize: '',
    jobTitle: '',
    technology: '',
    preferredChannels: '',
    communicationStyle: '',
    timeZone: '',
    lifetimeValue: '',
    acquisitionCost: '',
    retentionRate: '',
    satisfactionScore: ''
  });

  const handleInputChange = (field: keyof IdealCustomerProfileFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    saveIdealCustomerProfile(formData);
    // Resetar formulário após salvar
    setFormData({
      name: '',
      description: '',
      status: 'rascunho',
      ageRange: '',
      gender: '',
      location: '',
      education: '',
      income: '',
      interests: '',
      values: '',
      lifestyle: '',
      personality: '',
      buyingBehavior: '',
      decisionProcess: '',
      painPoints: '',
      goals: '',
      industry: '',
      companySize: '',
      jobTitle: '',
      technology: '',
      preferredChannels: '',
      communicationStyle: '',
      timeZone: '',
      lifetimeValue: '',
      acquisitionCost: '',
      retentionRate: '',
      satisfactionScore: ''
    });
    closeIdealCustomerProfileDrawer();
  };

  const handleClose = () => {
    closeIdealCustomerProfileDrawer();
    // Resetar formulário ao fechar
    setFormData({
      name: '',
      description: '',
      status: 'rascunho',
      ageRange: '',
      gender: '',
      location: '',
      education: '',
      income: '',
      interests: '',
      values: '',
      lifestyle: '',
      personality: '',
      buyingBehavior: '',
      decisionProcess: '',
      painPoints: '',
      goals: '',
      industry: '',
      companySize: '',
      jobTitle: '',
      technology: '',
      preferredChannels: '',
      communicationStyle: '',
      timeZone: '',
      lifetimeValue: '',
      acquisitionCost: '',
      retentionRate: '',
      satisfactionScore: ''
    });
  };

  return (
    <Drawer
      isOpen={isIdealCustomerProfileDrawerOpen}
      onClose={handleClose}
      onSave={handleSave}
      title="Novo Ideal Customer Profile"
      width="w-[500px]"
    >
      {/* Nome do ICP */}
      <Input
        placeholder="Digite o nome do ICP"
        size="middle"
        label="Nome do ICP"
        leftIcon={UserCheck}
        value={formData.name}
        onChange={(value) => handleInputChange('name', value)}
      />

      {/* Descrição */}
      <Input
        type="textarea"
        placeholder="Descrição do perfil ideal de cliente"
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
          { value: "validado", label: "Validado" }
        ]}
        value={formData.status}
        onChange={(value) => handleInputChange('status', value)}
      />

      {/* Dados Demográficos */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">Dados Demográficos</h3>
        
        <div className="grid grid-cols-2 gap-4">
          <Input
            placeholder="Ex: 25-35 anos"
            size="middle"
            label="Faixa Etária"
            leftIcon={Calendar}
            value={formData.ageRange}
            onChange={(value) => handleInputChange('ageRange', value)}
          />
          <Select
            placeholder="Selecione o gênero"
            size="middle"
            label="Gênero"
            rightIcon={ChevronDown}
            options={[
              { value: "masculino", label: "Masculino" },
              { value: "feminino", label: "Feminino" },
              { value: "misto", label: "Misto" },
              { value: "nao-especificado", label: "Não Especificado" }
            ]}
            value={formData.gender}
            onChange={(value) => handleInputChange('gender', value)}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Input
            placeholder="Ex: São Paulo, SP"
            size="middle"
            label="Localização"
            leftIcon={MapPin}
            value={formData.location}
            onChange={(value) => handleInputChange('location', value)}
          />
          <Select
            placeholder="Selecione a educação"
            size="middle"
            label="Educação"
            rightIcon={ChevronDown}
            options={[
              { value: "ensino-medio", label: "Ensino Médio" },
              { value: "superior-incompleto", label: "Superior Incompleto" },
              { value: "superior-completo", label: "Superior Completo" },
              { value: "pos-graduacao", label: "Pós-graduação" },
              { value: "mestrado", label: "Mestrado" },
              { value: "doutorado", label: "Doutorado" }
            ]}
            value={formData.education}
            onChange={(value) => handleInputChange('education', value)}
          />
        </div>

        <Input
          placeholder="Ex: R$ 8.000 - R$ 15.000"
          size="middle"
          label="Renda"
          leftIcon={DollarSign}
          value={formData.income}
          onChange={(value) => handleInputChange('income', value)}
        />
      </div>

      {/* Dados Psicográficos */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">Dados Psicográficos</h3>
        
        <Input
          type="textarea"
          placeholder="Liste os principais interesses e hobbies"
          size="middle"
          label="Interesses"
          leftIcon={Heart}
          rows={3}
          value={formData.interests}
          onChange={(value) => handleInputChange('interests', value)}
        />

        <Input
          type="textarea"
          placeholder="Quais são os valores pessoais e profissionais?"
          size="middle"
          label="Valores"
          leftIcon={Target}
          rows={3}
          value={formData.values}
          onChange={(value) => handleInputChange('values', value)}
        />

        <div className="grid grid-cols-2 gap-4">
          <Input
            type="textarea"
            placeholder="Descreva o estilo de vida"
            size="middle"
            label="Estilo de Vida"
            leftIcon={Brain}
            rows={3}
            value={formData.lifestyle}
            onChange={(value) => handleInputChange('lifestyle', value)}
          />
          <Input
            type="textarea"
            placeholder="Traços de personalidade"
            size="middle"
            label="Personalidade"
            leftIcon={UserCheck}
            rows={3}
            value={formData.personality}
            onChange={(value) => handleInputChange('personality', value)}
          />
        </div>
      </div>

      {/* Dados Comportamentais */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">Dados Comportamentais</h3>
        
        <div className="grid grid-cols-2 gap-4">
          <Input
            type="textarea"
            placeholder="Como o cliente compra?"
            size="middle"
            label="Comportamento de Compra"
            leftIcon={ShoppingCart}
            rows={3}
            value={formData.buyingBehavior}
            onChange={(value) => handleInputChange('buyingBehavior', value)}
          />
          <Input
            type="textarea"
            placeholder="Como toma decisões?"
            size="middle"
            label="Processo de Decisão"
            leftIcon={Target}
            rows={3}
            value={formData.decisionProcess}
            onChange={(value) => handleInputChange('decisionProcess', value)}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Input
            type="textarea"
            placeholder="Principais dores e problemas"
            size="middle"
            label="Pain Points"
            leftIcon={Target}
            rows={3}
            value={formData.painPoints}
            onChange={(value) => handleInputChange('painPoints', value)}
          />
          <Input
            type="textarea"
            placeholder="Metas e objetivos"
            size="middle"
            label="Objetivos"
            leftIcon={Target}
            rows={3}
            value={formData.goals}
            onChange={(value) => handleInputChange('goals', value)}
          />
        </div>
      </div>

      {/* Dados Técnicos/Profissionais */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">Dados Profissionais</h3>
        
        <div className="grid grid-cols-2 gap-4">
          <Input
            placeholder="Ex: Tecnologia, Varejo, Saúde"
            size="middle"
            label="Indústria"
            leftIcon={Building2}
            value={formData.industry}
            onChange={(value) => handleInputChange('industry', value)}
          />
          <Select
            placeholder="Selecione o tamanho"
            size="middle"
            label="Tamanho da Empresa"
            rightIcon={ChevronDown}
            options={[
              { value: "1-10", label: "1-10 funcionários" },
              { value: "11-50", label: "11-50 funcionários" },
              { value: "51-200", label: "51-200 funcionários" },
              { value: "201-500", label: "201-500 funcionários" },
              { value: "501-1000", label: "501-1000 funcionários" },
              { value: "1000+", label: "1000+ funcionários" }
            ]}
            value={formData.companySize}
            onChange={(value) => handleInputChange('companySize', value)}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Input
            placeholder="Ex: CEO, CTO, Gerente"
            size="middle"
            label="Cargo"
            leftIcon={Users}
            value={formData.jobTitle}
            onChange={(value) => handleInputChange('jobTitle', value)}
          />
          <Input
            type="textarea"
            placeholder="Tecnologias utilizadas"
            size="middle"
            label="Tecnologia"
            leftIcon={Wrench}
            rows={3}
            value={formData.technology}
            onChange={(value) => handleInputChange('technology', value)}
          />
        </div>
      </div>

      {/* Dados de Contato */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">Dados de Contato</h3>
        
        <div className="grid grid-cols-2 gap-4">
          <Input
            type="textarea"
            placeholder="Canais preferidos de comunicação"
            size="middle"
            label="Canais Preferidos"
            leftIcon={MessageSquare}
            rows={3}
            value={formData.preferredChannels}
            onChange={(value) => handleInputChange('preferredChannels', value)}
          />
          <Input
            type="textarea"
            placeholder="Estilo de comunicação"
            size="middle"
            label="Estilo de Comunicação"
            leftIcon={MessageSquare}
            rows={3}
            value={formData.communicationStyle}
            onChange={(value) => handleInputChange('communicationStyle', value)}
          />
        </div>

        <Input
          placeholder="Ex: GMT-3 (Brasil)"
          size="middle"
          label="Fuso Horário"
          leftIcon={Clock}
          value={formData.timeZone}
          onChange={(value) => handleInputChange('timeZone', value)}
        />
      </div>

      {/* Métricas */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">Métricas</h3>
        
        <div className="grid grid-cols-2 gap-4">
          <Input
            placeholder="Ex: R$ 50.000"
            size="middle"
            label="Lifetime Value (LTV)"
            leftIcon={TrendingUp}
            value={formData.lifetimeValue}
            onChange={(value) => handleInputChange('lifetimeValue', value)}
          />
          <Input
            placeholder="Ex: R$ 2.500"
            size="middle"
            label="Customer Acquisition Cost (CAC)"
            leftIcon={DollarSign}
            value={formData.acquisitionCost}
            onChange={(value) => handleInputChange('acquisitionCost', value)}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Input
            placeholder="Ex: 85%"
            size="middle"
            label="Taxa de Retenção"
            leftIcon={TrendingUp}
            value={formData.retentionRate}
            onChange={(value) => handleInputChange('retentionRate', value)}
          />
          <Input
            placeholder="Ex: 4.7/5"
            size="middle"
            label="Score de Satisfação"
            leftIcon={Target}
            value={formData.satisfactionScore}
            onChange={(value) => handleInputChange('satisfactionScore', value)}
          />
        </div>
      </div>
    </Drawer>
  );
}
