'use client';

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface City {
  name: string;
  properties: number;
  image: string;
}

const Slider: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  const cities: City[] = [
    {
      name: "ELECTRONIC CITY",
      properties: 60,
      image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    },
    {
      name: "KAMMANAHALLI",
      properties: 60,
      image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    },
    {
      name: "BTM LAYOUT",
      properties: 60,
      image: "https://images.unsplash.com/photo-1474181487882-5abf3f0ba6c2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    },
    {
      name: "INDIRA NAGAR",
      properties: 60,
      image: "https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    },
    {
      name: "HEGDE NAGAR",
      properties: 45,
      image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    },
    {
      name: "LONDON, UK",
      properties: 72,
      image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    },
    {
      name: "KERALA, INDIA",
      properties: 60,
      image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    },
    {
      name: "ELECTRONIC CITY BANGALORE",
      properties: 60,
      image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    }
  ];

  const itemsPerSlide = 4;
  const totalSlides = Math.ceil(cities.length / itemsPerSlide);

  const slides = Array.from({ length: totalSlides }, (_, index) =>
    cities.slice(index * itemsPerSlide, (index + 1) * itemsPerSlide)
  );

  const nextSlide = (): void => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = (): void => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-12  ">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
        <div>
          <p style={{ fontFamily : 'Nulshock RG'}} className="text-red-500 text-sm font-medium tracking-wide mb-2">// RECOMMENDED PROPERTIES</p>
          <h2 style={{ fontFamily : 'Nulshock RG'}} className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">
            TAKE A LOOK AROUND<br />RECOMMENDED PROPERTIES.
          </h2>
        </div>

        {/* Navigation Buttons */}
        <div className="hidden sm:flex gap-2 self-end">
          <button onClick={prevSlide} className="p-3 rounded-full border border-gray-300 hover:bg-gray-100 transition-colors" aria-label="Previous slide">
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>
          <button onClick={nextSlide} className="p-3 rounded-full border border-gray-300 hover:bg-gray-100 transition-colors" aria-label="Next slide">
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Desktop & Tablet Carousel */}
      <div className="relative overflow-hidden hidden sm:block">
        <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
          {slides.map((group, slideIndex) => (
            <div key={slideIndex} className="w-full flex-shrink-0">
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {group.map((city) => (
                  <div key={city.name} className="relative group cursor-pointer rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                    <div className="aspect-[4/5] relative">
                      <img src={city.image} alt={city.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                      <div className="absolute top-4 left-4">
                        <span className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium">
                          {city.properties} Properties
                        </span>
                      </div>
                      <div className="absolute bottom-6 left-4 right-4">
                        <h3 className="text-white text-xl font-bold tracking-wide">{city.name}</h3>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile View (Scroll Snap) */}
      <div className="sm:hidden overflow-x-auto scrollbar-hide -mx-2 px-2 scroll-smooth snap-x snap-mandatory mt-6">
        <div className="flex gap-4">
          {cities.map((city, index) => (
            <div
              key={city.name}
              className={`relative group cursor-pointer rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex-shrink-0 w-[85%] snap-start ${
                index === 0 ? 'ml-5' : ''
              }`}
            >
              <div className="aspect-[4/5] relative">
                <img src={city.image} alt={city.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute top-4 left-4">
                  <span className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium">
                    {city.properties} Properties
                  </span>
                </div>
                <div className="absolute bottom-6 left-4 right-4">
                  <h3 className="text-white text-lg font-bold tracking-wide">{city.name}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slider;
