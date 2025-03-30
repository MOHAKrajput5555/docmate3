// src/components/Login.js
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import '../styles/Login.css';

const Login = () => {
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSendOtp = () => {
    if (mobile.length === 10) {
      // Simulate sending OTP (in production, use an SMS API)
      setOtpSent(true);
      setError('');
    } else {
      setError('Please enter a valid 10-digit mobile number.');
    }
  };

  const handleLogin = () => {
    const success = login(mobile, otp);
    if (success) {
      navigate('/');
    } else {
      setError('Invalid mobile number or OTP.');
    }
  };

  return (
    <div className="login-container">
      <h2>Admin Login</h2>
      <div className="login-form">
        <div className="form-group">
          <label>Mobile Number</label>
          <input
            type="text"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            placeholder="Enter mobile number"
            disabled={otpSent}
          />
        </div>
        {otpSent && (
          <div className="form-group">
            <label>OTP</label>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP (123456)"
            />
          </div>
        )}
        {error && <p className="error-message">{error}</p>}
        {!otpSent ? (
          <button onClick={handleSendOtp} className="send-otp-button">
            Send OTP
          </button>
        ) : (
          <button onClick={handleLogin} className="login-button">
            Login
          </button>
        )}
      </div>
    </div>
  );
};

export default Login;