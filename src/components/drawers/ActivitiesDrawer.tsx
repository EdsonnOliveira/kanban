import { useState } from 'react';
import { Calendar, User, ChevronDown } from 'lucide-react';
import Drawer from '../Drawer';
import Input from '../Input';
import Select from '../Select';
import { useActivityStore } from '../../store/useActivityStore';

export default function ActivitiesDrawer() {
  const { isActivitiesDrawerOpen, closeActivitiesDrawer, saveActivity } = useActivityStore();
  
  // Estado local do formulário
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    responsible: '',
    priority: 'media',
    status: 'pendente',
    dueDate: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    saveActivity(formData);
    // Resetar formulário após salvar
    setFormData({
      title: '',
      description: '',
      responsible: '',
      priority: 'media',
      status: 'pendente',
      dueDate: ''
    });
    closeActivitiesDrawer();
  };

  const handleClose = () => {
    closeActivitiesDrawer();
    // Resetar formulário ao fechar
    setFormData({
      title: '',
      description: '',
      responsible: '',
      priority: 'media',
      status: 'pendente',
      dueDate: ''
    });
  };

  return (
    <Drawer
      isOpen={isActivitiesDrawerOpen}
      onClose={handleClose}
      onSave={handleSave}
      title="Nova Atividade"
      width="w-96"
    >
      {/* Título da Atividade */}
      <Input
        placeholder="Nome da atividade"
        size="middle"
        label="Título da Atividade"
        value={formData.title}
        onChange={(value) => handleInputChange('title', value)}
      />

      {/* Descrição */}
      <Input
        type="textarea"
        placeholder="Detalhes da atividade"
        size="middle"
        label="Descrição"
        rows={4}
        value={formData.description}
        onChange={(value) => handleInputChange('description', value)}
      />

      {/* Responsável e Prioridade - lado a lado */}
      <div className="grid grid-cols-2 gap-4">
        <Input
          placeholder="Nome do responsável"
          size="middle"
          label="Responsável"
          leftIcon={User}
          value={formData.responsible}
          onChange={(value) => handleInputChange('responsible', value)}
        />
        <Select
          placeholder="Selecione a prioridade"
          size="middle"
          label="Prioridade"
          rightIcon={ChevronDown}
          options={[
            { value: "baixa", label: "Baixa" },
            { value: "media", label: "Média" },
            { value: "alta", label: "Alta" },
            { value: "urgente", label: "Urgente" }
          ]}
          value={formData.priority}
          onChange={(value) => handleInputChange('priority', value)}
        />
      </div>

      {/* Status e Data Prazo - lado a lado */}
      <div className="grid grid-cols-2 gap-4">
        <Select
          placeholder="Selecione o status"
          size="middle"
          label="Status"
          rightIcon={ChevronDown}
          options={[
            { value: "pendente", label: "Pendente" },
            { value: "em-andamento", label: "Em Andamento" },
            { value: "concluida", label: "Concluída" },
            { value: "cancelada", label: "Cancelada" }
          ]}
          value={formData.status}
          onChange={(value) => handleInputChange('status', value)}
        />
        <Input
          type="date"
          placeholder="dd/mm/aaaa"
          size="middle"
          label="Data Prazo"
          rightIcon={Calendar}
          value={formData.dueDate}
          onChange={(value) => handleInputChange('dueDate', value)}
        />
      </div>
    </Drawer>
  );
}
