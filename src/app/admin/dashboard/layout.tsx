'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  // ✅ Check if user is authenticated using cookie
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch('http://localhost:8081/api/auth/me', {
          method: 'GET',
          credentials: 'include',
        });

        if (res.ok) {
          setLoading(false); // Authenticated
        } else {
          throw new Error('Unauthorized');
        }
      } catch (err) {
        toast.error('Session expired. Please login again.');
        router.replace('/admin'); // 🔁 Use replace to prevent going back
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
        toast.success('Logged out');
        router.replace('/admin'); // 🔁 Use replace to prevent back nav
      } else {
        toast.error('Logout failed');
      }
    } catch (err) {
      toast.error('Error while logging out');
    }
  };

  if (loading) return <div className="p-10">Loading...</div>;

  return (
    <div className="flex flex-col min-h-screen">
      {/* 🔝 Top Navbar */}
      <nav className="bg-blue-600 text-white p-4 flex justify-between items-center">
        <span className="font-bold text-lg">StayZy Admin Dashboard</span>
        <button
          onClick={handleLogout}
          className="bg-red-500 px-3 py-1 rounded hover:bg-red-600 transition"
        >
          Logout
        </button>
      </nav>

      {/* Main Content */}
      <div className="flex flex-1">
        <main className="flex-1 p-6 bg-gray-50">{children}</main>
      </div>
    </div>
  );
}
