import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial, Float, Environment } from '@react-three/drei';

const AnimatedSphere = () => {
  const sphereRef = useRef();

  useFrame((state) => {
    // Make it rotate slowly
    if (sphereRef.current) {
      sphereRef.current.rotation.x += 0.005;
      sphereRef.current.rotation.y += 0.005;
    }
    
    // Make it "breathe" with the mouse
    const t = state.clock.getElapsedTime();
    // You can add more complex mouse logic here if desired
  });

  return (
    <Float speed={2} rotationIntensity={2} floatIntensity={2}>
      <Sphere ref={sphereRef} args={[1, 100, 200]} scale={2.2}>
        <MeshDistortMaterial
          color="#8b5cf6"       // Neon Purple base
          attach="material"
          distort={0.4}         // How much it ripples (0 = smooth, 1 = crazy)
          speed={2}             // How fast it moves
          roughness={0.2}       // Shiny vs Matte
          metalness={0.8}       // Metallic look
          bumpScale={0.005}
        />
      </Sphere>
    </Float>
  );
};

const CyberCore = () => {
  return (
    <div className="w-full h-[500px] relative z-10">
      <Canvas>
        {/* Lights to make it look 3D */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[2, 5, 2]} intensity={1} />
        
        {/* The Environment reflects city lights onto the object */}
        <Environment preset="city" />

        {/* The 3D Object */}
        <AnimatedSphere />
      </Canvas>
    </div>
  );
};

export default CyberCore;