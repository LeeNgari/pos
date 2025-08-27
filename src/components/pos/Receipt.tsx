import React from 'react';
import { X, Building2, Calendar, User, MapPin, Phone } from 'lucide-react';
import { Order } from '../../types';

interface ReceiptProps {
  order: Order;
  onClose: () => void;
}

export function Receipt({ order, onClose }: ReceiptProps) {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-md mx-auto px-4">
        {/* Header Actions */}
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={onClose}
            className="p-2 bg-white rounded-lg shadow-sm border border-gray-200 hover:bg-gray-50 transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
          <button
            onClick={handlePrint}
            className="bg-[#5771FF] text-white px-4 py-2 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 font-semibold shadow-lg"
          >
            Print Receipt
          </button>
        </div>

        {/* Receipt */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200 print:shadow-none print:border-none">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-[#5771FF] rounded-xl flex items-center justify-center mx-auto mb-4">
              <Building2 className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-1">The Hub Group</h1>
            <p className="text-gray-600 text-sm">Multi-Store POS System</p>
            <div className="w-24 h-1 bg-[#5771FF] rounded-full mx-auto mt-3"></div>
          </div>

          {/* Order Info */}
          <div className="space-y-4 mb-6">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Receipt #</span>
              <span className="text-gray-900 font-mono font-semibold">{order.id}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-gray-400" />
                <span className="text-gray-600">Date</span>
              </div>
              <span className="text-gray-900">{new Date(order.createdAt).toLocaleDateString()}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Time</span>
              <span className="text-gray-900">{new Date(order.createdAt).toLocaleTimeString()}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Payment Method</span>
              <span className="text-gray-900 capitalize">{order.paymentMethod || 'Cash'}</span>
            </div>
          </div>

          {/* Customer Info */}
          {(order.customerName || order.customerPhone || order.tableNumber || order.roomNumber) && (
            <div className="border-t border-gray-200 pt-4 mb-6">
              <h3 className="text-gray-900 font-semibold mb-3">Customer Details</h3>
              <div className="space-y-2">
                {order.customerName && (
                  <div className="flex items-center space-x-2">
                    <User className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600">Name:</span>
                    <span className="text-gray-900">{order.customerName}</span>
                  </div>
                )}
                {order.customerPhone && (
                  <div className="flex items-center space-x-2">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600">Phone:</span>
                    <span className="text-gray-900">{order.customerPhone}</span>
                  </div>
                )}
                {order.tableNumber && (
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600">Table:</span>
                    <span className="text-gray-900">{order.tableNumber}</span>
                  </div>
                )}
                {order.roomNumber && (
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600">Room:</span>
                    <span className="text-gray-900">{order.roomNumber}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Order Items */}
          <div className="border-t border-gray-200 pt-4 mb-6">
            <h3 className="text-gray-900 font-semibold mb-3">Order Items</h3>
            <div className="space-y-3">
              {order.items.map((item) => (
                <div key={item.id} className="flex justify-between items-start">
                  <div className="flex-1">
                    <p className="text-gray-900 font-medium">{item.product.name}</p>
                    <p className="text-gray-600 text-sm">
                      KES {item.price.toLocaleString()} × {item.quantity}
                    </p>
                  </div>
                  <p className="text-gray-900 font-semibold">
                    KES {(item.price * item.quantity).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Total */}
          <div className="border-t border-gray-200 pt-4 mb-6">
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold text-gray-900">Total</span>
              <span className="text-2xl font-bold text-gray-900">
                KES {order.total.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center text-gray-500 text-sm space-y-1">
            <p>Thank you for your business!</p>
            <p>Powered by The Hub Group POS System</p>
            <div className="pt-4">
              <p className="text-xs">This is a computer-generated receipt</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}