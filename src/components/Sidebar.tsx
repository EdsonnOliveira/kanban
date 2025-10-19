import { useRouter } from 'next/router';
import OptionPage from './OptionPage';
import { useCompanyStore, Company } from '../store/useCompanyStore';

export default function Sidebar() {
  const router = useRouter();
  const { companies, selectedCompany, setSelectedCompany } = useCompanyStore();

  const handleSelectCompany = (company: Company) => {
    setSelectedCompany(company);
  };

  return (
    <div className="w-24 h-full flex flex-col items-center gap-3">
      <div className="w-full h-16 flex items-center justify-center font-bold text-black">
        LOGO
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
