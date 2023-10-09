// PatientList.js

import React from 'react';
import './PatientList.css'; // Import your CSS file for styling
import Patient from './Patient'; // Assuming you have a Patient component

const PatientList = ({ patients, onRemove,onView }) => {
  return (
    <div className="patient-list">
      <h2>Patients List</h2>
      {patients.map((patient, index) => (
        <Patient key={index} username={patient.username} onRemove={() => onRemove(index)}  onView={() => onView('Info')} />
      ))}
    </div>
  );
};

export default PatientList;
