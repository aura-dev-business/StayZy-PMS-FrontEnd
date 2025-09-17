"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Calendar,
  Users,
  TrendingUp,
  Settings,
  LogOut,
  X,
  Menu,
  MapPin,
} from "lucide-react";

const menuItems = [
  { name: "Dashboard", path: "/admin/dashboard", icon: <Home className="w-5 h-5 mr-3" /> },
  { name: "Properties", path: "/admin/properties", icon: <MapPin className="w-5 h-5 mr-3" /> },
  { name: "Bookings", path: "/admin/bookings", icon: <Calendar className="w-5 h-5 mr-3" /> },
  { name: "Users", path: "/admin/users", icon: <Users className="w-5 h-5 mr-3" /> },
  { name: "Analytics", path: "/admin/reports", icon: <TrendingUp className="w-5 h-5 mr-3" /> },
  { name: "Settings", path: "/admin/settings", icon: <Settings className="w-5 h-5 mr-3" /> },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}
      >
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
          <h1 className="text-xl font-bold text-gray-800">StayZy Admin</h1>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-2 rounded-md hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="mt-8 px-4 space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              href={item.path}
              className={`flex items-center px-4 py-3 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors ${
                pathname === item.path ? "bg-blue-50 text-blue-600 border-r-2 border-blue-500 rounded-l-lg" : ""
              }`}
            >
              {item.icon}
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Logout Button */}
        <div className="absolute bottom-4 left-4 right-4">
          <button className="flex items-center w-full px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
            <LogOut className="w-5 h-5 mr-3" />
            Logout
          </button>
        </div>
      </div>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Mobile toggle button */}
      <button
        onClick={() => setSidebarOpen(true)}
        className="lg:hidden fixed top-4 left-4 p-2 rounded-md bg-white shadow-md z-50"
      >
        <Menu className="w-5 h-5" />
      </button>
    </>
  );
}
