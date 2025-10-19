import { LucideIcon, MoreHorizontal } from 'lucide-react';
import { useNavigationStore } from '@/store/useNavigationStore';

interface OptionProps {
  icon: LucideIcon;
  text: string;
  showMoreHorizontal?: boolean;
  className?: string;
  page?: string;
}

export default function Option({ 
  icon: Icon, 
  text, 
  showMoreHorizontal, 
  className = "",
  page
}: OptionProps) {
  const { currentPage, setCurrentPage } = useNavigationStore();
  
  const handleClick = () => {
    if (page) {
      setCurrentPage(page);
    }
  };
  const isCurrentlySelected = page && currentPage === page;

  if (isCurrentlySelected) {
    return (
      <div 
        className={`cursor-pointer relative p-3 rounded-xl bg-gradient-to-r from-blue-500 via-teal-400 to-yellow-400 text-white ${className}`}
        onClick={handleClick}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Icon size={16} className="text-white" />
            <span className="font-medium text-sm">{text}</span>
          </div>
          {showMoreHorizontal && (
            <MoreHorizontal size={16} className="text-white/70" />
          )}
        </div>
      </div>
    );
  }

  return (
    <div 
      className={`cursor-pointer flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition-colors ${className}`}
      onClick={handleClick}
    >
      <div className="flex items-center gap-3">
        <Icon size={16} className="text-gray-600" />
        <span className="text-sm text-gray-700">{text}</span>
      </div>
      {showMoreHorizontal && (
        <MoreHorizontal size={16} className="text-gray-400" />
      )}
    </div>
  );
}
