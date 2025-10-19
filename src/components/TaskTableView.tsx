import { MoreHorizontal, MessageCircle, Link } from 'lucide-react';
import { Task } from '../store/useTaskStore';
import Table, { TableColumn } from './Table';

interface TaskTableViewProps {
  tasks: Task[];
  onEdit?: (task: Task) => void;
  onTaskDoubleClick?: (task: Task) => void;
}

export default function TaskTableView({ tasks, onEdit, onTaskDoubleClick }: TaskTableViewProps) {
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

  const getStatusColor = (status: Task['status']) => {
    switch (status) {
      case 'todo':
        return 'bg-gray-100 text-gray-700';
      case 'in-progress':
        return 'bg-blue-100 text-blue-700';
      case 'done':
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
        return 'Média';
    }
  };

  const getStatusLabel = (status: Task['status']) => {
    switch (status) {
      case 'todo':
        return 'A fazer';
      case 'in-progress':
        return 'Andamento';
      case 'done':
        return 'Concluído';
      default:
        return 'A fazer';
    }
  };

  const columns: TableColumn<Task>[] = [
    {
      key: 'title',
      title: 'Tarefa',
      render: (_, task) => (
        <div>
          <div className="text-sm font-medium text-gray-900 mb-1">
            {task.title}
          </div>
          <div className="text-sm text-gray-500 line-clamp-2">
            {task.description}
          </div>
        </div>
      )
    },
    {
      key: 'status',
      title: 'Status',
      render: (_, task) => (
        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-md ${getStatusColor(task.status)}`}>
          {getStatusLabel(task.status)}
        </span>
      )
    },
    {
      key: 'priority',
      title: 'Prioridade',
      render: (_, task) => (
        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-md ${getPriorityColor(task.priority)}`}>
          {getPriorityLabel(task.priority)}
        </span>
      )
    },
    {
      key: 'assignedUsers',
      title: 'Usuários',
      render: (_, task) => (
        <div className="flex -space-x-2">
          {task.assignedUsers.slice(0, 3).map((userId) => (
            <div
              key={userId}
              className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 border-2 border-white flex items-center justify-center text-xs font-medium text-white"
            >
              {userId.charAt(0).toUpperCase()}
            </div>
          ))}
          {task.assignedUsers.length > 3 && (
            <div className="w-6 h-6 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-xs font-medium text-gray-600">
              +{task.assignedUsers.length - 3}
            </div>
          )}
        </div>
      )
    },
    {
      key: 'createdAt',
      title: 'Data',
      render: (_, task) => (
        <span className="text-sm text-gray-500">
          {new Date(task.createdAt).toLocaleDateString('pt-BR')}
        </span>
      )
    },
    {
      key: 'actions',
      title: 'Ações',
      render: (_, task) => (
        <div className="flex items-center gap-2">
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
      )
    }
  ];

  return (
    <Table
      data={tasks}
      columns={columns}
      onRowDoubleClick={(task) => onTaskDoubleClick?.(task)}
      emptyMessage="Nenhuma tarefa encontrada"
    />
  );
}