import React, { useState, useContext, useEffect } from 'react';
import { CommunicationContext } from '../contexts/CommunicationContext';
import NotificationIcon from '../components/NotificationIcon';
import CompanyRow from '../components/CompanyRow';
import './admin.css'; 

const AdminPage = () => {
  const {
    companies,
    addCompany,
    updateCompany,
    deleteCompany,
  } = useContext(CommunicationContext);

  const [newCompany, setNewCompany] = useState({
    name: '',
    location: '',
    linkedin: '',
    emails: '',
    phoneNumbers: '',
    comments: '',
    communicationPeriodicity: '2 weeks',
  });

  const [isEditing, setIsEditing] = useState(false);
  const [currentCompanyId, setCurrentCompanyId] = useState(null);

  useEffect(() => {
    if (isEditing && currentCompanyId !== null) {
      const companyToEdit = companies.find((company) => company.id === currentCompanyId);
      if (companyToEdit) {
        setNewCompany(companyToEdit);
      }
    }
  }, [isEditing, currentCompanyId, companies]);

  const validateCompany = () => {
    const { name, emails, phoneNumbers } = newCompany;
    if (!name.trim()) return 'Company name cannot be empty.';
    if (!emails.split(',').every((email) => email.includes('@'))) return 'Please enter valid email addresses.';
    if (!phoneNumbers.split(',').every((number) => !isNaN(number))) return 'Please enter valid phone numbers.';
    return '';
  };

  const handleAddCompany = (e) => {
    e.preventDefault();
    const error = validateCompany();
    if (error) {
      console.error(error);
      return;
    }

    if (isEditing) {
      updateCompany(newCompany);
    } else {
      addCompany(newCompany);
    }

    setNewCompany({
      name: '',
      location: '',
      linkedin: '',
      emails: '',
      phoneNumbers: '',
      comments: '',
      communicationPeriodicity: '2 weeks',
    });
    setIsEditing(false);
    setCurrentCompanyId(null);
  };

  const handleDeleteCompany = (companyId) => {
    deleteCompany(companyId);
  };

  return (
    <div className="admin-page">
      <h1>Admin Dashboard</h1>
      <NotificationIcon className="notification-icon" />
      <div className="form-container">
        <h2>Manage Companies</h2>
        <form onSubmit={handleAddCompany}>
          <input
            type="text"
            placeholder="Company Name"
            value={newCompany.name}
            onChange={(e) => setNewCompany({ ...newCompany, name: e.target.value })}
          />
          <input
            type="text"
            placeholder="Location"
            value={newCompany.location}
            onChange={(e) => setNewCompany({ ...newCompany, location: e.target.value })}
          />
          <input
            type="text"
            placeholder="LinkedIn"
            value={newCompany.linkedin}
            onChange={(e) => setNewCompany({ ...newCompany, linkedin: e.target.value })}
          />
          <input
            type="text"
            placeholder="Emails (comma separated)"
            value={newCompany.emails}
            onChange={(e) => setNewCompany({ ...newCompany, emails: e.target.value })}
          />
          <input
            type="text"
            placeholder="Phone Numbers (comma separated)"
            value={newCompany.phoneNumbers}
            onChange={(e) => setNewCompany({ ...newCompany, phoneNumbers: e.target.value })}
          />
          <textarea
            placeholder="Comments"
            value={newCompany.comments}
            onChange={(e) => setNewCompany({ ...newCompany, comments: e.target.value })}
          />
          <select
            value={newCompany.communicationPeriodicity}
            onChange={(e) => setNewCompany({ ...newCompany, communicationPeriodicity: e.target.value })}
          >
            <option value="2 weeks">Every 2 weeks</option>
            <option value="1 month">Every 1 month</option>
            <option value="3 months">Every 3 months</option>
          </select>
          <button type="submit">{isEditing ? 'Update Company' : 'Add Company'}</button>
        </form>
      </div>
      <h3>Company List</h3>
      <div className="company-list">
        {Array.isArray(companies) && companies.length > 0 ? (
          companies.map((company) => (
            <CompanyRow
              key={company.id}
              company={company}
              onDelete={handleDeleteCompany}
              onEdit={() => {
                setIsEditing(true);
                setCurrentCompanyId(company.id);
              }}
            />
          ))
        ) : (
          <p>No companies available.</p>
        )}
      </div>
    </div>
  );
};

export default AdminPage;
