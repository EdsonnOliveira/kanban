import { MoreHorizontal, MessageCircle, Link, Calendar, User } from 'lucide-react';
import { Task } from '../store/useTaskStore';

interface TaskListViewProps {
  tasks: Task[];
  onEdit?: (task: Task) => void;
  onTaskDoubleClick?: (task: Task) => void;
}

export default function TaskListView({ tasks, onEdit, onTaskDoubleClick }: TaskListViewProps) {
  const getPriorityColor = (priority: Task['priority']) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-700';
      case 'medium':
        return 'bg-yellow-100 text-yellow-700';
      case 'low':
        return 'bg-green-100 text-green-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getPriorityLabel = (priority: Task['priority']) => {
    switch (priority) {
      case 'high':
        return 'Alta';
      case 'medium':
        return 'Média';
      case 'low':
        return 'Baixa';
      default:
        return 'Baixa';
    }
  };

  const getStatusColor = (status: Task['status']) => {
    switch (status) {
      case 'todo':
        return 'bg-purple-100 text-purple-700';
      case 'in-progress':
        return 'bg-orange-100 text-orange-700';
      case 'done':
        return 'bg-green-100 text-green-700';
      default:
        return 'bg-gray-100 text-gray-700';
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

  return (
    <div className="h-full overflow-y-auto">
      <div className="space-y-3 p-1">
        {tasks.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            Nenhuma tarefa encontrada
          </div>
        ) : (
          tasks.map((task) => (
          <div
            key={task.id}
            onDoubleClick={() => onTaskDoubleClick?.(task)}
            className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition-shadow duration-200 cursor-pointer"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <div className={`px-2 py-1 rounded-md text-xs font-medium ${getPriorityColor(task.priority)}`}>
                    {getPriorityLabel(task.priority)}
                  </div>
                  <div className={`px-2 py-1 rounded-md text-xs font-medium ${getStatusColor(task.status)}`}>
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
                      <Calendar size={12} />
                      <span>{new Date(task.createdAt).toLocaleDateString('pt-BR')}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <User size={12} />
                      <span>{task.assignedUsers.length} usuário(s)</span>
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
          ))
        )}
      </div>
    </div>
  );
}
