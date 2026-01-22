import React from 'react';
import { Twitter, Instagram, Linkedin, Github, Mail, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-black border-t border-white/10 pt-20 pb-10 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-px bg-gradient-to-r from-transparent via-neon-purple to-transparent opacity-50" />

      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-12 mb-16">
        
        {/* Brand Column */}
        <div className="col-span-1 md:col-span-2">
          <h2 className="font-display font-bold text-2xl tracking-tighter mb-6">
            BLOCK<span className="text-neon-cyan">CHAIN</span>_RBU
          </h2>
          <p className="text-gray-400 font-mono text-sm leading-relaxed max-w-sm mb-8">
            The premier student-led Web3 community. We are building the decentralized future, one block at a time.
          </p>
          <div className="flex gap-4">
             {/* Social Icons with Hover Glow */}
             {[
               { icon: <Instagram size={20} />, href: "https://www.instagram.com/blockchain_rbu" },
               { icon: <Linkedin size={20} />, href: "#" },
               { icon: <Twitter size={20} />, href: "#" },
               { icon: <Github size={20} />, href: "#" }
             ].map((social, i) => (
               <a 
                 key={i} 
                 href={social.href} 
                 className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-neon-purple hover:border-neon-purple transition-all duration-300"
               >
                 {social.icon}
               </a>
             ))}
          </div>
        </div>

        {/* Links Column */}
        <div>
          <h3 className="font-bold text-white mb-6 uppercase tracking-widest text-xs">Platform</h3>
          <ul className="space-y-4 font-mono text-sm text-gray-400">
            {['Home', 'About Us', 'Events', 'Projects', 'Team'].map((item) => (
              <li key={item}>
                <a href={`#${item.toLowerCase().split(' ')[0]}`} className="hover:text-neon-cyan transition-colors flex items-center gap-2 group">
                  <span className="w-0 group-hover:w-2 h-[1px] bg-neon-cyan transition-all duration-300" />
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Column */}
        <div>
          <h3 className="font-bold text-white mb-6 uppercase tracking-widest text-xs">Contact</h3>
          <ul className="space-y-4 font-mono text-sm text-gray-400">
            <li className="flex items-center gap-3">
              <Mail size={16} className="text-neon-purple" />
              <span>contact@blockchainrbu.in</span>
            </li>
            <li className="text-xs leading-relaxed opacity-70">
              RCOEM Campus,<br />
              Nagpur, Maharashtra,<br />
              India - 440013
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-mono text-gray-600">
        <p>© 2026 Blockchain RBU. Open Source Protocol.</p>
        <p className="flex items-center gap-2">
          Made with <Heart size={12} className="text-red-500 fill-red-500 animate-pulse" /> by Abhinay
        </p>
      </div>
    </footer>
  );
};

export default Footer;