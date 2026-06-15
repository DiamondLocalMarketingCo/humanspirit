"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

function Earth() {
  const earthRef = useRef<THREE.Mesh>(null!);

  useFrame((_, delta) => {
    if (earthRef.current) {
      earthRef.current.rotation.y += delta * 0.15;
      earthRef.current.rotation.x = Math.sin(Date.now() * 0.0001) * 0.05;
    }
  });

  return (
    <group>
      <mesh ref={earthRef} castShadow receiveShadow>
        <sphereGeometry args={[1, 64, 64]} />
        <meshPhysicalMaterial
          color="#0c1a29"
          roughness={0.42}
          metalness={0.18}
          clearcoat={0.5}
          clearcoatRoughness={0.15}
          emissive="#0b3a54"
          emissiveIntensity={0.28}
        />
      </mesh>
      <mesh scale={[1.012, 1.012, 1.012]}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial
          color="#48c9ff"
          transparent
          opacity={0.055}
          depthWrite={false}
        />
      </mesh>
      <mesh rotation={[Math.PI * 0.5, 0, 0]}>
        <ringGeometry args={[1.17, 1.22, 128]} />
        <meshBasicMaterial color="#67e8f9" transparent opacity={0.12} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

export default function GlobeScene() {
  return (
    <div className="h-full w-full overflow-hidden rounded-[2rem] bg-[#020407]">
      <Canvas camera={{ position: [0, 0, 3.2], fov: 40 }} shadows>
        <color attach="background" args={["#020407"]} />
        <ambientLight intensity={0.7} />
        <directionalLight position={[4, 3, 5]} intensity={1.1} />
        <pointLight position={[-2.5, -1.4, -3]} intensity={0.5} color="#5dd4ff" />
        <Stars radius={90} depth={50} count={800} factor={4} saturation={0} fade />
        <Earth />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          rotateSpeed={0.85}
          minPolarAngle={0.45}
          maxPolarAngle={2.2}
          enableDamping
          dampingFactor={0.05}
        />
      </Canvas>
    </div>
  );
}
