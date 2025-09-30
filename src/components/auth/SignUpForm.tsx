'use client';

import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation'; // ✅ Import for routing

const SignupForm: React.FC = () => {
  const router = useRouter(); // ✅ Initialize router
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [signupData, setSignupData] = useState({
    fullName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignupData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    const { fullName, username, email, password, confirmPassword, phone } = signupData;

    if (password !== confirmPassword) {
      toast.error('Passwords do not match!');
      return;
    }

    if (!/^\d{10}$/.test(phone)) {
      toast.error('Phone number must be exactly 10 digits');
      return;
    }

    try {
      const response = await fetch("http://localhost:8081/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fullName, username, email, password, phone }),
      });

      if (!response.ok) {
        const text = await response.text();
        toast.error(`Registration failed: ${text}`);
        return;
      }

      toast.success("✅ Registration successful!");
      setSignupData({
        fullName: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone: '',
      });

      router.push('/login'); // ✅ Redirect after success
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("Something went wrong.");
    }
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
        name="username"
        type="text"
        value={signupData.username}
        onChange={handleChange}
        placeholder="Username"
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
        name="phone"
        type="tel"
        value={signupData.phone}
        onChange={handleChange}
        placeholder="Phone Number"
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
