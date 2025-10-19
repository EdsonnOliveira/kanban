
import Container from '../components/Container';
import { Brain } from 'lucide-react';

export default function Dashboard() {

  return (
    <div className="w-full h-full flex gap-4">
      <Container
        icon={Brain}
        title="Gerencie seus projetos"
        description="Crie, edite e gerencie seus projetos de forma simples e eficiente."
      >
        <div className=""></div>
      </Container>
    </div>
  );
}
