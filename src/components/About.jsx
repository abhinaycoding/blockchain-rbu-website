import React from 'react';
import { Target, Lightbulb } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

const About = () => {
  return (
    <section id="about" className="py-24 relative bg-darker">
      <div className="max-w-7xl mx-auto px-6">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold mb-4">About The <span className="text-neon-cyan">Chapter</span></h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              We are the official student body dedicated to exploring blockchain technology.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Mission Card */}
          <ScrollReveal>
            <div className="glass p-8 rounded-2xl border-t-4 border-neon-purple hover:bg-white/5 transition-all h-full">
              <div className="w-12 h-12 bg-neon-purple/20 rounded-lg flex items-center justify-center mb-6 text-neon-purple">
                <Target size={24} />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">Our Mission</h3>
              <p className="text-gray-400 leading-relaxed">
                To build a vibrant ecosystem where students can learn, experiment, and innovate with decentralized technologies. We aim to bridge the gap between academic theory and industry application through hands-on projects.
              </p>
            </div>
          </ScrollReveal>

          {/* Vision Card */}
          <ScrollReveal>
            <div className="glass p-8 rounded-2xl border-t-4 border-neon-cyan hover:bg-white/5 transition-all h-full">
              <div className="w-12 h-12 bg-neon-cyan/20 rounded-lg flex items-center justify-center mb-6 text-neon-cyan">
                <Lightbulb size={24} />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">Our Vision</h3>
              <p className="text-gray-400 leading-relaxed">
                To be the leading student hub for Web3 innovation, producing world-class developers and leaders who will shape the future of the decentralized internet.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default About;