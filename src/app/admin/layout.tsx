'use client';

import Sidebar from '@/components/dashboard/Sidebar';
import { toast } from 'sonner';
import { useRouter, usePathname } from 'next/navigation';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  // ✅ Logout
  const handleLogout = async () => {
    try {
      const res = await fetch('http://localhost:8081/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });

      if (res.ok) {
        toast.success('Logged out');
        router.replace('/admin'); // redirect to login page
      } else {
        toast.error('Logout failed');
      }
    } catch (err) {
      toast.error('Error while logging out');
    }
  };

  // Hide sidebar on exact /admin route
  const showSidebar = pathname !== '/admin';

  return (
    <div className="flex flex-col min-h-screen">
      {/* 🔝 Top Navbar */}
      <nav className="bg-blue-900 text-white p-4 flex justify-between items-center">
        <span className="font-bold text-lg">StayZy Admin</span>
        <button
          onClick={handleLogout}
          className="bg-red-900 px-3 py-1 rounded hover:bg-red-900 transition"
        >
          Logout
        </button>
      </nav>

      {/* 🧭 Sidebar + Main */}
      <div className="flex flex-1">
        {showSidebar && <Sidebar />}
        <main className="flex-1 p-6 bg-gray-50">{children}</main>
      </div>
    </div>
  );
}
