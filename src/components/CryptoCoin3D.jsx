import React, { useEffect, useMemo, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

const crystalMaterialProps = {
  color: '#c5d1ff',
  roughness: 0.1,
  metalness: 0.02,
  transmission: 0.78,
  thickness: 1.1,
  ior: 1.45,
  clearcoat: 1,
  clearcoatRoughness: 0.05,
  iridescence: 0.28,
  iridescenceIOR: 1.2,
  iridescenceThicknessRange: [120, 350],
  reflectivity: 1,
  transparent: true,
  opacity: 0.96,
};

const coreMaterialProps = {
  color: '#95a7ff',
  roughness: 0.18,
  metalness: 0.15,
  emissive: '#4f46e5',
  emissiveIntensity: 0.35,
};

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

  useFrame((renderState, delta) => {
    if (!modelRef.current) return;
    modelRef.current.rotation.y += delta * 0.32;
    modelRef.current.rotation.x = Math.sin(renderState.clock.elapsedTime * 0.55) * 0.05;
    modelRef.current.position.y = Math.sin(renderState.clock.elapsedTime * 0.9) * 0.08;
  });

  return (
    <group ref={modelRef} scale={1.17}>
      <mesh position={[0, 0.58, 0]} castShadow receiveShadow>
        <coneGeometry args={[0.68, 1.2, 4]} />
        <meshPhysicalMaterial {...crystalMaterialProps} flatShading />
      </mesh>

      <mesh position={[0, -0.58, 0]} rotation-z={Math.PI} castShadow receiveShadow>
        <coneGeometry args={[0.68, 1.2, 4]} />
        <meshPhysicalMaterial {...crystalMaterialProps} color="#a4b4ff" flatShading />
      </mesh>

      <mesh position={[0, 0.17, 0]} scale={[0.9, 0.64, 0.9]} castShadow receiveShadow>
        <coneGeometry args={[0.5, 0.74, 4]} />
        <meshStandardMaterial {...coreMaterialProps} flatShading />
      </mesh>

      <mesh position={[0, -0.17, 0]} rotation-z={Math.PI} scale={[0.9, 0.64, 0.9]} castShadow receiveShadow>
        <coneGeometry args={[0.5, 0.74, 4]} />
        <meshStandardMaterial {...coreMaterialProps} color="#869bff" emissive="#4338ca" flatShading />
      </mesh>

      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.93, 0.018, 20, 120]} />
        <meshStandardMaterial color="#f5f8ff" metalness={0.7} roughness={0.25} emissive="#7c8cff" emissiveIntensity={0.1} />
      </mesh>

      <mesh scale={1.03}>
        <octahedronGeometry args={[1.05, 0]} />
        <meshBasicMaterial color="#c7d2fe" wireframe transparent opacity={0.09} />
      </mesh>

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.35, 0]} receiveShadow>
        <circleGeometry args={[1.45, 64]} />
        <shadowMaterial transparent opacity={0.2} />
      </mesh>
    </group>
  );
}

const CryptoCoin3D = () => {
  return (
    <div className="w-full h-full max-w-[460px] max-h-[460px]">
      <Canvas
        camera={{ position: [0, 0, 5.2], fov: 28 }}
        dpr={[1, 2]}
        shadows
        gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.1 }}
      >
        <StudioEnvironment />
        <ambientLight intensity={0.38} />
        <directionalLight
          position={[3.5, 4, 3.2]}
          intensity={1.45}
          color="#ffffff"
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-bias={-0.0001}
        />
        <pointLight position={[-3, -2.5, 2]} intensity={0.7} color="#5b6dff" />
        <pointLight position={[0, -3, -1.8]} intensity={0.35} color="#1e293b" />
        <EthereumModel />
      </Canvas>
    </div>
  );
};

export default CryptoCoin3D;