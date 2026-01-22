import React from 'react';
import { Linkedin, Github } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

const Team = () => {
  const members = [
    { name: "Aryan Sharma", role: "President", color: "from-purple-500 to-blue-500" },
    { name: "Priya Patel", role: "Vice President", color: "from-cyan-500 to-blue-500" },
    { name: "Rohan Gupta", role: "Tech Lead", color: "from-green-500 to-cyan-500" },
    { name: "Sneha Reddy", role: "Event Manager", color: "from-pink-500 to-purple-500" },
  ];

  return (
    <section id="team" className="py-24 bg-dark">
      <div className="max-w-7xl mx-auto px-6">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold mb-4">Meet The <span className="text-neon-purple">Core Team</span></h2>
            <p className="text-gray-400">The students behind the initiative.</p>
          </div>
        </ScrollReveal>
        
        <div className="grid md:grid-cols-4 gap-8">
          {members.map((member, i) => (
            <ScrollReveal key={i}>
              <div className="group relative">
                {/* Photo Placeholder Card */}
                <div className="glass p-4 rounded-2xl text-center transition-transform duration-300 group-hover:-translate-y-2">
                  
                  {/* Circle Image Wrapper */}
                  <div className={`w-32 h-32 mx-auto mb-4 rounded-full p-1 bg-gradient-to-r ${member.color}`}>
                    <div className="w-full h-full rounded-full bg-gray-800 overflow-hidden">
                      {/* Using generic avatar API - Replace with real photos later */}
                      <img 
                        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${member.name}`} 
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
                  <p className="text-neon-cyan text-sm font-medium mb-4 uppercase tracking-wider">{member.role}</p>
                  
                  {/* Social Icons */}
                  <div className="flex justify-center gap-3 opacity-60 group-hover:opacity-100 transition-opacity">
                    <a href="#" className="hover:text-neon-purple"><Linkedin size={18} /></a>
                    <a href="#" className="hover:text-neon-purple"><Github size={18} /></a>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;