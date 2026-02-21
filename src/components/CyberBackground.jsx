import React from 'react';

const CyberBackground = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Base Dark Teal/Green Background matching the UI */}
      <div className="absolute inset-0 bg-[#061417] z-[-1]"></div>
      
      {/* INFINITE GRID */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:54px_54px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
      
      {/* AMBIENT GLOW DYNAMICS (Matching the Screenshot: Teal, Emerald, subtle Orange) */}
      <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[400px] md:w-[800px] h-[400px] md:h-[800px] bg-teal-500/10 rounded-full blur-[120px]" />
      <div className="absolute top-[50%] left-[10%] w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-emerald-600/10 rounded-full blur-[100px]" />
      <div className="absolute top-[70%] right-[10%] w-[400px] md:w-[700px] h-[400px] md:h-[700px] bg-orange-500/5 rounded-full blur-[120px]" />
    </div>
  );
};

export default CyberBackground;
