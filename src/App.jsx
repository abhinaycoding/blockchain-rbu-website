import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Lenis from 'lenis';
import { motion, AnimatePresence } from 'framer-motion';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TechTicker from './components/TechTicker';
import About from './components/About';
import Perks from './components/Perks';
import Timeline from './components/Timeline';
import Events from './components/Events';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import NoiseOverlay from './components/NoiseOverlay';
import Loader from './components/Loader';
import Cooking from './components/Cooking'; // <--- 1. IMPORT THIS
import Resources from './components/Resources';
import ParticlesBackground from './components/ParticlesBackground';
import CyberBackground from './components/CyberBackground'; // <--- ADDED CYBER BACKGROUND

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Hide splash screen after 2.5 seconds
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Native scroll on mobile is smoother and requires zero JS overhead
    const isMobile = window.innerWidth < 1024 || 'ontouchstart' in window;
    if (isMobile) return;

    const lenis = new Lenis({
      lerp: 0.08,
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  // Main Website Structure
  return (
    <div className="bg-transparent min-h-screen text-white selection:bg-neon-cyan selection:text-black overflow-x-hidden w-full">
      
      {/* SPLASH SCREEN */}
      <AnimatePresence mode='wait'>
        {isLoading && (
          <motion.div
            key="splash-screen"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-[99999] flex items-center justify-center bg-black"
          >
            <Loader />
          </motion.div>
        )}
      </AnimatePresence>

      {/* GLOBAL OVERLAYS */}
      <CyberBackground />
      <NoiseOverlay />
      
      {/* MAIN SECTIONS */}
      <Navbar />
      
      <main className="relative z-10 min-h-screen">
        <Routes>
          <Route path="/" element={
            <>
              <Hero onJoinClick={() => navigate('/cooking')} />
              <TechTicker />
              <About />
              <Perks />
              <Timeline />
              <Events />
              <FAQ />
            </>
          } />
          
          <Route path="/resources" element={<Resources />} />
          
          <Route path="/cooking" element={
            <div className="absolute inset-0 z-50 bg-black">
              <Cooking onBack={() => navigate('/')} />
            </div>
          } />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;