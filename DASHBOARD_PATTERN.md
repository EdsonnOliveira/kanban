# Padrão de Dashboards - Telas "Geral"

## Visão Geral

Todas as telas "Geral" do sistema seguem um padrão consistente de **dashboard**, fornecendo uma visão abrangente e organizada das informações mais importantes de cada seção.

## Estrutura Padrão

### 1. Container Principal
- **Componente**: `Container`
- **Banner**: Ícone, título e descrição da seção
- **Scroll**: Todo o conteúdo é scrollável
- **Layout**: Flexbox com gap responsivo

### 2. Métricas (Top Row)
- **Posição**: Primeira linha do dashboard
- **Layout**: Grid responsivo (1 coluna em mobile, 2 em tablet, 4 em desktop)
- **Componente**: `Box` com `hideHeader={true}`
- **Conteúdo**: 
  - Números principais
  - Indicadores de mudança
  - Ícones representativos
  - Cores semânticas

### 3. Conteúdo Principal (Bottom Row)
- **Layout**: Grid responsivo (1 coluna em mobile, 2-3 em desktop)
- **Componente**: `Box` com header completo
- **Seções típicas**:
  - Lista principal de itens
  - Atividades recentes
  - Ações rápidas

## Componentes Utilizados

### Box
- **Header**: Título + botões de ação
- **Filtros**: Select para filtrar conteúdo (opcional)
- **Valor**: Badge com número importante (opcional)
- **Children**: Conteúdo específico de cada card

### Button
- **Variante**: `square` (rounded-lg) para headers
- **Tamanho**: `small` para headers
- **Ícones**: Lucide React icons
- **Ações**: Operações comuns da seção

### Select
- **Uso**: Filtros nos headers dos cards
- **Tamanho**: `small`
- **Estilo**: Integrado ao design system

## Exemplos de Dashboards

### Projetos
- **Métricas**: Projetos Ativos, Concluídos, Em Atraso, Membros
- **Lista**: Projetos com progresso, status, equipe
- **Atividades**: Ações recentes dos usuários

### Atividades
- **Métricas**: Status do Produto, Membros, Tarefas
- **Lista**: Projetos em andamento
- **Atividades**: Tarefas de hoje, status dos membros

### Planos
- **Métricas**: Planos Ativos, Concluídos, Em Revisão
- **Lista**: Planos com status e responsáveis
- **Atividades**: Atualizações recentes

### Clientes
- **Métricas**: Clientes Ativos, Novos, Satisfação
- **Lista**: Clientes com informações de contato
- **Atividades**: Interações recentes

## Padrões de Design

### Cores
- **Azul**: Projetos ativos, ações principais
- **Verde**: Concluído, sucesso
- **Laranja**: Em andamento, atenção
- **Vermelho**: Atraso, erro
- **Roxo**: Membros, usuários

### Tipografia
- **Títulos**: `text-lg font-semibold`
- **Valores**: `text-2xl font-bold`
- **Labels**: `text-sm text-gray-600`
- **Descrições**: `text-sm text-gray-500`

### Espaçamento
- **Gap entre cards**: `gap-6`
- **Padding interno**: `p-4` ou `p-6`
- **Margem entre itens**: `space-y-4`

## Responsividade

### Mobile (< 768px)
- 1 coluna para métricas
- 1 coluna para conteúdo principal
- Cards empilhados verticalmente

### Tablet (768px - 1024px)
- 2 colunas para métricas
- 2 colunas para conteúdo principal
- Layout adaptativo

### Desktop (> 1024px)
- 4 colunas para métricas
- 3 colunas para conteúdo principal
- Layout otimizado

## Boas Práticas

### Dados
- **Arrays locais**: Dados mockados no próprio arquivo
- **Estrutura consistente**: Mesmo padrão de objetos
- **Nomes descritivos**: Variáveis claras e objetivas

### Interatividade
- **Console.log**: Para ações de botões (temporário)
- **Hover states**: Transições suaves
- **Loading states**: Preparado para implementação futura

### Acessibilidade
- **Contraste**: Cores com contraste adequado
- **Foco**: Estados de foco visíveis
- **Semântica**: HTML semântico correto

## Implementação

### Estrutura de Arquivo
```typescript
// 1. Imports
import Container from '../components/Container';
import { Icon1, Icon2 } from 'lucide-react';
import Box from '../components/Box';

// 2. Dados mockados
const data = [...];

// 3. Componente principal
export default function PageName() {
  return (
    <div className="w-full h-full flex gap-4">
      <Container icon={Icon} title="..." description="...">
        <div className="flex flex-col gap-6">
          {/* Métricas */}
          {/* Conteúdo Principal */}
        </div>
      </Container>
    </div>
  );
}
```

### Checklist de Implementação
- [ ] Container com banner
- [ ] Métricas no topo (4 cards)
- [ ] Conteúdo principal em grid
- [ ] Botões de ação funcionais
- [ ] Dados mockados organizados
- [ ] Responsividade testada
- [ ] Cores semânticas aplicadas
- [ ] Ícones apropriados
- [ ] Textos em português

## Manutenção

### Atualizações
- **Dados**: Modificar arrays locais
- **Layout**: Ajustar classes Tailwind
- **Componentes**: Usar componentes existentes
- **Estilos**: Seguir design system

### Extensibilidade
- **Novos cards**: Adicionar Box components
- **Novas métricas**: Expandir grid de métricas
- **Filtros**: Adicionar Select components
- **Ações**: Implementar handlers reais

---

**Nota**: Este padrão garante consistência visual e funcional em todas as telas "Geral" do sistema, proporcionando uma experiência de usuário coesa e intuitiva.
