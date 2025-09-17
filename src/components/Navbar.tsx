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
    { path: '/properties', label: 'Properties' },
  ];

  const userLinks = [
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
          ? 'bg-white/95 backdrop-blur-md border-b border-gray-200/50 shadow-lg'
          : 'bg-transparent border-b border-transparent'
      } ${className}`}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16 md:h-18 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <Image
              src={isScrolled || isAuthPage ? '/images/Stayzy2.png' : '/images/STAYZY.png'}
              alt="Stayzy Logo"
              width={120}
              height={32}
              priority
              className="transition-all duration-500 ease-out w-auto h-auto"
            />
          </Link>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            {!user
              ? guestLinks.map(({ path, label }) => (
                  <Link
                    key={path}
                    href={path}
                    className={`font-medium text-sm xl:text-base transition-all duration-300 hover:scale-105 group ${
                      isScrolled || isAuthPage
                        ? 'text-gray-700 hover:text-teal-600'
                        : 'text-white hover:text-teal-300'
                    }`}
                  >
                    {label}
                    <span className="block w-0 h-0.5 bg-gradient-to-r from-teal-500 to-teal-600 group-hover:w-full transition-all"></span>
                  </Link>
                ))
              : userLinks.map(({ href, label, icon }) => (
                  <Link
                    key={href}
                    href={href}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      pathname === href
                        ? isScrolled || isAuthPage
                          ? 'text-gray-900 bg-gray-100'
                          : 'text-white bg-white/20'
                        : isScrolled || isAuthPage
                          ? 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                          : 'text-white/70 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <span>{icon}</span>
                    <span>{label}</span>
                  </Link>
                ))}
          </div>

          {/* Desktop Auth/Profile */}
          <div className="hidden lg:flex items-center space-x-4">
            {!user ? (
              <>
                <Link
                  href="/signup"
                  className="bg-gradient-to-r from-teal-600 to-teal-700 text-white px-5 py-2 rounded-xl font-medium hover:scale-105 transition"
                >
                  Sign Up
                </Link>
                <Link
                  href="/login"
                  className={`font-medium px-4 py-2 rounded-xl border-2 transition-all ${
                    isScrolled || isAuthPage
                      ? 'text-gray-700 border-gray-300 hover:text-teal-600 hover:border-teal-500'
                      : 'text-white border-white/30 hover:text-teal-300 hover:border-teal-300'
                  }`}
                >
                  Log In
                </Link>
              </>
            ) : (
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  aria-expanded={isProfileOpen}
                  aria-label="Toggle profile menu"
                  className={`flex items-center space-x-2 p-1 rounded-full transition ${
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
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-semibold">
                      {getUserInitials(user.fullName)}
                    </div>
                  )}
                  <svg
                    className={`w-4 h-4 transition-transform ${
                      isProfileOpen ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border overflow-hidden">
                    <div className="p-4 border-b">
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
                          <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                            {getUserInitials(user.fullName)}
                          </div>
                        )}
                        <div>
                          <p className="text-sm font-medium">{user.fullName}</p>
                          <p className="text-xs text-gray-500">{user.email}</p>
                        </div>
                      </div>
                    </div>
                    <div className="py-1">
                      {profileLinks.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        >
                          <span>{link.icon}</span>
                          <span>{link.label}</span>
                        </Link>
                      ))}
                      <button
                        onClick={logout}
                        className="flex items-center space-x-3 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                      >
                        <span>🚪</span>
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-expanded={isMenuOpen}
            aria-label="Toggle navigation menu"
            className={`lg:hidden p-2 rounded-lg ${
              isScrolled || isAuthPage ? 'text-gray-700 hover:bg-teal-50' : 'text-white hover:bg-white/10'
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
          <div className="lg:hidden mt-4 p-4 bg-white rounded-lg shadow-lg border">
            {!user
              ? guestLinks.map(({ path, label }) => (
                  <Link key={path} href={path} className="block px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-50">
                    {label}
                  </Link>
                ))
              : userLinks.map(({ href, label, icon }) => (
                  <Link
                    key={href}
                    href={href}
                    className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-50"
                  >
                    <span>{icon}</span>
                    <span>{label}</span>
                  </Link>
                ))}
            <div className="border-t mt-4 pt-4">
              {!user ? (
                <>
                  <Link
                    href="/signup"
                    className="block w-full bg-teal-600 text-white text-center py-2 rounded-lg"
                  >
                    Sign Up
                  </Link>
                  <Link
                    href="/login"
                    className="block w-full border mt-2 text-center py-2 rounded-lg"
                  >
                    Log In
                  </Link>
                </>
              ) : (
                <>
                  {profileLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-50"
                    >
                      <span>{link.icon}</span>
                      <span>{link.label}</span>
                    </Link>
                  ))}
                  <button
                    onClick={logout}
                    className="flex items-center space-x-3 w-full px-3 py-2 text-red-600 hover:bg-red-50"
                  >
                    <span>🚪</span>
                    <span>Sign Out</span>
                  </button>
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
