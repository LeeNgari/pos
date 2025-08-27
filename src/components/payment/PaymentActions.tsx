import React from 'react';
import { Loader } from 'lucide-react';

interface PaymentActionsProps {
  onBack: () => void;
  handlePayment: () => void;
  isProcessing: boolean;
  paymentMethod: 'cash' | 'mpesa';
  paymentInfoColor: string;
}

export const PaymentActions: React.FC<PaymentActionsProps> = ({
  onBack,
  handlePayment,
  isProcessing,
  paymentMethod,
  paymentInfoColor,
}) => {
  return (
    <div className="flex space-x-4">
      <button
        onClick={onBack}
        className="flex-1 bg-gray-100 text-gray-700 py-4 px-4 rounded-xl hover:bg-gray-200 transition-colors font-semibold"
      >
        Back to Checkout
      </button>
      <button
        onClick={handlePayment}
        disabled={isProcessing}
        className={`flex-1 ${paymentInfoColor} text-white py-4 px-4 rounded-xl hover:opacity-90 transition-all duration-200 disabled:opacity-50 flex items-center justify-center space-x-2 font-semibold shadow-lg`}
      >
        {isProcessing ? (
          <>
            <Loader className="w-5 h-5 animate-spin" />
            <span>Processing...</span>
          </>
        ) : (
          <span>
            {paymentMethod === 'cash' ? 'Complete Cash Payment' : 'Start M-Pesa Payment'}
          </span>
        )}
      </button>
    </div>
  );
};
