import React, { createContext, useState, useContext, ReactNode } from 'react';

// Define types
export interface Office {
  id: string;
  name: string;
  city: string;
}

interface OfficeContextType {
  offices: Office[];
  currentOffice: Office;
  changeOffice: (officeId: string) => void;
  userAccessLevel: 'superAdmin' | 'officeManager' | 'recruiter' | 'collaborator';
  hasMultipleOfficeAccess: boolean;
}

// Create default values
const defaultOffices: Office[] = [
  { id: '1', name: 'Montreal Office', city: 'Montreal' },
  { id: '2', name: 'Dubai Office', city: 'Dubai' },
  { id: '3', name: 'Istanbul Office', city: 'Istanbul' },
];

// Create context with default values
const OfficeContext = createContext<OfficeContextType>({
  offices: defaultOffices,
  currentOffice: defaultOffices[0],
  changeOffice: () => {},
  userAccessLevel: 'recruiter',
  hasMultipleOfficeAccess: false,
});

// Custom hook to use the office context
export const useOffice = () => useContext(OfficeContext);

interface OfficeProviderProps {
  children: ReactNode;
}

export const OfficeProvider: React.FC<OfficeProviderProps> = ({ children }) => {
  const [offices] = useState<Office[]>(defaultOffices);
  const [currentOffice, setCurrentOffice] = useState<Office>(offices[0]);
  
  // This would come from user authentication in a real app
  // For now, we'll hardcode a superAdmin role for demonstration
  const [userAccessLevel] = useState<'superAdmin' | 'officeManager' | 'recruiter' | 'collaborator'>('superAdmin');
  const [hasMultipleOfficeAccess] = useState<boolean>(true);

  const changeOffice = (officeId: string) => {
    const office = offices.find(o => o.id === officeId);
    if (office) {
      setCurrentOffice(office);
    }
  };

  return (
    <OfficeContext.Provider 
      value={{ 
        offices, 
        currentOffice, 
        changeOffice,
        userAccessLevel,
        hasMultipleOfficeAccess
      }}
    >
      {children}
    </OfficeContext.Provider>
  );
};
