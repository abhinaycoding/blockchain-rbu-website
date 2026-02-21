import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Preloader = ({ onComplete }) => {
  const [clicked, setClicked] = useState(false);
  const [isReady, setIsReady] = useState(false);
  
  // Fake a loading sequence before allowing click to build suspense
  useEffect(() => {
    const timer = setTimeout(() => setIsReady(true), 2500); 
    return () => clearTimeout(timer);
  }, []);

  const handleClick = () => {
    if (!isReady) return;
    setClicked(true);
    
    // Wait for explosion animation to finish before unmounting preloader
    // This allows the shards to fly away and the site to be fully revealed
    setTimeout(() => {
      onComplete();
    }, 1200); 
  };

  // Generate a smaller grid of 24 'shards' (6 columns x 4 rows) for better performance
  const shards = Array.from({ length: 24 }); 
  
  // Generate 100 tiny particles for the central explosion
  const explosionParticles = Array.from({ length: 100 }); 

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black overflow-hidden">
      
      {/* GLOWING AMBIENT BACKGROUND */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:54px_54px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-neon-purple/20 rounded-full blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] md:w-[400px] h-[200px] md:h-[400px] bg-neon-cyan/10 rounded-full blur-[80px]" />
      </div>

      {/* SHATTERING BACKGROUND GRID (Now Glassmorphism) */}
      <div className="absolute inset-0 grid grid-cols-6 grid-rows-4 w-full h-full pointer-events-none z-10">
        {shards.map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 1, scale: 1, x: 0, y: 0, rotate: 0 }}
            animate={clicked ? {
              opacity: 0,
              scale: Math.random() * 0.2, // shrink down
              x: (Math.random() - 0.5) * 1500, // fly out violently
              y: (Math.random() - 0.5) * 1500,
              rotate: (Math.random() - 0.5) * 1080, // spin wildly
            } : {}}
            style={{ willChange: "transform, opacity" }} // Force GPU Hardware Acceleration
            transition={{
              duration: 0.8 + Math.random() * 0.4, // varied duration for chaos
              ease: [0.19, 1, 0.22, 1], // easeOutExpo (fast start, slow end)
              delay: clicked ? Math.random() * 0.1 : 0, // tiny staggered delay
            }}
            className="w-full h-full bg-black/40 backdrop-blur-[4px] border border-white/10"
          >
             {/* Digital Noise Texture inside the shard */}
             <div className="absolute inset-0 opacity-40 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
          </motion.div>
        ))}
        
        {/* PARTICLE EXPLOSION (Triggers on click) */}
        {explosionParticles.map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
            animate={clicked ? {
              opacity: [0, 1, 0],
              scale: Math.random() * 1.5,
              x: (Math.random() - 0.5) * (window.innerWidth || 1000), 
              y: (Math.random() - 0.5) * (window.innerHeight || 1000),
            } : {}}
            style={{ willChange: "transform, opacity" }}
            transition={{
              duration: 0.5 + Math.random() * 0.5,
              ease: "easeOut",
              delay: clicked ? 0 : 0
            }}
            className="absolute top-1/2 left-1/2 w-1 h-1 md:w-2 md:h-2 bg-neon-cyan shadow-[0_0_10px_#00ffff] rounded-full blur-[1px]"
          />
        ))}
      </div>

      {/* THE GLITCH CORE INTERACTION */}
      <AnimatePresence>
        {!clicked && (
          <motion.div
            exit={{ scale: 3, opacity: 0 }} // Removed heavy blur filter to stop lag
            transition={{ duration: 0.3, ease: "easeIn" }}
            style={{ willChange: "transform, opacity" }}
            onClick={handleClick}
            className={`relative z-20 flex flex-col items-center justify-center group ${!isReady ? 'pointer-events-none' : 'cursor-pointer'}`}
          >
            {/* Outer Rotating Ring */}
            <motion.div 
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 90, 180, 270, 360],
                borderColor: ["#00ffff", "#b026ff", "#00ffff"]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "linear"
              }}
              className="absolute w-32 h-32 md:w-48 md:h-48 border-2 border-dashed rounded-full opacity-60 flex items-center justify-center pointer-events-none"
            />
            
            {/* Inner Counter-Rotating Ring */}
            <motion.div 
              animate={{
                scale: [1.1, 0.9, 1.1],
                rotate: [360, 270, 180, 90, 0],
                borderColor: ["#b026ff", "#00ffff", "#b026ff"]
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "linear"
              }}
              className="absolute w-40 h-40 md:w-56 md:h-56 border border-solid rounded-full opacity-30 pointer-events-none"
            />

            {/* The Clickable Core Button */}
            <div className={`
              w-24 h-24 md:w-32 md:h-32 rounded-full bg-black/90 backdrop-blur-md border-2 flex items-center justify-center relative overflow-hidden transition-all duration-500
              ${isReady 
                ? 'border-neon-cyan shadow-[0_0_50px_rgba(0,243,255,0.8)] group-hover:scale-110 group-hover:bg-neon-cyan/20 group-hover:shadow-[0_0_80px_rgba(0,243,255,1)]' 
                : 'border-red-500 shadow-[0_0_20px_rgba(255,0,0,0.5)] opacity-50'}
            `}>
              <span className={`font-mono font-bold tracking-widest text-center z-10 text-sm md:text-base ${isReady ? 'text-neon-cyan group-hover:text-white' : 'text-red-500'}`}>
                {isReady ? "ENTER" : "LOCKED"}
              </span>
              
              {/* Optional: Add a subtle loading pulse behind the text when locked */}
              {!isReady && (
                <motion.div 
                  animate={{ opacity: [0.1, 0.3, 0.1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="absolute inset-0 bg-red-500"
                />
              )}
            </div>
            
            <motion.p 
              animate={isReady ? { opacity: [0.5, 1, 0.5] } : {}}
              transition={{ duration: 2, repeat: Infinity }}
              className={`mt-12 md:mt-16 font-mono tracking-[0.2em] md:tracking-[0.3em] text-xs md:text-sm uppercase text-center px-4 ${isReady ? 'text-neon-cyan glitch-text' : 'text-gray-500'}`}
              data-text={isReady ? "[ SYSTEM OVERRIDE READY - CLICK CORE ]" : "[ DECRYPTING MAINFRAME... ]"}
            >
              {isReady ? "[ SYSTEM OVERRIDE READY - CLICK CORE ]" : "[ DECRYPTING MAINFRAME... ]"}
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default Preloader;