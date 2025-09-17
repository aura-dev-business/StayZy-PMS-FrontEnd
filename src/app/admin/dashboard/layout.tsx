'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/dashboard/Sidebar';
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


  return (
    <div className="flex flex-col ">
     

      {/* 🧭 Sidebar + Main Content */}
      <div className="flex flex-1">
        
        <main className="flex-1 bg-gray-50">{children}</main>
      </div>
    </div>
  );
}
