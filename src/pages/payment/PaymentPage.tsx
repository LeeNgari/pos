import React, { useState, useEffect } from 'react';
import { PaymentHeader } from '../../components/payment/PaymentHeader';
import { PaymentSuccess } from '../../components/payment/PaymentSuccess';
import { MpesaWaiting } from '../../components/payment/MpesaWaiting';
import { PaymentDetails } from '../../components/payment/PaymentDetails';
import { Banknote, Smartphone } from 'lucide-react';
import { PaymentActions } from '../../components/payment/PaymentActions';

interface PaymentPageProps {
  paymentMethod: 'cash' | 'mpesa';
  amount: number;
  onBack: () => void;
  onPaymentComplete: () => void;
}

export function PaymentPage({ paymentMethod, amount, onBack, onPaymentComplete }: PaymentPageProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [waitingForPayment, setWaitingForPayment] = useState(false);
  const [transactionId, setTransactionId] = useState('');
  const [timeElapsed, setTimeElapsed] = useState(0);

  // Simulate M-Pesa transaction appearing
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (waitingForPayment) {
      interval = setInterval(() => {
        setTimeElapsed(prev => prev + 1);
        // Simulate transaction appearing after 10-15 seconds
        if (timeElapsed >= 12) {
          const mockTransactionId = `MP${Date.now().toString().slice(-8)}`;
          setTransactionId(mockTransactionId);
          setWaitingForPayment(false);
          setIsComplete(true);
          
          // Auto redirect after 2 seconds
          setTimeout(() => {
            onPaymentComplete();
          }, 2000);
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [waitingForPayment, timeElapsed, onPaymentComplete]);

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

  const handlePayment = async () => {
    setIsProcessing(true);
    
    if (paymentMethod === 'cash') {
      // For cash, process immediately
      await new Promise(resolve => setTimeout(resolve, 2000));
      setIsProcessing(false);
      setIsComplete(true);
      
      // Auto redirect after 2 seconds
      setTimeout(() => {
        onPaymentComplete();
      }, 2000);
    } else if (paymentMethod === 'mpesa') {
      // For M-Pesa, start waiting for transaction
      setIsProcessing(false);
      setWaitingForPayment(true);
      setTimeElapsed(0);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (isComplete) {
    return (
      <PaymentSuccess
        amount={amount}
        paymentMethod={paymentMethod}
        transactionId={transactionId}
      />
    );
  }

  if (waitingForPayment) {
    return (
      <MpesaWaiting
        amount={amount}
        timeElapsed={timeElapsed}
        onBack={onBack}
        formatTime={formatTime}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <PaymentHeader paymentMethod={paymentMethod} onBack={onBack} />

        <PaymentDetails paymentMethod={paymentMethod} amount={amount} />

        <PaymentActions
          onBack={onBack}
          handlePayment={handlePayment}
          isProcessing={isProcessing}
          paymentMethod={paymentMethod}
          paymentInfoColor={paymentInfo.color}
        />
      </div>
    </div>
  );
}
