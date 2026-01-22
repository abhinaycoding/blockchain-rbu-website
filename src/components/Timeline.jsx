import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Code2, Users, Rocket } from 'lucide-react';

const events = [
  {
    date: "Sep 2025",
    title: "Genesis Block",
    desc: "The Blockchain RBU Chapter is officially initialized. Core team assembled and first roadmap drafted.",
    icon: Users,
    color: "text-neon-cyan",
    border: "border-neon-cyan"
  },
  {
    date: "Jan 10, 2026",
    title: "Hackathon Victory",
    desc: "Built an offline-first Billing System using Firebase in a grueling 24-hour hackathon sprint.",
    icon: Code2,
    color: "text-neon-purple",
    border: "border-neon-purple"
  },
  {
    date: "Jan 19, 2026",
    title: "AI Integration",
    desc: "Launched 'Startup Idea Finder', merging React, Vite, and AI to generate business concepts instantly.",
    icon: Rocket,
    color: "text-orange-500",
    border: "border-orange-500"
  },
  {
    date: "Coming Soon",
    title: "Web3 Summit",
    desc: "Preparing for the largest decentralized tech meetup in the region. Speakers, workshops, and networking.",
    icon: Calendar,
    color: "text-white",
    border: "border-white"
  }
];

const Timeline = () => {
  return (
    <section id="events" className="relative py-24 bg-black overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-6 relative">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-bold font-syncopate text-white mb-4">
            OUR <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-neon-purple">JOURNEY</span>
          </h2>
          <p className="text-gray-400 font-mono tracking-widest uppercase text-xs md:text-sm">
            // Executing Roadmap V.1.0
          </p>
        </div>

        {/* --- THE TIMELINE SPINE --- */}
        {/* Desktop: Center Line */}
        <div className="hidden md:block absolute left-1/2 top-32 bottom-20 w-px bg-gradient-to-b from-transparent via-neon-cyan to-transparent -translate-x-1/2 opacity-30"></div>
        
        {/* Mobile: Left Line */}
        <div className="md:hidden absolute left-10 top-32 bottom-0 w-px bg-gradient-to-b from-transparent via-neon-purple to-transparent opacity-30"></div>

        {/* --- EVENTS --- */}
        <div className="space-y-12 md:space-y-24">
          {events.map((item, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: index * 0.1 }}
              className={`relative flex items-center ${
                index % 2 === 0 ? "md:justify-start" : "md:justify-end"
              }`}
            >
              {/* THE DOT (Connector) */}
              <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-black border-2 border-white z-10 -translate-x-1/2 shadow-[0_0_15px_white]">
                <div className={`absolute inset-0 rounded-full animate-ping opacity-20 ${item.color.replace('text-', 'bg-')}`} />
              </div>

              {/* THE CARD */}
              <div className={`
                relative w-full md:w-[45%] pl-16 md:pl-0 
                ${index % 2 === 0 ? "md:pr-12 text-left" : "md:pl-12 text-left"}
              `}>
                <div className={`p-8 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl hover:border-opacity-50 transition-all duration-300 group ${item.border}`}>
                  
                  {/* Date Badge */}
                  <div className="inline-block px-3 py-1 mb-4 border border-white/20 rounded-full bg-black/50">
                    <span className={`font-mono text-xs ${item.color} tracking-widest uppercase`}>
                      {item.date}
                    </span>
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-400 transition-all">
                    {item.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed text-sm md:text-base">
                    {item.desc}
                  </p>

                  {/* Icon Stamp */}
                  <div className={`absolute top-6 right-6 opacity-20 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500 ${item.color}`}>
                    <item.icon size={40} />
                  </div>
                </div>
              </div>

            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Timeline;