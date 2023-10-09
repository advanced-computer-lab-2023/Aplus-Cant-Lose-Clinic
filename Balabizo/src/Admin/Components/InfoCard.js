import React from 'react';
import './InfoCard.css';

const InfoCard = ({ info, type, onAccept, onReject, onClose }) => {
  return (
    <div className="info-card">
      <ul>
        {info.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
      {console.log(type)}
      {type === 'request' ? (
        <div className="action-buttons">
          <button onClick={onAccept}>Accept</button>
          <button onClick={onReject}>Reject</button>
        </div>
      ) : (
        <button onClick={onClose}>Close</button>
      )}
    </div>
  );
};

export default InfoCard;
