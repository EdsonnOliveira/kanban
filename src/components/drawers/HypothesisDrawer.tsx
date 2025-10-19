import { useState } from 'react';
import { Calendar, User, ChevronDown } from 'lucide-react';
import Drawer from '../Drawer';
import Input from '../Input';
import Select from '../Select';
import { useHypothesisDrawerStore, HypothesisFormData } from '../../store/useHypothesisDrawerStore';

export default function HypothesisDrawer() {
  const { isHypothesisDrawerOpen, closeHypothesisDrawer, saveHypothesis } = useHypothesisDrawerStore();
  
  // Estado local do formulário
  const [formData, setFormData] = useState({
    testName: '',
    deliveryDate: '',
    responsible: '',
    belief: '',
    criticality: 'media',
    cost: 'medio',
    test: '',
    expectedTime: 'medio',
    dataConfidence: 'media',
    metrics: '',
    successCriteria: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value as HypothesisFormData[keyof HypothesisFormData]
    }));
  };

  const handleSave = () => {
    saveHypothesis(formData as HypothesisFormData);
    // Resetar formulário após salvar
    setFormData({
      testName: '',
      deliveryDate: '',
      responsible: '',
      belief: '',
      criticality: 'media',
      cost: 'medio',
      test: '',
      expectedTime: 'medio',
      dataConfidence: 'media',
      metrics: '',
      successCriteria: ''
    });
    closeHypothesisDrawer();
  };

  const handleClose = () => {
    closeHypothesisDrawer();
    // Resetar formulário ao fechar
    setFormData({
      testName: '',
      deliveryDate: '',
      responsible: '',
      belief: '',
      criticality: 'media',
      cost: 'medio',
      test: '',
      expectedTime: 'medio',
      dataConfidence: 'media',
      metrics: '',
      successCriteria: ''
    });
  };

  return (
    <Drawer
      isOpen={isHypothesisDrawerOpen}
      onClose={handleClose}
      onSave={handleSave}
      title="Nova hipótese"
      width="w-96"
    >
      {/* Nome do Teste */}
      <Input
        placeholder="Digite o nome do teste"
        size="middle"
        label="Nome do Teste"
        value={formData.testName}
        onChange={(value) => handleInputChange('testName', value)}
      />

      {/* Data de Entrega e Responsável - lado a lado */}
      <div className="grid grid-cols-2 gap-4">
        <Input
          type="date"
          placeholder="dd/mm/aaaa"
          size="middle"
          label="Data de Entrega"
          rightIcon={Calendar}
          value={formData.deliveryDate}
          onChange={(value) => handleInputChange('deliveryDate', value)}
        />
        <Input
          placeholder="Nome do responsável"
          size="middle"
          label="Responsável"
          leftIcon={User}
          value={formData.responsible}
          onChange={(value) => handleInputChange('responsible', value)}
        />
      </div>

      {/* Nós acreditamos que... */}
      <Input
        type="textarea"
        placeholder="Descreva sua crença sobre o teste"
        size="middle"
        label="Nós acreditamos que..."
        rows={3}
        value={formData.belief}
        onChange={(value) => handleInputChange('belief', value)}
      />

      {/* Criticidade e Custo - lado a lado */}
      <div className="grid grid-cols-2 gap-4">
        <Select
          placeholder="Selecione a criticidade"
          size="middle"
          label="Criticidade"
          rightIcon={ChevronDown}
          options={[
            { value: "baixa", label: "Baixa" },
            { value: "media", label: "Média" },
            { value: "alta", label: "Alta" }
          ]}
          value={formData.criticality}
          onChange={(value) => handleInputChange('criticality', value)}
        />
        <Select
          placeholder="Selecione o custo"
          size="middle"
          label="Custo"
          rightIcon={ChevronDown}
          options={[
            { value: "baixo", label: "Baixo" },
            { value: "medio", label: "Médio" },
            { value: "alto", label: "Alto" }
          ]}
          value={formData.cost}
          onChange={(value) => handleInputChange('cost', value)}
        />
      </div>

      {/* Para verificar isso, faremos... */}
      <Input
        type="textarea"
        placeholder="Descreva como você vai testar a hipótese"
        size="middle"
        label="Para verificar isso, faremos..."
        rows={3}
        value={formData.test}
        onChange={(value) => handleInputChange('test', value)}
      />

      {/* Tempo Esperado e Confiança nos Dados - lado a lado */}
      <div className="grid grid-cols-2 gap-4">
        <Select
          placeholder="Selecione o tempo esperado"
          size="middle"
          label="Tempo Esperado"
          rightIcon={ChevronDown}
          options={[
            { value: "baixo", label: "Baixo" },
            { value: "medio", label: "Médio" },
            { value: "alto", label: "Alto" }
          ]}
          value={formData.expectedTime}
          onChange={(value) => handleInputChange('expectedTime', value)}
        />
        <Select
          placeholder="Selecione a confiança"
          size="middle"
          label="Confiança nos Dados"
          rightIcon={ChevronDown}
          options={[
            { value: "baixa", label: "Baixa" },
            { value: "media", label: "Média" },
            { value: "alta", label: "Alta" }
          ]}
          value={formData.dataConfidence}
          onChange={(value) => handleInputChange('dataConfidence', value)}
        />
      </div>

      {/* Métricas */}
      <Input
        type="textarea"
        placeholder="Como você vai medir o sucesso?"
        size="middle"
        label="Métricas"
        rows={3}
        value={formData.metrics}
        onChange={(value) => handleInputChange('metrics', value)}
      />

      {/* Estaremos certos se... */}
      <Input
        type="textarea"
        placeholder="Critério de sucesso"
        size="middle"
        label="Estaremos certos se..."
        rows={3}
        value={formData.successCriteria}
        onChange={(value) => handleInputChange('successCriteria', value)}
      />
    </Drawer>
  );
}
