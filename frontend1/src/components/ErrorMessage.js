 
import React from 'react';

const ErrorMessage = ({ message }) => {
  if (!message) return null;

  return (
    <div className="error-message">
      {typeof message === 'object' ? (
        Object.entries(message).map(([key, value]) => (
          <div key={key}>{value}</div>
        ))
      ) : (
        <div>{message}</div>
      )}
    </div>
  );
};

export default ErrorMessage;