import { Task } from '../store/useTaskStore';
import CardInfo from './CardInfo';

interface TaskListViewProps {
  tasks: Task[];
  onEdit?: (task: Task) => void;
  onTaskDoubleClick?: (task: Task) => void;
}

export default function TaskListView({ tasks, onEdit, onTaskDoubleClick }: TaskListViewProps) {

  return (
    <div className="h-full overflow-y-auto">
      <div className="space-y-3 p-1">
        {tasks.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            Nenhuma tarefa encontrada
          </div>
        ) : (
          tasks.map((task) => (
            <CardInfo
              key={task.id}
              id={task.id}
              title={task.title}
              description={task.description}
              priority={task.priority}
              status={task.status}
              createdAt={task.createdAt}
              assignedUsers={task.assignedUsers}
              comments={task.comments}
              attachments={task.attachments}
              onDoubleClick={() => onTaskDoubleClick?.(task)}
              onEdit={() => onEdit?.(task)}
            />
          ))
        )}
      </div>
    </div>
  );
}
