// components/DescriptionModal.tsx
"use client";

import { motion } from "framer-motion";
import { FiX, FiExternalLink, FiGithub } from "react-icons/fi";

type Project = {
  _id: string;
  name: string;
  imageUrl?: string;
  techStack?: string;
  description?: string;
  deployedLink?: string;
  githubLink?: string;
};

interface DescriptionModalProps {
  project: Project;
  onClose: () => void;
}

const parseTechStack = (techStack?: string): string[] => {
  if (!techStack) return [];
  return techStack.split(/[,|]/).map(tech => tech.trim()).filter(Boolean);
};

export default function DescriptionModal({ project, onClose }: DescriptionModalProps) {
  const techStackArray = parseTechStack(project.techStack);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="bg-slate-900/95 backdrop-blur-xl rounded-2xl border border-slate-700 max-w-2xl w-full max-h-[90vh] overflow-hidden"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-700">
          <h2 className="text-2xl font-bold text-white">{project.name}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-800 rounded-lg transition-colors text-slate-400 hover:text-white"
          >
            <FiX size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          {/* Description Section */}
          {project.description && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-cyan-400 mb-3">Description</h3>
              <p className="text-gray-300 leading-relaxed whitespace-pre-line">
                {project.description}
              </p>
            </div>
          )}

          {/* Tech Stack Section */}
          {techStackArray.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-cyan-400 mb-3">Tech Stack</h3>
              <div className="flex flex-wrap gap-2">
                {techStackArray.map((tech, index) => (
                  <span
                    key={index}
                    className="px-3 py-2 bg-slate-800/60 rounded-lg text-cyan-200 border border-cyan-500/30"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Links */}
          <div className="flex gap-4 pt-4 border-t border-slate-700">
            {project.deployedLink && (
              <a
                href={project.deployedLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-cyan-600 hover:bg-cyan-700 rounded-lg transition-colors text-white"
              >
                <FiExternalLink />
                Live Demo
              </a>
            )}
            {project.githubLink && (
              <a
                href={project.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors text-white"
              >
                <FiGithub />
                GitHub
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}