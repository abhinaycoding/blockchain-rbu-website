import React from 'react';
import { Cpu, Globe, Code, Shield } from 'lucide-react';
import SpotlightCard from './SpotlightCard';

const Features = () => {
  const items = [
    { icon: <Cpu />, title: "SMART CONTRACTS", desc: "Solidity & Rust primitives." },
    { icon: <Globe />, title: "DEFI PROTOCOLS", desc: "Yield farming & Liquidity." },
    { icon: <Shield />, title: "ZK-ROLLUPS", desc: "Privacy scaling layers." },
    { icon: <Code />, title: "FULL STACK WEB3", desc: "React + Wagmi + Ethers." },
  ];

  return (
    <section className="py-24 px-6 max-w-7xl mx-auto">
      <h2 className="text-4xl font-display font-bold mb-16 text-center">
        CORE <span className="text-neon-cyan">MODULES</span>
      </h2>

      <div className="grid md:grid-cols-4 gap-6">
        {items.map((item, i) => (
          <SpotlightCard key={i} className="group hover:border-neon-cyan/50 transition-colors duration-500">
            {/* Icon with Neon Glow on Hover */}
            <div className="text-neon-purple mb-6 group-hover:text-neon-cyan group-hover:scale-110 group-hover:drop-shadow-[0_0_8px_rgba(0,243,255,0.5)] transition-all duration-300">
              {item.icon}
            </div>
            
            <h3 className="font-display font-bold text-xl mb-2 tracking-wide">{item.title}</h3>
            <p className="text-gray-400 font-mono text-sm leading-relaxed">{item.desc}</p>
            
            {/* Corner Tech Accent */}
            <div className="absolute top-0 right-0 w-0 h-0 border-t-[20px] border-r-[20px] border-t-transparent border-r-neon-cyan/10 group-hover:border-r-neon-cyan transition-all duration-300" />
          </SpotlightCard>
        ))}
      </div>
    </section>
  );
};

export default Features;