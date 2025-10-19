import { LucideIcon } from 'lucide-react';

type ButtonSize = 'small' | 'middle' | 'large';
type ButtonVariant = 'rounded' | 'square';

interface ButtonProps {
  text?: string;
  onClick?: () => void;
  className?: string;
  leftIcon?: LucideIcon;
  rightIcon?: LucideIcon;
  rightIconClassName?: string;
  size?: ButtonSize;
  variant?: ButtonVariant;
}

export default function Button({ 
  text = "Button", 
  onClick, 
  className = "",
  leftIcon: LeftIcon,
  rightIcon: RightIcon,
  rightIconClassName = "text-blue-400",
  size = "middle",
  variant = "rounded"
}: ButtonProps) {
  const getSizeClasses = (size: ButtonSize) => {
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

  const getIconSize = (size: ButtonSize) => {
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

  const getVariantClasses = (variant: ButtonVariant) => {
    switch (variant) {
      case 'rounded':
        return 'rounded-full';
      case 'square':
        return 'rounded-lg';
      default:
        return 'rounded-full';
    }
  };

  return (
    <button 
      className={`cursor-pointer w-full ${getSizeClasses(size)} bg-gray-900 hover:bg-gray-800 ${getVariantClasses(variant)} flex items-center justify-center gap-2 text-white font-regular transition-colors ${className}`}
      onClick={onClick}
    >
      {LeftIcon && <LeftIcon size={getIconSize(size)} />}
      <span>{text}</span>
      {RightIcon && <RightIcon size={getIconSize(size)} className={rightIconClassName} />}
    </button>
  );
}
