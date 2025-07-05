import React, { useEffect } from 'react';
import './App.css';
import WaitingRoom from './components/waitingRoom.jsx';
import ChatRoom from './components/chatRoom.jsx';
import { ErrorBanner } from './components/common/ErrorBanner.jsx';
import { useSignalR } from './hooks/useSignalR.js';
import { useChatRoom } from './hooks/useChatRoom.js';
import { ChatService } from './services/chatService.js';

function App() {
  const { connection, isConnecting, error,
     connect, disconnect, clearError } = useSignalR();

  const { 
    messages, 
    currentUser, 
    chatRoomName, 
    roomInfo,
    setCurrentUser,
    setChatRoomName,
    addSystemMessage,
    addUserMessage,
    updateRoomInfo,
    resetChatRoom
  } = useChatRoom();

  // Clear error after 5 seconds
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        clearError();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error, clearError]);

  const joinChatRoom = async (data) => {
    const signalRUrl = import.meta.env.VITE_SIGNALR_URL;
    
    if (!signalRUrl) {
      throw new Error('SignalR URL is not configured');
    }
    
    const eventHandlers = {
      'JoinSpecificChatRoom': (username, message) => {
        addSystemMessage(message);
      },
      'ReceiveSpecificMessage': (username, message) => {
        addUserMessage(username, message);
      },
      'Error': (errorMessage) => {
        // Error is handled by the hook
      },
      'RoomInfo': (roomInfo) => {
        updateRoomInfo(roomInfo);
      }
    };

    const newConnection = await connect(signalRUrl, eventHandlers);
    
    if (newConnection) {
      try {
        const chatService = new ChatService(newConnection);
        await chatService.joinRoom(data.username, data.chatroom);
        
        setCurrentUser(data.username);
        setChatRoomName(data.chatroom);
      } catch (error) {
        await disconnect();
        throw error;
      }
    } else {
      throw new Error('Failed to connect to chat server');
    }
  };

  const sendMessage = async (message) => {
    if (!connection) {
      throw new Error('No connection available');
    }
    
    try {
      const chatService = new ChatService(connection);
      await chatService.sendMessage(message, chatRoomName);
    } catch (error) {
      throw error;
    }
  };

  const leaveChatRoom = async () => {
    try {
      // Try to send leave message to server if connection is still active
      if (connection && connection.state === 'Connected') {
        await connection.invoke('LeaveChatRoom');
      }
    } catch (error) {
      // Continue with disconnect even if leave message fails
    }
    
    // Always disconnect and reset state
    await disconnect();
    resetChatRoom();
  };

  return (
    <>
      <ErrorBanner error={error} onClose={clearError} />
      
      {connection ? (
        <ChatRoom
          chatRoomName={chatRoomName}
          messages={messages}
          sendMessage={sendMessage}
          currentUser={currentUser}
          onLeave={leaveChatRoom}
          roomInfo={roomInfo}
        />
      ) : (
        <WaitingRoom 
          onJoinChatRoom={joinChatRoom} 
          isConnecting={isConnecting}
        />
      )}
    </>
  );
}

export default App;