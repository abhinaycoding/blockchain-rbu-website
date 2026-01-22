import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Code, Users, Rocket, Globe, Terminal, Cpu } from 'lucide-react';

// 1. The Single Card Component
const SpotlightCard = ({ icon: Icon, title, description }) => {
  const divRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e) => {
    if (!divRef.current) return;
    const div = divRef.current;
    const rect = div.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleFocus = () => {
    setOpacity(1);
  };

  const handleBlur = () => {
    setOpacity(0);
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleFocus}
      onMouseLeave={handleBlur}
      className="relative overflow-hidden rounded-xl border border-white/10 bg-white/5 px-8 py-12 shadow-2xl"
    >
      {/* The Spotlight Effect (The glowing gradient that follows mouse) */}
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(139, 92, 246, 0.15), transparent 40%)`,
        }}
      />
      
      {/* The Spotlight Border (Sharper line) */}
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(139, 92, 246, 0.4), transparent 40%)`,
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-start gap-4">
        <div className="rounded-lg bg-white/10 p-3 text-neon-purple ring-1 ring-white/20">
          <Icon size={24} />
        </div>
        <h3 className="text-xl font-bold text-white">{title}</h3>
        <p className="text-gray-400 leading-relaxed">{description}</p>
      </div>
    </div>
  );
};

// 2. The Main Section
const Perks = () => {
  const perks = [
    {
      icon: Code,
      title: "Hands-on Workshops",
      description: "Don't just watch tutorials. Build real dApps, Smart Contracts, and NFT marketplaces in our weekly coding jams."
    },
    {
      icon: Users,
      title: "Elite Network",
      description: "Connect with founders, VCs, and senior developers. Our alumni work at top protocols like Polygon and Solana."
    },
    {
      icon: Rocket,
      title: "Hackathon Squads",
      description: "Never hack alone. We form balanced teams (Dev + Design + Pitch) to dominate global web3 hackathons."
    },
    {
      icon: Globe,
      title: "Global Access",
      description: "Get free tickets to major crypto conferences (Token2049, ETHIndia) through our partnership program."
    },
    {
      icon: Terminal,
      title: "Dev Infrastructure",
      description: "Access our private RPC nodes and cloud credits. Build your startup idea without worrying about AWS bills."
    },
    {
      icon: Cpu,
      title: "Hardware Access",
      description: "Experiment with Ledger hardware wallets and Raspberry Pi nodes available in our campus lab."
    }
  ];

  return (
    <section className="bg-black py-24 relative overflow-hidden">
      {/* Decorative blurred blob in background */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-purple/20 rounded-full blur-[128px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="mb-16 max-w-2xl">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-white mb-4"
          >
            Why Join The Chapter?
          </motion.h2>
          <p className="text-lg text-gray-400">
            We provide the unfair advantage you need to break into the Web3 industry.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {perks.map((perk, index) => (
            <SpotlightCard key={index} {...perk} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Perks;