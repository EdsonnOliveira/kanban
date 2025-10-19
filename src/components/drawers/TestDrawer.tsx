import { useState } from 'react';
import { Calendar, User, ChevronDown, Rocket } from 'lucide-react';
import Drawer from '../Drawer';
import Input from '../Input';
import Select from '../Select';
import { useTestDrawerStore, TestFormData } from '../../store/useTestDrawerStore';

export default function TestDrawer() {
  const { isTestDrawerOpen, closeTestDrawer, saveTest } = useTestDrawerStore();
  
  // Estado local do formulário
  const [formData, setFormData] = useState({
    insightName: '',
    responsible: '',
    learningDate: '',
    relatedHypothesis: '',
    hypothesis: '',
    observations: '',
    learnings: '',
    decisions: '',
    dataReliability: 'media',
    requiredAction: 'documentar'
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    saveTest(formData as TestFormData);
    // Resetar formulário após salvar
    setFormData({
      insightName: '',
      responsible: '',
      learningDate: '',
      relatedHypothesis: '',
      hypothesis: '',
      observations: '',
      learnings: '',
      decisions: '',
      dataReliability: 'media',
      requiredAction: 'documentar'
    });
    closeTestDrawer();
  };

  const handleClose = () => {
    closeTestDrawer();
    // Resetar formulário ao fechar
    setFormData({
      insightName: '',
      responsible: '',
      learningDate: '',
      relatedHypothesis: '',
      hypothesis: '',
      observations: '',
      learnings: '',
      decisions: '',
      dataReliability: 'media',
      requiredAction: 'documentar'
    });
  };

  return (
    <Drawer
      isOpen={isTestDrawerOpen}
      onClose={handleClose}
      onSave={handleSave}
      title="Novo Aprendizado"
      width="w-96"
    >
      {/* Nome do Insight / Teste */}
      <Input
        placeholder="Título do aprendizado"
        size="middle"
        label="Nome do Insight / Teste"
        value={formData.insightName}
        onChange={(value) => handleInputChange('insightName', value)}
      />

      {/* Responsável */}
      <Input
        placeholder="Nome do responsável"
        size="middle"
        label="Responsável"
        leftIcon={User}
        value={formData.responsible}
        onChange={(value) => handleInputChange('responsible', value)}
      />

      {/* Data do Aprendizado */}
      <Input
        type="date"
        placeholder="dd/mm/aaaa"
        size="middle"
        label="Data do Aprendizado"
        rightIcon={Calendar}
        value={formData.learningDate}
        onChange={(value) => handleInputChange('learningDate', value)}
      />

      {/* Hipótese Relacionada (opcional) */}
      <Select
        placeholder="Selecione uma hipótese"
        size="middle"
        label="Hipótese Relacionada (opcional)"
        rightIcon={ChevronDown}
        options={[
          { value: "hipotese1", label: "Implementar autenticação social" },
          { value: "hipotese2", label: "Reduzir tempo de carregamento" },
          { value: "hipotese3", label: "Adicionar notificações push" },
          { value: "hipotese4", label: "Melhorar busca de produtos" },
          { value: "hipotese5", label: "Criar programa de fidelidade" }
        ]}
        value={formData.relatedHypothesis}
        onChange={(value) => handleInputChange('relatedHypothesis', value)}
      />

      {/* Etapa 1 - Hipótese */}
      <Input
        type="textarea"
        placeholder="Nós acreditávamos que..."
        size="middle"
        label="Etapa 1 - Hipótese"
        rows={3}
        value={formData.hypothesis}
        onChange={(value) => handleInputChange('hypothesis', value)}
      />

      {/* Etapa 2 - Observações */}
      <Input
        type="textarea"
        placeholder="Nós observamos que..."
        size="middle"
        label="Etapa 2 - Observações"
        rows={3}
        value={formData.observations}
        onChange={(value) => handleInputChange('observations', value)}
      />

      {/* Etapa 3 - Aprendizados e Insights */}
      <Input
        type="textarea"
        placeholder="A partir disso, aprendemos que..."
        size="middle"
        label="Etapa 3 - Aprendizados e Insights"
        rows={3}
        value={formData.learnings}
        onChange={(value) => handleInputChange('learnings', value)}
      />

      {/* Etapa 4 - Decisões e Ações */}
      <Input
        type="textarea"
        placeholder="Portanto, vamos..."
        size="middle"
        label="Etapa 4 - Decisões e Ações"
        rows={3}
        value={formData.decisions}
        onChange={(value) => handleInputChange('decisions', value)}
      />

      {/* Confiabilidade dos Dados */}
      <Select
        placeholder="Selecione a confiabilidade"
        size="middle"
        label="Confiabilidade dos Dados"
        rightIcon={ChevronDown}
        options={[
          { value: "baixa", label: "Baixa" },
          { value: "media", label: "Média" },
          { value: "alta", label: "Alta" }
        ]}
        value={formData.dataReliability}
        onChange={(value) => handleInputChange('dataReliability', value)}
      />

      {/* Ação Requerida */}
      <Select
        placeholder="Selecione a ação"
        size="middle"
        label="Ação Requerida"
        rightIcon={ChevronDown}
        leftIcon={Rocket}
        options={[
          { value: "documentar", label: "Documentar" },
          { value: "compartilhar", label: "Compartilhar" },
          { value: "implementar", label: "Implementar" },
          { value: "investigar", label: "Investigar" }
        ]}
        value={formData.requiredAction}
        onChange={(value) => handleInputChange('requiredAction', value)}
      />
    </Drawer>
  );
}
