'use client';

import Image from 'next/image';
import { MapPin, Bed, Bath, Square } from 'lucide-react';

const FeaturedProperties = () => {
  const properties = [
    {
      id: '1a1a1a1a-1111-2222-3333-444444444444',
      image: '/images/property-1.jpg',
      badge: 'Featured',
      badgeColor: 'bg-red-500',
      location: 'Kammanahalli, Bangalore',
      title: 'SUPER DELUXE BED ROOM NEAR SEA BEECH',
      beds: 4,
      bathrooms: 2,
      area: '6x8 m²',
      price: 2400,
    },
    {
      id: '2b2b2b2b-1111-2222-3333-444444444444',
      image: '/images/property-2.jpg',
      badge: '20% off',
      badgeColor: 'bg-blue-500',
      location: 'Electronic City , Bangalore',
      title: 'SUPER DELUXE BED ROOM NEAR SEA BEECH',
      beds: 4,
      bathrooms: 2,
      area: '6x8 m²',
      price: 2400,
    },
    {
      id: '3c3c3c3c-1111-2222-3333-444444444444',
      image: '/images/property-3.jpg',
      badge: 'Featured',
      badgeColor: 'bg-red-500',
      location: 'Madiwala,Bangalore',
      title: 'SUPER DELUXE BED ROOM NEAR SEA BEECH',
      beds: 4,
      bathrooms: 2,
      area: '6x8 m²',
      price: 2400,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-16 bg-gray-50">
      <div className="text-center mb-12">
        <p style={{ fontFamily : 'Nulshock RG'}} className="text-red-500 text-sm font-medium mb-2 tracking-wider">
          // LATEST PROPERTIES
        </p>
        <h2  style={{ fontFamily : 'Nulshock RG'}} className="text-4xl font-bold text-gray-900 mb-4">
          EXPLORE FEATURED
          <br />
          PROPERTIES
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {properties.map((property) => (
          <div
            key={property.id}
            className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group"
          >
            <div className="relative h-64 overflow-hidden">
              <Image
                src={property.image}
                alt={property.title}
                fill
                sizes="(max-width: 768px) 100vw, 
                       (max-width: 1200px) 50vw, 
                       33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div
                className={`absolute top-4 left-4 ${property.badgeColor} text-white px-3 py-1 rounded-full text-sm font-medium`}
              >
                {property.badge}
              </div>
            </div>

            <div className="p-6">
              <div className="flex items-center text-red-500 text-sm mb-3">
                <MapPin className="w-4 h-4 mr-1" />
                <span>{property.location}</span>
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-4 leading-tight">
                {property.title}
              </h3>

              <div className="flex items-center justify-between mb-6 text-gray-600">
                <div className="flex items-center">
                  <Bed className="w-4 h-4 text-red-500 mr-1" />
                  <span className="text-sm">{property.beds} Beds</span>
                </div>
                <div className="flex items-center">
                  <Bath className="w-4 h-4 text-red-500 mr-1" />
                  <span className="text-sm">{property.bathrooms} Bathrooms</span>
                </div>
                <div className="flex items-center">
                  <Square className="w-4 h-4 text-red-500 mr-1" />
                  <span className="text-sm">{property.area}</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <span className="text-2xl font-bold text-gray-900">
                    ${property.price.toLocaleString()}
                  </span>
                  <span className="text-gray-500 text-sm ml-1">/month</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center">
        <button className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-full font-medium transition-colors duration-300 shadow-lg hover:shadow-xl">
          Explore More
        </button>
      </div>
    </div>
  );
};

export default FeaturedProperties;
