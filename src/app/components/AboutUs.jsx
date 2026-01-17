"use client";

import { motion } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

/* Glow */
const Glow = ({ className = "" }) => (
  <div
    className={`pointer-events-none absolute inset-0 -z-10 opacity-60 blur-2xl 
    [background:
    radial-gradient(60%_60%_at_20%_0%,rgba(0,255,255,.15),transparent_60%),
    radial-gradient(50%_50%_at_90%_20%,rgba(0,255,200,.12),transparent_60%),
    radial-gradient(40%_40%_at_50%_120%,rgba(0,200,255,.1),transparent_60%)]
    ${className}`}
  />
);

/* Grid */
function GridPattern() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <svg className="w-full h-full opacity-30">
        <defs>
          <pattern
            id="grid-about"
            width="48"
            height="48"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 48 0 L 0 0 0 48"
              fill="none"
              stroke="#00ffee"
              strokeWidth="0.6"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid-about)" />
      </svg>
    </div>
  );
}

export default function AboutUs() {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setVisible(true),
      { threshold: 0.15 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative min-h-screen bg-[#03070d] py-28 overflow-hidden"
    >
      <GridPattern />
      <Glow />

      <div className="relative z-10 max-w-7xl mx-auto px-6">

        {/* TITLE */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-20 text-center"
        >
          <h2
            className="
            flex justify-center items-center
            mb-12 text-4xl md:text-6xl
            font-extrabold tracking-widest
            font-[Orbitron]
            text-transparent bg-clip-text
            bg-gradient-to-r from-green-400 via-cyan-400 to-teal-400
            drop-shadow-[0_0_15px_rgba(16,185,129,0.5)]
            "
          >
            AB

            {/* LOTTIE O */}
            <span
              className="inline-block relative align-middle mx-[-0.15em]"
              style={{ height: "1em", width: "1em" }}
            >
              <DotLottieReact
                src="https://lottie.host/beca5865-363c-4433-bdf1-ddb5824f8f78/j0Jl3duHmb.lottie"
                autoplay
                loop
              />
            </span>

            UT&nbsp;US
          </h2>
        </motion.div>

        {/* ABOUT CARD */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.15, duration: 0.7 }}
          className="
          group relative rounded-3xl border border-cyan-400/30
          cursor-pointer overflow-hidden
          backdrop-blur-xl p-10 md:p-16
          shadow-[0_0_80px_rgba(0,255,255,.15)]
          hover:shadow-[0_0_120px_rgba(0,255,255,.35)]
          transition-all duration-500
          bg-gradient-to-br from-[#021526] via-[#0b2c4d] to-[#1a3a5f]
          "
        >

          {/* Glow on hover */}
          <Glow className="opacity-40 group-hover:opacity-80 transition duration-500" />

          {/* Corners */}
          {["tl", "tr", "bl", "br"].map((p) => (
            <div
              key={p}
              className={`absolute w-10 h-10 border-cyan-300/60
              ${p === "tl" && "top-0 left-0 border-t border-l"}
              ${p === "tr" && "top-0 right-0 border-t border-r"}
              ${p === "bl" && "bottom-0 left-0 border-b border-l"}
              ${p === "br" && "bottom-0 right-0 border-b border-r"}
              `}
            />
          ))}

          {/* TEXT */}
          <p
            className="
            relative z-10 text-blue-200 leading-relaxed text-lg max-md:text-base
            transition-all duration-500
            group-hover:text-cyan-200
            group-hover:drop-shadow-[0_0_10px_rgba(0,255,255,.4)]
            "
          >
            The Machine Learning for Everyone (ML4E) Club at the National Institute
            of Technology Rourkela is a dynamic and vibrant community dedicated to
            fostering knowledge, innovation, and collaboration in the field of
            machine learning and artificial intelligence. As one of the leading
            technical clubs on campus, it serves as a hub for students passionate
            about exploring the cutting-edge advancements in these transformative
            technologies. The club envisions a future where machine learning is a
            fundamental skill accessible to all, empowering students to solve
            real-world problems and innovate across various domains. Membership is
            open to all students of NIT Rourkela who have an interest in machine
            learning and artificial intelligence. The club values enthusiasm,
            curiosity, and a willingness to learn. By joining, members gain access
            to a wealth of resources, including hackathons, project opportunities,
            and a network of like-minded peers.
          </p>

        </motion.div>

      </div>
    </section>
  );
}

