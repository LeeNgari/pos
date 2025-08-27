import React from 'react';
import { StoreType } from '../../types';

interface PurchaseOrderFiltersProps {
  statusFilter: string;
  setStatusFilter: (status: string) => void;
  storeFilter: string;
  setStoreFilter: (store: string) => void;
  storeTypes: StoreType[];
  getStoreIcon: (storeType: string) => string;
}

export const PurchaseOrderFilters: React.FC<PurchaseOrderFiltersProps> = ({
  statusFilter,
  setStatusFilter,
  storeFilter,
  setStoreFilter,
  storeTypes,
  getStoreIcon,
}) => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold text-gray-900">Purchase Orders Management</h2>
        <div className="flex flex-col sm:flex-row gap-4">
          <select
            value={storeFilter}
            onChange={(e) => setStoreFilter(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Stores</option>
            {storeTypes.map((store) => (
              <option key={store} value={store}>
                {getStoreIcon(store)} {store.charAt(0).toUpperCase() + store.slice(1)}
              </option>
            ))}
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="fulfilled">Fulfilled</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>
    </div>
  );
};
