import React from 'react';

const CommunicationMethodRow = ({ method, sequence, mandatory }) => {
  return (
    <div className="communication-method-row">
      <h3>{method}</h3>
      <p>Sequence: {sequence}</p>
      <p>{mandatory ? "Mandatory" : "Optional"}</p>
    </div>
  );
};

export default CommunicationMethodRow;
