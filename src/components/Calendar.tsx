import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export interface CalendarEvent {
  id: string;
  title: string;
  startTime: string;
  endTime: string;
  color: string;
  description?: string;
}

interface CalendarProps {
  events?: CalendarEvent[];
  onDateClick?: (date: Date) => void;
  onEventClick?: (event: CalendarEvent) => void;
  className?: string;
}

export default function Calendar({ 
  events = [], 
  onDateClick, 
  onEventClick,
  className = "" 
}: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const monthNames = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];

  const dayNames = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Dias do mês anterior
    const prevMonth = new Date(year, month - 1, 0);
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      days.push({
        date: new Date(year, month - 1, prevMonth.getDate() - i),
        isCurrentMonth: false,
        isToday: false,
        isSelected: false
      });
    }

    // Dias do mês atual
    const today = new Date();
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      days.push({
        date,
        isCurrentMonth: true,
        isToday: date.toDateString() === today.toDateString(),
        isSelected: date.toDateString() === selectedDate.toDateString()
      });
    }

    // Dias do próximo mês para completar a grade
    const remainingDays = 42 - days.length;
    for (let day = 1; day <= remainingDays; day++) {
      days.push({
        date: new Date(year, month + 1, day),
        isCurrentMonth: false,
        isToday: false,
        isSelected: false
      });
    }

    return days;
  };

  const getEventsForDate = (date: Date) => {
    return events.filter(event => {
      const eventDate = new Date(event.startTime);
      return eventDate.toDateString() === date.toDateString();
    });
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    onDateClick?.(date);
  };

  const days = getDaysInMonth(currentDate);

  return (
    <div className={`bg-white rounded-3xl border border-gray-200 shadow-sm ${className}`}>
      {/* Header do Calendário */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl font-bold text-gray-900">
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigateMonth('prev')}
              className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center transition-colors"
            >
              <ChevronLeft size={20} className="text-gray-600" />
            </button>
            <button
              onClick={() => navigateMonth('next')}
              className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center transition-colors"
            >
              <ChevronRight size={20} className="text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Dias da semana */}
      <div className="grid grid-cols-7 border-b border-gray-200">
        {dayNames.map(day => (
          <div key={day} className="p-4 text-center text-sm font-medium text-gray-500 bg-gray-50">
            {day}
          </div>
        ))}
      </div>

      {/* Grade do calendário */}
      <div className="grid grid-cols-7">
        {days.map((day, index) => {
          const dayEvents = getEventsForDate(day.date);
          
          return (
            <div
              key={index}
              onClick={() => handleDateClick(day.date)}
              className={`min-h-[120px] p-2 border-r border-b border-gray-200 cursor-pointer transition-colors ${
                day.isCurrentMonth 
                  ? 'bg-white hover:bg-gray-50' 
                  : 'bg-gray-50 text-gray-400'
              } ${
                day.isToday 
                  ? 'bg-blue-50 border-blue-200' 
                  : ''
              } ${
                day.isSelected 
                  ? 'bg-blue-100 border-blue-300' 
                  : ''
              }`}
            >
              <div className="flex flex-col h-full">
                {/* Número do dia */}
                <div className={`text-sm font-medium mb-1 ${
                  day.isToday 
                    ? 'text-blue-600' 
                    : day.isCurrentMonth 
                      ? 'text-gray-900' 
                      : 'text-gray-400'
                }`}>
                  {day.date.getDate()}
                </div>

                {/* Eventos do dia */}
                <div className="flex-1 space-y-1">
                  {dayEvents.slice(0, 3).map(event => (
                    <div
                      key={event.id}
                      onClick={(e) => {
                        e.stopPropagation();
                        onEventClick?.(event);
                      }}
                      className={`text-xs p-1 rounded truncate cursor-pointer ${
                        event.color === 'blue' ? 'bg-blue-100 text-blue-800' :
                        event.color === 'green' ? 'bg-green-100 text-green-800' :
                        event.color === 'red' ? 'bg-red-100 text-red-800' :
                        event.color === 'yellow' ? 'bg-yellow-100 text-yellow-800' :
                        event.color === 'purple' ? 'bg-purple-100 text-purple-800' :
                        'bg-gray-100 text-gray-800'
                      }`}
                      title={event.title}
                    >
                      {event.startTime.split(' ')[1]?.substring(0, 5)} {event.title}
                    </div>
                  ))}
                  {dayEvents.length > 3 && (
                    <div className="text-xs text-gray-500">
                      +{dayEvents.length - 3} mais
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
