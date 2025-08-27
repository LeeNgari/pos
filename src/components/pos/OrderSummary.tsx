import React from 'react';
import { ShoppingCart, X, User, Phone } from 'lucide-react';
import { OrderItem } from '../../types';

interface OrderSummaryProps {
  items: OrderItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onProceedToCheckout: (customerInfo: { name?: string; phone?: string; tableNumber?: string; roomNumber?: string }) => void;
  storeType: string;
}

export function OrderSummary({ items, onUpdateQuantity, onRemoveItem, onProceedToCheckout, storeType }: OrderSummaryProps) {
  const [customerName, setCustomerName] = React.useState('');
  const [customerPhone, setCustomerPhone] = React.useState('');
  const [tableNumber, setTableNumber] = React.useState('');
  const [roomNumber, setRoomNumber] = React.useState('');

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleProceedToCheckout = () => {
    onProceedToCheckout({
      name: customerName || undefined,
      phone: customerPhone || undefined,
      tableNumber: tableNumber || undefined,
      roomNumber: roomNumber || undefined,
    });
    
    // Reset form
    setCustomerName('');
    setCustomerPhone('');
    setTableNumber('');
    setRoomNumber('');
  };

  if (items.length === 0) {
    return (
      <div className="bg-white rounded-xl md:rounded-2xl p-6 md:p-8 shadow-sm border border-gray-200 text-center">
        <ShoppingCart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-600">No items in cart</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl md:rounded-2xl p-4 md:p-6 shadow-sm border border-gray-200 space-y-4 md:space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg md:text-xl font-semibold text-gray-900">Order Summary</h3>
        <div className="flex items-center space-x-2 text-gray-600">
          <ShoppingCart className="w-4 h-4 md:w-5 md:h-5" />
          <span className="text-sm md:text-base">{items.length} items</span>
        </div>
      </div>

      <div className="space-y-3 md:space-y-4 max-h-48 md:max-h-64 overflow-y-auto">
        {items.map((item) => (
          <div key={item.id} className="flex items-center space-x-3 md:space-x-4 p-3 md:p-4 bg-gray-50 rounded-lg">
            <img
              src={item.product.image}
              alt={item.product.name}
              className="w-10 h-10 md:w-12 md:h-12 rounded-lg object-cover flex-shrink-0"
            />
            <div className="flex-1">
              <h4 className="text-gray-900 font-medium text-sm md:text-base line-clamp-1">{item.product.name}</h4>
              <p className="text-gray-600 text-xs md:text-sm">KES {item.product.price.toLocaleString()} each</p>
            </div>
            <div className="flex items-center space-x-1 md:space-x-2 flex-shrink-0">
              <button
                onClick={() => onUpdateQuantity(item.productId, item.quantity - 1)}
                className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition-colors"
              >
                <span className="text-gray-600 text-xs md:text-sm">-</span>
              </button>
              <span className="text-gray-900 w-6 md:w-8 text-center text-sm md:text-base">{item.quantity}</span>
              <button
                onClick={() => onUpdateQuantity(item.productId, item.quantity + 1)}
                className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition-colors"
              >
                <span className="text-gray-600 text-xs md:text-sm">+</span>
              </button>
            </div>
            <button
              onClick={() => onRemoveItem(item.productId)}
              className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-red-50 flex items-center justify-center hover:bg-red-100 transition-colors flex-shrink-0"
            >
              <X className="w-3 h-3 md:w-4 md:h-4 text-red-600" />
            </button>
          </div>
        ))}
      </div>

      <div className="border-t border-gray-200 pt-4">
        <div className="flex justify-between items-center mb-4">
          <span className="text-gray-600 text-sm md:text-base">Total:</span>
          <span className="text-xl md:text-2xl font-bold text-gray-900">KES {total.toLocaleString()}</span>
        </div>

        <div className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-1">Customer Name</label>
              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm md:text-base"
                placeholder="Optional"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-1">Phone</label>
              <input
                type="tel"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm md:text-base"
                placeholder="Optional"
              />
            </div>
          </div>
          
          {(storeType === 'bar' || storeType === 'kitchen') && (
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-1">Table Number</label>
              <input
                type="text"
                value={tableNumber}
                onChange={(e) => setTableNumber(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Optional"
              />
            </div>
          )}
          
          {storeType === 'bakery' && (
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-1">Table Number</label>
              <input
                type="text"
                value={tableNumber}
                onChange={(e) => setTableNumber(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Optional"
              />
            </div>
          )}
          
          {storeType === 'hotel' && (
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-1">Room Number</label>
              <input
                type="text"
                value={roomNumber}
                onChange={(e) => setRoomNumber(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Optional"
              />
            </div>
          )}
        </div>

        <button
          onClick={handleProceedToCheckout}
          className="w-full mt-4 bg-[#5771FF] text-white py-3 md:py-4 px-4 rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-200 font-semibold shadow-lg text-sm md:text-base"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}