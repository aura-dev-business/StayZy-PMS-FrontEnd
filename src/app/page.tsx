'use client';

import HeroSection from '@/components/HeroComponent/HeroSection';
import OurStory from '@/components/HeroComponent/OurStory';
import PropertyListingsSection from '@/components/HeroComponent/Slider';
import ServicesSection from '@/components/HeroComponent/Services';
import TestimonialsSection from '@/components/HeroComponent/Testimonial';
import BecomeAgentSection from '@/components/HeroComponent/Agent';

export default function Home() {
  return (
    <div>
      <HeroSection />
      <OurStory />
      <PropertyListingsSection />
      <ServicesSection />
      <TestimonialsSection />
      <BecomeAgentSection />
    </div>
  );
}
