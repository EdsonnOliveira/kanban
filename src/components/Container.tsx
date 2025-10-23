import { LucideIcon, Edit3 } from 'lucide-react';
import { ReactNode, useState } from 'react';
import Button from './Button';
import Image from 'next/image';

type EditPermission = 'title' | 'description' | 'banner' | 'icon';

interface ContainerProps {
  icon?: LucideIcon;
  title?: string;
  description?: string;
  children?: ReactNode;
  hiddeBanner?: boolean;
  className?: string;
  enableEdit?: EditPermission[];
  onTitleChange?: (title: string) => void;
  onDescriptionChange?: (description: string) => void;
  onIconChange?: (iconUrl: string) => void;
  onBannerColorChange?: (color: string) => void;
  initialIconUrl?: string;
}

export default function Container({ 
  icon: Icon, 
  title, 
  description, 
  children,
  className = "",
  hiddeBanner = false,
  enableEdit = [],
  onTitleChange,
  onDescriptionChange,
  onIconChange,
  onBannerColorChange,
  initialIconUrl
}: ContainerProps) {
  const [editableTitle, setEditableTitle] = useState(title || '');
  const [editableDescription, setEditableDescription] = useState(description || '');
  const [isEditing, setIsEditing] = useState(false);
  const [iconUrl, setIconUrl] = useState<string>(initialIconUrl || '');
  const [bannerColor, setBannerColor] = useState<string>('default');

  const bannerColorOptions = [
    { name: 'Padrão', value: 'default', gradient: 'from-white to-[#EDF6FF]' },
    { name: 'Azul', value: 'blue', gradient: 'from-blue-50 to-blue-200' },
    { name: 'Verde', value: 'green', gradient: 'from-green-50 to-green-200' },
    { name: 'Roxo', value: 'purple', gradient: 'from-purple-50 to-purple-200' },
    { name: 'Laranja', value: 'orange', gradient: 'from-orange-50 to-orange-200' },
    { name: 'Rosa', value: 'pink', gradient: 'from-pink-50 to-pink-200' },
    { name: 'Cinza', value: 'gray', gradient: 'from-gray-50 to-gray-200' }
  ];

  const handleIconUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const url = e.target?.result as string;
        setIconUrl(url);
        onIconChange?.(url);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBannerColorChange = (color: string) => {
    setBannerColor(color);
    onBannerColorChange?.(color);
  };

  const getBannerGradient = () => {
    const selectedOption = bannerColorOptions.find(option => option.value === bannerColor);
    return selectedOption?.gradient || 'from-white to-[#EDF6FF]';
  };
  return (
    <div className={`flex-1 flex flex-col rounded-3xl border-none md:border md:border-solid border-gray-200 ${className}`}>
      <div className="flex-1 overflow-y-auto p-0 md:p-4 flex flex-col gap-4">
        {!hiddeBanner && (
        <div className={`flex flex-col gap-4 items-center justify-center bg-gradient-to-t ${getBannerGradient()} w-full h-96 rounded-3xl relative`}>
          {/* Botão Editar */}
          {enableEdit.length > 0 && (
            <div className="absolute top-4 right-4">
              <Button
                text={isEditing ? 'Salvar' : 'Editar'}
                onClick={() => setIsEditing(!isEditing)}
                leftIcon={Edit3}
                size="small"
                variant="square"
                style="white"
                className="shadow-sm hover:shadow-md transition-shadow w-auto"
              />
            </div>
          )}

          {/* Opções de Cor do Banner */}
          {enableEdit.includes('banner') && isEditing && (
            <div className="absolute top-16 right-4 bg-white rounded-lg shadow-lg p-3 z-10">
              <h4 className="text-xs font-medium text-gray-700 mb-2">Cor do Banner</h4>
              <div className="grid grid-cols-2 gap-2">
                {bannerColorOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleBannerColorChange(option.value)}
                    className={`p-2 rounded-md text-xs font-medium transition-colors ${
                      bannerColor === option.value
                        ? 'bg-gray-900 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {option.name}
                  </button>
                ))}
              </div>
            </div>
          )}
          
          <div className={`flex items-center mb-2 justify-center ${iconUrl ? 'p-0' : 'p-6 bg-white shadow-lg'} rounded-3xl transform rotate-45`}>
            {enableEdit.includes('icon') && isEditing ? (
              <label className="cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleIconUpload}
                  className="hidden"
                />
                {iconUrl ? (
                  <Image
                    src={iconUrl}
                    alt="Icon"
                    width={40}
                    height={40}
                    className="w-20 h-20 object-cover rounded-lg rotate-[-45deg] shadow-lg"
                  />
                ) : (
                  <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                    <span className="text-gray-500 text-xs">+</span>
                  </div>
                )}
              </label>
            ) : (
              iconUrl ? (
                <Image
                  src={iconUrl}
                  alt="Icon"
                  width={40}
                  height={40}
                  className="w-20 h-20 object-cover rounded-lg rotate-[-45deg] shadow-lg"
                />
              ) : (
                Icon && <Icon size={38} className="rotate-[-45deg]" />
              )
            )}
          </div>
          {enableEdit.includes('title') && isEditing ? (
            <input
              type="text"
              value={editableTitle}
              onChange={(e) => {
                setEditableTitle(e.target.value);
                onTitleChange?.(e.target.value);
              }}
              className="text-2xl font-bold bg-transparent border-none outline-none text-center"
              placeholder="Digite o título..."
            />
          ) : (
            <h1 className="text-2xl font-bold">{editableTitle || title}</h1>
          )}
          {enableEdit.includes('description') && isEditing ? (
            <textarea
              value={editableDescription}
              onChange={(e) => {
                setEditableDescription(e.target.value);
                onDescriptionChange?.(e.target.value);
              }}
              className="text-sm text-gray-500 bg-transparent border-none outline-none text-center resize-none"
              placeholder="Digite a descrição..."
              rows={2}
            />
          ) : (
            <p className="text-sm text-gray-500">{editableDescription || description}</p>
          )}
        </div>
        )}
        {children}
      </div>
    </div>
  );
}
