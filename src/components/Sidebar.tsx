import OptionPage from './OptionPage';
import { useCompanyStore, Company } from '../store/useCompanyStore';

export default function Sidebar() {
  const { companies, selectedCompany, setSelectedCompany } = useCompanyStore();

  const handleSelectCompany = (company: Company) => {
    setSelectedCompany(company);
  };

  return (
    <div className="w-full sm:w-20 md:w-24 h-16 md:h-full flex flex-row md:flex-col items-center gap-2 sm:gap-3">
      <div className="md:w-full p-4 md:p-0 h-12 sm:h-14 md:h-16 flex items-center justify-center font-bold text-black text-xs sm:text-sm md:text-base">
        <span>LOGO</span>
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
