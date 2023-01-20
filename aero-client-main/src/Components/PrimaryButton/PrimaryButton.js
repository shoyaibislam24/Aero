import React from 'react';

const PrimaryButton = ({ children }) => {
  return (
    <button className="h-10 text-white rounded-lg w-full btn-primary">
      {children}
    </button>
  );
};

export default PrimaryButton;