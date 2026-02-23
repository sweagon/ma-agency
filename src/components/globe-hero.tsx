// src/components/globe-hero.tsx
"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";
import React, { useRef, lazy, Suspense } from "react";
import * as THREE from "three";
import { cn } from "@/lib/utils";

interface DotGlobeHeroProps {
  rotationSpeed?: number;
  globeRadius?: number;
  className?: string;
  children?: React.ReactNode;
}

// Simplified Globe with fewer segments
const Globe: React.FC<{
  rotationSpeed: number;
  radius: number;
}> = ({ rotationSpeed, radius }) => {
  const groupRef = useRef<THREE.Group>(null!);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += rotationSpeed;
    }
  });

  return (
    <group ref={groupRef}>
      <mesh>
        {/* Reduced segments from 64 to 32 for better performance */}
        <sphereGeometry args={[radius, 32, 32]} />
        <meshBasicMaterial
          color="#ff3333"
          transparent
          opacity={0.2}
          wireframe
        />
      </mesh>
    </group>
  );
};

const DotGlobeHero = React.forwardRef<HTMLDivElement, DotGlobeHeroProps>(({
  rotationSpeed = 0.005,
  globeRadius = 1,
  className,
  children,
  ...props
}, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "relative w-full h-screen bg-background overflow-hidden",
        className
      )}
      {...props}
    >
      <div className="relative flex flex-col items-center justify-center h-full z-10">
        {children}
      </div>

      <div className="absolute inset-0 z-0 pointer-events-none">
        <Canvas
          dpr={[1, 1.5]} // Limit pixel ratio for performance
          performance={{ min: 0.5 }}
          gl={{ powerPreference: "high-performance" }}
        >
          <PerspectiveCamera makeDefault position={[0, 0, 3]} fov={75} />
          <ambientLight intensity={0.5} />
          <Globe
            rotationSpeed={rotationSpeed}
            radius={globeRadius}
          />
        </Canvas>
      </div>
    </div>
  );
});

DotGlobeHero.displayName = "DotGlobeHero";
export { DotGlobeHero };