'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Preloader() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setLoading(false), 400);
          return 100;
        }
        return prev + Math.random() * 18 + 4;
      });
    }, 80);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0f0f10] overflow-hidden"
        >
          {/* Ambient glow */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-[600px] h-[600px] rounded-full bg-red-600/10 blur-[150px] animate-pulse" />
          </div>

          {/* Logo mark */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: 'backOut' }}
            className="relative z-10 flex flex-col items-center gap-6"
          >
            {/* Animated Logo */}
            <div className="relative flex items-center justify-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                className="absolute h-20 w-20 rounded-full border-t-2 border-r-2 border-red-500/40"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                className="absolute h-14 w-14 rounded-full border-b-2 border-l-2 border-red-600/60"
              />
              <div className="h-12 w-12 rounded-2xl bg-red-600 flex items-center justify-center shadow-2xl shadow-red-600/50">
                <span className="text-white font-black text-xl">D</span>
              </div>
            </div>

            {/* Brand text */}
            <div className="flex flex-col items-center gap-1">
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-2xl font-black text-white tracking-[0.3em] uppercase"
              >
                Nahin Sharif
              </motion.span>
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-[10px] tracking-widest text-red-400 font-bold uppercase"
              >
                PORTFOLIO CMS
              </motion.span>
            </div>

            {/* Progress bar */}
            <div className="w-48 h-0.5 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-red-500 rounded-full"
                style={{ width: `${progress}%` }}
                transition={{ ease: 'easeOut' }}
              />
            </div>
            <span className="text-[10px] text-gray-500 font-semibold tracking-wider">
              {Math.min(100, Math.round(progress))}%
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
