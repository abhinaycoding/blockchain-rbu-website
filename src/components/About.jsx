import React from 'react';
import { Target, Lightbulb } from 'lucide-react';
import ScrollReveal from './ScrollReveal';
import HackerText from './HackerText';

const About = () => {
  return (
    <section id="about" className="py-24 relative bg-transparent z-10">
      <div className="max-w-7xl mx-auto px-6">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold mb-4">
              <HackerText text="About The " className="mr-2" />
              <span className="text-neon-cyan"><HackerText text="Chapter" delay={200} /></span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              We are the official student body dedicated to exploring blockchain technology.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Mission Card - Minimalist Fintech Look */}
          <ScrollReveal>
            <div className="group relative w-full h-full bg-[#050505] border border-white/5 rounded-3xl p-8 overflow-hidden hover:border-white/20 transition-colors duration-500">
              
              {/* Subtle Noise / Grain Overlay */}
              <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-overlay" />
              
              <div className="relative z-10 flex flex-col h-full justify-between">
                <div>
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center bg-white/5 text-gray-400 group-hover:text-white group-hover:border-white/30 transition-all duration-500">
                      <Target size={20} strokeWidth={1.5} />
                    </div>
                    <span className="font-mono text-xs uppercase tracking-[0.2em] text-gray-500">
                      Objective_01
                    </span>
                  </div>
                  
                  <h3 className="text-3xl font-display font-medium text-white mb-6">
                    Our Mission
                  </h3>
                  
                  <p className="text-gray-400 font-sans leading-relaxed text-sm md:text-base pr-4">
                    To build a vibrant ecosystem where students can learn, experiment, and innovate with decentralized technologies. We aim to bridge the gap between academic theory and industry application through hands-on projects and rigorous technical research.
                  </p>
                </div>
                
                {/* Decorative Bottom Line that expands on hover */}
                <div className="w-0 h-[2px] bg-white mt-12 group-hover:w-full transition-all duration-700 ease-out opacity-20 group-hover:opacity-100" />
              </div>
            </div>
          </ScrollReveal>

          {/* Vision Card - Minimalist Fintech Look */}
          <ScrollReveal>
            <div className="group relative w-full h-full bg-[#050505] border border-white/5 rounded-3xl p-8 overflow-hidden hover:border-orange-500/50 transition-colors duration-500">
              
              {/* Subtle Noise / Grain Overlay */}
              <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-overlay" />
              
              <div className="relative z-10 flex flex-col h-full justify-between">
                <div>
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center bg-white/5 text-gray-400 group-hover:text-orange-500 group-hover:border-orange-500/50 transition-all duration-500">
                      <Lightbulb size={20} strokeWidth={1.5} />
                    </div>
                    <span className="font-mono text-xs uppercase tracking-[0.2em] text-gray-500">
                      Objective_02
                    </span>
                  </div>
                  
                  <h3 className="text-3xl font-display font-medium text-white mb-6">
                    Our Vision
                  </h3>
                  
                  <p className="text-gray-400 font-sans leading-relaxed text-sm md:text-base pr-4">
                    To be the leading student hub for Web3 innovation, producing world-class developers and leaders who will shape the exact consensus mechanisms and tokenomics of the future decentralized internet.
                  </p>
                </div>

                {/* Decorative Bottom Line that expands on hover */}
                <div className="w-0 h-[2px] bg-orange-500 mt-12 group-hover:w-full transition-all duration-700 ease-out opacity-20 group-hover:opacity-100" />
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default About;