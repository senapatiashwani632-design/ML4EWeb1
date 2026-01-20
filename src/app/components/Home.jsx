import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Sphere, Line } from "@react-three/drei";
import { useRef, useMemo, useEffect, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { motion } from "framer-motion";
import Navbar from "./Navbar";
import { ChevronRight } from "lucide-react";
import * as THREE from "three";

const Glow = ({ className = "" }) => (
  <div
    className={`pointer-events-none absolute inset-0 -z-10 opacity-60 blur-2xl 
      [background:radial-gradient(60%_60%_at_20%_0%,rgba(0,255,255,.15),transparent_60%),radial-gradient(50%_50%_at_90%_20%,rgba(0,255,200,.12),transparent_60%),radial-gradient(40%_40%_at_50%_120%,rgba(0,200,255,.1),transparent_60%)] ${className}`}
  />
);

// Optimized animation progress hook
function useAnimationProgress(duration = 2000, delay = 500) {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const rafRef = useRef();

  useEffect(() => {
    let startTime = null;
    let animationFrameId = null;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const rawProgress = Math.min(elapsed / duration, 1);
      
      // Smooth easing function
      const easedProgress = 1 - Math.pow(1 - rawProgress, 3);
      setProgress(easedProgress);

      if (rawProgress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        setIsComplete(true);
      }
    };

    const startAnimation = () => {
      startTime = null;
      animationFrameId = requestAnimationFrame(animate);
    };

    const timeoutId = setTimeout(startAnimation, delay);

    return () => {
      clearTimeout(timeoutId);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [duration, delay]);

  return { progress, isComplete };
}

function AnimatedNeuralNode({ position, color, size = 0.08, delay = 0, animationProgress = 1 }) {
  const ref = useRef();
  const initialPos = useMemo(() => new THREE.Vector3(0, 0, 0), []);
  const targetPos = useMemo(() => new THREE.Vector3(...position), [position]);

  useFrame((state) => {
    if (ref.current) {
      // Position animation
      ref.current.position.lerpVectors(initialPos, targetPos, animationProgress);
      
      // Scale animation only when animation is mostly complete
      if (animationProgress > 0.8) {
        const time = state.clock.elapsedTime + delay;
        const scale = 1 + Math.sin(time * 2) * 0.15;
        ref.current.scale.setScalar(scale);
      } else {
        ref.current.scale.setScalar(1);
      }
    }
  });

  return (
    <Sphere ref={ref} args={[size, 24, 24]}>
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
  animationProgress = 1,
}) {
  const groupRef = useRef();
  const initialPos = useMemo(() => new THREE.Vector3(0, 0, 0), []);
  const targetPos = useMemo(() => new THREE.Vector3(...position), [position]);

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

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.position.lerpVectors(initialPos, targetPos, animationProgress);
    }
  });

  return (
    <group ref={groupRef}>
      {nodes.map((pos, i) => (
        <AnimatedNeuralNode 
          key={i} 
          position={pos} 
          color={color}
          delay={i * 0.1}
          animationProgress={animationProgress}
        />
      ))}

      {connections.map(([start, end], i) => {
        // Calculate positions based on animation progress
        const startPos = [
          nodes[start][0] * animationProgress,
          nodes[start][1] * animationProgress,
          nodes[start][2] * animationProgress
        ];
        const endPos = [
          nodes[end][0] * animationProgress,
          nodes[end][1] * animationProgress,
          nodes[end][2] * animationProgress
        ];
        
        return (
          <Line
            key={i}
            points={[startPos, endPos]}
            color={color}
            lineWidth={1.5}
            transparent
            opacity={0.4 * animationProgress}
            toneMapped={false}
          />
        );
      })}
    </group>
  );
}

function CyberGridBackground({ animationProgress = 1 }) {
  const gridRef = useRef();
  
  useFrame((state) => {
    if (gridRef.current && animationProgress > 0.5) {
      const time = state.clock.elapsedTime;
      gridRef.current.position.x = Math.sin(time * 0.1) * 0.5;
      gridRef.current.position.y = Math.cos(time * 0.08) * 0.5;
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
          opacity={0.2 * animationProgress}
        />
      </mesh>
      
      <mesh rotation={[0, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[60, 60, 60, 60]} />
        <meshBasicMaterial
          color="#003344"
          wireframe
          wireframeLinewidth={1}
          transparent
          opacity={0.15 * animationProgress}
        />
      </mesh>
      
      {Array.from({ length: 50 }).map((_, i) => (
        <mesh
          key={i}
          position={[
            (Math.random() - 0.5) * 50 * animationProgress,
            (Math.random() - 0.5) * 50 * animationProgress,
            (Math.random() - 0.5) * 10 * animationProgress
          ]}
        >
          <sphereGeometry args={[0.03, 8, 8]} />
          <meshBasicMaterial
            color="#00faff"
            toneMapped={false}
            transparent
            opacity={0.6 * animationProgress}
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
  const [showText, setShowText] = useState(false);
  const [showButton, setShowButton] = useState(false);
  
  // Use optimized animation hook
  const { progress: animationProgress, isComplete } = useAnimationProgress(2000, 300);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);

    // Show text when animation is complete
    if (isComplete) {
      const textTimeout = setTimeout(() => {
        setShowText(true);
        const buttonTimeout = setTimeout(() => {
          setShowButton(true);
        }, 800);
        return () => clearTimeout(buttonTimeout);
      }, 200);
      return () => clearTimeout(textTimeout);
    }

    return () => window.removeEventListener('resize', checkMobile);
  }, [isComplete]);

  // Use the EXACT same positions as original
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
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("open-navigation"));
    }
    
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  // Mobile camera adjustment - camera should be closer to see the same positions
  const cameraConfig = isMobile ? { position: [0, 0, 20], fov: 45 } : { position: [0, 0, 15], fov: 60 };

  return (
    <div className="relative w-full min-h-screen bg-[#0b1117] overflow-hidden" suppressHydrationWarning>
      <Navbar/>
      
      {/* Content Section */}
      <div className="relative min-h-screen">
        <div className={`absolute inset-0 flex ${isMobile ? 'items-start pt-32' : 'items-center justify-center'} z-10 pointer-events-none`}>
          <Glow />
          
          {/* Main Content Container - Animation controlled by showText state */}
          <div className={`flex flex-col items-center justify-center px-8 py-6 rounded-2xl bg-slate-900/40 backdrop-blur-xl border border-cyan-500/30 shadow-2xl text-center pointer-events-auto mx-4 ${isMobile ? 'mt-8 max-w-[90%]' : 'max-w-4xl'}`}>
            {/* Text appears only after neural networks spread */}
            {showText && (
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
              </motion.div>
            )}

            {/* Button appears after text animation */}
            {showButton && (
              <motion.button
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
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
            )}
          </div>
        </div>

        {/* 3D Canvas */}
        <div className="fixed inset-0 z-0">
          <Canvas 
            camera={cameraConfig}
            dpr={[1, 1]} // Lower DPR for performance
            performance={{ min: 0.8 }}
          >
            <color attach="background" args={["#000000"]} />
            <CyberGridBackground animationProgress={animationProgress} />
            <ambientLight intensity={0.5 * animationProgress} />
            <pointLight position={[10, 10, 10]} intensity={1.5 * animationProgress} />
            <pointLight position={[-10, -10, -10]} intensity={0.8 * animationProgress} color="#00faff" />

            {structures.map((props, i) => (
              <NeuralStructure key={i} {...props} animationProgress={animationProgress} />
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
                intensity={2 * animationProgress}
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