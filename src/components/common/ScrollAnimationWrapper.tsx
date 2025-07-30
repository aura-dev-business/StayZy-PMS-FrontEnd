'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface ScrollAnimationWrapperProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  yOffset?: number;
  xOffset?: number;
  scale?: number;
  rotate?: number;
}

export default function ScrollAnimationWrapper({
  children,
  delay = 0.2,
  duration = 0.8,
  yOffset = 30,
  xOffset = 0,
  scale = 1,
  rotate = 0,
}: ScrollAnimationWrapperProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: yOffset, x: xOffset, scale: 0.95, rotate }}
      animate={
        isInView
          ? { opacity: 1, y: 0, x: 0, scale, rotate: 0 }
          : {}
      }
      transition={{
        delay,
        duration,
        ease: 'easeInOut',
      }}
      style={{
        display: 'inline-block',
        width: '100%',
      }}
    >
      {children}
    </motion.div>
  );
}
