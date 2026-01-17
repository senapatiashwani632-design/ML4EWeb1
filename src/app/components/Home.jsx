// "use client";
// import { Canvas } from "@react-three/fiber";
// import { OrbitControls } from "@react-three/drei";
// import { EffectComposer, Bloom } from "@react-three/postprocessing";
// import * as THREE from "three";

// function AISphere() {
//   return (
//     <mesh>
//       {/* AI Core Sphere */}
//       <sphereGeometry args={[1.2, 64, 64]} />
//       <meshStandardMaterial
//         color="#00f5d4"
//         emissive="#00f5d4"
//         emissiveIntensity={0.6}
//         roughness={0.2}
//         metalness={0.8}
//       />

//       {/* Wireframe overlay */}
//       <lineSegments>
//         <wireframeGeometry attach="geometry" args={[new THREE.SphereGeometry(1.21, 32, 32)]} />
//         <lineBasicMaterial color="#0ff" linewidth={1} />
//       </lineSegments>
//     </mesh>
//   );
// }

// export default function Hero3D() {
//   return (
//     <div className="w-full h-screen bg-black">
//       <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
//         <ambientLight intensity={0.3} />
//         <pointLight position={[5, 5, 5]} intensity={2} color="#00f5d4" />

//         {/* The futuristic AI sphere */}
//         <AISphere />

//         {/* Glow effects */}
//         <EffectComposer>
//           <Bloom intensity={1.2} luminanceThreshold={0.2} />
//         </EffectComposer>

//         <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1.5} />
//       </Canvas>
//     </div>
//   );
// }
// import { Canvas } from "@react-three/fiber";
// import { OrbitControls } from "@react-three/drei";
// import { Sphere, Line } from "@react-three/drei";
// import { useRef } from "react";
// import { useFrame } from "@react-three/fiber";
// import { EffectComposer, Bloom } from "@react-three/postprocessing";
// import { motion } from "framer-motion";
// import { ReactTyped } from "react-typed";
// import Navbar from "./Navbar";
// const Glow = ({ className = "" }) => (
//   <div
//     className={`pointer-events-none absolute inset-0 -z-10 opacity-60 blur-2xl 
//       [background:radial-gradient(60%_60%_at_20%_0%,rgba(0,255,255,.15),transparent_60%),radial-gradient(50%_50%_at_90%_20%,rgba(0,255,200,.12),transparent_60%),radial-gradient(40%_40%_at_50%_120%,rgba(0,200,255,.1),transparent_60%)] ${className}`}
//   />
// );
// function AnimatedNeuralNode({ position, color, size = 0.08 }) {
//   const ref = useRef();

//   useFrame((state) => {
//     if (ref.current) {
//       // Subtle pulsing animation
//       ref.current.scale.x = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.1;
//       ref.current.scale.y = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.1;
//       ref.current.scale.z = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.1;
//     }
//   });

//   return (
//     <Sphere ref={ref} args={[size, 64, 64]} position={position}>
//       <meshStandardMaterial
//         color={color}
//         emissive={color}
//         emissiveIntensity={2} // boost emissive
//         toneMapped={false} // important for bright bloom
//       />
//     </Sphere>
//   );
// }

// function NeuralStructure({
//   position = [0, 0, 0],
//   color = "#00faff",
//   nodeCount = 8,
// }) {
//   const nodes = useRef([]);

//   if (nodes.current.length === 0) {
//     for (let i = 0; i < nodeCount; i++) {
//       nodes.current.push([
//         (Math.random() - 0.5) * 3,
//         (Math.random() - 0.5) * 3,
//         (Math.random() - 0.5) * 3,
//       ]);
//     }
//   }

//   const connections = [];
//   for (let i = 0; i < nodeCount; i++) {
//     const connectionCount = 2 + Math.floor(Math.random() * 2);
//     const connectedIndices = new Set();

//     while (connectedIndices.size < connectionCount) {
//       const targetIndex = Math.floor(Math.random() * nodeCount);
//       if (targetIndex !== i) {
//         connectedIndices.add(targetIndex);
//       }
//     }

//     connectedIndices.forEach((targetIndex) => {
//       connections.push([i, targetIndex]);
//     });
//   }

//   return (
//     <group position={position}>
//       {nodes.current.map((pos, i) => (
//         <AnimatedNeuralNode key={i} position={pos} color={color} />
//       ))}

//       {connections.map(([start, end], i) => (
//         <Line
//           key={i}
//           points={[nodes.current[start], nodes.current[end]]}
//           color={color}
//           lineWidth={1}
//           transparent
//           opacity={0.6}
//           toneMapped={false} // allow bloom on lines too
//         />
//       ))}
//     </group>
//   );
// }

// export default function Home() {
//   const structures = [];
//   const colors = [
//     "#00faff",
//     "#00d9ff",
//     "#00bfff",
//     "#1e90ff",
//     "#007fff",
//     "#4dffff",
//   ];

//   for (let i = 0; i < 12; i++) {
//     structures.push({
//       position: [
//         (Math.random() - 0.5) * 15,
//         (Math.random() - 0.5) * 15,
//         (Math.random() - 0.5) * 15,
//       ],
//       color: colors[i % colors.length],
//       nodeCount: 5 + Math.floor(Math.random() * 6),
//     });
//   }

//   return (
//     <div className="w-screen h-screen border-t border-cyan-500/20
//         bg-[#0b1117]">
//       <Navbar/>
//       <div className="absolute inset-0 flex md:left-10 items-center justify-center z-10 pointer-events-none">
//          <Glow />
//         <motion.div
//           initial={{ opacity: 0, scale: 0.9 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ duration: 1, ease: "easeOut" }}
//           className="px-8 py-6 rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20 shadow-lg text-center pointer-events-auto"
//         >
//           <motion.h1
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 1, ease: "easeOut" }}
//             className="text-4xl  md:text-8xl font-bold text-cyan-200 drop-shadow-[0_0_15px_#00faff] special-font"
//             // style={{ fontFamily: "Roboto, sans-serif" }}
//           >
//             <b>MACHINE LEARNING FOR EVERYONE</b> (<b>ML4E</b>)
//           </motion.h1>

//           <motion.p
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
//             className="mt-2 text-lg md:text-2xl text-blue-300 drop-shadow-[0_0_10px_#00d9ff]"
//             style={{ fontFamily: "Roboto, sans-serif" }}
//           >
//             <ReactTyped
//               strings={["THE OFFICIAL MACHINE LEARNING CLUB OF NIT ROURKELA"]}
//               typeSpeed={50}
//               backSpeed={30}
//               backDelay={1500}
//               loop={false} 
//               showCursor={true} 
//             />
//           </motion.p>
//         </motion.div>
//       </div>

//       <Canvas camera={{ position: [0, 0, 10], fov: 30 }}>
//         <color attach="background" args={["#000000"]} />
//         <ambientLight intensity={0.3} />
//         <pointLight position={[10, 10, 10]} intensity={2} />

//         {structures.map((props, i) => (
//           <NeuralStructure key={i} {...props} />
//         ))}

//         <OrbitControls
//           enableZoom={true}
//           autoRotate
//           autoRotateSpeed={1.5} // adjust speed (default = 2.0)
//           enablePan={false}
//           enableRotate={window.innerWidth > 768}
//           touches={{
//             ONE: null,
//             TWO: null
//           }}
//         />

//         {/* 🌟 Bloom Effect for neon glow */}
//         <EffectComposer>
//           <Bloom
//             intensity={2.5} // strength of glow
//             kernelSize={3} // blur size
//             luminanceThreshold={0.1} // what gets bloomed
//             luminanceSmoothing={0.9}
//           />
//         </EffectComposer>
//       </Canvas>
//     </div>
//   );
// }
// import { Canvas } from "@react-three/fiber";
// import { OrbitControls } from "@react-three/drei";
// import { Sphere, Line } from "@react-three/drei";
// import { useRef, useMemo } from "react";
// import { useFrame } from "@react-three/fiber";
// import { EffectComposer, Bloom } from "@react-three/postprocessing";
// import { motion } from "framer-motion";
// import Navbar from "./Navbar";

// const Glow = ({ className = "" }) => (
//   <div
//     className={`pointer-events-none absolute inset-0 -z-10 opacity-60 blur-2xl 
//       [background:radial-gradient(60%_60%_at_20%_0%,rgba(0,255,255,.15),transparent_60%),radial-gradient(50%_50%_at_90%_20%,rgba(0,255,200,.12),transparent_60%),radial-gradient(40%_40%_at_50%_120%,rgba(0,200,255,.1),transparent_60%)] ${className}`}
//   />
// );

// // Navbar placeholder


// function AnimatedNeuralNode({ position, color, size = 0.08, delay = 0 }) {
//   const ref = useRef();

//   useFrame((state) => {
//     if (ref.current) {
//       // Subtle pulsing animation with individual delay
//       const time = state.clock.elapsedTime + delay;
//       ref.current.scale.x = 1 + Math.sin(time * 2) * 0.15;
//       ref.current.scale.y = 1 + Math.sin(time * 2) * 0.15;
//       ref.current.scale.z = 1 + Math.sin(time * 2) * 0.15;
//     }
//   });

//   return (
//     <Sphere ref={ref} args={[size, 32, 32]} position={position}>
//       <meshStandardMaterial
//         color={color}
//         emissive={color}
//         emissiveIntensity={2}
//         toneMapped={false}
//       />
//     </Sphere>
//   );
// }
// // Add this component after the imports
// function ElectricCircuitBackground() {
//   return (
//     <group position={[0, 0, -10]}>
//       {/* Main circuit grid */}
//       <gridHelper 
//         args={[50, 100, '#00faff', '#00a8ff']} 
//         rotation={[0, 0, Math.PI / 4]}
//       />
      
//       {/* Floating circuit lines */}
//       {Array.from({ length: 20 }).map((_, i) => {
//         const x = (Math.random() - 0.5) * 40;
//         const y = (Math.random() - 0.5) * 40;
//         const length = 3 + Math.random() * 5;
        
//         return (
//           <Line
//             key={i}
//             points={[
//               [x, y, 0],
//               [x + length, y + (Math.random() - 0.5) * 2, 0]
//             ]}
//             color="#00faff"
//             lineWidth={0.5}
//             transparent
//             opacity={0.3 + Math.random() * 0.3}
//           />
//         );
//       })}
      
//       {/* Circuit nodes */}
//       {Array.from({ length: 30 }).map((_, i) => (
//         <Sphere
//           key={`node-${i}`}
//           args={[0.05, 16, 16]}
//           position={[
//             (Math.random() - 0.5) * 40,
//             (Math.random() - 0.5) * 40,
//             0
//           ]}
//         >
//           <meshBasicMaterial color="#00faff" toneMapped={false} />
//         </Sphere>
//       ))}
//     </group>
//   );
// }
// function NeuralStructure({
//   position = [0, 0, 0],
//   color = "#00faff",
//   structureIndex = 0,
// }) {
//   // Generate fixed node positions based on structure index
//   const nodes = useMemo(() => {
//     const nodePositions = [];
//     const nodeCount = 12;
//     const radius = 1.2;
    
//     // Create a spherical distribution of nodes
//     for (let i = 0; i < nodeCount; i++) {
//       const phi = Math.acos(-1 + (2 * i) / nodeCount);
//       const theta = Math.sqrt(nodeCount * Math.PI) * phi + structureIndex;
      
//       nodePositions.push([
//         radius * Math.cos(theta) * Math.sin(phi),
//         radius * Math.sin(theta) * Math.sin(phi),
//         radius * Math.cos(phi),
//       ]);
//     }
//     return nodePositions;
//   }, [structureIndex]);

//   // Generate fixed connections
//   const connections = useMemo(() => {
//     const conns = [];
//     const nodeCount = nodes.length;
    
//     for (let i = 0; i < nodeCount; i++) {
//       // Connect to nearest neighbors
//       const distances = nodes.map((node, j) => ({
//         index: j,
//         distance: Math.hypot(
//           node[0] - nodes[i][0],
//           node[1] - nodes[i][1],
//           node[2] - nodes[i][2]
//         ),
//       }));
      
//       distances.sort((a, b) => a.distance - b.distance);
      
//       // Connect to 3 nearest neighbors
//       for (let j = 1; j <= 3 && j < distances.length; j++) {
//         const targetIndex = distances[j].index;
//         if (i < targetIndex) { // Avoid duplicate connections
//           conns.push([i, targetIndex]);
//         }
//       }
//     }
//     return conns;
//   }, [nodes]);

//   return (
//     <group position={position}>
//       {nodes.map((pos, i) => (
//         <AnimatedNeuralNode 
//           key={i} 
//           position={pos} 
//           color={color}
//           delay={i * 0.1}
//         />
//       ))}

//       {connections.map(([start, end], i) => (
//         <Line
//           key={i}
//           points={[nodes[start], nodes[end]]}
//           color={color}
//           lineWidth={1.5}
//           transparent
//           opacity={0.4}
//           toneMapped={false}
//         />
//       ))}
//     </group>
//   );
// }

// export default function Home() {
//   const colors = [
//     "#00faff", // Cyan
//     "#00d9ff", // Light blue
//     "#00bfff", // Sky blue
//     "#1e90ff", // Dodger blue
//     "#007fff", // Azure
//     "#4dffff", // Electric cyan
//   ];

//   // Fixed positions covering entire viewport in 3D space
//   const structures = useMemo(() => {
//     const positions = [
//       // Top row - Front layer
//       [-8, 5, 2],
//       [-4, 6, 2],
//       [0, 5.5, 2],
//       [4, 6, 2],
//       [8, 5, 2],
      
//       // Middle-top row
//       [-7, 3, 0],
//       [-3.5, 3.5, 0],
//       [0, 3, 0],
//       [3.5, 3.5, 0],
//       [7, 3, 0],
      
//       // Center row
//       [-8, 0, -1],
//       [-4, 0, -1],
//       [0, 0, -1],
//       [4, 0, -1],
//       [8, 0, -1],
      
//       // Middle-bottom row
//       [-7, -3, 0],
//       [-3.5, -3.5, 0],
//       [0, -3, 0],
//       [3.5, -3.5, 0],
//       [7, -3, 0],
      
//       // Bottom row - Front layer
//       [-8, -5, 2],
//       [-4, -6, 2],
//       [0, -5.5, 2],
//       [4, -6, 2],
//       [8, -5, 2],
      
//       // Back layer scattered
//       [-6, 4, -4],
//       [6, 4, -4],
//       [-6, -4, -4],
//       [6, -4, -4],
//       [0, 5, -4],
//       [0, -5, -4],

     
//     ];

//     return positions.map((position, i) => ({
//       position,
//       color: colors[i % colors.length],
//       structureIndex: i,
//     }));
//   }, []);
//   function CyberGridBackground() {
//   const gridRef = useRef();
  
//   useFrame((state) => {
//     if (gridRef.current) {
//       // Subtle movement
//       gridRef.current.position.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.5;
//       gridRef.current.position.y = Math.cos(state.clock.elapsedTime * 0.08) * 0.5;
//     }
//   });

//   return (
//     <group ref={gridRef} position={[0, 0, -8]}>
//       {/* Main grid plane */}
//       <mesh rotation={[-Math.PI / 2, 0, 0]}>
//         <planeGeometry args={[60, 60, 60, 60]} />
//         <meshBasicMaterial
//           color="#001122"
//           wireframe
//           wireframeLinewidth={1}
//           transparent
//           opacity={0.2}
//         />
//       </mesh>
      
//       {/* Vertical grid lines */}
//       <mesh rotation={[0, 0, 0]} position={[0, 0, 0]}>
//         <planeGeometry args={[60, 60, 60, 60]} />
//         <meshBasicMaterial
//           color="#003344"
//           wireframe
//           wireframeLinewidth={1}
//           transparent
//           opacity={0.15}
//         />
//       </mesh>
      
//       {/* Glowing data points */}
//       {Array.from({ length: 50 }).map((_, i) => (
//         <mesh
//           key={i}
//           position={[
//             (Math.random() - 0.5) * 50,
//             (Math.random() - 0.5) * 50,
//             (Math.random() - 0.5) * 10
//           ]}
//         >
//           <sphereGeometry args={[0.03, 8, 8]} />
//           <meshBasicMaterial
//             color="#00faff"
//             toneMapped={false}
//             transparent
//             opacity={0.6}
//           />
//         </mesh>
//       ))}
//     </group>
//   );
// }

//   return (
//     <div className="w-screen min-h-screen border-t border-cyan-500/20 bg-[#0b1117] overflow-y-auto">
//       <Navbar/>
      
//       {/* Content Section */}
//       <div className="relative min-h-screen">
//         <div className="absolute inset-0 flex md:left-10 items-center justify-center z-10 pointer-events-none pt-20">
//           <Glow />
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
//             className="px-8 py-6 rounded-2xl bg-slate-900/40 backdrop-blur-xl border border-cyan-500/30 shadow-2xl text-center pointer-events-auto mx-4 max-w-4xl"
//           >
//             <motion.div
//               initial="hidden"
//               animate="visible"
//               variants={{
//                 hidden: { opacity: 0 },
//                 visible: {
//                   opacity: 1,
//                   transition: {
//                     staggerChildren: 0.3,
//                     delayChildren: 0.2
//                   }
//                 }
//               }}
//             >
//               <motion.h1
//                 variants={{
//                   hidden: { opacity: 0, y: -20 },
//                   visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
//                 }}
//                 className="text-3xl md:text-7xl font-bold text-cyan-200 drop-shadow-[0_0_20px_#00faff] mb-4 special-font"
//                 style={{ fontFamily: "Orbitron, sans-serif" }}
//               >
//                 <b>MACHINE LEARNING FOR EVERYONE</b>
//               </motion.h1>
              
//               <motion.div
//                 variants={{
//                   hidden: { opacity: 0, scale: 0.9 },
//                   visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: "easeOut" } }
//                 }}
//                 className="text-2xl md:text-5xl font-bold text-cyan-300 drop-shadow-[0_0_15px_#00d9ff] mb-4"
//                 style={{ fontFamily: "Orbitron, sans-serif" }}
//               >
//                 (ML4E)
//               </motion.div>

//               <motion.p
//                 variants={{
//                   hidden: { opacity: 0, y: 20 },
//                   visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
//                 }}
//                 className="mt-2 text-base md:text-xl text-blue-300 drop-shadow-[0_0_10px_#00d9ff]"
//                 style={{ fontFamily: "Roboto, sans-serif" }}
//               >
//                 THE OFFICIAL MACHINE LEARNING CLUB OF NIT ROURKELA
//               </motion.p>
//             </motion.div>
//           </motion.div>
//         </div>

//         {/* 3D Canvas */}
//         <div className="fixed inset-0 z-0">
//           <Canvas camera={{ position: [0, 0, 15], fov: 60 }}>
//             <color attach="background" args={["#000000"]} />
//             <CyberGridBackground />
//             <ambientLight intensity={0.5} />
//             <pointLight position={[10, 10, 10]} intensity={1.5} />
//             <pointLight position={[-10, -10, -10]} intensity={0.8} color="#00faff" />

//             {structures.map((props, i) => (
//               <NeuralStructure key={i} {...props} />
//             ))}

//             <OrbitControls
//               enableZoom={false}
//               autoRotate={false}
//               enablePan={false}
//               enableRotate={false}
//               minPolarAngle={Math.PI / 2}
//               maxPolarAngle={Math.PI / 2}
//               minDistance={10}
//               maxDistance={14}
//             />

//             <EffectComposer>
//               <Bloom
//                 intensity={2}
//                 kernelSize={3}
//                 luminanceThreshold={0.1}
//                 luminanceSmoothing={0.9}
//               />
//             </EffectComposer>
//           </Canvas>
//         </div>
//       </div>
//     </div>
//   );
// }
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Sphere, Line } from "@react-three/drei";
import { useRef, useMemo, useEffect, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { motion } from "framer-motion";
import Navbar from "./Navbar";

const Glow = ({ className = "" }) => (
  <div
    className={`pointer-events-none absolute inset-0 -z-10 opacity-60 blur-2xl 
      [background:radial-gradient(60%_60%_at_20%_0%,rgba(0,255,255,.15),transparent_60%),radial-gradient(50%_50%_at_90%_20%,rgba(0,255,200,.12),transparent_60%),radial-gradient(40%_40%_at_50%_120%,rgba(0,200,255,.1),transparent_60%)] ${className}`}
  />
);

function AnimatedNeuralNode({ position, color, size = 0.08, delay = 0 }) {
  const ref = useRef();

  useFrame((state) => {
    if (ref.current) {
      const time = state.clock.elapsedTime + delay;
      ref.current.scale.x = 1 + Math.sin(time * 2) * 0.15;
      ref.current.scale.y = 1 + Math.sin(time * 2) * 0.15;
      ref.current.scale.z = 1 + Math.sin(time * 2) * 0.15;
    }
  });

  return (
    <Sphere ref={ref} args={[size, 32, 32]} position={position}>
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={2}
        toneMapped={false}
      />
    </Sphere>
  );
}

function NeuralStructure({
  position = [0, 0, 0],
  color = "#00faff",
  structureIndex = 0,
}) {
  const nodes = useMemo(() => {
    const nodePositions = [];
    const nodeCount = 12;
    const radius = 1.2;
    
    for (let i = 0; i < nodeCount; i++) {
      const phi = Math.acos(-1 + (2 * i) / nodeCount);
      const theta = Math.sqrt(nodeCount * Math.PI) * phi + structureIndex;
      
      nodePositions.push([
        radius * Math.cos(theta) * Math.sin(phi),
        radius * Math.sin(theta) * Math.sin(phi),
        radius * Math.cos(phi),
      ]);
    }
    return nodePositions;
  }, [structureIndex]);

  const connections = useMemo(() => {
    const conns = [];
    const nodeCount = nodes.length;
    
    for (let i = 0; i < nodeCount; i++) {
      const distances = nodes.map((node, j) => ({
        index: j,
        distance: Math.hypot(
          node[0] - nodes[i][0],
          node[1] - nodes[i][1],
          node[2] - nodes[i][2]
        ),
      }));
      
      distances.sort((a, b) => a.distance - b.distance);
      
      for (let j = 1; j <= 3 && j < distances.length; j++) {
        const targetIndex = distances[j].index;
        if (i < targetIndex) {
          conns.push([i, targetIndex]);
        }
      }
    }
    return conns;
  }, [nodes]);

  return (
    <group position={position}>
      {nodes.map((pos, i) => (
        <AnimatedNeuralNode 
          key={i} 
          position={pos} 
          color={color}
          delay={i * 0.1}
        />
      ))}

      {connections.map(([start, end], i) => (
        <Line
          key={i}
          points={[nodes[start], nodes[end]]}
          color={color}
          lineWidth={1.5}
          transparent
          opacity={0.4}
          toneMapped={false}
        />
      ))}
    </group>
  );
}

function CyberGridBackground() {
  const gridRef = useRef();
  
  useFrame((state) => {
    if (gridRef.current) {
      gridRef.current.position.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.5;
      gridRef.current.position.y = Math.cos(state.clock.elapsedTime * 0.08) * 0.5;
    }
  });

  return (
    <group ref={gridRef} position={[0, 0, -8]}>
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[60, 60, 60, 60]} />
        <meshBasicMaterial
          color="#001122"
          wireframe
          wireframeLinewidth={1}
          transparent
          opacity={0.2}
        />
      </mesh>
      
      <mesh rotation={[0, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[60, 60, 60, 60]} />
        <meshBasicMaterial
          color="#003344"
          wireframe
          wireframeLinewidth={1}
          transparent
          opacity={0.15}
        />
      </mesh>
      
      {Array.from({ length: 50 }).map((_, i) => (
        <mesh
          key={i}
          position={[
            (Math.random() - 0.5) * 50,
            (Math.random() - 0.5) * 50,
            (Math.random() - 0.5) * 10
          ]}
        >
          <sphereGeometry args={[0.03, 8, 8]} />
          <meshBasicMaterial
            color="#00faff"
            toneMapped={false}
            transparent
            opacity={0.6}
          />
        </mesh>
      ))}
    </group>
  );
}

export default function Home() {
  const colors = [
    "#00faff",
    "#00d9ff",
    "#00bfff",
    "#1e90ff",
    "#007fff",
    "#4dffff",
  ];

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const structures = useMemo(() => {
    const positions = [
      [-8, 5, 2],
      [-4, 6, 2],
      [0, 5.5, 2],
      [4, 6, 2],
      [8, 5, 2],
      [-7, 3, 0],
      [-3.5, 3.5, 0],
      [0, 3, 0],
      [3.5, 3.5, 0],
      [7, 3, 0],
      [-8, 0, -1],
      [-4, 0, -1],
      [0, 0, -1],
      [4, 0, -1],
      [8, 0, -1],
      [-7, -3, 0],
      [-3.5, -3.5, 0],
      [0, -3, 0],
      [3.5, -3.5, 0],
      [7, -3, 0],
      [-8, -5, 2],
      [-4, -6, 2],
      [0, -5.5, 2],
      [4, -6, 2],
      [8, -5, 2],
      [-6, 4, -4],
      [6, 4, -4],
      [-6, -4, -4],
      [6, -4, -4],
      [0, 5, -4],
      [0, -5, -4],
    ];

    return positions.map((position, i) => ({
      position,
      color: colors[i % colors.length],
      structureIndex: i,
    }));
  }, [colors]);

  return (
    <div className="relative w-full min-h-screen bg-[#0b1117] overflow-hidden" suppressHydrationWarning>
      <Navbar/>
      
      {/* Content Section */}
      <div className="relative min-h-screen">
        <div className={`absolute inset-0 flex ${isMobile ? 'items-start pt-32' : 'md:left-10 items-center justify-center'} z-10 pointer-events-none pt-20`}>
          <Glow />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
            className={`px-8 py-6 rounded-2xl bg-slate-900/40 backdrop-blur-xl border border-cyan-500/30 shadow-2xl text-center pointer-events-auto mx-4 ${isMobile ? 'mt-8' : 'max-w-4xl'}`}
          >
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.3,
                    delayChildren: 0.2
                  }
                }
              }}
            >
              <motion.h1
                variants={{
                  hidden: { opacity: 0, y: -20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
                }}
                className={`${isMobile ? 'text-2xl' : 'text-3xl md:text-7xl'} font-bold text-cyan-200 drop-shadow-[0_0_20px_#00faff] mb-4 special-font`}
                style={{ fontFamily: "Orbitron, sans-serif" }}
              >
                <b>MACHINE LEARNING FOR EVERYONE</b>
              </motion.h1>
              
              <motion.div
                variants={{
                  hidden: { opacity: 0, scale: 0.9 },
                  visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: "easeOut" } }
                }}
                className={`${isMobile ? 'text-xl' : 'text-2xl md:text-5xl'} font-bold text-cyan-300 drop-shadow-[0_0_15px_#00d9ff] mb-4`}
                style={{ fontFamily: "Orbitron, sans-serif" }}
              >
                (ML4E)
              </motion.div>

              <motion.p
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
                }}
                className={`mt-2 ${isMobile ? 'text-sm' : 'text-base md:text-xl'} text-blue-300 drop-shadow-[0_0_10px_#00d9ff]`}
                style={{ fontFamily: "Roboto, sans-serif" }}
              >
                THE OFFICIAL MACHINE LEARNING CLUB OF NIT ROURKELA
              </motion.p>
            </motion.div>
          </motion.div>
        </div>

        {/* 3D Canvas with touch event handling */}
        <div className="fixed inset-0 z-0">
          <Canvas 
            camera={{ position: [0, 0, 15], fov: 60 }}
            // Disable touch events on mobile to allow scrolling
            style={{ touchAction: isMobile ? 'none' : 'auto' }}
          >
            <color attach="background" args={["#000000"]} />
            <CyberGridBackground />
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1.5} />
            <pointLight position={[-10, -10, -10]} intensity={0.8} color="#00faff" />

            {structures.map((props, i) => (
              <NeuralStructure key={i} {...props} />
            ))}

            {/* Disable controls on mobile */}
            {!isMobile && (
              <OrbitControls
                enableZoom={false}
                autoRotate={false}
                enablePan={false}
                enableRotate={false}
                minPolarAngle={Math.PI / 2}
                maxPolarAngle={Math.PI / 2}
                minDistance={10}
                maxDistance={14}
              />
            )}

            <EffectComposer>
              <Bloom
                intensity={2}
                kernelSize={3}
                luminanceThreshold={0.1}
                luminanceSmoothing={0.9}
              />
            </EffectComposer>
          </Canvas>
          
          {/* Overlay for mobile to allow scrolling through the canvas */}
          {isMobile && (
            <div 
              className="absolute inset-0 z-0"
              style={{ 
                pointerEvents: 'auto',
                touchAction: 'pan-y',
                // This ensures the canvas area doesn't block scrolling
                WebkitOverflowScrolling: 'touch'
              }}
            />
          )}
        </div>
        
        {/* Add scrollable content area */}
      
      </div>
    </div>
  );
}