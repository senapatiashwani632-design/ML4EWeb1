"use client";

import React from "react";
import { Orbitron, JetBrains_Mono } from "next/font/google";

interface Project {
  _id: string;
  name: string;
  description?: string;
}
const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["400", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
});

interface DescriptionModalProps {
  project: Project;
  onClose: () => void;
}

const DescriptionModal: React.FC<DescriptionModalProps> = ({
  project,
  onClose,
}) => {
  if (!project) return null;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      id={`modal-${project._id}`}
      tabIndex={-1}
      aria-hidden="true"
      onClick={handleBackdropClick}
      className="fixed inset-0 z-50 flex justify-center items-center w-full h-full bg-black/70 backdrop-blur-sm p-4 overflow-y-auto"
    >
      <div className="relative w-full max-w-2xl max-h-[90vh]">
        <div className="relative bg-gradient-to-br from-[#0A0F1E] via-[#0F172A] to-[#1E293B] rounded-lg shadow-xl border border-cyan-500/30 overflow-hidden">
          
          <div className="flex items-center gap-2 p-3 bg-slate-900/50 border-b border-slate-700">
            <span className="block w-3 h-3 rounded-full bg-red-500"></span>
            <span className="block w-3 h-3 rounded-full bg-yellow-500"></span>
            <span className="block w-3 h-3 rounded-full bg-green-500"></span>
          </div>

   
          <div className="relative flex items-center p-4 md:p-5 border-b border-slate-700">
            <h3
              className={`text-xl font-semibold text-cyan-400 text-center w-full ${orbitron.className}`}
            >
              {project.name}
            </h3>
      
              
          </div>

          <div className="p-4 md:p-5 space-y-4 max-h-[60vh] overflow-y-auto pr-5">
            <p
              className={`text-base leading-relaxed text-gray-300 whitespace-pre-line ${jetbrainsMono.className}`}
            >
              {project.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DescriptionModal;