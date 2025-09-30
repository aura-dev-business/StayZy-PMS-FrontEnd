'use client';

import LoggedInNavbar from "@/components/NavbarUser";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

interface User {
  name: string;
  email: string;
  avatar?: string;
  role?: string;
}

const getUserInitials = (name?: string) =>
  name && typeof name === 'string'
    ? name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)
    : '';

const Page = () => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
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

const handleLogout = () => {
  // Example logout logic
  localStorage.removeItem('token');
  window.location.href = '/login';
};


  return (
    <div>
      <LoggedInNavbar user={user} onLogout={handleLogout} />
      
    </div>
  );
};

export default Page;
