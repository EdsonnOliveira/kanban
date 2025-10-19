import Container from '../components/Container';
import { MessageSquare, Save } from 'lucide-react';
import { useState } from 'react';
import Button from '../components/Button';

export default function PlanosExpressao() {
  const [content, setContent] = useState('');

  const handleContentChange = (value: string) => {
    setContent(value);
  };

  const handleSave = () => {
    console.log('Salvando expressão:', content);
    // Aqui você pode implementar a lógica para salvar o conteúdo
    // Por exemplo, fazer uma chamada à API ou salvar no localStorage
  };

  return (
    <div className="w-full h-full flex gap-4">
      <Container
        icon={MessageSquare}
        title="Expressão"
        description="Defina e documente a expressão e comunicação da sua empresa."
      >
        <div className="flex flex-col gap-6">
          <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm">
            <div className="flex flex-col gap-4">
              <textarea
                value={content}
                onChange={(e) => handleContentChange(e.target.value)}
                placeholder="Digite aqui o conteúdo sobre a expressão e comunicação..."
                className="w-full h-96 p-4 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              />
              <div className="flex justify-end">
                <Button
                  text="Salvar"
                  leftIcon={Save}
                  onClick={handleSave}
                  size="small"
                  variant="square"
                />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
