'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Search, ChevronDown, MapPin, Home } from 'lucide-react';
import Image from 'next/image';
import ScrollAnimationWrapper from '../common/ScrollAnimationWrapper';
import GsapScrollAnimation from '../common/GsapScrollAnimation';

export default function HeroSection() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialTab = (searchParams.get('tab') as 'Buy' | 'Rent') ?? 'Buy';

  const [activeTab, setActiveTab] = useState<'Buy' | 'Rent'>("Rent");
  const [location, setLocation] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [locations, setLocations] = useState<string[]>([]);
  const [types, setTypes] = useState<string[]>([]);
  const [prices, setPrices] = useState<string[]>([]);

  const handleTabClick = (tab: 'Buy' | 'Rent') => {
    setActiveTab(tab);
    router.push(`/?tab=${tab.toLowerCase()}`, { scroll: false });
  };

  const fetchOptions = async () => {
    try {
      const [cityRes, typeRes, priceRes] = await Promise.all([
        fetch('http://localhost:8081/api/properties/city/all'),
        fetch('http://localhost:8081/api/properties/type/all'),
        fetch('http://localhost:8081/api/properties/price/all'),
      ]);

      const cities = await cityRes.json();
      const types = await typeRes.json();
      const prices = await priceRes.json();

      setLocations(cities);
      setTypes(types);
      setPrices(prices);

      setLocation(cities[0] || '');
      setPropertyType(types[0] || '');
      setPriceRange(prices[0] || '');
    } catch (error) {
      console.error('Error fetching filter options:', error);
    }
  };

  const handleSearch = () => {
    try {
      const [min, max] = priceRange
        .replace(/[^\d\-]/g, '')
        .split('-')
        .map(p => p.trim());

      const queryParams = new URLSearchParams({
        city: location,
        propertyType,
        minPrice: min || '0',
        maxPrice: max || '10000000',
        tab: activeTab.toLowerCase(),
      }).toString();

      router.push(`/SearchProperties?${queryParams}`);
    } catch (error) {
      console.error('Search redirect failed:', error);
    }
  };

  useEffect(() => {
    fetchOptions();
  }, []);

  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat">
        <Image
          src="/images/Villa.jpg"
          alt="Villa"
          fill
          style={{ objectFit: 'cover' }}
          priority
        />
      </div>

      <div className="absolute inset-0 bg-black/60" />
      <div className="absolute inset-0" />

      <div className="relative pt-24 z-10 min-h-screen container mx-auto px-4  sm:px-8 pt-16 sm:pt-24 pb-6 sm:pb-10 flex flex-col items-center">
        {/* Title Section */}
        <div className="max-w-5xl mb-6 sm:mb-10 text-center">
          <h1  style={{ fontFamily: 'Nulshock RG' }}className="bg-black/50 p-5 rounded-3xl text-2xl sm:text-4xl md:text-5xl text-white/70 font-bold drop-shadow-2xl">
            Find Your Perfect Stay
            <span className="text-2xl  sm:text-5xl md:text-5xl font-light text-white/60 block mt-1 sm:mt-2">
              Effortlessly.
            </span>
          </h1>
        </div>

        {/* Search Form */}
        <div className="bg-white/10 backdrop-blur-none rounded-2xl sm:rounded-3xl shadow-2xl border border-white p-4 sm:p-8 max-w-5xl mx-auto w-full">
          {/* Tabs */}
          <div className="flex gap-1 sm:gap-2 mb-6 sm:mb-8 bg-gray-100 p-1 sm:p-2 rounded-xl sm:rounded-2xl w-fit mx-auto">
            {['Buy', 'Rent'].map((tab) => (
              <button
                key={tab}
                onClick={() => handleTabClick(tab as 'Buy' | 'Rent')}
                className={`px-4 sm:px-8 py-2 sm:py-3 rounded-lg sm:rounded-xl font-semibold text-sm sm:text-base transition-all duration-300 ${
                  activeTab === tab
                    ? 'bg-gradient-to-r from-teal-500 to-teal-600 text-white shadow-lg transform scale-105'
                    : 'text-gray-600 hover:bg-white hover:text-gray-900 hover:shadow-md'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 items-end">
            {/* Location */}
            <div className="space-y-2 sm:space-y-3">
              <label className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-white">
                <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                Location
              </label>
              <div className="relative">
                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full p-3 sm:p-4 border-2 border-gray-200 rounded-lg sm:rounded-xl appearance-none bg-white text-gray-900 font-medium text-sm sm:text-base"
                >
                  {locations.map((city, i) => (
                    <option key={i}>{city}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5 pointer-events-none" />
              </div>
            </div>

            {/* Property Type */}
            <div className="space-y-2 sm:space-y-3">
              <label className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-white">
                <Home className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                Property Type
              </label>
              <div className="relative">
                <select
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value)}
                  className="w-full p-3 sm:p-4 border-2 border-gray-200 rounded-lg sm:rounded-xl appearance-none bg-white text-gray-900 font-medium text-sm sm:text-base"
                >
                  {types.map((type, i) => (
                    <option key={i}>{type}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5 pointer-events-none" />
              </div>
            </div>

            {/* Price Range */}
            <div className="space-y-2 sm:space-y-3">
              <label className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-white">
                ₹ Price Range
              </label>
              <div className="relative">
                <select
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
                  className="w-full p-3 sm:p-4 border-2 border-gray-200 rounded-lg sm:rounded-xl appearance-none bg-white text-gray-900 font-medium text-sm sm:text-base"
                >
                  {prices.map((price, i) => (
                    <option key={i}>{price}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5 pointer-events-none" />
              </div>
            </div>

            {/* Search Button */}
            <div className="space-y-2 sm:space-y-3 sm:col-span-2 lg:col-span-1">
              <div className="hidden sm:block h-6" />
              <button
                onClick={handleSearch}
                className="w-full bg-gradient-to-r from-teal-500 to-teal-600 hover:bg-gradient-to-r from-teal-700 to-teal-800 text-white p-3 sm:p-4 rounded-lg sm:rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-red-500/25 transform hover:scale-105 active:scale-95 font-semibold text-sm sm:text-base"
              >
                <div className="flex items-center justify-center gap-2">
                  <Search className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="hidden sm:inline">Search Properties</span>
                  <span className="sm:hidden">Search</span>
                </div>
              </button>
            </div>
          </div>

          {/* Info Message */}
          <div className="mt-4 sm:mt-8 w-full">
            {activeTab === 'Buy' && (
              <div className="bg-blue-50 p-3 sm:p-4 rounded-lg sm:rounded-xl shadow text-blue-800 font-medium text-xs sm:text-sm">
                🏡 Explore properties available for purchase.
              </div>
            )}
            {activeTab === 'Rent' && (
              <div className="bg-yellow-50 p-3 sm:p-4 rounded-lg sm:rounded-xl shadow text-yellow-800 font-medium text-xs sm:text-sm">
                🏠 Find rental listings tailored to your needs.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>

  );
}