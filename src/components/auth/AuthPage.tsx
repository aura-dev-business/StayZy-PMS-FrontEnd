'use client';
import React, { useState } from 'react';
import LoginForm from './LoginForm';
import SignupForm from './SignUpForm';

interface AuthPageProps {
  defaultMode?: 'login' | 'signup';
}

const AuthPage: React.FC<AuthPageProps> = ({ defaultMode = 'login' }) => {
  const [isSignUp, setIsSignUp] = useState(defaultMode === 'signup');

  const toggleMode = () => setIsSignUp(prev => !prev);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-4xl pt-20 font-bold text-gray-900 mb-8">Welcome to StayZy</h1>
        </div>

        {isSignUp ? <SignupForm /> : <LoginForm />}

        <div className="text-center">
          <p className="text-sm text-gray-600">
            {isSignUp ? 'Already have an account? ' : "Don't have an account? "}
            <button
              onClick={toggleMode}
              className="text-teal-600 hover:text-teal-700 font-medium transition-colors"
            >
              {isSignUp ? 'Log in' : 'Sign up'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
