import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Zap, ArrowRight, Github, Twitter } from 'lucide-react';
// import GlitchText from './GlitchText'; // Make sure this is imported if you use it, or HackerText
import MagneticWrapper from './MagneticWrapper';
import './HeroCoin.css'; 

// 1. Accept the prop here
const Hero = ({ onJoinClick }) => {
  // --- MAGNETIC PHYSICS LOGIC ---
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseX = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
  const mouseY = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });
  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseXFromCenter = e.clientX - rect.left - width / 2;
    const mouseYFromCenter = e.clientY - rect.top - height / 2;
    x.set(mouseXFromCenter / width);
    y.set(mouseYFromCenter / height);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <section className="relative min-h-screen flex items-center bg-transparent text-white overflow-hidden selection:bg-orange-500/30">
      
      {/* Background Ambience */}
      <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-orange-600/10 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[100px]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20" />

      <div className="relative max-w-7xl mx-auto px-6 w-full flex flex-col lg:grid lg:grid-cols-2 gap-10 lg:gap-16 pt-20 lg:items-center">
        
        {/* LEFT SIDE: Content */}
        <div className="relative z-20 w-full lg:w-auto mt-4 lg:mt-0 order-1">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Live Status Badge */}
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-white/5 bg-white/5 backdrop-blur-sm mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
              </span>
              <span className="text-xs font-mono tracking-widest text-gray-300 uppercase">
                Genesis Block // Initialized
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tighter mb-8 mix-blend-screen">
              <span className="block text-2xl md:text-3xl font-mono font-normal text-gray-400 mb-2 tracking-widest uppercase">
                Welcome to
              </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-orange-500 to-yellow-400">
                BLOCKCHAIN RBU
              </span>
              <br />
              STUDENT CHAPTER
            </h1>

            <p className="text-gray-400 text-lg md:text-xl font-light max-w-lg leading-relaxed mb-10">
              We are building the next generation of Blockchain innovators by empowering students through hands-on learning, real projects, and Web3 technologies.
            </p>

            <div className="flex flex-col sm:flex-row gap-5 items-start sm:items-center">
              <MagneticWrapper>
                <button 
                  onClick={onJoinClick}
                  className="group relative px-8 py-4 bg-orange-500 text-black font-bold uppercase tracking-widest overflow-hidden transition-transform active:scale-95"
                >
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                  <span className="relative flex items-center gap-2">
                    JOIN BLOCKCHAIN RBU <Zap size={18} fill="currentColor" />
                  </span>
                </button>
              </MagneticWrapper>

              <div className="flex gap-4">
                {[Github, Twitter].map((Icon, i) => (
                  <a key={i} href="#" className="p-3 border border-white/10 rounded-full hover:bg-white hover:text-black transition-all hover:scale-110">
                    <Icon size={20} />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* RIGHT SIDE: MAGNETIC 3D COIN */}
        <div 
          className="hidden lg:flex lg:order-2 lg:w-full lg:h-[600px] items-center justify-center perspective-container z-0 ml-auto lg:ml-0 mt-8 lg:mt-0 pointer-events-auto"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          ref={ref}
        >
          <motion.div 
            style={{ rotateX, rotateY }}
            className="relative w-full h-full flex items-center justify-center cursor-pointer pointer-events-auto"
          >
            <div className="coin-spinner">
              {[...Array(16)].map((_, i) => (
                <div 
                  key={i} 
                  className="coin-layer" 
                  style={{ 
                    transform: `translateZ(${i}px)`,
                    zIndex: i 
                  }} 
                >
                  <img 
                    src="https://cryptologos.cc/logos/bitcoin-btc-logo.png" 
                    alt="Bitcoin" 
                    className="w-full h-full object-cover pointer-events-none"
                  />
                  {i === 15 && <div className="coin-shine" />}
                </div>
              ))}
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default Hero;