import { LayoutGrid, List, Table, Clock } from 'lucide-react';
import { useViewStore, ViewType } from '../store/useViewStore';

interface ViewOption {
  id: ViewType;
  label: string;
  icon: any;
}

const viewOptions: ViewOption[] = [
  { id: 'board', label: 'Board', icon: LayoutGrid },
  { id: 'list', label: 'List', icon: List },
  { id: 'table', label: 'Table', icon: Table },
  { id: 'timeline', label: 'Timeline', icon: Clock },
];

export default function ViewSelector() {
  const { currentView, setView } = useViewStore();

  return (
    <div className="flex bg-gray-100 rounded-xl p-1">
      {viewOptions.map((option) => {
        const Icon = option.icon;
        const isActive = currentView === option.id;
        
        return (
          <button
            key={option.id}
            onClick={() => setView(option.id)}
            className={`
              cursor-pointer flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200
              ${isActive 
                ? 'bg-white text-gray-900 shadow-sm' 
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }
            `}
          >
            <Icon size={16} />
            <span className="text-sm font-medium">{option.label}</span>
          </button>
        );
      })}
    </div>
  );
}
