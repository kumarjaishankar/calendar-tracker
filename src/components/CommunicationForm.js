import React, { useState } from 'react';

const CommunicationForm = ({ onSubmit, companies, onClose }) => {
  const [company, setCompany] = useState('');
  const [communicationType, setCommunicationType] = useState('');
  const [communicationDate, setCommunicationDate] = useState('');
  const [notes, setNotes] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!company || !communicationType || !communicationDate) {
      alert('Please fill out all required fields.');
      return;
    }

    const newCommunication = {
      company,
      communicationType,
      communicationDate,
      notes,
    };

    onSubmit(newCommunication);
    onClose(); 
  };

  return (
    <div className="communication-form">
      <h2>Log Communication</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="company">Company</label>
          <select
            id="company"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            required
          >
            <option value="">Select Company</option>
            {companies.map((company) => (
              <option key={company.id} value={company.name}>
                {company.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="communicationType">Communication Type</label>
          <select
            id="communicationType"
            value={communicationType}
            onChange={(e) => setCommunicationType(e.target.value)}
            required
          >
            <option value="">Select Communication Type</option>
            <option value="LinkedIn Post">LinkedIn Post</option>
            <option value="LinkedIn Message">LinkedIn Message</option>
            <option value="Email">Email</option>
            <option value="Phone Call">Phone Call</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="communicationDate">Date</label>
          <input
            type="date"
            id="communicationDate"
            value={communicationDate}
            onChange={(e) => setCommunicationDate(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="notes">Notes</label>
          <textarea
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Additional comments about the communication"
          />
        </div>

        <div className="form-group">
          <button type="submit">Log Communication</button>
          <button type="button" onClick={onClose}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default CommunicationForm;
