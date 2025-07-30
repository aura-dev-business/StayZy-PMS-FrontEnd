'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import type { User } from '@/store/useAuthStore';

interface LoggedInNavbarProps {
  className?: string;
  user?: User;
  onLogout?: () => void;
}

const LoggedInNavbar: React.FC<LoggedInNavbarProps> = ({
  className = '',
  user: userProp,
  onLogout,
}) => {
  const zustandUser = useAuthStore((state) => state.user);
  const zustandLogout = useAuthStore((state) => state.logout);
  
  const user = userProp ?? zustandUser;
  const logout = onLogout ?? zustandLogout;
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  const pathname = usePathname();
  const isHome = pathname === '/';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (!(e.target as Element).closest('.navbar-container')) {
        setIsMenuOpen(false);
        setIsProfileOpen(false);
      }
    };
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  if (!user) return null;

  const navLinks = [
    { href: '/dashboard', label: 'Dashboard', icon: '🏠' },
    { href: '/dashboard/booking', label: 'Bookings', icon: '📅' },
    { href: '/properties', label: 'Properties', icon: '🏢' },
    { href: '/dashboard/wishlist', label: 'Favorites', icon: '❤️' },
  ];

  const profileLinks = [
    { href: '/dashboard/profile', label: 'Profile', icon: '👤' },
    { href: '/account', label: 'Settings', icon: '⚙️' },
    { href: '/help', label: 'Help', icon: '❓' },
  ];

  const getUserInitials = (name?: string) =>
    name?.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2) || '';

  const isTransparent = isHome && !scrolled;

  return (
    <nav
      className={`navbar-container fixed top-0 w-full z-50 transition-all duration-300 ${
        isTransparent
          ? 'bg-transparent'
          : 'bg-white/80 backdrop-blur-md border-b border-gray-200/50'
      } ${className}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="/" className="flex items-center">
            <Image 
              src="/images/Stayzy2.png" 
              alt="Stayzy" 
              width={120} 
              height={32} 
              className="transition-opacity duration-200 hover:opacity-80"
            />
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  pathname === link.href
                    ? isTransparent
                      ? 'text-white bg-white/20'
                      : 'text-gray-900 bg-gray-100'
                    : isTransparent
                      ? 'text-white/70 hover:text-white hover:bg-white/10'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <span className="text-base">{link.icon}</span>
                <span>{link.label}</span>
              </a>
            ))}
          </div>

          {/* Profile Section */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* User Name */}
            <span className={`text-sm font-medium ${isTransparent ? 'text-white' : 'text-gray-700'}`}>
              {user.fullName}
            </span>
            
            {/* Profile Button */}
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className={`flex items-center space-x-2 p-1 rounded-full transition-all duration-200 ${
                  isTransparent
                    ? 'hover:bg-white/10'
                    : 'hover:bg-gray-100'
                }`}
              >
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.fullName}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-semibold">
                    {getUserInitials(user.fullName)}
                  </div>
                )}
                <svg
                  className={`w-4 h-4 transition-transform duration-200 ${
                    isProfileOpen ? 'rotate-180' : ''
                  } ${isTransparent ? 'text-white' : 'text-gray-500'}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Profile Dropdown */}
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
                  {/* Profile Header */}
                  <div className="p-4 border-b border-gray-100">
                    <div className="flex items-center space-x-3">
                      {user.avatar ? (
                        <img
                          src={user.avatar}
                          alt={user.fullName}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                          {getUserInitials(user.fullName)}
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">{user.fullName}</p>
                        <p className="text-xs text-gray-500 truncate">{user.email}</p>
                      </div>
                    </div>
                  </div>

                  {/* Menu Items */}
                  <div className="py-1">
                    {profileLinks.map((link) => (
                      <a
                        key={link.href}
                        href={link.href}
                        className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150"
                      >
                        <span className="text-base">{link.icon}</span>
                        <span>{link.label}</span>
                      </a>
                    ))}
                    
                    <div className="border-t border-gray-100 mt-1 pt-1">
                      <button
                        onClick={logout}
                        className="flex items-center space-x-3 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors duration-150"
                      >
                        <span className="text-base">🚪</span>
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`lg:hidden p-2 rounded-lg transition-colors duration-200 ${
              isTransparent 
                ? 'text-white hover:bg-white/10' 
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={isMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
              />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden mt-4 p-4 bg-white rounded-lg shadow-lg border border-gray-200">
            <div className="space-y-2">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-150 ${
                    pathname === link.href
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <span className="text-base">{link.icon}</span>
                  <span>{link.label}</span>
                </a>
              ))}
            </div>
            
            <div className="border-t border-gray-200 mt-4 pt-4">
              <div className="flex items-center space-x-3 px-3 py-2">
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.fullName}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-semibold">
                    {getUserInitials(user.fullName)}
                  </div>
                )}
                <div>
                  <p className="text-sm font-medium text-gray-900">{user.fullName}</p>
                  <p className="text-xs text-gray-500">{user.email}</p>
                </div>
              </div>
              
              <div className="space-y-1 mt-3">
                {profileLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="flex items-center space-x-3 px-3 py-2 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150"
                  >
                    <span className="text-base">{link.icon}</span>
                    <span>{link.label}</span>
                  </a>
                ))}
                <button
                  onClick={logout}
                  className="flex items-center space-x-3 w-full px-3 py-2 rounded-lg text-sm text-red-600 hover:bg-red-50 transition-colors duration-150"
                >
                  <span className="text-base">🚪</span>
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default LoggedInNavbar;