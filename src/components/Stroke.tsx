interface StrokeProps {
  className?: string;
}

export default function Stroke({ className = "" }: StrokeProps) {
  return (
    <div 
      className={`w-full h-px bg-gradient-to-r from-transparent via-blue-300 to-transparent blur-[0.1px] shadow-sm ${className}`} 
    />
  );
}
