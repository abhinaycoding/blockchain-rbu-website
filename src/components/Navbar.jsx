import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Home, Info, Calendar } from 'lucide-react';
import logo from '../assets/logo.jpg';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handle Scroll to determine if we should collapse the island
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Menu items with icons for the expanded state
  const menuItems = [
    { name: 'HOME', id: 'home', icon: Home },
    { name: 'ABOUT', id: 'about', icon: Info },
    { name: 'EVENTS', id: 'events', icon: Calendar },
  ];

  // Determine if the island should be expanded (not scrolled, OR hovered while scrolled)
  const isExpanded = !isScrolled || isHovered;

  return (
    // Fixed positioning wrapper to keep it at the top
    <div className="fixed top-0 left-0 w-full flex justify-center pt-6 pointer-events-none px-4" style={{ zIndex: 20 }}>
      
      {/* 
        The Dynamic Island Container 
        pointer-events-auto allows this specific element to be clickable despite the wrapper 
      */}
      <motion.nav
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        initial={{ y: -100, opacity: 0 }}
        animate={{ 
          y: 0, 
          opacity: 1,
          width: isMobileMenuOpen ? "100%" : (isExpanded ? "90%" : "280px"),
          borderRadius: isMobileMenuOpen ? "24px" : "100px" // More square when mobile menu is open
        }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="pointer-events-auto max-w-7xl bg-black/60 backdrop-blur-xl border border-white/10 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col items-center"
      >
        
        {/* TOP BAR / ALWAYS VISIBLE (or collapsed state) */}
        <div className="w-full h-16 md:h-20 px-4 md:px-8 flex justify-between items-center shrink-0">
          
          {/* LOGO (Always Visible) */}
          <a href="#" className="flex items-center gap-3 group shrink-0" onClick={() => setIsMobileMenuOpen(false)}>
            <div className="relative h-10 w-10 md:h-12 md:w-12 rounded-full overflow-hidden border border-white/10 group-hover:border-neon-cyan transition-colors">
               <img src={logo} alt="BRC Logo" className="h-full w-full object-cover" />
            </div>
            
            {/* Logo Text - Hides when fully collapsed to save space */}
            <AnimatePresence>
              {isExpanded && (
                <motion.div 
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "auto" }}
                  exit={{ opacity: 0, width: 0 }}
                  className="font-sans font-extrabold text-lg md:text-xl tracking-tight leading-none whitespace-nowrap overflow-hidden hidden md:block uppercase"
                >
                  BLOCKCHAIN <span className="text-orange-500">RBU</span>
                </motion.div>
              )}
            </AnimatePresence>
          </a>

          {/* DESKTOP MENU - Visible when expanded */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="hidden md:flex gap-8 font-mono text-sm text-gray-400 absolute left-1/2 -translate-x-1/2"
              >
                {menuItems.map((item) => (
                  <a key={item.name} href={`#${item.id}`} className="group flex items-center text-gray-300 hover:text-cyan-400 transition-colors font-semibold tracking-wider text-xs">
                    <span className="text-orange-500 mr-2 opacity-0 group-hover:opacity-100 transition-opacity"><item.icon size={14} /></span>
                    {item.name}
                  </a>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* RIGHT SIDE (Join Button or Hamburger) */}
          <div className="flex items-center gap-4 shrink-0">
            
            {/* Join Button - Removed to reduce duplicate CTA clutter */}

            {/* Mobile Menu Toggle */}
            <button 
              className="md:hidden text-cyan-400 p-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <AnimatePresence mode="wait">
                {isMobileMenuOpen ? (
                  <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
                    <X size={20} />
                  </motion.div>
                ) : (
                  <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
                    <Menu size={20} />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>

        {/* MOBILE MENU DROPDOWN (Inside the island) */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="w-full md:hidden"
            >
              <div className="flex flex-col p-6 pt-0 gap-4 font-mono text-lg border-t border-white/5 mt-2">
                {menuItems.map((item, index) => (
                  <motion.a 
                    key={item.name} 
                    href={`#${item.id}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-4 text-gray-400 py-2 border-b border-white/5"
                  >
                    <div className="w-8 h-8 rounded-full bg-orange-500/10 flex items-center justify-center text-orange-500">
                      <item.icon size={16} />
                    </div>
                    {item.name}
                  </motion.a>
                ))}
                
                {/* Mobile Join Button Removed */}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </motion.nav>
    </div>
  );
};

export default Navbar;