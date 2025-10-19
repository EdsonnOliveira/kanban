import { useState } from 'react';
import { User, ChevronDown } from 'lucide-react';
import Drawer from '../Drawer';
import Input from '../Input';
import Select from '../Select';
import { useMemberDrawerStore } from '../../store/useMemberDrawerStore';

export default function MemberDrawer() {
  const { isMemberDrawerOpen, closeMemberDrawer, saveMember } = useMemberDrawerStore();
  
  // Estado local do formulário
  const [formData, setFormData] = useState({
    profilePhoto: '',
    fullName: '',
    role: '',
    email: '',
    phone: '',
    hierarchicalLevel: '1'
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    saveMember(formData);
    // Resetar formulário após salvar
    setFormData({
      profilePhoto: '',
      fullName: '',
      role: '',
      email: '',
      phone: '',
      hierarchicalLevel: '1'
    });
    closeMemberDrawer();
  };

  const handleClose = () => {
    closeMemberDrawer();
    // Resetar formulário ao fechar
    setFormData({
      profilePhoto: '',
      fullName: '',
      role: '',
      email: '',
      phone: '',
      hierarchicalLevel: '1'
    });
  };

  return (
    <Drawer
      isOpen={isMemberDrawerOpen}
      onClose={handleClose}
      onSave={handleSave}
      title="Novo Membro"
      width="w-96"
    >
      {/* Foto de Perfil */}
      <div className="space-y-3">
        <label className="text-sm font-medium text-gray-700">Foto de Perfil</label>
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center">
            <User size={32} className="text-gray-400" />
          </div>
          <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
            Alterar Foto
          </button>
        </div>
      </div>

      {/* Nome Completo */}
      <Input
        placeholder="Nome do colaborador"
        size="middle"
        label="Nome Completo"
        value={formData.fullName}
        onChange={(value) => handleInputChange('fullName', value)}
      />

      {/* Cargo */}
      <Input
        placeholder="Cargo ou função"
        size="middle"
        label="Cargo"
        value={formData.role}
        onChange={(value) => handleInputChange('role', value)}
      />

      {/* Email */}
      <Input
        type="email"
        placeholder="email@exemplo.com"
        size="middle"
        label="Email"
        value={formData.email}
        onChange={(value) => handleInputChange('email', value)}
      />

      {/* Telefone */}
      <Input
        type="text"
        placeholder="(00) 00000-0000"
        size="middle"
        label="Telefone"
        value={formData.phone}
        onChange={(value) => handleInputChange('phone', value)}
      />

      {/* Nível Hierárquico */}
      <Select
        placeholder="Selecione o nível"
        size="middle"
        label="Nível Hierárquico"
        rightIcon={ChevronDown}
        options={[
          { value: "1", label: "1" },
          { value: "2", label: "2" },
          { value: "3", label: "3" },
          { value: "4", label: "4" },
          { value: "5", label: "5" },
          { value: "6", label: "6" },
          { value: "7", label: "7" },
          { value: "8", label: "8" },
          { value: "9", label: "9" },
          { value: "10", label: "10" }
        ]}
        value={formData.hierarchicalLevel}
        onChange={(value) => handleInputChange('hierarchicalLevel', value)}
      />
    </Drawer>
  );
}
