'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/dashboard/Sidebar';
import { toast } from 'sonner';
import Image from 'next/image';
import LoggedInNavbar from '@/components/NavbarUser';

interface User {
  id: string;
  fullName: string;
  name: string;
  email: string;
  avatar?: string;
  role?: string;
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  // ✅ Check if user is authenticated using cookie
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch('http://localhost:8081/api/auth/me', {
          method: 'GET',
          credentials: 'include',
        });

        if (res.ok) {
          const userData = await res.json();
          setUser(userData);
          setLoading(false); // Authenticated
        } else {
          throw new Error('Unauthorized');
        }
      } catch (err) {
        toast.error('Session expired. Please login again.');
        router.replace('/login'); // 🔁 Use replace to prevent going back
      }
    };

    checkAuth();
  }, [router]);

  // ✅ Logout: clear JWT cookie from backend
  const handleLogout = async () => {
    try {
      const res = await fetch('http://localhost:8081/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });

      if (res.ok) {
        toast.success('Logged out successfully');
        router.replace('/login'); // 🔁 Use replace to prevent back nav
      } else {
        toast.error('Logout failed');
      }
    } catch (err) {
      toast.error('Error while logging out');
    }
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest('.profile-dropdown') && !target.closest('.profile-button')) {
        setProfileDropdownOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  // Get user initials for avatar fallback
  const getUserInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  // Loading screen with beautiful animation
  if (loading) {
    return (
      <>
        {user && <LoggedInNavbar user={user} onLogout={handleLogout} />}
        <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-blue-50 flex items-center justify-center">
          <div className="text-center">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-teal-200 rounded-full animate-spin"></div>
              <div className="absolute top-0 left-0 w-16 h-16 border-4 border-transparent border-t-teal-600 rounded-full animate-spin"></div>
            </div>
            <p className="mt-4 text-gray-600 font-medium">Loading your dashboard...</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 pt-16">
      <LoggedInNavbar user={{ 
        ...user,
        id: user?.id ?? '',
        name: (user as any).fullName ?? user?.name ?? '', 
        email: user?.email ?? '', 
        avatar: user?.avatar, 
        role: user?.role,
        fullName: (user as any).fullName ?? user?.name ?? '' // Ensure fullName is always a string
      }} onLogout={handleLogout} />
      

      {/* 🧭 Sidebar + Main Content */}
      <div className="flex flex-1 relative">
        {/* Mobile Sidebar Overlay */}
        {sidebarOpen && (
          <div 
            className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-30"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <div className={`lg:block ${sidebarOpen ? 'block' : 'hidden'} lg:relative absolute inset-y-0 left-0 z-40 transform transition-transform duration-300 ease-in-out`}>
          <Sidebar />
        </div>

        {/* Main Content Area */}
        <main className="flex-1 overflow-auto">
          <div className="min-h-full bg-gradient-to-br from-gray-50 to-white">
            <div className="p-6 lg:p-8">
              {/* Content Container with beautiful styling */}
              <div className="max-w-7xl mx-auto">
                {children}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}