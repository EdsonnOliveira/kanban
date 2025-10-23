import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import Sidebar from "../components/Sidebar";
import Drawers from "../components/drawers";
import PanelLeft from "@/components/PanelLeft";
import { useCompanyStore } from "@/store/useCompanyStore";
import { useNavigationStore } from "@/store/useNavigationStore";
import { useProjectStore } from "@/store/useProjectStore";
import { useActivityStore } from "@/store/useActivityStore";
import { useDocumentDrawerStore } from "@/store/useDocumentDrawerStore";
import { useClientDrawerStore } from "@/store/useClientDrawerStore";
import { useEventDrawerStore } from "@/store/useEventDrawerStore";
import { usePitchDeckDrawerStore } from "@/store/usePitchDeckDrawerStore";
import { useBusinessModelCanvasDrawerStore } from "@/store/useBusinessModelCanvasDrawerStore";
import { useIdealCustomerProfileDrawerStore } from "@/store/useIdealCustomerProfileDrawerStore";
import { useSWOTDrawerStore } from "@/store/useSWOTDrawerStore";
import { usePlanDrawerStore } from "@/store/usePlanDrawerStore";
import { Plus } from "lucide-react";
import Dashboard from "./dashboard";
import Tarefas from "./tarefas";
import Atividades from "./atividades";
import AtividadesReunioes from "./atividades-reunioes";
import AtividadesCronograma from "./atividades-cronograma";
import Projetos from "./projetos";
import Planos from "./planos";
import PlanosExpressaoNova from "./planos-expressao-nova";
import Clientes from "./clientes";
import DocumentosPastas from "./documentos-pastas";
import DocumentosArquivos from "./documentos-arquivos";
import DocumentosRecentes from "./documentos-recentes";
import FerramentasPitchDeck from "./ferramentas-pitch-deck";
import FerramentasBusinessModelCanvas from "./ferramentas-business-model-canvas";
import FerramentasIdealCustomerProfile from "./ferramentas-ideal-customer-profile";
import FerramentasSWOT from "./ferramentas-swot";

function MainShell() {
  const router = useRouter();
  const { selectedCompany } = useCompanyStore();
  const { currentPage } = useNavigationStore();
  const { openProjectsDrawer } = useProjectStore();
  const { openActivitiesDrawer } = useActivityStore();
  const { openDocumentDrawerSelector } = useDocumentDrawerStore();
  const { openClientDrawer } = useClientDrawerStore();
  const { openEventDrawer } = useEventDrawerStore();
  const { openPitchDeckDrawer } = usePitchDeckDrawerStore();
  const { openBusinessModelCanvasDrawer } = useBusinessModelCanvasDrawerStore();
  const { openIdealCustomerProfileDrawer } = useIdealCustomerProfileDrawerStore();
  const { openSWOTDrawer } = useSWOTDrawerStore();
  const { openPlanDrawer } = usePlanDrawerStore();

  const getActionButtonForPage = (page: string) => {
    switch (page) {
      case 'planos':
      case 'planos-expressao-nova':
        return { icon: Plus, text: "Novo Plano", onClick: () => openPlanDrawer() };
      case 'projetos':
        return { icon: Plus, text: "Novo Projeto", onClick: () => openProjectsDrawer() };
      case 'atividades':
      case 'tarefas':
      case 'atividades-reunioes':
        return { icon: Plus, text: "Nova Atividade", onClick: () => openActivitiesDrawer() };
      case 'atividades-cronograma':
        return { icon: Plus, text: "Novo Evento", onClick: () => openEventDrawer() };
      case 'documentos-pastas':
      case 'documentos-recentes':
        return { icon: Plus, text: "Novo Documento", onClick: () => openDocumentDrawerSelector() };
      case 'clientes':
        return { icon: Plus, text: "Novo Cliente", onClick: () => openClientDrawer() };
      case 'ferramentas-pitch-deck':
        return { icon: Plus, text: "Novo Pitch Deck", onClick: () => openPitchDeckDrawer() };
      case 'ferramentas-business-model-canvas':
        return { icon: Plus, text: "Novo Canvas", onClick: () => openBusinessModelCanvasDrawer() };
      case 'ferramentas-ideal-customer-profile':
        return { icon: Plus, text: "Novo ICP", onClick: () => openIdealCustomerProfileDrawer() };
      case 'ferramentas-swot':
        return { icon: Plus, text: "Nova Análise", onClick: () => openSWOTDrawer() };
      default:
        return null;
    }
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'tarefas':
        return <Tarefas />;
      case 'atividades':
        return <Atividades />;
      case 'atividades-reunioes':
        return <AtividadesReunioes />;
      case 'atividades-cronograma':
        return <AtividadesCronograma />;
      case 'projetos':
        return <Projetos />;
      case 'planos':
        return <Planos />;
      case 'planos-expressao-nova':
        return <PlanosExpressaoNova />;
      case 'clientes':
        return <Clientes />;
      case 'documentos-pastas':
        return <DocumentosPastas />;
      case 'documentos-arquivos':
        return <DocumentosArquivos />;
      case 'documentos-recentes':
        return <DocumentosRecentes />;
      case 'ferramentas-pitch-deck':
        return <FerramentasPitchDeck />;
      case 'ferramentas-business-model-canvas':
        return <FerramentasBusinessModelCanvas />;
      case 'ferramentas-ideal-customer-profile':
        return <FerramentasIdealCustomerProfile />;
      case 'ferramentas-swot':
        return <FerramentasSWOT />;
      case 'dashboard':
      default:
        return <Dashboard />;
    }
  };

  const showSidebar = router.pathname !== "/";

  return (
    <div className="h-screen w-screen bg-[#E8F2FE] flex flex-col md:flex-row">
      {showSidebar && <Sidebar />}
      <div className="w-full h-[calc(100vh-2rem)] flex flex-col md:flex-row gap-4 bg-white m-4 ml-0 p-4 rounded-3xl text-black shadow-xs">
        {selectedCompany && (
          <PanelLeft
            title={selectedCompany?.name}
            buttonText={getActionButtonForPage(currentPage)?.text || "+ Novo membro"}
            buttonIcon={getActionButtonForPage(currentPage)?.icon}
            buttonOnClick={getActionButtonForPage(currentPage)?.onClick}
          />
        )}
        {renderCurrentPage()}
      </div>
      <Drawers />
    </div>
  );
}

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  if (router.pathname === "/") {
    return <Component {...pageProps} />;
  }
  return <MainShell />;
}
