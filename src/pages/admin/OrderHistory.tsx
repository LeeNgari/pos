import React, { useState } from 'react';
import { Clock, CheckCircle, XCircle } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Order } from '../../types';
import { OrderDetailModal } from '../../components/admin/OrderDetailModal';
import { OrderList } from '../../components/admin/OrderList';

export function OrderHistory() {
  const { state, updateOrder } = useApp();
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredOrders = state.orders.filter(order => 
    statusFilter === 'all' || order.status === statusFilter
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-50 text-yellow-600';
      case 'processing':
        return 'bg-blue-50 text-blue-600';
      case 'completed':
        return 'bg-green-50 text-green-600';
      case 'cancelled':
        return 'bg-red-50 text-red-600';
      default:
        return 'bg-gray-50 text-gray-600';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-4 h-4" />;
      case 'processing':
        return <Clock className="w-4 h-4" />;
      case 'completed':
        return <CheckCircle className="w-4 h-4" />;
      case 'cancelled':
        return <XCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const handleStatusChange = (orderId: string, newStatus: string) => {
    updateOrder(orderId, { 
      status: newStatus as Order['status'],
      completedAt: newStatus === 'completed' ? new Date() : undefined
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Order History</h2>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="all">All Orders</option>
          <option value="pending">Pending</option>
          <option value="processing">Processing</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      <OrderList
        filteredOrders={filteredOrders}
        getStatusColor={getStatusColor}
        getStatusIcon={getStatusIcon}
        handleStatusChange={handleStatusChange}
        setSelectedOrder={setSelectedOrder}
      />

      <OrderDetailModal
        selectedOrder={selectedOrder}
        onClose={() => setSelectedOrder(null)}
      />
    </div>
  );
}
