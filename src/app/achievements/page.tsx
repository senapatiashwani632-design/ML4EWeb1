"use client";

import { useEffect, useState, useRef } from "react";
import { FaGithub, FaLinkedin, FaExternalLinkAlt, FaStar, FaRocket, FaAward } from "react-icons/fa";
import NeuralBackground from "../components/NeuralBackground";

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

export default function AchievementsPage() {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(false);

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

  const combinedAchievements = [...achievements];

  return (
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
        {loading ? (
          <p className="text-gray-400 text-center">Loading achievements...</p>
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
              {/* Styled Speech Bubble Tail - Pointing Left */}
              {/* <div className="absolute left-0 top-1/2 -translate-x-[99%] -translate-y-1/2 z-20">
                <div className="relative">
                  {/* Main triangular tail with same background as card */}
                  {/* <div className="w-0 h-0 border-t-[25px] border-t-transparent border-b-[25px] border-b-transparent border-r-[35px] border-r-slate-900/90 backdrop-blur-xl"></div> */}
                  {/* Gradient overlay to match card gradient */}
                  {/* <div className="absolute top-0 left-0 w-0 h-0 border-t-[25px] border-t-transparent border-b-[25px] border-b-transparent border-r-[35px] border-r-cyan-500/20 -translate-x-0.5"></div> */}
                {/* </div> */}
              {/* </div> */}

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
    {/* Styled Speech Bubble Tail - Pointing Right */}
    {/* <div className="absolute right-0 top-1/2 translate-x-[99%] -translate-y-1/2 z-40">
      <div className="relative">
        {/* Main triangular tail with same background as card */}
        {/* <div className="w-0 h-0 border-t-[25px] border-t-transparent border-b-[25px] border-b-transparent border-l-[35px]  backdrop-blur-xl"></div> */}
        {/* Gradient overlay to match card gradient */}
        {/* <div className="absolute top-0 left-0 w-0 h-0 border-t-[25px] border-t-transparent border-b-[25px] border-b-transparent border-l-[35px] border-l-cyan-500/20 translate-x-0.5"></div> */}
      {/* </div> */}
    {/* </div> */} 

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