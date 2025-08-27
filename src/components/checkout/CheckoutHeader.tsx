import React from 'react';
import { ArrowLeft } from 'lucide-react';

interface CheckoutHeaderProps {
  onBack: () => void;
}

export const CheckoutHeader: React.FC<CheckoutHeaderProps> = ({ onBack }) => {
  return (
    <div className="flex items-center space-x-3 md:space-x-4 mb-6 md:mb-8">
      <button
        onClick={onBack}
        className="p-2 bg-white rounded-lg shadow-sm border border-gray-200 hover:bg-gray-50 transition-colors flex-shrink-0"
      >
        <ArrowLeft className="w-5 h-5 text-gray-600" />
      </button>
      <div className="flex items-center space-x-3">
        <div>
          <h1 className="text-xl md:text-3xl font-bold text-gray-900">The Hub Group - Checkout</h1>
          <p className="text-gray-600 text-sm md:text-base hidden md:block">Review your order and select payment method</p>
        </div>
      </div>
    </div>
  );
};
