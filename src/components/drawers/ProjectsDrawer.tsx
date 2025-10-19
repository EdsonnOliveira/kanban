import { useState } from 'react';
import { Calendar, User, ChevronDown } from 'lucide-react';
import Drawer from '../Drawer';
import Input from '../Input';
import Select from '../Select';
import { useProjectStore } from '../../store/useProjectStore';

export default function ProjectsDrawer() {
  const { isProjectsDrawerOpen, closeProjectsDrawer, saveProject } = useProjectStore();
  
  // Estado local do formulário
  const [formData, setFormData] = useState({
    projectName: '',
    description: '',
    projectLeader: '',
    status: 'planejamento',
    startDate: '',
    deliveryDate: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    saveProject(formData);
    // Resetar formulário após salvar
    setFormData({
      projectName: '',
      description: '',
      projectLeader: '',
      status: 'planejamento',
      startDate: '',
      deliveryDate: ''
    });
    closeProjectsDrawer();
  };

  const handleClose = () => {
    closeProjectsDrawer();
    // Resetar formulário ao fechar
    setFormData({
      projectName: '',
      description: '',
      projectLeader: '',
      status: 'planejamento',
      startDate: '',
      deliveryDate: ''
    });
  };

  return (
    <Drawer
      isOpen={isProjectsDrawerOpen}
      onClose={handleClose}
      onSave={handleSave}
      title="Novo Projeto"
      width="w-96"
    >
      {/* Nome do Projeto */}
      <Input
        placeholder="Digite o nome do projeto"
        size="middle"
        label="Nome do Projeto"
        value={formData.projectName}
        onChange={(value) => handleInputChange('projectName', value)}
      />

      {/* Descrição */}
      <Input
        type="textarea"
        placeholder="Descrição do projeto"
        size="middle"
        label="Descrição"
        rows={4}
        value={formData.description}
        onChange={(value) => handleInputChange('description', value)}
      />

      {/* Líder do Projeto e Status - lado a lado */}
      <div className="grid grid-cols-2 gap-4">
        <Input
          placeholder="Nome do líder"
          size="middle"
          label="Líder do Projeto"
          leftIcon={User}
          value={formData.projectLeader}
          onChange={(value) => handleInputChange('projectLeader', value)}
        />
        <Select
          placeholder="Selecione o status"
          size="middle"
          label="Status"
          rightIcon={ChevronDown}
          options={[
            { value: "planejamento", label: "Planejamento" },
            { value: "em-andamento", label: "Em Andamento" },
            { value: "concluido", label: "Concluído" },
            { value: "pausado", label: "Pausado" }
          ]}
          value={formData.status}
          onChange={(value) => handleInputChange('status', value)}
        />
      </div>

      {/* Data de Início e Data de Entrega - lado a lado */}
      <div className="grid grid-cols-2 gap-4">
        <Input
          type="date"
          placeholder="dd/mm/aaaa"
          size="middle"
          label="Data de Início"
          rightIcon={Calendar}
          value={formData.startDate}
          onChange={(value) => handleInputChange('startDate', value)}
        />
        <Input
          type="date"
          placeholder="dd/mm/aaaa"
          size="middle"
          label="Data de Entrega"
          rightIcon={Calendar}
          value={formData.deliveryDate}
          onChange={(value) => handleInputChange('deliveryDate', value)}
        />
      </div>
    </Drawer>
  );
}
