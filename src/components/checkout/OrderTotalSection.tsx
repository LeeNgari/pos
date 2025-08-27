import React from 'react';
import { ArrowRight } from 'lucide-react';

interface OrderTotalSectionProps {
  total: number;
  selectedPayment: 'cash' | 'mpesa' | null;
  handleProceed: () => void;
}

export const OrderTotalSection: React.FC<OrderTotalSectionProps> = ({
  total,
  selectedPayment,
  handleProceed,
}) => {
  return (
    <div className="lg:col-span-1">
      <div className="bg-white rounded-xl md:rounded-2xl p-4 md:p-6 shadow-sm border border-gray-200 lg:sticky lg:top-8">
        <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-4">Order Total</h2>
        
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-600 text-sm md:text-base">Subtotal</span>
            <span className="text-gray-900 text-sm md:text-base">KES {total.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-base md:text-lg font-semibold text-gray-900">Total</span>
            <span className="text-xl md:text-2xl font-bold text-gray-900">KES {total.toLocaleString()}</span>
          </div>
        </div>

        <button
          onClick={handleProceed}
          disabled={!selectedPayment}
          className="w-full mt-6 bg-[#5771FF] text-white py-3 md:py-4 px-4 rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 font-semibold shadow-lg text-sm md:text-base"
        >
          <span>Proceed to Payment</span>
          <ArrowRight className="w-5 h-5" />
        </button>

        {!selectedPayment && (
          <p className="text-gray-500 text-xs md:text-sm text-center mt-3">
            Please select a payment method to continue
          </p>
        )}
      </div>
    </div>
  );
};
