import React from 'react';

export const ErrorBanner = ({ error, onClose }) => {
  if (!error) return null;

  return (
    <div className="bg-red-500 text-white p-4 text-center relative">
      {error}
      <button 
        onClick={onClose}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-200"
      >
        ✕
      </button>
    </div>
  );
};