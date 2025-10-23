import { useState } from 'react';
import Button from './Button';

export default function CultureForm() {
  const [formData, setFormData] = useState({
    coreValues: '',
    workEnvironment: '',
    communicationStyle: '',
    decisionMaking: '',
    teamCollaboration: '',
    leadershipStyle: '',
    innovationApproach: '',
    diversityInclusion: '',
    workLifeBalance: '',
    recognitionSystem: '',
    companyRituals: '',
    conflictResolution: '',
    feedbackCulture: '',
    learningDevelopment: '',
    remoteWorkPolicy: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Dados da cultura:', formData);
    // Aqui você pode salvar os dados
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Valores Fundamentais
        </label>
        <textarea
          value={formData.coreValues}
          onChange={(e) => handleInputChange('coreValues', e.target.value)}
          placeholder="Quais são os valores fundamentais que guiam sua empresa?"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          rows={3}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Ambiente de Trabalho
          </label>
          <textarea
            value={formData.workEnvironment}
            onChange={(e) => handleInputChange('workEnvironment', e.target.value)}
            placeholder="Como é o ambiente de trabalho na sua empresa?"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            rows={3}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Estilo de Comunicação
          </label>
          <textarea
            value={formData.communicationStyle}
            onChange={(e) => handleInputChange('communicationStyle', e.target.value)}
            placeholder="Como a comunicação acontece na empresa?"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            rows={3}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Processo de Tomada de Decisão
        </label>
        <textarea
          value={formData.decisionMaking}
          onChange={(e) => handleInputChange('decisionMaking', e.target.value)}
          placeholder="Como as decisões são tomadas na sua empresa?"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          rows={3}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Colaboração em Equipe
          </label>
          <textarea
            value={formData.teamCollaboration}
            onChange={(e) => handleInputChange('teamCollaboration', e.target.value)}
            placeholder="Como as equipes colaboram entre si?"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            rows={3}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Estilo de Liderança
          </label>
          <textarea
            value={formData.leadershipStyle}
            onChange={(e) => handleInputChange('leadershipStyle', e.target.value)}
            placeholder="Qual o estilo de liderança praticado?"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            rows={3}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Abordagem à Inovação
        </label>
        <textarea
          value={formData.innovationApproach}
          onChange={(e) => handleInputChange('innovationApproach', e.target.value)}
          placeholder="Como a empresa encara a inovação e mudanças?"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          rows={3}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Diversidade e Inclusão
          </label>
          <textarea
            value={formData.diversityInclusion}
            onChange={(e) => handleInputChange('diversityInclusion', e.target.value)}
            placeholder="Como a empresa promove diversidade e inclusão?"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            rows={3}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Equilíbrio Vida-Trabalho
          </label>
          <textarea
            value={formData.workLifeBalance}
            onChange={(e) => handleInputChange('workLifeBalance', e.target.value)}
            placeholder="Como a empresa apoia o equilíbrio vida-trabalho?"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            rows={3}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Sistema de Reconhecimento
        </label>
        <textarea
          value={formData.recognitionSystem}
          onChange={(e) => handleInputChange('recognitionSystem', e.target.value)}
          placeholder="Como a empresa reconhece e recompensa os funcionários?"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          rows={3}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Rituais da Empresa
          </label>
          <textarea
            value={formData.companyRituals}
            onChange={(e) => handleInputChange('companyRituals', e.target.value)}
            placeholder="Quais são os rituais e tradições da empresa?"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            rows={3}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Resolução de Conflitos
          </label>
          <textarea
            value={formData.conflictResolution}
            onChange={(e) => handleInputChange('conflictResolution', e.target.value)}
            placeholder="Como a empresa lida com conflitos?"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            rows={3}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Cultura de Feedback
          </label>
          <textarea
            value={formData.feedbackCulture}
            onChange={(e) => handleInputChange('feedbackCulture', e.target.value)}
            placeholder="Como funciona o feedback na empresa?"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            rows={3}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Aprendizado e Desenvolvimento
          </label>
          <textarea
            value={formData.learningDevelopment}
            onChange={(e) => handleInputChange('learningDevelopment', e.target.value)}
            placeholder="Como a empresa investe no desenvolvimento dos funcionários?"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            rows={3}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Política de Trabalho Remoto
        </label>
        <textarea
          value={formData.remoteWorkPolicy}
          onChange={(e) => handleInputChange('remoteWorkPolicy', e.target.value)}
          placeholder="Qual a política da empresa sobre trabalho remoto?"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          rows={3}
        />
      </div>

      <div className="flex justify-end pt-4">
        <Button
          text="Salvar Cultura"
          type="submit"
          size="middle"
        />
      </div>
    </form>
  );
}
