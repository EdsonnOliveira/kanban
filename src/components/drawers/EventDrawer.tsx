import { useState } from 'react';
import { Calendar, Clock, MapPin, Users, ChevronDown, Bell } from 'lucide-react';
import Drawer from '../Drawer';
import Input from '../Input';
import Select from '../Select';
import { useEventDrawerStore, EventFormData } from '../../store/useEventDrawerStore';

export default function EventDrawer() {
  const { isEventDrawerOpen, closeEventDrawer, saveEvent } = useEventDrawerStore();
  
  // Estado local do formulário
  const [formData, setFormData] = useState<EventFormData>({
    eventTitle: '',
    description: '',
    startDate: '',
    endDate: '',
    startTime: '',
    endTime: '',
    location: '',
    attendees: '',
    eventType: 'reuniao',
    priority: 'media',
    reminder: '15',
    notes: ''
  });

  const handleInputChange = (field: keyof EventFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    saveEvent(formData);
    // Resetar formulário após salvar
    setFormData({
      eventTitle: '',
      description: '',
      startDate: '',
      endDate: '',
      startTime: '',
      endTime: '',
      location: '',
      attendees: '',
      eventType: 'reuniao',
      priority: 'media',
      reminder: '15',
      notes: ''
    });
    closeEventDrawer();
  };

  const handleClose = () => {
    closeEventDrawer();
    // Resetar formulário ao fechar
    setFormData({
      eventTitle: '',
      description: '',
      startDate: '',
      endDate: '',
      startTime: '',
      endTime: '',
      location: '',
      attendees: '',
      eventType: 'reuniao',
      priority: 'media',
      reminder: '15',
      notes: ''
    });
  };

  return (
    <Drawer
      isOpen={isEventDrawerOpen}
      onClose={handleClose}
      onSave={handleSave}
      title="Novo Evento"
      width="w-96"
    >
      {/* Título do Evento */}
      <Input
        placeholder="Digite o título do evento"
        size="middle"
        label="Título do Evento"
        leftIcon={Calendar}
        value={formData.eventTitle}
        onChange={(value) => handleInputChange('eventTitle', value)}
      />

      {/* Descrição */}
      <Input
        type="textarea"
        placeholder="Descrição do evento"
        size="middle"
        label="Descrição"
        rows={3}
        value={formData.description}
        onChange={(value) => handleInputChange('description', value)}
      />

      {/* Data de Início e Data de Fim - lado a lado */}
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
          label="Data de Fim"
          rightIcon={Calendar}
          value={formData.endDate}
          onChange={(value) => handleInputChange('endDate', value)}
        />
      </div>

      {/* Hora de Início e Hora de Fim - lado a lado */}
      <div className="grid grid-cols-2 gap-4">
        <Input
          type="text"
          placeholder="HH:MM"
          size="middle"
          label="Hora de Início"
          rightIcon={Clock}
          value={formData.startTime}
          onChange={(value) => handleInputChange('startTime', value)}
        />
        <Input
          type="text"
          placeholder="HH:MM"
          size="middle"
          label="Hora de Fim"
          rightIcon={Clock}
          value={formData.endTime}
          onChange={(value) => handleInputChange('endTime', value)}
        />
      </div>

      {/* Localização */}
      <Input
        placeholder="Local do evento"
        size="middle"
        label="Localização"
        leftIcon={MapPin}
        value={formData.location}
        onChange={(value) => handleInputChange('location', value)}
      />

      {/* Participantes */}
      <Input
        placeholder="Lista de participantes"
        size="middle"
        label="Participantes"
        leftIcon={Users}
        value={formData.attendees}
        onChange={(value) => handleInputChange('attendees', value)}
      />

      {/* Tipo de Evento e Prioridade - lado a lado */}
      <div className="grid grid-cols-2 gap-4">
        <Select
          placeholder="Selecione o tipo"
          size="middle"
          label="Tipo de Evento"
          rightIcon={ChevronDown}
          options={[
            { value: "reuniao", label: "Reunião" },
            { value: "apresentacao", label: "Apresentação" },
            { value: "workshop", label: "Workshop" },
            { value: "treinamento", label: "Treinamento" },
            { value: "evento", label: "Evento" },
            { value: "deadline", label: "Deadline" },
            { value: "outros", label: "Outros" }
          ]}
          value={formData.eventType}
          onChange={(value) => handleInputChange('eventType', value)}
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

      {/* Lembrete */}
      <Select
        placeholder="Selecione o lembrete"
        size="middle"
        label="Lembrete"
        rightIcon={Bell}
        options={[
          { value: "5", label: "5 minutos antes" },
          { value: "15", label: "15 minutos antes" },
          { value: "30", label: "30 minutos antes" },
          { value: "60", label: "1 hora antes" },
          { value: "1440", label: "1 dia antes" },
          { value: "none", label: "Sem lembrete" }
        ]}
        value={formData.reminder}
        onChange={(value) => handleInputChange('reminder', value)}
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
