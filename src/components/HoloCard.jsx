import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import logo from "../assets/BRC_LOGO.jfif"; // Ensure this path is correct

const HoloCard = ({ name = "FUTURE MEMBER", role = "INITIATE" }) => {
  const cardRef = useRef(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [shine, setShine] = useState({ x: 0, y: 0, opacity: 0 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -10; // Max tilt 10deg
    const rotateY = ((x - centerX) / centerX) * 10;

    setRotate({ x: rotateX, y: rotateY });
    setShine({ x, y, opacity: 1 });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
    setShine({ ...shine, opacity: 0 });
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ rotateX: rotate.x, rotateY: rotate.y }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="relative w-full max-w-sm aspect-[1.58/1] rounded-xl bg-black border border-white/10 overflow-hidden shadow-2xl transform-style-3d cursor-pointer group"
      style={{ perspective: 1000 }}
    >
      {/* Background Texture */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900 z-0" />
      
      {/* Grid Pattern Overlay */}
      <div 
        className="absolute inset-0 opacity-20 z-0 pointer-events-none" 
        style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '20px 20px' }}
      />

      {/* Holographic Shine Gradient */}
      <div
        className="absolute inset-0 z-10 pointer-events-none mix-blend-overlay transition-opacity duration-300"
        style={{
          opacity: shine.opacity,
          background: `radial-gradient(circle at ${shine.x}px ${shine.y}px, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 80%)`,
        }}
      />
      
      {/* Content Layer */}
      <div className="relative z-20 p-6 flex flex-col justify-between h-full">
        {/* Header */}
        <div className="flex justify-between items-start">
          <img src={logo} alt="Logo" className="w-10 h-10 rounded-full border border-white/20" />
          <div className="text-right">
            <span className="block text-xs text-neon-cyan font-mono tracking-widest">ACCESS_PASS</span>
            <span className="block text-[10px] text-gray-500 font-mono">2026 EDITION</span>
          </div>
        </div>

        {/* Chip */}
        <div className="w-12 h-9 rounded-md bg-gradient-to-tr from-yellow-600 to-yellow-300 shadow-inner border border-yellow-700/50 flex items-center justify-center">
            <div className="w-8 h-[1px] bg-black/20" />
        </div>

        {/* User Info */}
        <div className="font-mono">
           <div className="text-[10px] text-gray-400 uppercase mb-1">MEMBER NAME</div>
           <div className="text-xl text-white font-bold tracking-widest truncate uppercase text-shadow-glow">
             {name || "YOUR NAME"}
           </div>
           
           <div className="flex justify-between items-end mt-4">
             <div>
                <div className="text-[10px] text-gray-400 uppercase">ROLE</div>
                <div className="text-sm text-neon-purple font-bold">{role}</div>
             </div>
             <div className="text-[10px] text-gray-600">
               ID: {Math.random().toString(36).substr(2, 8).toUpperCase()}
             </div>
           </div>
        </div>
      </div>

      {/* Border Glow */}
      <div className="absolute inset-0 border border-white/10 rounded-xl group-hover:border-neon-cyan/50 transition-colors duration-300 z-30 pointer-events-none" />
    </motion.div>
  );
};

export default HoloCard;