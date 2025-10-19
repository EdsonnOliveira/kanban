import { MoreHorizontal, MessageCircle, Link, Calendar, User } from 'lucide-react';
import { Task } from '../store/useTaskStore';

interface TaskTimelineViewProps {
  tasks: Task[];
  onEdit?: (task: Task) => void;
  onDelete?: (taskId: string) => void;
  onTaskDoubleClick?: (task: Task) => void;
}

export default function TaskTimelineView({ tasks, onEdit, onDelete, onTaskDoubleClick }: TaskTimelineViewProps) {
  const getPriorityColor = (priority: Task['priority']) => {
    switch (priority) {
      case 'high':
        return 'bg-red-500';
      case 'medium':
        return 'bg-yellow-500';
      case 'low':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getStatusColor = (status: Task['status']) => {
    switch (status) {
      case 'todo':
        return 'bg-purple-500';
      case 'in-progress':
        return 'bg-orange-500';
      case 'done':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getStatusLabel = (status: Task['status']) => {
    switch (status) {
      case 'todo':
        return 'A fazer';
      case 'in-progress':
        return 'Em andamento';
      case 'done':
        return 'Concluído';
      default:
        return 'A fazer';
    }
  };

  // Agrupar tarefas por data de criação
  const groupedTasks = tasks.reduce((acc, task) => {
    const date = new Date(task.createdAt).toLocaleDateString('pt-BR');
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(task);
    return acc;
  }, {} as Record<string, Task[]>);

  // Ordenar as datas
  const sortedDates = Object.keys(groupedTasks).sort((a, b) => {
    return new Date(a.split('/').reverse().join('-')).getTime() - new Date(b.split('/').reverse().join('-')).getTime();
  });

  return (
    <div className="h-full overflow-y-auto">
      <div className="space-y-8 p-1 relative">
        {/* Linha do tempo contínua */}
        <div className="absolute left-[19px] top-0 bottom-0 w-0.5 bg-gray-200 z-0"></div>
        {tasks.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            Nenhuma tarefa encontrada
          </div>
        ) : (
          sortedDates.map((date) => (
          <div key={date} className="relative">
            {/* Data */}
            <div className="flex items-center mb-6">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white border-2 border-gray-200 rounded-full flex items-center justify-center relative z-10">
                  <Calendar size={14} className="text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">{date}</h3>
              </div>
            </div>

            {/* Tarefas do dia */}
            <div className="ml-12 space-y-4">
              {groupedTasks[date].map((task, index) => (
                <div
                  key={task.id}
                  onDoubleClick={() => onTaskDoubleClick?.(task)}
                  className="relative bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition-shadow duration-200 cursor-pointer"
                >
                  {/* Ponto na linha do tempo */}
                  <div className="absolute left-[-40px] top-6 w-4 h-4 bg-white border-2 border-gray-200 rounded-full flex items-center justify-center z-10">
                    <div className={`w-2 h-2 rounded-full ${getStatusColor(task.status)}`}></div>
                  </div>

                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <div className={`px-2 py-1 rounded-md text-xs font-medium ${getPriorityColor(task.priority)} text-white`}>
                          {task.priority.toUpperCase()}
                        </div>
                        <div className={`px-2 py-1 rounded-md text-xs font-medium ${getStatusColor(task.status)} text-white`}>
                          {getStatusLabel(task.status)}
                        </div>
                      </div>
                      
                      <h3 className="font-semibold text-gray-900 mb-2">
                        {task.title}
                      </h3>
                      
                      <p className="text-sm text-gray-500 mb-4">
                        {task.description}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-xs text-gray-400">
                          <div className="flex items-center gap-1">
                            <User size={12} />
                            <span>{task.assignedUsers.length} usuário(s)</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar size={12} />
                            <span>{new Date(task.createdAt).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3">
                          {task.comments > 0 && (
                            <div className="flex items-center gap-1 text-xs text-gray-400">
                              <MessageCircle size={12} />
                              <span>{task.comments}</span>
                            </div>
                          )}
                          {task.attachments > 0 && (
                            <div className="flex items-center gap-1 text-xs text-gray-400">
                              <Link size={12} />
                              <span>{task.attachments}</span>
                            </div>
                          )}
                          <button 
                            className="p-1 hover:bg-gray-100 rounded-md transition-colors duration-200"
                            onClick={() => onEdit?.(task)}
                          >
                            <MoreHorizontal size={16} className="text-gray-400" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          ))
        )}
      </div>
    </div>
  );
}
