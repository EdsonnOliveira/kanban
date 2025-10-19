import Container from '../components/Container';
import KanbanColumn from '../components/KanbanColumn';
import ViewSelector from '../components/ViewSelector';
import TaskListView from '../components/TaskListView';
import TaskTableView from '../components/TaskTableView';
import TaskTimelineView from '../components/TaskTimelineView';
import TaskView from '../components/TaskView';
import AddColumnDrawer from '../components/AddColumnDrawer';
import { CheckSquare, Plus } from 'lucide-react';
import { useTaskStore, Task } from '../store/useTaskStore';
import { useViewStore } from '../store/useViewStore';
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent } from '@dnd-kit/core';
import { useState } from 'react';

export default function Tarefas() {
  const { getTasksByStatus, addTask, deleteTask, moveTask, tasks } = useTaskStore();
  const { currentView } = useViewStore();
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isTaskViewOpen, setIsTaskViewOpen] = useState(false);
  const [isAddColumnDrawerOpen, setIsAddColumnDrawerOpen] = useState(false);

  const todoTasks = getTasksByStatus('todo');
  const inProgressTasks = getTasksByStatus('in-progress');
  const doneTasks = getTasksByStatus('done');

  const handleAddTask = () => {
    const newTask = {
      title: 'Nova Tarefa',
      description: 'Descrição da nova tarefa',
      priority: 'medium' as const,
      assignedUsers: ['user1'],
    };
    addTask(newTask);
  };

  const handleEditTask = (task: Task) => {
    // Implementar modal de edição
    console.log('Editar tarefa:', task);
  };

  const handleDeleteTask = (taskId: string) => {
    deleteTask(taskId);
  };

  const handleTaskDoubleClick = (task: Task) => {
    setSelectedTask(task);
    setIsTaskViewOpen(true);
  };

  const handleCloseTaskView = () => {
    setIsTaskViewOpen(false);
    setSelectedTask(null);
  };

  const handleAddColumn = () => {
    setIsAddColumnDrawerOpen(true);
  };

  const handleSaveColumn = (data: { name: string; color: string }) => {
    console.log('Nova coluna:', data);
    // TODO: Implementar lógica para salvar nova coluna
    setIsAddColumnDrawerOpen(false);
  };

  const handleViewTask = (task: Task) => {
    setSelectedTask(task);
    setIsTaskViewOpen(true);
  };

  const handleCopyTaskUrl = (task: Task) => {
    const url = `${window.location.origin}/tarefas?task=${task.id}`;
    navigator.clipboard.writeText(url);
    console.log('URL copiada:', url);
    // TODO: Adicionar toast de sucesso
  };

  const handleColumnView = (status: string) => {
    console.log('Ver coluna:', status);
    // TODO: Implementar visualização da coluna
  };

  const handleColumnDelete = (status: string) => {
    console.log('Excluir coluna:', status);
    // TODO: Implementar exclusão da coluna
  };

  const handleColumnMoveRight = (status: string) => {
    console.log('Mover coluna para direita:', status);
    // TODO: Implementar movimentação da coluna
  };

  const handleColumnMoveLeft = (status: string) => {
    console.log('Mover coluna para esquerda:', status);
    // TODO: Implementar movimentação da coluna
  };

  const handleDragStart = (event: DragStartEvent) => {
    setActiveTask(event.active.data.current?.task);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (over && active.id !== over.id) {
      const taskId = active.id as string;
      const newStatus = over.id as 'todo' | 'in-progress' | 'done';
      moveTask(taskId, newStatus);
    }
    
    setActiveTask(null);
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'board':
        return (
          <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
            <div className="flex gap-6 h-full overflow-x-auto pb-4">
              <KanbanColumn
                title="A fazer"
                status="todo"
                tasks={todoTasks}
                color="#8B5CF6"
                onAddTask={handleAddTask}
                onEditTask={handleEditTask}
                onDeleteTask={handleDeleteTask}
                onMoveTask={moveTask}
                onTaskDoubleClick={handleTaskDoubleClick}
                onTaskView={handleViewTask}
                onTaskCopyUrl={handleCopyTaskUrl}
                onColumnView={handleColumnView}
                onColumnDelete={handleColumnDelete}
                onColumnMoveRight={handleColumnMoveRight}
                onColumnMoveLeft={handleColumnMoveLeft}
                canMoveLeft={false}
              />
              <KanbanColumn
                title="Em andamento"
                status="in-progress"
                tasks={inProgressTasks}
                color="#F59E0B"
                onAddTask={handleAddTask}
                onEditTask={handleEditTask}
                onDeleteTask={handleDeleteTask}
                onMoveTask={moveTask}
                onTaskDoubleClick={handleTaskDoubleClick}
                onTaskView={handleViewTask}
                onTaskCopyUrl={handleCopyTaskUrl}
                onColumnView={handleColumnView}
                onColumnDelete={handleColumnDelete}
                onColumnMoveRight={handleColumnMoveRight}
                onColumnMoveLeft={handleColumnMoveLeft}
              />
              <KanbanColumn
                title="Concluído"
                status="done"
                tasks={doneTasks}
                color="#10B981"
                onAddTask={handleAddTask}
                onEditTask={handleEditTask}
                onDeleteTask={handleDeleteTask}
                onMoveTask={moveTask}
                onTaskDoubleClick={handleTaskDoubleClick}
                onTaskView={handleViewTask}
                onTaskCopyUrl={handleCopyTaskUrl}
                onColumnView={handleColumnView}
                onColumnDelete={handleColumnDelete}
                onColumnMoveRight={handleColumnMoveRight}
                onColumnMoveLeft={handleColumnMoveLeft}
                canMoveRight={false}
              />
              
              {/* Botão para adicionar nova coluna */}
              <button
                onClick={handleAddColumn}
                className="cursor-pointer flex-shrink-0 w-20 h-fit bg-gray-200 hover:bg-gray-300 text-white rounded-xl p-4 flex items-center justify-center transition-colors duration-200 group"
              >
                <Plus size={20} className="text-gray-400" />
              </button>
            </div>
            <DragOverlay>
              {activeTask ? (
                <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-lg opacity-90">
                  <div className="font-semibold text-gray-900 mb-2">
                    {activeTask.title}
                  </div>
                  <div className="text-sm text-gray-500">
                    {activeTask.description}
                  </div>
                </div>
              ) : null}
            </DragOverlay>
          </DndContext>
        );
      case 'list':
        return (
          <TaskListView
            tasks={tasks}
            onEdit={handleEditTask}
            onTaskDoubleClick={handleTaskDoubleClick}
          />
        );
      case 'table':
        return (
          <TaskTableView
            tasks={tasks}
            onEdit={handleEditTask}
            onTaskDoubleClick={handleTaskDoubleClick}
          />
        );
      case 'timeline':
        return (
          <TaskTimelineView
            tasks={tasks}
            onEdit={handleEditTask}
            onTaskDoubleClick={handleTaskDoubleClick}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full h-full flex gap-4">
      <Container
        hiddeBanner
        icon={CheckSquare}
        title=""
        description=""
      >
        <div className="flex flex-col h-full">
          {/* Header com seletor de visualização */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Tarefas</h1>
              <p className="text-sm text-gray-500 mt-1">
                {tasks.length} tarefa(s) no total
              </p>
            </div>
            <ViewSelector />
          </div>

          {/* Conteúdo da visualização atual */}
          <div className="flex-1 overflow-hidden">
            {renderCurrentView()}
          </div>
        </div>
      </Container>

      {/* Modal de visualização da tarefa */}
      <TaskView
        isOpen={isTaskViewOpen}
        onClose={handleCloseTaskView}
        task={selectedTask}
      />

      {/* Drawer para adicionar nova coluna */}
      <AddColumnDrawer
        isOpen={isAddColumnDrawerOpen}
        onClose={() => setIsAddColumnDrawerOpen(false)}
        onSave={handleSaveColumn}
      />
    </div>
  );
}
