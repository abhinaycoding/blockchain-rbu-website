import React, { useEffect, useState } from 'react';
import Lenis from 'lenis';
import { AnimatePresence } from 'framer-motion'; 

// IMPORT COMPONENTS
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TechTicker from './components/TechTicker';
import About from './components/About';
import Perks from './components/Perks';
import Timeline from './components/Timeline';
import Events from './components/Events';
import Team from './components/Team';
import FAQ from './components/FAQ';
import JoinForm from './components/JoinForm';
import Footer from './components/Footer';
import NoiseOverlay from './components/NoiseOverlay';
import VelocityScroll from './components/VelocityScroll';
import Preloader from './components/Preloader'; 
import Cooking from './components/Cooking'; // <--- 1. IMPORT THIS

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentView, setCurrentView] = useState('home'); // <--- 2. ADD VIEW STATE

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

  // 3. IF VIEW IS 'COOKING', RENDER ONLY THAT PAGE
  if (currentView === 'cooking') {
    return (
      <>
        <NoiseOverlay />
        <Cooking onBack={() => setCurrentView('home')} />
      </>
    );
  }

  // 4. OTHERWISE RENDER THE MAIN WEBSITE
  return (
    <div className="bg-black min-h-screen text-white selection:bg-neon-cyan selection:text-black">
      
      {/* PRELOADER LOGIC */}
      <AnimatePresence mode='wait'>
        {isLoading && (
          <Preloader onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      {/* GLOBAL OVERLAYS */}
      <NoiseOverlay />
      
      {/* MAIN SECTIONS */}
      <Navbar />
      
      <main className="relative z-10">
        
        {/* 5. PASS THE CLICK HANDLER TO HERO */}
        <Hero onJoinClick={() => setCurrentView('cooking')} />
        
        <VelocityScroll />
        <TechTicker />
        <About />
        <Perks />
        <Timeline />
        <Events />
        <Team />
        <FAQ />
        <JoinForm />
      </main>

      <Footer />
    </div>
  );
}

export default App;