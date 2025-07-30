'use client';

import React, { useEffect } from 'react';
import { useAuthStore } from '@/store/useAuthStore';
import Navbar from './Navbar';
import LoggedInNavbar from './NavbarUser';

const NavbarWrapper = () => {
  const { user, loading, fetchUser } = useAuthStore();

  useEffect(() => {
    if (!user) {
      fetchUser(); // Load user from API if not present
    }
  }, [user, fetchUser]);

  if (loading) return null;

  return user ? <LoggedInNavbar user={user} onLogout={() => useAuthStore.getState().logout()} /> : <Navbar />;
};

export default NavbarWrapper;
