'use client';

import React, { useState } from 'react';

interface NavbarProps {
  className?: string;
}

const Navbar: React.FC<NavbarProps> = ({ className = '' }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className={`bg-white border-b border-gray-200 px-6 py-4 ${className}`}>
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-bold">S</span>
            </div>
            <span className="text-xl font-semibold text-gray-900">StayZy</span>
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="/" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">
              Home
            </a>
            <a href="/about" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">
              About
            </a>
            <a href="/contact" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">
              Contact
            </a>
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <a 
              href="/signup" 
              className="bg-teal-700 hover:bg-teal-800 text-white px-4 py-2 rounded-md font-medium transition-colors"
            >
              Sign Up
            </a>
            <a 
              href="/login" 
              className="text-gray-700 hover:text-gray-900 font-medium transition-colors"
            >
              Log In
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              // Close icon
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              // Hamburger icon
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden transition-all duration-300 ease-in-out ${
          isMenuOpen 
            ? 'max-h-96 opacity-100 mt-4' 
            : 'max-h-0 opacity-0 overflow-hidden'
        }`}>
          <div className="py-4 space-y-4 border-t border-gray-200">
            {/* Mobile Navigation Links */}
            <div className="space-y-3">
              <a 
                href="/" 
                onClick={closeMenu}
                className="block text-gray-700 hover:text-gray-900 font-medium transition-colors py-2"
              >
                Home
              </a>
              <a 
                href="/about" 
                onClick={closeMenu}
                className="block text-gray-700 hover:text-gray-900 font-medium transition-colors py-2"
              >
                About
              </a>
              <a 
                href="/contact" 
                onClick={closeMenu}
                className="block text-gray-700 hover:text-gray-900 font-medium transition-colors py-2"
              >
                Contact
              </a>
            </div>
            
            {/* Mobile Auth Buttons */}
            <div className="pt-4 space-y-3 border-t border-gray-100">
              <a 
                href="/signup" 
                onClick={closeMenu}
                className="block w-full bg-teal-700 hover:bg-teal-800 text-white px-4 py-3 rounded-md font-medium transition-colors text-center"
              >
                Sign Up
              </a>
              <a 
                href="/login" 
                onClick={closeMenu}
                className="block w-full text-gray-700 hover:text-gray-900 font-medium transition-colors text-center py-2"
              >
                Log In
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;