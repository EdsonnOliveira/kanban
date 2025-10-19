import Container from '../components/Container';
import { Presentation } from 'lucide-react';
import { useState } from 'react';
import Button from '../components/Button';
import PitchDeckCard from '../components/PitchDeckCard';
import { usePitchDeckDrawerStore } from '../store/usePitchDeckDrawerStore';
import { Plus, Download, Share } from 'lucide-react';

// Interface para pitch decks
interface PitchDeck {
  id: string;
  title: string;
  description: string;
  type: 'evento' | 'conferencia' | 'campanha' | 'investimento' | 'produto' | 'outros';
  status: 'rascunho' | 'revisao' | 'finalizado' | 'apresentado';
  slides: number;
  lastModified: string;
  createdBy: string;
  tags: string[];
}

// Dados de exemplo dos pitch decks
const samplePitchDecks: PitchDeck[] = [
  {
    id: '1',
    title: 'Pitch de Investimento - Série A',
    description: 'Apresentação para captação de investimento da Série A',
    type: 'investimento',
    status: 'finalizado',
    slides: 15,
    lastModified: 'há 2 dias',
    createdBy: 'Ana Silva',
    tags: ['investimento', 'série-a', 'fintech']
  },
  {
    id: '2',
    title: 'Lançamento do Produto XYZ',
    description: 'Apresentação para lançamento do novo produto',
    type: 'produto',
    status: 'revisao',
    slides: 12,
    lastModified: 'há 1 semana',
    createdBy: 'Carlos Santos',
    tags: ['produto', 'lançamento', 'marketing']
  },
  {
    id: '3',
    title: 'Conferência Tech Summit 2024',
    description: 'Pitch para apresentação na conferência de tecnologia',
    type: 'conferencia',
    status: 'apresentado',
    slides: 20,
    lastModified: 'há 1 mês',
    createdBy: 'Maria Costa',
    tags: ['conferência', 'tecnologia', 'inovação']
  },
  {
    id: '4',
    title: 'Campanha de Marketing Digital',
    description: 'Apresentação da estratégia de marketing digital',
    type: 'campanha',
    status: 'rascunho',
    slides: 8,
    lastModified: 'há 3 dias',
    createdBy: 'Pedro Oliveira',
    tags: ['marketing', 'digital', 'estratégia']
  }
];

export default function FerramentasPitchDeck() {
  const [pitchDecks, setPitchDecks] = useState<PitchDeck[]>(samplePitchDecks);
  const [selectedDecks, setSelectedDecks] = useState<string[]>([]);
  const { openPitchDeckDrawer } = usePitchDeckDrawerStore();

  const handleCreatePitch = () => {
    openPitchDeckDrawer();
  };

  const handleEditPitch = (pitchId: string) => {
    console.log('Editar pitch deck:', pitchId);
    // Aqui você pode implementar a edição do pitch deck
  };

  const handleDeletePitch = (pitchId: string) => {
    setPitchDecks(prev => prev.filter(pitch => pitch.id !== pitchId));
  };

  const handleViewPitch = (pitchId: string) => {
    console.log('Visualizar pitch deck:', pitchId);
    // Aqui você pode implementar a visualização do pitch deck
  };

  const handleDownloadPitch = (pitchId: string) => {
    console.log('Download pitch deck:', pitchId);
    // Aqui você pode implementar o download do pitch deck
  };

  const handleSharePitch = (pitchId: string) => {
    console.log('Compartilhar pitch deck:', pitchId);
    // Aqui você pode implementar o compartilhamento do pitch deck
  };

  const handleSelectPitch = (pitchId: string) => {
    setSelectedDecks(prev => 
      prev.includes(pitchId) 
        ? prev.filter(id => id !== pitchId)
        : [...prev, pitchId]
    );
  };


  return (
    <div className="w-full h-full flex gap-4">
      <Container
        icon={Presentation}
        title="Pitch Deck"
        description="Crie e gerencie apresentações para eventos, conferências e campanhas."
      >
        <div className="flex flex-col gap-6">
          {/* Header com botão de criar */}
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Meus Pitch Decks</h2>
              <p className="text-sm text-gray-500">{pitchDecks.length} apresentações</p>
            </div>
            <div className="flex items-center gap-2">
                <Button
                    leftIcon={Plus}
                    text="Novo Pitch Deck"
                    onClick={handleCreatePitch}
                    size="small"
                />
            </div>
          </div>

          {/* Lista de Pitch Decks */}
          <div className="bg-white rounded-3xl border border-gray-200 shadow-sm">
            <div className="p-6">
              <div className="space-y-4">
                {pitchDecks.map((pitch) => (
                  <PitchDeckCard
                    key={pitch.id}
                    id={pitch.id}
                    title={pitch.title}
                    description={pitch.description}
                    type={pitch.type}
                    status={pitch.status}
                    slides={pitch.slides}
                    lastModified={pitch.lastModified}
                    createdBy={pitch.createdBy}
                    tags={pitch.tags}
                    isSelected={selectedDecks.includes(pitch.id)}
                    onSelect={handleSelectPitch}
                    onView={handleViewPitch}
                    onEdit={handleEditPitch}
                    onDownload={handleDownloadPitch}
                    onShare={handleSharePitch}
                    onDelete={handleDeletePitch}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Ações em lote (quando pitch decks estão selecionados) */}
          {selectedDecks.length > 0 && (
            <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-white rounded-2xl shadow-lg border border-gray-200 p-4 flex items-center gap-4">
              <span className="text-sm text-gray-600">
                {selectedDecks.length} pitch deck(s) selecionado(s)
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleDownloadPitch(selectedDecks.join(','))}
                  className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center transition-colors"
                  title="Download"
                >
                  <Download size={16} className="text-gray-600" />
                </button>
                <button
                  onClick={() => handleSharePitch(selectedDecks.join(','))}
                  className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center transition-colors"
                  title="Compartilhar"
                >
                  <Share size={16} className="text-gray-600" />
                </button>
                <button
                  onClick={() => setSelectedDecks([])}
                  className="text-sm text-gray-500 hover:text-gray-700"
                >
                  Cancelar
                </button>
              </div>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
}
