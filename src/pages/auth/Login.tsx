import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import Logo from "../../assets/the-hub-group-high-resolution-logo-transparent.png";
import { LoginForm } from './LoginForm';
import { OtpForm } from './OtpForm';
import { useNavigate } from 'react-router-dom';

export function Login() {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [showOtp, setShowOtp] = useState(false);
  const [error, setError] = useState('');
  const { login, state } = useApp();
  const navigate = useNavigate();

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone) {
      setError('Please enter your phone number');
      return;
    }
    
    // Simulate sending OTP
    setShowOtp(true);
    setError('');
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp) {
      setError('Please enter the OTP');
      return;
    }

    const loggedInUser = await login(phone, otp);
    console.log('Login success:', !!loggedInUser);
    console.log('User after login (from return value):', loggedInUser);

    if (loggedInUser) {
      if (loggedInUser.role === 'admin') {
        console.log('Redirecting to admin dashboard');
        navigate('/admin');
      } else {
        console.log('Redirecting to POS');
        navigate('/pos');
      }
    } else {
      setError('Invalid OTP. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Login Form */}
        <div className="lg:col-span-2 space-y-8">
          <div className="text-center">
              <img src={Logo} alt="Logo" className="w-full" />
            <p className="text-gray-600">Multi-Store POS Management System</p>
            <p className="text-gray-500 text-sm mt-1">Secure access to your business operations</p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            {!showOtp ? (
              <LoginForm
                phone={phone}
                setPhone={setPhone}
                handleSendOtp={handleSendOtp}
                error={error}
              />
            ) : (
              <OtpForm
                otp={otp}
                setOtp={setOtp}
                handleLogin={handleLogin}
                error={error}
                phone={phone}
                setShowOtp={setShowOtp}
                isLoading={state.auth.isLoading}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
