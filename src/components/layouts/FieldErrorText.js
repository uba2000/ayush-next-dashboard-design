import React from 'react';

const FieldErrorText = ({ children }) => {
  return (
    <div className="text-white font-medium pt-2">
      <span className="text-red">* </span>
      {children}
    </div>
  );
};

export default FieldErrorText;
