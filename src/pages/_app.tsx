import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import Sidebar from "../components/Sidebar";
import Drawers from "../components/drawers";
import PanelLeft from "@/components/PanelLeft";
import { useCompanyStore } from "@/store/useCompanyStore";
import { useNavigationStore } from "@/store/useNavigationStore";
import Dashboard from "./dashboard";
import Tarefas from "./tarefas";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const { selectedCompany } = useCompanyStore();
  const { currentPage } = useNavigationStore();

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'tarefas':
        return <Tarefas />;
      case 'dashboard':
      default:
        return <Dashboard />;
    }
  };
  
  const showSidebar = router.pathname !== "/";

  return (
    <div className="h-screen w-screen bg-[#E8F2FE] flex">
      {showSidebar && <Sidebar />}
      <div className="w-full h-[calc(100vh-2rem)] flex gap-4 bg-white m-4 ml-0 p-4 rounded-3xl text-black shadow-xs">
        {selectedCompany && (
          <PanelLeft
            title={selectedCompany?.name}
            buttonText="+ Novo membro"
          />
        )}
        {renderCurrentPage()}
      </div>
      <Drawers />
    </div>
  );
}
