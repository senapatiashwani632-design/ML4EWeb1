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
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setIsOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("overflow-hidden", isOpen);
    return () => document.documentElement.classList.remove("overflow-hidden");
  }, [isOpen]);

  const toggleMenu = () => setIsOpen((v) => !v);

  const mainLinks = [
    "Home",
    "Events",
    "Projects",
    "Team",
    "Resources",
    "Contact",
  ];

  return (
    <>
      {/* ---------------- MOBILE NAV ---------------- */}
      <nav className="md:hidden fixed top-0 left-0 w-full bg-transparent z-[60]">
        <div className="flex justify-between items-center h-16 px-4">
          {/* Logo */}
          <div className="text-blue-500 text-2xl font-bold">ML4E</div>

          {/* Hamburger Button */}
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

        {/* Overlay + Menu */}
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
                className="fixed inset-0 z-50 flex flex-col justify-center items-center"
                variants={ANIMATIONS.menuContainer}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <motion.div
                  className="flex flex-col items-center gap-6 px-4"
                  variants={ANIMATIONS.menuContainer}
                >
                  {mainLinks.map((item) => {
                    if (item === "Resources") {
                      return (
                        <div
                          key="resources"
                          className="flex flex-col items-center"
                        >
                          <motion.button
                            onClick={() => setShowDropdown(!showDropdown)}
                            className="text-xl text-white hover:text-blue-300 transition-colors py-2 px-4 rounded-lg hover:bg-white/5"
                          >
                            Resources ▾
                          </motion.button>
                          {showDropdown && (
                            <div className="flex flex-col items-center gap-2 mt-2">
                              <a
                                href="/onlineresources"
                                className="text-white text-base hover:text-blue-300"
                              >
                                Online Resources
                              </a>
                              <a
                                href="/books"
                                className="text-white text-base hover:text-blue-300"
                              >
                                Books
                              </a>
                            </div>
                          )}
                        </div>
                      );
                    }

                    return (
                      <motion.a
                        key={item}
                        href={`#${item.toLowerCase()}`}
                        variants={ANIMATIONS.menuItem}
                        className="text-xl text-white hover:text-blue-300 transition-colors py-2 px-4 rounded-lg hover:bg-white/5"
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
          {/* Logo */}
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

        {/* Overlay + Menu */}
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
                  className="flex flex-col md:flex-row md:flex-wrap items-center justify-center gap-6 max-w-4xl px-4"
                  variants={ANIMATIONS.menuContainer}
                >
                  {mainLinks.map((item) => {
                    if (item === "Resources") {
                      return (
                        <div
                          key="resources-desktop"
                          className="relative group"
                          onMouseEnter={() => setShowDropdown(true)}
                          onMouseLeave={() => setShowDropdown(false)}
                        >
                          <motion.span
                            className="text-2xl text-white hover:text-blue-300 transition-colors py-2 px-6 rounded-lg hover:bg-white/5"
                            variants={ANIMATIONS.menuItem}
                          >
                            Resources ▾
                          </motion.span>

                          <AnimatePresence>
                            {showDropdown && (
                              <motion.div
                                className="absolute top-full left-0 mt-2 flex flex-col bg-white/10 border border-white/20 rounded-lg shadow-lg"
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                              >
                                <a
                                  href="/onlineresources"
                                  className="px-4 py-2 text-white hover:bg-blue-500/20"
                                >
                                  Online Resources
                                </a>
                                <a
                                  href="/books"
                                  className="px-4 py-2 text-white hover:bg-blue-500/20"
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
