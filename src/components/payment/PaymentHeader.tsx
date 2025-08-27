import React from 'react';
import { ArrowLeft, Banknote, Smartphone } from 'lucide-react';

interface PaymentHeaderProps {
  paymentMethod: 'cash' | 'mpesa';
  onBack: () => void;
}

export const PaymentHeader: React.FC<PaymentHeaderProps> = ({
  paymentMethod,
  onBack,
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
    <div className="flex items-center space-x-4 mb-8">
      <button
        onClick={onBack}
        className="p-2 bg-white rounded-lg shadow-sm border border-gray-200 hover:bg-gray-50 transition-colors"
      >
        <ArrowLeft className="w-5 h-5 text-gray-600" />
      </button>
      <div className="flex items-center space-x-3">
        <div className={`w-10 h-10 ${paymentInfo.color} rounded-lg flex items-center justify-center`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{paymentInfo.title}</h1>
          <p className="text-gray-600">{paymentInfo.description}</p>
        </div>
      </div>
    </div>
  );
};
