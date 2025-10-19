import { LucideIcon } from 'lucide-react';

type SelectSize = 'small' | 'middle' | 'large';

interface SelectProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
  leftIcon?: LucideIcon;
  rightIcon?: LucideIcon;
  rightIconClassName?: string;
  size?: SelectSize;
  disabled?: boolean;
  label?: string;
  options?: { value: string; label: string }[];
}

export default function Select({ 
  placeholder = "Selecione uma opção",
  value = "",
  onChange,
  className = "",
  leftIcon: LeftIcon,
  rightIcon: RightIcon,
  rightIconClassName = "text-gray-400",
  size = "middle",
  disabled = false,
  label,
  options = []
}: SelectProps) {
  const getSizeClasses = (size: SelectSize) => {
    switch (size) {
      case 'small':
        return 'px-3 py-2 text-sm';
      case 'middle':
        return 'px-4 py-3 text-base';
      case 'large':
        return 'px-6 py-4 text-lg';
      default:
        return 'px-4 py-3 text-base';
    }
  };

  const getIconSize = (size: SelectSize) => {
    switch (size) {
      case 'small':
        return 14;
      case 'middle':
        return 16;
      case 'large':
        return 18;
      default:
        return 16;
    }
  };

  const baseClasses = `
    w-full 
    ${getSizeClasses(size)}
    ${LeftIcon ? 'pl-10' : 'pl-4'}
    ${RightIcon ? 'pr-10' : 'pr-4'}
    border border-gray-200 
    rounded-xl
    bg-white 
    text-gray-900 
    focus:outline-none 
    focus:ring-2 
    focus:ring-blue-500 
    focus:border-transparent 
    transition-all 
    duration-200
    disabled:bg-gray-50 
    disabled:text-gray-400 
    disabled:cursor-not-allowed
    appearance-none
    cursor-pointer
    ${className}
  `;

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}
      <div className="relative">
        {LeftIcon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
            <LeftIcon size={getIconSize(size)} className="text-gray-400" />
          </div>
        )}
        <select
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          disabled={disabled}
          className={baseClasses}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {RightIcon && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
            <RightIcon size={getIconSize(size)} className={rightIconClassName} />
          </div>
        )}
        {/* Ícone de dropdown padrão se não houver rightIcon */}
        {!RightIcon && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
            <svg 
              width={getIconSize(size)} 
              height={getIconSize(size)} 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              className="text-gray-400"
            >
              <polyline points="6,9 12,15 18,9"></polyline>
            </svg>
          </div>
        )}
      </div>
    </div>
  );
}
