import { LucideIcon, MoreHorizontal } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useNavigationStore } from '@/store/useNavigationStore';

interface OptionProps {
  icon: LucideIcon;
  text: string;
  showMoreHorizontal?: boolean;
  className?: string;
  page?: string;
  collapsed?: boolean;
}

export default function Option({ 
  icon: Icon, 
  text, 
  showMoreHorizontal, 
  className = "",
  page,
  collapsed = false
}: OptionProps) {
  const { currentPage, setCurrentPage } = useNavigationStore();
  const [isHovering, setIsHovering] = useState(false);
  const [tooltipPos, setTooltipPos] = useState<{ top: number; left: number } | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mq = window.matchMedia('(max-width: 639px)');
    const apply = (e: MediaQueryList | MediaQueryListEvent) => {
      const matches = 'matches' in e ? (e as MediaQueryListEvent).matches : (e as MediaQueryList).matches;
      setIsMobile(matches);
    };
    apply(mq);
    mq.addEventListener?.('change', apply);
    // @ts-ignore
    mq.addListener?.(apply);
    return () => {
      mq.removeEventListener?.('change', apply);
      // @ts-ignore
      mq.removeListener?.(apply);
    };
  }, []);
  
  const handleClick = () => {
    if (page) {
      setCurrentPage(page);
    }
  };
  const isCurrentlySelected = page && currentPage === page;

  if (collapsed) {
    if (isCurrentlySelected) {
      return (
        <div 
          ref={containerRef}
          className={`cursor-pointer relative p-2 rounded-xl bg-gradient-to-r from-blue-500 via-teal-400 to-yellow-400 text-white flex items-center justify-center ${className}`}
          onClick={handleClick}
          onMouseEnter={() => {
            setIsHovering(true);
            const rect = containerRef.current?.getBoundingClientRect();
            if (rect) {
              setTooltipPos({ top: rect.top + rect.height / 2, left: rect.right + 8 });
            }
          }}
          onMouseLeave={() => {
            setIsHovering(false);
            setTooltipPos(null);
          }}
        >
          <Icon size={16} className="text-white" />
          {isHovering && tooltipPos && !isMobile && (
            <div
              className="fixed z-50 -translate-y-1/2 whitespace-nowrap bg-gray-900 text-white text-xs px-2 py-1 rounded shadow-lg"
              style={{ top: tooltipPos.top, left: tooltipPos.left }}
            >
              {text}
            </div>
          )}
        </div>
      );
    }
    return (
      <div 
        ref={containerRef}
        className={`cursor-pointer relative p-2 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center ${className}`}
        onClick={handleClick}
        onMouseEnter={() => {
          setIsHovering(true);
          const rect = containerRef.current?.getBoundingClientRect();
          if (rect) {
            setTooltipPos({ top: rect.top + rect.height / 2, left: rect.right + 8 });
          }
        }}
        onMouseLeave={() => {
          setIsHovering(false);
          setTooltipPos(null);
        }}
      >
        <Icon size={16} className="text-gray-600" />
        {isHovering && tooltipPos && !isMobile && (
          <div
            className="fixed z-50 -translate-y-1/2 whitespace-nowrap bg-gray-900 text-white text-xs px-2 py-1 rounded shadow-lg"
            style={{ top: tooltipPos.top, left: tooltipPos.left }}
          >
            {text}
          </div>
        )}
      </div>
    );
  }

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
