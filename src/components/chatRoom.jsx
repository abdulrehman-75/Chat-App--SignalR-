import React from 'react';
import { ChatHeader } from './chat/chatHeader.jsx';
import { MessageList } from './chat/messageList.jsx';
import { MessageInput } from './chat/messageInput.jsx';

export default function ChatRoom({
  chatRoomName,
  messages = [],
  sendMessage,
  currentUser,
  onLeave,
  roomInfo = { userCount: 0, users: [] }
}) {
  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <ChatHeader 
        chatRoomName={chatRoomName}
        messageCount={messages.length}
        roomInfo={roomInfo}
        currentUser={currentUser}
        onLeave={onLeave}
      />
      
      <MessageList 
        messages={messages}
        currentUser={currentUser}
      />
      
      <MessageInput 
        onSendMessage={sendMessage}
        chatRoomName={chatRoomName}
      />
    </div>
  );
}