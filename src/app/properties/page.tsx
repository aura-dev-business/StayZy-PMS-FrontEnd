'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { toast, Toaster } from 'sonner';
import {
  ChevronLeft,
  ChevronRight,
  MapPin,
  Calendar,
  Heart,
  Eye,
  Search,
  ArrowUpDown,
  SlidersHorizontal,
  ChevronDown,
} from 'lucide-react';
import { usePropertyStore } from '@/store/propertyStore'; // Adjust the path as needed

interface Property {
  id: string;
  title: string;
  city: string;
  pricePerMonth: number;
  images?: string[];
  image?: string;
  imageUrl?: string;
  bhkType?: string;
  tenantType?: string;
}

type SortOption = {
  value: string;
  label: string;
  sortFn: (a: Property, b: Property) => number;
};

const checkLogin = async (): Promise<boolean> => {
  try {
    const res = await fetch('http://localhost:8081/api/auth/me', {
      credentials: 'include',
    });
    return res.ok;
  } catch {
    return false;
  }
};

const PropertySkeleton = () => {
  return (
    <div className="bg-white rounded-3xl shadow-lg overflow-hidden animate-pulse">
      <div className="relative h-48 sm:h-64 bg-gray-300"></div>
      <div className="p-4 sm:p-6">
        <div className="h-5 bg-gray-300 rounded-md mb-3 w-3/4"></div>
        <div className="flex items-center mb-4">
          <div className="w-4 h-4 bg-gray-300 rounded mr-2"></div>
          <div className="h-4 bg-gray-300 rounded w-24"></div>
        </div>
        <div className="flex justify-between items-end mb-4">
          <div>
            <div className="h-6 bg-gray-300 rounded w-20 mb-1"></div>
            <div className="h-3 bg-gray-300 rounded w-16"></div>
          </div>
          <div className="h-4 bg-gray-300 rounded w-8"></div>
        </div>
        <div className="w-full h-10 bg-gray-300 rounded-2xl"></div>
      </div>
    </div>
  );
};

const PropertySearchHeader = ({
  sortOptions,
}: {
  sortOptions: SortOption[];
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const segments = pathname.split('/').filter(Boolean);
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false);
  const [filtersExpanded, setFiltersExpanded] = useState(false);

  // Get state and actions from the store
  const {
    selectedLocation,
    setSelectedLocation,
    searchQuery,
    setSearchQuery,
    propertyType,
    setPropertyType,
    propertyTypes,
    cities,
    sortBy,
    setSortBy,
    bhkType,
    setBhkType,
    bhkTypes,
    tenantType,
    setTenantType,
    tenantTypes,
  } = usePropertyStore();

  const formatSegment = (segment: string) =>
    segment.replace(/-/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase());

  const handleBreadcrumbClick = (index: number) => {
    const newPath = '/' + segments.slice(0, index + 1).join('/');
    router.push(newPath);
  };

  const handleSortSelect = (value: string) => {
    setSortBy(value);
    setSortDropdownOpen(false);
  };

  const currentSortLabel = sortOptions.find(option => option.value === sortBy)?.label || 'Sort';

  return (
    <div className="bg-white shadow-sm">
      {/* Breadcrumb Navigation */}
      <div className="px-4 sm:px-6 py-3 border-b border-gray-200">
        <nav className="flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm text-gray-600 overflow-x-auto">
          <span
            className="hover:text-blue-600 cursor-pointer whitespace-nowrap"
            onClick={() => router.push('/')}
          >
            Home
          </span>
          {segments.map((seg, i) => (
            <React.Fragment key={i}>
              <span className="text-gray-400">/</span>
              {i === segments.length - 1 ? (
                <span className="text-gray-900 whitespace-nowrap">{formatSegment(seg)}</span>
              ) : (
                <span
                  className="hover:text-blue-600 cursor-pointer whitespace-nowrap"
                  onClick={() => handleBreadcrumbClick(i)}
                >
                  {formatSegment(seg)}
                </span>
              )}
            </React.Fragment>
          ))}
        </nav>
      </div>

      {/* Search and Filter Controls */}
      <div className="px-4 sm:px-6 py-4">
        {/* Mobile: Stack vertically, Desktop: Horizontal layout */}
        <div className="space-y-4 lg:space-y-0">
          {/* Top row: Search bar (full width on mobile) */}
          <div className="w-full lg:hidden">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search Locality"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
            </div>
          </div>

          {/* Desktop: Single row layout */}
          <div className="hidden lg:flex lg:items-center lg:space-x-4">
            {/* CITY DROPDOWN */}
            <div className="relative flex-shrink-0">
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="px-4 py-2.5 border border-gray-300 rounded-lg text-gray-700 bg-white cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm min-w-[120px]"
              >
                <option value="All">All Cities</option>
                {cities.map((city, index) => (
                  <option key={index} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>

            {/* SEARCH BAR */}
            <div className="flex-1 relative min-w-0">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search Locality"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
            </div>

            {/* PROPERTY TYPE DROPDOWN */}
            <div className="relative flex-shrink-0">
              <select
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
                className="px-4 py-2.5 border border-gray-300 rounded-lg text-gray-700 bg-white cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm min-w-[140px]"
              >
                <option value="Property Type">Property Type</option>
                {propertyTypes.map((type, index) => (
                  <option key={index} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            {/* BHK TYPE DROPDOWN */}
            <div className="relative flex-shrink-0">
              <select
                value={bhkType}
                onChange={(e) => setBhkType(e.target.value)}
                className="px-4 py-2.5 border border-gray-300 rounded-lg text-gray-700 bg-white cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm min-w-[100px]"
              >
                <option value="BHK Type">BHK Type</option>
                {bhkTypes.map((type, index) => (
                  <option key={index} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            {/* TENANT TYPE DROPDOWN */}
            <div className="relative flex-shrink-0">
              <select
                value={tenantType}
                onChange={(e) => setTenantType(e.target.value)}
                className="px-4 py-2.5 border border-gray-300 rounded-lg text-gray-700 bg-white cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm min-w-[120px]"
              >
                <option value="Tenant Type">Tenant Type</option>
                {tenantTypes.map((type, index) => (
                  <option key={index} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            {/* CUSTOM SORT DROPDOWN */}
            <div className="relative flex-shrink-0">
              <button
                onClick={() => setSortDropdownOpen(!sortDropdownOpen)}
                className="flex items-center space-x-2 px-4 py-2.5 border border-gray-300 rounded-lg hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-sm min-w-[120px]"
              >
                <span className="text-gray-700 truncate">{currentSortLabel}</span>
                <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform flex-shrink-0 ${sortDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {sortDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                  <div className="py-2">
                    {sortOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => handleSortSelect(option.value)}
                        className={`w-full px-4 py-2 text-left hover:bg-gray-50 focus:outline-none focus:bg-gray-50 text-sm ${
                          sortBy === option.value ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <button className="flex items-center space-x-2 px-4 py-2.5 border border-gray-300 rounded-lg hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 flex-shrink-0">
              <span className="text-gray-700 text-sm">Filters</span>
              <SlidersHorizontal className="w-4 h-4 text-gray-500" />
            </button>
          </div>

          {/* Mobile: Collapsible filters */}
          <div className="lg:hidden">
            <button
              onClick={() => setFiltersExpanded(!filtersExpanded)}
              className="flex items-center justify-between w-full px-4 py-2.5 border border-gray-300 rounded-lg hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3"
            >
              <span className="text-gray-700 text-sm">Filters & Sort</span>
              <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${filtersExpanded ? 'rotate-180' : ''}`} />
            </button>

            {filtersExpanded && (
              <div className="space-y-3 animate-in slide-in-from-top-2 duration-200">
                {/* Mobile filters row 1 */}
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {/* CITY DROPDOWN */}
                  <div className="relative">
                    <select
                      value={selectedLocation}
                      onChange={(e) => setSelectedLocation(e.target.value)}
                      className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-gray-700 bg-white cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    >
                      <option value="All">All Cities</option>
                      {cities.map((city, index) => (
                        <option key={index} value={city}>
                          {city}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* PROPERTY TYPE DROPDOWN */}
                  <div className="relative">
                    <select
                      value={propertyType}
                      onChange={(e) => setPropertyType(e.target.value)}
                      className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-gray-700 bg-white cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    >
                      <option value="Property Type">Property Type</option>
                      {propertyTypes.map((type, index) => (
                        <option key={index} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* BHK TYPE DROPDOWN */}
                  <div className="relative">
                    <select
                      value={bhkType}
                      onChange={(e) => setBhkType(e.target.value)}
                      className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-gray-700 bg-white cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    >
                      <option value="BHK Type">BHK Type</option>
                      {bhkTypes.map((type, index) => (
                        <option key={index} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* TENANT TYPE DROPDOWN */}
                  <div className="relative">
                    <select
                      value={tenantType}
                      onChange={(e) => setTenantType(e.target.value)}
                      className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-gray-700 bg-white cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    >
                      <option value="Tenant Type">Tenant Type</option>
                      {tenantTypes.map((type, index) => (
                        <option key={index} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* SORT DROPDOWN */}
                  <div className="relative col-span-2 sm:col-span-1">
                    <button
                      onClick={() => setSortDropdownOpen(!sortDropdownOpen)}
                      className="flex items-center justify-between w-full px-3 py-2.5 border border-gray-300 rounded-lg hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-sm"
                    >
                      <span className="text-gray-700 truncate">{currentSortLabel}</span>
                      <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform flex-shrink-0 ${sortDropdownOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {sortDropdownOpen && (
                      <div className="absolute left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                        <div className="py-2">
                          {sortOptions.map((option) => (
                            <button
                              key={option.value}
                              onClick={() => handleSortSelect(option.value)}
                              className={`w-full px-4 py-2 text-left hover:bg-gray-50 focus:outline-none focus:bg-gray-50 text-sm ${
                                sortBy === option.value ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
                              }`}
                            >
                              {option.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Additional filters button */}
                <button className="flex items-center justify-center space-x-2 w-full px-4 py-2.5 border border-gray-300 rounded-lg hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <SlidersHorizontal className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-700 text-sm">More Filters</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const Page = () => {
  const router = useRouter();
  
  // Get all needed state and actions from the store
  const {
    properties,
    cities,
    propertyTypes,
    bhkTypes,
    tenantTypes,
    selectedLocation,
    searchQuery,
    propertyType,
    bhkType,
    tenantType,
    sortBy,
    loading,
    currentImageIndex,
    imageTransition,
    favorites,
    setSortBy,
    toggleFavorite,
    setCurrentImageIndex,
    setImageTransition,
    fetchProperties
  } = usePropertyStore();

  // Sort options configuration
  const sortOptions: SortOption[] = [
    {
      value: 'Sort',
      label: 'Sort',
      sortFn: () => 0, // No sorting, keep original order
    },
    {
      value: 'price-low-high',
      label: 'Price: Low to High',
      sortFn: (a, b) => (a.pricePerMonth || 0) - (b.pricePerMonth || 0),
    },
    {
      value: 'price-high-low',
      label: 'Price: High to Low',
      sortFn: (a, b) => (b.pricePerMonth || 0) - (a.pricePerMonth || 0),
    },
    {
      value: 'name-a-z',
      label: 'Name: A to Z',
      sortFn: (a, b) => a.title.localeCompare(b.title),
    },
    {
      value: 'name-z-a',
      label: 'Name: Z to A',
      sortFn: (a, b) => b.title.localeCompare(a.title),
    },
    {
      value: 'city-a-z',
      label: 'City: A to Z',
      sortFn: (a, b) => a.city.localeCompare(b.city),
    },
    {
      value: 'city-z-a',
      label: 'City: Z to A',
      sortFn: (a, b) => b.city.localeCompare(a.city),
    },
  ];

  // Fetch properties on mount
  useEffect(() => {
    fetchProperties();
  }, [fetchProperties]);

  const getPropertyImages = (p: Property): string[] => {
    if (p.images?.length) return p.images;
    if (p.image) return [p.image];
    if (p.imageUrl) return [p.imageUrl];
    return ['https://via.placeholder.com/600x400?text=No+Image'];
  };

  const filteredAndSortedProperties = (() => {
    // First filter the properties
    const filtered = properties.filter((p) => {
      const matchesSearch =
        p.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.title.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesType =
        propertyType === 'Property Type' ||
        p.title.toLowerCase().includes(propertyType.toLowerCase());

      const matchesCity =
        selectedLocation === 'All' || p.city.toLowerCase() === selectedLocation.toLowerCase();

      const matchesBhkType =
        bhkType === 'BHK Type' ||
        (p.bhkType && p.bhkType.toLowerCase() === bhkType.toLowerCase());

      const matchesTenantType =
        tenantType === 'Tenant Type' ||
        (p.tenantType && p.tenantType.toLowerCase() === tenantType.toLowerCase());

      return matchesSearch && matchesType && matchesCity && matchesBhkType && matchesTenantType;
    });

    // Then sort the filtered properties
    const currentSortOption = sortOptions.find(option => option.value === sortBy);
    if (currentSortOption && sortBy !== 'default') {
      return [...filtered].sort(currentSortOption.sortFn);
    }

    return filtered;
  })();

  const handleToggleFavorite = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const loggedIn = await checkLogin();
    if (!loggedIn) {
      toast.error('You must be logged in to add to wishlist');
      return;
    }
    toggleFavorite(id);
  };

  const changeImage = (id: string, dir: 'next' | 'prev', e: React.MouseEvent) => {
    e.stopPropagation();
    setImageTransition(id, true);

    setTimeout(() => {
      const prop = properties.find((p) => p.id === id);
      if (!prop) return;

      const imgs = getPropertyImages(prop);
      const cur = currentImageIndex[id] ?? 0;
      const next = dir === 'next' 
        ? (cur + 1) % imgs.length 
        : cur === 0 ? imgs.length - 1 : cur - 1;
      
      setCurrentImageIndex(id, next);

      setTimeout(() => {
        setImageTransition(id, false);
      }, 50);
    }, 200);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-center" />
      <div className="pt-24 px-4 sm:px-8">
        <PropertySearchHeader sortOptions={sortOptions} />

        <div className="max-w-7xl pt-6 sm:pt-10 mx-auto">
          {/* Results summary */}
          {!loading && (
            <div className="mb-6 px-4 sm:px-0">
              <p className="text-sm sm:text-base text-gray-600">
                Showing {filteredAndSortedProperties.length} {filteredAndSortedProperties.length === 1 ? 'property' : 'properties'}
                {selectedLocation !== 'All' && ` in ${selectedLocation}`}
                {searchQuery && ` matching "${searchQuery}"`}
                {propertyType !== 'Property Type' && ` of type "${propertyType}"`}
                {bhkType !== 'BHK Type' && ` with ${bhkType}`}
                {tenantType !== 'Tenant Type' && ` for ${tenantType}`}
              </p>
            </div>
          )}

          {loading ? (
            // Skeleton loader
            <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 px-4 sm:px-0">
              {Array.from({ length: 6 }).map((_, index) => (
                <PropertySkeleton key={index} />
              ))}
            </div>
          ) : filteredAndSortedProperties.length === 0 ? (
            <div className="text-center py-16 px-4">
              <div className="bg-white rounded-3xl shadow-lg p-8 sm:p-12 max-w-md mx-auto">
                <Calendar className="w-12 h-12 text-purple-600 mx-auto mb-6" />
                <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">No Properties Found</h3>
                <p className="text-sm sm:text-base text-gray-500">Try changing your search or filters</p>
              </div>
            </div>
          ) : (
            <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 px-4 sm:px-0">
              {filteredAndSortedProperties.map((p) => {
                const imgs = getPropertyImages(p);
                const idx = currentImageIndex[p.id] ?? 0;
                const cur = imgs[idx];
                const trans = imageTransition[p.id];
                const fave = favorites.has(p.id);

                return (
                  <div
                    key={p.id}
                    className="bg-white rounded-3xl shadow-lg overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl group"
                  >
                    <div
                      className="relative h-48 sm:h-64 cursor-pointer"
                      onClick={() => router.push(`/properties/${p.id}`)}
                    >
                      <img
                        src={cur}
                        alt={`${p.title} image ${idx + 1}`}
                        className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 group-hover:scale-110 ${
                          trans ? 'opacity-0 scale-95' : 'opacity-100'
                        }`}
                        onError={(e) => {
                          e.currentTarget.src =
                            'https://via.placeholder.com/600x400?text=Image+Not+Found';
                        }}
                      />

                      <button
                        onClick={(e) => handleToggleFavorite(p.id, e)}
                        className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg hover:scale-110 transition"
                      >
                        <Heart
                          size={18}
                          className={
                            fave
                              ? 'fill-red-500 text-red-500'
                              : 'text-gray-600 hover:text-red-500'
                          }
                        />
                      </button>

                      {imgs.length > 1 && (
                        <>
                          <button
                            onClick={(e) => changeImage(p.id, 'prev', e)}
                            className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/90 p-2 rounded-full shadow hover:scale-110 opacity-0 group-hover:opacity-100 transition"
                          >
                            <ChevronLeft size={18} />
                          </button>
                          <button
                            onClick={(e) => changeImage(p.id, 'next', e)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/90 p-2 rounded-full shadow hover:scale-110 opacity-0 group-hover:opacity-100 transition"
                          >
                            <ChevronRight size={18} />
                          </button>
                        </>
                      )}
                    </div>

                    <div className="p-4 sm:p-6">
                      <h2 className="text-lg sm:text-xl font-bold mb-2 line-clamp-2">{p.title}</h2>
                      <div className="flex items-center text-gray-500 mb-4">
                        <MapPin size={14} className="mr-1 flex-shrink-0" />
                        <span className="text-sm truncate">{p.city}</span>
                      </div>
                      <div className="flex justify-between items-end mb-4">
                        <div>
                          <p className="text-xl sm:text-2xl font-bold text-emerald-600">
                            ₹{p.pricePerMonth?.toLocaleString() ?? 'N/A'}
                          </p>
                          <p className="text-xs sm:text-sm text-gray-500">per month</p>
                        </div>
                        {imgs.length > 1 && (
                          <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded-full">
                            {idx + 1}/{imgs.length}
                          </span>
                        )}
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          router.push(`/properties/${p.id}`);
                        }}
                        className="w-full bg-purple-600 text-white py-2.5 sm:py-3 rounded-2xl font-semibold hover:bg-purple-700 transition flex items-center justify-center gap-2 text-sm sm:text-base"
                      >
                        <Eye size={16} />
                        View Details
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;