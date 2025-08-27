import React from 'react';
import { Plus, X, Send } from 'lucide-react';
import { PurchaseOrderItem } from '../../types';

interface NewPurchaseOrderModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  items: PurchaseOrderItem[];
  setItems: (items: PurchaseOrderItem[]) => void;
  newItem: { itemName: string; quantity: number };
  setNewItem: (item: { itemName: string; quantity: number }) => void;
  handleAddItem: () => void;
  handleRemoveItem: (itemId: string) => void;
  handleSubmitPurchaseOrder: () => void;
}

export const NewPurchaseOrderModal: React.FC<NewPurchaseOrderModalProps> = ({
  isModalOpen,
  setIsModalOpen,
  items,
  setItems,
  newItem,
  setNewItem,
  handleAddItem,
  handleRemoveItem,
  handleSubmitPurchaseOrder,
}) => {
  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 w-full max-w-lg shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-gray-900">New Purchase Order</h3>
          <button
            onClick={() => {
              setIsModalOpen(false);
              setItems([]);
              setNewItem({ itemName: '', quantity: 1 });
            }}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-6">
          {/* Add Item Form */}
          <div className="bg-gray-50 rounded-xl p-4">
            <h4 className="text-gray-900 font-semibold mb-3">Add Item</h4>
            <div className="space-y-3">
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-1">Item Name</label>
                <input
                  type="text"
                  value={newItem.itemName}
                  onChange={(e) => setNewItem({ ...newItem, itemName: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter item name"
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-1">Quantity</label>
                <input
                  type="number"
                  min="1"
                  value={newItem.quantity}
                  onChange={(e) => setNewItem({ ...newItem, quantity: parseInt(e.target.value) || 1 })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <button
                onClick={handleAddItem}
                disabled={!newItem.itemName.trim()}
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Add Item
              </button>
            </div>
          </div>

          {/* Items List */}
          {items.length > 0 && (
            <div>
              <h4 className="text-gray-900 font-semibold mb-3">Items to Order</h4>
              <div className="space-y-2">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="text-gray-900 font-medium">{item.itemName}</p>
                      <p className="text-gray-600 text-sm">Quantity: {item.quantity}</p>
                    </div>
                    <button
                      onClick={() => handleRemoveItem(item.id)}
                      className="text-red-600 hover:text-red-700 p-1"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Submit Button */}
          <div className="flex space-x-3 pt-4">
            <button
              onClick={() => {
                setIsModalOpen(false);
                setItems([]);
                setNewItem({ itemName: '', quantity: 1 });
              }}
              className="flex-1 bg-gray-100 text-gray-700 py-3 px-4 rounded-xl hover:bg-gray-200 transition-colors font-semibold"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmitPurchaseOrder}
              disabled={items.length === 0}
              className="flex-1 bg-[#5771FF] text-white py-3 px-4 rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-semibold shadow-lg flex items-center justify-center space-x-2"
            >
              <Send className="w-4 h-4" />
              <span>Submit Order</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
