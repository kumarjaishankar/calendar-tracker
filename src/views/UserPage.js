import React, { useState, useEffect, useContext } from 'react';
import { CommunicationContext } from '../contexts/CommunicationContext';
import CompanyRow from '../components/CompanyRow';
import NotificationIcon from '../components/NotificationIcon';
import CalendarView from '../components/CalendarView';
import CommunicationForm from '../components/CommunicationForm';
import './user.css'; // 

const UserPage = () => {
  const { companies, communications, addCommunication, removeCommunication } = useContext(CommunicationContext);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [notificationCount, setNotificationCount] = useState(0);

  useEffect(() => {
    const overdueCount = communications.filter(
      (comm) => new Date(comm.dueDate) < new Date() && !comm.completed
    ).length;
    const dueTodayCount = communications.filter(
      (comm) => new Date(comm.dueDate).toLocaleDateString() === new Date().toLocaleDateString() && !comm.completed
    ).length;

    setNotificationCount(overdueCount + dueTodayCount);
  }, [communications]);

  const handleCommunicationPerformed = (companyId, communicationData) => {
    addCommunication(companyId, communicationData);
    setSelectedCompany(null); 
  };

  const handleCommunicationRemoval = (companyId, communicationId) => {
    removeCommunication(companyId, communicationId);
  };

  return (
    <div className="user-page">
      <header className="user-page-header">
        <h1>User Dashboard</h1>
        <NotificationIcon count={notificationCount} className="notification-icon" />
      </header>

      <div className="company-section">
        <h2>Companies</h2>
        <div className="company-list">
          {companies.length > 0 ? (
            companies.map((company) => (
              <CompanyRow
                key={company.id}
                company={company}
                communications={communications.filter((comm) => comm.companyId === company.id)}
                onCommunicationPerformed={handleCommunicationPerformed}
                onCommunicationRemoval={handleCommunicationRemoval}
                className="company-row"
              />
            ))
          ) : (
            <p>No companies found.</p>
          )}
        </div>
      </div>

      <div className="calendar-section">
        <h2>Upcoming Communications</h2>
        <CalendarView className="calendar-view" />
      </div>

      {selectedCompany && (
        <CommunicationForm
          company={selectedCompany}
          onSubmit={handleCommunicationPerformed}
          onClose={() => setSelectedCompany(null)}
          className="communication-form"
        />
      )}
    </div>
  );
};

export default UserPage;
