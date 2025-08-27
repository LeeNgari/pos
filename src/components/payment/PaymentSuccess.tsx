import React from 'react';
import { CheckCircle, Building2 } from 'lucide-react';

interface PaymentSuccessProps {
  amount: number;
  paymentMethod: 'cash' | 'mpesa';
  transactionId: string;
}

export const PaymentSuccess: React.FC<PaymentSuccessProps> = ({
  amount,
  paymentMethod,
  transactionId,
}) => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-2xl p-8 shadow-xl border border-gray-100 text-center">
        <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment Successful!</h2>
        <p className="text-gray-600 mb-6">
          Your payment of KES {amount.toLocaleString()} has been processed successfully.
        </p>
        <div className="bg-gray-50 rounded-xl p-4 mb-6">
          <p className="text-gray-600 text-sm">
            {paymentMethod === 'mpesa' ? 'M-Pesa Transaction ID' : 'Payment Reference'}
          </p>
          <p className="text-gray-900 font-mono font-semibold">
            {paymentMethod === 'mpesa' && transactionId ? transactionId : `CASH${Date.now().toString().slice(-8)}`}
          </p>
        </div>
        <div className="flex items-center justify-center space-x-2 mb-4">
          <Building2 className="w-5 h-5 text-blue-600" />
          <span className="text-blue-600 font-semibold">The Hub Group</span>
        </div>
        <p className="text-gray-500 text-sm">Generating receipt...</p>
      </div>
    </div>
  );
};
