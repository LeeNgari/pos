import React from 'react';
import { Package } from 'lucide-react';
import { PurchaseOrder } from '../../types';
import { PurchaseOrderCard } from './PurchaseOrderCard';

interface PurchaseOrderListProps {
  filteredPOs: PurchaseOrder[];
  getStatusColor: (status: string) => string;
  getStatusIcon: (status: string) => JSX.Element;
  getStoreIcon: (storeType: string) => string;
  handleStatusChange: (poId: string, newStatus: string) => void;
  setSelectedPO: (po: PurchaseOrder) => void;
  statusFilter: string;
  storeFilter: string;
}

export const PurchaseOrderList: React.FC<PurchaseOrderListProps> = ({
  filteredPOs,
  getStatusColor,
  getStatusIcon,
  getStoreIcon,
  handleStatusChange,
  setSelectedPO,
  statusFilter,
  storeFilter,
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      {filteredPOs.map((po) => (
        <PurchaseOrderCard
          key={po.id}
          po={po}
          getStatusColor={getStatusColor}
          getStatusIcon={getStatusIcon}
          getStoreIcon={getStoreIcon}
          handleStatusChange={handleStatusChange}
          setSelectedPO={setSelectedPO}
        />
      ))}

      {filteredPOs.length === 0 && (
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200 text-center">
          <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No Purchase Orders Found</h3>
          <p className="text-gray-600">
            {statusFilter !== 'all' || storeFilter !== 'all'
              ? 'Try adjusting your filter criteria.'
              : 'No purchase orders have been created yet.'}
          </p>
        </div>
      )}
    </div>
  );
};
