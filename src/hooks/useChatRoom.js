import { useState, useCallback } from 'react';

export const useChatRoom = () => {
  const [messages, setMessages] = useState([]);
  const [currentUser, setCurrentUser] = useState('');
  const [chatRoomName, setChatRoomName] = useState('');
  const [roomInfo, setRoomInfo] = useState({ userCount: 0, users: [] });
  
  const addMessage = useCallback((message) => {
    setMessages(prev => [...prev, {
      ...message,
      timestamp: new Date().toLocaleTimeString()
    }]);
  }, []);

  const addSystemMessage = useCallback((message) => {
    addMessage({
      username: 'System',
      message,
      isSystemMessage: true
    });
  }, [addMessage]);

  const addUserMessage = useCallback((username, message) => {
    addMessage({
      username,
      message,
      isSystemMessage: false
    });
  }, [addMessage]);

  const updateRoomInfo = useCallback((info) => {
    setRoomInfo({
      userCount: info.userCount || 0,
      users: info.users || []
    });
  }, []);

  const resetChatRoom = useCallback(() => {
    setMessages([]);
    setCurrentUser('');
    setChatRoomName('');
    setRoomInfo({ userCount: 0, users: [] });
  }, []);

  return {
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
  };
};