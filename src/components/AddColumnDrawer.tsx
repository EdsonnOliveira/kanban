import { XIcon, CheckIcon, Palette } from 'lucide-react';
import { ReactNode, useEffect, useState } from 'react';
import Button from './Button';
import Input from './Input';

interface AddColumnDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: { name: string; color: string }) => void;
}

const colorOptions = [
  { name: 'Roxo', value: '#8B5CF6', bg: 'bg-purple-500' },
  { name: 'Azul', value: '#3B82F6', bg: 'bg-blue-500' },
  { name: 'Verde', value: '#10B981', bg: 'bg-green-500' },
  { name: 'Amarelo', value: '#F59E0B', bg: 'bg-yellow-500' },
  { name: 'Vermelho', value: '#EF4444', bg: 'bg-red-500' },
  { name: 'Rosa', value: '#EC4899', bg: 'bg-pink-500' },
  { name: 'Indigo', value: '#6366F1', bg: 'bg-indigo-500' },
  { name: 'Teal', value: '#14B8A6', bg: 'bg-teal-500' },
  { name: 'Orange', value: '#F97316', bg: 'bg-orange-500' },
  { name: 'Gray', value: '#6B7280', bg: 'bg-gray-500' },
];

export default function AddColumnDrawer({ isOpen, onClose, onSave }: AddColumnDrawerProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    color: '#8B5CF6'
  });

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      setTimeout(() => setIsVisible(true), 10);
    } else {
      setIsVisible(false);
      setTimeout(() => setShouldRender(false), 300);
    }
  }, [isOpen]);

  const handleSave = () => {
    if (formData.name.trim()) {
      onSave(formData);
      setFormData({ name: '', color: '#8B5CF6' });
      onClose();
    }
  };

  const handleClose = () => {
    setFormData({ name: '', color: '#8B5CF6' });
    onClose();
  };

  if (!shouldRender) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`
          fixed inset-0 bg-black z-40
          transition-opacity duration-300 ease-in-out
          ${isVisible ? 'opacity-50' : 'opacity-0'}
        `}
        onClick={handleClose}
      />
      
      {/* Drawer */}
      <div 
        className={`
          fixed right-4 top-4 h-[calc(100vh-2rem)] z-50
          w-96 p-4 bg-gradient-to-r from-[#F2F2F2] to-white rounded-3xl flex flex-col gap-4
          transform transition-all duration-300 ease-in-out
          ${isVisible 
            ? 'translate-x-0 opacity-100' 
            : 'translate-x-full opacity-0'
          }
        `}
      >
        {/* Header */}
        <div className="w-full flex items-center justify-between text-black">
          <XIcon size={24} className="cursor-pointer hover:text-gray-600 transition-colors" onClick={handleClose} />
          <Button
            text="Salvar"
            onClick={handleSave}
            size="small"
            className={`max-w-24 ${!formData.name.trim() ? 'opacity-50 cursor-not-allowed' : ''}`}
            rightIcon={CheckIcon}
            rightIconClassName="text-white"
          />
        </div>
        
        {/* Content */}
        <div className="space-y-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">
            Adicionar Nova Coluna
          </h2>

          {/* Nome da Coluna */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Nome da Coluna
            </label>
            <Input
              value={formData.name}
              onChange={(value: string) => setFormData({ ...formData, name: value })}
              placeholder="Digite o nome da coluna"
              className="w-full"
            />
          </div>

          {/* Cor da Coluna */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <Palette size={16} />
              Cor da Coluna
            </label>
            <div className="grid grid-cols-5 gap-3">
              {colorOptions.map((color) => (
                <button
                  key={color.value}
                  onClick={() => setFormData({ ...formData, color: color.value })}
                  className={`
                    w-12 h-12 rounded-lg border-2 transition-all duration-200 cursor-pointer
                    ${formData.color === color.value 
                      ? 'border-gray-800 scale-110' 
                      : 'border-gray-200 hover:border-gray-400'
                    }
                  `}
                  style={{ backgroundColor: color.value }}
                  title={color.name}
                />
              ))}
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <div 
                className="w-4 h-4 rounded border border-gray-300"
                style={{ backgroundColor: formData.color }}
              />
              <span>Cor selecionada: {colorOptions.find(c => c.value === formData.color)?.name}</span>
            </div>
          </div>

          {/* Preview */}
          {formData.name && (
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Preview
              </label>
              <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: formData.color }}
                  />
                  <span className="font-medium text-gray-900">{formData.name}</span>
                  <span className="text-sm text-gray-500 bg-gray-200 px-2 py-1 rounded-full">
                    0
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
