const UsersList = ({ users, currentUser, userCount }) => {
  return (
    <div className="mt-3 pt-3 border-t border-gray-700">
      <div className="flex items-center space-x-2 mb-2">
        <span className="text-gray-400 text-xs sm:text-sm font-medium">
          Users in room:
        </span>
        <span className="text-gray-300 text-xs sm:text-sm">
          ({userCount})
        </span>
      </div>
      <div className="flex flex-wrap gap-1.5 sm:gap-2 max-h-20 overflow-y-auto">
        {users.map((user, index) => (
          <span
            key={index}
            className={`px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
              user === currentUser 
                ? 'bg-orange-600 text-white' 
                : 'bg-gray-600 text-gray-300'
            }`}
          >
            {user}
            {user === currentUser && ' (You)'}
          </span>
        ))}
      </div>
    </div>
  );
};

export default UsersList;
