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
      name: "CALIFORNIA, USA",
      properties: 60,
      image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    },
    {
      name: "NEW YORK, USA",
      properties: 60,
      image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    },
    {
      name: "SANGHAI, CHAINA",
      properties: 60,
      image: "https://images.unsplash.com/photo-1474181487882-5abf3f0ba6c2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    },
    {
      name: "BURSA, TÜRKIYE",
      properties: 60,
      image: "https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    },
    {
      name: "TOKYO, JAPAN",
      properties: 45,
      image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    },
    {
      name: "LONDON, UK",
      properties: 72,
      image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    }
  ];

  const itemsPerSlide = 4;
  const totalSlides = Math.ceil(cities.length / itemsPerSlide);

  const slides = Array.from({ length: totalSlides }, (_, index) =>
    cities.slice(index * itemsPerSlide, (index + 1) * itemsPerSlide)
  );

  const nextSlide = (): void => {
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      setCurrentSlide((prev) => (prev + 1) % cities.length);
    } else {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }
  };

  const prevSlide = (): void => {
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      setCurrentSlide((prev) => (prev - 1 + cities.length) % cities.length);
    } else {
      setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
    }
  };

  const goToSlide = (index: number): void => {
    setCurrentSlide(index);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-12 bg-gray-50">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="text-red-500 text-sm font-medium tracking-wide mb-2">// EXPLORE CITIES</p>
          <h2 className="text-4xl font-bold text-gray-900 leading-tight">
            TAKE A STROLL AROUND<br />SURROUNDINGS.
          </h2>
        </div>

        {/* Navigation */}
        <div className="flex gap-2">
          <button onClick={prevSlide} className="p-3 rounded-full border border-gray-300 hover:bg-gray-100 transition-colors" aria-label="Previous slide">
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>
          <button onClick={nextSlide} className="p-3 rounded-full border border-gray-300 hover:bg-gray-100 transition-colors" aria-label="Next slide">
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Carousel */}
      <div className="relative overflow-hidden">
        {/* Desktop View */}
        <div className="hidden md:block">
          <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
            {slides.map((group, slideIndex) => (
              <div key={slideIndex} className="w-full flex-shrink-0">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
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

        {/* Mobile View */}
        <div className="md:hidden overflow-hidden">
          <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
            {cities.map((city) => (
              <div key={city.name} className="relative group cursor-pointer rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex-shrink-0 w-full px-2">
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

      {/* Pagination Dots */}
      <div className="flex justify-center mt-8 gap-2">
        {/* Desktop */}
        <div className="hidden md:flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors duration-200 ${index === currentSlide ? 'bg-red-500' : 'bg-gray-300 hover:bg-gray-400'}`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Mobile */}
        <div className="md:hidden flex gap-2">
          {cities.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors duration-200 ${index === currentSlide ? 'bg-red-500' : 'bg-gray-300 hover:bg-gray-400'}`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slider;
