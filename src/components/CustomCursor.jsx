import React, { useEffect, useState } from 'react';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updatePosition = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', updatePosition);
    return () => window.removeEventListener('mousemove', updatePosition);
  }, []);

  return (
    <div 
      className="fixed w-8 h-8 rounded-full border border-neon-cyan pointer-events-none z-[100] -translate-x-1/2 -translate-y-1/2 transition-transform duration-100 ease-out mix-blend-difference hidden md:block"
      style={{ left: position.x, top: position.y }}
    >
      <div className="w-1 h-1 bg-neon-purple absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full" />
    </div>
  );
};

export default CustomCursor;