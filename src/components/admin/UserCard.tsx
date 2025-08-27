import React from 'react';
import { Edit2, User } from 'lucide-react';
import { User as UserType } from '../../types';

interface UserCardProps {
  user: UserType;
  toggleUserStatus: (userId: string) => void;
  handleEdit: (user: UserType) => void;
}

export const UserCard: React.FC<UserCardProps> = ({
  user,
  toggleUserStatus,
  handleEdit,
}) => {
  const getStoreIcon = (storeType: string) => {
    switch (storeType) {
      case 'hotel':
        return '🏨';
      case 'bar':
        return '🍺';
      case 'kitchen':
        return '🍳';
      case 'bakery':
        return '🥖';
      case 'alcoholics':
        return '🍷';
      default:
        return '🏪';
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-all">
      <div className="flex items-center space-x-4 mb-4">
        <div className="w-12 h-12 bg-[#5771FF] rounded-full flex items-center justify-center">
          <User className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-gray-900 font-semibold">{user.name}</h3>
          <p className="text-gray-600 text-sm">{user.phone}</p>
        </div>
      </div>
      
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-gray-600 text-sm">Role:</span>
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
            user.role === 'admin' 
              ? 'bg-purple-50 text-purple-600' 
              : 'bg-blue-50 text-blue-600'
          }`}>
            {user.role}
          </span>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-gray-600 text-sm">Store:</span>
          <div className="flex items-center space-x-2">
            <span className="text-lg">{getStoreIcon(user.storeType)}</span>
            <span className="text-gray-700 text-sm capitalize">{user.storeType}</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-gray-600 text-sm">Status:</span>
          <button
            onClick={() => toggleUserStatus(user.id)}
            className={`px-3 py-1 rounded-full text-xs font-medium ${
              user.isActive 
                ? 'bg-green-50 text-green-600' 
                : 'bg-red-50 text-red-600'
            }`}
          >
            {user.isActive ? 'Active' : 'Inactive'}
          </button>
        </div>
        
        <div className="flex space-x-2 pt-2">
          <button
            onClick={() => handleEdit(user)}
            className="flex-1 p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors flex items-center justify-center"
          >
            <Edit2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
