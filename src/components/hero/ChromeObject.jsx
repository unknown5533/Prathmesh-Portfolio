import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * Creates a custom beveled 3D film aperture frame with corner registration
 * and sprocket markers, paired with an inner rotating titanium iris and optical core.
 */
export function ChromeObject() {
  const outerGroupRef = useRef();
  const innerIrisRef = useRef();
  const coreRef = useRef();

  // Check reduced motion preference
  const prefersReducedMotion = useMemo(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  // 1. Procedural Beveled 16:9 Cinematic Aperture Frame Geometry
  const frameGeometry = useMemo(() => {
    const shape = new THREE.Shape();
    const width = 3.6;
    const height = 2.4;
    const radius = 0.25;

    // Outer rounded rectangle
    const x = -width / 2;
    const y = -height / 2;

    shape.moveTo(x + radius, y);
    shape.lineTo(x + width - radius, y);
    shape.quadraticCurveTo(x + width, y, x + width, y + radius);
    shape.lineTo(x + width, y + height - radius);
    shape.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    shape.lineTo(x + radius, y + height);
    shape.quadraticCurveTo(x, y + height, x, y + height - radius);
    shape.lineTo(x, y + radius);
    shape.quadraticCurveTo(x, y, x + radius, y);

    // Inner cutout (aperture window 2.39:1 aspect)
    const hole = new THREE.Path();
    const innerW = 2.7;
    const innerH = 1.45;
    const innerR = 0.12;
    const hx = -innerW / 2;
    const hy = -innerH / 2;

    hole.moveTo(hx + innerR, hy);
    hole.lineTo(hx + innerW - innerR, hy);
    hole.quadraticCurveTo(hx + innerW, hy, hx + innerW, hy + innerR);
    hole.lineTo(hx + innerW, hy + innerH - innerR);
    hole.quadraticCurveTo(hx + innerW, hy + innerH, hx + innerW - innerR, hy + innerH);
    hole.lineTo(hx + innerR, hy + innerH);
    hole.quadraticCurveTo(hx, hy + innerH, hx, hy + innerH - innerR);
    hole.lineTo(hx, hy + innerR);
    hole.quadraticCurveTo(hx, hy, hx + innerR, hy);

    shape.holes.push(hole);

    const extrudeSettings = {
      depth: 0.25,
      bevelEnabled: true,
      bevelSegments: 4,
      steps: 1,
      bevelSize: 0.08,
      bevelThickness: 0.08,
    };

    const geom = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    geom.center();
    return geom;
  }, []);

  // 2. Sculptural Monogram "J" Geometry (for video editor Jangam)
  const monogramGeometry = useMemo(() => {
    const shape = new THREE.Shape();
    // Geometric "J" path
    shape.moveTo(-0.15, 0.45);
    shape.lineTo(0.25, 0.45);
    shape.lineTo(0.25, -0.2);
    shape.quadraticCurveTo(0.25, -0.45, 0.0, -0.45);
    shape.quadraticCurveTo(-0.25, -0.45, -0.25, -0.25);
    shape.lineTo(-0.1, -0.25);
    shape.quadraticCurveTo(-0.1, -0.35, 0.0, -0.35);
    shape.quadraticCurveTo(0.12, -0.35, 0.12, -0.2);
    shape.lineTo(0.12, 0.35);
    shape.lineTo(-0.15, 0.35);
    shape.closePath();

    const extrudeSettings = {
      depth: 0.14,
      bevelEnabled: true,
      bevelSegments: 3,
      steps: 1,
      bevelSize: 0.03,
      bevelThickness: 0.03,
    };

    const geom = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    geom.center();
    return geom;
  }, []);

  // 3. Ultra-Reflective Mirror Chrome Material
  const chromeMaterial = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#f8fafc"),
      metalness: 0.98,
      roughness: 0.08,
      clearcoat: 1.0,
      clearcoatRoughness: 0.04,
      reflectivity: 1.0,
      ior: 1.8,
    });
  }, []);

  // 4. Brushed Titanium Material for contrast details
  const brushedTitaniumMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color("#cbd5e1"),
      metalness: 0.85,
      roughness: 0.32,
    });
  }, []);

  // 5. Cinematic Red Accent Material for registration pins
  const redAccentMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color("#E74747"),
      emissive: new THREE.Color("#E74747"),
      emissiveIntensity: 0.6,
      metalness: 0.4,
      roughness: 0.2,
    });
  }, []);

  // Frame animation loop: subtle organic floating & cursor parallax
  useFrame((state) => {
    if (prefersReducedMotion) return;

    const time = state.clock.getElapsedTime();
    const pointer = state.pointer;

    if (outerGroupRef.current) {
      // Gentle floating sine motion
      const floatY = Math.sin(time * 1.2) * 0.08;
      const floatX = Math.cos(time * 0.9) * 0.04;

      // Smooth cursor parallax lerp
      const targetRotX = -pointer.y * 0.25 + Math.sin(time * 0.6) * 0.05;
      const targetRotY = pointer.x * 0.35 + Math.cos(time * 0.5) * 0.08;

      outerGroupRef.current.rotation.x = THREE.MathUtils.lerp(
        outerGroupRef.current.rotation.x,
        targetRotX,
        0.05
      );
      outerGroupRef.current.rotation.y = THREE.MathUtils.lerp(
        outerGroupRef.current.rotation.y,
        targetRotY,
        0.05
      );

      outerGroupRef.current.position.y = THREE.MathUtils.lerp(
        outerGroupRef.current.position.y,
        floatY,
        0.05
      );
      outerGroupRef.current.position.x = THREE.MathUtils.lerp(
        outerGroupRef.current.position.x,
        floatX,
        0.05
      );
    }

    // Concentric iris slow counter-drift
    if (innerIrisRef.current) {
      innerIrisRef.current.rotation.z = time * 0.15;
    }

    // Central Monogram core subtle precession
    if (coreRef.current) {
      coreRef.current.rotation.y = Math.sin(time * 1.4) * 0.25;
      coreRef.current.rotation.x = Math.cos(time * 1.1) * 0.15;
    }
  });

  return (
    <group ref={outerGroupRef} dispose={null}>
      {/* Main Outer Beveled Film Frame */}
      <mesh geometry={frameGeometry} material={chromeMaterial} castShadow receiveShadow />

      {/* 35mm Sprocket Notches (Side Accents) */}
      {[-1.68, 1.68].map((xPos, colIdx) => (
        <group key={`col-${colIdx}`} position={[xPos, 0, 0]}>
          {[-0.8, -0.4, 0, 0.4, 0.8].map((yPos, rowIdx) => (
            <mesh
              key={`sprocket-${colIdx}-${rowIdx}`}
              position={[0, yPos, 0.1]}
              material={brushedTitaniumMaterial}
            >
              <boxGeometry args={[0.08, 0.16, 0.15]} />
            </mesh>
          ))}
        </group>
      ))}

      {/* Viewfinder Corner Registration Notches */}
      {[
        [-1.7, 1.1],
        [1.7, 1.1],
        [-1.7, -1.1],
        [1.7, -1.1],
      ].map(([cx, cy], idx) => (
        <mesh
          key={`corner-${idx}`}
          position={[cx, cy, 0.14]}
          material={brushedTitaniumMaterial}
        >
          <boxGeometry args={[0.18, 0.18, 0.08]} />
        </mesh>
      ))}

      {/* Cinematic Red Tally Marker Dot on Top Edge */}
      <mesh position={[1.4, 1.1, 0.16]} material={redAccentMaterial}>
        <cylinderGeometry args={[0.05, 0.05, 0.04, 16]} rotation={[Math.PI / 2, 0, 0]} />
      </mesh>

      {/* Concentric Floating Iris Ring */}
      <group ref={innerIrisRef} position={[0, 0, 0.02]}>
        {/* Outer Torus Rim */}
        <mesh material={brushedTitaniumMaterial}>
          <torusGeometry args={[0.82, 0.035, 16, 48]} />
        </mesh>

        {/* 6 Radial Aperture Shutter Blades */}
        {[0, 1, 2, 3, 4, 5].map((i) => {
          const angle = (i * Math.PI) / 3;
          return (
            <group key={`blade-${i}`} rotation={[0, 0, angle]}>
              <mesh position={[0.42, 0, 0]} rotation={[0, 0, 0.3]} material={chromeMaterial}>
                <boxGeometry args={[0.4, 0.025, 0.02]} />
              </mesh>
            </group>
          );
        })}
      </group>

      {/* Optical Viewfinder Crosshair */}
      <group position={[0, 0, 0]}>
        <mesh position={[0, 0, 0]} material={brushedTitaniumMaterial}>
          <boxGeometry args={[1.2, 0.008, 0.008]} />
        </mesh>
        <mesh position={[0, 0, 0]} material={brushedTitaniumMaterial}>
          <boxGeometry args={[0.008, 0.9, 0.008]} />
        </mesh>
      </group>

      {/* Core Floating Sculptural Monogram ("J") */}
      <group ref={coreRef} position={[0, 0, 0.08]}>
        <mesh geometry={monogramGeometry} material={chromeMaterial} castShadow />

        {/* Inner Faceted Reflector Behind Monogram */}
        <mesh position={[0, 0, -0.06]} material={brushedTitaniumMaterial}>
          <cylinderGeometry args={[0.38, 0.38, 0.04, 8]} rotation={[Math.PI / 2, 0, 0]} />
        </mesh>
      </group>
    </group>
  );
}
