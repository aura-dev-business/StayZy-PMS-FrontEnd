'use client';

import React from 'react';
import { Search, Home } from 'lucide-react';

export default function AboutPage() {
  return (
    <section className="bg-gradient-to-b from-amber-50 to-amber-100 py-16 px-4 ">
      <div className="max-w-6xl mx-auto min-h-screen">
        {/* Header */}
        <div className="text-center min-h-screen">
          <h2 className="text-4xl font-bold text-teal-800  mt-10 mb-8">About Us</h2>

          {/* Illustration */}
          <div className="mb-12 flex justify-center">
            <div className="relative w-96 h-64 bg-white rounded-lg shadow-lg p-8 border-2 border-gray-200">
              {/* Room illustration */}
              <div className="absolute inset-4">
                {/* Floor */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-300"></div>

                {/* Couch */}
                <div className="absolute bottom-1 left-4 w-16 h-8 bg-teal-600 rounded-t-lg"></div>
                <div className="absolute bottom-1 left-2 w-2 h-6 bg-teal-700 rounded"></div>
                <div className="absolute bottom-1 right-16 w-2 h-6 bg-teal-700 rounded"></div>

                {/* Person on couch */}
                <div className="absolute bottom-9 left-8 w-3 h-6 bg-blue-400 rounded-full"></div>
                <div className="absolute bottom-12 left-8 w-3 h-3 bg-amber-200 rounded-full"></div>

                {/* TV */}
                <div className="absolute bottom-8 right-4 w-12 h-8 bg-gray-800 rounded border-2 border-gray-600"></div>
                <div className="absolute bottom-6 right-6 w-8 h-4 bg-blue-200 rounded"></div>

                {/* Plant */}
                <div className="absolute bottom-1 left-20 w-1 h-4 bg-green-600"></div>
                <div className="absolute bottom-5 left-20 w-3 h-2 bg-green-400 rounded-full"></div>

                {/* Window */}
                <div className="absolute top-4 right-8 w-12 h-16 bg-blue-100 border-2 border-gray-400 rounded">
                  <div className="absolute inset-1 border border-gray-300"></div>
                  <div className="absolute top-1/2 left-0 right-0 h-px bg-gray-300"></div>
                  <div className="absolute top-0 bottom-0 left-1/2 w-px bg-gray-300"></div>
                </div>

                {/* Door */}
                <div className="absolute top-4 left-12 w-8 h-20 bg-amber-200 border-2 border-gray-400 rounded-t-lg">
                  <div className="absolute right-1 top-8 w-1 h-1 bg-gray-600 rounded-full"></div>
                </div>

                {/* Picture frame */}
                <div className="absolute top-8 left-24 w-6 h-4 bg-white border border-gray-400">
                  <div className="absolute inset-1 bg-blue-200"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Main description */}
          <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-16 leading-relaxed italic">
            At Stayzy, we simplify the way people connect with properties. Whether you're
            searching for your next rental home, planning to own a property, or managing multiple
            listings, Stayzy makes the process effortless and transparent.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* For Tenants and Buyers */}
          <div className="bg-teal-800 text-white p-8 rounded-lg shadow-lg">
            <div className="flex items-center justify-center mb-6">
              <div className="bg-white p-3 rounded-full">
                <Search className="w-8 h-8 text-teal-800" />
              </div>
            </div>
            <p className="text-center leading-relaxed">
              <span className="font-semibold">For tenants and buyers,</span> Stayzy offers a
              seamless platform to explore a wide range of rental properties and
              ownership opportunities. Our intuitive search and wishlist features ensure you
              find a space that truly fits your lifestyle.
            </p>
          </div>

          {/* For Property Owners */}
          <div className="bg-teal-800 text-white p-8 rounded-lg shadow-lg">
            <div className="flex items-center justify-center mb-6">
              <div className="bg-white p-3 rounded-full">
                <Home className="w-8 h-8 text-teal-800" />
              </div>
            </div>
            <p className="text-center leading-relaxed">
              <span className="font-semibold">For property owners,</span> Stayzy provides
              powerful management tools to list, track, and maintain properties with ease. From
              tenant interactions to performance insights, we empower owners to stay in
              control and maximize their returns.
            </p>
          </div>
        </div>

        {/* Bottom statement */}
        <div className="text-center">
          <p className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed italic">
            With a focus on convenience, trust, and innovation, Stayzy bridges the gap between
            property seekers and owners—bringing simplicity to real estate management.
          </p>
        </div>
      </div>
    </section>
  );
}
<<<<<<< Updated upstream

=======
>>>>>>> Stashed changes
