import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Environment } from '@react-three/drei';
import * as THREE from 'three';

function FloatingProduct() {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
    }
    if (glowRef.current) {
      glowRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 2) * 0.05);
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <group>
        {/* Main product body - stylized headphone shape */}
        <mesh ref={meshRef} castShadow>
          <torusGeometry args={[1.2, 0.4, 32, 64]} />
          <MeshDistortMaterial
            color="#7C3AED"
            roughness={0.1}
            metalness={0.9}
            distort={0.1}
            speed={2}
          />
        </mesh>
        {/* Inner sphere */}
        <mesh>
          <sphereGeometry args={[0.6, 32, 32]} />
          <meshStandardMaterial
            color="#06B6D4"
            roughness={0.2}
            metalness={0.8}
            emissive="#06B6D4"
            emissiveIntensity={0.3}
          />
        </mesh>
        {/* Glow ring */}
        <mesh ref={glowRef}>
          <torusGeometry args={[1.8, 0.02, 16, 64]} />
          <meshStandardMaterial
            color="#7C3AED"
            emissive="#7C3AED"
            emissiveIntensity={2}
            transparent
            opacity={0.6}
          />
        </mesh>
      </group>
    </Float>
  );
}

function Particles() {
  const particlesRef = useRef<THREE.Points>(null);
  const count = 200;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 15;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 15;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 15;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.02;
      particlesRef.current.rotation.x = state.clock.elapsedTime * 0.01;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#7C3AED"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

function OrbitalRings() {
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const ring3Ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x = t * 0.5;
      ring1Ref.current.rotation.z = t * 0.3;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.y = t * 0.4;
      ring2Ref.current.rotation.x = t * 0.2;
    }
    if (ring3Ref.current) {
      ring3Ref.current.rotation.z = t * 0.6;
      ring3Ref.current.rotation.y = t * 0.1;
    }
  });

  return (
    <>
      <mesh ref={ring1Ref}>
        <torusGeometry args={[2.5, 0.01, 16, 100]} />
        <meshStandardMaterial color="#06B6D4" emissive="#06B6D4" emissiveIntensity={1} transparent opacity={0.4} />
      </mesh>
      <mesh ref={ring2Ref}>
        <torusGeometry args={[3, 0.01, 16, 100]} />
        <meshStandardMaterial color="#7C3AED" emissive="#7C3AED" emissiveIntensity={1} transparent opacity={0.3} />
      </mesh>
      <mesh ref={ring3Ref}>
        <torusGeometry args={[3.5, 0.008, 16, 100]} />
        <meshStandardMaterial color="#EC4899" emissive="#EC4899" emissiveIntensity={1} transparent opacity={0.2} />
      </mesh>
    </>
  );
}

export default function Hero3D() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 5, 5]} intensity={1} color="#ffffff" />
        <pointLight position={[-3, 2, 4]} intensity={1.5} color="#7C3AED" />
        <pointLight position={[3, -2, -4]} intensity={1} color="#06B6D4" />
        <spotLight position={[0, 5, 0]} intensity={0.5} color="#EC4899" angle={0.5} />
        <FloatingProduct />
        <Particles />
        <OrbitalRings />
        <Environment preset="night" />
      </Canvas>
    </div>
  );
}
