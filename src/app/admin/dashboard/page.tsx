'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface User {
  fullName: string;
  email: string;
  username: string;
  totalBookings?: number; // optional since `/me` may not return these
  totalWishlist?: number;
}

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch('http://localhost:8081/api/auth/me', {
          method: 'GET',
          credentials: 'include', // ✅ Important for cookie
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
      }
    };

    fetchUser();
  }, [router]);

  if (!user) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-2">👋 Welcome, {user.fullName}</h1>
      <div className="grid grid-cols-2 gap-4 mt-6">
        <div className="p-4 bg-white rounded shadow">
          <h2 className="font-semibold">📦 Bookings</h2>
          <p>{user.totalBookings ?? 'N/A'}</p>
        </div>
        <div className="p-4 bg-white rounded shadow">
          <h2 className="font-semibold">💖 Wishlist</h2>
          <p>{user.totalWishlist ?? 'N/A'}</p>
        </div>
      </div>
    </div>
  );
}
