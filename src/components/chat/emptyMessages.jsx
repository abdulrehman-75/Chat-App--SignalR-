import React from 'react';

export const EmptyMessages = () => {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="text-center px-4">
        <div className="text-4xl sm:text-6xl mb-4">💬</div>
        <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">
          No messages yet
        </h3>
        <p className="text-gray-400 text-sm sm:text-base">
          Be the first to start the conversation!
        </p>
      </div>
    </div>
  );
};