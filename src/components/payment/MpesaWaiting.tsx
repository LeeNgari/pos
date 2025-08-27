import React from 'react';
import { Smartphone, Clock, Loader, ArrowLeft } from 'lucide-react';

interface MpesaWaitingProps {
  amount: number;
  timeElapsed: number;
  onBack: () => void;
  formatTime: (seconds: number) => string;
}

export const MpesaWaiting: React.FC<MpesaWaitingProps> = ({
  amount,
  timeElapsed,
  onBack,
  formatTime,
}) => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-8">
          <button
            onClick={onBack}
            className="p-2 bg-white rounded-lg shadow-sm border border-gray-200 hover:bg-gray-50 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
              <Smartphone className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">M-Pesa Payment</h1>
              <p className="text-gray-600">Waiting for payment confirmation</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200 text-center">
          {/* Waiting Animation */}
          <div className="w-24 h-24 bg-purple-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <div className="relative">
              <Smartphone className="w-12 h-12 text-purple-600" />
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
                <Clock className="w-3 h-3 text-white animate-pulse" />
              </div>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-4">Waiting for M-Pesa Payment</h2>
          
          <div className="bg-purple-50 border border-purple-200 rounded-xl p-6 mb-6">
            <h3 className="text-lg font-semibold text-purple-900 mb-3">Payment Instructions</h3>
            <div className="space-y-2 text-purple-700">
              <p>1. Go to M-Pesa on your phone</p>
              <p>2. Select "Lipa na M-Pesa"</p>
              <p>3. Select "Buy Goods and Services"</p>
              <p>4. Enter Till Number: <span className="font-bold">174379</span></p>
              <p>5. Enter Amount: <span className="font-bold">KES {amount.toLocaleString()}</span></p>
              <p>6. Enter your M-Pesa PIN</p>
            </div>
          </div>

          <div className="bg-gray-50 rounded-xl p-6 mb-6">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-semibold text-gray-900">Amount to Pay</span>
              <span className="text-2xl font-bold text-gray-900">KES {amount.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Time Elapsed</span>
              <span className="text-gray-900 font-mono font-semibold">{formatTime(timeElapsed)}</span>
            </div>
          </div>

          <div className="flex items-center justify-center space-x-2 mb-4">
            <Loader className="w-5 h-5 text-purple-600 animate-spin" />
            <span className="text-purple-600 font-medium">Waiting for transaction...</span>
          </div>

          <p className="text-gray-500 text-sm">
            The transaction will appear automatically once payment is received
          </p>

          <button
            onClick={onBack}
            className="mt-6 bg-gray-100 text-gray-700 py-3 px-6 rounded-xl hover:bg-gray-200 transition-colors font-semibold"
          >
            Cancel Payment
          </button>
        </div>
      </div>
    </div>
  );
};
