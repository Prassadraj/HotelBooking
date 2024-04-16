import React, { useState } from 'react';
import './AlertMessage.css';

const AlertMessage = ({ message, onClose }) => {
  const [visible, setVisible] = useState(true);

  const handleClose = () => {
    setVisible(false);
    if (typeof onClose === 'function') {
      onClose();
    }
  };

  return visible ? (
    <div className="alert">
      <span>{message}</span>
      <button className="closeButton" onClick={handleClose}>
        &times;
      </button>
    </div>
  ) : null;
};

export default AlertMessage;
