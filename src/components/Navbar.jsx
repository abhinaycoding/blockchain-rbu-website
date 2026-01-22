import React from 'react';
import { MessageCircle, ExternalLink } from 'lucide-react';
import MagneticWrapper from './MagneticWrapper';
import HackerText from './HackerText'; // <--- 1. Import the HackerText component
import logo from '../assets/BRC_LOGO.jfif'; 

const Navbar = () => {
  return (
    <nav className="fixed w-full z-50 border-b border-white/10 bg-black/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        
        {/* LOGO SECTION (Unchanged) */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="relative">
            <div className="absolute -inset-1 bg-neon-cyan/50 rounded-full opacity-0 group-hover:opacity-100 blur transition-opacity duration-500" />
            <img 
              src={logo} 
              alt="BRC Logo" 
              className="relative h-12 w-12 object-contain rounded-full border border-white/10 group-hover:border-neon-cyan transition-colors"
            />
          </div>
          
          <div className="font-display font-bold text-xl tracking-tighter leading-none">
            BLOCK<span className="text-neon-cyan group-hover:text-neon-purple transition-colors">CHAIN</span>
            <span className="block text-[10px] font-mono text-gray-400 tracking-widest group-hover:text-white transition-colors">STUDENT CHAPTER</span>
          </div>
        </a>

        {/* Desktop Menu - NOW WITH HACKER EFFECT */}
        <div className="hidden md:flex gap-8 font-mono text-sm text-gray-400">
          {['HOME', 'ABOUT', 'EVENTS', 'TEAM'].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`} 
              className="group flex items-center"
            >
              <span className="text-neon-purple mr-1 group-hover:text-white transition-colors">//</span>
              
              {/* 2. The Hacker Text Component */}
              <HackerText 
                text={item} 
                className="group-hover:text-neon-cyan group-hover:shadow-[0_0_10px_rgba(0,243,255,0.4)] transition-all duration-300"
              />
            </a>
          ))}
        </div>

        {/* Join Button (Unchanged) */}
        <MagneticWrapper>
          <a 
            href="https://www.instagram.com/blockchain_rbu?igsh=ODM4NXo0NTIxaHRo"
            target="_blank" 
            rel="noopener noreferrer"
            className="group border border-neon-purple/50 px-6 py-2 font-mono text-xs uppercase flex items-center gap-2 text-neon-purple hover:bg-neon-purple hover:text-white hover:shadow-[0_0_15px_rgba(176,38,255,0.4)] transition-all"
          >
            <MessageCircle size={14} className="group-hover:animate-bounce" />
            <span>Join Community</span>
            <ExternalLink size={10} className="opacity-50" />
          </a>
        </MagneticWrapper>
      </div>
    </nav>
  );
};

export default Navbar;