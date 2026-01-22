import React, { useEffect, useState } from 'react';
import Lenis from 'lenis';
import { AnimatePresence } from 'framer-motion'; 

// IMPORT COMPONENTS
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TechTicker from './components/TechTicker';
import About from './components/About';
import Perks from './components/Perks';
import GenesisTimeline from './components/GenesisTimeline';
import Events from './components/Events';
import Team from './components/Team';
import FAQ from './components/FAQ';
import JoinForm from './components/JoinForm';
import Footer from './components/Footer';
import NoiseOverlay from './components/NoiseOverlay';
import VelocityScroll from './components/VelocityScroll';

// <--- CHANGED: Import the new Preloader
import Preloader from './components/Preloader'; 

function App() {
  // STATE: Controls if Preloader is visible
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
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

  return (
    <div className="bg-black min-h-screen text-white selection:bg-neon-cyan selection:text-black">
      
      {/* PRELOADER LOGIC */}
      <AnimatePresence mode='wait'>
        {isLoading && (
          // <--- CHANGED: Use Preloader component
          <Preloader onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      {/* GLOBAL OVERLAYS */}
      <NoiseOverlay />
      
      {/* MAIN SECTIONS */}
      <Navbar />
      <Hero />
      <VelocityScroll />
      <TechTicker />
      <About />
      <Perks />
      <GenesisTimeline />
      <Events />
      <Team />
      <FAQ />
      <JoinForm />
      <Footer />
    </div>
  );
}

export default App;