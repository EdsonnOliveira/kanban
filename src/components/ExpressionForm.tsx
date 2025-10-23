import { useState } from 'react';
import Button from './Button';

export default function ExpressionForm() {
  const [formData, setFormData] = useState({
    brandPersonality: '',
    visualIdentity: '',
    toneOfVoice: '',
    keyMessages: '',
    targetAudience: '',
    communicationChannels: '',
    brandGuidelines: '',
    contentStrategy: '',
    socialMediaPresence: '',
    publicRelations: '',
    logoUsage: '',
    colorPalette: '',
    typography: '',
    brandVoice: '',
    storytelling: '',
    crisisCommunication: '',
    brandColors: '',
    logoVariations: '',
    iconography: '',
    photography: '',
    videoStyle: '',
    brandSlogan: '',
    taglines: '',
    brandPromise: '',
    brandValues: '',
    brandMission: '',
    brandVision: '',
    brandPositioning: '',
    brandDifferentiation: '',
    brandExperience: '',
    brandTouchpoints: '',
    brandConsistency: '',
    brandEvolution: '',
    brandLegacy: '',
    brandFuture: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Dados da expressão:', formData);
    // Aqui você pode salvar os dados
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Personalidade da Marca
        </label>
        <textarea
          value={formData.brandPersonality}
          onChange={(e) => handleInputChange('brandPersonality', e.target.value)}
          placeholder="Como sua marca se comporta e se comunica?"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          rows={3}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Cores da Marca
          </label>
          <textarea
            value={formData.brandColors}
            onChange={(e) => handleInputChange('brandColors', e.target.value)}
            placeholder="Quais são as cores principais da marca?"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            rows={3}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Variações do Logo
          </label>
          <textarea
            value={formData.logoVariations}
            onChange={(e) => handleInputChange('logoVariations', e.target.value)}
            placeholder="Quais são as variações do logo?"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            rows={3}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Iconografia
          </label>
          <textarea
            value={formData.iconography}
            onChange={(e) => handleInputChange('iconography', e.target.value)}
            placeholder="Quais ícones e símbolos representam a marca?"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            rows={3}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Estilo de Fotografia
          </label>
          <textarea
            value={formData.photography}
            onChange={(e) => handleInputChange('photography', e.target.value)}
            placeholder="Como são as fotos da marca?"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            rows={3}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Estilo de Vídeo
          </label>
          <textarea
            value={formData.videoStyle}
            onChange={(e) => handleInputChange('videoStyle', e.target.value)}
            placeholder="Como são os vídeos da marca?"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            rows={3}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Slogan da Marca
          </label>
          <textarea
            value={formData.brandSlogan}
            onChange={(e) => handleInputChange('brandSlogan', e.target.value)}
            placeholder="Qual é o slogan da marca?"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            rows={3}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Taglines
        </label>
        <textarea
          value={formData.taglines}
          onChange={(e) => handleInputChange('taglines', e.target.value)}
          placeholder="Quais são as taglines da marca?"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          rows={3}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Promessa da Marca
          </label>
          <textarea
            value={formData.brandPromise}
            onChange={(e) => handleInputChange('brandPromise', e.target.value)}
            placeholder="Qual é a promessa da marca?"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            rows={3}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Valores da Marca
          </label>
          <textarea
            value={formData.brandValues}
            onChange={(e) => handleInputChange('brandValues', e.target.value)}
            placeholder="Quais são os valores da marca?"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            rows={3}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Posicionamento da Marca
          </label>
          <textarea
            value={formData.brandPositioning}
            onChange={(e) => handleInputChange('brandPositioning', e.target.value)}
            placeholder="Como a marca se posiciona no mercado?"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            rows={3}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Diferenciação da Marca
          </label>
          <textarea
            value={formData.brandDifferentiation}
            onChange={(e) => handleInputChange('brandDifferentiation', e.target.value)}
            placeholder="O que diferencia a marca da concorrência?"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            rows={3}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Experiência da Marca
          </label>
          <textarea
            value={formData.brandExperience}
            onChange={(e) => handleInputChange('brandExperience', e.target.value)}
            placeholder="Como é a experiência com a marca?"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            rows={3}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Pontos de Contato
          </label>
          <textarea
            value={formData.brandTouchpoints}
            onChange={(e) => handleInputChange('brandTouchpoints', e.target.value)}
            placeholder="Quais são os pontos de contato da marca?"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            rows={3}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Consistência da Marca
          </label>
          <textarea
            value={formData.brandConsistency}
            onChange={(e) => handleInputChange('brandConsistency', e.target.value)}
            placeholder="Como manter a consistência da marca?"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            rows={3}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Evolução da Marca
          </label>
          <textarea
            value={formData.brandEvolution}
            onChange={(e) => handleInputChange('brandEvolution', e.target.value)}
            placeholder="Como a marca evolui ao longo do tempo?"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            rows={3}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Legado da Marca
          </label>
          <textarea
            value={formData.brandLegacy}
            onChange={(e) => handleInputChange('brandLegacy', e.target.value)}
            placeholder="Qual é o legado da marca?"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            rows={3}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Futuro da Marca
          </label>
          <textarea
            value={formData.brandFuture}
            onChange={(e) => handleInputChange('brandFuture', e.target.value)}
            placeholder="Qual é a visão de futuro da marca?"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            rows={3}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Estratégia de Conteúdo
          </label>
          <textarea
            value={formData.contentStrategy}
            onChange={(e) => handleInputChange('contentStrategy', e.target.value)}
            placeholder="Qual a estratégia de conteúdo da marca?"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            rows={3}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Presença em Redes Sociais
          </label>
          <textarea
            value={formData.socialMediaPresence}
            onChange={(e) => handleInputChange('socialMediaPresence', e.target.value)}
            placeholder="Como a marca se apresenta nas redes sociais?"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            rows={3}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Relações Públicas
        </label>
        <textarea
          value={formData.publicRelations}
          onChange={(e) => handleInputChange('publicRelations', e.target.value)}
          placeholder="Como a marca se relaciona com a mídia e stakeholders?"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          rows={3}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Uso do Logo
          </label>
          <textarea
            value={formData.logoUsage}
            onChange={(e) => handleInputChange('logoUsage', e.target.value)}
            placeholder="Como o logo deve ser usado?"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            rows={3}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Paleta de Cores
          </label>
          <textarea
            value={formData.colorPalette}
            onChange={(e) => handleInputChange('colorPalette', e.target.value)}
            placeholder="Quais são as cores da marca?"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            rows={3}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tipografia
          </label>
          <textarea
            value={formData.typography}
            onChange={(e) => handleInputChange('typography', e.target.value)}
            placeholder="Quais fontes são utilizadas pela marca?"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            rows={3}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Voz da Marca
          </label>
          <textarea
            value={formData.brandVoice}
            onChange={(e) => handleInputChange('brandVoice', e.target.value)}
            placeholder="Como a marca 'fala' com o público?"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            rows={3}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Storytelling
        </label>
        <textarea
          value={formData.storytelling}
          onChange={(e) => handleInputChange('storytelling', e.target.value)}
          placeholder="Qual a história que a marca conta?"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          rows={3}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Comunicação de Crise
        </label>
        <textarea
          value={formData.crisisCommunication}
          onChange={(e) => handleInputChange('crisisCommunication', e.target.value)}
          placeholder="Como a marca se comunica em situações de crise?"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          rows={3}
        />
      </div>

      <div className="flex justify-end pt-4">
        <Button
          text="Salvar Expressão"
          type="submit"
          size="middle"
        />
      </div>
    </form>
  );
}
