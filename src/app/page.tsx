// "use client"
// import dynamic from "next/dynamic";
// import Footer from "./components/Footer"
// const Home = dynamic(() => import("./components/Home"), { ssr: false });
// export default function App() {
//   return (
//     <>
//       <Home />
//       {/* <Hero3D /> */}
//       <Footer /> 
//     </>
//   );
// }
"use client"
import { useState, useEffect, useMemo } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";

const Home = dynamic(() => import("./components/Home"), { ssr: false });
const AboutUs = dynamic(() => import("./components/AboutUs"), { ssr: false });
const WhatWeDo = dynamic(() => import("./components/WhatWeDo"), { ssr: false });

// Preloader Component
function Preloader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [dots, setDots] = useState<Array<{ left: string; top: string; duration: number; delay: number }>>([]);

  useEffect(() => {
    // Generate dots only on client-side to avoid hydration mismatch
    const mulberry32 = (seed: number) => {
      return () => {
        let t = (seed += 0x6d2b79f5);
        t = Math.imul(t ^ (t >>> 15), t | 1);
        t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
      };
    };
    const rand = mulberry32(123456); // deterministic seed
    const generatedDots = Array.from({ length: 20 }).map(() => ({
      left: `${rand() * 100}%`,
      top: `${rand() * 100}%`,
      duration: 2 + rand() * 2,
      delay: rand() * 2,
    }));
    setDots(generatedDots);
  }, []);

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => onComplete(), 500); // Small delay before fade out
          return 100;
        }
        return prev + Math.random() * 15; // Randomized progress increments
      });
    }, 150);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0b1117] overflow-hidden"
    >
      {/* Animated Background Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 opacity-40 blur-3xl 
          [background:radial-gradient(60%_60%_at_50%_50%,rgba(0,255,255,.2),transparent_70%)]
          animate-pulse"
        />
      </div>

      {/* Neural Network Animation */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        {dots.map((dot, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-cyan-400 rounded-full"
            style={{
              left: dot.left,
              top: dot.top,
            }}
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: dot.duration,
              repeat: Infinity,
              delay: dot.delay,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center px-6">
        {/* Logo/Title */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-12"
        >
          <h1 className="text-6xl md:text-8xl font-bold text-cyan-200 
            drop-shadow-[0_0_20px_#00faff] mb-4 special-font">
            ML4E
          </h1>
          <p className="text-xl md:text-2xl text-blue-300 
            drop-shadow-[0_0_10px_#00d9ff]"
            style={{ fontFamily: "Roboto, sans-serif" }}>
            Machine Learning For Everyone
          </p>
        </motion.div>

        {/* Loading Bar */}
        <div className="w-64 md:w-96 mx-auto">
          <div className="relative h-2 bg-cyan-950/30 rounded-full overflow-hidden 
            border border-cyan-500/20">
            <motion.div
              className="absolute inset-y-0 left-0 bg-gradient-to-r 
                from-cyan-400 via-blue-400 to-cyan-300 
                shadow-[0_0_20px_#00faff]"
              initial={{ width: "0%" }}
              animate={{ width: `${Math.min(progress, 100)}%` }}
              transition={{ duration: 0.3 }}
            />

            {/* Glowing effect on progress bar */}
            <motion.div
              className="absolute inset-y-0 left-0 bg-gradient-to-r 
                from-transparent via-white to-transparent opacity-50"
              style={{ width: `${Math.min(progress, 100)}%` }}
              animate={{
                x: ["-100%", "100%"],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          </div>

          {/* Progress Percentage */}
          <motion.p
            className="mt-4 text-cyan-300 text-sm font-mono"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {Math.floor(Math.min(progress, 100))}%
          </motion.p>
        </div>

        {/* Loading Text */}
        <motion.p
          className="mt-8 text-blue-300/60 text-sm"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Initializing Neural Networks...
        </motion.p>
      </div>

      {/* Corner Accents */}
      <div className="absolute top-0 left-0 w-32 h-32 border-t-2 border-l-2 
        border-cyan-500/30" />
      <div className="absolute top-0 right-0 w-32 h-32 border-t-2 border-r-2 
        border-cyan-500/30" />
      <div className="absolute bottom-0 left-0 w-32 h-32 border-b-2 border-l-2 
        border-cyan-500/30" />
      <div className="absolute bottom-0 right-0 w-32 h-32 border-b-2 border-r-2 
        border-cyan-500/30" />
    </motion.div>
  );
}

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [showHome, setShowHome] = useState(false);

  useEffect(() => {
    // Start loading the Home component immediately
    setShowHome(true);
  }, []);

  return (
    <>
      <AnimatePresence>
        {isLoading && (
          <Preloader onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      {/* Home component loads in background while preloader shows */}
      <div style={{ display: isLoading ? "none" : "block" }} className="w-full">
        {showHome && (
          <div className="w-full">
            <Home />
            <AboutUs />
            <WhatWeDo />
          </div>
        )}
      </div>
    </>
  );
}
