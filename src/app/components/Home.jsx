import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Sphere, Line } from "@react-three/drei";
import { useRef, useMemo, useEffect, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { motion } from "framer-motion";
import Navbar from "./Navbar";
import { ChevronRight } from "lucide-react";

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

  const handleExploreClick = () => {
    // Dispatch custom event to open navbar
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("open-navigation"));
    }
    
    // Also scroll to next section if needed
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  return (
    <div className="relative w-full min-h-screen bg-[#0b1117] overflow-hidden" suppressHydrationWarning>
      <Navbar/>
      
      {/* Content Section */}
      <div className="relative min-h-screen">
        <div className={`absolute inset-0 flex ${isMobile ? 'items-start pt-32' : 'items-center justify-center'} z-10 pointer-events-none`}>
          <Glow />
          
          {/* Main Content Container */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
            className={`flex flex-col items-center justify-center px-8 py-6 rounded-2xl bg-slate-900/40 backdrop-blur-xl border border-cyan-500/30 shadow-2xl text-center pointer-events-auto mx-4 ${isMobile ? 'mt-8 max-w-[90%]' : 'max-w-4xl'}`}
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
              className="flex flex-col items-center"
            >
              <motion.h1
                variants={{
                  hidden: { opacity: 0, y: -20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
                }}
                className={`${isMobile ? 'text-4xl' : 'text-3xl md:text-7xl'} font-bold text-cyan-200 drop-shadow-[0_0_20px_#00faff] mb-4 special-font`}
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
                className={`mt-2 ${isMobile ? 'text-sm' : 'text-base md:text-xl'} text-blue-300 drop-shadow-[0_0_10px_#00d9ff] mb-8 md:mb-12`}
                style={{ fontFamily: "Roboto, sans-serif" }}
              >
                THE OFFICIAL MACHINE LEARNING CLUB OF NIT ROURKELA
              </motion.p>

              {/* Eye-catching Learn More Button */}
              <motion.button
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.5, ease: "easeOut" }}
                onClick={handleExploreClick}
                className="group relative overflow-hidden px-8 md:px-12 py-3 md:py-4 rounded-full bg-gradient-to-r from-cyan-500/20 via-cyan-600/30 to-blue-500/20 border border-cyan-400/50 hover:border-cyan-300 transition-all duration-300 cursor-pointer shadow-[0_0_30px_rgba(0,245,255,0.3)] hover:shadow-[0_0_40px_rgba(0,245,255,0.5)]"
              >
                {/* Glow effect behind button */}
                <div className="absolute inset-0 -z-10 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Button text and icon */}
                <div className="flex items-center justify-center gap-3">
                  <span className={`${isMobile ? 'text-lg' : 'text-2xl'} font-orbitron font-bold bg-gradient-to-r from-cyan-200 to-blue-200 bg-clip-text text-transparent group-hover:from-white group-hover:to-cyan-100 transition-all duration-300`}>
                    EXPLORE ML4E
                  </span>
                  <ChevronRight className="w-6 h-6 md:w-8 md:h-8 text-cyan-300 group-hover:text-white group-hover:translate-x-2 transition-all duration-300" />
                </div>
                
                {/* Animated border effect */}
                <div className="absolute inset-0 rounded-full border border-cyan-400/30 group-hover:border-cyan-300/50 transition-all duration-300" />
                
                {/* Pulsing ring effect */}
                <div className="absolute inset-0 rounded-full animate-pulse border border-cyan-500/20" />
                
                {/* Neural connection dots effect */}
                <div className="absolute -top-1 -left-1 w-2 h-2 rounded-full bg-cyan-400 opacity-70 group-hover:opacity-100 group-hover:animate-ping" />
                <div className="absolute -bottom-1 -right-1 w-2 h-2 rounded-full bg-blue-400 opacity-70 group-hover:opacity-100 group-hover:animate-ping delay-75" />
              </motion.button>
            </motion.div>
          </motion.div>
        </div>

        {/* 3D Canvas with touch event handling */}
        <div className="fixed inset-0 z-0">
          <Canvas 
            camera={{ position: [0, 0, 15], fov: 60 }}
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
          
          {isMobile && (
            <div 
              className="absolute inset-0 z-0"
              style={{ 
                pointerEvents: 'auto',
                touchAction: 'pan-y',
                WebkitOverflowScrolling: 'touch'
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}