"use client"
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";

const Home = dynamic(() => import("./components/Home"), { ssr: false });
const AboutUs = dynamic(() => import("./components/AboutUs"), { ssr: false });
const WhatWeDo = dynamic(() => import("./components/WhatWeDo"), { ssr: false });

// Modern Cyberpunk Preloader Component
function Preloader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [loadingTextIndex, setLoadingTextIndex] = useState(0);
  const [particles, setParticles] = useState<Array<{
    id: number;
    x: number;
    y: number;
    size: number;
    speedX: number;
    speedY: number;
    opacity: number;
  }>>([]);

  const loadingTexts = [
    "Initializing neural interface...",
    "Loading quantum matrices...",
    "Calibrating data streams...",
    "Syncing with ML4E network...",
    "Establishing secure connection...",
    "Preparing immersive experience..."
  ];

  // Initialize particles
  useEffect(() => {
    const newParticles = [];
    for (let i = 0; i < 40; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2 + 0.5,
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: (Math.random() - 0.5) * 0.3,
        opacity: Math.random() * 0.5 + 0.3
      });
    }
    setParticles(newParticles);
  }, []);

  // Animate particles
  useEffect(() => {
    if (particles.length === 0) return;

    const interval = setInterval(() => {
      setParticles(prev => prev.map(p => ({
        ...p,
        x: (p.x + p.speedX + 100) % 100,
        y: (p.y + p.speedY + 100) % 100
      })));
    }, 50);

    return () => clearInterval(interval);
  }, [particles]);

  // Progress animation
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => onComplete(), 600);
          return 100;
        }
        // Simulate realistic loading with occasional jumps
        const increment = prev < 30 ? Math.random() * 8 + 2 :
                        prev < 70 ? Math.random() * 6 + 1 :
                        Math.random() * 4 + 0.5;
        return Math.min(prev + increment, 100);
      });
    }, 120);

    return () => clearInterval(interval);
  }, [onComplete]);

  // Cycle through loading texts
  useEffect(() => {
    if (progress >= 100) return;

    const interval = setInterval(() => {
      setLoadingTextIndex((prev) => (prev + 1) % loadingTexts.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [progress]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7, ease: "easeInOut" }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#0a0f1a] overflow-hidden"
    >
      {/* Animated particle background */}
      <div className="absolute inset-0 overflow-hidden">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full bg-cyan-400"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              opacity: p.opacity,
              boxShadow: `0 0 ${p.size * 3}px ${p.size}px rgba(0, 245, 255, 0.2)`
            }}
            animate={{
              scale: [1, 1.3, 1],
              opacity: [p.opacity * 0.5, p.opacity, p.opacity * 0.5]
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
          />
        ))}
      </div>

      {/* Hexagonal grid background */}
      <div className="absolute inset-0 opacity-20">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(0, 245, 255, 0.15) 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}
        />
      </div>

      {/* Main loading container */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 w-full max-w-4xl mx-6"
      >
        {/* Glowing border effect */}
        <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10 blur-2xl" />
        <div className="absolute -inset-0.5 rounded-3xl bg-gradient-to-r from-cyan-500/30 via-transparent to-purple-500/30 blur-sm" />

        {/* Main card */}
        <div className="relative bg-[#0b1117]/80 backdrop-blur-2xl rounded-2xl border border-cyan-500/30 p-8 md:p-12 shadow-2xl">
          {/* Header with animated logo */}
          <div className="flex flex-col items-center mb-10">
            <motion.div
              animate={{
                scale: [1, 1.05, 1],
                rotateY: [0, 180, 360]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "linear"
              }}
              className="relative mb-6"
            >
              {/* Holographic logo */}
              <div className="relative w-32 h-32">
                {/* Outer ring */}
                <div className="absolute inset-0 rounded-full border-2 border-cyan-400/50">
                  <div className="absolute inset-0 rounded-full border border-cyan-300/30 animate-ping" />
                </div>
                
                {/* Middle ring */}
                <div className="absolute inset-4 rounded-full border border-cyan-300/40">
                  <motion.div
                    className="absolute -inset-1 rounded-full border border-cyan-200/20"
                    animate={{
                      scale: [1, 1.2, 1]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity
                    }}
                  />
                </div>
                
                {/* Inner core */}
                <div className="absolute inset-8 rounded-full bg-gradient-to-br from-cyan-400/30 to-blue-500/30">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/10 to-transparent" />
                </div>
                {/* ML4E text */}
<div className="absolute inset-0 flex items-center justify-center">
  <motion.div
    animate={{ 
      scale: [1, 1.05, 1],
      rotateY: [0, 180, 360] 
    }}
    transition={{ 
      duration: 4, 
      repeat: Infinity, 
      ease: "linear" 
    }}
    className="relative w-16 h-16"
  >
    {/* Optional glow effect */}
    <div className="absolute inset-0 rounded-full bg-cyan-400/20 blur-md" />
    
    {/* Favicon image */}
    <img 
      src="/favicon.ico" 
      alt="ML4E"
      className="relative w-full h-full object-contain rounded-full drop-shadow-[0_0_10px_rgba(0,245,255,0.6)]"
    />
    
    {/* Optional pulsing ring */}
    <motion.div
      className="absolute -inset-2 rounded-full border border-cyan-300/40"
      animate={{
        scale: [1, 1.15, 1],
        opacity: [0.3, 0.1, 0.3]
      }}
      transition={{
        duration: 2,
        repeat: Infinity
      }}
    />
  </motion.div>
</div>
                
                {/* ML4E text */}
                {/* <div className="absolute inset-0 flex items-center justify-center">
                  <motion.span
                    animate={{ opacity: [0.7, 1, 0.7] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="text-3xl font-bold bg-gradient-to-r from-cyan-300 via-white to-cyan-200 bg-clip-text text-transparent font-mono"
                  >
                    ML4E
                  </motion.span>
                </div> */}
              </div>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl md:text-5xl font-bold text-center mb-3"
            >
              <span className="bg-gradient-to-r from-cyan-300 via-blue-300 to-cyan-200 bg-clip-text text-transparent">
                MACHINE LEARNING
              </span>
              <br />
              <span className="text-2xl md:text-3xl font-light text-blue-300">
                For Everyone
              </span>
            </motion.h1>
          </div>

          {/* Progress section */}
          <div className="space-y-6">
            {/* Progress bar with tech details */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <motion.div
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="text-sm font-mono text-cyan-300"
                >
                  SYSTEM LOADING
                </motion.div>
                <motion.div
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="text-xl font-bold bg-gradient-to-r from-cyan-300 to-white bg-clip-text text-transparent font-mono"
                >
                  {Math.floor(progress)}%
                </motion.div>
              </div>

              {/* Main progress bar */}
              <div className="relative h-3 bg-gray-900/50 rounded-full overflow-hidden border border-cyan-900/50">
                {/* Gradient fill */}
                <motion.div
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-cyan-500 via-blue-400 to-cyan-300"
                  initial={{ width: "0%" }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Shimmer effect */}
                  <motion.div
                    className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-transparent via-white/50 to-transparent"
                    animate={{
                      x: ["-100%", "200%"]
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  />
                </motion.div>

                {/* Scanning line */}
                <motion.div
                  className="absolute top-0 w-1 h-full bg-white/80 shadow-[0_0_10px_#fff]"
                  animate={{
                    left: ["0%", "100%"]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />

                {/* Glow effect */}
                <div className="absolute inset-0 rounded-full shadow-[inset_0_0_20px_rgba(0,245,255,0.3)]" />
              </div>

              {/* Progress indicators */}
              <div className="flex justify-between mt-2">
                {[0, 25, 50, 75, 100].map((mark) => (
                  <div key={mark} className="text-xs font-mono text-cyan-400/70">
                    {mark}%
                  </div>
                ))}
              </div>
            </div>

            {/* Loading text with typing effect */}
            <div className="min-h-6">
              <motion.p
                key={loadingTextIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="text-center text-cyan-300/80 font-mono text-sm md:text-base"
              >
                <span className="text-cyan-400">▶</span> {loadingTexts[loadingTextIndex]}
                <motion.span
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                  className="ml-1"
                >
                  █
                </motion.span>
              </motion.p>
            </div>

            {/* Tech stats */}
            {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
              {[
                { label: "CPU", value: "Neural Core", color: "from-cyan-400 to-blue-400" },
                { label: "RAM", value: "64GB Quantum", color: "from-blue-400 to-purple-400" },
                { label: "GPU", value: "RTX AI", color: "from-purple-400 to-pink-400" },
                { label: "NET", value: "10Gbps", color: "from-pink-400 to-cyan-400" }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="bg-black/30 rounded-xl p-4 border border-cyan-500/20"
                >
                  <div className="text-xs text-cyan-400/70 font-mono mb-1">
                    {stat.label}
                  </div>
                  <div className={`text-sm font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent font-mono`}>
                    {stat.value}
                  </div>
                </motion.div>
              ))}
            </div> */}
          </div>

          {/* Bottom indicators */}
          <div className="mt-10 pt-6 border-t border-cyan-500/20">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-xs text-cyan-300/60 font-mono">ACTIVE CONNECTION</span>
              </div>
              <div className="text-xs text-cyan-300/60 font-mono">
                v2.4.1 • NIT ROURKELA
              </div>
            </div>
          </div>
        </div>

        {/* Floating tech elements */}
        <motion.div
          animate={{
            y: [0, -10, 0],
            rotate: [0, 5, 0]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute -top-6 -right-6 w-24 h-24 border border-cyan-400/30 rounded-lg opacity-50"
        />
        <motion.div
          animate={{
            y: [0, 10, 0],
            rotate: [0, -5, 0]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
          className="absolute -bottom-6 -left-6 w-20 h-20 border border-blue-400/30 rounded-full opacity-50"
        />
      </motion.div>

      {/* Ambient audio visualizer */}
      <div className="absolute bottom-10 left-0 right-0 flex justify-center space-x-1">
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={i}
            className="w-1 bg-gradient-to-t from-cyan-400 to-blue-400 rounded-t-full"
            animate={{
              height: ["10%", `${20 + Math.random() * 60}%`, "10%"]
            }}
            transition={{
              duration: 0.5 + Math.random() * 1,
              repeat: Infinity,
              delay: i * 0.05
            }}
          />
        ))}
      </div>
    </motion.div>
  );
}

export default function App() {
  const [hasSeenIntro, setHasSeenIntro] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    
    if (typeof window !== 'undefined') {
      const seen = sessionStorage.getItem('ml4e_hasSeenIntro');
      
      if (seen === 'true') {
        setHasSeenIntro(true);
        setIsLoading(false);
      } else {
        setHasSeenIntro(false);
        setIsLoading(true);
      }
    }
  }, []);

  const handlePreloaderComplete = () => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('ml4e_hasSeenIntro', 'true');
    }
    setHasSeenIntro(true);
    setIsLoading(false);
  };

  if (!isMounted || hasSeenIntro === null) {
    return (
      <div className="min-h-screen bg-[#0a0f1a] flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-cyan-500/30 border-t-cyan-400 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && (
          <Preloader onComplete={handlePreloaderComplete} />
        )}
      </AnimatePresence>

      {/* Main content */}
      <div className={`transition-opacity duration-700 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        <AnimatePresence mode="wait">
          {!isLoading && hasSeenIntro && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="w-full"
            >
              <Home />
              <AboutUs />
              <WhatWeDo />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}