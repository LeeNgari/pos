import React, { useState } from 'react';
import { OrderItem } from '../../types';
import { CheckoutHeader } from '../../components/checkout/CheckoutHeader';
import { OrderSummarySection } from '../../components/checkout/OrderSummarySection';
import { CustomerInfoSection } from '../../components/checkout/CustomerInfoSection';
import { PaymentMethodSelection } from '../../components/checkout/PaymentMethodSelection';
import { OrderTotalSection } from '../../components/checkout/OrderTotalSection';

interface CheckoutPageProps {
  items: OrderItem[];
  customerInfo: {
    name?: string;
    phone?: string;
    tableNumber?: string;
    roomNumber?: string;
  };
  onBack: () => void;
  onProceedToPayment: (paymentMethod: 'cash' | 'mpesa') => void;
}

export function CheckoutPage({ items, customerInfo, onBack, onProceedToPayment }: CheckoutPageProps) {
  const [selectedPayment, setSelectedPayment] = useState<'cash' | 'mpesa' | null>(null);

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleProceed = () => {
    if (selectedPayment) {
      onProceedToPayment(selectedPayment);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-4 md:py-8">
      <div className="max-w-4xl mx-auto px-4">
        <CheckoutHeader onBack={onBack} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          <div className="lg:col-span-2 space-y-6">
            <OrderSummarySection items={items} />
            <CustomerInfoSection customerInfo={customerInfo} />
            <PaymentMethodSelection
              selectedPayment={selectedPayment}
              setSelectedPayment={setSelectedPayment}
            />
          </div>

          <OrderTotalSection
            total={total}
            selectedPayment={selectedPayment}
            handleProceed={handleProceed}
          />
        </div>
      </div>
    </div>
  );
}
