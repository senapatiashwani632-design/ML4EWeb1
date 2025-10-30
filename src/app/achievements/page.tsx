"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Fondamento, Poppins } from "next/font/google";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const orbitron = Fondamento({
  subsets: ["latin"],
  weight: ["400"],
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "600"],
});

const localAchievements = [
  {
    title: "Google Summer of Code (GSoC)",
    img: "/trophy.png",
    members: [
      { name: "Bibhu", linkedin: "https://linkedin.com/in/ml4e" },
    ],
    github: "https://github.com/ml4e",
  },
  {
    title: "Google Summer of Code (GSoC) - Phase 2",
    img: "/trophy.png",
    members: [
      { name: "Sonali Lipsa Patra", linkedin: "https://linkedin.com/in/ml4e" },
    ],
    github: "https://github.com/ml4e",
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

export default function AchievementsPage() {
  const [achievements, setAchievements] = useState([]);
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
      } finally {
        setLoading(false);
      }
    }
    fetchAchievements();
  }, []);

  const combinedAchievements = [...localAchievements, ...achievements];

  return (
    <main
      className={`relative min-h-screen flex flex-col items-center justify-start bg-gradient-to-b from-black via-blue-950 to-black text-white ${orbitron.className}`}
    >
     
      <div className="fixed bottom-4 left-4 w-50 md:w-78 opacity-90 z-10 animate-trophy">
        <Image
          src="/trophy.png"
          alt="Trophy"
          width={300}
          height={300}
          className="object-contain drop-shadow-[0_0_25px_rgba(0,120,255,0.8)]"
        />
      </div>

      <style jsx>{`
        @keyframes trophyScale {
          0% {
            transform: scale(1);
            filter: drop-shadow(0 0 10px rgba(0, 120, 255, 0.5));
          }
          50% {
            transform: scale(0.9);
            filter: drop-shadow(0 0 25px rgba(0, 180, 255, 0.8));
          }
          100% {
            transform: scale(1);
            filter: drop-shadow(0 0 10px rgba(0, 120, 255, 0.5));
          }
        }
        .animate-trophy {
          animation: trophyScale 4s ease-in-out infinite;
        }
      `}</style>

      
      <h1
        className={`text-4xl md:text-6xl font-bold mt-24 text-center tracking-widest relative ${orbitron.className}`}
      >
        <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-600 drop-shadow-[0_0_25px_rgba(0,200,255,0.6)]">
          ACHIEVEMENTS
        </span>
        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-[3px] bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full" />
      </h1>

    
      <InfiniteCarousel />

    
      <section
        className={`mt-10 mb-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4 md:px-12 w-full max-w-6xl ${poppins.className}`}
      >
        {loading ? (
          <p className="text-gray-400 text-center col-span-full">Loading achievements...</p>
        ) : (
          combinedAchievements.map((a, idx) => (
            <div
              key={idx}
              className={`group relative bg-gradient-to-br from-blue-900/40 to-blue-800/10 border border-blue-700 rounded-xl overflow-hidden backdrop-blur-sm transition-transform duration-300 transform hover:scale-[1.04] hover:shadow-[0_0_25px_rgba(0,120,255,0.6)] flex flex-col ${
                a.img ? "" : "justify-center"
              }`}
            >
            
              {a.img && (
                <div className="w-full h-48 relative overflow-hidden">
                  <Image
                    src={a.img}
                    alt={a.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-blue-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-2xl"></div>
                </div>
              )}

            
              <div className="p-6 flex flex-col flex-grow text-center">
                <h2 className="text-2xl font-semibold mb-2 text-blue-200">
                  {a.title}
                </h2>

                {a.members && (
                  <div className="flex justify-center items-center mt-3 flex-wrap gap-3">
                    {a.members.map((m, i) => (
                      <a
                        key={i}
                        href={m.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 hover:text-blue-400 text-white/80 transition"
                      >
                        <span className="text-xs">{m.name}</span>
                        <FaLinkedin size={14} />
                      </a>
                    ))}
                  </div>
                )}

              
                {a.github && (
                  <a
                    href={a.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-white/80 hover:text-white mt-4"
                  >
                    <FaGithub size={18} />
                    <span className="text-sm">GitHub</span>
                  </a>
                )}
              </div>
            </div>
          ))
        )}
      </section>
    </main>
  );
}
