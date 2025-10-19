import { LucideIcon } from 'lucide-react';

export interface TypeOption {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  color: 'blue' | 'green' | 'purple' | 'orange' | 'red' | 'yellow';
  onClick: () => void;
}

interface TypeSelectorProps {
  title: string;
  options: TypeOption[];
  className?: string;
}

export default function TypeSelector({ title, options, className = "" }: TypeSelectorProps) {
  const getColorClasses = (color: TypeOption['color']) => {
    const colorMap = {
      blue: {
        bg: 'bg-blue-100',
        hoverBg: 'group-hover:bg-blue-200',
        icon: 'text-blue-600',
        border: 'hover:border-blue-300',
        background: 'hover:bg-blue-50'
      },
      green: {
        bg: 'bg-green-100',
        hoverBg: 'group-hover:bg-green-200',
        icon: 'text-green-600',
        border: 'hover:border-green-300',
        background: 'hover:bg-green-50'
      },
      purple: {
        bg: 'bg-purple-100',
        hoverBg: 'group-hover:bg-purple-200',
        icon: 'text-purple-600',
        border: 'hover:border-purple-300',
        background: 'hover:bg-purple-50'
      },
      orange: {
        bg: 'bg-orange-100',
        hoverBg: 'group-hover:bg-orange-200',
        icon: 'text-orange-600',
        border: 'hover:border-orange-300',
        background: 'hover:bg-orange-50'
      },
      red: {
        bg: 'bg-red-100',
        hoverBg: 'group-hover:bg-red-200',
        icon: 'text-red-600',
        border: 'hover:border-red-300',
        background: 'hover:bg-red-50'
      },
      yellow: {
        bg: 'bg-yellow-100',
        hoverBg: 'group-hover:bg-yellow-200',
        icon: 'text-yellow-600',
        border: 'hover:border-yellow-300',
        background: 'hover:bg-yellow-50'
      }
    };
    return colorMap[color];
  };

  return (
    <div className={`flex flex-col gap-4 ${className}`}>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        {title}
      </h3>
      
      <div className="grid grid-cols-1 gap-4">
        {options.map((option) => {
          const colors = getColorClasses(option.color);
          const IconComponent = option.icon;
          
          return (
            <button
              key={option.id}
              onClick={option.onClick}
              className={`flex items-center gap-4 p-4 border-2 border-gray-200 rounded-2xl ${colors.border} ${colors.background} transition-all duration-200 group cursor-pointer`}
            >
              <div className={`w-12 h-12 ${colors.bg} rounded-xl flex items-center justify-center ${colors.hoverBg} transition-colors`}>
                <IconComponent size={24} className={colors.icon} />
              </div>
              <div className="text-left">
                <h4 className="font-semibold text-gray-900">{option.title}</h4>
                <p className="text-sm text-gray-500">{option.description}</p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
