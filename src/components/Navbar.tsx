'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import LoggedInNavbar from './NavbarUser';
import { usePathname } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';

interface NavbarProps {
  className?: string;
}

const Navbar: React.FC<NavbarProps> = ({ className = '' }) => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const user = useAuthStore((state) => state.user);
  const loading = useAuthStore((state) => state.loading);

  // Navigation items - consistent for both desktop and mobile
  const navigationItems = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/contacts', label: 'Contact' },
    { path: '/properties', label: 'Properties' },
  ];

  // Lock/unlock body scroll when mobile menu is toggled
  useEffect(() => {
    if (isMenuOpen) {
      // Store current scroll position
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
      
      // Store scroll position for restoration
      document.body.setAttribute('data-scroll-y', scrollY.toString());
    } else {
      // Restore scroll position when menu closes
      const scrollY = document.body.getAttribute('data-scroll-y');
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
      
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY));
        document.body.removeAttribute('data-scroll-y');
      }
    }

    // Cleanup function to ensure scroll is restored if component unmounts
    return () => {
      if (isMenuOpen) {
        const scrollY = document.body.getAttribute('data-scroll-y');
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        document.body.style.overflow = '';
        
        if (scrollY) {
          window.scrollTo(0, parseInt(scrollY));
          document.body.removeAttribute('data-scroll-y');
        }
      }
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > window.innerWidth * 0.01);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) { // lg breakpoint
        setIsMenuOpen(false);
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (isMenuOpen && !target.closest('nav')) {
        setIsMenuOpen(false);
      }
    };

    // Prevent scrolling with arrow keys and spacebar when menu is open
    const handleKeyDown = (event: KeyboardEvent) => {
      if (isMenuOpen && ['ArrowUp', 'ArrowDown', 'Space', 'PageUp', 'PageDown', 'Home', 'End'].includes(event.code)) {
        event.preventDefault();
      }
    };

    window.addEventListener('resize', handleResize);
    document.addEventListener('click', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMenuOpen]);

  const isAuthPage =
    pathname === '/login' ||
    pathname === '/signup' ||
    pathname === '/admin' ||
    pathname === '/properties' ||
    pathname.startsWith('/properties/') ||
    pathname.startsWith('/SearchProperties');

  if (
    pathname.startsWith('/dashboard') ||
    pathname.startsWith('/admin/dashboard')
  ) {
    return null;
  }

  if (loading) return null;

  if (user) {
    return <LoggedInNavbar className={className} user={user} onLogout={useAuthStore.getState().logout} />;
  }

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-out ${
        isScrolled || isAuthPage
          ? 'bg-white/95 backdrop-blur-md border-b border-gray-200/50 shadow-lg'
          : 'bg-transparent border-b border-transparent'
      } ${className}`}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 xl:px-6">
        <div className="flex items-center justify-between h-14 sm:h-16 md:h-18 lg:h-20">
          {/* Logo */}
          <a href="/" className="flex items-center space-x-1 sm:space-x-2 md:space-x-3 group">
            <div className="relative">
              <div className="flex items-center justify-center group-hover:scale-105 transition-all duration-300">
                <Image
                  src={
                    isScrolled || isAuthPage
                      ? '/images/Stayzy2.png'
                      : '/images/STAYZY.png'
                  }
                  alt="Stayzy Logo"
                  width={120}
                  height={32}
                  priority={isScrolled || isAuthPage}
                  style={{ height: 'auto' }}
                  className="transition-all duration-500 ease-out sm:w-[130px] md:w-[140px] lg:w-[150px]"
                />
              </div>
            </div>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            {navigationItems.map(({ path, label }) => (
              <a
                key={path}
                href={path}
                className={`relative font-medium text-sm xl:text-base transition-all duration-300 hover:scale-105 group ${
                  isScrolled || isAuthPage
                    ? 'text-gray-700 hover:text-teal-600'
                    : 'text-white hover:text-teal-300'
                }`}
              >
                {label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-teal-500 to-teal-600 group-hover:w-full transition-all duration-300"></span>
              </a>
            ))}
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden lg:flex items-center space-x-2 md:space-x-3 lg:space-x-4">
            <a
              href="/signup"
              className="relative bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white px-3 py-2 sm:px-4 sm:py-2.5 md:px-5 lg:px-6 rounded-lg md:rounded-xl text-xs sm:text-sm md:text-base font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg group overflow-hidden"
            >
              <span className="relative z-10">Sign Up</span>
              <div className="absolute inset-0 bg-gradient-to-r from-teal-500 to-teal-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            </a>
            <a
              href="/login"
              className={`font-medium px-3 py-2 sm:px-4 sm:py-2.5 md:px-4 lg:px-4 rounded-lg md:rounded-xl border-2 text-xs sm:text-sm md:text-base transition-all duration-300 hover:scale-105 ${
                isScrolled || isAuthPage
                  ? 'text-gray-700 border-gray-300 hover:text-teal-600 hover:border-teal-500 hover:bg-teal-50'
                  : 'text-white border-white/30 hover:text-teal-300 hover:border-teal-300 hover:bg-white/10'
              }`}
            >
              Log In
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`lg:hidden p-2 rounded-lg transition-all duration-300 hover:scale-110 ${
              isScrolled || isAuthPage
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

        {/* Mobile Menu Overlay */}
        <div
          className={`lg:hidden fixed inset-0 z-40 transition-opacity duration-300 ${
            isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          <div 
            className="absolute inset-0 bg-black/20 backdrop-blur-sm"
            onClick={() => setIsMenuOpen(false)}
          />
        </div>

        {/* Mobile Menu Panel */}
        <div
          className={`lg:hidden fixed top-0 right-0 h-full w-72 sm:w-80 max-w-[85vw] z-50 transform transition-transform duration-300 ease-out ${
            isMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div
            className={`h-full backdrop-blur-xl shadow-2xl ${
              isScrolled || isAuthPage
                ? 'bg-white/95 border-l border-gray-200/50'
                : 'bg-white/10 border-l border-white/20'
            }`}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200/30">
              <div className="flex items-center space-x-2 sm:space-x-3">
                <Image
                  src={
                    isScrolled || isAuthPage
                      ? '/images/Stayzy2.png'
                      : '/images/STAYZY.png'
                  }
                  alt="Stayzy Logo"
                  width={100}
                  height={26}
                  style={{ height: 'auto' }}
                  className="sm:w-[120px]"
                />
              </div>
              <button
                onClick={() => setIsMenuOpen(false)}
                className={`p-2 rounded-lg transition-colors duration-200 ${
                  isScrolled || isAuthPage
                    ? 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    : 'text-white hover:text-gray-200 hover:bg-white/20'
                }`}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Navigation Links */}
            <div className="px-4 sm:px-6 py-6 sm:py-8 space-y-1 sm:space-y-2">
              {navigationItems.map(({ path, label }, index) => (
                <a
                  key={path}
                  href={path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block py-3 sm:py-4 px-3 sm:px-4 rounded-xl text-base sm:text-lg font-medium transition-all duration-200 hover:translate-x-2 ${
                    isScrolled || isAuthPage
                      ? 'text-gray-800 hover:text-teal-600 hover:bg-teal-50'
                      : 'text-white hover:text-teal-200 hover:bg-white/20'
                  }`}
                  style={{
                    animationDelay: `${index * 100}ms`,
                    animation: isMenuOpen ? 'slideInFromRight 0.5s ease-out forwards' : 'none',
                    opacity: 0
                  }}
                >
                  {label}
                </a>
              ))}
            </div>

            {/* Auth Buttons */}
            <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 space-y-3 sm:space-y-4 border-t border-gray-200/30">
              <a
                href="/signup"
                onClick={() => setIsMenuOpen(false)}
                className="block w-full bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white px-4 sm:px-6 py-3 sm:py-4 rounded-xl font-semibold text-center text-sm sm:text-base transition-all duration-200 hover:shadow-lg hover:scale-[1.02]"
                style={{
                  animationDelay: '400ms',
                  animation: isMenuOpen ? 'slideInFromRight 0.5s ease-out forwards' : 'none',
                  opacity: 0
                }}
              >
                Sign Up
              </a>
              <a
                href="/login"
                onClick={() => setIsMenuOpen(false)}
                className={`block w-full font-semibold text-center py-3 sm:py-4 px-4 sm:px-6 rounded-xl border-2 text-sm sm:text-base transition-all duration-200 hover:scale-[1.02] ${
                  isScrolled || isAuthPage
                    ? 'text-gray-700 border-gray-300 hover:text-teal-600 hover:border-teal-500 hover:bg-teal-50'
                    : 'text-white border-white/40 hover:text-teal-200 hover:border-teal-300 hover:bg-white/20'
                }`}
                style={{
                  animationDelay: '500ms',
                  animation: isMenuOpen ? 'slideInFromRight 0.5s ease-out forwards' : 'none',
                  opacity: 0
                }}
              >
                Log In
              </a>
            </div>
          </div>
        </div>

        {/* Animation keyframes */}
        <style jsx>{`
          @keyframes slideInFromRight {
            from {
              opacity: 0;
              transform: translateX(30px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }
        `}</style>
      </div>
    </nav>
  );
};

export default Navbar;