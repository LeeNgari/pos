import React from 'react';
import { Clock } from 'lucide-react';
import { Order } from '../../types';
import { OrderCard } from './OrderCard';

interface OrderListProps {
  filteredOrders: Order[];
  getStatusColor: (status: string) => string;
  getStatusIcon: (status: string) => JSX.Element;
  handleStatusChange: (orderId: string, newStatus: string) => void;
  setSelectedOrder: (order: Order) => void;
}

export const OrderList: React.FC<OrderListProps> = ({
  filteredOrders,
  getStatusColor,
  getStatusIcon,
  handleStatusChange,
  setSelectedOrder,
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      {filteredOrders.map((order) => (
        <OrderCard
          key={order.id}
          order={order}
          getStatusColor={getStatusColor}
          getStatusIcon={getStatusIcon}
          handleStatusChange={handleStatusChange}
          setSelectedOrder={setSelectedOrder}
        />
      ))}

      {filteredOrders.length === 0 && (
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200 text-center">
          <Clock className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">No orders found.</p>
        </div>
      )}
    </div>
  );
};
