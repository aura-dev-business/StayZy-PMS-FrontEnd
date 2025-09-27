'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
<<<<<<< Updated upstream
import { Search, ChevronDown, MapPin, Home } from 'lucide-react';
import Image from 'next/image';
import ScrollAnimationWrapper from '../common/ScrollAnimationWrapper';
import GsapScrollAnimation from '../common/GsapScrollAnimation';
=======
import { Search, ChevronDown, MapPin, Home, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import property1 from '/public/images/property-1.jpg';
>>>>>>> Stashed changes

export default function HeroSection() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialTab = (searchParams.get('tab') as 'Buy' | 'Rent') ?? 'Buy';

<<<<<<< Updated upstream
  const [activeTab, setActiveTab] = useState<'Buy' | 'Rent'>("Rent");
=======
  const [activeTab, setActiveTab] = useState<'For Sale' | 'For Rent'>("For Rent");
>>>>>>> Stashed changes
  const [location, setLocation] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [locations, setLocations] = useState<string[]>([]);
  const [types, setTypes] = useState<string[]>([]);
  const [prices, setPrices] = useState<string[]>([]);

<<<<<<< Updated upstream
  const handleTabClick = (tab: 'Buy' | 'Rent') => {
=======
  const handleTabClick = (tab: 'For Sale' | 'For Rent') => {
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
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
=======
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

          {/* Stats - Hidden on mobile, compact on larger screens */}
          {/* <div className="hidden sm:flex items-center gap-6 lg:gap-8 flex-wrap">
            <div className="flex items-center gap-3">
              <div className="flex -space-x-1.5">
                {[1,2,3,4,5].map((i) => (
                  <div key={i} className="w-7 h-7 lg:w-8 lg:h-8 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 border-2 border-white shadow-sm"></div>
                ))}
              </div>
              <div>
                <div className="font-bold text-gray-900 text-sm lg:text-base">72k+ Happy</div>
                <div className="text-xs lg:text-sm text-gray-600">Customers</div>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-gradient-to-r from-green-400 to-teal-500 flex items-center justify-center shadow-lg">
                <Home className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
              </div>
              <div>
                <div className="font-bold text-gray-900 text-sm lg:text-base">200+ New</div>
                <div className="text-xs lg:text-sm text-gray-600">Listings Everyday!</div>
              </div>
            </div>
          </div> */}
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
>>>>>>> Stashed changes
              <div className="relative">
                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
<<<<<<< Updated upstream
                  className="w-full p-3 sm:p-4 border-2 border-gray-200 rounded-lg sm:rounded-xl appearance-none bg-white text-gray-900 font-medium text-sm sm:text-base"
                >
                  {locations.map((city, i) => (
                    <option key={i}>{city}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5 pointer-events-none" />
=======
                  className="w-full p-3 lg:p-4 border-2 border-gray-200 rounded-xl focus:border-teal-500 focus:outline-none text-gray-700 appearance-none pr-10 text-sm lg:text-base transition-colors duration-200"
                >
                  {locations.map((city, i) => (
                    <option key={i} value={city}>{city}</option>
                  ))}
                </select>
                <MapPin className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 lg:w-5 lg:h-5 pointer-events-none" />
>>>>>>> Stashed changes
              </div>

<<<<<<< Updated upstream
            {/* Property Type */}
            <div className="space-y-2 sm:space-y-3">
              <label className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-white">
                <Home className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                Property Type
              </label>
=======
              {/* Property Type */}
>>>>>>> Stashed changes
              <div className="relative">
                <select
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value)}
<<<<<<< Updated upstream
                  className="w-full p-3 sm:p-4 border-2 border-gray-200 rounded-lg sm:rounded-xl appearance-none bg-white text-gray-900 font-medium text-sm sm:text-base"
                >
                  {types.map((type, i) => (
                    <option key={i}>{type}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5 pointer-events-none" />
=======
                  className="w-full p-3 lg:p-4 border-2 border-gray-200 rounded-xl appearance-none bg-white text-gray-700 focus:border-teal-500 focus:outline-none pr-10 text-sm lg:text-base transition-colors duration-200"
                >
                  {types.map((type, i) => (
                    <option key={i} value={type}>{type}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 lg:w-5 lg:h-5 pointer-events-none" />
>>>>>>> Stashed changes
              </div>

<<<<<<< Updated upstream
            {/* Price Range */}
            <div className="space-y-2 sm:space-y-3">
              <label className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-white">
                ₹ Price Range
              </label>
=======
              {/* Price Range */}
>>>>>>> Stashed changes
              <div className="relative">
                <select
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
<<<<<<< Updated upstream
                  className="w-full p-3 sm:p-4 border-2 border-gray-200 rounded-lg sm:rounded-xl appearance-none bg-white text-gray-900 font-medium text-sm sm:text-base"
                >
                  {prices.map((price, i) => (
                    <option key={i}>{price}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5 pointer-events-none" />
=======
                  className="w-full p-3 lg:p-4 border-2 border-gray-200 rounded-xl appearance-none bg-white text-gray-700 focus:border-teal-500 focus:outline-none pr-10 text-sm lg:text-base transition-colors duration-200"
                >
                  {prices.map((price, i) => (
                    <option key={i} value={price}>{price}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 lg:w-5 lg:h-5 pointer-events-none" />
>>>>>>> Stashed changes
              </div>

<<<<<<< Updated upstream
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
=======
              {/* Advance Search */}
              {/* <div className="text-right">
                <button className="text-teal-600 hover:text-teal-700 font-medium text-sm flex items-center justify-end gap-1.5 w-full transition-colors duration-200">
                  <span className="text-gray-400 text-xs">⚙</span>
                  Advance Search
                </button>
              </div> */}

              {/* Search Button */}
              <button
                onClick={handleSearch}
                className="w-full bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white py-3 lg:py-4 px-6 rounded-xl font-semibold text-sm lg:text-base transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
              >
                <Search className="w-4 h-4 lg:w-5 lg:h-5" />
                Search
>>>>>>> Stashed changes
              </button>
            </div>
          </div>
        </div>
      </div>

<<<<<<< Updated upstream
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
=======
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
>>>>>>> Stashed changes
      </div>
    </div>

  );
}