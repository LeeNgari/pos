import React from 'react';
import { Clock, CheckCircle, X, Send, Plus } from 'lucide-react';
import { PurchaseOrder } from '../../types';

interface PurchaseOrderListProps {
  userPurchaseOrders: PurchaseOrder[];
  getStatusColor: (status: string) => string;
  getStatusIcon: (status: string) => JSX.Element;
  setIsModalOpen: (isOpen: boolean) => void;
}

export const PurchaseOrderList: React.FC<PurchaseOrderListProps> = ({
  userPurchaseOrders,
  getStatusColor,
  getStatusIcon,
  setIsModalOpen,
}) => {
  return (
    <div className="space-y-6">
      {/* Purchase Orders List */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
        {userPurchaseOrders.map((po) => (
          <div key={po.id} className="bg-white rounded-xl md:rounded-2xl p-4 md:p-6 shadow-sm border border-gray-200 hover:shadow-md transition-all">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-gray-900 font-semibold text-sm md:text-base">PO #{po.id}</h3>
                <p className="text-gray-600 text-xs md:text-sm">
                  {new Date(po.createdAt).toLocaleDateString()}
                </p>
                <p className="text-gray-600 text-xs md:text-sm">By: {po.requestedBy}</p>
              </div>
              <div className={`flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(po.status)}`}>
                {getStatusIcon(po.status)}
                <span className="capitalize">{po.status}</span>
              </div>
            </div>

            <div className="space-y-2 mb-4">
              <h4 className="text-gray-700 font-medium text-sm">Items:</h4>
              <div className="space-y-1">
                {po.items.slice(0, 3).map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-gray-600">{item.itemName}</span>
                    <span className="text-gray-900 font-medium">×{item.quantity}</span>
                  </div>
                ))}
                {po.items.length > 3 && (
                  <p className="text-gray-500 text-xs">+{po.items.length - 3} more items</p>
                )}
              </div>
            </div>

            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-600">Total Items: {po.items.length}</span>
              {po.fulfilledAt && (
                <span className="text-green-600 text-xs">
                  Fulfilled: {new Date(po.fulfilledAt).toLocaleDateString()}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {userPurchaseOrders.length === 0 && (
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200 text-center">
          <Send className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No Purchase Orders</h3>
          <p className="text-gray-600 mb-4">You haven't created any purchase orders yet.</p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-[#5771FF] text-white px-6 py-3 rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-200 flex items-center space-x-2 font-semibold shadow-lg mx-auto"
          >
            <Plus className="w-5 h-5" />
            <span>Create First Purchase Order</span>
          </button>
        </div>
      )}
    </div>
  );
};
