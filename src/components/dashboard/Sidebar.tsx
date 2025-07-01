'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Sidebar() {
  const router = useRouter();

  const logout = async () => {
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
    }
  };

  return (
    <div className="w-64 bg-white shadow-lg p-4 min-h-screen">
      <h2 className="text-xl font-bold mb-6">StayZy</h2>
      <ul className="space-y-4">
        <li><Link href="/dashboard">🏠 Dashboard</Link></li>
        <li><Link href="/dashboard/bookings">📅 Bookings</Link></li>
        <li><Link href="/dashboard/wishlist">❤️ Wishlist</Link></li>
        <li><Link href="/dashboard/profile">👤 Profile</Link></li>
        <li>
          <button onClick={logout} className="text-red-600 hover:underline">
            🚪 Logout
          </button>
        </li>
      </ul>
    </div>
  );
}
