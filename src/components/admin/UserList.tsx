import React from 'react';
import { User as UserType } from '../../types';
import { UserCard } from './UserCard';

interface UserListProps {
  users: UserType[];
  toggleUserStatus: (userId: string) => void;
  handleEdit: (user: UserType) => void;
}

export const UserList: React.FC<UserListProps> = ({
  users,
  toggleUserStatus,
  handleEdit,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {users.map((user) => (
        <UserCard
          key={user.id}
          user={user}
          toggleUserStatus={toggleUserStatus}
          handleEdit={handleEdit}
        />
      ))}
    </div>
  );
};
