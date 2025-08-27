import React from 'react';
import { Phone, ArrowRight } from 'lucide-react';

interface LoginFormProps {
  phone: string;
  setPhone: (phone: string) => void;
  handleSendOtp: (e: React.FormEvent) => void;
  error: string;
}

export const LoginForm: React.FC<LoginFormProps> = ({
  phone,
  setPhone,
  handleSendOtp,
  error,
}) => {
  return (
    <form onSubmit={handleSendOtp} className="space-y-6">
      <div>
        <label className="block text-gray-700 text-sm font-semibold mb-3">
          Phone Number
        </label>
        <div className="relative">
          <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            placeholder="Enter your phone number"
          />
        </div>
      </div>

      {error && (
        <div className="text-red-600 text-sm bg-red-50 p-4 rounded-lg border border-red-200">
          {error}
        </div>
      )}

      <button
        type="submit"
        className="w-full bg-[#5771FF] text-white py-4 px-4 rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-200 flex items-center justify-center space-x-2 font-semibold shadow-lg"
      >
        <span>Send Verification Code</span>
        <ArrowRight className="w-5 h-5" />
      </button>
    </form>
  );
};
