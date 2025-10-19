import { XIcon, CheckCircle, Play, Plus, AtSign, Pin, Paperclip, Bell, Send, Search, Filter, Brain } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Task } from '../store/useTaskStore';

interface TaskViewProps {
  isOpen: boolean;
  onClose: () => void;
  task: Task | null;
}

export default function TaskView({ isOpen, onClose, task }: TaskViewProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      setTimeout(() => setIsVisible(true), 10);
    } else {
      setIsVisible(false);
      setTimeout(() => setShouldRender(false), 300);
    }
  }, [isOpen]);

  if (!shouldRender || !task) return null;

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

  const getPriorityLabel = (priority: Task['priority']) => {
    switch (priority) {
      case 'high':
        return 'ALTA';
      case 'medium':
        return 'MÉDIA';
      case 'low':
        return 'BAIXA';
      default:
        return 'BAIXA';
    }
  };

  const getStatusLabel = (status: Task['status']) => {
    switch (status) {
      case 'todo':
        return 'BACKLOG';
      case 'in-progress':
        return 'DOING';
      case 'done':
        return 'DONE';
      default:
        return 'BACKLOG';
    }
  };

  const getStatusColor = (status: Task['status']) => {
    switch (status) {
      case 'todo':
        return 'bg-blue-500';
      case 'in-progress':
        return 'bg-purple-500';
      case 'done':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`
          fixed inset-0 bg-black z-40
          transition-opacity duration-300 ease-in-out
          ${isVisible ? 'opacity-50' : 'opacity-0'}
        `}
        onClick={onClose}
      />
      
      {/* Modal */}
      <div 
        className={`
          fixed inset-0 z-50 flex items-center justify-center p-4
          transition-all duration-300 ease-in-out
          ${isVisible ? 'opacity-100' : 'opacity-0'}
        `}
        onClick={onClose}
      >
        <div 
          className={`
            w-full max-w-7xl max-h-[95vh] overflow-hidden
            bg-white rounded-2xl border border-gray-200 shadow-2xl
            transform transition-all duration-300 ease-in-out
            ${isVisible 
              ? 'scale-100 translate-y-0' 
              : 'scale-95 translate-y-4'
            }
          `}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <div className="flex items-center gap-4 text-gray-600">
              <span className="text-sm">Shared with me</span>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-gray-300 rounded"></div>
                <span className="text-sm">List</span>
              </div>
              <div className="w-6 h-6 bg-gray-300 rounded text-xs flex items-center justify-center text-gray-600">G</div>
            </div>
            <div className="flex items-center gap-4 text-gray-600">
              <span className="text-sm">Created on {new Date(task.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
              <button className="px-3 py-1 bg-purple-600 text-white text-sm rounded hover:bg-purple-700">Ask AI</button>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-gray-300 rounded"></div>
                <div className="w-3 h-3 bg-gray-300 rounded"></div>
                <XIcon size={16} className="cursor-pointer hover:text-gray-600" onClick={onClose} />
              </div>
            </div>
          </div>

          <div className="flex h-[calc(95vh-80px)]">
            {/* Main Content */}
            <div className="flex-1 p-6 overflow-y-auto">
              <div className="space-y-6">
                {/* Task Header */}
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-sm text-gray-500">Task</span>
                  <div className="px-2 py-1 bg-purple-600 text-white text-xs rounded">
                    {task.id.slice(0, 8)}
                  </div>
                  <button className="px-3 py-1 bg-purple-600 text-white text-sm rounded hover:bg-purple-700">Ask AI</button>
                </div>

                {/* Task Title */}
                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                  {task.title}
                </h1>

                {/* AI Suggestion */}
                <div className="flex items-center gap-2 text-gray-500 text-sm mb-6">
                  <Brain size={16} />
                  <span>Ask Brain to create a summary, generate subtasks or find similar tasks</span>
                </div>

                {/* Task Properties */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="text-gray-500 text-sm w-24">Status:</span>
                    <div className="flex items-center gap-2">
                      <div className={`px-3 py-1 ${getStatusColor(task.status)} text-white text-sm rounded-full flex items-center gap-2`}>
                        {getStatusLabel(task.status)}
                        <CheckCircle size={14} />
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-gray-500 text-sm w-24">Assignees:</span>
                    <div className="flex items-center gap-2">
                      {task.assignedUsers.slice(0, 2).map((userId) => (
                        <div key={userId} className="px-3 py-1 bg-purple-600 text-white text-sm rounded-full">
                          {userId.slice(0, 2).toUpperCase()}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-gray-500 text-sm w-24">Dates:</span>
                    <span className="text-gray-500 text-sm">Start → Due</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-gray-500 text-sm w-24">Priority:</span>
                    <div className={`px-3 py-1 ${getPriorityColor(task.priority)} text-white text-sm rounded-full`}>
                      {getPriorityLabel(task.priority)}
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-gray-500 text-sm w-24">Time Estimate:</span>
                    <span className="text-gray-500 text-sm">Empty</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-gray-500 text-sm w-24">Sprint Points:</span>
                    <span className="text-gray-500 text-sm">Empty</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-gray-500 text-sm w-24">Track Time:</span>
                    <div className="flex items-center gap-2">
                      <Play size={16} className="text-gray-500" />
                      <span className="text-gray-500 text-sm">Add time</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-gray-500 text-sm w-24">Tags:</span>
                    <div className="flex items-center gap-2">
                      <div className="px-3 py-1 bg-blue-600 text-white text-sm rounded-full">dev externo</div>
                      <div className="px-3 py-1 bg-blue-600 text-white text-sm rounded-full">frontend</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-gray-500 text-sm w-24">Relationships:</span>
                    <span className="text-gray-500 text-sm">Empty</span>
                  </div>
                </div>

                {/* Description Section */}
                <div className="mt-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Notion</h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-4 h-4 border border-gray-400 rounded mt-1"></div>
                      <span className="text-gray-700 text-sm">
                        Criar elasticidade na largura do menu em Filtros: todos os inputs com a mesma largura que acompanha a total da tabela ⭐
                      </span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle size={16} className="text-green-500 mt-1" />
                      <span className="text-gray-500 text-sm line-through">
                        Remover sombra dos inputs (todos)
                      </span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-4 h-4 border border-gray-400 rounded mt-1"></div>
                      <span className="text-gray-700 text-sm">
                        Atualizar design do [componente Dropdown] (Design File Figma File)
                      </span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-4 h-4 border border-gray-400 rounded mt-1"></div>
                      <span className="text-gray-700 text-sm">
                        Incluir o status hover nos itens dos dropdowns pós clique em actions na tabela
                      </span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle size={16} className="text-green-500 mt-1" />
                      <span className="text-gray-500 text-sm line-through">
                        Padronizar opacidade do background em abertura de drawers e modais para como estava antes—está certa no fluxo de Meu Perfil (é 25%?)
                      </span>
                    </div>
                  </div>
                  <button className="mt-4 text-blue-600 text-sm hover:text-blue-700">Show more</button>
                </div>

                {/* Tabs */}
                <div className="flex gap-6 border-b border-gray-200">
                  <button className="pb-2 text-gray-900 border-b-2 border-gray-900">Details</button>
                  <button className="pb-2 text-gray-500 hover:text-gray-900">Subtasks</button>
                  <button className="pb-2 text-gray-500 hover:text-gray-900">Action Items</button>
                </div>

                {/* Custom Fields */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Custom Fields</h3>
                  <div className="flex items-center gap-3">
                    <span className="text-gray-500 text-sm">Dias em aberto</span>
                    <span className="text-gray-900 text-sm">2</span>
                  </div>
                </div>

                {/* Attachments */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Attachments</h3>
                </div>
              </div>
            </div>

            {/* Activity Sidebar */}
            <div className="w-80 border-l border-gray-200 p-4 bg-gray-50">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-gray-900 font-semibold">Activity</h3>
                <div className="flex items-center gap-2">
                  <Search size={16} className="text-gray-500" />
                  <span className="text-gray-500 text-sm">2</span>
                  <Filter size={16} className="text-gray-500" />
                </div>
              </div>

              <div className="space-y-4">
                <div className="text-sm text-gray-700">
                  <span>You changed status from </span>
                  <div className="inline-flex items-center gap-1">
                    <div className="w-3 h-3 bg-blue-500 rounded"></div>
                    <span className="text-blue-600">Backlog</span>
                  </div>
                  <span> Yesterday at 8:57 am to </span>
                  <div className="inline-flex items-center gap-1">
                    <div className="w-3 h-3 bg-purple-500 rounded"></div>
                    <span className="text-purple-600">Doing</span>
                  </div>
                </div>
              </div>

              {/* Comment Input */}
              <div className="mt-8">
                <div className="flex items-center gap-2 p-3 bg-white rounded-lg border border-gray-300">
                  <input 
                    type="text" 
                    placeholder="Write a comment..." 
                    className="flex-1 bg-transparent text-gray-900 placeholder-gray-500 text-sm outline-none"
                  />
                  <div className="flex items-center gap-2">
                    <Plus size={16} className="text-gray-500 cursor-pointer hover:text-gray-700" />
                    <div className="w-4 h-4 bg-gray-300 rounded cursor-pointer"></div>
                    <AtSign size={16} className="text-gray-500 cursor-pointer hover:text-gray-700" />
                    <Pin size={16} className="text-gray-500 cursor-pointer hover:text-gray-700" />
                    <Paperclip size={16} className="text-gray-500 cursor-pointer hover:text-gray-700" />
                    <Bell size={16} className="text-gray-500 cursor-pointer hover:text-gray-700" />
                    <span className="text-gray-500 text-xs">01</span>
                    <Send size={16} className="text-gray-500 cursor-pointer hover:text-gray-700" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
