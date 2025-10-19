import { useState } from 'react';
import { Presentation, User, Target, Clock, MapPin, ChevronDown } from 'lucide-react';
import Drawer from '../Drawer';
import Input from '../Input';
import Select from '../Select';
import { usePitchDeckDrawerStore, PitchDeckFormData } from '../../store/usePitchDeckDrawerStore';

export default function PitchDeckDrawer() {
  const { isPitchDeckDrawerOpen, closePitchDeckDrawer, savePitchDeck } = usePitchDeckDrawerStore();
  
  // Estado local do formulário
  const [formData, setFormData] = useState<PitchDeckFormData>({
    title: '',
    description: '',
    type: 'evento',
    status: 'rascunho',
    targetAudience: '',
    objective: '',
    duration: '',
    presenter: '',
    location: '',
    notes: ''
  });

  const handleInputChange = (field: keyof PitchDeckFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    savePitchDeck(formData);
    // Resetar formulário após salvar
    setFormData({
      title: '',
      description: '',
      type: 'evento',
      status: 'rascunho',
      targetAudience: '',
      objective: '',
      duration: '',
      presenter: '',
      location: '',
      notes: ''
    });
    closePitchDeckDrawer();
  };

  const handleClose = () => {
    closePitchDeckDrawer();
    // Resetar formulário ao fechar
    setFormData({
      title: '',
      description: '',
      type: 'evento',
      status: 'rascunho',
      targetAudience: '',
      objective: '',
      duration: '',
      presenter: '',
      location: '',
      notes: ''
    });
  };

  return (
    <Drawer
      isOpen={isPitchDeckDrawerOpen}
      onClose={handleClose}
      onSave={handleSave}
      title="Novo Pitch Deck"
      width="w-96"
    >
      {/* Título do Pitch Deck */}
      <Input
        placeholder="Digite o título do pitch deck"
        size="middle"
        label="Título do Pitch Deck"
        leftIcon={Presentation}
        value={formData.title}
        onChange={(value) => handleInputChange('title', value)}
      />

      {/* Descrição */}
      <Input
        type="textarea"
        placeholder="Descrição do pitch deck"
        size="middle"
        label="Descrição"
        rows={3}
        value={formData.description}
        onChange={(value) => handleInputChange('description', value)}
      />

      {/* Tipo e Status - lado a lado */}
      <div className="grid grid-cols-2 gap-4">
        <Select
          placeholder="Selecione o tipo"
          size="middle"
          label="Tipo"
          rightIcon={ChevronDown}
          options={[
            { value: "evento", label: "Evento" },
            { value: "conferencia", label: "Conferência" },
            { value: "campanha", label: "Campanha" },
            { value: "investimento", label: "Investimento" },
            { value: "produto", label: "Produto" },
            { value: "outros", label: "Outros" }
          ]}
          value={formData.type}
          onChange={(value) => handleInputChange('type', value)}
        />
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
      </div>

      {/* Público-Alvo */}
      <Input
        placeholder="Defina o público-alvo"
        size="middle"
        label="Público-Alvo"
        leftIcon={Target}
        value={formData.targetAudience}
        onChange={(value) => handleInputChange('targetAudience', value)}
      />

      {/* Objetivo */}
      <Input
        type="textarea"
        placeholder="Qual é o objetivo do pitch?"
        size="middle"
        label="Objetivo"
        rows={3}
        value={formData.objective}
        onChange={(value) => handleInputChange('objective', value)}
      />

      {/* Duração e Apresentador - lado a lado */}
      <div className="grid grid-cols-2 gap-4">
        <Input
          placeholder="Ex: 15 minutos"
          size="middle"
          label="Duração"
          leftIcon={Clock}
          value={formData.duration}
          onChange={(value) => handleInputChange('duration', value)}
        />
        <Input
          placeholder="Nome do apresentador"
          size="middle"
          label="Apresentador"
          leftIcon={User}
          value={formData.presenter}
          onChange={(value) => handleInputChange('presenter', value)}
        />
      </div>

      {/* Localização */}
      <Input
        placeholder="Local da apresentação"
        size="middle"
        label="Localização"
        leftIcon={MapPin}
        value={formData.location}
        onChange={(value) => handleInputChange('location', value)}
      />

      {/* Observações */}
      <Input
        type="textarea"
        placeholder="Observações adicionais"
        size="middle"
        label="Observações"
        rows={3}
        value={formData.notes}
        onChange={(value) => handleInputChange('notes', value)}
      />
    </Drawer>
  );
}
