import Container from '../components/Container';
import { Calendar as CalendarIcon } from 'lucide-react';
import Calendar, { CalendarEvent } from '../components/Calendar';

// Dados de exemplo dos eventos
const sampleEvents = [
  {
    id: '1',
    title: 'Reunião de Planejamento',
    startTime: '2024-01-15 09:00',
    endTime: '2024-01-15 10:30',
    color: 'blue',
    description: 'Reunião semanal de planejamento da equipe'
  },
  {
    id: '2',
    title: 'Apresentação Cliente',
    startTime: '2024-01-15 14:00',
    endTime: '2024-01-15 15:30',
    color: 'green',
    description: 'Apresentação do projeto para o cliente'
  },
  {
    id: '3',
    title: 'Entrega de Relatório',
    startTime: '2024-01-16 10:00',
    endTime: '2024-01-16 11:00',
    color: 'red',
    description: 'Entrega do relatório mensal'
  },
  {
    id: '4',
    title: 'Workshop de Design',
    startTime: '2024-01-17 09:00',
    endTime: '2024-01-17 17:00',
    color: 'purple',
    description: 'Workshop de design thinking'
  },
  {
    id: '5',
    title: 'Revisão de Código',
    startTime: '2024-01-18 15:00',
    endTime: '2024-01-18 16:00',
    color: 'yellow',
    description: 'Revisão de código do sprint atual'
  },
  {
    id: '6',
    title: 'Demo do Produto',
    startTime: '2024-01-19 11:00',
    endTime: '2024-01-19 12:00',
    color: 'blue',
    description: 'Demonstração do produto para stakeholders'
  }
];

export default function AtividadesCronograma() {
  const handleDateClick = (date: Date) => {
    console.log('Data clicada:', date);
    // Aqui você pode implementar a lógica para mostrar eventos do dia
  };

  const handleEventClick = (event: CalendarEvent) => {
    console.log('Evento clicado:', event);
    // Aqui você pode implementar a lógica para mostrar detalhes do evento
  };

  return (
    <div className="w-full h-full flex gap-4">
      <Container
        icon={CalendarIcon}
        title="Cronograma de Atividades"
        description="Visualize e gerencie suas atividades em um calendário completo."
      >
        <div className="flex flex-col gap-6">
          {/* Calendário Principal */}
          <Calendar
            events={sampleEvents}
            onDateClick={handleDateClick}
            onEventClick={handleEventClick}
            className="w-full"
          />
        </div>
      </Container>
    </div>
  );
}
