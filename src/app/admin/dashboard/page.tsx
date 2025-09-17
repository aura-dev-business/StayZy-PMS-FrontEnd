'use client'
import React, { useState } from 'react';

import {
  Home,
  Calendar,
  Users,
  DollarSign,
  TrendingUp,
  Eye,
  Edit,
  Trash2,
  Plus,
  Bell,
  Settings,
  LogOut,
  Menu,
  X,
  MapPin,
  Star,
  Clock,
  CheckCircle,
  AlertCircle,
  XCircle,
  MoreHorizontal
} from 'lucide-react';

interface Booking {
  id: string;
  guestName: string;
  propertyName: string;
  checkIn: string;
  checkOut: string;
  status: 'confirmed' | 'pending' | 'cancelled';
  amount: number;
  nights: number;
}

interface Property {
  id: string;
  name: string;
  location: string;
  type: string;
  occupancyRate: number;
  monthlyRevenue: number;
  rating: number;
  totalBookings: number;
}

const AdminDashboard: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Mock data - in real app this would come from API
  const stats = {
    totalProperties: 24,
    totalBookings: 142,
    monthlyRevenue: 85420,
    occupancyRate: 78
  };

  const recentBookings: Booking[] = [
    {
      id: '1',
      guestName: 'John Smith',
      propertyName: 'Luxury Villa, Goa',
      checkIn: '2025-01-15',
      checkOut: '2025-01-18',
      status: 'confirmed',
      amount: 12500,
      nights: 3
    },
    {
      id: '2',
      guestName: 'Sarah Wilson',
      propertyName: 'Beachfront Apartment, Mumbai',
      checkIn: '2025-01-20',
      checkOut: '2025-01-23',
      status: 'pending',
      amount: 8900,
      nights: 3
    },
    {
      id: '3',
      guestName: 'Mike Johnson',
      propertyName: 'City Center Hotel, Delhi',
      checkIn: '2025-01-12',
      checkOut: '2025-01-14',
      status: 'cancelled',
      amount: 5600,
      nights: 2
    },
    {
      id: '4',
      guestName: 'Emily Brown',
      propertyName: 'Hill Station Cottage, Shimla',
      checkIn: '2025-01-25',
      checkOut: '2025-01-28',
      status: 'confirmed',
      amount: 9800,
      nights: 3
    }
  ];

  const topProperties: Property[] = [
    {
      id: '1',
      name: 'Luxury Villa, Goa',
      location: 'Goa',
      type: '3 BHK Villa',
      occupancyRate: 92,
      monthlyRevenue: 45000,
      rating: 4.8,
      totalBookings: 28
    },
    {
      id: '2',
      name: 'Beachfront Apartment',
      location: 'Mumbai',
      type: '2 BHK Apartment',
      occupancyRate: 85,
      monthlyRevenue: 32000,
      rating: 4.6,
      totalBookings: 22
    },
    {
      id: '3',
      name: 'City Center Hotel',
      location: 'Delhi',
      type: 'Hotel Room',
      occupancyRate: 78,
      monthlyRevenue: 28000,
      rating: 4.4,
      totalBookings: 35
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle className="w-4 h-4" />;
      case 'pending':
        return <AlertCircle className="w-4 h-4" />;
      case 'cancelled':
        return <XCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        {/* <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-md hover:bg-gray-100 mr-2"
              >
                <Menu className="w-5 h-5" />
              </button>
              <h2 className="text-2xl font-semibold text-gray-800">Dashboard Overview</h2>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="relative p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors">
                <Bell className="w-5 h-5" />
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-semibold">A</span>
              </div>
            </div>
          </div>
        </header> */}

        {/* Dashboard Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Properties</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{stats.totalProperties}</p>
                  <p className="text-sm text-green-600 mt-1">+12% from last month</p>
                </div>
                <div className="bg-blue-50 p-3 rounded-lg">
                  <Home className="w-6 h-6 text-blue-500" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Bookings</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{stats.totalBookings}</p>
                  <p className="text-sm text-green-600 mt-1">+8% from last month</p>
                </div>
                <div className="bg-green-50 p-3 rounded-lg">
                  <Calendar className="w-6 h-6 text-green-500" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Monthly Revenue</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">₹{stats.monthlyRevenue.toLocaleString()}</p>
                  <p className="text-sm text-green-600 mt-1">+15% from last month</p>
                </div>
                <div className="bg-yellow-50 p-3 rounded-lg">
                  <DollarSign className="w-6 h-6 text-yellow-500" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Occupancy Rate</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{stats.occupancyRate}%</p>
                  <p className="text-sm text-green-600 mt-1">+3% from last month</p>
                </div>
                <div className="bg-purple-50 p-3 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-purple-500" />
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Recent Bookings */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">Recent Bookings</h3>
                  <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">View All</button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Guest</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Property</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dates</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {recentBookings.map((booking) => (
                        <tr key={booking.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{booking.guestName}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{booking.propertyName}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {new Date(booking.checkIn).toLocaleDateString()} - {new Date(booking.checkOut).toLocaleDateString()}
                            </div>
                            <div className="text-xs text-gray-500">{booking.nights} nights</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">₹{booking.amount.toLocaleString()}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${getStatusColor(booking.status)}`}>
                              {getStatusIcon(booking.status)}
                              <span className="ml-1">{booking.status}</span>
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button className="text-indigo-600 hover:text-indigo-900 mr-3">
                              <Eye className="w-4 h-4" />
                            </button>
                            <button className="text-gray-600 hover:text-gray-900">
                              <MoreHorizontal className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Top Performing Properties */}
            <div>
              <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                <div className="px-6 py-4 border-b border-gray-100">
                  <h3 className="text-lg font-semibold text-gray-900">Top Properties</h3>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {topProperties.map((property) => (
                      <div key={property.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                        <div className="flex-1">
                          <h4 className="text-sm font-medium text-gray-900">{property.name}</h4>
                          <p className="text-xs text-gray-500">{property.location} • {property.type}</p>
                          <div className="flex items-center mt-2">
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <span className="text-sm text-gray-600 ml-1">{property.rating}</span>
                            <span className="text-xs text-gray-500 ml-2">{property.totalBookings} bookings</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-gray-900">₹{property.monthlyRevenue.toLocaleString()}</p>
                          <p className="text-xs text-gray-500">{property.occupancyRate}% occupied</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              {/* <div className="bg-white rounded-xl shadow-sm border border-gray-100 mt-6">
                <div className="px-6 py-4 border-b border-gray-100">
                  <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
                </div>
                <div className="p-6 space-y-3">
                  <button className="w-full flex items-center justify-center px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    <Plus className="w-4 h-4 mr-2" />
                    Add New Property
                  </button>
                  <button className="w-full flex items-center justify-center px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                    <Calendar className="w-4 h-4 mr-2" />
                    Manage Bookings
                  </button>
                  <button className="w-full flex items-center justify-center px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    View Analytics
                  </button>
                </div>
              </div> */}
            </div>
          </div>
        </main>
      </div>

      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default AdminDashboard;