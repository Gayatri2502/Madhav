"use client";

import React, { useRef, useState, useEffect, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Html,
  OrbitControls,
  Environment,
  ContactShadows,
  useGLTF,
} from "@react-three/drei";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import * as THREE from "three";

interface FactoryHotspotProps {
  position: [number, number, number];
  title: string;
  description: string;
  color: string;
  onClick: () => void;
}

const FactoryHotspot = React.forwardRef<THREE.Mesh, FactoryHotspotProps>(
  ({ position, title, description, color, onClick }, ref) => {
    const [hovered, setHovered] = useState(false);
    const groupRef = useRef<THREE.Group>(null);
    const { camera } = useThree();

    useFrame(() => {
      if (groupRef.current) {
        groupRef.current.lookAt(camera.position);
      }
    });

    return (
      <group ref={groupRef} position={position}>
        <mesh
          ref={ref}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
          onClick={onClick}
        >
          <sphereGeometry args={[0.4, 16, 16]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={hovered ? 0.8 : 0.3}
            transparent
            opacity={0.9}
          />
        </mesh>
        <mesh scale={hovered ? 1.3 : 1}>
          <sphereGeometry args={[0.6, 16, 16]} />
          <meshBasicMaterial
            color={color}
            transparent
            opacity={0.15}
            side={2}
          />
        </mesh>

        <Html
          transform
          wrapperClass="pointer-events-none"
          style={{ transform: "translate(-50%, -100%)" }}
        >
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 10 }}
            className={cn(
              "px-3 py-2 rounded-lg bg-card border border-border/50 shadow-lg backdrop-blur-sm",
              "text-left min-w-[180px] max-w-[240px] text-xs"
            )}
          >
            <p className="font-semibold text-foreground">{title}</p>
            <p className="text-muted-foreground/80">{description}</p>
          </motion.div>
        </Html>
      </group>
    );
  }
);

interface FactorySceneProps {
  reducedMotion: boolean;
  activeHotspot: string | null;
  setActiveHotspot: (id: string | null) => void;
}

const FactoryScene = ({ reducedMotion, activeHotspot, setActiveHotspot }: FactorySceneProps) => {
  const hotspots = [
    {
      id: "press",
      position: [-1.5, 1.5, 0] as [number, number, number],
      title: "Heidelberg Speedmaster XL 106",
      description: "8-color LED UV offset press with Intellistart automation",
      color: "#0ea5e9",
    },
    {
      id: "komori",
      position: [1.5, 1.5, 0] as [number, number, number],
      title: "Komori Lithrone G40",
      description: "H-UV press with PQA color control system",
      color: "#10b981",
    },
    {
      id: "bobst",
      position: [5, 1, -3] as [number, number, number],
      title: "Bobst Expertfold 110",
      description: "Auto-setup folder-gluer for crash-lock cartons",
      color: "#f59e0b",
    },
    {
      id: "quality",
      position: [-5, 1, -3] as [number, number, number],
      title: "Quality Control Lab",
      description: "Spectrophotometer verification & ISO 9001 processes",
      color: "#8b5cf6",
    },
  ];

  return (
    <>
      <Environment preset="warehouse" background={false} ground={reducedMotion} />
      <directionalLight
        position={[10, 15, 10]}
        intensity={2}
        castShadow
        shadow-mapSize={2048}
      />
      <ambientLight intensity={0.5} />

      <ContactShadows opacity={0.3} scale={20} blur={2} far={10} />

      <group position={[0, 0, 0]}>
        <mesh receiveShadow position={[0, -0.25, 0]}>
          <boxGeometry args={[12, 0.5, 16]} />
          <meshStandardMaterial color="#1a1a2e" roughness={0.8} />
        </mesh>

        <mesh castShadow receiveShadow position={[-2, 1.5, 0]}>
          <boxGeometry args={[4, 3, 4]} />
          <meshStandardMaterial color="#0f172a" roughness={0.3} metalness={0.2} />
        </mesh>
        <mesh castShadow position={[-2, 2.75, 1.5]}>
          <boxGeometry args={[0.8, 2.5, 0.8]} />
          <meshStandardMaterial color="#1e293b" roughness={0.2} metalness={0.5} />
        </mesh>
        <mesh castShadow position={[-2, 2.75, -1.5]}>
          <boxGeometry args={[0.8, 2.5, 0.8]} />
          <meshStandardMaterial color="#1e293b" roughness={0.2} metalness={0.5} />
        </mesh>

        <mesh castShadow receiveShadow position={[2, 1.5, 0]}>
          <boxGeometry args={[4, 3, 4]} />
          <meshStandardMaterial color="#0f172a" roughness={0.3} metalness={0.2} />
        </mesh>
        <mesh castShadow position={[2, 2.75, 1.5]}>
          <boxGeometry args={[0.8, 2.5, 0.8]} />
          <meshStandardMaterial color="#1e293b" roughness={0.2} metalness={0.5} />
        </mesh>
        <mesh castShadow position={[2, 2.75, -1.5]}>
          <boxGeometry args={[0.8, 2.5, 0.8]} />
          <meshStandardMaterial color="#1e293b" roughness={0.2} metalness={0.5} />
        </mesh>

        <mesh castShadow receiveShadow position={[5, 1.25, -3]}>
          <boxGeometry args={[5, 2.5, 6]} />
          <meshStandardMaterial color="#1e293b" roughness={0.4} metalness={0.1} />
        </mesh>
        <mesh castShadow position={[5, 2.5, -3]}>
          <boxGeometry args={[1.5, 0.5, 4]} />
          <meshStandardMaterial color="#334155" roughness={0.3} metalness={0.3} />
        </mesh>

        <mesh castShadow receiveShadow position={[-5, 1.25, -3]}>
          <boxGeometry args={[5, 2.5, 6]} />
          <meshStandardMaterial color="#0f172a" roughness={0.4} metalness={0.1} />
        </mesh>
        <mesh castShadow position={[-5, 2.5, -3]}>
          <boxGeometry args={[1.5, 0.5, 4]} />
          <meshStandardMaterial color="#1e293b" roughness={0.3} metalness={0.3} />
        </mesh>
        <mesh castShadow position={[-6.5, 2, -3]}>
          <boxGeometry args={[0.5, 1.5, 0.5]} />
          <meshStandardMaterial color="#0ea5e9" emissive="#0ea5e9" emissiveIntensity={0.5} />
        </mesh>

        <mesh receiveShadow position={[0, 3, -8]}>
          <boxGeometry args={[14, 6, 0.3]} />
          <meshStandardMaterial
            color="#0f172a"
            roughness={0.2}
            metalness={0.4}
            transparent
            opacity={0.9}
          />
        </mesh>
      </group>

      {hotspots.map((hotspot) => (
        <FactoryHotspot
          key={hotspot.id}
          position={hotspot.position}
          title={hotspot.title}
          description={hotspot.description}
          color={hotspot.color}
          onClick={() => setActiveHotspot(hotspot.id)}
        />
      ))}
    </>
  );
};

const FactoryCanvas = ({ activeHotspot, setActiveHotspot }: { activeHotspot: string | null; setActiveHotspot: (id: string | null) => void }) => {
  const reducedMotion = useReducedMotion() ?? false;
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  if (isMobile || reducedMotion) {
    return null;
  }

  return (
    <Canvas
      camera={{ position: [0, 4, 10], fov: 45 }}
      gl={{
        preserveDrawingBuffer: true,
        powerPreference: "high-performance",
        antialias: true,
        alpha: true,
      }}
      shadows
      style={{ width: "100%", height: "100%", minHeight: "500px" }}
    >
      <Suspense fallback={<LoadingFallback />}>
        <FactoryScene reducedMotion={reducedMotion} activeHotspot={activeHotspot} setActiveHotspot={setActiveHotspot} />
      </Suspense>
      <OrbitControls
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        minDistance={5}
        maxDistance={25}
        minPolarAngle={0.3}
        maxPolarAngle={Math.PI / 2 - 0.1}
        autoRotate={!reducedMotion}
        autoRotateSpeed={0.3}
      />
    </Canvas>
  );
};

const LoadingFallback = () => (
  <div
    className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-background via-accent/10 to-background"
    style={{ zIndex: 1 }}
  >
    <div className="text-center">
      <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
      <p className="text-muted-foreground">Loading factory...</p>
    </div>
  </div>
);

const MobileFallback = () => (
  <div className="relative w-full h-[400px] bg-gradient-to-br from-background via-accent/10 to-background rounded-2xl flex items-center justify-center overflow-hidden">
    <div className="text-center px-6">
      <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-primary/10 flex items-center justify-center">
        <svg className="w-10 h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      </div>
      <h3 className="text-xl font-semibold text-foreground mb-2">Factory Gallery</h3>
      <p className="text-muted-foreground mb-4">
        Explore our state-of-the-art facility with Heidelberg & Komori presses,
        Bobst folder-gluer, and ISO-certified quality lab.
      </p>
      <div className="flex gap-3 justify-center flex-wrap">
        <span className="px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full">Heidelberg XL 106</span>
        <span className="px-3 py-1 text-xs font-medium bg-emerald/10 text-emerald rounded-full">Komori G40</span>
        <span className="px-3 py-1 text-xs font-medium bg-amber/10 text-amber rounded-full">Bobst 110</span>
        <span className="px-3 py-1 text-xs font-medium bg-violet/10 text-violet rounded-full">Quality Lab</span>
      </div>
    </div>
  </div>
);

const HotspotModal = ({ hotspot, onClose }: { hotspot: { title: string; description: string } | null; onClose: () => void }) => {
  if (!hotspot) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="hotspot-title"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: -20 }}
        className="relative w-full max-w-2xl bg-card rounded-2xl overflow-hidden shadow-2xl border border-border/50"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-4 border-b border-border/50">
          <h3 id="hotspot-title" className="text-xl font-bold text-foreground">{hotspot.title}</h3>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-accent hover:text-foreground transition-colors text-muted-foreground"
            aria-label="Close"
          >
            ✕
          </button>
        </div>
        <div className="p-6 space-y-4">
          <p className="text-muted-foreground">{hotspot.description}</p>
          <div className="grid gap-3 sm:grid-cols-2 pt-4 border-t border-border/50">
            <div className="p-3 rounded-lg bg-accent/50">
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Status</p>
              <p className="font-medium text-green-500">Operational</p>
            </div>
            <div className="p-3 rounded-lg bg-accent/50">
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Last Maintenance</p>
              <p className="font-medium">January 2025</p>
            </div>
            <div className="p-3 rounded-lg bg-accent/50">
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Capacity</p>
              <p className="font-medium">15,000 sheets/hr</p>
            </div>
            <div className="p-3 rounded-lg bg-accent/50">
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Certification</p>
              <p className="font-medium">ISO 9001:2015</p>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const hotspotData = [
  {
    id: "press",
    title: "Heidelberg Speedmaster XL 106",
    description: "8-color LED UV offset press with Intellistart automation",
  },
  {
    id: "komori",
    title: "Komori Lithrone G40",
    description: "H-UV press with PQA color control system",
  },
  {
    id: "bobst",
    title: "Bobst Expertfold 110",
    description: "Auto-setup folder-gluer for crash-lock cartons",
  },
  {
    id: "quality",
    title: "Quality Control Lab",
    description: "Spectrophotometer verification & ISO 9001 processes",
  },
];

export function Factory3DGallery() {
  const [show3D, setShow3D] = useState(false);
  const reducedMotion = useReducedMotion() ?? false;
  const [isMobile, setIsMobile] = React.useState(false);
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  React.useEffect(() => {
    if (!isMobile && !reducedMotion) {
      const timer = setTimeout(() => setShow3D(true), 300);
      return () => clearTimeout(timer);
    }
  }, [isMobile, reducedMotion]);

  const hotspot = activeHotspot ? hotspotData.find((h) => h.id === activeHotspot) ?? null : null;

  return (
    <section className="relative w-full overflow-hidden">
      <div className="relative z-10">
        {!show3D && (isMobile || reducedMotion) ? (
          <MobileFallback />
        ) : show3D ? (
          <div className="relative">
            <div className="relative w-full aspect-[4/3] sm:aspect-[16/9] rounded-2xl overflow-hidden bg-gradient-to-br from-background via-accent/5 to-background" style={{ minHeight: "500px" }}>
              <FactoryCanvas activeHotspot={activeHotspot} setActiveHotspot={setActiveHotspot} />
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-background/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 pointer-events-none">
                <p className="text-center text-sm text-muted-foreground/80">
                  Drag to rotate • Scroll to zoom • Click hotspots for details
                </p>
              </div>
            </div>
            <HotspotModal hotspot={hotspot} onClose={() => setActiveHotspot(null)} />
          </div>
        ) : (
          <MobileFallback />
        )}
      </div>
    </section>
  );
}

export default Factory3DGallery;