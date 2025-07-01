'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function MouseTracker() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const moveHandler = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', moveHandler);
    return () => window.removeEventListener('mousemove', moveHandler);
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 w-12 h-12 rounded-full border-2 border-blue-500/50 shadow-[0_0_10px_rgba(59,130,246,0.4)] pointer-events-none z-[9999] "
      animate={{
        x: position.x - 24, // center ring
        y: position.y - 24,
      }}
      transition={{
        type: 'spring',
        stiffness: 120,
        damping: 20,
      }}
    />
  );
}
