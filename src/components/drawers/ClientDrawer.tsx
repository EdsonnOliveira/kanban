import { useState } from 'react';
import { User, Building, Mail, Phone, ChevronDown, MapPin } from 'lucide-react';
import Drawer from '../Drawer';
import Input from '../Input';
import Select from '../Select';
import { useClientDrawerStore, ClientFormData } from '../../store/useClientDrawerStore';

export default function ClientDrawer() {
  const { isClientDrawerOpen, closeClientDrawer, saveClient } = useClientDrawerStore();
  
  // Estado local do formulário
  const [formData, setFormData] = useState<ClientFormData>({
    clientName: '',
    company: '',
    email: '',
    phone: '',
    industry: '',
    status: 'ativo',
    contactPerson: '',
    address: '',
    notes: ''
  });

  const handleInputChange = (field: keyof ClientFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    saveClient(formData);
    // Resetar formulário após salvar
    setFormData({
      clientName: '',
      company: '',
      email: '',
      phone: '',
      industry: '',
      status: 'ativo',
      contactPerson: '',
      address: '',
      notes: ''
    });
    closeClientDrawer();
  };

  const handleClose = () => {
    closeClientDrawer();
    // Resetar formulário ao fechar
    setFormData({
      clientName: '',
      company: '',
      email: '',
      phone: '',
      industry: '',
      status: 'ativo',
      contactPerson: '',
      address: '',
      notes: ''
    });
  };

  return (
    <Drawer
      isOpen={isClientDrawerOpen}
      onClose={handleClose}
      onSave={handleSave}
      title="Novo Cliente"
      width="w-96"
    >
      {/* Nome do Cliente */}
      <Input
        placeholder="Digite o nome do cliente"
        size="middle"
        label="Nome do Cliente"
        leftIcon={User}
        value={formData.clientName}
        onChange={(value) => handleInputChange('clientName', value)}
      />

      {/* Empresa */}
      <Input
        placeholder="Nome da empresa"
        size="middle"
        label="Empresa"
        leftIcon={Building}
        value={formData.company}
        onChange={(value) => handleInputChange('company', value)}
      />

      {/* Email e Telefone - lado a lado */}
      <div className="grid grid-cols-2 gap-4">
        <Input
          placeholder="email@exemplo.com"
          size="middle"
          label="Email"
          leftIcon={Mail}
          value={formData.email}
          onChange={(value) => handleInputChange('email', value)}
        />
        <Input
          placeholder="(11) 99999-9999"
          size="middle"
          label="Telefone"
          leftIcon={Phone}
          value={formData.phone}
          onChange={(value) => handleInputChange('phone', value)}
        />
      </div>

      {/* Setor e Status - lado a lado */}
      <div className="grid grid-cols-2 gap-4">
        <Select
          placeholder="Selecione o setor"
          size="middle"
          label="Setor"
          rightIcon={ChevronDown}
          options={[
            { value: "tecnologia", label: "Tecnologia" },
            { value: "saude", label: "Saúde" },
            { value: "educacao", label: "Educação" },
            { value: "financeiro", label: "Financeiro" },
            { value: "varejo", label: "Varejo" },
            { value: "industria", label: "Indústria" },
            { value: "servicos", label: "Serviços" },
            { value: "outros", label: "Outros" }
          ]}
          value={formData.industry}
          onChange={(value) => handleInputChange('industry', value)}
        />
        <Select
          placeholder="Selecione o status"
          size="middle"
          label="Status"
          rightIcon={ChevronDown}
          options={[
            { value: "ativo", label: "Ativo" },
            { value: "inativo", label: "Inativo" },
            { value: "prospecto", label: "Prospecto" },
            { value: "potencial", label: "Potencial" }
          ]}
          value={formData.status}
          onChange={(value) => handleInputChange('status', value)}
        />
      </div>

      {/* Pessoa de Contato */}
      <Input
        placeholder="Nome da pessoa de contato"
        size="middle"
        label="Pessoa de Contato"
        leftIcon={User}
        value={formData.contactPerson}
        onChange={(value) => handleInputChange('contactPerson', value)}
      />

      {/* Endereço */}
      <Input
        placeholder="Endereço completo"
        size="middle"
        label="Endereço"
        leftIcon={MapPin}
        value={formData.address}
        onChange={(value) => handleInputChange('address', value)}
      />

      {/* Observações */}
      <Input
        type="textarea"
        placeholder="Observações sobre o cliente"
        size="middle"
        label="Observações"
        rows={4}
        value={formData.notes}
        onChange={(value) => handleInputChange('notes', value)}
      />
    </Drawer>
  );
}
