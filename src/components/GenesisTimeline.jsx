import React from 'react';
import { motion } from 'framer-motion';
import { Flag, Code, Globe, Trophy } from 'lucide-react';

const TimelineItem = ({ year, title, description, icon: Icon, index }) => {
  const isEven = index % 2 === 0;

  return (
    <div className={`flex flex-col md:flex-row items-center justify-between w-full mb-12 md:mb-24 ${isEven ? 'md:flex-row-reverse' : ''}`}>
      
      {/* 1. TEXT CONTENT (Responsive & Overflow Proof) */}
      <motion.div 
        initial={{ opacity: 0, x: isEven ? 50 : -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
        className="w-full md:w-5/12 mb-8 md:mb-0"
      >
        <div className={`p-6 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm relative overflow-hidden group hover:border-neon-purple/50 transition-colors ${isEven ? 'text-left' : 'md:text-right text-left'}`}>
          
          {/* Glowing hover background */}
          <div className="absolute inset-0 bg-gradient-to-r from-neon-purple/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          <span className="text-neon-cyan font-mono text-sm tracking-widest mb-2 block">{year}</span>
          <h3 className="text-2xl font-bold text-white mb-3 break-words">{title}</h3>
          <p className="text-gray-400 leading-relaxed break-words whitespace-normal">
            {description}
          </p>
        </div>
      </motion.div>

      {/* 2. CENTER ICON (The Pivot) */}
      <div className="relative flex items-center justify-center w-12 h-12 md:w-2/12 z-10">
        <div className="w-12 h-12 rounded-full bg-black border-2 border-neon-purple flex items-center justify-center shadow-[0_0_20px_rgba(168,85,247,0.5)]">
          <Icon size={20} className="text-white" />
        </div>
      </div>

      {/* 3. EMPTY SPACE (To balance the flex layout) */}
      <div className="hidden md:block w-5/12" />
    </div>
  );
};

const GenesisTimeline = () => {
  const events = [
    {
      year: "Q3 2024",
      title: "Genesis Block",
      description: "The chapter was founded by 5 students with a shared vision: to make Web3 accessible. We hosted our first 'Crypto 101' workshop with 50+ attendees.",
      icon: Flag
    },
    {
      year: "Q4 2024",
      title: "The First Hackathon",
      description: "We organized 'ChainReact', an internal 24-hour hackathon. 12 teams shipped projects ranging from NFT tickets to decentralized voting apps.",
      icon: Code
    },
    {
      year: "Q1 2025",
      title: "Mainnet Expansion",
      description: "Partnered with Polygon Guild and Solana Superteam. Our members started winning bounties at global hackathons like ETHIndia.",
      icon: Globe
    },
    {
      year: "Q2 2025",
      title: "National Recognition",
      description: "Awarded 'Best Student Chapter' at the National Web3 Summit. Launched our own open-source contribution program.",
      icon: Trophy
    }
  ];

  return (
    <section className="py-24 bg-black relative overflow-hidden">
      <div className="container mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">The Roadmap</h2>
          <div className="w-20 h-1 bg-neon-purple mx-auto rounded-full" />
        </div>

        <div className="relative">
          {/* The Vertical Line Background */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-1 bg-white/10 -ml-0.5 md:-ml-0.5" />
          
          {/* The Moving Gradient Line (Animated) */}
          <motion.div 
            className="absolute left-6 md:left-1/2 top-0 w-1 bg-gradient-to-b from-neon-cyan via-neon-purple to-transparent -ml-0.5 md:-ml-0.5 shadow-[0_0_15px_rgba(0,243,255,0.5)]"
            initial={{ height: "0%" }}
            whileInView={{ height: "100%" }}
            transition={{ duration: 2, ease: "easeInOut" }}
            viewport={{ once: true }}
          />

          {/* Render Timeline Items */}
          {events.map((event, index) => (
            <TimelineItem key={index} {...event} index={index} />
          ))}
        </div>

      </div>
    </section>
  );
};

export default GenesisTimeline;