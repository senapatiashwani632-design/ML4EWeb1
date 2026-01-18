"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback } from "react";

interface LogoPreloaderProps {
  isLoading: boolean;
  message?: string;
  onComplete?: () => void;
}

export default function LogoPreloader({ 
  isLoading, 
  message = "Fetching latest roster...", 
  onComplete 
}: LogoPreloaderProps) {
  const [animationPhase, setAnimationPhase] = useState<'center' | 'moving' | 'floating' | 'complete'>('center');
  const [hasCompleted, setHasCompleted] = useState(false);

  useEffect(() => {
    if (!isLoading && !hasCompleted) {
      // Start the exit animation sequence
      setAnimationPhase('moving');
      
      // Wait for move animation to complete, then show floating
      const moveTimer = setTimeout(() => {
        setAnimationPhase('floating');
        
        // Wait a bit more then mark as complete
        const completeTimer = setTimeout(() => {
          setAnimationPhase('complete');
          setHasCompleted(true);
          if (onComplete) onComplete();
        }, 300);
        
        return () => clearTimeout(completeTimer);
      }, 1500);
      
      return () => clearTimeout(moveTimer);
    }
  }, [isLoading, onComplete, hasCompleted]);

  // Reset when loading starts again
  useEffect(() => {
    if (isLoading) {
      setAnimationPhase('center');
      setHasCompleted(false);
    }
  }, [isLoading]);

  // Center Logo (Large, in middle of screen)
  const CenterLogo = () => (
    <motion.div
      key="center-logo"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-[9998] flex flex-col items-center justify-center bg-[#0a0f1a]"
    >
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative mb-8"
      >
        {/* Logo container */}
        <motion.div
          animate={{ 
            scale: [1, 1.05, 1],
            rotateY: [0, 180, 360] 
          }}
          transition={{ 
            duration: 4, 
            repeat: Infinity, 
            ease: "linear" 
          }}
          className="relative w-48 h-48"
        >
          {/* Outer ring */}
          <div className="absolute inset-0 rounded-full border-4 border-cyan-400/50">
            <div className="absolute inset-0 rounded-full border border-cyan-300/30 animate-ping" />
          </div>
          
          {/* Middle ring */}
          <div className="absolute inset-8 rounded-full border-2 border-cyan-300/40">
            <motion.div
              className="absolute -inset-2 rounded-full border border-cyan-200/20"
              animate={{
                scale: [1, 1.2, 1]
              }}
              transition={{
                duration: 2,
                repeat: Infinity
              }}
            />
          </div>
          
          {/* Inner core */}
          <div className="absolute inset-16 rounded-full bg-gradient-to-br from-cyan-400/30 to-blue-500/30">
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/10 to-transparent" />
          </div>
          
          {/* Favicon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              animate={{ 
                scale: [1, 1.05, 1]
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity 
              }}
              className="relative w-24 h-24"
            >
              {/* Optional glow effect */}
              <div className="absolute inset-0 rounded-full bg-cyan-400/20 blur-lg" />
              
              {/* Favicon image */}
              <img 
                src="/favicon.ico" 
                alt="ML4E"
                className="relative w-full h-full object-contain rounded-full drop-shadow-[0_0_20px_rgba(0,245,255,0.8)]"
              />
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      {/* Loading text */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-center"
      >
        <p className="text-cyan-300/80 font-mono text-lg mb-2">
          <span className="text-cyan-400">▶</span> {message}
          <motion.span
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 0.8, repeat: Infinity }}
            className="ml-1"
          >
            █
          </motion.span>
        </p>
        <div className="text-xs text-cyan-300/60 font-mono">
          v2.4.1 • NIT ROURKELA
        </div>
      </motion.div>
    </motion.div>
  );

  // Moving Logo (Transition from center to top-left)
  const MovingLogo = () => (
    <motion.div
      key="moving-logo"
      initial={{
        position: "fixed",
        top: "50%",
        left: "50%",
        x: "-50%",
        y: "-50%",
        width: "192px",
        height: "192px",
        zIndex: 9999
      }}
      animate={{
        top: "20px",
        left: "20px",
        x: "0",
        y: "0",
        width: "48px",
        height: "48px"
      }}
      transition={{
        duration: 1.5,
        ease: [0.43, 0.13, 0.23, 0.96]
      }}
      className="fixed z-[9999]"
    >
      {/* Outer ring */}
      <div className="absolute inset-0 rounded-full border-2 border-cyan-400/50">
        <div className="absolute inset-0 rounded-full border border-cyan-300/30 animate-ping" />
      </div>
      
      {/* Middle ring */}
      <div className="absolute inset-4 rounded-full border border-cyan-300/40">
        <motion.div
          className="absolute -inset-1 rounded-full border border-cyan-200/20"
          animate={{
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 2,
            repeat: Infinity
          }}
        />
      </div>
      
      {/* Inner core */}
      <div className="absolute inset-8 rounded-full bg-gradient-to-br from-cyan-400/30 to-blue-500/30">
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/10 to-transparent" />
      </div>
      
      {/* Favicon */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          animate={{ 
            scale: [1, 1.05, 1],
            rotateY: [0, 180, 360] 
          }}
          transition={{ 
            duration: 4, 
            repeat: Infinity, 
            ease: "linear" 
          }}
          className="relative w-full h-full"
        >
          {/* Optional glow effect */}
          <div className="absolute inset-0 rounded-full bg-cyan-400/20 blur-sm" />
          
          {/* Favicon image */}
          <img 
            src="/favicon.ico" 
            alt="ML4E"
            className="relative w-full h-full object-contain rounded-full drop-shadow-[0_0_8px_rgba(0,245,255,0.6)]"
          />
        </motion.div>
      </div>
    </motion.div>
  );

  // Static Floating Logo (After animation completes)
  const StaticFloatingLogo = () => (
    <motion.div
      key="static-logo"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed top-5 left-5 w-12 h-12 z-[9999] cursor-pointer"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Outer ring */}
      <div className="absolute inset-0 rounded-full border-2 border-cyan-400/50">
        <div className="absolute inset-0 rounded-full border border-cyan-300/30 animate-ping" />
      </div>
      
      {/* Middle ring */}
      <div className="absolute inset-2 rounded-full border border-cyan-300/40">
        <motion.div
          className="absolute -inset-1 rounded-full border border-cyan-200/20"
          animate={{
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 2,
            repeat: Infinity
          }}
        />
      </div>
      
      {/* Inner core */}
      <div className="absolute inset-4 rounded-full bg-gradient-to-br from-cyan-400/30 to-blue-500/30">
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/10 to-transparent" />
      </div>
      
      {/* Favicon */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          animate={{ 
            scale: [1, 1.05, 1],
            rotateY: [0, 180, 360] 
          }}
          transition={{ 
            duration: 4, 
            repeat: Infinity, 
            ease: "linear" 
          }}
          className="relative w-full h-full"
        >
          {/* Optional glow effect */}
          <div className="absolute inset-0 rounded-full bg-cyan-400/20 blur-sm" />
          
          {/* Favicon image */}
          <img 
            src="/favicon.ico" 
            alt="ML4E"
            className="relative w-full h-full object-contain rounded-full drop-shadow-[0_0_8px_rgba(0,245,255,0.6)]"
          />
        </motion.div>
      </div>
    </motion.div>
  );

  return (
    <>
      <AnimatePresence mode="wait">
        {animationPhase === 'center' && isLoading && <CenterLogo />}
      </AnimatePresence>
      
      <AnimatePresence>
        {animationPhase === 'moving' && <MovingLogo />}
      </AnimatePresence>
      
      {(animationPhase === 'floating' || animationPhase === 'complete') && <StaticFloatingLogo />}
    </>
  );
}

// Updated hook with better state management
export function useLogoPreloader(initialLoading = true) {
  const [isLoading, setIsLoading] = useState(initialLoading);
  const [showContent, setShowContent] = useState(!initialLoading);

  const handleLoadingComplete = useCallback(() => {
    setIsLoading(false);
    // Wait for logo animation to complete before showing content
    setTimeout(() => {
      setShowContent(true);
    }, 1800);
  }, []);

  const startLoading = useCallback((message?: string) => {
    setIsLoading(true);
    setShowContent(false);
  }, []);

  return {
    isLoading,
    showContent,
    handleLoadingComplete,
    startLoading,
    LogoPreloader: ({ message }: { message?: string }) => (
      <LogoPreloader 
        isLoading={isLoading} 
        message={message} 
        onComplete={handleLoadingComplete} 
      />
    )
  };
}