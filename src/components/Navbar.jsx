import React, { useState, useEffect } from 'react';
import { MessageCircle, ExternalLink, Menu, X } from 'lucide-react';
import MagneticWrapper from './MagneticWrapper';
import HackerText from './HackerText';
import logo from '../assets/logo.jpg'; 

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // LOGIC: Calculate scroll percentage
  useEffect(() => {
    const updateScrollProgress = () => {
      const currentScroll = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight) {
        setScrollProgress((currentScroll / scrollHeight) * 100);
      }
    };

    window.addEventListener('scroll', updateScrollProgress);
    return () => window.removeEventListener('scroll', updateScrollProgress);
  }, []);

  const menuItems = ['HOME', 'ABOUT', 'EVENTS', 'TEAM'];

  return (
    <nav className="fixed w-full z-[100] border-b border-white/10 bg-black/80 backdrop-blur-md">
      
      {/* --- NEW: SCROLL PROGRESS BAR --- */}
      <div 
        className="absolute top-0 left-0 h-[2px] bg-gradient-to-right from-neon-cyan to-neon-purple shadow-[0_0_10px_rgba(0,243,255,0.8)] transition-all duration-150 ease-out"
        style={{ width: `${scrollProgress}%`, background: 'linear-gradient(90deg, #00ffff, #9e88f6)' }}
      />

      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        
        {/* LOGO SECTION */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="relative">
            <div className="absolute -inset-1 bg-neon-cyan/50 rounded-full opacity-0 group-hover:opacity-100 blur transition-opacity duration-500" />
            <div className="relative h-10 w-10 md:h-12 md:w-12 rounded-full overflow-hidden border border-white/10 group-hover:border-neon-cyan transition-colors">
              <img 
                src={logo} 
                alt="BRC Logo"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
          
          <div className="font-display font-bold text-lg md:text-xl tracking-tighter leading-none">
            BLOCK
            <span className="text-neon-cyan group-hover:text-neon-purple transition-colors"> CHAIN</span>
            <span className="block text-[8px] md:text-[10px] font-mono text-gray-400 tracking-widest group-hover:text-white transition-colors uppercase">
              Student Chapter
            </span>
          </div>
        </a>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex gap-8 font-mono text-sm text-gray-400">
          {menuItems.map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="group flex items-center">
              <span className="text-neon-purple mr-1 group-hover:text-white transition-colors">//</span>
              <HackerText 
                text={item} 
                className="group-hover:text-neon-cyan group-hover:shadow-[0_0_10px_rgba(0,243,255,0.4)] transition-all duration-300"
              />
            </a>
          ))}
        </div>

        {/* JOIN BUTTON + MOBILE TOGGLE */}
        <div className="flex items-center gap-4">
          <div className="hidden sm:block">
            <MagneticWrapper>
              <a 
                href="https://www.instagram.com/blockchain_rbu"
                target="_blank" 
                rel="noopener noreferrer"
                className="group border border-neon-purple/50 px-6 py-2 font-mono text-xs uppercase flex items-center gap-2 text-neon-purple hover:bg-neon-purple hover:text-white hover:shadow-[0_0_15px_rgba(176,38,255,0.4)] transition-all"
              >
                <MessageCircle size={14} className="group-hover:animate-bounce" />
                <span>Join</span>
                <ExternalLink size={10} className="opacity-50" />
              </a>
            </MagneticWrapper>
          </div>

          <button 
            className="md:hidden text-neon-cyan p-1"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU DROPDOWN */}
      <div className={`
        absolute top-full left-0 w-full bg-black/95 backdrop-blur-xl border-b border-white/10 transition-all duration-300 ease-in-out overflow-hidden
        ${isMobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}
        md:hidden
      `}>
        <div className="flex flex-col p-8 gap-6 font-mono text-lg">
          {menuItems.map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`}
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-4 text-gray-400"
            >
              <span className="text-neon-purple text-sm">// 0{menuItems.indexOf(item) + 1}</span>
              {item}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;