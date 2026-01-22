import React, { useState } from 'react';
import Spline from '@splinetool/react-spline';

const Scene3D = () => {
  const [loading, setLoading] = useState(true);

  return (
    <div className="w-full h-[500px] md:h-[600px] relative flex items-center justify-center">
      {/* Loading Spinner (Shows while 3D model downloads) */}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-10 h-10 border-4 border-neon-cyan border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {/* The 3D Scene */}
      <Spline 
        className="w-full h-full"
        onLoad={() => setLoading(false)}
        // This is a free-to-use abstract tech scene
        scene="https://prod.spline.design/kZDDjO5HuC9gjJvp/scene.splinecode" 
      />
      
      {/* Overlay to prevent zooming the page when scrolling on mobile */}
      <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_100px_rgba(0,0,0,0.9)]" />
    </div>
  );
};

export default Scene3D;