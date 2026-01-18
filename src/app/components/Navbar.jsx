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

// ✅ Define dropdown configurations
const DROPDOWN_CONFIG = {
  Team: {
    title: "Meet Our Team",
    items: [
      { label: "Executive Body", href: "/team" },
      { label: "Team Members", href: "/teams" },
    ],
  },
  Resources: {
    title: "Resources",
    items: [
      { label: "Online Resources", href: "/onlineresources" },
      // { label: "Books", href: "/books" },
    ],
  },
};

// ✅ Direct link configurations
const DIRECT_LINKS = {
  Home: "/",
  Projects: "/projects",
  Achievements: "/achievements",
  Events: "/events",
  Contact: "#contact",
};

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  // ✅ Fixed keyboard listener for JSX
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        setActiveDropdown(null);
      }
    };

    const handleOpenNav = () => setIsOpen(true);

    if (typeof window !== "undefined") {
      window.addEventListener("keydown", handleKeyDown);
      window.addEventListener("open-navigation", handleOpenNav);
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("keydown", handleKeyDown);
        window.removeEventListener("open-navigation", handleOpenNav);
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

  // ✅ Get href for any menu item
  const getHref = (item) => {
    if (DIRECT_LINKS[item]) return DIRECT_LINKS[item];
    return `#${item.toLowerCase()}`;
  };

  // ✅ Render mobile dropdown
  const renderMobileDropdown = (item) => {
    const config = DROPDOWN_CONFIG[item];
    if (!config) return null;

    return (
      <motion.div
        key={item}
        variants={ANIMATIONS.menuItem}
        className="flex flex-col items-start w-full"
      >
        <motion.span
          className="text-xl text-white font-semibold mb-2"
          variants={ANIMATIONS.menuItem}
        >
          {config.title}
        </motion.span>

        <motion.div
          className="flex flex-col items-start gap-2 border-l-2 border-blue-500 pl-4"
          variants={ANIMATIONS.menuItem}
        >
          {config.items.map((dropdownItem) => (
            <motion.a
              key={dropdownItem.href}
              href={dropdownItem.href}
              className="text-white text-base hover:text-blue-300"
              variants={ANIMATIONS.menuItem}
              onClick={() => setIsOpen(false)}
            >
              {dropdownItem.label}
            </motion.a>
          ))}
        </motion.div>
      </motion.div>
    );
  };

  // ✅ Render desktop dropdown
  const renderDesktopDropdown = (item) => {
    const config = DROPDOWN_CONFIG[item];
    if (!config) return null;

    const isActive = activeDropdown === item;

    return (
      <div
        key={item}
        className="relative group"
        onMouseEnter={() => setActiveDropdown(item)}
        onMouseLeave={() => setActiveDropdown(null)}
      >
        <motion.span
          className="text-2xl text-white hover:text-blue-300 transition-colors py-2 px-6 rounded-lg hover:bg-white/5 cursor-pointer select-none backdrop-blur-sm"
          variants={ANIMATIONS.menuItem}
        >
          {item} ▾
        </motion.span>

        <AnimatePresence>
          {isActive && (
            <motion.div
              className="absolute top-full left-0 mt-2 flex flex-col rounded-xl shadow-2xl backdrop-blur-xl bg-white/15 border border-white/30"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              {config.items.map((dropdownItem) => (
                <a
                  key={dropdownItem.href}
                  href={dropdownItem.href}
                  className="px-6 py-3 text-white hover:bg-white/20 transition-all duration-200 border-b border-white/10 last:border-b-0 first:rounded-t-xl last:rounded-b-xl"
                  onClick={() => setIsOpen(false)}
                >
                  {dropdownItem.label}
                </a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  // ✅ Render regular menu item
  const renderMenuItem = (item, isMobile = false) => {
    // Check if it's a dropdown item
    if (DROPDOWN_CONFIG[item]) {
      return isMobile
        ? renderMobileDropdown(item)
        : renderDesktopDropdown(item);
    }

    // Regular menu item
    return (
      <motion.a
        key={item}
        href={getHref(item)}
        variants={ANIMATIONS.menuItem}
        className={`${
          isMobile
            ? "text-xl text-white hover:text-blue-300 transition-colors py-2 rounded-lg hover:bg-white/5 w-full text-left"
            : "text-2xl text-white hover:text-blue-300 transition-colors py-2 px-6 rounded-lg hover:bg-white/5"
        }`}
        onClick={() => setIsOpen(false)}
      >
        {item}
      </motion.a>
    );
  };

  // Logo component to avoid repetition
  const Logo = () => (
    <div className="flex flex-col items-center">
      <motion.div
        animate={{
          scale: [1, 1, 1],
          rotateY: [0, 180, 360],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "linear",
        }}
        className="relative"
      >
        {/* Holographic logo */}
        <div className="relative w-16 h-16 sm:w-24 sm:h-24">
          {/* Middle ring */}
          <div className="absolute inset-4 rounded-full border border-cyan-300/40">
            <motion.div
              className="absolute -inset-1 rounded-full border border-cyan-200/20"
              animate={{
                scale: [1, 1, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            />
          </div>

          {/* ML4E text */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              animate={{
                scale: [1, 1, 1],
                rotateY: [0, 180, 360],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "linear",
              }}
              className="relative w-12 h-12"
            >
              <img
                src="/favicon.ico"
                alt="ML4E"
                className="relative w-full h-full object-contain rounded-full drop-shadow-[0_0_10px_rgba(0,245,255,0.6)]"
              />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );

  // Hamburger button component
  const HamburgerButton = ({ onClick, isOpen, className = "" }) => (
    <button
      onClick={onClick}
      aria-label="Toggle menu"
      aria-expanded={isOpen}
      className={`flex flex-col justify-center items-center w-12 h-12 rounded-full border border-blue-500/20 bg-blue-500/10 backdrop-blur-sm transition-all ${className}`}
    >
      <span
        className={`block w-6 h-0.5 bg-blue-400 mb-1.5 transition-transform duration-300 ${
          isOpen ? "rotate-45 translate-y-2" : ""
        }`}
      />
      <span
        className={`block w-6 h-0.5 bg-blue-400 transition-opacity duration-300 ${
          isOpen ? "opacity-0" : ""
        }`}
      />
      <span
        className={`block w-6 h-0.5 bg-blue-400 mt-1.5 transition-transform duration-300 ${
          isOpen ? "-rotate-45 -translate-y-2" : ""
        }`}
      />
    </button>
  );

  // Close button component (X icon)
  const CloseButton = ({ onClick, className = "" }) => (
    <button
      onClick={onClick}
      aria-label="Close menu"
      className={`flex items-center justify-center w-12 h-12 rounded-full border-blue-500/20 bg-blue-500/10 backdrop-blur-sm text-blue-400 text-2xl font-bold hover:bg-blue-500/20 transition-all ${className}`}
    >
      ×
    </button>
  );

  return (
    <>
      {/* ---------------- MOBILE NAV ---------------- */}
      <nav className="md:hidden fixed top-0 left-0 w-full bg-transparent z-[60] font-[Orbitron]">
        <div className="backdrop-blur-lg flex justify-between items-center h-16 ">
          <Logo />
          <HamburgerButton
            onClick={toggleMenu}
            isOpen={isOpen}
          />
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
                {/* Close button for mobile */}
                <div className="absolute top-6 right-6 z-[70]">
                  <CloseButton onClick={() => setIsOpen(false)} />
                </div>

                <motion.div
                  className="flex flex-col items-start gap-6 w-full"
                  variants={ANIMATIONS.menuContainer}
                >
                  {mainLinks.map((item) => renderMenuItem(item, true))}
                </motion.div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </nav>

      {/* ---------------- DESKTOP NAV ---------------- */}
      <div className="hidden md:block font-[Orbitron]">
        <div
          className={`fixed top-0 left-0 h-screen w-20 flex flex-col justify-between items-center py-2 z-50 
          ${
            isOpen
              ? "bg-transparent"
              : "bg-white/10 backdrop-blur-lg border-r border-white/20 shadow-xl"
          }`}
        >
          <Logo />

          {!isOpen && <HamburgerButton onClick={toggleMenu} isOpen={isOpen} />}

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
                {/* Close button for desktop */}
                <div className="absolute top-6 right-6 z-[70]">
                  <CloseButton onClick={() => setIsOpen(false)} />
                </div>

                <motion.div
                  className="flex flex-wrap items-center justify-center gap-6 max-w-4xl px-4"
                  variants={ANIMATIONS.menuContainer}
                >
                  {mainLinks.map((item) => renderMenuItem(item, false))}
                </motion.div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}