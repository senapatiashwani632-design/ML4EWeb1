"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Orbitron, JetBrains_Mono } from "next/font/google";
import { FaGithub } from "react-icons/fa";
import { FiArrowUpRight } from "react-icons/fi";
import NeuralBackground from "@/app/components/NeuralBackground";
import { motion, AnimatePresence } from "framer-motion";
import DescriptionModal from "@/app/components/DescriptionModal";
import Navbar from "../components/Navbar";

// === FONT CONFIGURATIONS ===
const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["400", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
});

// === TYPES ===
type Project = {
  _id: string;
  name: string;
  imageUrl?: string;
  techStack?: string;
  description?: string;
  deployedLink?: string;
  githubLink?: string;
};

type MenuItem = {
  image: string;
  link: string;
  title: string;
  description: string;
};

type AnimationType = "fastTyping" | "fadeIn" | "staggeredFade";

const DUMMY_PROJECTS: Project[] = [];

const cardThemes = [
  {
    bg: "from-[#0F172A] to-[#1E293B]",
    headerBg: "bg-[#1E3A8A]",
    accent: "#60A5FA",
  },
];

// === LOADING SCREEN COMPONENT ===
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

// === TECH STACK UTILITIES ===
const parseTechStack = (techStack?: string): string[] => {
  if (!techStack) return [];

  // Handle comma, pipe, or space separated tech stacks
  return techStack
    .split(/[,|]/)
    .map((tech) => tech.trim())
    .filter(Boolean);
};

const truncateTechStack = (
  techStack: string[],
  maxItems: number = 4,
): { displayed: string[]; remaining: number } => {
  if (techStack.length <= maxItems) {
    return { displayed: techStack, remaining: 0 };
  }
  return {
    displayed: techStack.slice(0, maxItems),
    remaining: techStack.length - maxItems,
  };
};

const truncateDescription = (
  description?: string,
  wordLimit: number = 40,
): { truncated: string; isTruncated: boolean } => {
  if (!description) return { truncated: "", isTruncated: false };

  const words = description.split(" ");
  if (words.length <= wordLimit) {
    return { truncated: description, isTruncated: false };
  }

  return {
    truncated: words.slice(0, wordLimit).join(" ") + "...",
    isTruncated: true,
  };
};

// === OPTION 1: Fade-in Typing Animation (Very Fast) ===
const FastTypingText = ({
  text,
  className = "",
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) => {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    if (!text) return;

    const timer = setTimeout(() => {
      // Fast typing effect - shows all text almost instantly with slight character-by-character feel
      let currentIndex = 0;
      const speed = 10; // Very fast (lower = faster)

      const typeCharacter = () => {
        if (currentIndex <= text.length) {
          setDisplayedText(text.substring(0, currentIndex));
          currentIndex++;
          setTimeout(typeCharacter, speed);
        }
      };

      typeCharacter();
    }, delay * 1000);

    return () => clearTimeout(timer);
  }, [text, delay]);

  return <span className={className}>{displayedText}</span>;
};

// === OPTION 2: Simple Fade In Animation ===
const FadeInText = ({
  text,
  className = "",
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) => {
  return (
    <motion.span
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, delay: delay, ease: "easeOut" }}
    >
      {text}
    </motion.span>
  );
};

// === OPTION 3: Staggered Fade In (Character by Character) ===
const StaggeredFadeText = ({
  text,
  className = "",
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) => {
  const characters = text.split("");

  return (
    <span className={className}>
      {characters.map((char, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.05,
            delay: delay + index * 0.01, // Very fast staggered effect
            ease: "easeOut",
          }}
        >
          {char}
        </motion.span>
      ))}
    </span>
  );
};

// === ANIMATED TEXT COMPONENT (Handles all animation types) ===
const AnimatedText = ({
  text,
  className = "",
  delay = 0,
  animationType = "fastTyping",
}: {
  text: string;
  className?: string;
  delay?: number;
  animationType?: AnimationType;
}) => {
  if (animationType === "fastTyping") {
    return <FastTypingText text={text} className={className} delay={delay} />;
  } else if (animationType === "fadeIn") {
    return <FadeInText text={text} className={className} delay={delay} />;
  } else if (animationType === "staggeredFade") {
    return (
      <StaggeredFadeText text={text} className={className} delay={delay} />
    );
  }

  // Default fallback
  return <FadeInText text={text} className={className} delay={delay} />;
};

// === MAIN COMPONENT ===
export default function ViewProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [usingFallback, setUsingFallback] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [expandedDescriptions, setExpandedDescriptions] = useState<Set<string>>(
    new Set(),
  );

  // Animation type - choose one
  const animationType: AnimationType = "fadeIn";

  // === FETCH PROJECTS FROM BACKEND ===
  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const res = await fetch("/api/projects", { cache: "no-store" });
        const data = await res.json();
        if (!res.ok) throw new Error(data?.error || "Failed to load projects");
        if (!alive) return;
        setProjects(data as Project[]);
        setUsingFallback(false);
      } catch {
        if (!alive) return;
        setProjects(DUMMY_PROJECTS);
        setUsingFallback(true);
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  // === MAP BACKEND DATA TO MENU FORMAT ===
  const menuItems: MenuItem[] = useMemo(
    () =>
      projects.map((p) => ({
        image: p.imageUrl || "https://picsum.photos/600/600?grayscale",
        link: p.deployedLink || p.githubLink || "#",
        title: p.name || "Untitled",
        description:
          p.description ||
          (p.techStack ? `Built with ${p.techStack}` : "Explore this project"),
      })),
    [projects],
  );

  const activeItem = menuItems[activeIndex] || menuItems[0];

  if (loading) return <LoadingScreen />;

  // === MAIN RENDER ===
  return (
    <main className="relative min-h-screen w-full bg-gradient-to-b from-[#050816] via-[#0A0F1E] to-[#0F172A] overflow-x-hidden">
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;900&family=Roboto:wght@300;400;500;700&display=swap");

        /* Prevent horizontal scrolling on the entire page */
        html,
        body {
          overflow-x: hidden;
          max-width: 100vw;
          width: 100%;
        }
      `}</style>
      <NeuralBackground />
      <Navbar />
      <div className="relative z-10 py-8 sm:py-16 px-4 sm:px-6 md:px-8 w-full max-w-full overflow-hidden">
        <div className="w-full max-w-7xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-12 sm:mb-20 text-center tracking-wider sm:tracking-widest relative font-[Orbitron]">
            <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-600 drop-shadow-[0_0_25px_rgba(0,200,255,0.6)]">
              PROJECTS
            </span>
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 sm:w-20 md:w-24 h-[2px] sm:h-[3px] bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full" />
          </h1>

          {/* === PROJECTS GRID === */}
          <div className="flex flex-col gap-y-12 sm:gap-y-16 lg:gap-y-24 w-full">
            {projects.map((project, index) => {
              const theme = cardThemes[index % cardThemes.length];
              const isReversed = index % 2 !== 0;
              const techStackArray = parseTechStack(project.techStack);
              const { displayed: displayedTech, remaining: remainingTech } =
                truncateTechStack(techStackArray, 3); // Reduced to 3 on mobile
              const { truncated: truncatedDesc, isTruncated: isDescTruncated } =
                truncateDescription(project.description, 30); // Reduced word limit on mobile
              const isDescriptionExpanded = expandedDescriptions.has(
                project._id,
              );

              return (
                <motion.div
                  key={project._id || index}
                  className="flex flex-col lg:grid lg:grid-cols-5 gap-6 sm:gap-8 lg:gap-12 items-center w-full overflow-hidden"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  viewport={{ once: true }}
                >
                  {/* === IMAGE SECTION - Mobile: Full width, Desktop: 3 columns === */}
                  <motion.div
                    className="
                      w-full lg:col-span-3 
                      aspect-[16/9] sm:aspect-video
                      rounded-lg sm:rounded-xl overflow-hidden 
                      shadow-xl sm:shadow-2xl 
                      transition-all duration-300 hover:shadow-cyan-500/20 sm:hover:shadow-cyan-500/30
                      order-1
                    "
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.7, delay: 0.1 }}
                    viewport={{ once: true }}
                  >
                    <a
                      href={project.deployedLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: theme.accent }}
                      className="block w-full h-full"
                    >
                      {project.imageUrl && (
                        <div className="relative w-full h-full">
                          <Image
                            src={project.imageUrl}
                            alt={project.name}
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 1200px"
                            className="object-cover w-full h-full hover:scale-105 transition-transform duration-500"
                            priority={index === 0}
                          />
                        </div>
                      )}
                    </a>
                  </motion.div>

                  {/* === TEXT / DETAILS SECTION - Mobile: Full width, Desktop: 2 columns === */}
                  <motion.div
                    className="
                      w-full lg:col-span-2 
                      flex flex-col gap-3 sm:gap-4
                      order-2
                    "
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    viewport={{ once: true }}
                  >
                    {/* === PROJECT TITLE === */}
                    <motion.div
                      className="w-full text-center sm:text-left"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ duration: 0.3, delay: 0.4 }}
                      viewport={{ once: true }}
                    >
                      <AnimatedText
                        text={project.name || "Untitled Project"}
                        className={`text-2xl sm:text-3xl font-bold text-white font-[Orbitron] break-words`}
                        delay={0.4}
                        animationType={animationType}
                      />
                    </motion.div>

                    {/* === DESCRIPTION BOX === */}
                    {project.description && (
                      <motion.div
                        className="bg-slate-800/60 backdrop-blur-md rounded-lg border border-slate-700 w-full cursor-pointer hover:border-cyan-600/30 sm:hover:border-cyan-600/50 transition-all overflow-hidden"
                        onClick={() => setSelectedProject(project)}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.5 }}
                        viewport={{ once: true }}
                      >
                        {/* Window Header Style Dots */}
                        <div className="flex items-center gap-2 p-2 sm:p-3 bg-slate-900/50 border-b border-slate-700">
                          <span className="block w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-red-500"></span>
                          <span className="block w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-yellow-500"></span>
                          <span className="block w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-green-500"></span>
                        </div>

                        {/* Animated Description */}
                        <div className="p-4 sm:p-6">
                          <AnimatedText
                            text={
                              isDescriptionExpanded
                                ? project.description
                                : truncatedDesc
                            }
                            className={`text-gray-300 text-sm sm:text-base ${jetbrainsMono.className} leading-relaxed break-words`}
                            delay={0.6}
                            animationType={animationType}
                          />

                          {/* View More for Description */}
                          {isDescTruncated && !isDescriptionExpanded && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setExpandedDescriptions((prev) =>
                                  new Set(prev).add(project._id),
                                );
                              }}
                              className="mt-2 sm:mt-3 text-cyan-400 hover:text-cyan-300 text-xs sm:text-sm font-medium transition-colors"
                            >
                              View more...
                            </button>
                          )}
                        </div>
                      </motion.div>
                    )}

                    {/* === TECH STACK === */}
                    {techStackArray.length > 0 && (
                      <motion.div
                        className="w-full overflow-hidden"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.7 }}
                        viewport={{ once: true }}
                      >
                        <p className="text-gray-400 mb-2 text-sm sm:text-base">
                          <strong>Tech Stack:</strong>
                        </p>
                        <div className="flex flex-wrap gap-1.5 sm:gap-2 w-full">
                          {displayedTech.map((tech, techIndex) => (
                            <motion.span
                              key={techIndex}
                              className="px-2 py-1 sm:px-3 sm:py-1 bg-slate-700/50 rounded-full text-xs sm:text-sm text-cyan-200 border border-cyan-500/30 whitespace-nowrap break-keep"
                              initial={{ opacity: 0, scale: 0.8 }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              transition={{
                                duration: 0.3,
                                delay: 0.7 + techIndex * 0.05,
                              }}
                              viewport={{ once: true }}
                            >
                              {tech}
                            </motion.span>
                          ))}
                          {remainingTech > 0 && (
                            <motion.button
                              onClick={() => setSelectedProject(project)}
                              className="px-2 py-1 sm:px-3 sm:py-1 bg-cyan-600/20 rounded-full text-xs sm:text-sm text-cyan-300 border border-cyan-400/30 hover:bg-cyan-600/30 transition-colors whitespace-nowrap"
                              initial={{ opacity: 0, scale: 0.8 }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              transition={{ duration: 0.3, delay: 0.9 }}
                              viewport={{ once: true }}
                            >
                              +{remainingTech} more
                            </motion.button>
                          )}
                        </div>
                      </motion.div>
                    )}

                    {/* === LINKS === */}
                    <motion.div
                      className="flex items-center gap-4 sm:gap-6 mt-2 sm:mt-3 w-full overflow-hidden"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ duration: 0.6, delay: 0.8 }}
                      viewport={{ once: true }}
                    >
                      {project.deployedLink && (
                        <motion.a
                          href={project.deployedLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ color: theme.accent }}
                          className="flex items-center gap-1.5 sm:gap-2 text-base sm:text-lg hover:underline break-words"
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: 0.9 }}
                          viewport={{ once: true }}
                        >
                          View Project
                          <FiArrowUpRight className="text-sm sm:text-base flex-shrink-0" />
                        </motion.a>
                      )}
                      {project.githubLink && (
                        <motion.a
                          href={project.githubLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xl sm:text-2xl hover:scale-110 transition-transform flex-shrink-0"
                          style={{ color: theme.accent }}
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3, delay: 1.0 }}
                          viewport={{ once: true }}
                        >
                          <FaGithub />
                        </motion.a>
                      )}
                    </motion.div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* === DESCRIPTION MODAL === */}
      <AnimatePresence>
        {selectedProject && (
          <DescriptionModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </main>
  );
}
