import Image from 'next/image';

interface OptionPageProps {
  image?: string;
  label: string;
  isActive?: boolean;
  onClick?: () => void;
}

export default function OptionPage({ 
  image, 
  label, 
  isActive = false,
  onClick 
}: OptionPageProps) {
  return (
    <div className="cursor-pointer md:w-full h-16 flex flex-col items-center justify-center gap-2" onClick={onClick}>
      <div 
        className={`w-14 h-14 rounded-full overflow-hidden border-3 transition-colors duration-200 cursor-pointer flex items-center justify-center ${
          !isActive ? 'opacity-50' : 'opacity-100'
        }`}
      >
        {image && (
          <Image
            src={image}
            alt={label}
            width={48}
            height={48}
            className="w-full h-full object-cover"
          />
        )}
      </div>
    </div>
  );
}
