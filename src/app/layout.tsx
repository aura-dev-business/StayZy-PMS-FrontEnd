'use client';

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "@/app/styles/fonts.css";
import { Toaster } from 'sonner';
import MouseTracker from "@/components/MouseTracker";
import NavbarWrapper from "@/components/NavbarWrapper";
import { useEffect } from "react";
import { useAuthStore } from "@/store/useAuthStore";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const fetchUser = useAuthStore((state) => state.fetchUser);

  useEffect(() => {
    fetchUser(); // fetch user on app load
  }, [fetchUser]);

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <MouseTracker />
        <NavbarWrapper />
        <main>
          {children}
        </main>
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#363636',
              color: '#fff',
            },
          }}
        />
      </body>
    </html>
  );
}
