import React from 'react';
import agent from '/public/images/agent.png';
import Image from 'next/image';

const BecomeAgentSection: React.FC = () => {
  const handleRegisterClick = () => {
    // Handle registration logic here
    console.log('Register Now clicked');
  };

  return (
    <section className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-gradient-to-r from-teal-800 to-teal-900 rounded-2xl overflow-hidden">
          <div className="flex flex-col lg:flex-row items-center">
            {/* Left Side - Agent Image */}
            <div className="lg:w-1/3 w-full">
              <div className="relative">
                <Image
                  src={agent}
                  alt="Professional real estate agent"
                  className="w-full h-64 lg:h-80 object-cover object-center"
                />
                {/* Optional overlay for better image integration */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-teal-800/20"></div>
              </div>
            </div>
            
            {/* Right Side - Content */}
            <div className="lg:w-2/3 w-full px-8 lg:px-12 py-8 lg:py-12">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                {/* Text Content */}
                <div className="text-center lg:text-left">
                  <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                    Become a Agent.
                  </h2>
                  <p className="text-teal-100 text-lg leading-relaxed max-w-md">
                    Fusce venenatis tellus a felis scelerisque, 
                    venenatis tellus a felis scelerisque.
                  </p>
                </div>
                
                {/* CTA Button */}
                <div className="flex justify-center lg:justify-end">
                  <button
                    onClick={handleRegisterClick}
                    className="bg-white text-teal-800 font-semibold px-8 py-3 rounded-full hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
                  >
                    Register Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BecomeAgentSection;