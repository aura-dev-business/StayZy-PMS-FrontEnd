'use client';
import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

const SignupForm: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [signupData, setSignupData] = useState({
    fullName: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignupData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (signupData.password !== signupData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    console.log('Signup Attempt:', signupData);
    // TODO: connect to backend API
  };

  return (
    <div className="space-y-6">
      <input
        name="fullName"
        type="text"
        value={signupData.fullName}
        onChange={handleChange}
        placeholder="Full Name"
        className="w-full px-4 py-3 border border-gray-300 rounded-lg"
      />
      <input
        name="email"
        type="email"
        value={signupData.email}
        onChange={handleChange}
        placeholder="Email"
        className="w-full px-4 py-3 border border-gray-300 rounded-lg"
      />
      <input
        name="username"
        type="text"
        value={signupData.username}
        onChange={handleChange}
        placeholder="Username"
        className="w-full px-4 py-3 border border-gray-300 rounded-lg"
      />
      <div className="relative">
        <input
          name="password"
          type={showPassword ? 'text' : 'password'}
          value={signupData.password}
          onChange={handleChange}
          placeholder="Password"
          className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg"
        />
        <button
          type="button"
          onClick={() => setShowPassword(prev => !prev)}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
        >
          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
        </button>
      </div>
      <div className="relative">
        <input
          name="confirmPassword"
          type={showConfirmPassword ? 'text' : 'password'}
          value={signupData.confirmPassword}
          onChange={handleChange}
          placeholder="Confirm Password"
          className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg"
        />
        <button
          type="button"
          onClick={() => setShowConfirmPassword(prev => !prev)}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
        >
          {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
        </button>
      </div>

      <button
        onClick={handleSubmit}
        className="w-full bg-teal-600 text-white py-3 rounded-lg hover:bg-teal-700"
      >
        Sign Up
      </button>
    </div>
  );
};

export default SignupForm;
