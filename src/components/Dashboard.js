import React, { useState } from 'react';
import CompanyRow from './CompanyRow';
import CommunicationForm from './CommunicationForm';

const Dashboard = () => {
  const [showForm, setShowForm] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);

  const companies = [
    {
      id: 1,
      name: 'Company A',
      location: 'New York',
      email: 'contact@companya.com',
      phone: '123-456-7890',
      comments: 'Potential partner in 2024',
      communicationPeriodicity: '2 weeks',
    },
    {
      id: 2,
      name: 'Company B',
      location: 'San Francisco',
      email: 'contact@companyb.com',
      phone: '987-654-3210',
      comments: 'Ongoing communication about collaboration',
      communicationPeriodicity: '1 month',
    },
  ];

  const recentCommunications = [
    { companyId: 1, type: 'Email', date: '2024-12-01' },
    { companyId: 1, type: 'LinkedIn Message', date: '2024-12-10' },
    { companyId: 2, type: 'Phone Call', date: '2024-12-12' },
  ];

  const nextCommunication = [
    { companyId: 1, type: 'Phone Call', date: '2024-12-15' },
    { companyId: 2, type: 'LinkedIn Post', date: '2024-12-18' },
  ];

  const handleCommunicationPerformed = (company) => {
    setSelectedCompany(company);
    setShowForm(true);
  };

  const handleFormClose = () => setShowForm(false);

  const handleLogCommunication = (communicationData) => {
    console.log('Logged communication:', communicationData);
    setShowForm(false);
  };

  const getCompanyRecentCommunications = (companyId) => {
    return recentCommunications.filter((comm) => comm.companyId === companyId);
  };

  const getNextCommunication = (companyId) => {
    return nextCommunication.find((comm) => comm.companyId === companyId);
  };

  return (
    <div className="dashboard">
      <h2>Dashboard</h2>

      <div className="company-list">
        {companies.map((company) => (
          <CompanyRow
            key={company.id}
            company={company}
            recentCommunications={getCompanyRecentCommunications(company.id)}
            nextCommunication={getNextCommunication(company.id)}
            onCommunicationPerformed={handleCommunicationPerformed}
          />
        ))}
      </div>

      {showForm && (
        <CommunicationForm
          onSubmit={handleLogCommunication}
          companies={companies}
          onClose={handleFormClose}
        />
      )}
    </div>
  );
};

export default Dashboard;
