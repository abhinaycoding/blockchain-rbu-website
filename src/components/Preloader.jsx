import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const words = [
  "INITIALIZING...",
  "LOADING ASSETS...",
  "ESTABLISHING UPLINK...",
  "DECRYPTING CORE...",
  "ACCESS GRANTED."
];

const Preloader = ({ onComplete }) => {
  const [count, setCount] = useState(0);
  const [textIndex, setTextIndex] = useState(0);

  useEffect(() => {
    // 1. The Counter Logic
    const interval = setInterval(() => {
      setCount((prev) => {
        // If we hit 100, stop the counter and trigger the exit
        if (prev === 100) {
          clearInterval(interval);
          // Small delay before lifting the shutters so user sees "100%"
          setTimeout(onComplete, 200); 
          return 100;
        }
        
        // Cycle through the "hacker text" every ~15 numbers
        if (prev % 15 === 0) {
          setTextIndex((i) => (i + 1) % words.length);
        }
        
        return prev + 1;
      });
    }, 25); // Speed of loading (lower = faster)

    return () => clearInterval(interval);
  }, [onComplete]);

  // 2. The Shutters (5 columns for the reveal effect)
  const columns = [0, 1, 2, 3, 4];

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center pointer-events-none">
      
      {/* BACKGROUND SHUTTERS (Black bars that slide up) */}
      <div className="absolute inset-0 flex h-full w-full">
        {columns.map((i) => (
          <motion.div
            key={i}
            initial={{ height: "100%" }}
            exit={{ height: "0%" }} // <--- This is the Reveal Animation
            transition={{
              duration: 0.8,
              ease: [0.76, 0, 0.24, 1], // Cinematic easing
              delay: i * 0.1, // Staggered delay (Wave effect)
            }}
            className="w-1/5 h-full bg-black border-r border-white/10 relative overflow-hidden"
          >
             {/* Optional: Digital noise texture inside bars */}
             <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
          </motion.div>
        ))}
      </div>

      {/* TEXT CONTENT (Fades out *before* shutters lift) */}
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="relative z-10 flex flex-col items-center justify-center text-white mix-blend-difference"
      >
        {/* Giant Counter */}
        <h1 className="text-9xl md:text-[12rem] font-bold font-mono tracking-tighter leading-none">
          {count}%
        </h1>
        
        {/* Blinking Status Text */}
        <div className="mt-4 flex items-center gap-2">
           <div className="w-2 h-2 bg-green-500 rounded-full animate-ping" />
           <span className="text-sm md:text-base font-mono tracking-[0.2em] text-gray-400 uppercase">
             {words[textIndex]}
           </span>
        </div>
      </motion.div>

    </div>
  );
};

export default Preloader;