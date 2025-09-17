'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/dashboard/Sidebar';
import { toast } from 'sonner';
import LoggedInNavbar from '@/components/NavbarUser';
import { useAuthStore } from '@/store/useAuthStore';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { user, loading, logout } = useAuthStore();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    toast.success('Logged out successfully');
    router.replace('/login');
  };

  // ✅ No extra fetch here — uses global store state
  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (!user) {
    router.replace('/login');
    return null;
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 pt-16">
      <LoggedInNavbar
        user={{
          ...user,
          id: user.id ?? '',
          name: user.fullName ?? user.name ?? '',
          email: user.email ?? '',
          avatar: user.avatar,
          role: user.role,
          fullName: user.fullName ?? user.name ?? '',
        }}
        onLogout={handleLogout}
      />

      <div className="flex flex-1 relative">
        {sidebarOpen && (
          <div
            className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-30"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        <div
          className={`lg:block ${sidebarOpen ? 'block' : 'hidden'} lg:relative absolute inset-y-0 left-0 z-40 transform transition-transform duration-300 ease-in-out`}
        >
          <Sidebar />
        </div>

        <main className="flex-1 overflow-auto">
          <div className="min-h-full bg-gradient-to-br from-gray-50 to-white">
            <div className="p-6 lg:p-8">
              <div className="max-w-7xl mx-auto">{children}</div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
