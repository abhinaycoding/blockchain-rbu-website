import React from 'react';
import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';
import MagneticWrapper from './MagneticWrapper';
import CryptoCoin3D from './CryptoCoin3D';
import logo from '../assets/logo.jpg';
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
          width: '340px',
          height: '340px',
          objectFit: 'contain',
          objectPosition: 'top',  // crop to just the icon, hide the text below
          mixBlendMode: 'screen',
          opacity: 0.22,
          userSelect: 'none',
        }}
      />
    </div>
  );
}

const Hero = ({ onJoinClick }) => {
  return (
    <section className="relative min-h-screen flex items-center bg-transparent text-white overflow-hidden selection:bg-orange-500/30">
      
      {/* Background Ambience — desktop only, mobile doesn't need these */}
      <div className="hidden lg:block absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-orange-600/10 rounded-full blur-[120px] animate-pulse" />
      <div className="hidden lg:block absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[100px]" />
      <div className="hidden lg:block absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20" />

      {/* MOBILE ONLY: Logo as background */}
      <div className="lg:hidden">
        <LogoBg />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 w-full flex flex-col lg:grid lg:grid-cols-2 gap-10 lg:gap-16 pt-20 lg:items-center">
        
        {/* LEFT SIDE: Content — always on top of the static bg on mobile */}
        <div className="relative z-10 w-full lg:w-auto mt-4 lg:mt-0 order-1">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tighter mb-8 mix-blend-screen">
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
            </div>
          </motion.div>
        </div>

        {/* DESKTOP ONLY: Full 3D interactive model */}
        <div className="hidden lg:flex lg:order-2 lg:w-full lg:h-[600px] items-center justify-center z-0">
          <CryptoCoin3D />
        </div>

      </div>
    </section>
  );
};

export default Hero;