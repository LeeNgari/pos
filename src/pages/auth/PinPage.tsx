import React, { useState } from "react";
import { ArrowRight,Lock } from "lucide-react";
import { useApp } from "../../context/AppContext";
import Logo from "../../assets/the-hub-group-high-resolution-logo-transparent.png"

export function PinPage() {
  const { setPinEntered } = useApp();
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === "1234") {
      setPinEntered(true);
    } else {
      setError("Invalid PIN. Please try again.");
      setPin("");
    }
  };

  const handlePinChange = (value: string) => {
    if (value.length <= 4 && /^\d*$/.test(value)) {
      setPin(value);
      setError("");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          
          <img src={Logo} alt="Logo" className="w-full" />
          <p className="text-gray-600">Enter your PIN to access the system</p>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
          <form onSubmit={handlePinSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-3 text-center">
                Security PIN
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="password"
                  value={pin}
                  onChange={(e) => handlePinChange(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl text-gray-900 text-center text-2xl tracking-widest focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="••••"
                  maxLength={4}
                />
              </div>
              <p className="text-gray-500 text-sm mt-2 text-center">
                Enter PIN
              </p>
            </div>

            {error && (
              <div className="text-red-600 text-sm bg-red-50 p-4 rounded-lg border border-red-200 text-center">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={pin.length !== 4}
              className="w-full bg-[#5771FF] text-white py-4 px-4 rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 font-semibold shadow-lg"
            >
              <span>Access System</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
