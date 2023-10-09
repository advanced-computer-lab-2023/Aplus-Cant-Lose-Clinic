// PharmacistList.js

import React from 'react';
import './PharmacistList.css'; // Import your CSS file for styling
import Pharmacist from './Pharmacist'; // Assuming you have a Pharmacist component

const PharmacistList = ({ pharmacists, onRemove, onView, onReject, type }) => {
  return (
    <div className="pharmacist-list">
      <h2>Pharmacists List</h2>
      
      {pharmacists.map((pharmacist, index) => (
        <Pharmacist
          key={index}
          username={pharmacist.username}
          onRemove={() => onRemove(index)}
          onView={() => onView(type)}
          onReject={() => onReject()}
          type={type} // Pass the 'type' prop to the Pharmacist component
        />
      ))}
    </div>
  );
};

export default PharmacistList;

