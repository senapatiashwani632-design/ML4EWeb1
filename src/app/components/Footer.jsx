"use client";
import React from "react";

const Glow = ({ className = "" }) => (
  <div
    className={`pointer-events-none absolute inset-0 -z-10 opacity-60 blur-2xl 
      [background:radial-gradient(60%_60%_at_20%_0%,rgba(0,255,255,.15),transparent_60%),radial-gradient(50%_50%_at_90%_20%,rgba(0,255,200,.12),transparent_60%),radial-gradient(40%_40%_at_50%_120%,rgba(0,200,255,.1),transparent_60%)] ${className}`}
  />
);

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="
        relative z-30 w-full overflow-hidden border-t border-cyan-500/20
        bg-[#0b1117] text-slate-200 isolate flex flex-col items-center
      "
    >
      <Glow />

      {/* Container */}
      <div className="relative w-full max-w-4xl px-4 py-12 sm:px-8 text-center">
        {/* Title */}
        <h2 className="mb-8 text-3xl font-extrabold tracking-wide text-cyan-200 drop-shadow-[0_0_18px_rgba(0,255,255,.45)]">
          ML4E
        </h2>

        {/* Cards */}
        <div className="grid gap-8 md:grid-cols-2 place-items-center">
          {/* Faculty Advisor */}
          <div className="w-full max-w-sm rounded-2xl bg-white/5 p-6 ring-1 ring-white/10 backdrop-blur text-left sm:text-center md:text-left">
            <h3 className="mb-2 text-2xl font-bold text-cyan-200 drop-shadow-[0_0_12px_rgba(0,255,255,.4)]">
              Faculty Advisor
            </h3>
            <p className="text-base leading-6 text-slate-300">
              Prof. Ayas Kanta Swain <br />
              Assistant Professor, ECE Department
            </p>
            <p className="mt-2 text-sm text-slate-400">
              Phone: 0661-26462458
            </p>
            <a
              href="mailto:swaina@nitrkl.ac.in"
              className="mt-3 inline-flex items-center justify-center rounded-md bg-cyan-900/30 px-3 py-2 text-cyan-200 hover:bg-cyan-800/40 transition"
            >
              ✉️ swaina@nitrkl.ac.in
            </a>
          </div>

          {/* President */}
          <div className="w-full max-w-sm rounded-2xl bg-white/5 p-6 ring-1 ring-white/10 backdrop-blur text-left sm:text-center md:text-left">
            <h3 className="mb-2 text-2xl font-bold text-cyan-200 drop-shadow-[0_0_12px_rgba(0,255,255,.4)]">
              President
            </h3>
            <p className="text-base leading-6 text-slate-300">
              Rudra Nandkishor Anjiwadekar
            </p>
            <p className="mt-2 text-sm text-slate-400">Phone: 9022275481</p>
            <a
              href="mailto:122me0896@nitrkl.ac.in"
              className="mt-3 inline-flex items-center justify-center rounded-md bg-cyan-900/30 px-3 py-2 text-cyan-200 hover:bg-cyan-800/40 transition"
            >
              ✉️ 122me0896@nitrkl.ac.in
            </a>
          </div>
        </div>

        {/* Bottom line */}
        <div className="mt-12 rounded-2xl bg-white/5 p-5 text-center ring-1 ring-white/10 backdrop-blur">
          <p className="text-base font-semibold tracking-wide text-cyan-200 drop-shadow-[0_0_10px_rgba(0,255,255,.4)]">
            Made with ❤️ by Team ML4E
          </p>
          <p className="mt-2 text-xs text-slate-400">© {year}</p>
        </div>
      </div>
    </footer>
  );
}