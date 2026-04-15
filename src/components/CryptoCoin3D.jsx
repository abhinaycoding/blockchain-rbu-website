import React, { useRef, useMemo, useEffect } from 'react';
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
      // Base continuous spinning - perfectly smooth based on time delta
      modelRef.current.rotation.y += delta * 0.15;
      
      // Interactive Mouse Tracking limits
      const targetX = state.pointer.x * 0.6;
      const targetY = state.pointer.y * 0.6;
      
      // Frame-rate independent spring physics utilizing MathUtils.damp
      // Format: damp(current, target, lambda (speed), delta)
      modelRef.current.rotation.x = THREE.MathUtils.damp(modelRef.current.rotation.x, targetY, 3, delta);
      modelRef.current.rotation.z = THREE.MathUtils.damp(modelRef.current.rotation.z, -targetX, 3, delta);
    }
  });

  return (
    <group ref={modelRef} scale={1.17}>
      <Float speed={1.5} rotationIntensity={0.4} floatIntensity={1.2}>
        <group>
          {/* Top Crystal */}
          <mesh position={[0, 0.58, 0]}>
            <coneGeometry args={[0.68, 1.2, 4]} />
            <MeshTransmissionMaterial 
              backside={true}
              backsideThickness={2}
              thickness={1.5}
              ior={2.4} // Diamond-level refraction
              chromaticAberration={1.2} // High rainbow dispersion
              anisotropy={0.5}
              distortion={0.2} 
              distortionScale={0.5}
              temporalDistortion={0.1}
              color="#c5d1ff"
              clearcoat={1}
              clearcoatRoughness={0}
              roughness={0}
              attenuationDistance={3}
              attenuationColor="#ffffff"
            />
          </mesh>

          {/* Bottom Crystal */}
          <mesh position={[0, -0.58, 0]} rotation-z={Math.PI}>
            <coneGeometry args={[0.68, 1.2, 4]} />
            <MeshTransmissionMaterial 
              backside={true}
              backsideThickness={2}
              thickness={1.5}
              ior={2.4}
              chromaticAberration={1.2}
              anisotropy={0.5}
              distortion={0.2}
              distortionScale={0.5}
              temporalDistortion={0.1}
              color="#a4b4ff"
              clearcoat={1}
              clearcoatRoughness={0}
              roughness={0}
              attenuationDistance={3}
              attenuationColor="#ffffff"
            />
          </mesh>

          {/* Inner Core Top */}
          <mesh position={[0, 0.17, 0]} scale={[0.9, 0.64, 0.9]}>
            <coneGeometry args={[0.5, 0.74, 4]} />
            <meshStandardMaterial 
              color="#ffffff" 
              emissive="#4f46e5" 
              emissiveIntensity={3} 
              toneMapped={false} 
            />
          </mesh>

          {/* Inner Core Bottom */}
          <mesh position={[0, -0.17, 0]} rotation-z={Math.PI} scale={[0.9, 0.64, 0.9]}>
            <coneGeometry args={[0.5, 0.74, 4]} />
            <meshStandardMaterial 
              color="#ffffff" 
              emissive="#4338ca" 
              emissiveIntensity={3} 
              toneMapped={false} 
            />
          </mesh>

          {/* Outer Ring */}
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.93, 0.018, 50, 200]} />
            <meshStandardMaterial 
              color="#ffffff" 
              metalness={1} 
              roughness={0.05} 
              envMapIntensity={3}
            />
          </mesh>
          
          {/* Faint Wireframe Outline */}
          <mesh scale={1.03}>
            <octahedronGeometry args={[1.05, 0]} />
            <meshBasicMaterial color="#c7d2fe" wireframe transparent opacity={0.1} />
          </mesh>
        </group>
      </Float>

      {/* Floating Sparkles around the model */}
      <Sparkles count={80} scale={4} size={3} color="#a4b4ff" opacity={0.6} speed={0.5} />
      
      {/* Super realistic contact shadows */}
      <ContactShadows 
        position={[0, -1.8, 0]} 
        opacity={0.8} 
        scale={7} 
        blur={2.5} 
        far={3}
        color="#000000"
      />
    </group>
  );
}

const CryptoCoin3D = () => {
  return (
    <div className="w-full h-full max-w-[460px] max-h-[460px]">
      <Canvas
        camera={{ position: [0, 0, 5.2], fov: 28 }}
        dpr={[1, 2]}
        gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.2 }}
      >
        <StudioEnvironment />
        
        <ambientLight intensity={0.6} />
        <directionalLight
          position={[3.5, 4, 3.2]}
          intensity={2}
          color="#ffffff"
        />
        {/* Stronger backlighting for glass reflections */}
        <pointLight position={[-3, -2.5, 2]} intensity={3} color="#5b6dff" />
        <pointLight position={[3, 2, -3]} intensity={2} color="#00f3ff" />
        
        <EthereumModel />
      </Canvas>
    </div>
  );
};

export default CryptoCoin3D;