'use client'
import React, { useState } from 'react';
import {
  Calendar,
  Search,
  Filter,
  Download,
  Eye,
  Edit,
  Trash2,
  CheckCircle,
  AlertCircle,
  XCircle,
  Clock,
  MapPin,
  User,
  Phone,
  Mail,
  CreditCard,
  MoreHorizontal,
  ChevronDown,
  RefreshCw,
  Plus,
  ArrowUpDown,
  FileText
} from 'lucide-react';

interface Booking {
  id: string;
  bookingRef: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  propertyName: string;
  propertyLocation: string;
  propertyType: string;
  checkIn: string;
  checkOut: string;
  nights: number;
  guests: number;
  totalAmount: number;
  paidAmount: number;
  status: 'confirmed' | 'pending' | 'cancelled' | 'completed' | 'no-show';
  paymentStatus: 'paid' | 'partial' | 'pending' | 'refunded';
  bookingDate: string;
  specialRequests?: string;
}

const BookingsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const [sortBy, setSortBy] = useState('bookingDate');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [selectedBookings, setSelectedBookings] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  // Mock bookings data
  const bookings: Booking[] = [
    {
      id: '1',
      bookingRef: 'SZ001234',
      guestName: 'John Smith',
      guestEmail: 'john.smith@email.com',
      guestPhone: '+91 9876543210',
      propertyName: 'Luxury Villa with Pool',
      propertyLocation: 'Goa, India',
      propertyType: '3 BHK Villa',
      checkIn: '2025-01-15',
      checkOut: '2025-01-18',
      nights: 3,
      guests: 4,
      totalAmount: 15000,
      paidAmount: 15000,
      status: 'confirmed',
      paymentStatus: 'paid',
      bookingDate: '2025-01-10',
      specialRequests: 'Late check-in requested'
    },
    {
      id: '2',
      bookingRef: 'SZ001235',
      guestName: 'Sarah Wilson',
      guestEmail: 'sarah.wilson@email.com',
      guestPhone: '+91 9876543211',
      propertyName: 'Beachfront Apartment',
      propertyLocation: 'Mumbai, India',
      propertyType: '2 BHK Apartment',
      checkIn: '2025-01-20',
      checkOut: '2025-01-23',
      nights: 3,
      guests: 2,
      totalAmount: 12000,
      paidAmount: 6000,
      status: 'pending',
      paymentStatus: 'partial',
      bookingDate: '2025-01-12'
    },
    {
      id: '3',
      bookingRef: 'SZ001236',
      guestName: 'Mike Johnson',
      guestEmail: 'mike.johnson@email.com',
      guestPhone: '+91 9876543212',
      propertyName: 'City Center Hotel Room',
      propertyLocation: 'Delhi, India',
      propertyType: 'Deluxe Room',
      checkIn: '2025-01-12',
      checkOut: '2025-01-14',
      nights: 2,
      guests: 1,
      totalAmount: 8000,
      paidAmount: 0,
      status: 'cancelled',
      paymentStatus: 'refunded',
      bookingDate: '2025-01-08'
    },
    {
      id: '4',
      bookingRef: 'SZ001237',
      guestName: 'Emily Brown',
      guestEmail: 'emily.brown@email.com',
      guestPhone: '+91 9876543213',
      propertyName: 'Hill Station Cottage',
      propertyLocation: 'Shimla, India',
      propertyType: '2 BHK Cottage',
      checkIn: '2025-01-08',
      checkOut: '2025-01-11',
      nights: 3,
      guests: 3,
      totalAmount: 9000,
      paidAmount: 9000,
      status: 'completed',
      paymentStatus: 'paid',
      bookingDate: '2025-01-05'
    },
    {
      id: '5',
      bookingRef: 'SZ001238',
      guestName: 'David Lee',
      guestEmail: 'david.lee@email.com',
      guestPhone: '+91 9876543214',
      propertyName: 'Modern Studio Apartment',
      propertyLocation: 'Bangalore, India',
      propertyType: '1 BHK Studio',
      checkIn: '2025-01-25',
      checkOut: '2025-01-28',
      nights: 3,
      guests: 2,
      totalAmount: 7500,
      paidAmount: 7500,
      status: 'confirmed',
      paymentStatus: 'paid',
      bookingDate: '2025-01-13'
    },
    {
      id: '6',
      bookingRef: 'SZ001239',
      guestName: 'Lisa Chen',
      guestEmail: 'lisa.chen@email.com',
      guestPhone: '+91 9876543215',
      propertyName: 'Heritage Haveli',
      propertyLocation: 'Jaipur, India',
      propertyType: '4 BHK Haveli',
      checkIn: '2025-01-30',
      checkOut: '2025-02-02',
      nights: 3,
      guests: 6,
      totalAmount: 18000,
      paidAmount: 0,
      status: 'pending',
      paymentStatus: 'pending',
      bookingDate: '2025-01-14',
      specialRequests: 'Vegetarian meals only'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'completed':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'no-show':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-800';
      case 'partial':
        return 'bg-yellow-100 text-yellow-800';
      case 'pending':
        return 'bg-red-100 text-red-800';
      case 'refunded':
        return 'bg-gray-100 text-gray-800';
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
      case 'completed':
        return <CheckCircle className="w-4 h-4" />;
      case 'no-show':
        return <XCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const handleSelectBooking = (bookingId: string) => {
    setSelectedBookings(prev => 
      prev.includes(bookingId) 
        ? prev.filter(id => id !== bookingId)
        : [...prev, bookingId]
    );
  };

  const handleSelectAll = () => {
    setSelectedBookings(
      selectedBookings.length === bookings.length ? [] : bookings.map(b => b.id)
    );
  };

  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = 
      booking.guestName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.bookingRef.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.propertyName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || booking.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const sortedBookings = [...filteredBookings].sort((a, b) => {
    let aValue = a[sortBy as keyof Booking];
    let bValue = b[sortBy as keyof Booking];
    
    // Handle undefined values
    if (aValue === undefined || bValue === undefined) {
      if (aValue === undefined && bValue === undefined) return 0;
      if (aValue === undefined) return 1;
      if (bValue === undefined) return -1;
    }
    
    if (sortBy === 'bookingDate' || sortBy === 'checkIn') {
      aValue = new Date(aValue as string).getTime();
      bValue = new Date(bValue as string).getTime();
    }
    
    if (sortOrder === 'asc') {
      return (aValue as number) > (bValue as number) ? 1 : -1;
    } else {
      return (aValue as number) < (bValue as number) ? 1 : -1;
    }
  });

  const bookingStats = {
    total: bookings.length,
    confirmed: bookings.filter(b => b.status === 'confirmed').length,
    pending: bookings.filter(b => b.status === 'pending').length,
    completed: bookings.filter(b => b.status === 'completed').length,
    cancelled: bookings.filter(b => b.status === 'cancelled').length,
    totalRevenue: bookings.filter(b => b.status !== 'cancelled').reduce((sum, b) => sum + b.totalAmount, 0),
    pendingPayments: bookings.filter(b => b.paymentStatus === 'pending' || b.paymentStatus === 'partial').reduce((sum, b) => sum + (b.totalAmount - b.paidAmount), 0)
  };

  return (
    <div className="p-3 sm:p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 space-y-4 sm:space-y-0">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Bookings Management</h1>
            <p className="text-gray-600 mt-1 text-sm sm:text-base">Manage all property bookings and reservations</p>
          </div>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-3">
            <button className="flex items-center justify-center px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm">
              <Download className="w-4 h-4 mr-2" />
              Export
            </button>
            <button className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
              <Plus className="w-4 h-4 mr-2" />
              New Booking
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3 sm:gap-4 mb-6">
          <div className="bg-white rounded-lg p-3 sm:p-4 border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-gray-600">Total Bookings</p>
                <p className="text-lg sm:text-2xl font-bold text-gray-900">{bookingStats.total}</p>
              </div>
              <Calendar className="w-6 h-6 sm:w-8 sm:h-8 text-blue-500" />
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-3 sm:p-4 border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-gray-600">Confirmed</p>
                <p className="text-lg sm:text-2xl font-bold text-green-600">{bookingStats.confirmed}</p>
              </div>
              <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8 text-green-500" />
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-3 sm:p-4 border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-gray-600">Pending</p>
                <p className="text-lg sm:text-2xl font-bold text-yellow-600">{bookingStats.pending}</p>
              </div>
              <AlertCircle className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-500" />
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-3 sm:p-4 border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-gray-600">Completed</p>
                <p className="text-lg sm:text-2xl font-bold text-blue-600">{bookingStats.completed}</p>
              </div>
              <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8 text-blue-500" />
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-3 sm:p-4 border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-gray-600">Cancelled</p>
                <p className="text-lg sm:text-2xl font-bold text-red-600">{bookingStats.cancelled}</p>
              </div>
              <XCircle className="w-6 h-6 sm:w-8 sm:h-8 text-red-500" />
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-3 sm:p-4 border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-gray-600">Total Revenue</p>
                <p className="text-lg sm:text-2xl font-bold text-gray-900">₹{bookingStats.totalRevenue.toLocaleString()}</p>
              </div>
              <CreditCard className="w-6 h-6 sm:w-8 sm:h-8 text-purple-500" />
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-3 sm:p-4 border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-gray-600">Pending Payments</p>
                <p className="text-lg sm:text-2xl font-bold text-orange-600">₹{bookingStats.pendingPayments.toLocaleString()}</p>
              </div>
              <AlertCircle className="w-6 h-6 sm:w-8 sm:h-8 text-orange-500" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg border border-gray-200 mb-6">
        <div className="p-3 sm:p-4 border-b border-gray-200">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search bookings, guests, or properties..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full sm:w-64 lg:w-80 text-sm"
                />
              </div>
              
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              >
                <option value="all">All Status</option>
                <option value="confirmed">Confirmed</option>
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
                <option value="no-show">No Show</option>
              </select>
              
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm"
              >
                <Filter className="w-4 h-4 mr-2" />
                More Filters
                <ChevronDown className={`w-4 h-4 ml-2 transform transition-transform ${showFilters ? 'rotate-180' : ''}`} />
              </button>
            </div>
            
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-3">
              <button className="flex items-center justify-center px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors text-sm">
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </button>
              
              <div className="flex items-center space-x-2 text-sm">
                <span className="text-sm text-gray-600">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-2 py-1 border border-gray-300 rounded text-xs focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="bookingDate">Booking Date</option>
                  <option value="checkIn">Check-in Date</option>
                  <option value="totalAmount">Amount</option>
                  <option value="guestName">Guest Name</option>
                </select>
                <button
                  onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                  className="p-1 hover:bg-gray-100 rounded text-gray-500"
                >
                  <ArrowUpDown className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
          
          {showFilters && (
            <div className="mt-4 pt-4 border-t border-gray-200 px-1">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date Range</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm">
                    <option>All Time</option>
                    <option>Today</option>
                    <option>This Week</option>
                    <option>This Month</option>
                    <option>Custom Range</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Payment Status</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm">
                    <option>All Payments</option>
                    <option>Paid</option>
                    <option>Partial</option>
                    <option>Pending</option>
                    <option>Refunded</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Property Type</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm">
                    <option>All Types</option>
                    <option>Villa</option>
                    <option>Apartment</option>
                    <option>Hotel Room</option>
                    <option>Cottage</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bookings Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        {/* Mobile Card View */}
        <div className="block lg:hidden">
          <div className="p-4 border-b border-gray-200 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Bookings ({sortedBookings.length})</h3>
            <button
              onClick={handleSelectAll}
              className="text-sm text-blue-600 hover:text-blue-700"
            >
              {selectedBookings.length === bookings.length ? 'Deselect All' : 'Select All'}
            </button>
          </div>
          <div className="divide-y divide-gray-200">
            {sortedBookings.map((booking) => (
              <div key={booking.id} className="p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={selectedBookings.includes(booking.id)}
                      onChange={() => handleSelectBooking(booking.id)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <div>
                      <div className="text-sm font-medium text-gray-900">#{booking.bookingRef}</div>
                      <div className="text-xs text-gray-500">
                        Booked: {new Date(booking.bookingDate).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(booking.status)}`}>
                    {getStatusIcon(booking.status)}
                    <span className="ml-1 capitalize">{booking.status}</span>
                  </span>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center text-sm">
                    <User className="w-4 h-4 mr-2 text-gray-400" />
                    <span className="font-medium">{booking.guestName}</span>
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                    <span>{booking.propertyName}</span>
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                    <span>
                      {new Date(booking.checkIn).toLocaleDateString()} - {new Date(booking.checkOut).toLocaleDateString()}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm">
                      <CreditCard className="w-4 h-4 mr-2 text-gray-400" />
                      <span className="font-medium">₹{booking.totalAmount.toLocaleString()}</span>
                      <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${getPaymentStatusColor(booking.paymentStatus)}`}>
                        {booking.paymentStatus}
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-1">
                      <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded transition-colors">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded transition-colors">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  
                  {booking.specialRequests && (
                    <div className="text-xs text-blue-600 flex items-center mt-2">
                      <FileText className="w-3 h-3 mr-1" />
                      Special requests
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Desktop Table View */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full min-w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left">
                  <input
                    type="checkbox"
                    checked={selectedBookings.length === bookings.length}
                    onChange={handleSelectAll}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Booking
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Guest
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Property
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Dates
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Payment
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sortedBookings.map((booking) => (
                <tr key={booking.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      checked={selectedBookings.includes(booking.id)}
                      onChange={() => handleSelectBooking(booking.id)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </td>
                  
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-gray-900">#{booking.bookingRef}</div>
                      <div className="text-xs text-gray-500">
                        Booked: {new Date(booking.bookingDate).toLocaleDateString()}
                      </div>
                      {booking.specialRequests && (
                        <div className="text-xs text-blue-600 mt-1 flex items-center">
                          <FileText className="w-3 h-3 mr-1" />
                          Special requests
                        </div>
                      )}
                    </div>
                  </td>
                  
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-gray-900 flex items-center">
                        <User className="w-4 h-4 mr-2 text-gray-400" />
                        {booking.guestName}
                      </div>
                      <div className="text-xs text-gray-500 flex items-center mt-1">
                        <Mail className="w-3 h-3 mr-1" />
                        {booking.guestEmail}
                      </div>
                      <div className="text-xs text-gray-500 flex items-center mt-1">
                        <Phone className="w-3 h-3 mr-1" />
                        {booking.guestPhone}
                      </div>
                    </div>
                  </td>
                  
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{booking.propertyName}</div>
                      <div className="text-xs text-gray-500 flex items-center">
                        <MapPin className="w-3 h-3 mr-1" />
                        {booking.propertyLocation}
                      </div>
                      <div className="text-xs text-gray-500">{booking.propertyType}</div>
                    </div>
                  </td>
                  
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm text-gray-900">
                        {new Date(booking.checkIn).toLocaleDateString()} - {new Date(booking.checkOut).toLocaleDateString()}
                      </div>
                      <div className="text-xs text-gray-500">
                        {booking.nights} nights • {booking.guests} guests
                      </div>
                    </div>
                  </td>
                  
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-gray-900">₹{booking.totalAmount.toLocaleString()}</div>
                      <div className="text-xs text-gray-500">Paid: ₹{booking.paidAmount.toLocaleString()}</div>
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium mt-1 ${getPaymentStatusColor(booking.paymentStatus)}`}>
                        {booking.paymentStatus}
                      </span>
                    </div>
                  </td>
                  
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusColor(booking.status)}`}>
                      {getStatusIcon(booking.status)}
                      <span className="ml-1 capitalize">{booking.status}</span>
                    </span>
                  </td>
                  
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <button className="p-1 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded transition-colors">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded transition-colors">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="px-4 sm:px-6 py-4 border-t border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between space-y-3 sm:space-y-0">
          <div className="text-sm text-gray-500 text-center sm:text-left">
            Showing {sortedBookings.length} of {bookings.length} bookings
          </div>
          <div className="flex items-center justify-center space-x-2">
            <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50 transition-colors disabled:opacity-50">
              Previous
            </button>
            <button className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition-colors">
              1
            </button>
            <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50 transition-colors">
              2
            </button>
            <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50 transition-colors disabled:opacity-50">
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Bulk Actions */}
      {selectedBookings.length > 0 && (
        <div className="fixed bottom-4 left-4 right-4 sm:left-1/2 sm:right-auto sm:transform sm:-translate-x-1/2 bg-white border border-gray-200 rounded-lg shadow-lg px-4 sm:px-6 py-4 z-50">
          <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
            <span className="text-sm text-gray-600 text-center sm:text-left">{selectedBookings.length} bookings selected</span>
            <div className="flex items-center justify-center space-x-2">
              <button className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700 transition-colors">
                Confirm
              </button>
              <button className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700 transition-colors">
                Cancel
              </button>
              <button className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition-colors">
                Export
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingsPage;