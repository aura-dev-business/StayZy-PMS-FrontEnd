import React from "react";
import Image from "next/image";
import { Users, Handshake, MapPin } from "lucide-react";
import GsapScrollAnimation from "../common/GsapScrollAnimation";

export default function WhoAreWeSection() {
  return (
    <GsapScrollAnimation>
      <section className="py-20 bg-transparent max-w-7xl px-4 md:px-6 lg:px-8 mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-start lg:items-center">
          {/* Left side - Enhanced Image with modern overlay */}
          <div className="relative group order-2 lg:order-1">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="/images/Building.jpg"
                alt="Modern luxury real estate development"
                width={600}
                height={600}
                className="w-full h-[400px] md:h-[500px] lg:h-[600px] object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Gradient overlay for better text visibility */}
              <div className="absolute inset-0 via-transparent to-transparent"></div>

              {/* Floating achievement card */}
              <div className="absolute bottom-6 right-6 bg-white/95 backdrop-blur-sm rounded-2xl p-4 md:p-6 shadow-xl border border-white/20">
                <div className="flex items-center gap-3">
                  <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">
                    30<span className="text-2xl md:text-3xl">+</span>
                  </div>
                  <div>
                    <div className="text-gray-800 font-semibold text-xs md:text-sm">
                      Years of Excellence
                    </div>
                    <div className="text-gray-600 text-xs">
                      Connecting rooms & people
                    </div>
                  </div>
                </div>
              </div>
              {/* Decorative elements */}
              <div className="absolute top-8 right-8 w-16 h-16 border-2 border-red-500/30 rounded-full animate-pulse"></div>
              <div className="absolute top-12 right-24 w-2 h-2 bg-red-500 rounded-full animate-bounce"></div>
            </div>
          </div>

          {/* Right side - Enhanced Content */}
          <div className="order-1 lg:order-2">
            {/* Header with improved typography */}
            <div>
              <div className="inline-flex items-center gap-2 text-red-500 text-sm font-semibold tracking-wider uppercase">
                <div className="w-8 h-0.5 bg-red-500"></div>
                Our Story
              </div>
              <h2
                style={{ fontFamily: "Nulshock RG" }}
                className="text-3xl md:text-4xl lg:text-4xl font-bold text-white leading-tight"
              >
                Your Trusted Room &
                <span className="block text-red-500">Property Partner</span>
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                StayZy simplifies your property journey - whether you're searching
                for the perfect room, selling your property, or exploring rental
                opportunities. We connect you with the right spaces and the right
                people.
              </p>
            </div>

            {/* Enhanced Features with better spacing */}
            <div className="space-y-6 mt-8">
              {/* Client Centric Approach */}
              <div className="group flex items-start gap-4 p-4 rounded-2xl hover:bg-gray-50 transition-all duration-300">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2 group-hover:text-red-600 transition-colors">
                    Room Finding Made Easy
                  </h3>
                  <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                    From cozy single rooms to spacious shared apartments, we help
                    you discover the perfect living space that fits your budget,
                    location preferences, and lifestyle needs.
                  </p>
                </div>
              </div>

              {/* Integrity & Transparency */}
              <div className="group flex items-start gap-4 p-4 rounded-2xl hover:bg-gray-50 transition-all duration-300">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2 group-hover:text-red-600 transition-colors">
                    Fast Property Sales
                  </h3>
                  <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                    Ready to sell? Our expert team handles everything from
                    property valuation to finding serious buyers, ensuring you get
                    the best price in the shortest time.
                  </p>
                </div>
              </div>

              {/* Market Expertise */}
              <div className="group flex items-start gap-4 p-4 rounded-2xl hover:bg-gray-50 transition-all duration-300">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
                  <Handshake className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2 group-hover:text-red-600 transition-colors">
                    24/7 Support & Guidance
                  </h3>
                  <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                    Our dedicated team is always available to assist you. From
                    initial consultation to final handover, we provide continuous
                    support throughout your property journey.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </GsapScrollAnimation>
  );
}