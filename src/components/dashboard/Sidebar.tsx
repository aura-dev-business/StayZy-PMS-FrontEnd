'use client';

import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useState } from 'react';

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const logout = async () => {
    setIsLoggingOut(true);
    try {
      // Call backend to invalidate the cookie/session (if any)
      await fetch('http://localhost:8081/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });

      // Remove token from localStorage if used
      localStorage.removeItem('token');

      // Redirect to login
      router.push('/login');
    } catch (error) {
      console.error('Logout failed', error);
      router.push('/login');
    } finally {
      setIsLoggingOut(false);
    }
  };

  const menuItems = [
    { href: '/dashboard', icon: '🏠', label: 'Dashboard', color: 'from-blue-500 to-cyan-500' },
    { href: '/dashboard/booking', icon: '📅', label: 'Bookings', color: 'from-purple-500 to-pink-500' },
    { href: '/dashboard/wishlist', icon: '❤️', label: 'Wishlist', color: 'from-red-500 to-orange-500' },
    { href: '/dashboard/profile', icon: '👤', label: 'Profile', color: 'from-green-500 to-emerald-500' },
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <div className="w-72 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 shadow-2xl min-h-screen relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-purple-600/5 to-pink-600/10"></div>
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-cyan-400/20 to-blue-600/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-purple-400/20 to-pink-600/20 rounded-full blur-2xl"></div>
      
      <div className="relative z-10 p-6">
        {/* Logo/Brand Section */}
        <div className="mb-10">
          <div className="flex items-center space-x-3 mb-2">
           
           
          </div>

        </div>

        {/* Navigation Menu */}
        <nav className="space-y-3">
          {menuItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <div className={`
                group flex items-center space-x-4 p-4 rounded-2xl transition-all duration-300 cursor-pointer
                ${isActive(item.href) 
                  ? 'bg-white/10 shadow-lg border border-white/20 backdrop-blur-sm' 
                  : 'hover:bg-white/5 hover:shadow-md hover:border hover:border-white/10'
                }
              `}>
                <div className={`
                  w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300
                  ${isActive(item.href)
                    ? `bg-gradient-to-r ${item.color} shadow-lg scale-110`
                    : 'bg-white/10 group-hover:bg-white/20 group-hover:scale-105'
                  }
                `}>
                  <span className="text-lg">{item.icon}</span>
                </div>
                <span className={`
                  font-medium transition-all duration-300
                  ${isActive(item.href) 
                    ? 'text-white text-lg' 
                    : 'text-gray-300 group-hover:text-white'
                  }
                `}>
                  {item.label}
                </span>
                {isActive(item.href) && (
                  <div className="ml-auto w-2 h-2 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"></div>
                )}
              </div>
            </Link>
          ))}
        </nav>

        {/* Logout Button */}
        <div className="mt-12 pt-6 border-t border-white/10">
          <button 
            onClick={logout}
            disabled={isLoggingOut}
            className="group w-full flex items-center space-x-4 p-4 rounded-2xl transition-all duration-300 hover:bg-red-500/10 hover:border hover:border-red-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <div className="w-10 h-10 bg-red-500/20 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:bg-red-500/30 group-hover:scale-105">
              <span className="text-lg">{isLoggingOut ? '⏳' : '🚪'}</span>
            </div>
            <span className="text-gray-300 font-medium group-hover:text-red-400 transition-colors duration-300">
              {isLoggingOut ? 'Logging out...' : 'Logout'}
            </span>
          </button>
        </div>

      
      </div>
    </div>
  );
}