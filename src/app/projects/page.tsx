"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Orbitron, JetBrains_Mono } from "next/font/google";
import { FaGithub } from "react-icons/fa";
import { FiArrowUpRight } from "react-icons/fi";
import NeuralBackground from "@/app/components/NeuralBackground";
import { TypeAnimation } from "react-type-animation";
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
      <div className="pointer-events-none absolute inset-0 -z-10 blur-2xl opacity-70 [background:radial-gradient(50%_50%_at_20%_0%,rgba(34,211,238,.16),transparent_60%),radial-gradient(45%_45%_at_85%_15%,rgba(20,184,166,.14),transparent_60%),radial-gradient(40%_40%_at_50%_120%,rgba(56,189,248,.12),transparent_60%)]" />
      <div className="flex flex-col items-center gap-6">
        <div className="relative h-20 w-20">
          <div className="absolute inset-0 animate-[spin_1.2s_linear_infinite] rounded-full border-4 border-cyan-300/30 border-t-cyan-300 shadow-[0_0_24px_rgba(34,211,238,.35)]" />
          <div className="absolute inset-2 grid place-items-center rounded-full bg-black/40 backdrop-blur-xl">
            <Image
              src="/ml4e.svg"
              alt="ML4E"
              width={44}
              height={44}
              priority
              className="opacity-95 drop-shadow-[0_0_12px_rgba(34,211,238,.45)] animate-[pulse_1.8s_ease-in-out_infinite]"
            />
          </div>
        </div>
        <div className="text-center">
          <h2 className="text-xl font-semibold tracking-wide text-cyan-200 drop-shadow-[0_0_16px_rgba(0,255,255,.35)]">
            Loading Projects
          </h2>
          <p className="mt-1 text-sm text-slate-400">
            Fetching the latest curated projects…
          </p>
        </div>
      </div>
    </div>
  );
}

// === TECH STACK UTILITIES ===
const parseTechStack = (techStack?: string): string[] => {
  if (!techStack) return [];
  
  // Handle comma, pipe, or space separated tech stacks
  return techStack.split(/[,|]/).map(tech => tech.trim()).filter(Boolean);
};

const truncateTechStack = (techStack: string[], maxItems: number = 4): { displayed: string[], remaining: number } => {
  if (techStack.length <= maxItems) {
    return { displayed: techStack, remaining: 0 };
  }
  return { 
    displayed: techStack.slice(0, maxItems), 
    remaining: techStack.length - maxItems 
  };
};

const truncateDescription = (description?: string, wordLimit: number = 40): { truncated: string, isTruncated: boolean } => {
  if (!description) return { truncated: "", isTruncated: false };
  
  const words = description.split(' ');
  if (words.length <= wordLimit) {
    return { truncated: description, isTruncated: false };
  }
  
  return { 
    truncated: words.slice(0, wordLimit).join(' ') + '...', 
    isTruncated: true 
  };
};

// === MAIN COMPONENT ===
export default function ViewProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [usingFallback, setUsingFallback] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [expandedDescriptions, setExpandedDescriptions] = useState<Set<string>>(new Set());

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
    [projects]
  );

  const activeItem = menuItems[activeIndex] || menuItems[0];

  if (loading) return <LoadingScreen />;

  // === MAIN RENDER ===
  return (
    <main className="relative min-h-screen w-full bg-gradient-to-b from-[#050816] via-[#0A0F1E] to-[#0F172A] py-16 px-4 sm:px-8">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;900&family=Roboto:wght@300;400;500;700&display=swap');
      `}</style>
      <NeuralBackground />
      <Navbar />
      <div className="relative z-10">
        <h1 className="text-4xl md:text-6xl font-bold mb-20 text-center tracking-widest relative font-[Orbitron]">
          <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-600 drop-shadow-[0_0_25px_rgba(0,200,255,0.6)]">
            PROJECTS
          </span>
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-[3px] bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full" />
        </h1>

        {/* === PROJECTS GRID === */}
        <div className="flex flex-col gap-y-16 lg:gap-y-24 max-w-7xl mx-auto">
          {projects.map((project, index) => {
            const theme = cardThemes[index % cardThemes.length];
            const isReversed = index % 2 !== 0;
            const techStackArray = parseTechStack(project.techStack);
            const { displayed: displayedTech, remaining: remainingTech } = truncateTechStack(techStackArray, 4);
            const { truncated: truncatedDesc, isTruncated: isDescTruncated } = truncateDescription(project.description, 40);
            const isDescriptionExpanded = expandedDescriptions.has(project._id);

            return (
              <motion.div
                key={project._id || index}
                className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-center"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                viewport={{ once: true }}
              >
                {/* === IMAGE SECTION - Appears First === */}
                <motion.div
                  className={`
                    lg:col-span-3 w-full aspect-video rounded-lg overflow-hidden shadow-2xl 
                    transition-all duration-300 hover:shadow-cyan-500/30
                    ${isReversed ? "lg:order-last" : ""} 
                  `}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.7, delay: 0.1 }}
                  viewport={{ once: true }}
                >
                  <a
                    href={project.deployedLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: theme.accent }}
                  >
                    {project.imageUrl && (
                      <Image
                        src={project.imageUrl}
                        alt={project.name}
                        width={1200}
                        height={700}
                        className="object-cover w-full h-full hover:scale-105 transition-transform duration-500"
                        priority={index === 0}
                      />
                    )}
                  </a>
                </motion.div>

                {/* === TEXT / DETAILS SECTION - Appears After Image === */}
                <motion.div
                  className={`
                    lg:col-span-2 flex flex-col gap-4 
                    ${isReversed ? "lg:items-start" : "lg:items-end"}
                  `}
                  initial={{ opacity: 0, x: isReversed ? 20 : -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  {/* === PROJECT TITLE - Typing Effect === */}
                  <motion.div
                    className="w-full text-center"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    viewport={{ once: true }}
                  >
                    <TypeAnimation
                      sequence={[project.name || "Untitled Project"]}
                      wrapper="h2"
                      speed={50}
                      className={`text-3xl font-bold text-white ${orbitron.className}`}
                      cursor={false}
                    />
                  </motion.div>

                  {/* === DESCRIPTION BOX - Typing Effect === */}
                  {project.description && (
                    <motion.div
                      className="bg-slate-800/60 backdrop-blur-md rounded-lg border border-slate-700 w-full cursor-pointer hover:border-cyan-600/50 transition-all overflow-hidden"
                      onClick={() => setSelectedProject(project)}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.6 }}
                      viewport={{ once: true }}
                    >
                      {/* Window Header Style Dots */}
                      <div className="flex items-center gap-2 p-3 bg-slate-900/50 border-b border-slate-700">
                        <span className="block w-3 h-3 rounded-full bg-red-500"></span>
                        <span className="block w-3 h-3 rounded-full bg-yellow-500"></span>
                        <span className="block w-3 h-3 rounded-full bg-green-500"></span>
                      </div>

                      {/* Typing Animation Description */}
                      <div className="p-6">
                        <TypeAnimation
                          sequence={[
                            isDescriptionExpanded ? project.description : truncatedDesc,
                            500
                          ]}
                          wrapper="p"
                          speed={30}
                          className={`text-gray-300 text-base ${jetbrainsMono.className}`}
                          style={{ whiteSpace: "pre-line" }}
                          repeat={0}
                          cursor={false}
                        />
                        
                        {/* View More for Description */}
                        {isDescTruncated && !isDescriptionExpanded && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setExpandedDescriptions(prev => new Set(prev).add(project._id));
                            }}
                            className="mt-3 text-cyan-400 hover:text-cyan-300 text-sm font-medium transition-colors"
                          >
                            View more...
                          </button>
                        )}
                      </div>
                    </motion.div>
                  )}

                  {/* === TECH STACK - Fade In Animation === */}
                  {techStackArray.length > 0 && (
                    <motion.div
                      className={`w-full ${isReversed ? "lg:text-left" : "lg:text-right"}`}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ duration: 0.6, delay: 0.7 }}
                      viewport={{ once: true }}
                    >
                      <p className="text-gray-400 mb-2">
                        <strong>Tech Stack:</strong>
                      </p>
                      <div className="flex flex-wrap gap-2 justify-start">
                        {displayedTech.map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="px-3 py-1 bg-slate-700/50 rounded-full text-sm text-cyan-200 border border-cyan-500/30"
                          >
                            {tech}
                          </span>
                        ))}
                        {remainingTech > 0 && (
                          <button
                            onClick={() => setSelectedProject(project)}
                            className="px-3 py-1 bg-cyan-600/20 rounded-full text-sm text-cyan-300 border border-cyan-400/30 hover:bg-cyan-600/30 transition-colors"
                          >
                            +{remainingTech} more
                          </button>
                        )}
                      </div>
                    </motion.div>
                  )}

                  {/* === LINKS - Fade In Animation === */}
                  <motion.div
                    className={`flex items-center gap-6 mt-2 ${
                      isReversed ? "lg:justify-start" : "lg:justify-end"
                    }`}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    viewport={{ once: true }}
                  >
                    {project.deployedLink && (
                      <a
                        href={project.deployedLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: theme.accent }}
                        className="flex items-center gap-2 text-lg hover:underline"
                      >
                        View Project
                        <FiArrowUpRight />
                      </a>
                    )}
                    {project.githubLink && (
                      <a
                        href={project.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-2xl hover:scale-110 transition-transform"
                        style={{ color: theme.accent }}
                      >
                        <FaGithub />
                      </a>
                    )}
                  </motion.div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* === DESCRIPTION MODAL - Updated to include Tech Stack === */}
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