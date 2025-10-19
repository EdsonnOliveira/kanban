import { LucideIcon } from 'lucide-react';
import React from 'react';

type InputSize = 'small' | 'middle' | 'large';

interface InputProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
  leftIcon?: LucideIcon;
  rightIcon?: LucideIcon;
  rightIconClassName?: string;
  size?: InputSize;
  type?: 'text' | 'email' | 'password' | 'number' | 'date' | 'textarea';
  disabled?: boolean;
  label?: string;
  rows?: number;
}

export default function Input({ 
  placeholder = "",
  value = "",
  onChange,
  className = "",
  leftIcon: LeftIcon,
  rightIcon: RightIcon,
  rightIconClassName = "text-gray-400",
  size = "middle",
  type = "text",
  disabled = false,
  label,
  rows = 3
}: InputProps) {
  const getSizeClasses = (size: InputSize) => {
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

  const getIconSize = (size: InputSize) => {
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
    placeholder-gray-400 
    focus:outline-none 
    focus:ring-2 
    focus:ring-blue-500 
    focus:border-transparent 
    transition-all 
    duration-200
    disabled:bg-gray-50 
    disabled:text-gray-400 
    disabled:cursor-not-allowed
    ${className}
  `;

  const renderInput = () => {
    if (type === 'textarea') {
      return (
        <textarea
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          disabled={disabled}
          rows={rows}
          className={baseClasses}
        />
      );
    }

    return (
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        disabled={disabled}
        className={baseClasses}
      />
    );
  };

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}
      <div className="relative">
        {LeftIcon && type !== 'textarea' && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
            <LeftIcon size={getIconSize(size)} className="text-gray-400" />
          </div>
        )}
        {renderInput()}
        {RightIcon && type !== 'textarea' && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <RightIcon size={getIconSize(size)} className={rightIconClassName} />
          </div>
        )}
      </div>
    </div>
  );
}
