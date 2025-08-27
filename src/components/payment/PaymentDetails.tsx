import React from 'react';
import { Banknote, Smartphone } from 'lucide-react';

interface PaymentDetailsProps {
  paymentMethod: 'cash' | 'mpesa';
  amount: number;
}

export const PaymentDetails: React.FC<PaymentDetailsProps> = ({
  paymentMethod,
  amount,
}) => {
  const getPaymentMethodInfo = () => {
    switch (paymentMethod) {
      case 'cash':
        return {
          title: 'Cash Payment',
          icon: Banknote,
          color: 'bg-green-500',
          description: 'Complete your cash payment',
        };
      case 'mpesa':
        return {
          title: 'M-Pesa Payment',
          icon: Smartphone,
          color: 'bg-purple-500',
          description: 'Waiting for M-Pesa payment confirmation',
        };
    }
  };

  const paymentInfo = getPaymentMethodInfo();
  const Icon = paymentInfo.icon;

  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
      {/* Payment Method Header */}
      <div className="flex items-center space-x-4 mb-8">
        <div className={`w-16 h-16 ${paymentInfo.color} rounded-xl flex items-center justify-center`}>
          <Icon className="w-8 h-8 text-white" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-900">{paymentInfo.title}</h2>
          <p className="text-gray-600">Complete your payment securely</p>
        </div>
      </div>

      {/* Payment Amount */}
      <div className="bg-gray-50 rounded-xl p-6 mb-8">
        <div className="flex justify-between items-center">
          <span className="text-lg font-semibold text-gray-900">Total Amount</span>
          <span className="text-2xl font-bold text-gray-900">KES {amount.toLocaleString()}</span>
        </div>
      </div>

      {/* Payment Instructions */}
      <div className="mb-8">
        {paymentMethod === 'cash' ? (
          <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
            <Banknote className="w-16 h-16 text-green-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-green-900 mb-2">Cash Payment Ready</h3>
            <p className="text-green-700 mb-4">
              Collect KES {amount.toLocaleString()} from the customer and complete the transaction.
            </p>
          </div>
        ) : (
          <div className="bg-purple-50 border border-purple-200 rounded-xl p-6 text-center">
            <Smartphone className="w-16 h-16 text-purple-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-purple-900 mb-2">M-Pesa Payment Setup</h3>
            <p className="text-purple-700 mb-4">
              Click "Start M-Pesa Payment" to begin waiting for the customer's payment.
            </p>
            <div className="bg-white rounded-lg p-4 border border-purple-200">
              <p className="text-purple-900 font-semibold">Till Number: 174379</p>
              <p className="text-purple-700 text-sm">Customer will pay to this till number</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
