import React from 'react';
import { useNavigate } from 'react-router-dom';
import './SelectType.css';

const SelectUserTypePage = () => {
  const navigate = useNavigate();

  const handleInvestorClick = () => {
    navigate('/signup/investor');
  };

  const handleStartupperClick = () => {
    navigate('/signup/startupper');
  };

  return (
    <div className="select-type-container">
      <h2 className="select-type-title">Select your type</h2>
      <div className='select-type-buttons'>
      <button className="select-type-button investor-button" onClick={handleInvestorClick}>Investor</button>
      <button className="select-type-button startupper-button" onClick={handleStartupperClick}>Startupper</button>
      </div>
    </div>
  );
};

export default SelectUserTypePage;
