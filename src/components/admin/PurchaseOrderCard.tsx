import React from 'react';
import { Clock, CheckCircle, XCircle, Eye, Package, User, Calendar } from 'lucide-react';
import { PurchaseOrder } from '../../types';

interface PurchaseOrderCardProps {
  po: PurchaseOrder;
  getStatusColor: (status: string) => string;
  getStatusIcon: (status: string) => JSX.Element;
  getStoreIcon: (storeType: string) => string;
  handleStatusChange: (poId: string, newStatus: string) => void;
  setSelectedPO: (po: PurchaseOrder) => void;
}

export const PurchaseOrderCard: React.FC<PurchaseOrderCardProps> = ({
  po,
  getStatusColor,
  getStatusIcon,
  getStoreIcon,
  handleStatusChange,
  setSelectedPO,
}) => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-all">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-[#5771FF] rounded-lg flex items-center justify-center">
            <span className="text-lg">{getStoreIcon(po.storeType)}</span>
          </div>
          <div>
            <h3 className="text-gray-900 font-semibold">PO #{po.id}</h3>
            <p className="text-gray-600 text-sm capitalize">{po.storeType} Store</p>
          </div>
        </div>
        <div className={`flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(po.status)}`}>
          {getStatusIcon(po.status)}
          <span className="capitalize">{po.status}</span>
        </div>
      </div>

      <div className="space-y-3 mb-4">
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Calendar className="w-4 h-4" />
          <span>Created: {new Date(po.createdAt).toLocaleDateString()}</span>
        </div>
        
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <User className="w-4 h-4" />
          <span>Requested by: {po.requestedBy}</span>
        </div>

        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Package className="w-4 h-4" />
          <span>{po.items.length} items requested</span>
        </div>

        {po.fulfilledAt && (
          <div className="flex items-center space-x-2 text-sm text-green-600">
            <CheckCircle className="w-4 h-4" />
            <span>Fulfilled: {new Date(po.fulfilledAt).toLocaleDateString()}</span>
          </div>
        )}
      </div>

      <div className="space-y-2 mb-4">
        <h4 className="text-gray-700 font-medium text-sm">Items Preview:</h4>
        <div className="space-y-1">
          {po.items.slice(0, 2).map((item) => (
            <div key={item.id} className="flex justify-between text-sm bg-gray-50 rounded-lg p-2">
              <span className="text-gray-700 truncate">{item.itemName}</span>
              <span className="text-gray-900 font-medium">×{item.quantity}</span>
            </div>
          ))}
          {po.items.length > 2 && (
            <p className="text-gray-500 text-xs text-center">+{po.items.length - 2} more items</p>
          )}
        </div>
      </div>

      <div className="flex space-x-2">
        <button
          onClick={() => setSelectedPO(po)}
          className="flex-1 p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors flex items-center justify-center space-x-1 text-sm font-medium"
        >
          <Eye className="w-4 h-4" />
          <span>View Details</span>
        </button>
        
        {po.status === 'pending' && (
          <div className="flex space-x-1">
            <button
              onClick={() => handleStatusChange(po.id, 'fulfilled')}
              className="px-3 py-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors text-sm font-medium"
            >
              Fulfill
            </button>
            <button
              onClick={() => handleStatusChange(po.id, 'cancelled')}
              className="px-3 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors text-sm font-medium"
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
