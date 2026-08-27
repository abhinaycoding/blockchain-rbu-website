import React from 'react';
import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';
import MagneticWrapper from './MagneticWrapper';
import CryptoCoin3D from './CryptoCoin3D';
import Pattern from './Pattern';
import logo from '../assets/logo-icon.png';
import './HeroCoin.css'; 

// Logo as mobile background — mix-blend-mode:screen makes the black bg transparent
// so only the glowing blockchain symbol shows behind the text
function LogoBg() {
  return (
    <div className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none overflow-hidden">
      <img
        src={logo}
        alt=""
        aria-hidden="true"
        style={{
          width: '320px',
          height: '320px',
          objectFit: 'contain',
          mixBlendMode: 'screen',
          opacity: 0.28,
          userSelect: 'none',
        }}
      />
    </div>
  );
}

const Hero = ({ onJoinClick }) => {
  return (
    <section className="relative min-h-screen flex items-center bg-transparent text-white overflow-hidden selection:bg-orange-500/30">
      
      {/* Geometric Pattern Background */}
      <div className="absolute inset-0 w-full h-full z-0 opacity-5 pointer-events-none [&>*]:absolute [&>*]:inset-0 [&>*]:w-full [&>*]:h-full">
        <Pattern />
      </div>

      {/* DESKTOP 3D CONTAINER */}
      <div 
        className="hidden lg:block absolute right-0 overflow-hidden pointer-events-none hero-3d" 
        style={{ top: '12%', width: '52%', height: '78%', zIndex: 5 }}
      >
        <CryptoCoin3D />
      </div>

      {/* MOBILE ONLY: Logo as background */}
      <div className="lg:hidden">
        <LogoBg />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 w-full flex flex-col lg:grid lg:grid-cols-2 gap-10 lg:gap-16 pt-20 lg:items-center">
        
        {/* LEFT SIDE: Content — always on top of the static bg on mobile */}
        <div className="relative w-full lg:w-auto mt-4 lg:mt-0 order-1" style={{ zIndex: 10 }}>
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
            }}
          >
            <motion.h1 
              variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } } }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tighter mb-8">
              <span className="block text-2xl md:text-3xl font-mono font-normal text-gray-400 mb-2 tracking-widest uppercase">
                Welcome to
              </span>
              <span className="inline-flex flex-col">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-orange-500 to-yellow-400">
                  BLOCKCHAIN RBU
                </span>
                <span className="hero-title-line" aria-hidden="true" />
              </span>
              <br />
              STUDENT CHAPTER
            </motion.h1>

            <motion.p 
              variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } } }}
              className="text-white/90 text-lg md:text-xl font-medium max-w-lg leading-relaxed mb-10">
              We are building the next generation of Blockchain innovators by empowering students through hands-on learning, real projects, and Web3 technologies.
            </motion.p>

            <motion.div 
              variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } } }}
              className="flex flex-col sm:flex-row gap-5 items-start sm:items-center">
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
            </motion.div>
          </motion.div>
        </div>

        {/* Removed inner 3D container to support absolute positioning */}

      </div>
    </section>
  );
};

export default Hero;