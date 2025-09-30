'use client';


import HeroSection from '@/components/HeroComponent/HeroSection';
import OurStory from '@/components/HeroComponent/OurStory';
import Slider from '@/components/HeroComponent/Slider';
import FeaturedProperties from '@/components/HeroComponent/Featured';
import ServicesSection from '@/components/HeroComponent/Services';
import TestimonialsSection from '@/components/HeroComponent/Testimonial';
import BecomeAgentSection from '@/components/HeroComponent/Agent';

export default function Home() {

  return (
    <div>
        

      <HeroSection /> 
      <OurStory />
      <Slider />
      <ServicesSection/>
      <TestimonialsSection/>  
      <BecomeAgentSection/>
    </div>
  );
}
