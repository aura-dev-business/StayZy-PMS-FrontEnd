'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Search, ChevronDown, MapPin, Home, DollarSign } from 'lucide-react';

export default function HeroSection() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialTab = (searchParams.get('tab') as 'Buy' | 'Rent' | 'Sell') ?? 'Buy';

  const [activeTab, setActiveTab] = useState<'Buy' | 'Rent' | 'Sell'>(initialTab);
  const [location, setLocation] = useState('Florida, USA');
  const [propertyType, setPropertyType] = useState('20 x 10 Meters');
  const [priceRange, setPriceRange] = useState('₹700 - ₹900');
  const [facadePattern, setFacadePattern] = useState<React.ReactElement[]>([]);

  const handleTabClick = (tab: 'Buy' | 'Rent' | 'Sell') => {
    setActiveTab(tab);
    router.push(`/?tab=${tab.toLowerCase()}`, { scroll: false });
  };

  useEffect(() => {
    const pattern = Array.from({ length: 120 }).map((_, i) => (
      <div
        key={i}
        className="bg-gradient-to-t from-blue-500 to-blue-400 opacity-30 rounded-sm transition-all duration-300 hover:opacity-50"
        style={{
          height: Math.random() > 0.6 ? '100%' : `${Math.random() * 60 + 40}%`,
          backgroundColor: Math.random() > 0.5 ? '#3B82F6' : '#1E40AF',
          animationDelay: `${Math.random() * 2}s`,
        }}
      />
    ));
    setFacadePattern(pattern);
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')`
        }}
      />
      
      {/* Dark Overlay for better text readability */}
      <div className="absolute inset-0 bg-black/40" />
      
      {/* Gradient Overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/20 via-transparent to-blue-900/30" />




      <div className="relative z-10 container mx-auto px-8 pt-20 pb-16 flex flex-col items-center">
        <div className="max-w-5xl mb-16 text-center">
          <h1 className="text-6xl md:text-4xl text-white leading-tight max-w-4xl mx-auto text-center font-bold drop-shadow-2xl">
            Find Your
           
              Perfect Stay
            <span className="text-5xl md:text-4xl font-light text-white/90 block mt-2">
              Effortlessly.
            </span>
          </h1>
          {/* <p className="text-xl md:text-2xl text-white/80 mt-6 font-light max-w-3xl mx-auto drop-shadow-lg">
            Discover premium properties tailored to your lifestyle. 
            <span className="block mt-1">Your dream home awaits.</span>
          </p> */}
        </div>

        <div className="bg-white/10  backdrop-blur-none rounded-3xl shadow-2xl border border-white p-8 max-w-5xl mx-auto w-full">
        {/* ✅ Tab Navigation with Shallow Routing */}
          <div className="flex gap-2 mb-8 bg-gray-100 p-2 rounded-2xl w-fit mx-auto">
            {['Buy', 'Rent', 'Sell'].map((tab) => (
              <button
                key={tab}
                onClick={() => handleTabClick(tab as 'Buy' | 'Rent' | 'Sell')}
                className={`px-8 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  activeTab === tab
                    ? 'bg-red-500 text-white shadow-lg shadow-red-500/25 transform scale-105'
                    : 'text-gray-600 hover:bg-white hover:text-gray-900 hover:shadow-md'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Search Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-end">
            {/* Location Field */}
            <div className="space-y-3">
              <label className="flex items-center gap-2 text-sm font-semibold text-white">
                <MapPin className="w-4 h-4 text-white" />
                Location
              </label>
              <div className="relative">
                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full p-4 border-2 border-gray-200 rounded-xl appearance-none bg-white text-gray-900 font-medium focus:ring-4 focus:ring-red-500/20 focus:border-red-500 transition-all duration-300 hover:border-gray-300"
                >
                  <option>Electronic City</option>
                  <option>Madiwala, Bangalore</option>
                  <option>Kammanahalli, Bangalore</option>
                  <option>Kozhikode, Kerala</option>
                  <option>Kannur, Kerala</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
              </div>
            </div>

            {/* Property Type Field */}
            <div className="space-y-3">
              <label className="flex items-center gap-2 text-sm font-semibold text-white">
                <Home className="w-4 h-4 text-white" />
                Property Type
              </label>
              <div className="relative">
                <select
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value)}
                  className="w-full p-4 border-2 border-gray-200 rounded-xl appearance-none bg-white text-gray-900 font-medium focus:ring-4 focus:ring-red-500/20 focus:border-red-500 transition-all duration-300 hover:border-gray-300"
                >
                  <option>1 BHK</option>
                  <option>2 BHK</option>
                  <option>3 BHK</option>
                  <option>4 BHK</option>
                  <option>5 BHK</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
              </div>
            </div>

            {/* Price Range Field */}
            <div className="space-y-3">
              <label className="flex items-center gap-2 text-sm font-semibold text-white">
                <DollarSign className="w-4 h-4 text-white" />
                Price Range
              </label>
              <div className="relative">
                <select
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
                  className="w-full p-4 border-2 border-gray-200 rounded-xl appearance-none bg-white text-gray-900 font-medium focus:ring-4 focus:ring-red-500/20 focus:border-red-500 transition-all duration-300 hover:border-gray-300"
                >
                  <option>₹700 - ₹900</option>
                  <option>₹900 - ₹1,200</option>
                  <option>₹1,200 - ₹1,500</option>
                  <option>₹1,500 - ₹2,000</option>
                  <option>₹2,000+</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
              </div>
            </div>

            {/* Search Button */}
            <div className="space-y-3">
              <div className="h-6" />
              <button className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white p-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-red-500/25 transform hover:scale-105 active:scale-95 font-semibold">
                <div className="flex items-center justify-center gap-2">
                  <Search className="w-5 h-5" />
                  Search Properties
                </div>
              </button>
            </div>
          </div>

          {/* Tab-Specific Info */}
          <div className="mt-10 w-full">
            {activeTab === 'Buy' && (
              <div className="bg-blue-50 p-4 rounded-xl shadow text-blue-800 font-medium">
                🏡 Explore properties available for purchase.
              </div>
            )}
            {activeTab === 'Rent' && (
              <div className="bg-yellow-50 p-4 rounded-xl shadow text-yellow-800 font-medium">
                🏠 Find rental listings tailored to your needs.
              </div>
            )}
            {activeTab === 'Sell' && (
              <div className="bg-green-50 p-4 rounded-xl shadow text-green-800 font-medium">
                💼 Post your property and attract potential buyers.
              </div>
            )}
          </div>
        </div>

        {/* Stats Section
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto w-full">
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900 mb-2">10K+</div>
            <div className="text-gray-600">Premium Properties</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900 mb-2">50+</div>
            <div className="text-gray-600">Cities Covered</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900 mb-2">99%</div>
            <div className="text-gray-600">Client Satisfaction</div>
          </div>
        </div> */}
      </div>
    </div>
  );
}