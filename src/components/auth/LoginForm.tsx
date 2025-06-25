'use client';
import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

const LoginForm: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loginData, setLoginData] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    console.log('Login Attempt:', loginData);
    // TODO: connect to backend API
  };

  return (
    <div className="space-y-6">
      {/* Username */}
      <input
        name="username"
        type="text"
        value={loginData.username}
        onChange={handleChange}
        placeholder="Username"
        className="w-full px-4 py-3 border border-gray-300 rounded-lg"
      />

      {/* Password */}
      <div className="relative">
        <input
          name="password"
          type={showPassword ? 'text' : 'password'}
          value={loginData.password}
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

      <button
        onClick={handleSubmit}
        className="w-full bg-teal-600 text-white py-3 rounded-lg hover:bg-teal-700"
      >
        Log In
      </button>
    </div>
  );
};

export default LoginForm;
