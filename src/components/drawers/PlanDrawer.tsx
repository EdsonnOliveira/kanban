import { useState } from 'react';
import Drawer from '../Drawer';
import Input from '../Input';
import Select from '../Select';
import { usePlanDrawerStore, PlanFormData } from '../../store/usePlanDrawerStore';

export default function PlanDrawer() {
  const { isPlanDrawerOpen, closePlanDrawer } = usePlanDrawerStore();
  
  // Estado local do formulário
  const [formData, setFormData] = useState<PlanFormData>({
    planName: '',
    description: '',
    category: 'identidade',
    priority: 'media',
    startDate: '',
    endDate: '',
    responsible: '',
    status: 'rascunho',
    tags: '',
    notes: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };


  const handleClose = () => {
    closePlanDrawer();
    // Resetar formulário ao fechar
    setFormData({
      planName: '',
      description: '',
      category: 'identidade',
      priority: 'media',
      startDate: '',
      endDate: '',
      responsible: '',
      status: 'rascunho',
      tags: '',
      notes: ''
    });
  };

  const categoryOptions = [
    { label: 'Identidade', value: 'identidade' },
    { label: 'Cultura', value: 'cultura' },
    { label: 'Planejamento', value: 'planejamento' },
    { label: 'Expressão', value: 'expressao' },
    { label: 'Objetivos', value: 'objetivos' }
  ];

  const priorityOptions = [
    { label: 'Baixa', value: 'baixa' },
    { label: 'Média', value: 'media' },
    { label: 'Alta', value: 'alta' }
  ];

  const statusOptions = [
    { label: 'Rascunho', value: 'rascunho' },
    { label: 'Em Andamento', value: 'em-andamento' },
    { label: 'Concluído', value: 'concluido' },
    { label: 'Pausado', value: 'pausado' }
  ];

  return (
    <Drawer
      isOpen={isPlanDrawerOpen}
      onClose={handleClose}
      title="Novo Plano"
    >
      <div className="space-y-6">
        {/* Nome do Plano */}
        <Input
          type="text"
          placeholder="Digite o nome do plano"
          size="middle"
          label="Nome do Plano"
          value={formData.planName}
          onChange={(value) => handleInputChange('planName', value)}
        />

        {/* Descrição */}
        <Input
          type="textarea"
          placeholder="Descreva o plano em detalhes"
          size="middle"
          label="Descrição"
          value={formData.description}
          onChange={(value) => handleInputChange('description', value)}
        />

        {/* Categoria */}
        <Select
          value={formData.category}
          onChange={(value) => handleInputChange('category', value)}
          options={categoryOptions}
          size="middle"
          label="Categoria"
        />

        {/* Prioridade */}
        <Select
          value={formData.priority}
          onChange={(value) => handleInputChange('priority', value)}
          options={priorityOptions}
          size="middle"
          label="Prioridade"
        />

        {/* Datas */}
        <div className="grid grid-cols-2 gap-4">
          <Input
            type="date"
            placeholder="Data de início"
            size="middle"
            label="Data de Início"
            value={formData.startDate}
            onChange={(value) => handleInputChange('startDate', value)}
          />
          <Input
            type="date"
            placeholder="Data de fim"
            size="middle"
            label="Data de Fim"
            value={formData.endDate}
            onChange={(value) => handleInputChange('endDate', value)}
          />
        </div>

        {/* Responsável */}
        <Input
          type="text"
          placeholder="Nome do responsável"
          size="middle"
          label="Responsável"
          value={formData.responsible}
          onChange={(value) => handleInputChange('responsible', value)}
        />

        {/* Status */}
        <Select
          value={formData.status}
          onChange={(value) => handleInputChange('status', value)}
          options={statusOptions}
          size="middle"
          label="Status"
        />

        {/* Tags */}
        <Input
          type="text"
          placeholder="Ex: marketing, vendas, produto"
          size="middle"
          label="Tags"
          value={formData.tags}
          onChange={(value) => handleInputChange('tags', value)}
        />

        {/* Observações */}
        <Input
          type="textarea"
          placeholder="Observações adicionais"
          size="middle"
          label="Observações"
          value={formData.notes}
          onChange={(value) => handleInputChange('notes', value)}
        />

      </div>
    </Drawer>
  );
}
