import React from 'react';
import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';

const TickerItem = ({ text }) => (
  <div className="flex items-center gap-8 px-4">
    <span className="text-4xl md:text-6xl font-bold uppercase tracking-tighter text-transparent stroke-text hover:text-neon-cyan transition-colors duration-300 cursor-default">
      {text}
    </span>
    <Zap className="text-neon-purple w-6 h-6 md:w-8 md:h-8" />
  </div>
);

const TechTicker = () => {
  const items = [
    "BLOCKCHAIN", "WEB3", "ETHEREUM", "SOLANA", "SMART CONTRACTS", 
    "DEFI", "NFT", "SOLIDITY", "RUST", "ZERO KNOWLEDGE"
  ];

  return (
    <section className="py-10 bg-black overflow-hidden border-y border-white/10 relative z-20">
      
      {/* The Gradient Fade on sides (makes it look 3D) */}
      <div className="absolute top-0 left-0 w-20 md:w-40 h-full bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
      <div className="absolute top-0 right-0 w-20 md:w-40 h-full bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

      <div className="flex">
        {/* We duplicate the list twice to ensure a seamless infinite loop */}
        <motion.div 
          className="flex flex-nowrap"
          animate={{ x: "-50%" }}
          transition={{ 
            ease: "linear", 
            duration: 20, // Adjust speed: Higher = Slower
            repeat: Infinity 
          }}
        >
          {/* First Copy */}
          {items.map((item, index) => (
            <TickerItem key={`a-${index}`} text={item} />
          ))}
          
          {/* Second Copy (Required for loop) */}
          {items.map((item, index) => (
            <TickerItem key={`b-${index}`} text={item} />
          ))}
        </motion.div>
      </div>

      {/* CSS for the "Hollow" text effect */}
      <style jsx>{`
        .stroke-text {
          -webkit-text-stroke: 1px rgba(255, 255, 255, 0.3);
        }
        .stroke-text:hover {
          -webkit-text-stroke: 1px #00f3ff; /* Neon Cyan */
          text-shadow: 0 0 20px rgba(0, 243, 255, 0.5);
        }
      `}</style>
    </section>
  );
};

export default TechTicker;