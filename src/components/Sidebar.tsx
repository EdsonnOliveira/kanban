import OptionPage from './OptionPage';
import { useCompanyStore, Company } from '../store/useCompanyStore';

export default function Sidebar() {
  const { companies, selectedCompany, setSelectedCompany } = useCompanyStore();

  const handleSelectCompany = (company: Company) => {
    setSelectedCompany(company);
  };

  return (
    <div className="w-16 sm:w-20 md:w-24 h-full flex flex-col items-center gap-2 sm:gap-3">
      <div className="w-full h-12 sm:h-14 md:h-16 flex items-center justify-center font-bold text-black text-xs sm:text-sm md:text-base">
        <span className="hidden sm:block">LOGO</span>
        <span className="sm:hidden">L</span>
      </div>
      {companies.map((company, index) => (
        <OptionPage 
          key={index}
          image={company.image} 
          label={company.name} 
          isActive={selectedCompany?.name === company.name}
          onClick={() => handleSelectCompany(company)}
        />
      ))}
    </div>
  );
}
