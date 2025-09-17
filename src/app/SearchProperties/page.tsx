'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Toaster, toast } from 'sonner';
import { Calendar, Search, SlidersHorizontal, ChevronDown } from 'lucide-react';

interface Property {
  id: string;
  title: string;
  city: string;
  pricePerMonth: number;
  images?: string[];
  image?: string;
  imageUrl?: string;
}

const getPropertyImages = (p: Property): string[] => {
  if (p.images?.length) return p.images;
  if (p.image) return [p.image];
  if (p.imageUrl) return [p.imageUrl];
  return ['https://via.placeholder.com/600x400?text=No+Image'];
};

export default function SearchPropertiesPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  const [city, setCity] = useState(searchParams.get('city') ?? '');
  const [propertyType, setPropertyType] = useState(searchParams.get('propertyType') ?? '');
  const [minPrice, setMinPrice] = useState(searchParams.get('minPrice') ?? '0');
  const [maxPrice, setMaxPrice] = useState(searchParams.get('maxPrice') ?? '10000000');
  const [searchQuery, setSearchQuery] = useState('');

  const availableCities = ['Kochi', 'Bangalore', 'Chennai', 'Delhi']; // Replace with dynamic if needed
  const propertyTypes = ['Apartment', 'Villa', 'Studio']; // Replace with dynamic if needed

  const updateFilters = () => {
    const query = new URLSearchParams({
      city,
      propertyType,
      minPrice,
      maxPrice,
    });

    router.push(`/search?${query.toString()}`);
  };

  useEffect(() => {
    const fetchFilteredProperties = async () => {
      try {
        const query = new URLSearchParams({
          city,
          propertyType,
          minPrice,
          maxPrice,
        }).toString();

        const res = await fetch(`http://localhost:8081/api/properties/search?${query}`);
        if (!res.ok) throw new Error('Failed to fetch');
        const data = await res.json();
        setProperties(data);
      } catch (err) {
        toast.error('Failed to fetch filtered properties');
        console.error(err);
        setProperties([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFilteredProperties();
  }, [city, propertyType, minPrice, maxPrice]);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p className="text-gray-500">Loading filtered properties...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 pt-24 px-4 sm:px-8">
      <Toaster position="top-center" />
      <div className="max-w-7xl mx-auto">

        {/* Search & Filter Bar */}
        <div className="bg-white p-4 rounded-xl shadow-sm mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">

            {/* City Filter */}
            <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Cities</option>
              {availableCities.map((c, i) => (
                <option key={i} value={c}>{c}</option>
              ))}
            </select>

            {/* Property Type Filter */}
            <select
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value)}
              className="px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Types</option>
              {propertyTypes.map((type, i) => (
                <option key={i} value={type}>{type}</option>
              ))}
            </select>

            {/* Price Range Filter */}
            <div className="flex space-x-2">
              <input
                type="number"
                placeholder="Min ₹"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm"
              />
              <input
                type="number"
                placeholder="Max ₹"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm"
              />
            </div>

            {/* Apply Button */}
            <button
              onClick={updateFilters}
              className="w-full bg-purple-600 text-white py-2.5 rounded-lg font-semibold hover:bg-purple-700 transition"
            >
              Apply Filters
            </button>
          </div>
        </div>

        <h1 className="text-3xl font-bold mb-6">Search Results</h1>

        {properties.length === 0 ? (
          <div className="text-center py-16">
            <div className="bg-white rounded-3xl shadow-lg p-12 max-w-md mx-auto">
              <Calendar className="w-12 h-12 text-purple-600 mx-auto mb-6" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">No Properties Found</h3>
              <p className="text-gray-500">Try changing your search or filters</p>
            </div>
          </div>
        ) : (
          <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {properties.map((p) => {
              const imgs = getPropertyImages(p);
              return (
                <div
                  key={p.id}
                  onClick={() => router.push(`/properties/${p.id}`)}
                  className="cursor-pointer bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition"
                >
                  <img
                    src={imgs[0]}
                    alt={p.title}
                    className="w-full h-48 object-cover"
                    onError={(e) => {
                      e.currentTarget.src = 'https://via.placeholder.com/600x400?text=No+Image';
                    }}
                  />
                  <div className="p-4">
                    <h2 className="text-lg font-semibold">{p.title}</h2>
                    <p className="text-sm text-gray-500">{p.city}</p>
                    <p className="text-green-600 font-bold mt-2">
                      ₹{p.pricePerMonth.toLocaleString()} / month
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
