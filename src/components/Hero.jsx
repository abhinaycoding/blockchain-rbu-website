import React from 'react';
import { motion } from 'framer-motion';
import { Zap, ArrowRight } from 'lucide-react';
import MagneticWrapper from './MagneticWrapper';
import CryptoCoin3D from './CryptoCoin3D';
import './HeroCoin.css'; 

const Hero = ({ onJoinClick }) => {
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
            {/* Headline */}
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

        {/* RIGHT SIDE / MOBILE BACKGROUND: 3D COIN (Physics handled entirely natively inside CryptoCoin3D) */}
        <div 
          className="absolute inset-0 top-20 lg:top-auto lg:relative lg:flex lg:order-2 lg:w-full lg:h-[600px] items-center justify-center perspective-container z-0 pointer-events-none lg:pointer-events-auto opacity-40 lg:opacity-100"
        >
          <div className="w-full h-full flex items-center justify-center">
            <CryptoCoin3D />
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;