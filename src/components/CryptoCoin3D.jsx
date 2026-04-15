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

function EthereumModel() {
  const modelRef = useRef(null);

  useFrame((state, delta) => {
    if (modelRef.current) {
      modelRef.current.rotation.y += delta * 0.15;
      const targetX = state.pointer.x * 0.5;
      const targetY = state.pointer.y * 0.5;
      modelRef.current.rotation.x = THREE.MathUtils.damp(modelRef.current.rotation.x, targetY, 3, delta);
      modelRef.current.rotation.z = THREE.MathUtils.damp(modelRef.current.rotation.z, -targetX, 3, delta);
    }
  });

  return (
    <group ref={modelRef} scale={1.17}>
      <Float speed={1.0} rotationIntensity={0.2} floatIntensity={0.6}>
        <group>
          {/* Top Crystal — MeshPhysicalMaterial: no FBO, full reflections */}
          <mesh position={[0, 0.58, 0]}>
            <coneGeometry args={[0.68, 1.2, 4]} />
            <meshPhysicalMaterial
              color="#c5d1ff"
              metalness={0.1}
              roughness={0.0}
              transmission={0.92}
              thickness={1.2}
              ior={1.5}
              clearcoat={1}
              clearcoatRoughness={0}
              envMapIntensity={2.5}
              transparent
              opacity={0.85}
            />
          </mesh>

          {/* Bottom Crystal */}
          <mesh position={[0, -0.58, 0]} rotation-z={Math.PI}>
            <coneGeometry args={[0.68, 1.2, 4]} />
            <meshPhysicalMaterial
              color="#a4b4ff"
              metalness={0.1}
              roughness={0.0}
              transmission={0.92}
              thickness={1.2}
              ior={1.5}
              clearcoat={1}
              clearcoatRoughness={0}
              envMapIntensity={2.5}
              transparent
              opacity={0.85}
            />
          </mesh>

          {/* Inner Core Top — emissive glow */}
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
            <torusGeometry args={[0.93, 0.018, 16, 100]} />
            <meshStandardMaterial color="#ffffff" metalness={1} roughness={0.05} envMapIntensity={3} />
          </mesh>

          {/* Wireframe Outline */}
          <mesh scale={1.03}>
            <octahedronGeometry args={[1.05, 0]} />
            <meshBasicMaterial color="#c7d2fe" wireframe transparent opacity={0.08} />
          </mesh>
        </group>
      </Float>

      <Sparkles count={25} scale={4} size={2} color="#a4b4ff" opacity={0.4} speed={0.3} />
      <ContactShadows position={[0, -1.8, 0]} opacity={0.6} scale={6} blur={2} far={3} color="#000000" frames={1} resolution={256} />
    </group>
  );
}

const CryptoCoin3D = () => {
  return (
    <div className="w-full h-full max-w-[460px] max-h-[460px]">
      <Canvas
        camera={{ position: [0, 0, 5.2], fov: 28 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: false, // Disable MSAA — costly on weak GPUs
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.2,
          powerPreference: 'high-performance',
        }}
        frameloop="always"
      >
        <StudioEnvironment />
        <ambientLight intensity={0.8} />
        <directionalLight position={[3.5, 4, 3.2]} intensity={1.5} color="#ffffff" />
        <pointLight position={[-3, -2.5, 2]} intensity={2} color="#5b6dff" />
        <EthereumModel />
      </Canvas>
    </div>
  );
};

export default CryptoCoin3D;