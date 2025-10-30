"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Orbitron, JetBrains_Mono } from "next/font/google";
import { FaGithub } from "react-icons/fa";
import { FiArrowUpRight } from "react-icons/fi";
import NeuralBackground from "@/app/components/NeuralBackground";
import { TypeAnimation } from "react-type-animation";
import { motion } from "framer-motion"; // ✅ Added for animations
import DescriptionModal from "@/app/components/DescriptionModal";

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

// === MAIN COMPONENT ===
export default function ViewProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [usingFallback, setUsingFallback] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

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
    <div className="relative min-h-screen w-full bg-gradient-to-b from-[#050816] via-[#0A0F1E] to-[#0F172A] py-16 px-4 sm:px-8">
      <NeuralBackground />

      <div className="relative z-10">
        <h1
          className={`text-4xl sm:text-5xl font-bold text-center text-cyan-400 mb-12 ${orbitron.className}`}
        >
          PROJECTS
        </h1>

        {/* === PROJECTS GRID === */}
        <div className="flex flex-col gap-y-16 lg:gap-y-24 max-w-7xl mx-auto">
          {projects.map((project, index) => {
            const theme = cardThemes[index % cardThemes.length];
            const isReversed = index % 2 !== 0;

            return (
              <motion.div
                key={project._id || index}
                className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-center"
                initial={{ opacity: 0, y: 40 }} // 👇 fade & slide in
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                viewport={{ once: true }}
              >
                {/* === IMAGE SECTION === */}
                <motion.div
                  className={`
                    lg:col-span-3 w-full aspect-video rounded-lg overflow-hidden shadow-2xl 
                    transition-all duration-300 hover:shadow-cyan-500/30
                    ${isReversed ? "lg:order-last" : ""} 
                  `}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 1.0, delay: 0.2 }}
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
                        className="object-cover w-full h-full"
                        priority={index === 0}
                      />
                    )}
                  </a>
                </motion.div>

                {/* === TEXT / DETAILS SECTION === */}
                <motion.div
                  className={`
                    lg:col-span-2 flex flex-col gap-4 
                    ${isReversed ? "lg:items-start" : "lg:items-end"}
                  `}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  {/* === PROJECT TITLE === */}
                  <h2
                    className={`
                      text-3xl font-bold text-white ${orbitron.className} 
                      text-center w-full
                    `}
                  >
                    {project.name}
                  </h2>

                  {/* === DESCRIPTION BOX === */}
                  {project.description && (
                    <div
                      className="bg-slate-800/60 backdrop-blur-md rounded-lg border border-slate-700 w-full cursor-pointer hover:border-cyan-600/50 transition-all overflow-hidden"
                      onClick={() => setSelectedProject(project)}
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
                            "hello world , this is a dummy description for the project page. Replace this with actual project descriptions . This project is very cool.",
                          ]}
                          wrapper="p"
                          speed={150}
                          className={` 
                            text-gray-300 text-base 
                            ${isReversed ? "lg:text-left" : "lg:text-right"}
                            ${jetbrainsMono.className} 
                          `}
                          style={{ whiteSpace: "pre-line" }}
                          repeat={0}
                          cursor={false}
                        />
                      </div>
                    </div>
                  )}

                  {/* === TECH STACK TEXT === */}
                  <p
                    className={`text-gray-400 ${isReversed ? "lg:text-left" : "lg:text-right"}`}
                  >
                    <strong>Tech Stack:</strong> {project.techStack}
                  </p>

                  {/* === LINKS === */}
                  <div
                    className={`flex items-center gap-6 mt-2 ${
                      isReversed ? "lg:justify-start" : "lg:justify-end"
                    }`}
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
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* === DESCRIPTION MODAL === */}
      {selectedProject && (
        <DescriptionModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </div>
  );
}
