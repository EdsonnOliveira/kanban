import { Grid3X3, List } from 'lucide-react';

interface ViewToggleProps {
  currentView: 'grid' | 'list';
  onViewChange: (view: 'grid' | 'list') => void;
  className?: string;
}

export default function ViewToggle({ currentView, onViewChange, className = "" }: ViewToggleProps) {
  return (
    <div className={`flex items-center bg-gray-100 rounded-lg p-1 ${className}`}>
      <button
        onClick={() => onViewChange('grid')}
        className={`flex items-center gap-2 px-3 py-2 rounded-md transition-colors ${
          currentView === 'grid'
            ? 'bg-white text-gray-900 shadow-sm'
            : 'text-gray-600 hover:text-gray-900'
        }`}
      >
        <Grid3X3 size={16} />
        <span className="text-sm font-medium">Grid</span>
      </button>
      <button
        onClick={() => onViewChange('list')}
        className={`flex items-center gap-2 px-3 py-2 rounded-md transition-colors ${
          currentView === 'list'
            ? 'bg-white text-gray-900 shadow-sm'
            : 'text-gray-600 hover:text-gray-900'
        }`}
      >
        <List size={16} />
        <span className="text-sm font-medium">Lista</span>
      </button>
    </div>
  );
}
