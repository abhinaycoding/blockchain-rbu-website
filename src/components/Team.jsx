import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

// --- TEAM DATA (7 Members) ---
const team = [
  {
    name: "Aryan Sharma",
    role: "President",
    tags: ["LEADERSHIP", "STRATEGY"],
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1287&auto=format&fit=crop",
    link: "#"
  },
  {
    name: "Riya Patel",
    role: "Tech Lead",
    tags: ["SOLIDITY", "RUST"],
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1288&auto=format&fit=crop",
    link: "#"
  },
  {
    name: "David Chen",
    role: "Events Lead",
    tags: ["MANAGEMENT", "LOGISTICS"],
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1287&auto=format&fit=crop",
    link: "#"
  },
  {
    name: "Sarah Kim",
    role: "Marketing Lead",
    tags: ["BRANDING", "PR"],
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1364&auto=format&fit=crop",
    link: "#"
  },
  {
    name: "Arjun Verma",
    role: "Content Lead",
    tags: ["CREATIVE", "MEDIA"],
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1287&auto=format&fit=crop",
    link: "#"
  },
  {
    name: "Zara Khan",
    role: "Socials Lead",
    tags: ["COMMUNITY", "GROWTH"],
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1287&auto=format&fit=crop",
    link: "#"
  },
  {
    name: "Ishan Roy",
    role: "Graphics Lead",
    tags: ["DESIGN", "BLENDER"],
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1287&auto=format&fit=crop", // Replace with real photo
    link: "#"
  }
];

const TeamCard = ({ member, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      // RESPONSIVE WIDTHS: 
      // Mobile: 100% | Tablet: 45% | Desktop: 30%
      className="group relative w-full md:w-[45%] lg:w-[30%] perspective-1000"
    >
      {/* CARD CONTAINER - Premium Glassmorphism */}
      <div className="relative overflow-hidden bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl aspect-[3/4] transition-all duration-500 hover:border-orange-500 hover:shadow-[0_0_30px_rgba(249,115,22,0.15)]">
        
        {/* IMAGE: Zoom & Color on Hover */}
        <div className="absolute inset-0 overflow-hidden">
          <img 
            src={member.image} 
            alt={member.name}
            className="w-full h-full object-cover transition-all duration-700 ease-out filter grayscale contrast-125 opacity-70 group-hover:opacity-100 group-hover:grayscale-0 group-hover:scale-110"
          />
          {/* Subtle Grid Overlay tightly bound to image */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:20px_20px] mix-blend-overlay opacity-50 pointer-events-none group-hover:opacity-0 transition-opacity duration-500" />
        </div>

        {/* TOP TAGS (Floating) */}
        <div className="absolute top-4 left-4 flex flex-wrap gap-2 opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 z-20">
          {member.tags.map((tag, i) => (
            <span key={i} className="px-2 py-1 bg-white/10 backdrop-blur-md border border-white/20 text-[9px] font-mono text-white tracking-widest uppercase rounded">
              {tag}
            </span>
          ))}
        </div>

        {/* BOTTOM GLASS PANEL */}
        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black via-black/90 to-transparent pt-16 pb-6 px-6 z-10 transition-all duration-500 group-hover:pb-8 group-hover:from-black group-hover:via-black/95">
          
          <div className="border-l-2 border-orange-500 pl-4 transition-colors duration-500">
             <h3 className="text-2xl font-bold text-white uppercase tracking-tighter leading-none mb-1 group-hover:text-orange-400 transition-colors duration-300">
               {member.name}
             </h3>
             <p className="text-xs font-mono text-gray-400 tracking-widest uppercase group-hover:text-white transition-colors duration-300">
               {member.role}
             </p>
          </div>

          {/* Social Icons */}
          <div className="absolute right-6 bottom-6 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-100">
             <a href={member.link} className="w-10 h-10 rounded-full bg-orange-500 text-black flex items-center justify-center hover:bg-white hover:scale-110 transition-all shadow-[0_0_15px_rgba(249,115,22,0.5)] hover:shadow-[0_0_20px_rgba(255,255,255,0.6)]">
               <ArrowUpRight size={20} className="group-hover:rotate-45 transition-transform duration-300" />
             </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Team = () => {
  return (
    <section id="team" className="py-32 bg-transparent text-white relative z-10">
      
      {/* Background Ambience (Subtle Orange glow for the team section) */}
      <div className="absolute left-[10%] bottom-0 w-[500px] h-[500px] bg-orange-600/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute right-[10%] top-[20%] w-[400px] h-[400px] bg-teal-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* SECTION HEADER */}
        <div className="flex flex-col md:flex-row items-end justify-between gap-8 mb-24 border-b border-white/10 pb-8">
          <div>
            <span className="block text-orange-500 font-mono text-xs tracking-[0.3em] mb-4">
              /// EST. 2024
            </span>
            <h2 className="text-6xl md:text-8xl font-bold tracking-tighter leading-none text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">
              MEET THE <br />
              <span className="text-white">COUNCIL</span>
            </h2>
          </div>
          <p className="max-w-sm text-gray-400 font-mono text-xs md:text-sm leading-relaxed text-right uppercase tracking-widest border-r-2 border-orange-500 pr-4">
            The operators behind the protocol. <br />
            Orchestrating the decentralized future.
          </p>
        </div>

        {/* TEAM GRID REPLACED WITH CENTERED FLEXBOX */}
        {/* This ensures the 7th member is centered in the last row */}
        <div className="flex flex-wrap justify-center gap-8">
          {team.map((member, i) => (
            <TeamCard key={i} member={member} index={i} />
          ))}
        </div>

      </div>
    </section>
  );
};

export default Team;