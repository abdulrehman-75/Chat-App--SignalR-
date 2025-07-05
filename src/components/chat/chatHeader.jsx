import React from 'react';
import Button from '../Common/button';
import UsersList from '../chat/usersList'; 

export const ChatHeader = ({ 
  chatRoomName, 
  messageCount, 
  roomInfo, 
  currentUser, 
  onLeave 
}) => {
  return (
    <div className="bg-gray-800 border-b border-gray-700 p-3 sm:p-4 shadow-lg">
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0 flex-1">
          <h1 className="text-xl sm:text-2xl font-bold text-white truncate">
            #{chatRoomName}
          </h1>
          <div className="text-xs sm:text-sm text-gray-400 mt-1">
            <span>
              {messageCount} message{messageCount !== 1 ? 's' : ''}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3 sm:gap-4">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-green-400 text-xs sm:text-sm font-medium">
              {roomInfo.userCount} Online
            </span>
          </div>
          <Button
            onClick={onLeave}
            className="px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm"
            bgColor="bg-red-600 hover:bg-red-700"
          >
            Leave
          </Button>
        </div>
      </div>

      {roomInfo.users && roomInfo.users.length > 0 && (
        <UsersList 
          users={roomInfo.users} 
          currentUser={currentUser} 
          userCount={roomInfo.userCount} 
        />
      )}
    </div>
  );
};
