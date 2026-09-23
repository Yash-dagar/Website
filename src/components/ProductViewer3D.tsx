import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, MeshDistortMaterial, Environment, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

interface ProductViewer3DProps {
  color: string;
  type: string;
}

function ProductModel({ color, type }: { color: string; type: string }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.5;
    }
  });

  const getGeometry = () => {
    switch (type) {
      case 'headphones':
        return <torusGeometry args={[1, 0.35, 32, 64]} />;
      case 'speaker':
        return <cylinderGeometry args={[1, 1, 1.5, 32]} />;
      case 'watch':
        return <boxGeometry args={[1.2, 1.4, 0.3]} />;
      case 'camera':
        return <boxGeometry args={[1.8, 1.2, 1]} />;
      case 'drone':
        return <octahedronGeometry args={[1, 0]} />;
      case 'vr':
        return <boxGeometry args={[2, 1, 1]} />;
      default:
        return <sphereGeometry args={[1, 32, 32]} />;
    }
  };

  return (
    <mesh ref={meshRef} castShadow position={[0, 0.5, 0]}>
      {getGeometry()}
      <MeshDistortMaterial
        color={color}
        roughness={0.15}
        metalness={0.85}
        distort={0.05}
        speed={1.5}
      />
    </mesh>
  );
}

export default function ProductViewer3D({ color, type }: ProductViewer3DProps) {
  return (
    <div className="w-full h-[400px] md:h-[500px] rounded-2xl overflow-hidden">
      <Canvas
        camera={{ position: [0, 1, 4], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={1} castShadow />
        <pointLight position={[-3, 2, 4]} intensity={1} color="#7C3AED" />
        <pointLight position={[3, -2, -4]} intensity={0.8} color="#06B6D4" />
        <ProductModel color={color} type={type} />
        <ContactShadows
          position={[0, -0.5, 0]}
          opacity={0.4}
          scale={5}
          blur={2}
          far={4}
        />
        <OrbitControls
          enableZoom={true}
          enablePan={false}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 1.5}
          autoRotate
          autoRotateSpeed={1}
        />
        <Environment preset="studio" />
      </Canvas>
    </div>
  );
}
