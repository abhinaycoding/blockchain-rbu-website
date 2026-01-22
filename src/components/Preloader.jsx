import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const Preloader = ({ onComplete }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 2000; 
    const steps = 100;
    const intervalTime = duration / steps;

    const timer = setInterval(() => {
      setCount((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 800); 
          return 100;
        }
        return prev + 1;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ y: 0 }}
      exit={{ 
        y: "-100%", 
        transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } 
      }}
      className="fixed inset-0 z-[99999] flex items-center justify-center bg-black text-white overflow-hidden"
    >
      <motion.div 
        initial={{ opacity: 1 }}
        exit={{ 
          y: "20%", 
          opacity: 0, 
          transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } 
        }}
        className="relative w-full h-full flex flex-col items-center justify-center"
      >
        <div className="relative mb-4 overflow-hidden">
          <motion.h1 
            initial={{ y: "100%" }}
            animate={{ y: "0%" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-7xl font-bold tracking-tighter text-center px-4"
          >
            BLOCKCHAIN <span className="text-cyan-400">RBU</span>
          </motion.h1>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="font-mono text-purple-500 text-xs md:text-sm tracking-[0.3em] uppercase mb-12"
        >
          Student Chapter
        </motion.p>

        <div className="absolute bottom-10 right-10 text-6xl md:text-9xl font-bold font-mono text-transparent stroke-text tabular-nums opacity-50">
          {count}%
        </div>

        <div className="absolute bottom-12 left-10 w-32 md:w-64 h-[1px] bg-gray-800">
          <motion.div 
            className="h-full bg-cyan-400"
            initial={{ width: 0 }}
            animate={{ width: `${count}%` }}
          />
        </div>
      </motion.div>

      <style jsx>{`
        .stroke-text {
          -webkit-text-stroke: 1px rgba(255, 255, 255, 0.2);
        }
        .tabular-nums {
          font-variant-numeric: tabular-nums;
        }
      `}</style>
    </motion.div>
  );
};

export default Preloader;