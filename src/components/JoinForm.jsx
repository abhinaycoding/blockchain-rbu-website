import React, { useState } from 'react';
import HoloCard from './HoloCard';

const JoinForm = () => {
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [status, setStatus] = useState('idle');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    setStatus('loading');
    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', email: '' });
      setTimeout(() => setStatus('idle'), 3000);
    }, 2000);
  };

  return (
    <section id="join" className="py-24 px-6 relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* LEFT: The Input Form */}
          <div>
            <div className="font-mono mb-8">
               <h2 className="text-4xl font-display font-bold mb-4">
                 GET YOUR <span className="text-neon-cyan">PASS</span>
               </h2>
               <p className="text-gray-400">
                 Join the elite circle of blockchain developers. 
                 Fill out the form to generate your digital membership.
               </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 font-mono">
              <div className="relative group">
                <label className="block text-xs text-neon-purple mb-2 ml-1 group-focus-within:text-neon-cyan transition-colors">FULL NAME</label>
                <input 
                  type="text" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-black/50 border border-white/20 p-4 rounded-lg focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan focus:outline-none text-white transition-all" 
                  placeholder="Ex: Aryan Sharma"
                  maxLength={20}
                  required 
                />
              </div>
              
              <div className="relative group">
                <label className="block text-xs text-neon-purple mb-2 ml-1 group-focus-within:text-neon-cyan transition-colors">UNIVERSITY EMAIL</label>
                <input 
                  type="email" 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-black/50 border border-white/20 p-4 rounded-lg focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan focus:outline-none text-white transition-all" 
                  placeholder="aryan@university.edu"
                  required 
                />
              </div>
              
              <button 
                disabled={status === 'loading' || status === 'success'}
                className={`w-full py-4 font-bold uppercase tracking-[0.2em] transition-all clip-path-polygon flex items-center justify-center gap-2 ${
                   status === 'success' 
                   ? 'bg-neon-green text-black' 
                   : 'bg-neon-purple text-white hover:bg-white hover:text-black'
                }`}
              >
                {status === 'loading' ? 'MINTING_PASS...' : status === 'success' ? 'ACCESS GRANTED' : 'INITIALIZE_JOIN'}
              </button>
            </form>
          </div>

          {/* RIGHT: The Live Preview Card */}
          <div className="hidden lg:flex flex-col items-center justify-center relative">
             {/* Glow Effect Behind Card */}
             <div className="absolute w-64 h-64 bg-neon-cyan/20 blur-[100px] rounded-full" />
             
             <div className="mb-6 text-xs font-mono text-gray-500 tracking-widest text-center">
                // LIVE PREVIEW
             </div>
             
             {/* The Card Component */}
             <HoloCard name={formData.name} />
             
             <p className="mt-8 text-xs text-gray-600 font-mono text-center max-w-xs">
                This is a preview of your Soulbound Token (SBT) membership card.
             </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default JoinForm;