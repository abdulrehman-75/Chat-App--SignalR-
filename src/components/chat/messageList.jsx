import React, { useEffect, useRef } from 'react';
import { MessageBubble } from './messageBubble';
import { EmptyMessages } from './emptyMessages';

export const MessageList = ({ messages, currentUser }) => {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (messages.length === 0) {
    return <EmptyMessages />;
  }

  return (
    <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4">
      {messages.map((msg, index) => (
        <MessageBubble 
          key={index} 
          message={msg} 
          isCurrentUser={msg.username === currentUser} 
        />
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};