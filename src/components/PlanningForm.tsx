import { useState } from 'react';
import Button from './Button';

export default function PlanningForm() {
  const [formData, setFormData] = useState({
    strategicObjectives: '',
    shortTermGoals: '',
    longTermGoals: '',
    keyInitiatives: '',
    resourceAllocation: '',
    timeline: '',
    riskAssessment: '',
    successMetrics: '',
    budgetPlanning: '',
    stakeholderInvolvement: '',
    marketAnalysis: '',
    competitiveAnalysis: '',
    swotAnalysis: '',
    actionPlan: '',
    performanceIndicators: '',
    contingencyPlan: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Dados do planejamento:', formData);
    // Aqui você pode salvar os dados
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Objetivos Estratégicos
        </label>
        <textarea
          value={formData.strategicObjectives}
          onChange={(e) => handleInputChange('strategicObjectives', e.target.value)}
          placeholder="Quais são os principais objetivos estratégicos da empresa?"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          rows={3}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Metas de Curto Prazo (1-2 anos)
          </label>
          <textarea
            value={formData.shortTermGoals}
            onChange={(e) => handleInputChange('shortTermGoals', e.target.value)}
            placeholder="Quais são as metas para os próximos 1-2 anos?"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            rows={3}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Metas de Longo Prazo (3-5 anos)
          </label>
          <textarea
            value={formData.longTermGoals}
            onChange={(e) => handleInputChange('longTermGoals', e.target.value)}
            placeholder="Quais são as metas para os próximos 3-5 anos?"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            rows={3}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Iniciativas Principais
        </label>
        <textarea
          value={formData.keyInitiatives}
          onChange={(e) => handleInputChange('keyInitiatives', e.target.value)}
          placeholder="Quais são as principais iniciativas para alcançar os objetivos?"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          rows={3}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Alocação de Recursos
          </label>
          <textarea
            value={formData.resourceAllocation}
            onChange={(e) => handleInputChange('resourceAllocation', e.target.value)}
            placeholder="Como os recursos serão alocados para cada iniciativa?"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            rows={3}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Cronograma
          </label>
          <textarea
            value={formData.timeline}
            onChange={(e) => handleInputChange('timeline', e.target.value)}
            placeholder="Qual o cronograma para execução das iniciativas?"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            rows={3}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Avaliação de Riscos
        </label>
        <textarea
          value={formData.riskAssessment}
          onChange={(e) => handleInputChange('riskAssessment', e.target.value)}
          placeholder="Quais são os principais riscos e como serão mitigados?"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          rows={3}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Métricas de Sucesso
          </label>
          <textarea
            value={formData.successMetrics}
            onChange={(e) => handleInputChange('successMetrics', e.target.value)}
            placeholder="Como será medido o sucesso de cada iniciativa?"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            rows={3}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Planejamento Orçamentário
          </label>
          <textarea
            value={formData.budgetPlanning}
            onChange={(e) => handleInputChange('budgetPlanning', e.target.value)}
            placeholder="Qual o orçamento necessário para cada iniciativa?"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            rows={3}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Envolvimento das Partes Interessadas
        </label>
        <textarea
          value={formData.stakeholderInvolvement}
          onChange={(e) => handleInputChange('stakeholderInvolvement', e.target.value)}
          placeholder="Quais stakeholders estarão envolvidos no planejamento?"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          rows={3}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Análise de Mercado
          </label>
          <textarea
            value={formData.marketAnalysis}
            onChange={(e) => handleInputChange('marketAnalysis', e.target.value)}
            placeholder="Como está o mercado atual?"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            rows={3}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Análise Competitiva
          </label>
          <textarea
            value={formData.competitiveAnalysis}
            onChange={(e) => handleInputChange('competitiveAnalysis', e.target.value)}
            placeholder="Quem são os principais concorrentes?"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            rows={3}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Análise SWOT
        </label>
        <textarea
          value={formData.swotAnalysis}
          onChange={(e) => handleInputChange('swotAnalysis', e.target.value)}
          placeholder="Forças, Fraquezas, Oportunidades e Ameaças"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          rows={3}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Plano de Ação
          </label>
          <textarea
            value={formData.actionPlan}
            onChange={(e) => handleInputChange('actionPlan', e.target.value)}
            placeholder="Quais são as ações específicas a serem tomadas?"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            rows={3}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Indicadores de Performance
          </label>
          <textarea
            value={formData.performanceIndicators}
            onChange={(e) => handleInputChange('performanceIndicators', e.target.value)}
            placeholder="Quais KPIs serão acompanhados?"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            rows={3}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Plano de Contingência
        </label>
        <textarea
          value={formData.contingencyPlan}
          onChange={(e) => handleInputChange('contingencyPlan', e.target.value)}
          placeholder="O que fazer se algo der errado?"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          rows={3}
        />
      </div>

      <div className="flex justify-end pt-4">
        <Button
          text="Salvar Planejamento"
          type="submit"
          size="middle"
        />
      </div>
    </form>
  );
}
