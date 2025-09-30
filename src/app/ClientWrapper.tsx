'use client';

import { useEffect } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import MouseTracker from "@/components/MouseTracker";
import Navbar from "@/components/Navbar";
import { Toaster } from "sonner";
import Footer from "@/components/Footer";

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  const fetchUser = useAuthStore((state) => state.fetchUser);

  useEffect(() => {
    fetchUser(); // fetch user on app load
  }, [fetchUser]);

  return (
    <>
      <MouseTracker />
      <Navbar />
      <main>{children}</main>
      <Footer />
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 4000,
          style: {
            background: "#363636",
            color: "#fff",
          },
        }}
      />
    </>
  );
}
