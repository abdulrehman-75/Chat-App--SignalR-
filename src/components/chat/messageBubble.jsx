import React from 'react';

export const MessageBubble = ({ message, isCurrentUser }) => {
  if (message.isSystemMessage) {
    return (
      <div className="flex justify-center">
        <div className="bg-gray-600 text-gray-300 px-3 py-1 rounded-full text-sm">
          <span className="text-xs opacity-75">{message.timestamp}</span>
          <span className="mx-2">•</span>
          <span>{message.message}</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[280px] sm:max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
          isCurrentUser 
            ? 'bg-orange-600 text-white' 
            : 'bg-gray-700 text-white'
        }`}
      >
        {!isCurrentUser && (
          <p className="text-xs font-semibold mb-1 text-orange-400">
            {message.username}
          </p>
        )}
        <p className="break-words whitespace-pre-wrap">{message.message}</p>
        <p className="text-xs mt-1 opacity-70">{message.timestamp}</p>
      </div>
    </div>
  );
};