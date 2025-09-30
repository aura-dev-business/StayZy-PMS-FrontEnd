'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import type { User } from '@/store/useAuthStore';

interface NavbarProps {
  className?: string;
}

const Navbar: React.FC<NavbarProps> = ({ className = '' }) => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  const navRef = useRef<HTMLDivElement>(null);

  // ✅ Fix: use variable instead of early return
  const hideNavbar = pathname.startsWith('/admin/') && pathname !== '/admin';

  const guestLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/contacts', label: 'Contact' },
    { path: '/properties', label: 'Listings' },
    { path: '/blog', label: 'Blogs' },
  ];

  const userLinks = [
    { href: '/dashboard', label: 'Dashboard', icon: '🏠' },
    { href: '/dashboard/booking', label: 'Bookings', icon: '📅' },
    { href: '/properties', label: 'Listings', icon: '🏢' },
    { href: '/dashboard/wishlist', label: 'Favorites', icon: '❤️' },
    { href: '/blog', label: 'Blogs', icon: '📝' },
  ];

  const profileLinks = [
    { href: '/dashboard/profile', label: 'Profile', icon: '👤' },
    { href: '/account', label: 'Settings', icon: '⚙️' },
    { href: '/help', label: 'Help', icon: '❓' },
  ];

  const AUTH_PAGES = ['/login', '/signup', '/admin', '/about', '/contacts', '/properties'];

  const isAuthPage = useMemo(() => {
    return (
      AUTH_PAGES.some((p) => pathname === p || pathname.startsWith(p)) ||
      pathname.startsWith('/properties/') ||
      pathname.startsWith('/SearchProperties')
    );
  }, [pathname]);

  const getUserInitials = (name?: string) =>
    name?.split(' ').map((w) => w[0]).join('').toUpperCase().slice(0, 2) || '';

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > window.innerWidth * 0.01);
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setIsMenuOpen(false);
        setIsProfileOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // ✅ Safely hide navbar after all hooks are called
  if (hideNavbar) {
    return null;
  }

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-out ${
        isScrolled || isAuthPage
          ? 'bg-white/95 backdrop-blur-md shadow-sm'
          : 'bg-black'
      } ${className}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <Image
              src={isScrolled || isAuthPage ? '/images/Stayzy2.png' : '/images/STAYZY.png'}
              alt="Stayzy Logo"
              width={120}
              height={40}
              priority
              className="transition-all duration-500 ease-out w-auto h-auto"
            />
          </Link>

          {/* Desktop Navigation Links - Rounded Container */}
          <div className="hidden lg:flex">
            <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-2 py-2 space-x-1">
              {!user
                ? guestLinks.map(({ path, label }) => (
                    <Link
                      key={path}
                      href={path}
                      className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105 ${
                        pathname === path
                          ? 'bg-teal-600 text-white shadow-lg'
                          : isScrolled || isAuthPage
                            ? 'text-gray-700 hover:text-teal-600 hover:bg-gray-100'
                            : 'text-white/90 hover:text-white hover:bg-white/20'
                      }`}
                    >
                      {label}
                    </Link>
                  ))
                : userLinks.map(({ href, label, icon }) => (
                    <Link
                      key={href}
                      href={href}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                        pathname === href
                          ? 'bg-teal-600 text-white shadow-lg'
                          : isScrolled || isAuthPage
                            ? 'text-gray-700 hover:text-teal-600 hover:bg-gray-100'
                            : 'text-white/90 hover:text-white hover:bg-white/20'
                      }`}
                    >
                      <span className="text-xs">{icon}</span>
                      <span>{label}</span>
                    </Link>
                  ))}
            </div>
          </div>

          {/* Desktop Auth/Profile - Rounded Buttons */}
          <div className="hidden lg:flex items-center space-x-3">
            {!user ? (
              <>
                <Link
                  href="/login"
                  className={`flex items-center space-x-2 px-6 py-3 rounded-full font-medium text-sm transition-all duration-300 hover:scale-105 ${
                    isScrolled || isAuthPage
                      ? 'text-gray-700 hover:text-teal-600'
                      : 'text-white hover:text-teal-300'
                  }`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span>Login/Register</span>
                </Link>
                <Link
                  href="/add-listing"
                  className="flex items-center space-x-2 bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-full font-medium text-sm transition-all duration-300 hover:scale-105 shadow-lg"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  <span>Add Listing</span>
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/add-listing"
                  className="flex items-center space-x-2 bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-full font-medium text-sm transition-all duration-300 hover:scale-105 shadow-lg"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  <span>Add Listing</span>
                </Link>
                
                <div className="relative">
                  <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    aria-expanded={isProfileOpen}
                    aria-label="Toggle profile menu"
                    className={`flex items-center space-x-2 px-4 py-3 rounded-full transition-all duration-300 hover:scale-105 ${
                      isScrolled || isAuthPage ? 'hover:bg-gray-100' : 'hover:bg-white/10'
                    }`}
                  >
                    {user.avatar ? (
                      <Image
                        src={user.avatar}
                        alt={user.fullName}
                        width={32}
                        height={32}
                        className="rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-8 h-8 bg-teal-600 rounded-full flex items-center justify-center text-white text-xs font-semibold">
                        {getUserInitials(user.fullName)}
                      </div>
                    )}
                    <svg
                      className={`w-4 h-4 transition-transform duration-300 ${
                        isProfileOpen ? 'rotate-180' : ''
                      } ${isScrolled || isAuthPage ? 'text-gray-700' : 'text-white'}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  
                  {isProfileOpen && (
                    <div className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden transform transition-all duration-300">
                      <div className="p-4 bg-gradient-to-r from-teal-50 to-cyan-50 border-b border-gray-100">
                        <div className="flex items-center space-x-3">
                          {user.avatar ? (
                            <Image
                              src={user.avatar}
                              alt={user.fullName}
                              width={40}
                              height={40}
                              className="rounded-full object-cover"
                            />
                          ) : (
                            <div className="w-10 h-10 bg-teal-600 rounded-full flex items-center justify-center text-white font-semibold">
                              {getUserInitials(user.fullName)}
                            </div>
                          )}
                          <div>
                            <p className="text-sm font-semibold text-gray-900">{user.fullName}</p>
                            <p className="text-xs text-gray-600">{user.email}</p>
                          </div>
                        </div>
                      </div>
                      <div className="py-2">
                        {profileLinks.map((link) => (
                          <Link
                            key={link.href}
                            href={link.href}
                            className="flex items-center space-x-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-teal-600 transition-colors duration-200"
                          >
                            <span className="text-base">{link.icon}</span>
                            <span>{link.label}</span>
                          </Link>
                        ))}
                        <hr className="my-2 border-gray-100" />
                        <button
                          onClick={logout}
                          className="flex items-center space-x-3 w-full px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors duration-200"
                        >
                          <span className="text-base">🚪</span>
                          <span>Sign Out</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-expanded={isMenuOpen}
            aria-label="Toggle navigation menu"
            className={`lg:hidden p-3 rounded-full transition-all duration-300 hover:scale-110 ${
              isScrolled || isAuthPage 
                ? 'text-gray-700 hover:bg-gray-100' 
                : 'text-white hover:bg-white/10'
            }`}
          >
            {isMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden mt-4 mb-4 p-4 bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-gray-100">
            <div className="space-y-2">
              {!user
                ? guestLinks.map(({ path, label }) => (
                    <Link 
                      key={path} 
                      href={path} 
                      className={`block px-4 py-3 rounded-xl text-gray-700 hover:bg-gray-50 hover:text-teal-600 transition-all duration-200 font-medium ${
                        pathname === path ? 'bg-teal-50 text-teal-600' : ''
                      }`}
                    >
                      {label}
                    </Link>
                  ))
                : userLinks.map(({ href, label, icon }) => (
                    <Link
                      key={href}
                      href={href}
                      className={`flex items-center space-x-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-gray-50 hover:text-teal-600 transition-all duration-200 font-medium ${
                        pathname === href ? 'bg-teal-50 text-teal-600' : ''
                      }`}
                    >
                      <span className="text-base">{icon}</span>
                      <span>{label}</span>
                    </Link>
                  ))}
            </div>
            
            <div className="border-t border-gray-200 mt-4 pt-4 space-y-2">
              {!user ? (
                <>
                  <Link
                    href="/login"
                    className="flex items-center justify-center space-x-2 w-full bg-gray-100 text-gray-700 py-3 rounded-xl font-medium hover:bg-gray-200 transition-all duration-200"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span>Login/Register</span>
                  </Link>
                  <Link
                    href="/add-listing"
                    className="flex items-center justify-center space-x-2 w-full bg-teal-600 text-white py-3 rounded-xl font-medium hover:bg-teal-700 transition-all duration-200"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    <span>Add Listing</span>
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    href="/add-listing"
                    className="flex items-center justify-center space-x-2 w-full bg-teal-600 text-white py-3 rounded-xl font-medium hover:bg-teal-700 transition-all duration-200"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    <span>Add Listing</span>
                  </Link>
                  
                  <div className="space-y-1 pt-2">
                    {profileLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="flex items-center space-x-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-gray-50 hover:text-teal-600 transition-all duration-200"
                      >
                        <span className="text-base">{link.icon}</span>
                        <span>{link.label}</span>
                      </Link>
                    ))}
                    <button
                      onClick={logout}
                      className="flex items-center space-x-3 w-full px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200"
                    >
                      <span className="text-base">🚪</span>
                      <span>Sign Out</span>
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;