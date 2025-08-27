import React from 'react';
import { XCircle, Clock, CheckCircle, Package, User, Calendar } from 'lucide-react';
import { PurchaseOrder } from '../../types';

interface PurchaseOrderDetailModalProps {
  selectedPO: PurchaseOrder | null;
  onClose: () => void;
  handleStatusChange: (poId: string, newStatus: string) => void;
  getStatusColor: (status: string) => string;
  getStatusIcon: (status: string) => JSX.Element;
  getStoreIcon: (storeType: string) => string;
}

export const PurchaseOrderDetailModal: React.FC<PurchaseOrderDetailModalProps> = ({
  selectedPO,
  onClose,
  handleStatusChange,
  getStatusColor,
  getStatusIcon,
  getStoreIcon,
}) => {
  if (!selectedPO) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-[#5771FF] rounded-xl flex items-center justify-center">
              <span className="text-xl">{getStoreIcon(selectedPO.storeType)}</span>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">Purchase Order #{selectedPO.id}</h3>
              <p className="text-gray-600 capitalize">{selectedPO.storeType} Store</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <XCircle className="w-6 h-6" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="space-y-4">
            <div>
              <h4 className="text-gray-700 font-semibold mb-2">Order Information</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Status:</span>
                  <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(selectedPO.status)}`}>
                    {getStatusIcon(selectedPO.status)}
                    <span className="capitalize">{selectedPO.status}</span>
                  </div>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Requested by:</span>
                  <span className="text-gray-900">{selectedPO.requestedBy}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Created:</span>
                  <span className="text-gray-900">{new Date(selectedPO.createdAt).toLocaleDateString()}</span>
                </div>
                {selectedPO.fulfilledAt && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Fulfilled:</span>
                    <span className="text-gray-900">{new Date(selectedPO.fulfilledAt).toLocaleDateString()}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-gray-700 font-semibold mb-2">Store Information</h4>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{getStoreIcon(selectedPO.storeType)}</span>
                <div>
                  <p className="text-gray-900 font-medium capitalize">{selectedPO.storeType} Store</p>
                  <p className="text-gray-600 text-sm">Total Items: {selectedPO.items.length}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h4 className="text-gray-700 font-semibold mb-3">Requested Items</h4>
          <div className="space-y-2">
            {selectedPO.items.map((item) => (
              <div key={item.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-gray-900 font-medium">{item.itemName}</p>
                </div>
                <div className="text-right">
                  <p className="text-gray-900 font-semibold">Quantity: {item.quantity}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {selectedPO.status === 'pending' && (
          <div className="flex space-x-3">
            <button
              onClick={() => {
                handleStatusChange(selectedPO.id, 'cancelled');
                onClose();
              }}
              className="flex-1 bg-red-50 text-red-600 py-3 px-4 rounded-xl hover:bg-red-100 transition-colors font-semibold"
            >
              Cancel Order
            </button>
            <button
              onClick={() => {
                handleStatusChange(selectedPO.id, 'fulfilled');
                onClose();
              }}
              className="flex-1 bg-green-500 text-white py-3 px-4 rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-200 font-semibold shadow-lg"
            >
              Mark as Fulfilled
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
