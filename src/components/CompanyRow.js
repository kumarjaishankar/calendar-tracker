import React from 'react';

const CompanyRow = ({
  company,
  recentCommunications,
  nextCommunication,
  onCommunicationPerformed,
}) => {
  const renderRecentCommunications = () => {
    const communications = Array.isArray(recentCommunications) ? recentCommunications : [];
    return communications
      .slice(0, 5) 
      .map((comm, index) => (
        <div key={index} className="communication-summary">
          <span>{comm.type}</span> - <span>{comm.date}</span>
        </div>
      ));
  };

  return (
    <div className="company-row">
      <div className="company-info">
        <h3>{company.name}</h3>
        <p>{company.location}</p>
      </div>

      <div className="recent-communications">
        <h4>Recent Communications</h4>
        {renderRecentCommunications()}
      </div>

      <div className="next-communication">
        <h4>Next Scheduled Communication</h4>
        {nextCommunication ? (
          <>
            <span>{nextCommunication.type}</span> - <span>{nextCommunication.date}</span>
          </>
        ) : (
          <span>No upcoming communication</span>
        )}
      </div>

      <div className="action">
        <button onClick={() => onCommunicationPerformed(company)}>
          Communication Performed
        </button>
      </div>
    </div>
  );
};

export default CompanyRow;
