import React, { useState } from 'react';
import { Heart, Bed, Bath, Square } from 'lucide-react';
import Image, { type StaticImageData } from 'next/image';

import prop1 from '@/assets/images/prop-1.png';
import prop2 from '@/assets/images/prop-2.png';
import prop3 from '@/assets/images/prop-3.png';
import prop4 from '@/assets/images/prop-4.png';
import prop5 from '@/assets/images/prop-5.png';
import prop6 from '@/assets/images/prop-6.png';

interface Property {
  id: number;
  title: string;
  price: number;
  location: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  image: StaticImageData;
  type: 'Sell' | 'Buy';
  tag?: string;
}

const properties: Property[] = [
  {
    id: 1,
    title: "Modern Apartment",
    price: 150000,
    location: "California",
    bedrooms: 2,
    bathrooms: 1,
    area: 85,
    image: prop1, // Using imported prop1
    type: "Sell",
    tag: "Sell"
  },
  {
    id: 2,
    title: "City Apartment",
    price: 180000,
    location: "Texas",
    bedrooms: 3,
    bathrooms: 2,
    area: 110,
    image: prop2, // Using imported prop2
    type: "Buy",
    tag: "Buy"
  },
  {
    id: 3,
    title: "Luxury Apartment",
    price: 220000,
    location: "New York",
    bedrooms: 4,
    bathrooms: 3,
    area: 140,
    image: prop3, // Using imported prop3
    type: "Buy",
    tag: "Buy"
  },
   {
    id: 4,
    title: "Mithya Villa",
    price: 200000,
    location: "Florida",
    bedrooms: 3,
    bathrooms: 2,
    area: 190,
    image: prop4, // <-- fixed
    type: "Buy",
    tag: "Buy"
  },
  {
    id: 5,
    title: "Palm Villa",
    price: 250000,
    location: "Florida",
    bedrooms: 4,
    bathrooms: 3,
    area: 210,
    image: prop5,
    type: "Sell",
    tag: "Sell"
  },
  {
    id: 6,
    title: "Sunset Villa",
    price: 275000,
    location: "California",
    bedrooms: 5,
    bathrooms: 4,
    area: 250,
    image: prop6,
    type: "Buy",
    tag: "Buy"
  }
];

export default function PropertyListingsSection() {
  const [activeFilter, setActiveFilter] = useState<'All' | 'Sell' | 'Buy'>('All');
  const [favoriteProperties, setFavoriteProperties] = useState<Set<number>>(new Set());

  const filteredProperties = activeFilter === 'All'
    ? properties
    : properties.filter(property => property.type === activeFilter);

  const toggleFavorite = (propertyId: number) => {
    setFavoriteProperties(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(propertyId)) {
        newFavorites.delete(propertyId);
      } else {
        newFavorites.add(propertyId);
      }
      return newFavorites;
    });
  };

  const formatPrice = (price: number) => {
    return `$${price.toLocaleString()}`;
  };

  return (
    <div className="py-16 lg:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-12">
          <div className="mb-6 lg:mb-0">
            <div className="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-2">
              CHECKOUT OUR NEW
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
              Latest Listed Properties
            </h2>
            <p className="text-gray-600 mt-2 max-w-md">
              Donec porttitor euismod dignissim. Nullam a lacinia ipsum, nec dignissim purus.
            </p>
          </div>

          {/* Filter Buttons */}
          <div className="flex gap-2">
            {(['All', 'Sell', 'Buy'] as const).map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                  activeFilter === filter
                    ? 'bg-gray-900 text-white shadow-lg'
                    : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Property Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProperties.map((property) => (
            <div
              key={property.id}
              className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group"
            >
              {/* Property Image */}
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={property.image}
                  alt={property.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  placeholder="blur"
                />

                {/* Property Tag */}
                {property.tag && (
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      property.tag === 'Sell'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {property.tag}
                    </span>
                  </div>
                )}

                {/* Heart Icon */}
                <button
                  onClick={() => toggleFavorite(property.id)}
                  className="absolute top-4 right-4 p-2 bg-white/80 hover:bg-white rounded-full transition-all duration-200 group/heart"
                >
                  <Heart
                    className={`w-4 h-4 transition-colors duration-200 ${
                      favoriteProperties.has(property.id)
                        ? 'fill-red-500 text-red-500'
                        : 'text-gray-600 group-hover/heart:text-red-500'
                    }`}
                  />
                </button>
              </div>

              {/* Property Details */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-1">
                      {property.title}
                    </h3>
                    <p className="text-blue-600 font-medium">
                      {property.location}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-900">
                      {formatPrice(property.price)}
                    </div>
                  </div>
                </div>

                {/* Property Features */}
                <div className="flex items-center gap-6 text-gray-600">
                  <div className="flex items-center gap-2">
                    <Bed className="w-4 h-4" />
                    <span className="text-sm">{property.bedrooms}</span>
                    <span className="text-xs text-gray-500">Bedroom</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Bath className="w-4 h-4" />
                    <span className="text-sm">{property.bathrooms}</span>
                    <span className="text-xs text-gray-500">Bathroom</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Square className="w-4 h-4" />
                    <span className="text-sm">{property.area}m²</span>
                    <span className="text-xs text-gray-500">Living Area</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}