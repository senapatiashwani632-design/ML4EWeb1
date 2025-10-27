"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Orbitron } from "next/font/google";
import { FaGithub } from "react-icons/fa";
import NeuralBackground from "@/app/components/NeuralBackground"; 

const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["400", "700"],
});

// --- PLACEHOLDER TYPES & DATA ---
// These are needed for the code to run
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

// Dummy data for fallback
const DUMMY_PROJECTS: Project[] = [];
// --- END PLACEHOLDERS ---

// 1. REVERTED TO YOUR SINGLE-THEME ARRAY
const cardThemes = [
  {
    bg: "from-[#0F172A] to-[#1E293B]",
    headerBg: "bg-[#1E3A8A]",
    accent: "#60A5FA",
  },
];

// ===== Loading Screen =====
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

export default function ViewProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [usingFallback, setUsingFallback] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  // Fetch from API or fallback
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

  return (
    <div className="relative min-h-screen w-full bg-gradient-to-b from-[#050816] via-[#0A0F1E] to-[#0F172A] py-16 px-4 sm:px-8">
      
      <NeuralBackground /> {/* <-- This is kept */}

      <div className="relative z-10">
        <h1
          className={`text-4xl sm:text-5xl font-bold text-center text-cyan-400 mb-12 ${orbitron.className}`}
        >
          PROJECTS
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {projects.map((project, index) => {
            const theme = cardThemes[index % cardThemes.length]; 
            return (
              <div
                key={project._id || index}
                //  HOVER EFFEC
                className={`rounded-xl overflow-hidden border border-cyan-500/20 shadow-[0_0_25px_rgba(0,255,255,0.1)] hover:shadow-[0_0_35px_rgba(0,255,255,0.25)] transform transition-all duration-300 hover:-translate-y-2 bg-gradient-to-br ${theme.bg}`}
              >
                <div
                  className={`${theme.headerBg} py-4 px-6 text-center border-b border-cyan-400/30`}
                >
                  <h2
                    className={`text-2xl font-bold text-white tracking-wide ${orbitron.className}`}
                  >
                    {project.name}
                  </h2>
                </div>

                {project.imageUrl && (
                  <div className="relative w-full h-40 sm:h-48 border-b border-cyan-400/20">
                    <Image
                      src={project.imageUrl}
                      alt={project.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                      priority={false}
                    />
                  </div>
                )}

                <div className="p-6 text-white flex flex-col gap-3">
                  <p className="text-gray-300">
                    <strong>Tech Stack:</strong> {project.techStack}
                  </p>

                  {project.description && (
                    <p className="text-gray-400 text-sm italic">
                      {project.description}
                    </p>
                  )}

                  <div className="flex items-center justify-between mt-4">
                    {project.deployedLink && (
                      <a
                        href={project.deployedLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: theme.accent }}
                        className="underline hover:opacity-80 transition duration-200"
                      >
                        View Project
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
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}