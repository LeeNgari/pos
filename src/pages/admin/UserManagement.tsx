import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { User as UserType, StoreType } from '../../types';
import { UserModal } from '../../components/admin/UserModal';
import { UserList } from '../../components/admin/UserList';

export function UserManagement() {
  const { state, addUser, updateUser } = useApp();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<UserType | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    role: 'staff' as 'admin' | 'staff',
    storeType: 'hotel' as StoreType,
  });

  const storeTypes: StoreType[] = ['hotel', 'alcoholics', 'bar', 'kitchen', 'bakery'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const userData = {
      name: formData.name,
      phone: formData.phone,
      role: formData.role,
      storeType: formData.storeType,
      isActive: true,
    };

    if (editingUser) {
      updateUser(editingUser.id, userData);
    } else {
      addUser(userData);
    }

    resetForm();
  };

  const resetForm = () => {
    setFormData({
      name: '',
      phone: '',
      role: 'staff',
      storeType: 'hotel',
    });
    setEditingUser(null);
    setIsModalOpen(false);
  };

  const handleEdit = (user: UserType) => {
    setEditingUser(user);
    setFormData({
      name: user.name,
      phone: user.phone,
      role: user.role,
      storeType: user.storeType,
    });
    setIsModalOpen(true);
  };

  const toggleUserStatus = (userId: string) => {
    const user = state.users.find(u => u.id === userId);
    if (user) {
      updateUser(userId, { isActive: !user.isActive });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">User Management</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-[#5771FF] text-white px-6 py-3 rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-200 flex items-center space-x-2 font-semibold shadow-lg"
        >
          <Plus className="w-5 h-5" />
          <span>Add User</span>
        </button>
      </div>

      <UserList
        users={state.users}
        toggleUserStatus={toggleUserStatus}
        handleEdit={handleEdit}
      />

      <UserModal
        isModalOpen={isModalOpen}
        editingUser={editingUser}
        formData={formData}
        setFormData={setFormData}
        handleSubmit={handleSubmit}
        resetForm={resetForm}
        storeTypes={storeTypes}
      />
    </div>
  );
}
