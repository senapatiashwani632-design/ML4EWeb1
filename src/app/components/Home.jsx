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
"use client"
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Sphere, Line } from "@react-three/drei";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { motion } from "framer-motion";
import { ReactTyped } from "react-typed";
import Navbar from "./Navbar";

function AnimatedNeuralNode({ position, color, size = 0.08 }) {
  const ref = useRef();

  useFrame((state) => {
    if (ref.current) {
      // Subtle pulsing animation
      ref.current.scale.x = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.1;
      ref.current.scale.y = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.1;
      ref.current.scale.z = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.1;
    }
  });

  return (
    <Sphere ref={ref} args={[size, 64, 64]} position={position}>
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={2} // boost emissive
        toneMapped={false} // important for bright bloom
      />
    </Sphere>
  );
}

function NeuralStructure({
  position = [0, 0, 0],
  color = "#00faff",
  nodeCount = 8,
}) {
  const nodes = useRef([]);

  if (nodes.current.length === 0) {
    for (let i = 0; i < nodeCount; i++) {
      nodes.current.push([
        (Math.random() - 0.5) * 3,
        (Math.random() - 0.5) * 3,
        (Math.random() - 0.5) * 3,
      ]);
    }
  }

  const connections = [];
  for (let i = 0; i < nodeCount; i++) {
    const connectionCount = 2 + Math.floor(Math.random() * 2);
    const connectedIndices = new Set();

    while (connectedIndices.size < connectionCount) {
      const targetIndex = Math.floor(Math.random() * nodeCount);
      if (targetIndex !== i) {
        connectedIndices.add(targetIndex);
      }
    }

    connectedIndices.forEach((targetIndex) => {
      connections.push([i, targetIndex]);
    });
  }

  return (
    <group position={position}>
      {nodes.current.map((pos, i) => (
        <AnimatedNeuralNode key={i} position={pos} color={color} />
      ))}

      {connections.map(([start, end], i) => (
        <Line
          key={i}
          points={[nodes.current[start], nodes.current[end]]}
          color={color}
          lineWidth={1}
          transparent
          opacity={0.6}
          toneMapped={false} // allow bloom on lines too
        />
      ))}
    </group>
  );
}

export default function Home() {
  const structures = [];
  const colors = [
    "#00faff",
    "#00d9ff",
    "#00bfff",
    "#1e90ff",
    "#007fff",
    "#4dffff",
  ];

  for (let i = 0; i < 12; i++) {
    structures.push({
      position: [
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 15,
      ],
      color: colors[i % colors.length],
      nodeCount: 5 + Math.floor(Math.random() * 6),
    });
  }

  return (
    <div className="w-screen h-screen bg-black">
      <Navbar/>
      <div className="absolute inset-0 flex md:left-10 items-center justify-center z-10 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="px-8 py-6 rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20 shadow-lg text-center pointer-events-auto"
        >
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-4xl  md:text-8xl font-bold text-cyan-200 drop-shadow-[0_0_15px_#00faff] special-font"
            // style={{ fontFamily: "Roboto, sans-serif" }}
          >
            <b>MACHINE LEARNING FOR EVERYONE</b> (<b>ML4E</b>)
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
            className="mt-2 text-lg md:text-2xl text-blue-300 drop-shadow-[0_0_10px_#00d9ff]"
            style={{ fontFamily: "Roboto, sans-serif" }}
          >
            <ReactTyped
              strings={["THE OFFICIAL MACHINE LEARNING CLUB OF NIT ROURKELA"]}
              typeSpeed={50}
              backSpeed={30}
              backDelay={1500}
              loop={false} 
              showCursor={true} 
            />
          </motion.p>
        </motion.div>
      </div>

      <Canvas camera={{ position: [0, 0, 10], fov: 30 }}>
        <color attach="background" args={["#000000"]} />
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={2} />

        {structures.map((props, i) => (
          <NeuralStructure key={i} {...props} />
        ))}

        <OrbitControls
          enableZoom={true}
          autoRotate
          autoRotateSpeed={1.5} // adjust speed (default = 2.0)
          enablePan={false}
          enableRotate={window.innerWidth > 768}
          touches={{
            ONE: null,
            TWO: null
          }}
        />

        {/* 🌟 Bloom Effect for neon glow */}
        <EffectComposer>
          <Bloom
            intensity={2.5} // strength of glow
            kernelSize={3} // blur size
            luminanceThreshold={0.1} // what gets bloomed
            luminanceSmoothing={0.9}
          />
        </EffectComposer>
      </Canvas>
    </div>
  );
}