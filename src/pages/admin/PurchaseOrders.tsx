import React, { useState } from 'react';
import { Clock, CheckCircle, XCircle } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { PurchaseOrder } from '../../types';
import { PurchaseOrderStats } from '../../components/admin/PurchaseOrderStats';
import { PurchaseOrderFilters } from '../../components/admin/PurchaseOrderFilters';
import { PurchaseOrderList } from '../../components/admin/PurchaseOrderList';
import { PurchaseOrderDetailModal } from '../../components/admin/PurchaseOrderDetailModal';

export function AdminPurchaseOrders() {
  const { state, updatePurchaseOrder } = useApp();
  const [selectedPO, setSelectedPO] = useState<PurchaseOrder | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [storeFilter, setStoreFilter] = useState<string>('all');

  const filteredPOs = state.purchaseOrders.filter(po => {
    const matchesStatus = statusFilter === 'all' || po.status === statusFilter;
    const matchesStore = storeFilter === 'all' || po.storeType === storeFilter;
    return matchesStatus && matchesStore;
  });

  const storeTypes = ['hotel', 'bar', 'kitchen', 'bakery', 'alcoholics'];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-50 text-yellow-600 border-yellow-200';
      case 'fulfilled':
        return 'bg-green-50 text-green-600 border-green-200';
      case 'cancelled':
        return 'bg-red-50 text-red-600 border-red-200';
      default:
        return 'bg-gray-50 text-gray-600 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-4 h-4" />;
      case 'fulfilled':
        return <CheckCircle className="w-4 h-4" />;
      case 'cancelled':
        return <XCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const getStoreIcon = (storeType: string) => {
    switch (storeType) {
      case 'hotel': return '🏨';
      case 'bar': return '🍺';
      case 'kitchen': return '🍳';
      case 'bakery': return '🥖';
      case 'alcoholics': return '🍷';
      default: return '🏪';
    }
  };

  const handleStatusChange = (poId: string, newStatus: string) => {
    updatePurchaseOrder(poId, { 
      status: newStatus as PurchaseOrder['status'],
      fulfilledAt: newStatus === 'fulfilled' ? new Date() : undefined
    });
  };

  const pendingCount = state.purchaseOrders.filter(po => po.status === 'pending').length;
  const fulfilledCount = state.purchaseOrders.filter(po => po.status === 'fulfilled').length;
  const totalItems = state.purchaseOrders.reduce((sum, po) => sum + po.items.length, 0);

  return (
    <div className="space-y-6">
      <PurchaseOrderStats
        pendingCount={pendingCount}
        fulfilledCount={fulfilledCount}
        totalItems={totalItems}
      />

      <PurchaseOrderFilters
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        storeFilter={storeFilter}
        setStoreFilter={setStoreFilter}
        storeTypes={storeTypes}
        getStoreIcon={getStoreIcon}
      />

      <PurchaseOrderList
        filteredPOs={filteredPOs}
        getStatusColor={getStatusColor}
        getStatusIcon={getStatusIcon}
        getStoreIcon={getStoreIcon}
        handleStatusChange={handleStatusChange}
        setSelectedPO={setSelectedPO}
        statusFilter={statusFilter}
        storeFilter={storeFilter}
      />

      <PurchaseOrderDetailModal
        selectedPO={selectedPO}
        onClose={() => setSelectedPO(null)}
        handleStatusChange={handleStatusChange}
        getStatusColor={getStatusColor}
        getStatusIcon={getStatusIcon}
        getStoreIcon={getStoreIcon}
      />
    </div>
  );
}
