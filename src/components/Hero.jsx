import React from 'react';
import { motion } from 'framer-motion';
import { Zap, ArrowRight } from 'lucide-react';
import CyberCore from './CyberCore'; // Ensure this file exists in components folder
import GlitchText from './GlitchText'; 
import MagneticWrapper from './MagneticWrapper'; 
import RevolvingLogo from './RevolvingLogo';

// Inside your Hero component:
<div className="hero-content">
  <RevolvingLogo /> {/* <--- Add this here */}
  <h1 className="title">BLOCKCHAIN RBU</h1>
  <p className="subtitle">Building Tomorrow's Tech Leaders</p>
</div>

const Hero = () => {
  return (
    <section className="min-h-screen flex items-center relative pt-20 overflow-hidden bg-black">
      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(76,29,149,0.1),rgba(0,0,0,1))] -z-10" />

      <div className="max-w-7xl mx-auto px-6 w-full grid lg:grid-cols-2 gap-12 items-center">
        
        {/* LEFT SIDE: Text Content */}
        <div className="z-10 order-2 lg:order-1">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 border border-neon-green/30 bg-neon-green/5 px-4 py-2 mb-8 rounded-full">
              <span className="w-2 h-2 bg-neon-green animate-pulse rounded-full"></span>
              <span className="text-neon-green font-mono text-xs tracking-widest">SYSTEM_ONLINE // V.2.0.25</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-display font-bold leading-tight mb-6">
              BUILD THE <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-purple to-neon-cyan">
                <GlitchText text="DECENTRALIZED" />
              </span>
            </h1>

            <p className="text-gray-400 text-lg font-mono mb-10 max-w-lg leading-relaxed">
              The official student chapter for Web3, Blockchain, and DeFi. 
              We don't just write code; we deploy the future.
            </p>

            <div className="flex flex-wrap gap-6">
              <MagneticWrapper>
                <button className="bg-neon-purple text-white px-8 py-4 font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all clip-path-polygon flex items-center gap-2">
                  <Zap size={18} /> Join Now
                </button>
              </MagneticWrapper>
              
              <MagneticWrapper>
                <button className="border border-neon-cyan/50 text-neon-cyan px-8 py-4 font-bold uppercase tracking-widest hover:bg-neon-cyan hover:text-black transition-all flex items-center gap-2">
                   Explore <ArrowRight size={18} />
                </button>
              </MagneticWrapper>
            </div>
          </motion.div>
        </div>

        {/* RIGHT SIDE: The Living 3D Core (Cleaned up) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="h-[500px] w-full flex items-center justify-center order-1 lg:order-2 relative z-20"
        >
           {/* The 3D Component */}
           <CyberCore />
        </motion.div>

      </div>
    </section>
  );
};

export default Hero;