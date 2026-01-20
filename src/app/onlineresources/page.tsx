"use client";

import React, { useState, useRef } from "react";
import { 
  BookOpen, 
  Youtube, 
  ExternalLink, 
  Download, 
  PlayCircle,
  X,
  FileText
} from "lucide-react";
import Navbar from "../components/Navbar"; 
import { motion, AnimatePresence } from "framer-motion";
import NeuralBackground from "@/app/components/NeuralBackground";
import { resources, ResourceItem } from "../../data/resources"; // Import the data

// --- 1. Custom Bento Card ---
interface BentoCardProps {
  item: ResourceItem;
  onClick: () => void;
}

const BentoCard = ({ item, onClick }: BentoCardProps) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <motion.div
      layoutId={item.id}
      ref={divRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      whileHover={{ scale: 1.02, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.5)" }}
      className={`relative overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-br from-[#0b0d14] to-[#050608] group cursor-pointer ${item.span}`}
    >
      {/* Book Cover Background Image */}
      {item.type === 'book' && item.coverImage && (
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-500"
          style={{
            backgroundImage: `url(${item.coverImage})`,
            filter: 'blur(2px) brightness(0.3)',
          }}
        />
      )}
      {/* Fallback gradient for items without cover images */}
      {(!item.coverImage || item.type !== 'book') && (
        <div 
          className="absolute inset-0 bg-gradient-to-br from-[#0b0d14] to-[#050608]"
        />
      )}
      {/* Animated gradient overlay */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500"
        style={{
          background: `linear-gradient(135deg, ${item.color.replace('rgb', 'rgba').replace(')', ', 0.2)')}, transparent 70%)`,
        }}
      />
      {/* Spotlight Effect */}
      <motion.div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100 z-10"
        style={{
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, ${item.color.replace('rgb', 'rgba').replace(')', ', 0.15)')}, transparent 40%)`,
        }}
      />
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-300 group-hover:opacity-100 z-10"
        style={{
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, ${item.color}, transparent 40%)`,
          maskImage: "linear-gradient(black, black) content-box, linear-gradient(black, black)",
          WebkitMaskImage: "linear-gradient(black, black) content-box, linear-gradient(black, black)",
          maskComposite: "exclude",
          WebkitMaskComposite: "xor",
          padding: "2px",
        }}
      />

      {/* Card Content */}
      <div className="relative h-full p-6 flex flex-col justify-between z-0 transition-all duration-300 group-hover:blur-[2px] group-hover:opacity-40">
        <div className="flex justify-between items-start">
          <motion.div 
            className="w-12 h-12 rounded-2xl flex items-center justify-center border border-white/10 shadow-lg"
            style={{ backgroundColor: item.color.replace('rgb', 'rgba').replace(')', ', 0.15)') }}
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            {item.type === 'book' ? (
              <BookOpen size={24} style={{ color: item.color }} />
            ) : (
              <Youtube size={24} style={{ color: item.color }} />
            )}
          </motion.div>
          <motion.div whileHover={{ scale: 1.2, opacity: 1 }} transition={{ duration: 0.2 }}>
            <ExternalLink className="w-5 h-5 text-slate-600 group-hover:text-slate-400 transition-colors" />
          </motion.div>
        </div>

        <div>
          <h3 className="text-xl font-bold text-slate-100 mb-1 leading-tight group-hover:text-white transition-colors">{item.title}</h3>
          <p className="text-xs font-mono text-slate-400 mb-2 group-hover:text-slate-300 transition-colors">{item.author}</p>
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase tracking-wider px-2 py-1 rounded bg-slate-800 text-slate-400 border border-slate-700">
               {item.type === 'book' ? 'PDF' : 'Playlist'}
            </span>
          </div>
        </div>
      </div>

      {/* Overlay (Appears on Hover) */}
      <motion.div 
        className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
      >
        <motion.div 
          className="px-6 py-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold flex items-center gap-2 shadow-2xl"
          initial={{ scale: 0.8, y: 10 }}
          whileHover={{ scale: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 400, damping: 15 }}
        >
          {item.type === 'book' ? <BookOpen size={18} /> : <PlayCircle size={18} />}
          <span>{item.type === 'book' ? "Read Now" : "Watch Now"}</span>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

// --- 2. Resource Modal ---
interface ResourceModalProps {
  resource: ResourceItem;
  onClose: () => void;
}

const ResourceModal = ({ resource, onClose }: ResourceModalProps) => {
  if (!resource) return null;

  return (
    <motion.div 
      className="fixed inset-0 z-[100] flex items-center justify-center px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-xl"
      />
      
      <motion.div 
        layoutId={resource.id}
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="relative w-full max-w-lg bg-gradient-to-br from-[#0f111a] to-[#050608] border-2 border-slate-700 rounded-3xl p-8 shadow-2xl overflow-hidden z-50"
      >
        {/* Animated background gradient */}
        <motion.div 
          className="absolute inset-0 opacity-10"
          animate={{
            background: [
              `radial-gradient(circle at 0% 0%, ${resource.color}, transparent 50%)`,
              `radial-gradient(circle at 100% 100%, ${resource.color}, transparent 50%)`,
              `radial-gradient(circle at 0% 0%, ${resource.color}, transparent 50%)`,
            ]
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
        />
        <motion.button 
          onClick={onClose} 
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-full z-10 transition-colors"
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
        >
          <X size={20} />
        </motion.button>

        <div className="flex flex-col gap-5 relative z-10">
          <motion.div 
            className="w-16 h-16 rounded-2xl flex items-center justify-center border border-white/10 bg-slate-800/50 shadow-lg"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
            style={{ backgroundColor: resource.color.replace('rgb', 'rgba').replace(')', ', 0.15)') }}
          >
            {resource.type === 'book' ? <FileText size={32} style={{ color: resource.color }} /> : <Youtube size={32} style={{ color: resource.color }} />}
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-3xl font-bold text-white mb-2">{resource.title}</h2>
            <p className="text-sm text-slate-400 font-mono">{resource.author}</p>
          </motion.div>

          <motion.div 
            className="p-5 rounded-2xl bg-slate-900/50 backdrop-blur-sm border border-slate-800 text-slate-300 text-sm leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {resource.description}
          </motion.div>

          <motion.div 
            className="flex gap-3 mt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            {/* Primary Action: Read or Watch */}
            <motion.a 
              href={resource.link} 
              target="_blank"
              rel="noreferrer"
              className="flex-1 flex items-center justify-center gap-2 bg-slate-100 text-black font-bold py-3 rounded-xl hover:bg-white transition-all shadow-lg"
              whileHover={{ scale: 1.05, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.3)" }}
              whileTap={{ scale: 0.95 }}
            >
              {resource.type === 'book' ? <BookOpen size={18} /> : <PlayCircle size={18} />}
              {resource.type === 'book' ? 'Read Now' : 'Watch on YouTube'}
            </motion.a>
            
            {/* Secondary Action: Download (Only for books) */}
            {resource.type === 'book' && resource.downloadUrl && (
              <motion.a 
                href={resource.downloadUrl}
                download
                className="px-5 bg-slate-800 text-white rounded-xl border border-slate-700 hover:bg-slate-700 flex items-center justify-center transition-colors"
                title="Download PDF"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
              >
                <Download size={20} />
              </motion.a>
            )}
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// --- 3. Main Page Component ---
export default function OnlineResources() {
  const [selectedResource, setSelectedResource] = useState<ResourceItem | null>(null);

  return (
    <main className="relative min-h-screen w-full bg-[#020617] text-slate-200">
      <NeuralBackground />
      <Navbar />
      
      {/* FOOTER REMOVAL HACK */}
      {/* <style jsx global>{`
        footer, .footer, [data-testid="footer"] { display: none !important; }
      `}</style> */}
      
      <div className="relative z-10 pt-32 pb-20 px-4 sm:px-8 pl-24 md:pl-32 max-w-7xl mx-auto">
        
        {/* Header */}
        <motion.div 
          className="mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
           <h1 className="text-4xl md:text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-slate-400 mb-4">
            Library
           </h1>
           <p className="text-slate-400 text-lg max-w-xl">
             Essential readings and curated playlists for the ML4E team.
           </p>
        </motion.div>

        {/* BENTO GRID LAYOUT */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[180px]">
          {resources.map((res) => (
            <BentoCard 
              key={res.id} 
              item={res} 
              onClick={() => setSelectedResource(res)} 
            />
          ))}
        </div>

      </div>

      {/* Modal Overlay */}
      <AnimatePresence mode="wait">
        {selectedResource && (
          <ResourceModal 
            resource={selectedResource} 
            onClose={() => setSelectedResource(null)} 
          />
        )}
      </AnimatePresence>
    </main>
  );
}