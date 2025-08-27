import React from 'react';
import { Lock, ArrowRight } from 'lucide-react';

interface OtpFormProps {
  otp: string;
  setOtp: (otp: string) => void;
  handleLogin: (e: React.FormEvent) => void;
  error: string;
  phone: string;
  setShowOtp: (show: boolean) => void;
  isLoading: boolean;
}

export const OtpForm: React.FC<OtpFormProps> = ({
  otp,
  setOtp,
  handleLogin,
  error,
  phone,
  setShowOtp,
  isLoading,
}) => {
  return (
    <form onSubmit={handleLogin} className="space-y-6">
      <div>
        <label className="block text-gray-700 text-sm font-semibold mb-3">
          Verification Code
        </label>
        <div className="relative">
          <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            placeholder="Enter 4-digit code"
            maxLength={4}
          />
        </div>
        <p className="text-gray-500 text-sm mt-3">
          Code sent to {phone}.
        </p>
      </div>

      {error && (
        <div className="text-red-600 text-sm bg-red-50 p-4 rounded-lg border border-red-200">
          {error}
        </div>
      )}

      <div className="flex space-x-3">
        <button
          type="button"
          onClick={() => setShowOtp(false)}
          className="flex-1 bg-gray-100 text-gray-700 py-4 px-4 rounded-xl hover:bg-gray-200 transition-all duration-200 font-semibold"
        >
          Back
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="flex-1 bg-[#5771FF] text-white py-4 px-4 rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-200 disabled:opacity-50 flex items-center justify-center space-x-2 font-semibold shadow-lg"
        >
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
          ) : (
            <>
              <span>Verify & Login</span>
              <ArrowRight className="w-5 h-5" />
            </>
          )}
        </button>
      </div>
    </form>
  );
};
