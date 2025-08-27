import React from 'react';
import { Clock, CheckCircle, XCircle, Eye } from 'lucide-react';
import { Order } from '../../types';

interface OrderCardProps {
  order: Order;
  getStatusColor: (status: string) => string;
  getStatusIcon: (status: string) => JSX.Element;
  handleStatusChange: (orderId: string, newStatus: string) => void;
  setSelectedOrder: (order: Order) => void;
}

export const OrderCard: React.FC<OrderCardProps> = ({
  order,
  getStatusColor,
  getStatusIcon,
  handleStatusChange,
  setSelectedOrder,
}) => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-all">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-gray-900 font-semibold">Order #{order.id}</h3>
          <p className="text-gray-600 text-sm">
            {new Date(order.createdAt).toLocaleDateString()} at{' '}
            {new Date(order.createdAt).toLocaleTimeString()}
          </p>
        </div>
        <div className={`flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
          {getStatusIcon(order.status)}
          <span className="capitalize">{order.status}</span>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex justify-between">
          <span className="text-gray-600">Items:</span>
          <span className="text-gray-900">{order.items.length}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-600">Total:</span>
          <span className="text-gray-900 font-semibold">KES {order.total.toLocaleString()}</span>
        </div>

        {order.customerName && (
          <div className="flex justify-between">
            <span className="text-gray-600">Customer:</span>
            <span className="text-gray-900">{order.customerName}</span>
          </div>
        )}

        {order.tableNumber && (
          <div className="flex justify-between">
            <span className="text-gray-600">Table:</span>
            <span className="text-gray-900">{order.tableNumber}</span>
          </div>
        )}

        {order.roomNumber && (
          <div className="flex justify-between">
            <span className="text-gray-600">Room:</span>
            <span className="text-gray-900">{order.roomNumber}</span>
          </div>
        )}

        <div className="flex space-x-2 pt-3">
          <button
            onClick={() => setSelectedOrder(order)}
            className="flex-1 p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors flex items-center justify-center space-x-1"
          >
            <Eye className="w-4 h-4" />
            <span>View</span>
          </button>
          
          {order.status !== 'completed' && order.status !== 'cancelled' && (
            <select
              value={order.status}
              onChange={(e) => handleStatusChange(order.id, e.target.value)}
              className="flex-1 p-2 border border-gray-200 rounded-lg text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          )}
        </div>
      </div>
    </div>
  );
};
