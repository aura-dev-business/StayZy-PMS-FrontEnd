'use client';

import React, { useState, useEffect } from 'react';

interface NavbarProps {
  className?: string;
}

const Navbar: React.FC<NavbarProps> = ({ className = '' }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentPath, setCurrentPath] = useState('');

  useEffect(() => {
    // Set initial path and update on path changes
    setCurrentPath(window.location.pathname);
    
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };

    // Listen for browser navigation events
    window.addEventListener('popstate', handleLocationChange);
    
    // For single-page applications, you might need to listen to route changes
    // This is a simple approach - for Next.js, you'd use useRouter
    const observer = new MutationObserver(() => {
      if (window.location.pathname !== currentPath) {
        setCurrentPath(window.location.pathname);
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      observer.disconnect();
    };
  }, [currentPath]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Hide navbar on dashboard page
  if (currentPath === '/dashboard') {
    return null;
  }

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  // Check if we're on auth pages to force solid background
  const isAuthPage = currentPath === '/login' || currentPath === '/signup';

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-out ${
        isScrolled || isAuthPage
          ? 'bg-white/95 backdrop-blur-md border-b border-gray-200/50 shadow-lg'
          : 'bg-transparent border-b border-transparent'
      } ${className}`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-teal-600 to-teal-800 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                <span className="text-white text-lg font-bold">S</span>
              </div>
              <div className="absolute -inset-1 bg-gradient-to-br from-teal-400 to-teal-600 rounded-xl opacity-20 group-hover:opacity-40 transition-opacity duration-300 -z-10"></div>
            </div>
            <span className={`text-2xl font-bold tracking-tight transition-colors duration-300 ${
              (isScrolled || isAuthPage) ? 'text-gray-900' : 'text-white'
            } group-hover:text-teal-600`}>
              STAYZY
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a 
              href="/" 
              className={`relative font-medium transition-all duration-300 hover:scale-105 group ${
                (isScrolled || isAuthPage) ? 'text-gray-700 hover:text-teal-600' : 'text-white hover:text-teal-300'
              }`}
            >
              Home
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-teal-500 to-teal-600 group-hover:w-full transition-all duration-300"></span>
            </a>
            <a 
              href="/about" 
              className={`relative font-medium transition-all duration-300 hover:scale-105 group ${
                (isScrolled || isAuthPage) ? 'text-gray-700 hover:text-teal-600' : 'text-white hover:text-teal-300'
              }`}
            >
              About
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-teal-500 to-teal-600 group-hover:w-full transition-all duration-300"></span>
            </a>
            <a 
              href="/contact" 
              className={`relative font-medium transition-all duration-300 hover:scale-105 group ${
                (isScrolled || isAuthPage) ? 'text-gray-700 hover:text-teal-600' : 'text-white hover:text-teal-300'
              }`}
            >
              Contact
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-teal-500 to-teal-600 group-hover:w-full transition-all duration-300"></span>
            </a>
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <a 
              href="/signup" 
              className="relative bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white px-6 py-2.5 rounded-xl font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg group overflow-hidden"
            >
              <span className="relative z-10">Sign Up</span>
              <div className="absolute inset-0 bg-gradient-to-r from-teal-500 to-teal-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            </a>
            <a 
              href="/login" 
              className={`font-medium px-4 py-2.5 rounded-xl border-2 transition-all duration-300 hover:scale-105 ${
                (isScrolled || isAuthPage)
                  ? 'text-gray-700 border-gray-300 hover:text-teal-600 hover:border-teal-500 hover:bg-teal-50' 
                  : 'text-white border-white/30 hover:text-teal-300 hover:border-teal-300 hover:bg-white/10'
              }`}
            >
              Log In
            </a>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={toggleMenu}
            className={`md:hidden p-2 rounded-xl transition-all duration-300 hover:scale-110 ${
              (isScrolled || isAuthPage)
                ? 'text-gray-700 hover:text-teal-600 hover:bg-teal-50' 
                : 'text-white hover:text-teal-300 hover:bg-white/10'
            }`}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden transition-all duration-500 ease-out ${
          isMenuOpen ? 'max-h-96 opacity-100 mt-6' : 'max-h-0 opacity-0 overflow-hidden'
        }`}>
          <div className={`py-6 space-y-4 rounded-2xl border backdrop-blur-md ${
            (isScrolled || isAuthPage)
              ? 'bg-white/80 border-gray-200/50 shadow-lg' 
              : 'bg-white/10 border-white/20'
          }`}>
            <div className="px-6 space-y-4">
              <a 
                href="/" 
                onClick={closeMenu} 
                className={`block font-medium py-3 px-4 rounded-xl transition-all duration-300 hover:scale-105 ${
                  (isScrolled || isAuthPage)
                    ? 'text-gray-700 hover:text-teal-600 hover:bg-teal-50' 
                    : 'text-white hover:text-teal-300 hover:bg-white/10'
                }`}
              >
                Home
              </a>
              <a 
                href="/about" 
                onClick={closeMenu} 
                className={`block font-medium py-3 px-4 rounded-xl transition-all duration-300 hover:scale-105 ${
                  (isScrolled || isAuthPage)
                    ? 'text-gray-700 hover:text-teal-600 hover:bg-teal-50' 
                    : 'text-white hover:text-teal-300 hover:bg-white/10'
                }`}
              >
                About
              </a>
              <a 
                href="/contact" 
                onClick={closeMenu} 
                className={`block font-medium py-3 px-4 rounded-xl transition-all duration-300 hover:scale-105 ${
                  (isScrolled || isAuthPage)
                    ? 'text-gray-700 hover:text-teal-600 hover:bg-teal-50' 
                    : 'text-white hover:text-teal-300 hover:bg-white/10'
                }`}
              >
                Contact
              </a>
            </div>
            <div className="px-6 pt-4 space-y-3 border-t border-gray-200/30">
              <a 
                href="/signup" 
                onClick={closeMenu} 
                className="block w-full bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white px-4 py-3 rounded-xl font-medium text-center transition-all duration-300 hover:scale-105 hover:shadow-lg"
              >
                Sign Up
              </a>
              <a 
                href="/login" 
                onClick={closeMenu} 
                className={`block w-full font-medium text-center py-3 px-4 rounded-xl border-2 transition-all duration-300 hover:scale-105 ${
                  (isScrolled || isAuthPage)
                    ? 'text-gray-700 border-gray-300 hover:text-teal-600 hover:border-teal-500 hover:bg-teal-50' 
                    : 'text-white border-white/30 hover:text-teal-300 hover:border-teal-300 hover:bg-white/10'
                }`}
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