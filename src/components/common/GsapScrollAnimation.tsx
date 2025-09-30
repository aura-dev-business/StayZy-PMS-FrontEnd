'use client';

import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Props {
  children: React.ReactNode;
  y?: number;
  duration?: number;
  delay?: number;
  ease?: string;
}

export default function GsapScrollAnimation({
  children,
  y = 50,
  duration = 1,
  delay = 0.2,
  ease = 'power3.out',
}: Props) {
  const ref = useRef(null);

  useLayoutEffect(() => {
    const el = ref.current;
    gsap.fromTo(
      el,
      { opacity: 0, y },
      {
        opacity: 1,
        y: 0,
        duration,
        delay,
        ease,
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      }
    );
  }, []);

  return (
    <div ref={ref} className="w-full">
      {children}
    </div>
  );
}
