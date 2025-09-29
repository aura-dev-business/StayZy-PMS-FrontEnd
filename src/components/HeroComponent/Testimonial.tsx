import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

interface Testimonial {
  id: number;
  content: string;
  author: string;
  avatar: string;
  rating: number;
}

const TestimonialsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const testimonials: Testimonial[] = [
    {
      id: 1,
      content: "I highly recommend Jodi J. Appleby. She was attentive to our needs and worked tirelessly to find us the perfect home. We couldn't be happier with our new place!",
      author: "Barbara D. Smith",
      avatar: "/api/placeholder/40/40",
      rating: 4
    },
    {
      id: 2,
      content: "Exceptional service from start to finish. The team was professional, knowledgeable, and made the entire home buying process smooth and stress-free.",
      author: "John M. Wilson",
      avatar: "/api/placeholder/40/40",
      rating: 5
    },
    {
      id: 3,
      content: "Outstanding experience! They helped us find our dream home within our budget and timeline. Highly professional and responsive throughout the process.",
      author: "Sarah K. Johnson",
      avatar: "/api/placeholder/40/40",
      rating: 5
    }
  ];

  const nextTestimonial = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
      setIsTransitioning(false);
    }, 150);
  };

  const prevTestimonial = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
      setIsTransitioning(false);
    }, 150);
  };

  const goToTestimonial = (index: number) => {
    if (isTransitioning || index === currentIndex) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex(index);
      setIsTransitioning(false);
    }, 150);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 transition-all duration-300 ease-in-out ${
          index < rating ? 'fill-yellow-400 text-yellow-400 scale-110' : 'text-gray-300'
        }`}
      />
    ));
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Header and Navigation */}
          <div>
            <p className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4">
              TESTIMONIALS
            </p>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Look What Our<br />
              Customers Say!
            </h2>
            <p className="text-gray-600 mb-8">
              Fusce venenatis tellus a felis scelerisque, non<br />
              pulvinar est pellentesque.
            </p>
            
            {/* Navigation Buttons */}
            <div className="flex gap-4">
              <button
                onClick={prevTestimonial}
                disabled={isTransitioning}
                className="flex items-center justify-center w-12 h-12 border-2 border-gray-300 rounded-full hover:border-gray-400 hover:scale-105 transition-all duration-300 ease-in-out transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-5 h-5 text-gray-600 transition-transform duration-200" />
              </button>
              <button
                onClick={nextTestimonial}
                disabled={isTransitioning}
                className="flex items-center justify-center w-12 h-12 border-2 border-gray-300 rounded-full hover:border-gray-400 hover:scale-105 transition-all duration-300 ease-in-out transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-5 h-5 text-gray-600 transition-transform duration-200" />
              </button>
            </div>
          </div>

          {/* Right Column - Testimonial Card */}
          <div className="relative">
            <div className="bg-white rounded-lg shadow-md p-8 relative overflow-hidden">
          
              
              {/* Testimonial Content */}
              <div className={`pt-4 transition-all duration-300 ease-in-out ${
                isTransitioning ? 'opacity-0 transform translate-y-4' : 'opacity-100 transform translate-y-0'
              }`}>
                <p className="text-gray-700 text-lg leading-relaxed mb-6">
                  {currentTestimonial.content}
                </p>
                
                {/* Author Info */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-300 rounded-full overflow-hidden">
                      <img
                        src={currentTestimonial.avatar}
                        alt={currentTestimonial.author}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="font-semibold text-gray-900">
                      {currentTestimonial.author}
                    </span>
                  </div>
                  
                  {/* Star Rating */}
                  <div className="flex gap-1">
                    {renderStars(currentTestimonial.rating)}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Dots Indicator */}
            <div className="flex justify-center mt-6 gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToTestimonial(index)}
                  disabled={isTransitioning}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ease-in-out transform hover:scale-125 disabled:cursor-not-allowed ${
                    index === currentIndex ? 'bg-gray-800 scale-110' : 'bg-gray-300'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;