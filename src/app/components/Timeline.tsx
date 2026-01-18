'use client';

import { useEffect, useRef, useState } from 'react';
import TimelineItem from './TimelineItem';
import NeuralBackground from './NeuralBackground';
import Navbar from './Navbar';
import { motion } from 'framer-motion';

interface TimelineData {
  id: number;
  name: string;
  date: string;
  description: string;
  image: string;
}

// Function to parse date string and convert to Date object
const parseDate = (dateString: string): Date => {
  const months: { [key: string]: number } = {
    january: 0, february: 1, march: 2, april: 3, may: 4, june: 5,
    july: 6, august: 7, september: 8, october: 9, november: 10, december: 11
  };
  
  const parts = dateString.toLowerCase().split(' ');
  const month = months[parts[0]];
  const year = parseInt(parts[1]);
  
  return new Date(year, month, 1);
};

export default function Timeline() {
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());
  const itemRefs = useRef<Map<number, HTMLDivElement>>(new Map());
  const [timelineData, settimelineData] = useState<TimelineData[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch events
  useEffect(() => {
    async function fetchEvents() {
      try {
        const response = await fetch('/api/events');
        const data = await response.json();
        settimelineData(data);
        console.log("Fetched events data:", data);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchEvents();
  }, []);

  // Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = Number(entry.target.getAttribute('data-id'));
          if (entry.isIntersecting) {
            setVisibleItems((prev) => new Set(prev).add(id));
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px',
      }
    );

    itemRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      itemRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, [timelineData]); // Re-run when timelineData changes

  // Sort timeline data - this recalculates on every render when timelineData changes
  const sortedTimelineData = [...timelineData].sort((a, b) => {
    const dateA = parseDate(a.date);
    const dateB = parseDate(b.date);
    return dateA.getTime() - dateB.getTime();
  });
  function LoadingScreen() {
  return (
    <div className="relative grid min-h-screen place-items-center overflow-hidden bg-[#0b1117] text-slate-200">
      {/* Enhanced cyberpunk background */}
      <div className="pointer-events-none absolute inset-0 -z-10 blur-2xl opacity-70 [background:radial-gradient(50%_50%_at_20%_0%,rgba(34,211,238,.16),transparent_60%),radial-gradient(45%_45%_at_85%_15%,rgba(20,184,166,.14),transparent_60%),radial-gradient(40%_40%_at_50%_120%,rgba(56,189,248,.12),transparent_60%)]" />
      
      {/* Grid lines effect */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-10" />
      
      {/* Scanning line effect */}
      <motion.div 
        className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent z-20"
        animate={{ y: ["0%", "100vh"] }}
        transition={{ 
          duration: 2, 
          repeat: Infinity,
          ease: "linear"
        }}
      />
      
      <div className="flex flex-col items-center gap-6">
        {/* Logo container */}
        <motion.div
          animate={{
            scale: [1, 1.05, 1],
            rotateY: [0, 180, 360],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "linear",
          }}
          className="relative"
        >
          {/* Glowing outer ring */}
          <motion.div 
            className="absolute -inset-4 rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 blur-xl"
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          
          {/* Holographic logo */}
          <div className="relative w-24 h-24 sm:w-32 sm:h-32">
            {/* Outer ring with pulse */}
            <motion.div 
              className="absolute inset-0 rounded-full border-2 border-cyan-400/40"
              animate={{ 
                scale: [1, 1.1, 1],
                opacity: [0.4, 0.8, 0.4]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            
            {/* Middle ring */}
            <div className="absolute inset-4 rounded-full border border-cyan-300/60">
              <motion.div
                className="absolute -inset-1 rounded-full border border-cyan-200/30"
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
              />
            </div>

            {/* ML4E favicon with glow */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                animate={{
                  scale: [1, 1.05, 1],
                  rotateY: [0, 180, 360],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="relative w-20 h-20 sm:w-24 sm:h-24"
              >
                {/* Glow effect */}
                <motion.div 
                  className="absolute inset-0 rounded-full bg-cyan-400 blur-md"
                  animate={{ opacity: [0.1, 0.3, 0.1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                
                <img
                  src="/favicon.ico"
                  alt="ML4E"
                  className="relative w-full h-full object-contain rounded-full drop-shadow-[0_0_20px_rgba(0,245,255,0.8)]"
                />
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Cyberpunk fetching text */}
        <div className="flex flex-col items-center gap-2 mt-4">
          {/* Terminal-style top bar */}
          {/* <div className="flex items-center gap-2 mb-1">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span className="text-xs text-cyan-400/70 ml-2 font-mono">ML4E://system/loading</span>
          </div> */}
          
          {/* Terminal box */}
          <div className="relative">
            {/* Glowing border */}
            <motion.div 
              className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg blur opacity-30"
              animate={{ opacity: [0.2, 0.4, 0.2] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            
            {/* Terminal content */}
            <div className="relative bg-gray-900/80 backdrop-blur-sm border border-cyan-500/30 rounded-lg px-6 py-4 min-w-[200px]">
              {/* Blinking cursor */}
              <div className="flex items-center gap-2 font-mono text-sm sm:text-base">
                <span className="text-cyan-400">$</span>
                <span className="text-green-400">fetch_data</span>
                <span className="text-gray-400">--module=global</span>
                
                {/* Animated dots */}
                <motion.div className="flex gap-1">
                  <motion.span
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 0.5, repeat: Infinity, delay: 0 }}
                    className="text-cyan-300"
                  >
                    .
                  </motion.span>
                  <motion.span
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 0.5, repeat: Infinity, delay: 0.2 }}
                    className="text-cyan-300"
                  >
                    .
                  </motion.span>
                  <motion.span
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 0.5, repeat: Infinity, delay: 0.4 }}
                    className="text-cyan-300"
                  >
                    .
                  </motion.span>
                </motion.div>
                
                {/* Blinking cursor */}
                <motion.span
                  animate={{ opacity: [0, 1] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                  className="w-2 h-4 bg-cyan-400 ml-1"
                />
              </div>
              
              {/* Progress bar */}
              <div className="mt-3">
                <div className="flex justify-between text-xs text-cyan-300/70 mb-1">
                  <span>INITIALIZING</span>
                  <motion.span
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    <span className="text-green-400">●</span> LIVE
                  </motion.span>
                </div>
                <div className="h-1 bg-gray-800 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-gradient-to-r from-cyan-500 to-blue-500"
                    initial={{ width: "0%" }}
                    animate={{ width: ["0%", "30%", "70%", "100%"] }}
                    transition={{ 
                      duration: 3, 
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          
          {/* Status text */}
          <motion.p 
            className="text-xs text-cyan-300/60 font-mono mt-3"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            Fetching the data
          </motion.p>
        </div>
        
        {/* Binary code rain effect */}
        <div className="absolute bottom-10 left-0 right-0 overflow-hidden h-20 opacity-20">
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-xs text-cyan-400 font-mono"
              style={{
                left: `${Math.random() * 100}%`,
                fontSize: `${Math.random() * 8 + 10}px`,
              }}
              animate={{
                y: ["-100%", "100vh"],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: "linear",
              }}
            >
              {Math.random() > 0.5 ? "1" : "0"}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
  // NOW you can have conditional rendering AFTER all hooks
  if (loading) {
    return (
      // <div className="relative min-h-screen py-20 px-4 sm:px-6 lg:px-8 font-[Orbitron]">
      //   <NeuralBackground />
      //   <Navbar />
      //   <div className="flex items-center justify-center min-h-[60vh]">
      //     <div className="text-center">
      //       <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400 mb-4"></div>
      //       <p className="text-cyan-300 text-xl">Loading events...</p>
      //     </div>
      //   </div>
      // </div>
      <LoadingScreen />
    );
  }

  return (
    <div className="relative py-20 px-4 sm:px-6 lg:px-8 font-[Orbitron]">
      <NeuralBackground />
      <Navbar />
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold  mb-32 text-center tracking-widest relative font-[Orbitron]">
          <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-600 drop-shadow-[0_0_25px_rgba(0,200,255,0.6)]">
            OUR EVENTS
          </span>
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-[3px] bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full" />
        </h1>

        <div className="relative">
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-cyan-500/50 via-cyan-400/30 to-cyan-500/50 shadow-[0_0_20px_rgba(34,211,238,0.3)]" />

          {sortedTimelineData.map((item, index) => (
            <div
              key={index}
              ref={(el) => {
                if (el) itemRefs.current.set(index, el);
              }}
              data-id={index}
            >
              <TimelineItem
                item={item}
                isVisible={visibleItems.has(index)}
                isRight={index % 2 === 0}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}