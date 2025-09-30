'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import type { User } from '@/store/useAuthStore';

interface DashboardUser extends User {
  totalBookings?: number;
}

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<DashboardUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch('http://localhost:8081/api/auth/me', {
          method: 'GET',
          credentials: 'include',
        });

        if (response.ok) {
          const data = await response.json();
          setUser(data);
        } else {
          const error = await response.text();
          console.warn('❌ Unauthorized or error:', response.status, error);
          router.push('/login');
        }
      } catch (error) {
        console.error('🚨 Error fetching user:', error);
        router.push('/login');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [router]);

  if (loading) {
    return <p className="p-6">Loading...</p>;
  }

  if (!user) {
    return null; // Redirect already triggered, nothing to render
  }

  return (
    <>

      <div className="p-6 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-2">👋 Welcome, {user.fullName}</h1>
        <div className="grid grid-cols-2 gap-4 mt-6">
          <div className="p-4 bg-white rounded shadow">
            <h2 className="font-semibold text-gray-700">📦 Bookings</h2>
            <p className="text-xl font-semibold">{user.totalBookings ?? '0'}</p>
          </div>
        </div>
      </div>
    </>
  );
}
