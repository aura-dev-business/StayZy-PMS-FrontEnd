"use client";

import HeroSection from "@/components/HeroComponent/HeroSection";
import OurStory from "@/components/HeroComponent/OurStory";
import Slider from "@/components/HeroComponent/Slider";
import Services from "@/components/HeroComponent/Services";
import Testimonial from "@/components/HeroComponent/Testimonial";
import Agent from "@/components/HeroComponent/Agent";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <OurStory />
      <Slider />
      <Services />
      <Testimonial />
      <Agent />
    </div>
  );
}
