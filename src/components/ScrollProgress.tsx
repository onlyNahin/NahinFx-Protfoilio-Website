'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

export default function ScrollProgress({ primaryColor = '#FF1B1B' }: { primaryColor?: string }) {
  const [progress, setProgress] = useState(0);
  const [showBackTop, setShowBackTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setProgress(pct);
      setShowBackTop(scrollTop > 400);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Top progress bar */}
      <div className="fixed top-0 left-0 right-0 z-50 h-0.5 bg-white/5">
        <motion.div
          className="h-full origin-left rounded-full"
          style={{
            scaleX: progress / 100,
            backgroundColor: primaryColor,
            boxShadow: `0 0 8px ${primaryColor}`,
          }}
          transition={{ ease: 'linear', duration: 0.1 }}
        />
      </div>

      {/* Back to top button */}
      <motion.button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: showBackTop ? 1 : 0, scale: showBackTop ? 1 : 0.5 }}
        transition={{ duration: 0.3 }}
        className="fixed bottom-8 right-8 z-40 flex h-11 w-11 items-center justify-center rounded-2xl text-white shadow-xl transition-all hover:scale-110"
        style={{ backgroundColor: primaryColor, boxShadow: `0 4px 24px ${primaryColor}60` }}
        aria-label="Back to top"
      >
        <ArrowUp className="h-5 w-5" />
      </motion.button>
    </>
  );
}
