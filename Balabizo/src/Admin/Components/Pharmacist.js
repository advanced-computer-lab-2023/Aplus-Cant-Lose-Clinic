// Pharmacist.js

import React from 'react';
import './Pharmacist.css'; // Import your CSS file for styling

const Pharmacist = ({ username, onRemove,onView,type }) => {
  return (
    <div className="pharmacist">
      
      <p>{username}</p>
      <button onClick={onRemove}>Remove</button>
      
      <button onClick={onView}>View</button>

    </div>
  );
};

export default Pharmacist;
