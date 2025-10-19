import { LucideIcon } from 'lucide-react';
import { ReactNode } from 'react';
import Button from './Button';
import Select from './Select';

interface BoxProps {
  title?: string;
  value?: string;
  filterOptions?: { label: string; value: string }[];
  onFilterChange?: (value: string) => void;
  actionButtonText?: string;
  onActionButtonClick?: () => void;
  actionButtonIcon?: LucideIcon;
  className?: string;
  children: ReactNode;
  hideHeader?: boolean;
}

export default function Box({
  title,
  value,
  filterOptions,
  onFilterChange,
  actionButtonText,
  onActionButtonClick,
  actionButtonIcon: ActionButtonIcon,
  className = "",
  children,
  hideHeader = false
}: BoxProps) {
  return (
    <div className={`bg-white rounded-3xl p-6 border border-gray-200 shadow-sm ${className}`}>
      {!hideHeader && (
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            {title && <h2 className="text-lg font-semibold text-gray-800">{title}</h2>}
            {value && <span className="bg-orange-100 text-orange-600 px-2 py-1 rounded-full text-xs font-medium">{value}</span>}
          </div>
          <div className="flex items-center gap-3">
            {filterOptions && (
              <Select
                value={filterOptions[0]?.value || ""}
                onChange={(value) => onFilterChange?.(value)}
                options={filterOptions}
                size="small"
                className="w-auto min-w-[120px]"
              />
            )}
            {actionButtonText && (
              <Button
                text={actionButtonText}
                leftIcon={ActionButtonIcon}
                onClick={onActionButtonClick}
                size="small"
                variant="square"
                className="w-auto"
              />
            )}
          </div>
        </div>
      )}
      {children}
    </div>
  );
}
