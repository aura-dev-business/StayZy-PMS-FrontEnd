import React from 'react';
import { Home, Users } from 'lucide-react';
import Image from 'next/image';
import Property1 from '/public/images/property-2.jpg';
import Property2 from '/public/images/property-3.jpg';
import Property3 from '/public/images/property-1.jpg';

export default function WhoAreWeSection() {
  return (
    <div className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left Content */}
          <div className="space-y-8">
            {/* Section Header */}
            <div className="space-y-6">
              <div className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                WHO ARE WE
              </div>
              
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                Assisting individuals in locating the appropriate homes.
              </h2>
              
              <p className="text-gray-600 text-lg leading-relaxed max-w-lg">
                StayZy simplifies your property journey - whether you're searching for the perfect room, selling your property, or exploring rental opportunities. We connect you with the right spaces and the right people.
              </p>
            </div>

            {/* Features List */}
            <div className="space-y-6">
              {/* Feature 1 */}
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                  <Home className="w-6 h-6 text-gray-700" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-gray-900">
                    Donec porttitor euismod
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Nullam a lacinia ipsum, nec dignissim purus. Nulla
                  </p>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-gray-700" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-gray-900">
                    Donec porttitor euismod
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Nullam a lacinia ipsum, nec dignissim purus. Nulla
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Images Grid */}
          <div className="relative h-[400px] lg:h-[500px] flex gap-4">
            {/* Main Large Image - Villa with Pool (Left side) */}
            <div className="flex-1 max-w-[300px]">
              <div className="rounded-3xl overflow-hidden shadow-lg h-full">
                <Image
                  src={Property3}
                  alt="Modern villa with pool"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Right side - Two stacked images */}
            <div className="flex flex-col gap-4 w-[200px] lg:w-[240px]">
              {/* Top Right Image - Bedroom */}
              <div className="flex-1">
                <div className="rounded-2xl overflow-hidden shadow-lg h-full">
                  <Image  
                    src={Property1} 
                    alt="Cozy bedroom interior"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Bottom Right Image - Living Room */}
              <div className="flex-1">
                <div className="rounded-2xl overflow-hidden shadow-lg h-full">
                  <Image
                    src={Property2}
                    alt="Modern living room"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}