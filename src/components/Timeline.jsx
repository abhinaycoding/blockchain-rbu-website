import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Calendar, Code2, Users, Rocket } from 'lucide-react';
import HackerText from './HackerText';

const events = [
  {
    date: "Feb 7, 2024",
    title: "Web3Utsav",
    desc: "A major gathering celebrating Web3 innovations and creating awareness among the student community.",
    icon: Users,
    color: "text-neon-cyan",
    border: "border-neon-cyan",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=800" // Tech conference/gathering
  },
  {
    date: "Jan 16, 2025",
    title: "Primeverse",
    desc: "An exclusive tech symposium where we immersed in the next generation of decentralized technologies, complete with engaging tech games.",
    icon: Rocket,
    color: "text-neon-purple",
    border: "border-neon-purple",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800" // Space/Verse related
  },
  {
    date: "Oct 15, 2025",
    title: "Filecoin's 5th Birthday",
    desc: "Celebrating five years of decentralized storage with Filecoin. Workshops, talks, and community building.",
    icon: Calendar,
    color: "text-orange-500",
    border: "border-orange-500",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=800" // Server/Storage related
  },
  {
    date: "Jan 19, 2026",
    title: "Minequest",
    desc: "A competitive hackathon blending gaming, blockchain technology, and creative problem-solving, featuring events like Crypto Ludo and Treasure Hunt.",
    icon: Code2,
    color: "text-white",
    border: "border-white",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=800" // Gaming Setup
  }
];

const TimelineItem = ({ item, index }) => {
  const ref = useRef(null);
  
  // Track scroll position of this specific card
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Map scroll progress to a larger vertical translation (parallax effect)
  const y = useTransform(scrollYProgress, [0, 1], ["-25%", "25%"]);

  return (
    <motion.div 
      ref={ref}
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
        <div className={`relative overflow-hidden p-8 bg-black/10 backdrop-blur-sm border border-white/10 rounded-xl hover:border-opacity-50 transition-all duration-300 group ${item.border}`}>
          
          {/* Background Image Layer - Applied Parallax Here */}
          {item.image && (
            <div className="absolute inset-[-25%] z-0 overflow-hidden">
              <motion.img 
                src={item.image} 
                alt={item.title} 
                style={{ y }} 
                className="w-full h-full object-cover opacity-50 group-hover:opacity-80 transition-opacity duration-500"
              />
              {/* Gradient Overlay shifted to be darker only at the text areas */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent"></div>
            </div>
          )}

          {/* Date Badge */}
          <div className="relative z-10 inline-block px-3 py-1 mb-4 border border-white/20 rounded-full bg-black/60 backdrop-blur-sm">
            <span className={`font-mono text-xs ${item.color} tracking-widest uppercase`}>
              {item.date}
            </span>
          </div>

          {/* Content */}
          <div className="relative z-10">
            <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-400 transition-all">
              {item.title}
            </h3>
            <p className="text-gray-300 leading-relaxed text-sm md:text-base">
              {item.desc}
            </p>
          </div>

          {/* Icon Stamp */}
          <div className={`absolute top-6 right-6 z-10 opacity-20 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500 ${item.color}`}>
            <item.icon size={40} />
          </div>
        </div>
      </div>

    </motion.div>
  );
};

const Timeline = () => {
  return (
    <section id="events" className="relative py-24 bg-transparent overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-6 relative">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-bold font-syncopate text-white mb-4">
            <HackerText text="OUR " className="mr-4" /><span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-neon-purple">
              <HackerText text="JOURNEY" delay={200} />
            </span>
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
            <TimelineItem key={index} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Timeline;