import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Preloader = ({ onComplete }) => {
  const [clicked, setClicked] = useState(false);
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState("INITIALIZING NODE CORE...");
  const [isReady, setIsReady] = useState(false);

  // Fake Loading Sequence
  useEffect(() => {
    const messages = [
      "ESTABLISHING SECURE HANDSHAKE...",
      "SYNCING BLOCKCHAIN LEDGERS...",
      "VERIFYING SMART CONTRACT INTEGRITY...",
      "DECENTRALIZED ACCESS GRANTED"
    ];
    let msgIndex = 0;
    
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsReady(true);
          return 100;
        }
        
        // Update text based on progress thresholds
        if (prev > 25 && msgIndex === 0) { msgIndex = 1; setLoadingText(messages[msgIndex]); }
        if (prev > 50 && msgIndex === 1) { msgIndex = 2; setLoadingText(messages[msgIndex]); }
        if (prev > 85 && msgIndex === 2) { msgIndex = 3; setLoadingText(messages[msgIndex]); }

        // Random jump increments for realism (slow at end)
        const increment = prev > 80 ? Math.random() * 3 + 1 : Math.random() * 12 + 2;
        return Math.min(prev + increment, 100); 
      });
    }, 150);

    return () => clearInterval(interval);
  }, []);

  const handleEnter = () => {
    if (!isReady || clicked) return;
    setClicked(true);
    
    // Implosion delay before doors sweep open
    setTimeout(() => {
      onComplete();
    }, 1600); // Extended slightly for cinematic exit
  };

  // Generate background connecting nodes
  const nodes = Array.from({ length: 25 });

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#010203] overflow-hidden font-sans">
      
      {/* PREMIUM DEEP AMBIENT LIGHTING */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-neon-cyan/5 rounded-full blur-[120px] will-change-transform transform-gpu" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-[#010203] rounded-full blur-[50px] z-10" /> {/* Inner dark void */}
      </div>

      {/* SUBTLE DOTTED GRID */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(#00f3ff1a_1px,transparent_1px)] bg-[size:40px_40px] opacity-20 [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_80%,transparent_100%)]"></div>

      {/* FLOATING PARTICLES */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {nodes.map((_, i) => (
          <motion.div
            key={`node-${i}`}
            initial={{ opacity: 0, scale: Math.random() * 0.5 + 0.5, x: Math.random() * 400 - 200, y: Math.random() * 400 - 200 }}
            animate={clicked ? {
              // IMPLOSION EFFECT: All particles get sucked into the center rapidly
              x: 0,
              y: 0,
              scale: 0,
              opacity: 0,
            } : { 
              opacity: [0, 0.5, 0],
              y: [Math.random() * 200 - 100, Math.random() * -200 + 100],
            }}
            transition={clicked ? {
              duration: 0.6 + Math.random() * 0.2, ease: "anticipate"
            } : {
              duration: 15 + Math.random() * 15,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute top-1/2 left-1/2 w-[1px] h-[1px] bg-neon-cyan rounded-full shadow-[0_0_5px_#00ffff]"
            style={{
              marginLeft: `${(Math.random() - 0.5) * 80}vw`,
              marginTop: `${(Math.random() - 0.5) * 80}vh`,
            }}
          />
        ))}
      </div>

      {/* MAIN CONTAINER: Implodes on Click */}
      <AnimatePresence>
        {!clicked && (
          <motion.div
            exit={{ scale: 0.01, opacity: 0, filter: "brightness(5) blur(20px)" }} // Cinematic Collapse
            transition={{ duration: 0.7, ease: [0.87, 0, 0.13, 1] }} 
            className="relative z-20 flex flex-col items-center justify-center w-full max-w-lg px-6"
          >

            {/* PREMIUM 3D WIREFRAME SPHERE */}
            <div className="relative w-40 h-40 md:w-48 md:h-48 mb-16 flex items-center justify-center perspective-[1000px]">
              
              {/* Outer Slow Ring */}
              <motion.div 
                animate={{ rotateZ: 360, rotateX: 20 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 border-[1px] border-white/5 rounded-full"
              />
              
              {/* Middle dashed orbit */}
              <motion.div 
                animate={{ rotateZ: -360, rotateY: 45 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="absolute inset-4 border-[1px] border-dashed border-neon-cyan/20 rounded-full"
              />
              
              {/* Central Glowing Core Structure */}
              <motion.div
                animate={{ 
                  rotateY: [0, 360], 
                  rotateX: [0, 180] 
                }}
                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                className="w-16 h-16 md:w-20 md:h-20 border-[1px] border-neon-cyan/40 bg-neon-cyan/5 relative flex items-center justify-center shadow-[inset_0_0_20px_rgba(0,243,255,0.2)]"
                style={{ transformStyle: 'preserve-3d' }}
              >
                 <div className="absolute inset-0 border-[1px] border-neon-purple/40 transform rotate-45"></div>
                 <div className="absolute inset-0 border-[1px] border-white/20 transform rotate-90"></div>
                 {/* Intense inner light */}
                 <div className="w-2 h-2 bg-white rounded-full shadow-[0_0_20px_#00ffff,0_0_40px_#b026ff]"></div>
              </motion.div>
            </div>

            {/* PREMIUM TYPOGRAPHY LOADING AREA */}
            <div className="w-full text-center flex flex-col items-center">
              
              {/* Tracked out loading text */}
              <div className="w-full max-w-[320px] text-[10px] md:text-[11px] text-white/50 font-mono tracking-[0.3em] mb-4 uppercase h-[15px] flex justify-center">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={loadingText}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.3 }}
                  >
                    {loadingText}
                  </motion.span>
                </AnimatePresence>
              </div>

              {/* Ultra Thin Progress Bar */}
              <div className="w-full max-w-[280px] h-[1px] bg-white/10 relative overflow-hidden mb-12">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ ease: "easeOut", duration: 0.3 }}
                  className="absolute top-0 left-0 h-full bg-white shadow-[0_0_10px_#ffffff]"
                />
              </div>

              {/* PREMIUM ENTER BUTTON */}
              <motion.button
                onClick={handleEnter}
                disabled={!isReady}
                animate={isReady ? { 
                  opacity: 1, 
                  y: 0,
                  filter: "brightness(1) blur(0px)"
                } : { 
                  opacity: 0.2, 
                  y: 10,
                  filter: "brightness(0.5) blur(2px)"
                }}
                whileHover={isReady ? { 
                  scale: 1.02, 
                  backgroundColor: "rgba(255,255,255,0.03)",
                  boxShadow: "0 0 30px rgba(0,243,255,0.15)"
                } : {}}
                whileTap={isReady ? { scale: 0.98 } : {}}
                className={`
                  relative px-12 py-4 border-[1px] rounded-sm font-sans tracking-[0.4em] text-xs md:text-sm uppercase transition-all duration-500 overflow-hidden group
                  ${!isReady ? 'cursor-not-allowed border-white/5 text-transparent' : 'cursor-pointer border-neon-cyan/30 text-white backdrop-blur-md'}
                `}
              >
                {/* Reveal sweep on hover */}
                {isReady && (
                   <div className="absolute inset-0 bg-gradient-to-r from-transparent via-neon-cyan/10 to-transparent -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-1000 ease-in-out" />
                )}

                {/* Corner Accents */}
                <span className="absolute top-0 left-0 w-2 h-[1px] bg-neon-cyan/80"></span>
                <span className="absolute top-0 left-0 w-[1px] h-2 bg-neon-cyan/80"></span>
                <span className="absolute bottom-0 right-0 w-2 h-[1px] bg-neon-cyan/80"></span>
                <span className="absolute bottom-0 right-0 w-[1px] h-2 bg-neon-cyan/80"></span>
                
                <span className={`relative z-10 transition-colors duration-300 ${isReady ? 'group-hover:text-neon-cyan' : ''}`}>
                  {isReady ? 'ENTER BRC' : `${progress}%`}
                </span>
              </motion.button>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FLASH & SWEEP EXIT ANIMATION */}
      <AnimatePresence>
        {clicked && (
          <>
            {/* The bright implosion flash */}
            <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: [0, 1, 0] }}
               transition={{ duration: 0.4, times: [0, 0.5, 1], ease: "easeOut" }}
               className="fixed inset-0 bg-white z-[150] pointer-events-none mix-blend-screen"
            />
            
            {/* The sleek vault doors */}
            <motion.div
              initial={{ y: 0 }}
              animate={{ y: "-100%" }}
              transition={{ duration: 0.9, ease: [0.87, 0, 0.13, 1], delay: 0.4 }}
              className="fixed top-0 left-0 w-full h-[50vh] bg-[#010203] z-[100] border-b-[1px] border-white/5"
            />
            <motion.div
              initial={{ y: 0 }}
              animate={{ y: "100%" }}
              transition={{ duration: 0.9, ease: [0.87, 0, 0.13, 1], delay: 0.4 }}
              className="fixed bottom-0 left-0 w-full h-[50vh] bg-[#010203] z-[100] border-t-[1px] border-white/5"
            />
          </>
        )}
      </AnimatePresence>

    </div>
  );
};

export default Preloader;