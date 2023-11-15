// ResetButton.js
import React from 'react';
import './ResetButton.css';

const ResetButton = ({ onClick }) => {
  return (
    <button className="reset-button" onClick={onClick}>
      Reset
    </button>
  );
};

export default ResetButton;