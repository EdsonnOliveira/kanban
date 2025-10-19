import Container from '../components/Container';
import { Video, MessageSquare, Send } from 'lucide-react';
import { useState } from 'react';

// Dados das salas de comunicação
const communicationRooms = [
  {
    id: 'geral',
    name: 'Geral',
    active: true
  },
  {
    id: 'estrategia',
    name: 'Estratégia',
    active: false
  },
  {
    id: 'execucao',
    name: 'Execução',
    active: false
  },
  {
    id: 'financeiro',
    name: 'Financeiro',
    active: false
  }
];

// Dados das mensagens (exemplo)
const messages = [
  {
    id: 1,
    user: 'Ana Silva',
    message: 'Bom dia pessoal! Como estão os projetos?',
    timestamp: '09:30',
    avatar: 'A'
  },
  {
    id: 2,
    user: 'Carlos Santos',
    message: 'Tudo certo por aqui! O projeto de e-commerce está no prazo.',
    timestamp: '09:32',
    avatar: 'C'
  },
  {
    id: 3,
    user: 'Maria Costa',
    message: 'Ótimo! Precisamos alinhar sobre o design da nova funcionalidade.',
    timestamp: '09:35',
    avatar: 'M'
  }
];

export default function AtividadesReunioes() {
  const [activeRoom, setActiveRoom] = useState('geral');
  const [newMessage, setNewMessage] = useState('');
  const [roomMessages, setRoomMessages] = useState(messages);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message = {
        id: roomMessages.length + 1,
        user: 'Você',
        message: newMessage,
        timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
        avatar: 'V'
      };
      setRoomMessages([...roomMessages, message]);
      setNewMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const getActiveRoomName = () => {
    const room = communicationRooms.find(room => room.id === activeRoom);
    return room ? `Sala ${room.name}` : 'Sala Geral';
  };

  return (
    <div className="w-full h-full flex gap-4">
      <Container
        icon={Video}
        title="Salas de Comunicação"
        description="Colabore em tempo real com sua equipe"
      >
        <div className="flex flex-col gap-6">
          {/* Tabs de Navegação */}
          <div className="flex gap-2">
            {communicationRooms.map((room) => (
              <button
                key={room.id}
                onClick={() => setActiveRoom(room.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeRoom === room.id
                    ? 'bg-gray-900 text-white'
                    : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
                }`}
              >
                {room.name}
              </button>
            ))}
          </div>

          {/* Área de Chat */}
          <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm flex-1 flex flex-col">
            {/* Header da Sala */}
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
              <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                <MessageSquare size={16} className="text-gray-600" />
              </div>
              <h3 className="font-semibold text-gray-900">{getActiveRoomName()}</h3>
            </div>

            {/* Área de Mensagens */}
            <div className="flex-1 overflow-y-auto mb-6 space-y-4">
              {roomMessages.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-gray-500">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <MessageSquare size={24} className="text-gray-400" />
                  </div>
                  <p className="text-sm">Nenhuma mensagem ainda. Seja o primeiro a conversar!</p>
                </div>
              ) : (
                roomMessages.map((message) => (
                  <div key={message.id} className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-sm font-medium text-gray-600">
                      {message.avatar}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-gray-900">{message.user}</span>
                        <span className="text-xs text-gray-500">{message.timestamp}</span>
                      </div>
                      <p className="text-gray-700 text-sm">{message.message}</p>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Input de Mensagem */}
            <div className="flex gap-3">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Digite sua mensagem..."
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                onClick={handleSendMessage}
                className="w-12 h-12 bg-gray-900 rounded-lg flex items-center justify-center text-white hover:bg-gray-800 transition-colors"
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
