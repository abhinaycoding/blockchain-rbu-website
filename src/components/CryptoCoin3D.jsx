import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { ContactShadows, Float, Sparkles } from '@react-three/drei';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

function StudioEnvironment() {
  const { gl, scene } = useThree();

  const generatedEnvironment = useMemo(() => {
    const pmremGenerator = new THREE.PMREMGenerator(gl);
    pmremGenerator.compileEquirectangularShader();
    const environmentScene = new RoomEnvironment();
    const envTexture = pmremGenerator.fromScene(environmentScene, 0.04).texture;
    environmentScene.dispose();
    pmremGenerator.dispose();
    return envTexture;
  }, [gl]);

  useEffect(() => {
    const previousEnvironment = scene.environment;
    scene.environment = generatedEnvironment;
    return () => {
      scene.environment = previousEnvironment;
      generatedEnvironment.dispose();
    };
  }, [generatedEnvironment, scene]);

  return null;
}

function IcyCrystalModel() {
  const modelRef = useRef(null);

  useFrame((state, delta) => {
    if (modelRef.current) {
      // Auto-rotation combined with subtle mouse tracking
      modelRef.current.rotation.y += delta * 0.1;
      const targetX = state.pointer.x * 0.25;
      const targetY = state.pointer.y * 0.25;
      modelRef.current.rotation.x = THREE.MathUtils.damp(modelRef.current.rotation.x, targetY, 3, delta);
      modelRef.current.rotation.z = THREE.MathUtils.damp(modelRef.current.rotation.z, -targetX, 3, delta);
    }
  });

  return (
    <group ref={modelRef} scale={0.9} position={[0, 0, 0]}>
      <Float speed={1.2} rotationIntensity={0.3} floatIntensity={0.5}>
        <group>
          {/* Main Ethereum Crystal */}
          <mesh scale={[1, 1.5, 1]}>
            <octahedronGeometry args={[0.9, 0]} />
            <meshPhysicalMaterial
              color="#ffffff"
              metalness={0.1}
              roughness={0.0}
              transmission={0.95}
              thickness={1.5}
              ior={1.4}
              clearcoat={1}
              clearcoatRoughness={0}
              envMapIntensity={2.5}
              transparent
              opacity={0.8}
              flatShading={true}
            />
          </mesh>
          
          {/* Inner Glowing Cyan Core */}
          <mesh scale={[0.5, 0.75, 0.5]}>
            <octahedronGeometry args={[0.9, 0]} />
            <meshStandardMaterial color="#ffffff" emissive="#06b6d4" emissiveIntensity={4} toneMapped={false} />
          </mesh>

          {/* Geometric Wireframe Cage */}
          <mesh scale={[1.05, 1.57, 1.05]}>
            <octahedronGeometry args={[0.9, 0]} />
            <meshBasicMaterial color="#ffffff" wireframe transparent opacity={0.15} />
          </mesh>

          {/* Multiple Fine Orbital Rings */}
          <group rotation={[0.4, 0.2, 0]}>
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <torusGeometry args={[1.5, 0.003, 64, 100]} />
              <meshBasicMaterial color="#ffffff" transparent opacity={0.5} />
            </mesh>
            <mesh rotation={[Math.PI / 2.5, 0.5, 0]}>
              <torusGeometry args={[1.7, 0.002, 64, 100]} />
              <meshBasicMaterial color="#ffffff" transparent opacity={0.3} />
            </mesh>
            <mesh rotation={[Math.PI / 1.5, -0.5, 0]}>
              <torusGeometry args={[2.0, 0.002, 64, 100]} />
              <meshBasicMaterial color="#ffffff" transparent opacity={0.15} />
            </mesh>
          </group>
        </group>
      </Float>

      {/* Dual Particle System: White + Orange */}
      <Sparkles count={50} scale={6} size={1.2} color="#ffffff" opacity={0.5} speed={0.4} />
      <Sparkles count={20} scale={5} size={2.5} color="#f97316" opacity={0.8} speed={0.2} />
      
      <ContactShadows position={[0, -2.5, 0]} opacity={0.5} scale={8} blur={2.5} far={4} color="#000000" frames={1} resolution={256} />
    </group>
  );
}

const CryptoCoin3D = () => {
  return (
    // Removed max-w/max-h constraints to allow filling the absolute Hero wrapper
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 35 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: false, 
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.2,
          powerPreference: 'high-performance',
        }}
        frameloop="always"
      >
        <StudioEnvironment />
        <ambientLight intensity={0.8} />
        <directionalLight position={[3.5, 4, 3.2]} intensity={1.5} color="#ffffff" />
        <pointLight position={[-3, -2.5, 2]} intensity={2} color="#06b6d4" />
        <IcyCrystalModel />
      </Canvas>
    </div>
  );
};

export default CryptoCoin3D;