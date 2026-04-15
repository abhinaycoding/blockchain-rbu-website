import React, { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { 
  MeshTransmissionMaterial, 
  ContactShadows, 
  Sparkles,
  Float
} from '@react-three/drei';
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

function EthereumModel() {
  const modelRef = useRef(null);

  useFrame((state, delta) => {
    if (modelRef.current) {
      modelRef.current.rotation.y += delta * 0.15;
      const targetX = state.pointer.x * 0.6;
      const targetY = state.pointer.y * 0.6;
      modelRef.current.rotation.x = THREE.MathUtils.damp(modelRef.current.rotation.x, targetY, 3, delta);
      modelRef.current.rotation.z = THREE.MathUtils.damp(modelRef.current.rotation.z, -targetX, 3, delta);
    }
  });

  return (
    <group ref={modelRef} scale={1.17}>
      <Float speed={1.5} rotationIntensity={0.4} floatIntensity={1.2}>
        <group>
          <mesh position={[0, 0.58, 0]}>
            <coneGeometry args={[0.68, 1.2, 4]} />
            <MeshTransmissionMaterial 
              backside={true} backsideThickness={2} thickness={1.5}
              ior={2.4} chromaticAberration={1.2} anisotropy={0.5}
              distortion={0.2} distortionScale={0.5} temporalDistortion={0.1}
              color="#c5d1ff" clearcoat={1} clearcoatRoughness={0} roughness={0}
              attenuationDistance={3} attenuationColor="#ffffff"
              resolution={128} samples={4}
            />
          </mesh>

          <mesh position={[0, -0.58, 0]} rotation-z={Math.PI}>
            <coneGeometry args={[0.68, 1.2, 4]} />
            <MeshTransmissionMaterial 
              backside={true} backsideThickness={2} thickness={1.5}
              ior={2.4} chromaticAberration={1.2} anisotropy={0.5}
              distortion={0.2} distortionScale={0.5} temporalDistortion={0.1}
              color="#a4b4ff" clearcoat={1} clearcoatRoughness={0} roughness={0}
              attenuationDistance={3} attenuationColor="#ffffff"
              resolution={128} samples={4}
            />
          </mesh>

          <mesh position={[0, 0.17, 0]} scale={[0.9, 0.64, 0.9]}>
            <coneGeometry args={[0.5, 0.74, 4]} />
            <meshStandardMaterial color="#ffffff" emissive="#4f46e5" emissiveIntensity={3} toneMapped={false} />
          </mesh>

          <mesh position={[0, -0.17, 0]} rotation-z={Math.PI} scale={[0.9, 0.64, 0.9]}>
            <coneGeometry args={[0.5, 0.74, 4]} />
            <meshStandardMaterial color="#ffffff" emissive="#4338ca" emissiveIntensity={3} toneMapped={false} />
          </mesh>

          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.93, 0.018, 50, 200]} />
            <meshStandardMaterial color="#ffffff" metalness={1} roughness={0.05} envMapIntensity={3} />
          </mesh>

          <mesh scale={1.03}>
            <octahedronGeometry args={[1.05, 0]} />
            <meshBasicMaterial color="#c7d2fe" wireframe transparent opacity={0.1} />
          </mesh>
        </group>
      </Float>

      <Sparkles count={40} scale={4} size={3} color="#a4b4ff" opacity={0.6} speed={0.5} />
      <ContactShadows position={[0, -1.8, 0]} opacity={0.8} scale={7} blur={2.5} far={3} color="#000000" frames={1} resolution={256} />
    </group>
  );
}

// Pure CSS fallback — zero GPU rendering cost on mobile
function MobileCrystal() {
  return (
    <div className="relative w-[240px] h-[240px] flex items-center justify-center">
      <div className="absolute inset-0 rounded-full bg-indigo-500/10 blur-[60px]" />
      <div className="relative w-[150px] h-[150px] flex items-center justify-center">
        {/* Top triangle */}
        <div className="absolute top-[8px] left-1/2 -translate-x-1/2 w-0 h-0"
          style={{
            borderLeft: '66px solid transparent',
            borderRight: '66px solid transparent',
            borderBottom: '92px solid rgba(165,180,252,0.28)',
            filter: 'drop-shadow(0 0 18px rgba(99,102,241,0.7))'
          }}
        />
        {/* Bottom triangle */}
        <div className="absolute bottom-[8px] left-1/2 -translate-x-1/2 w-0 h-0"
          style={{
            borderLeft: '66px solid transparent',
            borderRight: '66px solid transparent',
            borderTop: '92px solid rgba(129,140,248,0.22)',
            filter: 'drop-shadow(0 0 18px rgba(79,70,229,0.6))'
          }}
        />
        <div className="absolute w-7 h-7 rounded-full bg-indigo-400/70 blur-[8px]" />
      </div>
      {/* Slowly rotating ring */}
      <div
        className="absolute w-[210px] h-[210px] rounded-full border border-indigo-400/20"
        style={{ animation: 'spin 14s linear infinite' }}
      />
    </div>
  );
}

const CryptoCoin3D = () => {
  const [isMobile, setIsMobile] = useState(() => {
    // SSR-safe: default false, update in effect
    return false;
  });

  useEffect(() => {
    const check = () => {
      setIsMobile(window.innerWidth < 1024 || 'ontouchstart' in window);
    };
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  if (isMobile) {
    return (
      <div className="w-full h-full max-w-[460px] max-h-[460px] flex items-center justify-center">
        <MobileCrystal />
      </div>
    );
  }

  return (
    <div className="w-full h-full max-w-[460px] max-h-[460px]">
      <Canvas
        camera={{ position: [0, 0, 5.2], fov: 28 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.2 }}
      >
        <StudioEnvironment />
        <ambientLight intensity={0.6} />
        <directionalLight position={[3.5, 4, 3.2]} intensity={2} color="#ffffff" />
        <pointLight position={[-3, -2.5, 2]} intensity={3} color="#5b6dff" />
        <pointLight position={[3, 2, -3]} intensity={2} color="#00f3ff" />
        <EthereumModel />
      </Canvas>
    </div>
  );
};

export default CryptoCoin3D;