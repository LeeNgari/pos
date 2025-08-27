import React, { useState } from 'react';
import { Plus, Clock, CheckCircle, X } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { PurchaseOrder, PurchaseOrderItem } from '../types';
import { NewPurchaseOrderModal } from '../components/pos/NewPurchaseOrderModal';
import { PurchaseOrderList } from '../components/pos/PurchaseOrderList';

export function PurchaseOrders() {
  const { state, addPurchaseOrder } = useApp();
  const { user } = state.auth;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [items, setItems] = useState<PurchaseOrderItem[]>([]);
  const [newItem, setNewItem] = useState({ itemName: '', quantity: 1 });

  const userPurchaseOrders = state.purchaseOrders.filter(po => 
    po.storeType === user?.storeType
  );

  const handleAddItem = () => {
    if (newItem.itemName.trim()) {
      const item: PurchaseOrderItem = {
        id: Date.now().toString(),
        itemName: newItem.itemName.trim(),
        quantity: newItem.quantity,
      };
      setItems([...items, item]);
      setNewItem({ itemName: '', quantity: 1 });
    }
  };

  const handleRemoveItem = (itemId: string) => {
    setItems(items.filter(item => item.id !== itemId));
  };

  const handleSubmitPurchaseOrder = () => {
    if (items.length > 0) {
      addPurchaseOrder({
        storeType: user?.storeType || 'hotel',
        items,
        status: 'pending',
        requestedBy: user?.name || 'Unknown',
      });
      setItems([]);
      setIsModalOpen(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-50 text-yellow-600';
      case 'fulfilled': return 'bg-green-50 text-green-600';
      case 'cancelled': return 'bg-red-50 text-red-600';
      default: return 'bg-gray-50 text-gray-600';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'fulfilled': return <CheckCircle className="w-4 h-4" />;
      case 'cancelled': return <X className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold text-gray-900">Purchase Orders</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-[#5771FF] text-white px-6 py-3 rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-200 flex items-center space-x-2 font-semibold shadow-lg"
        >
          <Plus className="w-5 h-5" />
          <span>New Purchase Order</span>
        </button>
      </div>

      <PurchaseOrderList
        userPurchaseOrders={userPurchaseOrders}
        getStatusColor={getStatusColor}
        getStatusIcon={getStatusIcon}
        setIsModalOpen={setIsModalOpen}
      />

      <NewPurchaseOrderModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        items={items}
        setItems={setItems}
        newItem={newItem}
        setNewItem={setNewItem}
        handleAddItem={handleAddItem}
        handleRemoveItem={handleRemoveItem}
        handleSubmitPurchaseOrder={handleSubmitPurchaseOrder}
      />
    </div>
  );
}
