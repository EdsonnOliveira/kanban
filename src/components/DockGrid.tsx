import { useState } from 'react';
import DockFile, { DockItem } from './DockFile';
import { Download, Share, Trash2 } from 'lucide-react';

export type { DockItem };

interface DockGridProps {
  items: DockItem[];
  onItemClick?: (itemId: string) => void;
  onItemDoubleClick?: (itemId: string) => void;
  onAction?: (action: string, itemId: string) => void;
  showSelection?: boolean;
  className?: string;
}

export default function DockGrid({ 
  items, 
  onItemClick, 
  onItemDoubleClick, 
  onAction,
  showSelection = true,
  className = ""
}: DockGridProps) {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const handleItemSelect = (itemId: string, event: React.MouseEvent) => {
    event.stopPropagation();
    setSelectedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const handleAction = (action: string, itemId: string) => {
    onAction?.(action, itemId);
  };

  return (
    <div className={`flex flex-col gap-6 ${className}`}>
      {/* Grid de Itens */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {items.map((item) => (
          <DockFile
            key={item.id}
            item={item}
            onItemClick={onItemClick}
            onItemDoubleClick={onItemDoubleClick}
            onAction={handleAction}
            showSelection={showSelection}
            isSelected={selectedItems.includes(item.id)}
            onSelect={handleItemSelect}
          />
        ))}
      </div>

      {/* Ações em lote (quando itens estão selecionados) */}
      {showSelection && selectedItems.length > 0 && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-white rounded-2xl shadow-lg border border-gray-200 p-4 flex items-center gap-4">
          <span className="text-sm text-gray-600">
            {selectedItems.length} item(s) selecionado(s)
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleAction('download', selectedItems.join(','))}
              className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center transition-colors"
              title="Download"
            >
              <Download size={16} className="text-gray-600" />
            </button>
            <button
              onClick={() => handleAction('share', selectedItems.join(','))}
              className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center transition-colors"
              title="Compartilhar"
            >
              <Share size={16} className="text-gray-600" />
            </button>
            <button
              onClick={() => handleAction('delete', selectedItems.join(','))}
              className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center transition-colors"
              title="Excluir"
            >
              <Trash2 size={16} className="text-red-600" />
            </button>
          </div>
          <button
            onClick={() => setSelectedItems([])}
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            Cancelar
          </button>
        </div>
      )}
    </div>
  );
}
