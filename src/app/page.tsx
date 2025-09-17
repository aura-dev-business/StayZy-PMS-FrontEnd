'use client';


import HeroSection from '@/components/HeroComponent/HeroSection';
import OurStory from '@/components/HeroComponent/OurStory';
import Slider from '@/components/HeroComponent/Slider';
import FeaturedProperties from '@/components/HeroComponent/Featured';

export default function Home() {

  return (
    <div>
        

      <HeroSection /> 
      <OurStory />
      <Slider />
      <FeaturedProperties />
    </div>
  );
}
