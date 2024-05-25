import React from 'react';
import './Contact.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const Contact = ({ user, onClose ,context}) => {
  if (!user) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
        <h2>Contact Information</h2>
        <p>Name  : {user.firstName} {user.lastName}</p>
        <p>Email : {user.email}</p>
        <p>Phone : {user.phone}</p>
      </div>
    </div>
  );
};

export default Contact;
