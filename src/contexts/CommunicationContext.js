import React, { createContext, useState, useContext, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid'; 

export const CommunicationContext = createContext();

export const useCommunication = () => {
  return useContext(CommunicationContext);
};

export const CommunicationProvider = ({ children }) => {
  const [communications, setCommunications] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [communicationMethods, setCommunicationMethods] = useState([]);

  useEffect(() => {
    const mockCompanies = [
      {
        id: 1,
        name: 'Company A',
        location: 'New York',
        linkedin: 'https://linkedin.com/company-a',
        emails: ['contact@companya.com'],
        phoneNumbers: ['123-456-7890'],
        comments: 'A key partner for collaborations.',
        communicationPeriodicity: '2 weeks',
      },
      {
        id: 2,
        name: 'Company B',
        location: 'London',
        linkedin: 'https://linkedin.com/company-b',
        emails: ['info@companyb.com'],
        phoneNumbers: ['987-654-3210'],
        comments: 'Looking for more leads.',
        communicationPeriodicity: '1 month',
      },
    ];

    const mockCommunications = [
      {
        id: uuidv4(),
        companyId: 1,
        type: 'LinkedIn Post',
        date: '2024-12-15',
        notes: 'Initial outreach',
      },
      {
        id: uuidv4(),
        companyId: 2,
        type: 'Email',
        date: '2024-12-20',
        notes: 'Follow-up on partnership',
      },
    ];

    setCompanies(mockCompanies);
    setCommunications(mockCommunications);
  }, []);

  const addCompany = (company) => {
    if (!company || !company.name) {
      console.error('Invalid company data:', company);
      return;
    }
    setCompanies([...companies, { ...company, id: uuidv4() }]);
  };

  const updateCompany = (updatedCompany) => {
    if (!updatedCompany || !updatedCompany.id) {
      console.error('Invalid updated company data:', updatedCompany);
      return;
    }
    setCompanies(
      companies.map((company) =>
        company.id === updatedCompany.id ? updatedCompany : company
      )
    );
  };

  const deleteCompany = (companyId) => {
    if (!companyId) {
      console.error('Invalid company ID:', companyId);
      return;
    }
    setCompanies(companies.filter((company) => company.id !== companyId));
    setCommunications(
      communications.filter((communication) => communication.companyId !== companyId)
    );
  };

  const addCommunication = (companyId, type, date, notes) => {
    if (!companyId || !type || !date || !notes) {
      console.error('Invalid communication data:', { companyId, type, date, notes });
      return;
    }
    const newCommunication = {
      id: uuidv4(),
      companyId,
      type,
      date,
      notes,
    };
    setCommunications([...communications, newCommunication]);
  };

  const getCompanyCommunications = (companyId) => {
    if (!companyId) {
      console.error('Invalid company ID for communications:', companyId);
      return [];
    }
    return communications.filter((comm) => comm.companyId === companyId);
  };

  const addCommunicationMethod = (method) => {
    if (!method || !method.name) {
      console.error('Invalid communication method:', method);
      return;
    }
    setCommunicationMethods([...communicationMethods, method]);
  };

  const value = {
    companies,
    communications,
    communicationMethods,
    addCompany,
    updateCompany,
    deleteCompany,
    addCommunication,
    getCompanyCommunications,
    addCommunicationMethod,
  };

  return (
    <CommunicationContext.Provider value={value}>
      {children}
    </CommunicationContext.Provider>
  );
};
