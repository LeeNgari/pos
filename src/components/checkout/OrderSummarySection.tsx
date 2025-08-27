import React from 'react';
import { OrderItem } from '../../types';

interface OrderSummarySectionProps {
  items: OrderItem[];
}

export const OrderSummarySection: React.FC<OrderSummarySectionProps> = ({
  items,
}) => {
  return (
    <div className="bg-white rounded-xl md:rounded-2xl p-4 md:p-6 shadow-sm border border-gray-200">
      <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-4">Order Summary</h2>
      <div className="space-y-3 md:space-y-4">
        {items.map((item) => (
          <div key={item.id} className="flex items-center space-x-3 md:space-x-4 p-3 md:p-4 bg-gray-50 rounded-lg">
            <img
              src={item.product.image}
              alt={item.product.name}
              className="w-12 h-12 md:w-16 md:h-16 rounded-lg object-cover flex-shrink-0"
            />
            <div className="flex-1">
              <h3 className="text-gray-900 font-medium text-sm md:text-base line-clamp-1">{item.product.name}</h3>
              <p className="text-gray-600 text-xs md:text-sm">KES {item.price.toLocaleString()} × {item.quantity}</p>
            </div>
            <div className="text-right">
              <p className="text-gray-900 font-semibold text-sm md:text-base">KES {(item.price * item.quantity).toLocaleString()}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
