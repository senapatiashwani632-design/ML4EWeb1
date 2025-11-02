"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { div } from "framer-motion/client";

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
  const [showDropDownTeams, setshowDropDownTeams] = useState(false);

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
      <nav className="md:hidden fixed top-0 left-0 w-full bg-transparent z-[60] font-[Orbitron]">
        <div className="flex justify-between items-center h-16 px-4">
          {/* Logo */}
            <div className="w-12 h-12 rounded-full overflow-hidden  ">
            <svg 
              viewBox="0 0 500 500" 
              xmlns="http://www.w3.org/2000/svg" 
              className="w-full h-full"
            >
              <g transform="translate(0,500) scale(0.1,-0.1)" fill="#FFFFFF" stroke="none">
                <path d="M0 2385 l0 -2385 2420 0 2420 0 0 2385 0 2385 -2420 0 -2420 0 0 -2385z m2400 1716 l0 -239 -62 -7 c-210 -23 -407 -82 -577 -171 -145 -76 -237 -142 -353 -252 -264 -252 -425 -568 -473 -930 -8 -62 -15 -115 -15 -118 0 -2 -108 -4 -240 -4 -186 0 -240 3 -240 13 0 54 35 293 56 382 65 272 198 551 373 780 64 85 232 256 321 328 330 267 766 435 1178 455 l32 2 0 -239z m287 163 c25 -5 48 -60 58 -139 l7 -50 30 60 c44 89 64 107 107 99 59 -10 71 -14 81 -35 9 -15 6 -24 -13 -42 -20 -18 -27 -41 -42 -143 l-18 -121 22 -22 c25 -25 26 -31 8 -55 -12 -16 -20 -17 -81 -8 -73 12 -96 24 -96 53 0 19 31 41 51 37 8 -2 17 22 25 67 18 100 16 107 -12 47 -28 -58 -52 -76 -88 -66 -29 7 -35 19 -51 99 l-12 60 -12 -88 c-7 -48 -12 -89 -10 -90 50 -27 60 -47 38 -73 -10 -13 -25 -14 -68 -9 -85 11 -103 20 -99 53 2 19 9 28 24 30 20 3 23 14 38 115 9 62 19 122 21 133 3 12 -2 27 -10 34 -19 16 -19 29 1 51 16 18 28 18 101 3z m825 -281 c48 -32 90 -66 94 -76 13 -40 -41 -62 -80 -32 -11 8 -23 15 -26 15 -6 0 -56 -71 -134 -192 l-17 -26 59 -41 59 -40 32 45 c26 37 36 45 59 42 43 -5 39 -42 -12 -113 -23 -33 -51 -61 -63 -63 -21 -3 -281 166 -295 192 -5 9 0 23 11 37 19 24 20 24 51 5 18 -10 35 -14 40 -10 4 5 37 54 74 109 l66 99 -25 26 c-29 31 -32 55 -7 69 24 14 16 17 114 -46z m-885 -314 c472 -52 882 -344 1088 -774 93 -195 129 -361 129 -590 0 -229 -36 -396 -129 -590 -73 -152 -63 -163 -133 137 -34 146 -62 271 -62 278 0 7 18 29 40 48 155 132 113 378 -77 459 -54 23 -149 20 -212 -8 -88 -37 -161 -143 -161 -233 0 -30 -8 -36 -207 -149 l-207 -118 -25 21 c-15 11 -51 33 -81 47 -53 26 -103 31 -197 20 -17 -1 -61 44 -208 213 -161 186 -185 218 -180 240 4 14 9 56 12 93 5 62 2 74 -26 132 -51 103 -136 155 -256 157 -102 2 -189 -50 -240 -144 -24 -44 -29 -65 -30 -123 0 -38 4 -86 8 -105 8 -35 7 -35 -183 -230 l-191 -195 6 108 c32 581 398 1064 942 1246 80 26 196 51 308 64 64 8 180 7 272 -4z m1579 -354 c9 -13 13 -33 10 -43 -4 -11 -49 -46 -102 -77 -61 -37 -94 -63 -93 -74 3 -32 -1 -41 -26 -57 -23 -15 -27 -15 -50 0 -26 17 -29 15 -25 -17 2 -24 -18 -47 -41 -47 -13 0 -33 22 -59 63 -46 71 -47 78 -21 101 15 14 24 15 40 6 12 -6 21 -15 21 -20 0 -6 5 -10 10 -10 18 0 11 21 -26 81 -29 48 -33 62 -24 79 16 29 49 34 272 38 93 2 98 1 114 -23z m-2381 -404 c74 -43 100 -151 52 -222 -24 -37 -97 -79 -137 -79 -35 0 -110 40 -132 70 -10 14 -21 42 -24 62 -24 143 117 241 241 169z m2574 -210 c18 -12 50 -326 34 -342 -6 -6 -42 -11 -79 -12 -66 -2 -69 -1 -72 22 -4 29 20 51 56 51 24 0 24 2 18 46 -3 26 -6 57 -6 70 0 21 -5 24 -40 24 -33 0 -40 -3 -40 -20 0 -13 7 -20 20 -20 23 0 43 -32 34 -54 -7 -17 -19 -21 -97 -31 -53 -7 -77 5 -77 36 0 10 9 24 20 31 11 7 20 20 20 29 0 14 -8 16 -42 12 -68 -8 -68 -7 -62 -60 10 -93 10 -92 53 -86 33 5 41 2 50 -16 21 -39 0 -58 -76 -66 -58 -6 -69 -5 -80 11 -7 10 -13 25 -13 33 0 9 -7 74 -15 145 -9 71 -13 137 -10 147 4 13 16 19 36 19 28 0 32 -4 44 -46 2 -7 38 -7 122 3 136 15 145 17 137 36 -6 16 21 47 39 47 7 0 18 -4 26 -9z m-949 -183 c138 -70 102 -268 -52 -285 -148 -17 -225 162 -115 265 48 45 104 51 167 20z m-1700 -21 c30 2 67 4 81 5 23 3 50 -24 208 -206 100 -115 181 -212 181 -216 0 -4 -7 -25 -16 -46 -25 -60 -15 -178 19 -237 94 -160 304 -196 441 -76 52 46 96 128 96 180 l0 37 203 116 c112 63 210 118 219 121 8 3 33 -5 53 -20 21 -14 48 -28 59 -31 18 -4 28 -36 80 -257 33 -139 72 -306 88 -372 l29 -120 -63 -59 c-209 -194 -433 -309 -708 -362 -128 -24 -361 -25 -485 -1 -436 85 -793 354 -989 745 -42 83 -109 275 -104 298 2 7 111 127 243 264 l240 251 35 -8 c19 -4 60 -7 90 -6z m-826 -304 c3 -21 8 -65 11 -98 10 -88 58 -268 98 -368 183 -453 571 -796 1040 -923 70 -18 282 -54 323 -54 2 0 3 -107 2 -237 l-3 -238 -70 3 c-162 7 -384 55 -560 122 -747 280 -1248 947 -1320 1758 l-6 72 240 0 239 0 6 -37z m3581 -40 c-42 -492 -237 -921 -574 -1267 -352 -360 -784 -562 -1308 -611 l-73 -7 0 240 0 240 63 7 c408 45 755 220 1025 518 209 231 354 565 387 890 l7 67 240 0 240 0 -7 -77z"/>
                <path d="M3927 3254 c-5 -5 0 -17 29 -62 2 -4 104 58 104 64 0 7 -126 5 -133 -2z"/>
              </g>
            </svg>
          </div>

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
                    // ✅ Mobile Team Dropdown
                    if (item === "Team") {
                      return (
                        <motion.div
                          key="team"
                          variants={ANIMATIONS.menuItem}
                          className="flex flex-col items-start w-full"
                        >
                          <motion.span
                            className="text-xl text-white font-semibold mb-2"
                            variants={ANIMATIONS.menuItem}
                          >
                            Meet Our Team
                          </motion.span>

                          <motion.div
                            className="flex flex-col items-start gap-2 border-l-2 border-blue-500 pl-4"
                            variants={ANIMATIONS.menuItem}
                          >
                            <motion.a
                              href="/team"
                              className="text-white text-base hover:text-blue-300"
                              variants={ANIMATIONS.menuItem}
                              onClick={() => setIsOpen(false)}
                            >
                              Executive Body
                            </motion.a>
                            <motion.a
                              href="/teams"
                              className="text-white text-base hover:text-blue-300"
                              variants={ANIMATIONS.menuItem}
                              onClick={() => setIsOpen(false)}
                            >
                              Team Members
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

                    // ✅ Direct links for Projects and Achievements
                    if (item === "Projects" || item === "Achievements") {
                      return (
                        <motion.a
                          key={item}
                          href={`/${item.toLowerCase()}`}
                          variants={ANIMATIONS.menuItem}
                          className="text-xl text-white hover:text-blue-300 transition-colors py-2 rounded-lg hover:bg-white/5 w-full text-left"
                          onClick={() => setIsOpen(false)}
                        >
                          {item}
                        </motion.a>
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
      <div className="hidden md:block font-[Orbitron]">
        <div
          className={`fixed top-0 left-0 h-screen w-20 flex flex-col justify-between items-center py-6 z-50 
          ${
            isOpen
              ? "bg-transparent"
              : "bg-white/10 backdrop-blur-lg border-r border-white/20 shadow-xl"
          }`}
        >
       
          {/* Logo */}
            <div className="w-12 h-12 rounded-full overflow-hidden  ">
            <svg 
              viewBox="0 0 500 500" 
              xmlns="http://www.w3.org/2000/svg" 
              className="w-full h-full"
            >
              <g transform="translate(0,500) scale(0.1,-0.1)" fill="#FFFFFF" stroke="none">
                <path d="M0 2385 l0 -2385 2420 0 2420 0 0 2385 0 2385 -2420 0 -2420 0 0 -2385z m2400 1716 l0 -239 -62 -7 c-210 -23 -407 -82 -577 -171 -145 -76 -237 -142 -353 -252 -264 -252 -425 -568 -473 -930 -8 -62 -15 -115 -15 -118 0 -2 -108 -4 -240 -4 -186 0 -240 3 -240 13 0 54 35 293 56 382 65 272 198 551 373 780 64 85 232 256 321 328 330 267 766 435 1178 455 l32 2 0 -239z m287 163 c25 -5 48 -60 58 -139 l7 -50 30 60 c44 89 64 107 107 99 59 -10 71 -14 81 -35 9 -15 6 -24 -13 -42 -20 -18 -27 -41 -42 -143 l-18 -121 22 -22 c25 -25 26 -31 8 -55 -12 -16 -20 -17 -81 -8 -73 12 -96 24 -96 53 0 19 31 41 51 37 8 -2 17 22 25 67 18 100 16 107 -12 47 -28 -58 -52 -76 -88 -66 -29 7 -35 19 -51 99 l-12 60 -12 -88 c-7 -48 -12 -89 -10 -90 50 -27 60 -47 38 -73 -10 -13 -25 -14 -68 -9 -85 11 -103 20 -99 53 2 19 9 28 24 30 20 3 23 14 38 115 9 62 19 122 21 133 3 12 -2 27 -10 34 -19 16 -19 29 1 51 16 18 28 18 101 3z m825 -281 c48 -32 90 -66 94 -76 13 -40 -41 -62 -80 -32 -11 8 -23 15 -26 15 -6 0 -56 -71 -134 -192 l-17 -26 59 -41 59 -40 32 45 c26 37 36 45 59 42 43 -5 39 -42 -12 -113 -23 -33 -51 -61 -63 -63 -21 -3 -281 166 -295 192 -5 9 0 23 11 37 19 24 20 24 51 5 18 -10 35 -14 40 -10 4 5 37 54 74 109 l66 99 -25 26 c-29 31 -32 55 -7 69 24 14 16 17 114 -46z m-885 -314 c472 -52 882 -344 1088 -774 93 -195 129 -361 129 -590 0 -229 -36 -396 -129 -590 -73 -152 -63 -163 -133 137 -34 146 -62 271 -62 278 0 7 18 29 40 48 155 132 113 378 -77 459 -54 23 -149 20 -212 -8 -88 -37 -161 -143 -161 -233 0 -30 -8 -36 -207 -149 l-207 -118 -25 21 c-15 11 -51 33 -81 47 -53 26 -103 31 -197 20 -17 -1 -61 44 -208 213 -161 186 -185 218 -180 240 4 14 9 56 12 93 5 62 2 74 -26 132 -51 103 -136 155 -256 157 -102 2 -189 -50 -240 -144 -24 -44 -29 -65 -30 -123 0 -38 4 -86 8 -105 8 -35 7 -35 -183 -230 l-191 -195 6 108 c32 581 398 1064 942 1246 80 26 196 51 308 64 64 8 180 7 272 -4z m1579 -354 c9 -13 13 -33 10 -43 -4 -11 -49 -46 -102 -77 -61 -37 -94 -63 -93 -74 3 -32 -1 -41 -26 -57 -23 -15 -27 -15 -50 0 -26 17 -29 15 -25 -17 2 -24 -18 -47 -41 -47 -13 0 -33 22 -59 63 -46 71 -47 78 -21 101 15 14 24 15 40 6 12 -6 21 -15 21 -20 0 -6 5 -10 10 -10 18 0 11 21 -26 81 -29 48 -33 62 -24 79 16 29 49 34 272 38 93 2 98 1 114 -23z m-2381 -404 c74 -43 100 -151 52 -222 -24 -37 -97 -79 -137 -79 -35 0 -110 40 -132 70 -10 14 -21 42 -24 62 -24 143 117 241 241 169z m2574 -210 c18 -12 50 -326 34 -342 -6 -6 -42 -11 -79 -12 -66 -2 -69 -1 -72 22 -4 29 20 51 56 51 24 0 24 2 18 46 -3 26 -6 57 -6 70 0 21 -5 24 -40 24 -33 0 -40 -3 -40 -20 0 -13 7 -20 20 -20 23 0 43 -32 34 -54 -7 -17 -19 -21 -97 -31 -53 -7 -77 5 -77 36 0 10 9 24 20 31 11 7 20 20 20 29 0 14 -8 16 -42 12 -68 -8 -68 -7 -62 -60 10 -93 10 -92 53 -86 33 5 41 2 50 -16 21 -39 0 -58 -76 -66 -58 -6 -69 -5 -80 11 -7 10 -13 25 -13 33 0 9 -7 74 -15 145 -9 71 -13 137 -10 147 4 13 16 19 36 19 28 0 32 -4 44 -46 2 -7 38 -7 122 3 136 15 145 17 137 36 -6 16 21 47 39 47 7 0 18 -4 26 -9z m-949 -183 c138 -70 102 -268 -52 -285 -148 -17 -225 162 -115 265 48 45 104 51 167 20z m-1700 -21 c30 2 67 4 81 5 23 3 50 -24 208 -206 100 -115 181 -212 181 -216 0 -4 -7 -25 -16 -46 -25 -60 -15 -178 19 -237 94 -160 304 -196 441 -76 52 46 96 128 96 180 l0 37 203 116 c112 63 210 118 219 121 8 3 33 -5 53 -20 21 -14 48 -28 59 -31 18 -4 28 -36 80 -257 33 -139 72 -306 88 -372 l29 -120 -63 -59 c-209 -194 -433 -309 -708 -362 -128 -24 -361 -25 -485 -1 -436 85 -793 354 -989 745 -42 83 -109 275 -104 298 2 7 111 127 243 264 l240 251 35 -8 c19 -4 60 -7 90 -6z m-826 -304 c3 -21 8 -65 11 -98 10 -88 58 -268 98 -368 183 -453 571 -796 1040 -923 70 -18 282 -54 323 -54 2 0 3 -107 2 -237 l-3 -238 -70 3 c-162 7 -384 55 -560 122 -747 280 -1248 947 -1320 1758 l-6 72 240 0 239 0 6 -37z m3581 -40 c-42 -492 -237 -921 -574 -1267 -352 -360 -784 -562 -1308 -611 l-73 -7 0 240 0 240 63 7 c408 45 755 220 1025 518 209 231 354 565 387 890 l7 67 240 0 240 0 -7 -77z"/>
                <path d="M3927 3254 c-5 -5 0 -17 29 -62 2 -4 104 58 104 64 0 7 -126 5 -133 -2z"/>
              </g>
            </svg>
          </div>

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
                    // ✅ Desktop Team Dropdown
                    if (item === "Team") {
                      return (
                        <div
                          key="team"
                          className="relative group"
                          onMouseEnter={() => setshowDropDownTeams(true)}
                          onMouseLeave={() => setshowDropDownTeams(false)}
                        >
                          <motion.span
                            className="text-2xl text-white hover:text-blue-300 transition-colors py-2 px-6 rounded-lg hover:bg-white/5 cursor-pointer select-none"
                            variants={ANIMATIONS.menuItem}
                          >
                            Meet Our Team ▾
                          </motion.span>

                          <AnimatePresence>
                            {showDropDownTeams && (
                              <motion.div
                                className="absolute top-full left-0 mt-2 flex flex-col bg-white/10 border border-white/20 rounded-lg shadow-lg"
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                              >
                                <a
                                  href="/team"
                                  className="px-4 py-2 text-white hover:bg-blue-500/20"
                                  onClick={() => setIsOpen(false)}
                                >
                                  Executive Body
                                </a>
                                <a
                                  href="/teams"
                                  className="px-4 py-2 text-white hover:bg-blue-500/20"
                                  onClick={() => setIsOpen(false)}
                                >
                                  Team Members
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

                    // ✅ Direct links for Projects and Achievements
                    if (item === "Projects" || item === "Achievements") {
                      return (
                        <motion.a
                          key={item}
                          href={`/${item.toLowerCase()}`}
                          variants={ANIMATIONS.menuItem}
                          className="text-2xl text-white hover:text-blue-300 transition-colors py-2 px-6 rounded-lg hover:bg-white/5"
                          onClick={() => setIsOpen(false)}
                        >
                          {item}
                        </motion.a>
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