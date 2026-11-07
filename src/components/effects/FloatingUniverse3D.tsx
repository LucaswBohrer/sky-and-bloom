"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

function Orb({
  position,
  color,
  scale,
  speed,
}: {
  position: [number, number, number];
  color: string;
  scale: number;
  speed: number;
}) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.x = state.clock.elapsedTime * 0.12 * speed;
    ref.current.rotation.y = state.clock.elapsedTime * 0.18 * speed;
  });
  return (
    <Float speed={speed} rotationIntensity={0.6} floatIntensity={1.4}>
      <mesh ref={ref} position={position} scale={scale}>
        <sphereGeometry args={[1, 48, 48]} />
        <meshPhysicalMaterial
          color={color}
          roughness={0.15}
          metalness={0.05}
          transmission={0.55}
          thickness={1.2}
          transparent
          opacity={0.92}
        />
      </mesh>
    </Float>
  );
}

function PetalShape({ position, color }: { position: [number, number, number]; color: string }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.5) * 0.35;
  });
  return (
    <Float speed={2.2} rotationIntensity={1.2} floatIntensity={1.8}>
      <mesh ref={ref} position={position} scale={[0.55, 0.9, 0.28]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial color={color} roughness={0.35} metalness={0.1} />
      </mesh>
    </Float>
  );
}

/** Translucent spheres + petals floating in 3D, with a soft parallax rig. */
export function FloatingUniverse3D() {
  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 9], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
      aria-hidden="true"
    >
      <ambientLight intensity={1.1} />
      <directionalLight position={[5, 5, 5]} intensity={1.4} />
      <pointLight position={[-5, -3, 4]} intensity={12} color="#F28DB5" />
      <Orb position={[-3.4, 1.2, -1]} color="#65B8E8" scale={1.5} speed={1.4} />
      <Orb position={[3.6, -0.6, -0.5]} color="#F28DB5" scale={1.1} speed={1.8} />
      <Orb position={[1.4, 2.2, -2]} color="#9FD3F2" scale={0.7} speed={2.2} />
      <Orb position={[-1.2, -2.1, -1.5]} color="#FBE5EF" scale={0.85} speed={1.6} />
      <PetalShape position={[4.4, 1.8, 0]} color="#F28DB5" />
      <PetalShape position={[-4.6, -1.4, 0.5]} color="#F6AECB" />
      <PetalShape position={[0.4, -2.6, -0.5]} color="#65B8E8" />
    </Canvas>
  );
}
