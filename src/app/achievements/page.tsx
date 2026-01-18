"use client";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { FaGithub, FaLinkedin, FaExternalLinkAlt, FaStar, FaRocket, FaAward } from "react-icons/fa";
import NeuralBackground from "../components/NeuralBackground";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";

function TypingText({ text, speed = 30, onComplete }: { text: string; speed?: number; onComplete?: () => void }) {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);
      return () => clearTimeout(timeout);
    } else if (onComplete) {
      onComplete();
    }
  }, [currentIndex, text, speed, onComplete]);

  return <>{displayedText}</>;
}

function useScrollAnimation() {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return { ref, isVisible };
}

interface Achievement {
  title: string;
  description?: string;
  img?: string;
  members?: { name: string; linkedin: string }[];
  github?: string;
  technologies?: string[];
}

const localAchievements: Achievement[] = [
  {
    title: "HackOdisha 4.0",
    description: "Developed a dynamic website for HO4 with MongoDB, 3D ID cards using Three.js, and achieved 5000+ page visits.",
    img: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=80",
    members: [
      { name: "Bibhu", linkedin: "https://linkedin.com/in/ml4e" },
    ],
    github: "https://github.com/ml4e",
    technologies: ["Next.js", "Tailwind", "Node.js", "MongoDB"],
  },
  {
    title: "Google Summer of Code (GSoC)",
    description: "Successfully completed GSoC contributing to open source projects with innovative solutions and community impact.",
    img: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80",
    members: [
      { name: "Sonali Lipsa Patra", linkedin: "https://linkedin.com/in/ml4e" },
    ],
    github: "https://github.com/ml4e",
    technologies: ["Python", "Django", "React", "Docker"],
  },
  {
    title: "Flipkart GRiD Challenge",
    description: "Participated in Flipkart's innovation challenge, developing cutting-edge solutions for e-commerce problems.",
    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
    members: [
      { name: "Team Lead", linkedin: "https://linkedin.com/in/ml4e" },
    ],
    github: "https://github.com/ml4e",
    technologies: ["Machine Learning", "Python", "TensorFlow"],
  },
];

const marqueeItems = [
  "Google Summer of Code",
  "HackFest — AI Hackathon",
  "Flipkart GRiD — Innovation Challenge",
  "Research Contributions",
];

function InfiniteCarousel() {
  const content = marqueeItems.concat(marqueeItems, marqueeItems);
  return (
    <div className="overflow-hidden w-full bg-gradient-to-r from-blue-900/70 to-black py-3 border-t border-b border-blue-700 mt-8">
      <div className="flex animate-marquee whitespace-nowrap text-white text-lg md:text-xl font-semibold gap-12">
        {content.map((item, i) => (
          <span key={i} className="text-white/90 hover:text-blue-300 transition">
            {item}
          </span>
        ))}
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          animation: marquee 10s linear infinite;
        }
      `}</style>
    </div>
  );
}

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

export default function AchievementsPage() {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAchievements() {
      try {
        const res = await fetch("/api/achievements");
        if (!res.ok) throw new Error("Failed to fetch achievements");
        const data = await res.json();
        setAchievements(data);
      } catch (error) {
        console.error("Error fetching achievements:", error);
        // Fallback to local achievements on error
        setAchievements([]);
      } finally {
        setLoading(false);
      }
    }
    fetchAchievements();
  }, []);

  const combinedAchievements = [...achievements];

  // Show loading screen until data is fetched
  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <>
    <Navbar />
    <main className="relative min-h-screen flex flex-col items-center justify-start bg-gradient-to-b from-black via-blue-950 to-black text-white font-[Orbitron,Roboto,sans-serif]">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;900&family=Roboto:wght@300;400;500;700&display=swap');
      `}</style>
      <h1 className="text-4xl md:text-6xl font-bold mt-24 text-center tracking-widest relative font-[Orbitron]">
        <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-600 drop-shadow-[0_0_25px_rgba(0,200,255,0.6)]">
          ACHIEVEMENTS
        </span>
        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-[3px] bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full" />
      </h1>
      <NeuralBackground/>
          
      <InfiniteCarousel />

      <section className="mt-16 mb-16 flex flex-col gap-12 px-4 md:px-12 w-full max-w-7xl">
        {combinedAchievements.length === 0 ? (
          <div className="text-center text-gray-400 py-20">
            <p className="text-xl">No achievements found.</p>
          </div>
        ) : (
          combinedAchievements.map((achievement, idx) => {
            const isImageLeft = idx % 2 === 0;
            
            return (
              <AchievementCard 
                key={idx} 
                achievement={achievement} 
                isImageLeft={isImageLeft}
                index={idx}
              />
            );
          })
        )}
      </section>
    </main>
    </>
  );
}

function AchievementCard({ achievement, isImageLeft, index }: { achievement: Achievement; isImageLeft: boolean; index: number }) {
  const { ref, isVisible } = useScrollAnimation();
  const [showContent, setShowContent] = useState(false);
  const [startTyping, setStartTyping] = useState(false);

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        setShowContent(true);
        setTimeout(() => setStartTyping(true), 300);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  return (
    <div ref={ref} className="w-full">
      {/* Desktop Layout */}
      <div className="hidden md:flex gap-0 items-center relative">
        {isImageLeft ? (
          <>
            {/* Image Left - Larger */}
            <div 
              className={`w-[55%] relative h-[28rem] overflow-hidden rounded-2xl transition-all duration-1000 ${
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'
              }`}
            >
              <img
                src={achievement.img}
                alt={achievement.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-blue-950/30"></div>
            </div>
            
            {/* Content Box Right - Overlapping */}
            <div 
              className={`w-[50%] relative transition-all duration-1000 delay-500 -ml-20 ${
                showContent ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'
              }`}
            >
              {/* Modern Card Design with enhanced glassmorphism */}
              <div className="relative bg-gradient-to-br from-slate-900/80 to-blue-950/80 rounded-3xl p-8 text-white shadow-2xl border border-slate-700/50 backdrop-blur-2xl">
                {/* Enhanced Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/15 to-blue-500/15 rounded-3xl blur-2xl"></div>
                
                {/* Header with Icon */}
                <div className="flex items-center gap-3 mb-6 relative z-10">
                  <div className="p-2 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl shadow-lg">
                    <FaRocket className="text-white text-sm" />
                  </div>
                  <div>
                    <p className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-300 text-sm font-bold tracking-widest uppercase font-[Orbitron]">
                      {startTyping && <TypingText text="Featured Achievement" speed={20} />}
                    </p>
                    <div className="flex gap-1 mt-1">
                      {[1, 2, 3].map((star) => (
                        <FaStar key={star} className="text-cyan-400 text-xs" />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <h2 className="text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-blue-200 text-3xl font-bold mb-4 leading-tight font-[Orbitron] relative z-10">
                  {startTyping && <TypingText text={achievement.title} speed={25} />}
                </h2>
                
                <p className="text-gray-300 text-base leading-relaxed mb-6 font-[Roboto] relative z-10">
                  {startTyping && <TypingText text={achievement.description || ""} speed={15} />}
                </p>
                
                {/* Technologies */}
                {achievement.technologies && showContent && (
                  <div className="flex flex-wrap gap-3 mb-6 relative z-10">
                    {achievement.technologies.map((tech, i) => (
                      <span
                        key={i}
                        className="px-4 py-2 bg-slate-800/40 backdrop-blur-sm border border-slate-600/50 rounded-xl text-sm text-cyan-100 font-[Roboto] font-medium hover:bg-slate-700/60 transition-all duration-300 hover:scale-105 hover:border-cyan-500/30"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-700/50 relative z-10">
                  <div className="flex items-center gap-4">
                    {achievement.members && achievement.members.map((member, i) => (
                      <a
                        key={i}
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-cyan-200 hover:text-white transition-all duration-300 hover:scale-105 group"
                      >
                        <div className="p-1.5 bg-slate-700/50 rounded-lg group-hover:bg-cyan-500/20 transition-colors">
                          <FaLinkedin size={14} />
                        </div>
                        <span className="text-sm font-[Roboto]">{member.name}</span>
                      </a>
                    ))}
                  </div>
                  
                  {achievement.github && (
                    <a
                      href={achievement.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-cyan-200 hover:text-white transition-all duration-300 hover:scale-105 group"
                    >
                      <div className="p-2 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg shadow-lg group-hover:shadow-cyan-500/25 transition-all">
                        <FaExternalLinkAlt size={14} />
                      </div>
                    </a>
                  )}
                </div>

                {/* Corner Accents */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-cyan-500/20 to-transparent rounded-tr-3xl"></div>
                <div className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tr from-blue-500/20 to-transparent rounded-bl-3xl"></div>
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Content Box Left - Overlapping with higher z-index */}
            <div 
              className={`w-[50%] relative transition-all duration-1000 delay-500 -mr-20 z-30 ${
                showContent ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'
              }`}
            >
              {/* Modern Card Design with enhanced glassmorphism */}
              <div className="relative bg-gradient-to-br from-slate-900/80 to-blue-950/80 rounded-3xl p-8 text-white shadow-2xl border border-slate-700/50 backdrop-blur-2xl z-30">
                {/* Enhanced Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-l from-cyan-500/15 to-blue-500/15 rounded-3xl blur-2xl"></div>
                
                {/* Header with Icon */}
                <div className="flex items-center gap-3 mb-6 relative z-10">
                  <div className="p-2 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl shadow-lg">
                    <FaAward className="text-white text-sm" />
                  </div>
                  <div>
                    <p className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-300 text-sm font-bold tracking-widest uppercase font-[Orbitron]">
                      {startTyping && <TypingText text="Featured Achievement" speed={20} />}
                    </p>
                    <div className="flex gap-1 mt-1">
                      {[1, 2, 3].map((star) => (
                        <FaStar key={star} className="text-cyan-400 text-xs" />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <h2 className="text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-blue-200 text-3xl font-bold mb-4 leading-tight font-[Orbitron] relative z-10">
                  {startTyping && <TypingText text={achievement.title} speed={25} />}
                </h2>
                
                <p className="text-gray-300 text-base leading-relaxed mb-6 font-[Roboto] relative z-10">
                  {startTyping && <TypingText text={achievement.description || ""} speed={15} />}
                </p>
                
                {/* Technologies */}
                {achievement.technologies && showContent && (
                  <div className="flex flex-wrap gap-3 mb-6 relative z-10">
                    {achievement.technologies.map((tech, i) => (
                      <span
                        key={i}
                        className="px-4 py-2 bg-slate-800/40 backdrop-blur-sm border border-slate-600/50 rounded-xl text-sm text-cyan-100 font-[Roboto] font-medium hover:bg-slate-700/60 transition-all duration-300 hover:scale-105 hover:border-cyan-500/30"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-700/50 relative z-10">
                  <div className="flex items-center gap-4">
                    {achievement.members && achievement.members.map((member, i) => (
                      <a
                        key={i}
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-cyan-200 hover:text-white transition-all duration-300 hover:scale-105 group"
                      >
                        <div className="p-1.5 bg-slate-700/50 rounded-lg group-hover:bg-cyan-500/20 transition-colors">
                          <FaLinkedin size={14} />
                        </div>
                        <span className="text-sm font-[Roboto]">{member.name}</span>
                      </a>
                    ))}
                  </div>
                  
                  {achievement.github && (
                    <a
                      href={achievement.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-cyan-200 hover:text-white transition-all duration-300 hover:scale-105 group"
                    >
                      <div className="p-2 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg shadow-lg group-hover:shadow-cyan-500/25 transition-all">
                        <FaExternalLinkAlt size={14} />
                      </div>
                    </a>
                  )}
                </div>

                {/* Corner Accents */}
                <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-cyan-500/20 to-transparent rounded-tl-3xl"></div>
                <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-blue-500/20 to-transparent rounded-br-3xl"></div>
              </div>
            </div>
            
            {/* Image Right - Larger with LOWER z-index so card overlaps it */}
            <div 
              className={`w-[55%] relative h-[28rem] overflow-hidden rounded-2xl transition-all duration-1000 z-10 ${
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'
              }`}
            >
              <img
                src={achievement.img}
                alt={achievement.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-l from-transparent to-blue-950/30"></div>
            </div>
          </>
        )}
      </div>

      {/* Mobile Layout - Modern */}
      <div className="md:hidden relative">
        <div className="relative h-80 rounded-2xl overflow-hidden mb-6">
          <img
            src={achievement.img}
            alt={achievement.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
        </div>
        
        {/* Modern Mobile Card */}
        <div className="relative bg-gradient-to-br from-slate-900 to-blue-950 rounded-3xl p-6 text-white shadow-2xl border border-slate-700/50 backdrop-blur-lg">
          {/* Glow Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-3xl blur-xl"></div>
          
          {/* Header with Icon */}
          <div className="flex items-center gap-3 mb-4 relative z-10">
            <div className="p-2 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg shadow-lg">
              <FaRocket className="text-white text-xs" />
            </div>
            <div>
              <p className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-300 text-xs font-bold tracking-widest uppercase font-[Orbitron]">
                {startTyping && <TypingText text="Featured" speed={20} />}
              </p>
              <div className="flex gap-1 mt-1">
                {[1, 2, 3].map((star) => (
                  <FaStar key={star} className="text-cyan-400 text-xs" />
                ))}
              </div>
            </div>
          </div>

          {/* Content */}
          <h2 className="text-transparent bg-clip-text bg-gradient-to-r from-white to-cyan-200 text-2xl font-bold mb-3 leading-tight font-[Orbitron] relative z-10">
            {startTyping && <TypingText text={achievement.title} speed={25} />}
          </h2>
          
          <p className="text-gray-300 text-sm leading-relaxed mb-4 font-[Roboto] relative z-10">
            {startTyping && <TypingText text={achievement.description || ""} speed={15} />}
          </p>
          
          {/* Technologies */}
          {achievement.technologies && showContent && (
            <div className="flex flex-wrap gap-2 mb-4 relative z-10">
              {achievement.technologies.map((tech, i) => (
                <span
                  key={i}
                  className="px-3 py-1.5 bg-slate-800/60 backdrop-blur-sm border border-slate-600/50 rounded-lg text-xs text-cyan-100 font-[Roboto] font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          )}

          {/* Footer */}
          <div className="flex items-center justify-between pt-3 border-t border-slate-700/50 relative z-10">
            <div className="flex items-center gap-3">
              {achievement.members && achievement.members[0] && (
                <a
                  href={achievement.members[0].linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-cyan-200 hover:text-white transition-colors"
                >
                  <FaLinkedin size={12} />
                  <span className="text-xs font-[Roboto]">{achievement.members[0].name}</span>
                </a>
              )}
            </div>
            
            {achievement.github && (
              <a
                href={achievement.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg shadow-lg text-white"
              >
                <FaExternalLinkAlt size={12} />
              </a>
            )}
          </div>

          {/* Corner Accents */}
          <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-cyan-500/20 to-transparent rounded-tr-3xl"></div>
          <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-blue-500/20 to-transparent rounded-bl-3xl"></div>
        </div>
      </div>
    </div>
  );
}