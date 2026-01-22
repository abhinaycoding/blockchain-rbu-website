import React from 'react';
import { ArrowLeft, Terminal } from 'lucide-react';

const Cooking = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center relative overflow-hidden text-white selection:bg-orange-500/30">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] opacity-50" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-orange-600/20 rounded-full blur-[120px] animate-pulse" />

      {/* Main Content */}
      <div className="relative z-10 text-center px-6">
        
        {/* Animated Icon */}
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-orange-500 blur-xl opacity-20 animate-pulse" />
            <Terminal size={64} className="text-orange-500 animate-bounce" />
          </div>
        </div>

        {/* Glitch Headline */}
        <h1 className="text-5xl md:text-8xl font-bold tracking-tighter mb-6 relative">
          <span className="absolute -left-1 -top-1 text-red-500 opacity-50 animate-pulse">SOMETHING IS COOKING...</span>
          <span className="absolute -right-1 -bottom-1 text-blue-500 opacity-50 animate-pulse">SOMETHING IS COOKING...</span>
          <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-500">
            SOMETHING IS COOKING...
          </span>
        </h1>

        <p className="text-gray-400 font-mono text-lg md:text-xl tracking-widest uppercase mb-12">
          // The chefs are deploying the contract<br/>
          // Please wait for confirmation
        </p>

        {/* Back Button */}
        <button 
          onClick={onBack}
          className="group flex items-center gap-3 px-8 py-4 border border-white/20 rounded-full hover:bg-white hover:text-black transition-all duration-300 mx-auto"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span className="font-bold tracking-widest text-sm">RETURN TO BASE</span>
        </button>

      </div>
    </div>
  );
};

export default Cooking;