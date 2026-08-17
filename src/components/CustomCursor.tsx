'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function CustomCursor({ primaryColor = '#FF1B1B' }: { primaryColor?: string }) {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', updateMousePosition);
    document.body.addEventListener('mouseleave', handleMouseLeave);
    document.body.addEventListener('mouseenter', handleMouseEnter);

    const handleHoverEvents = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.classList.contains('interactive')
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener('mouseover', handleHoverEvents);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
      document.body.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('mouseover', handleHoverEvents);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <>
      {/* Main cursor dot */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-50 rounded-full"
        style={{
          backgroundColor: primaryColor,
          width: 8,
          height: 8,
          boxShadow: `0 0 10px ${primaryColor}`,
        }}
        animate={{
          x: mousePosition.x - 4,
          y: mousePosition.y - 4,
          scale: isHovered ? 2 : 1,
        }}
        transition={{ type: 'spring', damping: 30, stiffness: 400, mass: 0.1 }}
      />

      {/* Outer trailing aura */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-40 rounded-full border border-white/30 backdrop-blur-[1px]"
        style={{
          borderColor: primaryColor,
          width: 36,
          height: 36,
          boxShadow: `0 0 15px ${primaryColor}40`,
        }}
        animate={{
          x: mousePosition.x - 18,
          y: mousePosition.y - 18,
          scale: isHovered ? 1.6 : 1,
          backgroundColor: isHovered ? `${primaryColor}20` : 'transparent',
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 200, mass: 0.3 }}
      />
    </>
  );
}
