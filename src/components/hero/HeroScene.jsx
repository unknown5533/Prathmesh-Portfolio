import { Suspense, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, Float, ContactShadows } from "@react-three/drei";
import { ChromeObject } from "./ChromeObject";
import { ErrorBoundary } from "../common/ErrorBoundary";
import { CanvasFallback } from "../common/CanvasFallback";

function Lighting() {
  return (
    <>
      {/* Soft Ambient Base */}
      <ambientLight intensity={0.4} />

      {/* Main Studio Key Rim Light (Cold White) */}
      <directionalLight
        position={[5, 7, 6]}
        intensity={2.8}
        color="#ffffff"
        castShadow
        shadow-mapSize={[1024, 1024]}
      />

      {/* Cinematic Red Rim Backlight - kisses the rear chamfers */}
      <pointLight
        position={[-6, -3, -3]}
        intensity={5.0}
        color="#E74747"
        distance={20}
      />

      {/* Top Cool Fill Light */}
      <pointLight
        position={[0, 6, 2]}
        intensity={1.4}
        color="#93c5fd"
        distance={15}
      />

      {/* Low Ground Fill (Subtle warm reflection) */}
      <pointLight
        position={[3, -4, 2]}
        intensity={0.8}
        color="#fef08a"
        distance={12}
      />
    </>
  );
}

export function HeroScene() {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setScale(0.68);
      } else if (width < 1024) {
        setScale(0.85);
      } else {
        setScale(1.05);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="relative w-full h-[380px] sm:h-[460px] md:h-[540px] lg:h-[620px] select-none flex items-center justify-center">
      <ErrorBoundary fallback={<CanvasFallback />}>
        <Canvas
          camera={{ position: [0, 0, 6.2], fov: 38 }}
          dpr={[1, 2]}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: "high-performance",
          }}
          className="w-full h-full cursor-grab active:cursor-grabbing"
        >
          <Lighting />

          <Suspense fallback={null}>
            {/* Studio Environment HDR for realistic liquid metal reflections */}
            <Environment preset="city" />

            <Float
              speed={1.6}
              rotationIntensity={0.3}
              floatIntensity={0.5}
              floatingRange={[-0.1, 0.1]}
            >
              <group scale={scale} position={[0, 0.1, 0]}>
                <ChromeObject />
              </group>
            </Float>

            {/* Depth Shadow */}
            <ContactShadows
              position={[0, -2.1, 0]}
              opacity={0.6}
              scale={8}
              blur={2.2}
              far={3.8}
              color="#000000"
            />
          </Suspense>
        </Canvas>
      </ErrorBoundary>

      {/* Minimal Camera Metadata Overlay */}
      <div className="absolute bottom-2 right-4 md:bottom-4 md:right-8 flex items-center gap-3 text-[10px] font-mono tracking-widest text-zinc-500 pointer-events-none select-none">
        <span className="hidden sm:inline">3D INTERACTIVE // DRAG TO ROTATE</span>
        <span className="text-[#E74747] font-bold">● LIVE RENDER</span>
      </div>
    </div>
  );
}
