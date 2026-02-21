import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Terminal, Code, Database, ExternalLink } from 'lucide-react';
import HackerText from './HackerText';

const resourceCategories = [
  {
    title: "Web3 Fundamentals",
    icon: BookOpen,
    color: "text-neon-cyan",
    border: "border-neon-cyan/50 hover:border-neon-cyan",
    bgHover: "hover:bg-neon-cyan/10",
    links: [
      { name: "Ethereum Org Learning", url: "https://ethereum.org/en/developers/docs/" },
      { name: "Web3 University", url: "https://www.web3.university/" },
      { name: "Binance Academy", url: "https://academy.binance.com/en" }
    ]
  },
  {
    title: "Smart Contracts (Solidity)",
    icon: Terminal,
    color: "text-neon-purple",
    border: "border-neon-purple/50 hover:border-neon-purple",
    bgHover: "hover:bg-neon-purple/10",
    links: [
      { name: "CryptoZombies (Interactive)", url: "https://cryptozombies.io/" },
      { name: "Solidity by Example", url: "https://solidity-by-example.org/" },
      { name: "Remix IDE", url: "https://remix.ethereum.org/" }
    ]
  },
  {
    title: "Frontend & Web3.js",
    icon: Code,
    color: "text-orange-500",
    border: "border-orange-500/50 hover:border-orange-500",
    bgHover: "hover:bg-orange-500/10",
    links: [
      { name: "Ethers.js Docs", url: "https://docs.ethers.org/v6/" },
      { name: "Web3.js Docs", url: "https://web3js.readthedocs.io/" },
      { name: "useDApp", url: "https://usedapp.io/" }
    ]
  },
  {
    title: "Development Tools",
    icon: Database,
    color: "text-white",
    border: "border-white/50 hover:border-white",
    bgHover: "hover:bg-white/10",
    links: [
      { name: "Hardhat", url: "https://hardhat.org/" },
      { name: "Foundry", url: "https://book.getfoundry.sh/" },
      { name: "Alchemy (Nodes/APIs)", url: "https://www.alchemy.com/" }
    ]
  }
];

const Resources = () => {
  return (
    <section id="resources" className="relative py-24 bg-black overflow-hidden relative z-10">
      
      {/* Background Ambience */}
      <div className="absolute top-0 right-[-10%] w-[500px] h-[500px] bg-neon-purple/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 left-[-10%] w-[500px] h-[500px] bg-neon-cyan/5 rounded-full blur-[120px]" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-bold font-syncopate text-white mb-4"
          >
            <HackerText text="LEARNING " className="mr-4" /><span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-neon-purple">
              <HackerText text="RESOURCES" delay={200} />
            </span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 font-mono tracking-widest uppercase text-xs md:text-sm"
          >
            // Master the decentralized web
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {resourceCategories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className={`p-6 bg-black/40 backdrop-blur-md border ${category.border} rounded-xl transition-all duration-300 ${category.bgHover} group`}
            >
              <div className={`mb-6 ${category.color}`}>
                <category.icon size={40} className="group-hover:scale-110 transition-transform duration-300" />
              </div>
              
              <h3 className="text-xl font-bold text-white mb-4">
                {category.title}
              </h3>
              
              <ul className="space-y-3">
                {category.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a 
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors group/link"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-gray-600 group-hover/link:bg-white transition-colors" />
                      {link.name}
                      <ExternalLink size={12} className="opacity-0 -translate-x-2 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all" />
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Resources;
