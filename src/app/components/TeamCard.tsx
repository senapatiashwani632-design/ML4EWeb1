import { motion } from "framer-motion";
import { useState } from "react";
import { Mail, Linkedin, Sparkles, GithubIcon } from "lucide-react";
import DefaultProfile from "./DefaultProfile";
interface DefaultProfileProps {
  src?: string;
  alt?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}


interface TeamMember {
  name: string;
  avatar: string;
  email: string;
  linkedin: string;
}

interface TeamCardProps {
  member: TeamMember;
}

function TeamCard({ member }: TeamCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isTouched, setIsTouched] = useState(false);
  const [imageError, setImageError] = useState(false);
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;

  const shouldAnimate = isMobile ? isTouched : isHovered;

  // Get initials for fallback
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <motion.div
      className="relative h-auto md:h-[400px] w-full group"
      onHoverStart={() => !isMobile && setIsHovered(true)}
      onHoverEnd={() => !isMobile && setIsHovered(false)}
      onTap={() => isMobile && setIsTouched((prev) => !prev)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: isMobile ? 1 : 1.05, rotateY: isMobile ? 0 : 2 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      {/* Animated background gradients */}
      <motion.div
        className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 opacity-0"
        animate={{
          opacity: shouldAnimate ? 0.9 : 0,
          scale: shouldAnimate ? [1, 1.05, 1] : 1,
        }}
        transition={{
          duration: 0.5,
          ease: "easeInOut",
        }}
      />

      {/* Card content */}
      <div
        className={`relative h-full bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-xl overflow-hidden border border-gray-700/50
        ${!isMobile ? 'shadow-none' : 'shadow-xl'}
        transition-all duration-500 ease-in-out`}
        style={{
          boxShadow: shouldAnimate && !isMobile 
            ? '0 0 50px 20px rgba(99, 102, 241, 0.4), 0 0 80px 30px rgba(168, 85, 247, 0.3)' 
            : 'none'
        }}
      >
        {/* Animated shine effect */}
        <motion.div
          className="absolute inset-0 opacity-0"
          animate={{
            opacity: shouldAnimate ? 0.3 : 0,
            backgroundPosition: shouldAnimate ? ["200% 0", "-200% 0"] : "200% 0",
          }}
          transition={{
            duration: 2.5,
            repeat: shouldAnimate ? Infinity : 0,
            ease: "linear",
          }}
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)",
            backgroundSize: "200% 100%",
          }}
        />

        {/* Corner glow effects */}
        {shouldAnimate && (
          <>
            <motion.div
              className="absolute top-0 left-0 w-32 h-32 bg-blue-500/30 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute bottom-0 right-0 w-32 h-32 bg-purple-500/30 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1.5,
              }}
            />
          </>
        )}

        {/* Floating particles */}
        {shouldAnimate &&
          Array.from({ length: 5 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1.5 h-1.5 rounded-full"
              style={{
                background: i % 2 === 0 ? 'rgb(59, 130, 246)' : 'rgb(168, 85, 247)',
                left: `${20 + i * 15}%`,
                bottom: "15%",
              }}
              initial={{ opacity: 0, y: 0 }}
              animate={{
                y: [-20, -80],
                x: [0, Math.sin(i * 2) * 30, 0],
                opacity: [0, 1, 0],
                scale: [0.5, 1.5, 0.5],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                delay: i * 0.5,
                ease: "easeOut",
              }}
            />
          ))}

        <div className="relative h-full flex flex-col items-center justify-center p-6">
          {/* Sparkle icon */}
          {shouldAnimate && (
            <motion.div
              className="absolute top-4 right-4 text-yellow-400"
              initial={{ opacity: 0, scale: 0.5, rotate: 0 }}
              animate={{
                opacity: [0, 1, 1, 0],
                rotate: [0, 180, 360],
                scale: [0.5, 1.3, 1.3, 0.5],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Sparkles size={28} />
            </motion.div>
          )}

          {/* Avatar with animated ring */}
          <motion.div
            className="relative mb-6"
            animate={
              shouldAnimate
                ? {
                    y: [0, -10, 0],
                    rotate: [0, 5, -5, 0],
                    transition: {
                      duration: 2.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    },
                  }
                : {}
            }
          >
            {/* Animated rings - multiple layers */}
            <motion.div
              className="absolute -inset-4 rounded-full"
              animate={{
                opacity: shouldAnimate ? 1 : 0,
                scale: shouldAnimate ? [1, 1.1, 1] : 1,
                rotate: shouldAnimate ? [0, 360] : 0,
              }}
              transition={{
                scale: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                rotate: { duration: 3, repeat: Infinity, ease: "linear" },
              }}
              style={{
                background: "linear-gradient(45deg, rgba(59,130,246,0.4), rgba(147,51,234,0.4))",
                filter: "blur(10px)",
              }}
            />
            <motion.div
              className="absolute -inset-5 rounded-full"
              animate={{
                opacity: shouldAnimate ? 0.6 : 0,
                scale: shouldAnimate ? [1.1, 1, 1.1] : 1,
                rotate: shouldAnimate ? [360, 0] : 0,
              }}
              transition={{
                scale: { duration: 2.5, repeat: Infinity, ease: "easeInOut" },
                rotate: { duration: 4, repeat: Infinity, ease: "linear" },
              }}
              style={{
                background: "linear-gradient(-45deg, rgba(236,72,153,0.3), rgba(59,130,246,0.3))",
                filter: "blur(12px)",
              }}
            />
            
            {/* Avatar Image */}
            {/* Avatar Image */}
            <div className="h-36 w-36 rounded-full ring-4 ring-white/20 relative z-10 transition-all duration-300 overflow-hidden bg-gradient-to-br from-gray-700 to-gray-900">
              {!imageError && member.avatar ? (
                <img 
                  src={member.avatar} 
                  alt={member.name}
                  className="w-full h-full object-cover"
                  onError={() => setImageError(true)}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-4xl font-bold text-white">
                  {getInitials(member.name)}
                </div>
              )}
            </div>
          </motion.div>

          {/* Name with multiple animation effects */}
          <motion.h3
            className="text-2xl font-bold text-white mb-4 text-center relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: 1, 
              y: 0,
              textShadow: shouldAnimate 
                ? "0 0 20px rgba(59, 130, 246, 0.8)" 
                : "none"
            }}
            transition={{ textShadow: { duration: 0.3 } }}
          >
            <span className="relative">
              {member.name}
              <motion.span
                className="absolute inset-x-0 -bottom-1 h-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 origin-left"
                initial={{ scaleX: 0 }}
                animate={shouldAnimate ? { scaleX: 1 } : { scaleX: 0 }}
                transition={{ duration: 0.4 }}
              />
            </span>
          </motion.h3>

          {/* Contact buttons */}
          <motion.div 
            className="flex gap-3 mt-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {/* Email button */}
            <motion.a
              href={`mailto:${member.email}`}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg transition-all duration-300 ${
                shouldAnimate 
                  ? "bg-gradient-to-r from-blue-600 to-blue-500 shadow-lg shadow-blue-500/50" 
                  : "bg-gray-700 hover:bg-gray-600"
              }`}
              whileHover={{ scale: 1.08, y: -2 }}
              whileTap={{ scale: 0.95 }}
              animate={shouldAnimate ? {
                boxShadow: [
                  "0 10px 20px rgba(59, 130, 246, 0.5)",
                  "0 10px 30px rgba(59, 130, 246, 0.7)",
                  "0 10px 20px rgba(59, 130, 246, 0.5)",
                ]
              } : {}}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <GithubIcon size={18} className="text-white" />
              <span className="text-white text-sm font-medium">Github</span>
            </motion.a>

            {/* LinkedIn button */}
            <motion.a
              href={member.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg transition-all duration-300 ${
                shouldAnimate 
                  ? "bg-gradient-to-r from-purple-600 to-pink-600 shadow-lg shadow-purple-500/50" 
                  : "bg-gray-700 hover:bg-gray-600"
              }`}
              whileHover={{ scale: 1.08, y: -2 }}
              whileTap={{ scale: 0.95 }}
              animate={shouldAnimate ? {
                boxShadow: [
                  "0 10px 20px rgba(147, 51, 234, 0.5)",
                  "0 10px 30px rgba(147, 51, 234, 0.7)",
                  "0 10px 20px rgba(147, 51, 234, 0.5)",
                ]
              } : {}}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
            >
              <Linkedin size={18} className="text-white" />
              <span className="text-white text-sm font-medium">LinkedIn</span>
            </motion.a>
          </motion.div>

          {/* Email text below - visible on hover/touch */}
          {/* <motion.p
            className={`text-xs mt-4 text-center transition-all duration-300 ${
              shouldAnimate ? "text-blue-300 opacity-100" : "text-gray-500 opacity-70"
            }`}
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: shouldAnimate ? 1 : 0.7,
              y: shouldAnimate ? [0, -2, 0] : 0
            }}
            transition={{ 
              opacity: { duration: 0.3 },
              y: { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
            }}
          >
            {member.email}
          </motion.p> */}
        </div>
      </div>
    </motion.div>
  );
}
export default TeamCard;

