import React from 'react';
import { Banknote, Smartphone } from 'lucide-react';

interface PaymentMethodSelectionProps {
  selectedPayment: 'cash' | 'mpesa' | null;
  setSelectedPayment: (method: 'cash' | 'mpesa') => void;
}

export const PaymentMethodSelection: React.FC<PaymentMethodSelectionProps> = ({
  selectedPayment,
  setSelectedPayment,
}) => {
  const paymentMethods = [
    {
      id: 'cash' as const,
      name: 'Cash Payment',
      description: 'Pay with cash at the counter',
      icon: Banknote,
      color: 'bg-green-50 border-green-200 text-green-700',
      iconColor: 'text-green-600',
    },
    {
      id: 'mpesa' as const,
      name: 'M-Pesa',
      description: 'Pay with M-Pesa mobile money',
      icon: Smartphone,
      color: 'bg-purple-50 border-purple-200 text-purple-700',
      iconColor: 'text-purple-600',
    },
  ];

  return (
    <div className="bg-white rounded-xl md:rounded-2xl p-4 md:p-6 shadow-sm border border-gray-200">
      <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-4">Payment Method</h2>
      <div className="space-y-3">
        {paymentMethods.map((method) => {
          const Icon = method.icon;
          const isSelected = selectedPayment === method.id;
          
          return (
            <button
              key={method.id}
              onClick={() => setSelectedPayment(method.id)}
              className={`w-full p-3 md:p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                isSelected
                  ? `${method.color} border-current`
                  : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
              }`}
            >
              <div className="flex items-center space-x-3 md:space-x-4">
                <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center ${
                  isSelected ? 'bg-white/50' : 'bg-white'
                }`}>
                  <Icon className={`w-5 h-5 md:w-6 md:h-6 ${isSelected ? method.iconColor : 'text-gray-600'}`} />
                </div>
                <div className="flex-1">
                  <h3 className={`font-semibold text-sm md:text-base ${isSelected ? 'text-current' : 'text-gray-900'}`}>
                    {method.name}
                  </h3>
                  <p className={`text-xs md:text-sm ${isSelected ? 'text-current opacity-80' : 'text-gray-600'}`}>
                    {method.description}
                  </p>
                </div>
                <div className={`w-5 h-5 rounded-full border-2 ${
                  isSelected 
                    ? 'border-current bg-current' 
                    : 'border-gray-300'
                }`}>
                  {isSelected && (
                    <div className="w-full h-full rounded-full bg-white scale-50"></div>
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
