import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, PerspectiveCamera, Environment } from "@react-three/drei";
import * as THREE from "three";

// F1 Car Model Component
function F1CarModel({ mousePosition }: { mousePosition: { x: number; y: number } }) {
  const groupRef = useRef<THREE.Group>(null);
  
  // Try to load the model - you'll replace this path with your actual model
  // For now, we'll create a simple car-like shape as a placeholder
  const carRef = useRef<THREE.Mesh>(null);

  // Smooth rotation based on mouse position
  useFrame(() => {
    if (groupRef.current) {
      // Convert mouse position to rotation
      const targetRotationY = mousePosition.x * 0.5;
      const targetRotationX = -mousePosition.y * 0.3;
      
      // Smooth interpolation
      groupRef.current.rotation.y += (targetRotationY - groupRef.current.rotation.y) * 0.05;
      groupRef.current.rotation.x += (targetRotationX - groupRef.current.rotation.x) * 0.05;
    }
  });

  // Placeholder car geometry (replace with your actual GLTF model)
  return (
    <group ref={groupRef} position={[0, -0.5, 0]}>
      {/* Main body */}
      <mesh ref={carRef} castShadow receiveShadow>
        <boxGeometry args={[2, 0.4, 1]} />
        <meshStandardMaterial color="#E30613" metalness={0.8} roughness={0.2} />
      </mesh>
      
      {/* Front wing */}
      <mesh position={[1.2, -0.1, 0]} castShadow>
        <boxGeometry args={[0.3, 0.05, 1.2]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.9} roughness={0.1} />
      </mesh>
      
      {/* Rear wing */}
      <mesh position={[-1.1, 0.4, 0]} castShadow>
        <boxGeometry args={[0.2, 0.6, 1]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.9} roughness={0.1} />
      </mesh>
      
      {/* Cockpit */}
      <mesh position={[0, 0.3, 0]} castShadow>
        <boxGeometry args={[1, 0.4, 0.7]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.7} roughness={0.3} />
      </mesh>
      
      {/* Wheels */}
      {[
        [-0.7, -0.3, 0.5],
        [-0.7, -0.3, -0.5],
        [0.7, -0.3, 0.5],
        [0.7, -0.3, -0.5],
      ].map((position, i) => (
        <mesh key={i} position={position as [number, number, number]} rotation={[0, 0, Math.PI / 2]} castShadow>
          <cylinderGeometry args={[0.3, 0.3, 0.2, 32]} />
          <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.4} />
        </mesh>
      ))}
    </group>
  );
}

function LoadedF1Car({ mousePosition }: { mousePosition: { x: number; y: number } }) {
  const groupRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF('/models/f1-car.glb');
  
  useFrame(() => {
    if (groupRef.current) {
      const targetRotationY = mousePosition.x * 0.5;
      const targetRotationX = -mousePosition.y * 0.3;
      
      groupRef.current.rotation.y += (targetRotationY - groupRef.current.rotation.y) * 0.05;
      groupRef.current.rotation.x += (targetRotationX - groupRef.current.rotation.x) * 0.05;
    }
  });
  
  return (
    <group ref={groupRef} position={[0, -0.5, 0]} scale={0.015}>
      <primitive object={scene} />
    </group>
  );
}

// Main Canvas Component
export default function F1Car3D() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY, currentTarget } = event;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    
    // Normalize mouse position to -1 to 1 range
    const x = ((clientX - left) / width) * 2 - 1;
    const y = ((clientY - top) / height) * 2 - 1;
    
    setMousePosition({ x, y });
  };

  return (
    <div 
      className="w-full h-full" 
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setMousePosition({ x: 0, y: 0 })}
    >
      <Canvas shadows>
        <PerspectiveCamera makeDefault position={[0, 1, 5]} fov={50} />
        
        {/* Lighting */}
        <ambientLight intensity={0.5} />
        <directionalLight
          position={[5, 5, 5]}
          intensity={1}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        <spotLight
          position={[-5, 5, 5]}
          angle={0.3}
          penumbra={1}
          intensity={0.5}
          castShadow
        />
        
        {/* Environment for reflections */}
        <Environment preset="sunset" />
        
        {/* F1 Car */}
        <LoadedF1Car mousePosition={mousePosition} />
        
        {/* Optional: Add a ground plane */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]} receiveShadow>
          <planeGeometry args={[20, 20]} />
          <shadowMaterial opacity={0.2} />
        </mesh>
        
        {/* Controls - you can enable this for additional manual rotation */}
        {/* <OrbitControls enableZoom={false} enablePan={false} /> */}
      </Canvas>
    </div>
  );
}

// Instructions for using your own 3D model:
// 1. Place your F1 car GLTF/GLB file in the public/models/ folder
// 2. Uncomment the LoadedF1Car component above
// 3. Replace F1CarModel with LoadedF1Car in the Canvas
// 4. Update the path in useGLTF to match your model's location
