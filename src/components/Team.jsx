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
      // This allows the flexbox to wrap and center the last item perfectly.
      className="group relative w-full md:w-[45%] lg:w-[30%]"
    >
      {/* CARD CONTAINER */}
      <div className="relative overflow-hidden bg-gray-900 aspect-[3/4]">
        
        {/* IMAGE: Zoom & Color on Hover */}
        <img 
          src={member.image} 
          alt={member.name}
          className="w-full h-full object-cover transition-all duration-700 ease-out filter grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-110"
        />

        {/* TOP TAGS (Floating) */}
        <div className="absolute top-4 left-4 flex flex-wrap gap-2 opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 z-20">
          {member.tags.map((tag, i) => (
            <span key={i} className="px-2 py-1 bg-black/50 backdrop-blur-md border border-white/20 text-[9px] font-mono text-white tracking-widest uppercase">
              {tag}
            </span>
          ))}
        </div>

        {/* BOTTOM GLASS PANEL */}
        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black via-black/80 to-transparent pt-12 pb-6 px-6 z-10 transition-all duration-300 group-hover:pb-8">
          
          <div className="border-l-2 border-orange-500 pl-4">
             <h3 className="text-2xl font-bold text-white uppercase tracking-tighter leading-none mb-1">
               {member.name}
             </h3>
             <p className="text-xs font-mono text-gray-400 tracking-widest uppercase">
               {member.role}
             </p>
          </div>

          {/* Social Icons */}
          <div className="absolute right-6 bottom-6 opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 delay-75">
             <a href={member.link} className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center hover:bg-orange-500 hover:text-white transition-colors">
               <ArrowUpRight size={20} />
             </a>
          </div>
        </div>

      </div>

      {/* HOVER BORDER EFFECT */}
      <div className="absolute inset-0 border border-white/0 group-hover:border-white/10 transition-colors duration-300 pointer-events-none" />
    </motion.div>
  );
};

const Team = () => {
  return (
    <section id="team" className="py-32 bg-black text-white relative">
      
      {/* Background Ambience */}
      <div className="absolute left-0 bottom-0 w-full h-1/2 bg-gradient-to-t from-orange-900/10 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        
        {/* SECTION HEADER */}
        <div className="flex flex-col md:flex-row items-end justify-between gap-8 mb-24 border-b border-white/10 pb-8">
          <div>
            <span className="block text-orange-500 font-mono text-xs tracking-[0.3em] mb-4">
              /// EST. 2024
            </span>
            <h2 className="text-6xl md:text-8xl font-bold tracking-tighter leading-none">
              THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-500 to-white">COUNCIL</span>
            </h2>
          </div>
          <p className="max-w-sm text-gray-500 font-mono text-xs md:text-sm leading-relaxed text-right uppercase tracking-widest">
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