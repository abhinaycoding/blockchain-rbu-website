import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';

const Preloader = ({ onComplete }) => {
  const [isDone, setIsDone] = useState(false);
  const [displayNumber, setDisplayNumber] = useState(0);
  
  const progressValue = useMotionValue(0);
  
  // Use scale for smooth scaling
  const scale = useTransform(progressValue, [0, 100], [0.8, 1]);
  // GPU-accelerated opacity instead of shadow interpolation to prevent mobile lag
  const glowOpacity = useTransform(progressValue, [0, 100], [0, 1]);

  useEffect(() => {
    const controls = animate(progressValue, 100, {
      duration: 2.5,
      ease: "easeInOut",
      onUpdate: (latest) => {
        setDisplayNumber(Math.round(latest));
      },
      onComplete: () => {
        setIsDone(true);
        setTimeout(onComplete, 1200); 
      }
    });

    return () => controls.stop();
  }, [onComplete, progressValue]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.8, delay: 0.6 } }}
      className="fixed inset-0 z-[99999] flex items-center justify-center bg-black text-white overflow-hidden pointer-events-none"
    >
      {/* 1. The Supernova Flash Layer */}
      <motion.div 
        animate={{ opacity: isDone ? 1 : 0 }}
        transition={{ duration: 0.8 }}
        className="absolute inset-0 bg-white z-0"
        style={{ willChange: "opacity" }}
      />

      {/* 2. The Core Eclipse Ring Container (Handles scale) */}
      <motion.div
        style={{ scale, willChange: "transform" }}
        className="relative z-10 w-48 h-48 md:w-64 md:h-64 flex items-center justify-center"
      >
        {/* The static glowing aura behind (GPU accelerated opacity) */}
        <motion.div 
          style={{ opacity: glowOpacity, willChange: "opacity" }}
          className="absolute inset-[-40px] bg-white/20 rounded-full blur-[60px]"
        />

        {/* The physical ring (scales massively on exit, but no blur filters) */}
        <motion.div
          animate={isDone ? { 
            scale: 25,
            opacity: 0,
          } : { scale: 1, opacity: 1 }}
          transition={isDone ? { duration: 1.2, ease: [0.76, 0, 0.24, 1] } : {}}
          className="absolute inset-0 rounded-full border-[2px] border-white/30 bg-black flex items-center justify-center shadow-[inset_0_0_40px_rgba(255,255,255,0.15)] overflow-hidden"
          style={{ willChange: "transform, opacity" }}
        />
        
        {/* The numeric counter */}
        <motion.div 
          animate={{ 
            opacity: isDone ? 0 : 1, 
            scale: isDone ? 0.8 : 1 
          }}
          transition={{ duration: 0.3 }}
          className="font-mono text-white/90 text-3xl font-light tracking-widest tabular-nums z-20 flex items-center gap-1"
        >
          {displayNumber}<span className="text-sm text-white/50">%</span>
        </motion.div>
      </motion.div>

      {/* 3. The Subtle Bottom Text */}
      <motion.div 
        animate={{ opacity: isDone ? 0 : 1, y: isDone ? -20 : 0 }}
        transition={{ duration: 0.5 }}
        className="absolute bottom-12 font-mono text-[10px] md:text-xs tracking-[0.5em] uppercase text-gray-500 z-10 opacity-60"
        style={{ willChange: "opacity, transform" }}
      >
        Establishing Node Link
      </motion.div>

    </motion.div>
  );
};

export default Preloader;