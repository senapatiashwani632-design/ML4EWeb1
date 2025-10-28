"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ANIMATIONS = {
  overlay: {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, transition: { duration: 0.3 } },
  },
  menuContainer: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
    exit: {
      opacity: 0,
      transition: { staggerChildren: 0.05, staggerDirection: -1 },
    },
  },
  menuItem: {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
    exit: { opacity: 0, y: 20, transition: { duration: 0.3 } },
  },
};

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showDropdownResources, setShowDropdownResources] = useState(false);
  const [showDropdownProjects, setShowDropdownProjects] = useState(false);
  const [showDropdownAchievements, setShowDropdownAchievements] = useState(false);

  // ✅ Fixed keyboard listener for JSX
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    if (typeof window !== "undefined") {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("keydown", handleKeyDown);
      }
    };
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("overflow-hidden", isOpen);
    return () => document.documentElement.classList.remove("overflow-hidden");
  }, [isOpen]);

  const toggleMenu = () => setIsOpen((v) => !v);

  const mainLinks = [
    "Home",
    "Projects",
    
    "Events",
    
    "Team",
    "Achievements",
    "Resources",
    "Contact",
  ];

  return (
    <>
      {/* ---------------- MOBILE NAV ---------------- */}
      <nav className="md:hidden fixed top-0 left-0 w-full bg-transparent z-[60]">
        <div className="flex justify-between items-center h-16 px-4">
          <div className="text-blue-500 text-2xl font-bold">ML4E</div>

          <button
            onClick={toggleMenu}
            aria-label="Toggle menu"
            aria-expanded={isOpen}
            className={`flex flex-col justify-center items-center w-12 h-12 rounded-full border border-blue-500/20 bg-blue-500/10 backdrop-blur-sm transition-all
              ${isOpen ? "fixed top-4 right-4 z-[70]" : "relative z-[60]"}`}
          >
            <span
              className={`block w-6 h-0.5 bg-blue-400 mb-1.5 transition-transform ${
                isOpen ? "rotate-45 translate-y-2" : ""
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-blue-400 transition-opacity ${
                isOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-blue-400 mt-1.5 transition-transform ${
                isOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            />
          </button>
        </div>

        <AnimatePresence>
          {isOpen && (
            <>
              <motion.div
                className="fixed inset-0 bg-gray-900/95 z-40"
                variants={ANIMATIONS.overlay}
                initial="hidden"
                animate="visible"
                exit="exit"
                onClick={() => setIsOpen(false)}
              />

              <motion.div
                className="fixed inset-0 z-50 flex flex-col justify-center items-start px-8"
                variants={ANIMATIONS.menuContainer}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <motion.div
                  className="flex flex-col items-start gap-6 w-full"
                  variants={ANIMATIONS.menuContainer}
                >
                  {mainLinks.map((item) => {
                    // ✅ Mobile Achievements Dropdown
                    if (item === "Achievements") {
                      return (
                        <motion.div
                          key="achievements"
                          variants={ANIMATIONS.menuItem}
                          className="flex flex-col items-start w-full"
                        >
                          <motion.span
                            className="text-xl text-white font-semibold mb-2"
                            variants={ANIMATIONS.menuItem}
                          >
                            Achievements
                          </motion.span>

                          <motion.div
                            className="flex flex-col items-start gap-2 border-l-2 border-blue-500 pl-4"
                            variants={ANIMATIONS.menuItem}
                          >
                            <motion.a
                              href="/form"
                              className="text-white text-base hover:text-blue-300"
                              variants={ANIMATIONS.menuItem}
                              onClick={() => setIsOpen(false)}
                            >
                              Upload Achievements
                            </motion.a>
                            <motion.a
                              href="/achievements"
                              className="text-white text-base hover:text-blue-300"
                              variants={ANIMATIONS.menuItem}
                              onClick={() => setIsOpen(false)}
                            >
                              View Achievements
                            </motion.a>
                          </motion.div>
                        </motion.div>
                      );
                    }

                    // ✅ Mobile Projects Dropdown
                    if (item === "Projects") {
                      return (
                        <motion.div
                          key="projects"
                          variants={ANIMATIONS.menuItem}
                          className="flex flex-col items-start w-full"
                        >
                          <motion.span
                            className="text-xl text-white font-semibold mb-2"
                            variants={ANIMATIONS.menuItem}
                          >
                            Projects
                          </motion.span>

                          <motion.div
                            className="flex flex-col items-start gap-2 border-l-2 border-blue-500 pl-4"
                            variants={ANIMATIONS.menuItem}
                          >
                            <motion.a
                              href="/upload"
                              className="text-white text-base hover:text-blue-300"
                              variants={ANIMATIONS.menuItem}
                              onClick={() => setIsOpen(false)}
                            >
                              Upload Projects
                            </motion.a>
                            <motion.a
                              href="/projects"
                              className="text-white text-base hover:text-blue-300"
                              variants={ANIMATIONS.menuItem}
                              onClick={() => setIsOpen(false)}
                            >
                              View Projects
                            </motion.a>
                          </motion.div>
                        </motion.div>
                      );
                    }

                    // ✅ Mobile Resources Dropdown
                    if (item === "Resources") {
                      return (
                        <motion.div
                          key="resources"
                          variants={ANIMATIONS.menuItem}
                          className="flex flex-col items-start w-full"
                        >
                          <motion.span
                            className="text-xl text-white font-semibold mb-2"
                            variants={ANIMATIONS.menuItem}
                          >
                            Resources
                          </motion.span>

                          <motion.div
                            className="flex flex-col items-start gap-2 border-l-2 border-blue-500 pl-4"
                            variants={ANIMATIONS.menuItem}
                          >
                            <motion.a
                              href="/onlineresources"
                              className="text-white text-base hover:text-blue-300"
                              variants={ANIMATIONS.menuItem}
                              onClick={() => setIsOpen(false)}
                            >
                              Online Resources
                            </motion.a>
                            <motion.a
                              href="/books"
                              className="text-white text-base hover:text-blue-300"
                              variants={ANIMATIONS.menuItem}
                              onClick={() => setIsOpen(false)}
                            >
                              Books
                            </motion.a>
                          </motion.div>
                        </motion.div>
                      );
                    }

                    return (
                      <motion.a
                        key={item}
                        href={`#${item.toLowerCase()}`}
                        variants={ANIMATIONS.menuItem}
                        className="text-xl text-white hover:text-blue-300 transition-colors py-2 rounded-lg hover:bg-white/5 w-full text-left"
                        onClick={() => setIsOpen(false)}
                      >
                        {item}
                      </motion.a>
                    );
                  })}
                </motion.div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </nav>

      {/* ---------------- DESKTOP NAV ---------------- */}
      <div className="hidden md:block">
        <div
          className={`fixed top-0 left-0 h-screen w-20 flex flex-col justify-between items-center py-6 z-50 
          ${
            isOpen
              ? "bg-transparent"
              : "bg-white/10 backdrop-blur-lg border-r border-white/20 shadow-xl"
          }`}
        >
          <div className="text-white text-2xl font-bold">ML4E</div>

          {!isOpen && (
            <button
              onClick={toggleMenu}
              aria-label="Open menu"
              aria-expanded={isOpen}
              className="flex flex-col justify-center items-center w-12 h-12 rounded-full bg-blue-500/10 backdrop-blur-sm border border-blue-500/20"
            >
              <span className="block w-6 h-0.5 bg-blue-400 mb-1.5" />
              <span className="block w-6 h-0.5 bg-blue-400" />
              <span className="block w-6 h-0.5 bg-blue-400 mt-1.5" />
            </button>
          )}

          <div className="h-6" />
        </div>

        <AnimatePresence>
          {isOpen && (
            <>
              <motion.div
                className="fixed inset-0 bg-gray-900/95 backdrop-blur-md z-40"
                variants={ANIMATIONS.overlay}
                initial="hidden"
                animate="visible"
                exit="exit"
                onClick={() => setIsOpen(false)}
              />

              <motion.div
                className="fixed inset-0 z-50 flex flex-col justify-center items-center"
                variants={ANIMATIONS.menuContainer}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <button
                  onClick={() => setIsOpen(false)}
                  aria-label="Close menu"
                  className="absolute top-6 right-6 text-4xl text-white z-[60]"
                >
                  &times;
                </button>

                <motion.div
                  className="flex flex-wrap items-center justify-center gap-6 max-w-4xl px-4"
                  variants={ANIMATIONS.menuContainer}
                >
                  {mainLinks.map((item) => {
                    // ✅ Desktop Achievements Dropdown
                    if (item === "Achievements") {
                      return (
                        <div
                          key="achievements"
                          className="relative group"
                          onMouseEnter={() => setShowDropdownAchievements(true)}
                          onMouseLeave={() => setShowDropdownAchievements(false)}
                        >
                          <motion.span
                            className="text-2xl text-white hover:text-blue-300 transition-colors py-2 px-6 rounded-lg hover:bg-white/5 cursor-pointer select-none"
                            variants={ANIMATIONS.menuItem}
                          >
                            Achievements ▾
                          </motion.span>

                          <AnimatePresence>
                            {showDropdownAchievements && (
                              <motion.div
                                className="absolute top-full left-0 mt-2 flex flex-col bg-white/10 border border-white/20 rounded-lg shadow-lg"
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                              >
                                <a
                                  href="/form"
                                  className="px-4 py-2 text-white hover:bg-blue-500/20"
                                  onClick={() => setIsOpen(false)}
                                >
                                  Upload Achievements
                                </a>
                                <a
                                  href="/achievements"
                                  className="px-4 py-2 text-white hover:bg-blue-500/20"
                                  onClick={() => setIsOpen(false)}
                                >
                                  View Achievements
                                </a>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    }

                    // ✅ Desktop Projects Dropdown
                    if (item === "Projects") {
                      return (
                        <div
                          key="projects"
                          className="relative group"
                          onMouseEnter={() => setShowDropdownProjects(true)}
                          onMouseLeave={() => setShowDropdownProjects(false)}
                        >
                          <motion.span
                            className="text-2xl text-white hover:text-blue-300 transition-colors py-2 px-6 rounded-lg hover:bg-white/5 cursor-pointer select-none"
                            variants={ANIMATIONS.menuItem}
                          >
                            Projects ▾
                          </motion.span>

                          <AnimatePresence>
                            {showDropdownProjects && (
                              <motion.div
                                className="absolute top-full left-0 mt-2 flex flex-col bg-white/10 border border-white/20 rounded-lg shadow-lg"
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                              >
                                <a
                                  href="/upload"
                                  className="px-4 py-2 text-white hover:bg-blue-500/20"
                                  onClick={() => setIsOpen(false)}
                                >
                                  Upload Projects
                                </a>
                                <a
                                  href="/projects"
                                  className="px-4 py-2 text-white hover:bg-blue-500/20"
                                  onClick={() => setIsOpen(false)}
                                >
                                  View Projects
                                </a>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    }

                    // ✅ Desktop Resources Dropdown
                    if (item === "Resources") {
                      return (
                        <div
                          key="resources"
                          className="relative group"
                          onMouseEnter={() => setShowDropdownResources(true)}
                          onMouseLeave={() => setShowDropdownResources(false)}
                        >
                          <motion.span
                            className="text-2xl text-white hover:text-blue-300 transition-colors py-2 px-6 rounded-lg hover:bg-white/5 cursor-pointer select-none"
                            variants={ANIMATIONS.menuItem}
                          >
                            Resources ▾
                          </motion.span>

                          <AnimatePresence>
                            {showDropdownResources && (
                              <motion.div
                                className="absolute top-full left-0 mt-2 flex flex-col bg-white/10 border border-white/20 rounded-lg shadow-lg"
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                              >
                                <a
                                  href="/onlineresources"
                                  className="px-4 py-2 text-white hover:bg-blue-500/20"
                                  onClick={() => setIsOpen(false)}
                                >
                                  Online Resources
                                </a>
                                <a
                                  href="/books"
                                  className="px-4 py-2 text-white hover:bg-blue-500/20"
                                  onClick={() => setIsOpen(false)}
                                >
                                  Books
                                </a>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    }

                    return (
                      <motion.a
                        key={item}
                        href={`#${item.toLowerCase()}`}
                        variants={ANIMATIONS.menuItem}
                        className="text-2xl text-white hover:text-blue-300 transition-colors py-2 px-6 rounded-lg hover:bg-white/5"
                        onClick={() => setIsOpen(false)}
                      >
                        {item}
                      </motion.a>
                    );
                  })}
                </motion.div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
