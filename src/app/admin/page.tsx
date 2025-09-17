'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'sonner';
import { div } from 'framer-motion/client';

const LoginForm: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // ✅ Show toast if redirected after successful registration
  useEffect(() => {
    if (searchParams.get('registered') === '1') {
      toast.success('Registration successful! Please log in.');
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    try {
      const response = await fetch('http://localhost:8081/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // ✅ Cookie is automatically sent/received
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
  toast.success('Login successful!');
  setTimeout(() => {
    router.push('/admin/dashboard');
  }, 200); // 🕒 Small delay helps cookies settle
      }
       else {
        // ✅ Safe JSON parsing with fallback
        let msg = 'Invalid credentials';
        try {
          const errorData = await response.json();
          msg = errorData.message || msg;
        } catch (err) {
          console.warn('Failed to parse error JSON');
        }

        setErrorMessage(msg);
        toast.error(msg);
      }
    } catch (error) {
      console.error('Login error:', error);
      setErrorMessage('Something went wrong. Please try again.');
      toast.error('Something went wrong. Please try again.');
    }
  };

  return (
    <div className='pt-[160px]'>
      <h1 className='text-center text-4xl font-black'>Welcome To StayZy Admin</h1>
    <div className="max-w-md mx-auto mt-10 p-6 p  border rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">Login</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Login
        </button>
        {errorMessage && (
          <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
        )}
      </form>
    </div>
    </div>
  );
};

export default LoginForm;
