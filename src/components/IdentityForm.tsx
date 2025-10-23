import { useState, useEffect } from 'react';
import Input from './Input';
import Button from './Button';
import { useCompanyStore } from '@/store/useCompanyStore';

export default function IdentityForm() {
  const { selectedCompany } = useCompanyStore();
  
  const [formData, setFormData] = useState({
    companyName: '',
    mission: '',
    vision: '',
    values: '',
    targetAudience: '',
    marketPosition: '',
    competitiveAdvantage: '',
    brandPersonality: '',
    companyHistory: '',
    coreBusiness: '',
    geographicScope: '',
    companySize: '',
    foundingYear: '',
    legalStructure: ''
  });

  // Atualizar o nome da empresa quando a empresa selecionada mudar
  useEffect(() => {
    if (selectedCompany) {
      setFormData(prev => ({
        ...prev,
        companyName: selectedCompany.name
      }));
    }
  }, [selectedCompany]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Dados do formulário:', formData);
    // Aqui você pode salvar os dados
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Nome da Empresa
          </label>
          <Input
            value={formData.companyName}
            onChange={(value: string) => handleInputChange('companyName', value)}
            placeholder="Nome da empresa selecionada"
            disabled={true}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Ano de Fundação
          </label>
          <Input
            value={formData.foundingYear}
            onChange={(value: string) => handleInputChange('foundingYear', value)}
            placeholder="Ex: 2020"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tamanho da Empresa
          </label>
          <Input
            value={formData.companySize}
            onChange={(value: string) => handleInputChange('companySize', value)}
            placeholder="Ex: 1-10 funcionários, 11-50, etc."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Estrutura Legal
          </label>
          <Input
            value={formData.legalStructure}
            onChange={(value: string) => handleInputChange('legalStructure', value)}
            placeholder="Ex: LTDA, S.A., MEI, etc."
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Negócio Principal
        </label>
        <textarea
          value={formData.coreBusiness}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleInputChange('coreBusiness', e.target.value)}
          placeholder="Qual é o negócio principal da sua empresa?"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          rows={3}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Escopo Geográfico
        </label>
        <textarea
          value={formData.geographicScope}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleInputChange('geographicScope', e.target.value)}
          placeholder="Onde sua empresa atua? (local, regional, nacional, internacional)"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          rows={3}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Histórico da Empresa
        </label>
        <textarea
          value={formData.companyHistory}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleInputChange('companyHistory', e.target.value)}
          placeholder="Conte a história da sua empresa"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          rows={3}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Missão
        </label>
        <textarea
          value={formData.mission}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleInputChange('mission', e.target.value)}
          placeholder="Qual é o propósito da sua empresa?"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          rows={3}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Visão
        </label>
        <textarea
          value={formData.vision}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleInputChange('vision', e.target.value)}
          placeholder="Onde você quer chegar?"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          rows={3}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Valores
        </label>
        <textarea
          value={formData.values}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleInputChange('values', e.target.value)}
          placeholder="Quais são os princípios que guiam sua empresa?"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          rows={3}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Posicionamento no Mercado
          </label>
          <Input
            value={formData.marketPosition}
            onChange={(value: string) => handleInputChange('marketPosition', value)}
            placeholder="Como você se posiciona no mercado?"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Vantagem Competitiva
          </label>
          <Input
            value={formData.competitiveAdvantage}
            onChange={(value: string) => handleInputChange('competitiveAdvantage', value)}
            placeholder="O que te diferencia da concorrência?"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Personalidade da Marca
        </label>
        <textarea
          value={formData.brandPersonality}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleInputChange('brandPersonality', e.target.value)}
          placeholder="Como sua marca se comporta e se comunica?"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          rows={3}
        />
      </div>

      <div className="flex justify-end pt-4">
        <Button
          text="Salvar Identidade"
          type="submit"
          size="middle"
        />
      </div>
    </form>
  );
}
