import { LucideIcon } from 'lucide-react';
import { ReactNode } from 'react';

interface ContainerProps {
  icon?: LucideIcon;
  title?: string;
  description?: string;
  children?: ReactNode;
  hiddeBanner?: boolean;
  className?: string;
}

export default function Container({ 
  icon: Icon, 
  title, 
  description, 
  children,
  className = "",
  hiddeBanner = false
}: ContainerProps) {
  return (
    <div className={`flex-1 flex flex-col rounded-3xl p-4 border border-gray-200 gap-4 ${className}`}>
      {!hiddeBanner && (
      <div className="flex flex-col gap-4 items-center justify-center bg-gradient-to-t from-white to-[#EDF6FF] w-full h-96 rounded-3xl">
        <div className="flex items-center mb-2 justify-center bg-white p-6 rounded-3xl shadow-lg transform rotate-45">
          {Icon && <Icon size={38} className="rotate-[-45deg]" />}
        </div>
        <h1 className="text-2xl font-bold">{title}</h1>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
      )}
      {children}
    </div>
  );
}
