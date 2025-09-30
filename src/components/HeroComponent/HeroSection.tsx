'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Search, ChevronDown, MapPin, Home, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import property1 from '/public/images/property-1.jpg';

export default function HeroSection() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialTab = (searchParams.get('tab') as 'Buy' | 'Rent') ?? 'Buy';

  const [activeTab, setActiveTab] = useState<'For Sale' | 'For Rent'>("For Rent");
  const [location, setLocation] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [locations, setLocations] = useState<string[]>([]);
  const [types, setTypes] = useState<string[]>([]);
  const [prices, setPrices] = useState<string[]>([]);

  const handleTabClick = (tab: 'For Sale' | 'For Rent') => {
    setActiveTab(tab);
    const searchTab = tab === 'For Sale' ? 'buy' : 'rent';
    router.push(`/?tab=${searchTab}`, { scroll: false });
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
        tab: activeTab === 'For Sale' ? 'buy' : 'rent',
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 px-4 py-8 lg:py-12">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-5 gap-8 lg:gap-12 items-center">
        
        {/* Left Side - Content */}
        <div className="lg:col-span-3 space-y-6 lg:space-y-2">
          {/* Main Heading */}
          <div className="space-y-10">
            <h1 className="text-3xl mt-24 sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 leading-tight">
              Find a perfect
              <br />
              <span className="text-gray-700">Home you love..!</span>
            </h1>
            <p className="text-gray-600 text-base lg:text-lg max-w-lg leading-relaxed">
              Etiam eget elementum elit. Aenean dignissim dapibus vestibulum. 
              Integer a dolor eu sapien sodales vulputate ac in purus.
            </p>
          </div>

          {/* Property Image with Navigation */}
          <div className="relative hidden sm:block max-w-lg">
            <div className="rounded-xl lg:rounded-2xl overflow-hidden shadow-xl">
              <div className="aspect-[4/3] bg-gradient-to-r from-amber-100 to-orange-100">
                <Image 
                  src={property1} 
                  alt="Modern bedroom interior"
                  className="w-full h-full object-cover"
                  sizes="(max-width: 768px) 100vw,
                         (max-width: 1200px) 50vw,
                         33vw"
                  priority
                />
              </div>
            </div>
            
            {/* Navigation Arrows */}
            <button className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-all duration-200 hover:scale-105">
              <ChevronLeft className="w-4 h-4 text-gray-600" />
            </button>
            <button className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-all duration-200 hover:scale-105">
              <ChevronRight className="w-4 h-4 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Right Side - Search Form */}
        <div className="lg:col-span-2 w-full max-w-md mx-auto lg:max-w-none">
          <div className="bg-white rounded-2xl lg:rounded-3xl shadow-xl border border-gray-100 p-6 lg:p-6">
            {/* Tabs */}
            <div className="flex mb-6 lg:mb-8 border-b border-gray-100">
              {(['For Sale', 'For Rent'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => handleTabClick(tab)}
                  className={`flex-1 py-3 px-4 text-center font-semibold text-sm lg:text-base transition-all duration-300 relative ${
                    activeTab === tab
                      ? 'text-teal-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab}
                  {activeTab === tab && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-teal-600 rounded-full"></div>
                  )}
                </button>
              ))}
            </div>

            {/* Search Form */}
            <div className="space-y-4 lg:space-y-5">
              {/* Location */}
              <div className="relative">
                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full p-3 lg:p-4 border-2 border-gray-200 rounded-xl focus:border-teal-500 focus:outline-none text-gray-700 appearance-none pr-10 text-sm lg:text-base transition-colors duration-200"
                >
                  {locations.map((city, i) => (
                    <option key={i} value={city}>{city}</option>
                  ))}
                </select>
                <MapPin className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 lg:w-5 lg:h-5 pointer-events-none" />
              </div>

              {/* Property Type */}
              <div className="relative">
                <select
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value)}
                  className="w-full p-3 lg:p-4 border-2 border-gray-200 rounded-xl appearance-none bg-white text-gray-700 focus:border-teal-500 focus:outline-none pr-10 text-sm lg:text-base transition-colors duration-200"
                >
                  {types.map((type, i) => (
                    <option key={i} value={type}>{type}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 lg:w-5 lg:h-5 pointer-events-none" />
              </div>

              {/* Price Range */}
              <div className="relative">
                <select
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
                  className="w-full p-3 lg:p-4 border-2 border-gray-200 rounded-xl appearance-none bg-white text-gray-700 focus:border-teal-500 focus:outline-none pr-10 text-sm lg:text-base transition-colors duration-200"
                >
                  {prices.map((price, i) => (
                    <option key={i} value={price}>{price}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 lg:w-5 lg:h-5 pointer-events-none" />
              </div>

              {/* Search Button */}
              <button
                onClick={handleSearch}
                className="w-full bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white py-3 lg:py-4 px-6 rounded-xl font-semibold text-sm lg:text-base transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
              >
                <Search className="w-4 h-4 lg:w-5 lg:h-5" />
                Search
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Stats - Only visible on mobile */}
      <div className="sm:hidden mt-8 flex justify-center gap-6 px-4">
        <div className="flex items-center gap-2">
          <div className="flex -space-x-1">
            {[1,2,3].map((i) => (
              <div key={i} className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 border-2 border-white"></div>
            ))}
          </div>
          <div>
            <div className="font-bold text-gray-900 text-sm">72k+ Happy</div>
            <div className="text-xs text-gray-600">Customers</div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-400 to-teal-500 flex items-center justify-center">
            <Home className="w-4 h-4 text-white" />
          </div>
          <div>
            <div className="font-bold text-gray-900 text-sm">200+ New</div>
            <div className="text-xs text-gray-600">Listings Daily!</div>
          </div>
        </div>
      </div>
    </div>
  );
}
