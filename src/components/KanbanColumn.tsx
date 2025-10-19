import { Plus, MoreHorizontal } from 'lucide-react';
import { useDroppable } from '@dnd-kit/core';
import { useState, useRef } from 'react';
import { Task } from '../store/useTaskStore';
import TaskCard from './TaskCard';
import KanbanColumnPopover from './KanbanColumnPopover';

interface KanbanColumnProps {
  title: string;
  status: Task['status'];
  tasks: Task[];
  color: string;
  onAddTask?: (status: Task['status']) => void;
  onEditTask?: (task: Task) => void;
  onDeleteTask?: (taskId: string) => void;
  onMoveTask?: (taskId: string, newStatus: Task['status']) => void;
  onTaskDoubleClick?: (task: Task) => void;
  onTaskView?: (task: Task) => void;
  onTaskCopyUrl?: (task: Task) => void;
  onColumnView?: (status: Task['status']) => void;
  onColumnDelete?: (status: Task['status']) => void;
  onColumnMoveRight?: (status: Task['status']) => void;
  onColumnMoveLeft?: (status: Task['status']) => void;
  canMoveRight?: boolean;
  canMoveLeft?: boolean;
}

export default function KanbanColumn({ 
  title, 
  status, 
  tasks, 
  color,
  onAddTask,
  onDeleteTask,
  onTaskDoubleClick,
  onTaskView,
  onTaskCopyUrl,
  onColumnView,
  onColumnDelete,
  onColumnMoveRight,
  onColumnMoveLeft,
  canMoveRight = true,
  canMoveLeft = true
}: KanbanColumnProps) {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  
  const { isOver, setNodeRef } = useDroppable({
    id: status,
  });
  return (
    <div 
      ref={setNodeRef}
      className={`flex flex-col w-80 bg-gray-50 rounded-xl p-4 transition-colors duration-200 ${
        isOver ? 'bg-blue-50 border-2 border-blue-200 border-dashed' : ''
      }`}
    >
      {/* Header da coluna */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div 
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: color }}
          />
          <h2 className="font-semibold text-gray-900">{title}</h2>
          <span className="text-sm text-gray-500 bg-gray-200 px-2 py-1 rounded-full">
            {tasks.length}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => onAddTask?.(status)}
            className="p-1 hover:bg-gray-200 rounded-md transition-colors duration-200"
          >
            <Plus size={16} className="text-gray-400" />
          </button>
          <button 
            ref={menuButtonRef}
            className="p-1 hover:bg-gray-200 rounded-md transition-colors duration-200"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              setIsPopoverOpen(!isPopoverOpen);
            }}
            onMouseDown={(e) => {
              e.stopPropagation();
              e.preventDefault();
            }}
          >
            <MoreHorizontal size={16} className="text-gray-400" />
          </button>
        </div>
      </div>

      {/* Lista de tarefas */}
      <div className="flex flex-col gap-3 flex-1">
        {tasks.length === 0 ? (
          <div className="flex-1 flex items-center justify-center text-gray-400 text-sm">
            Nenhuma tarefa
          </div>
        ) : (
          tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onDelete={onDeleteTask}
              onDoubleClick={onTaskDoubleClick}
              onView={onTaskView}
              onCopyUrl={onTaskCopyUrl}
            />
          ))
        )}
      </div>

      {/* Popover do menu da coluna */}
      <KanbanColumnPopover
        isOpen={isPopoverOpen}
        onClose={() => setIsPopoverOpen(false)}
        onView={() => onColumnView?.(status)}
        onDelete={() => onColumnDelete?.(status)}
        onMoveRight={() => onColumnMoveRight?.(status)}
        onMoveLeft={() => onColumnMoveLeft?.(status)}
        canMoveRight={canMoveRight}
        canMoveLeft={canMoveLeft}
        triggerRef={menuButtonRef}
      />
    </div>
  );
}
