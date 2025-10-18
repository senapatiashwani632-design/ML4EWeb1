// src/app/components/Footer.jsx
"use client";
import React from "react";

/**
 * Optional global fix:
 * Add this to globals.css (or your layout)
 * :root { --sidebar-width: 100px; }  // adjust to match sidebar width
 */

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
        bg-[#0b1117] text-slate-200 isolate
      "
      style={{
        // Default fallback: 105px sidebar width
        paddingLeft: "var(--sidebar-width, 105px)",
      }}
    >
      <Glow />

      {/* Container */}
      <div className="relative mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-10">
        {/* Title */}
        <h2 className="mb-8 text-3xl font-extrabold tracking-wide text-cyan-200 drop-shadow-[0_0_18px_rgba(0,255,255,.45)]">
          ML4E
        </h2>

        {/* Cards */}
        <div className="grid gap-8 md:grid-cols-2">
          {/* Faculty Advisor */}
          <div className="rounded-2xl bg-white/5 p-6 ring-1 ring-white/10 backdrop-blur">
            <h3 className="mb-3 text-2xl font-bold text-cyan-200 drop-shadow-[0_0_12px_rgba(0,255,255,.4)]">
              Faculty Advisor
            </h3>
            <p className="text-sm leading-6 text-slate-300">
              Prof. Ayas Kanta Swain
              <br />
              Assistant Professor, ECE Department
            </p>

            <p className="mt-3 text-sm text-slate-300">
              Phone:{" "}
              <a
                className="text-cyan-200 hover:underline"
                href="tel:066126462458"
              >
                0661-26462458
              </a>
            </p>

            <div className="mt-3 flex flex-wrap gap-2 text-sm">
              <a
                href="mailto:swaina@nitrkl.ac.in"
                className="inline-flex items-center gap-2 rounded-lg bg-cyan-400/10 px-3 py-1.5 font-medium text-cyan-200 ring-1 ring-cyan-400/30 hover:bg-cyan-400/20"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M4 6h16v12H4z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                  <path
                    d="m4 6 8 6 8-6"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                </svg>
                swaina@nitrkl.ac.in
              </a>
            </div>
          </div>

          {/* President */}
          <div className="rounded-2xl bg-white/5 p-6 ring-1 ring-white/10 backdrop-blur">
            <h3 className="mb-3 text-2xl font-bold text-cyan-200 drop-shadow-[0_0_12px_rgba(0,255,255,.4)]">
              President
            </h3>
            <p className="text-sm leading-6 text-slate-300">
              Rudra Nandkishor Anjiwadekar
            </p>

            <p className="mt-3 text-sm text-slate-300">
              Phone:{" "}
              <a
                className="text-cyan-200 hover:underline"
                href="tel:9022275481"
              >
                9022275481
              </a>
            </p>

            <div className="mt-3 flex flex-wrap gap-2 text-sm">
              <a
                href="mailto:122me0896@nitrkl.ac.in"
                className="inline-flex items-center gap-2 rounded-lg bg-cyan-400/10 px-3 py-1.5 font-medium text-cyan-200 ring-1 ring-cyan-400/30 hover:bg-cyan-400/20"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M4 6h16v12H4z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                  <path
                    d="m4 6 8 6 8-6"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                </svg>
                122me0896@nitrkl.ac.in
              </a>
            </div>
          </div>
        </div>

        {/* Bottom line */}
        <div className="mt-12 rounded-2xl bg-white/5 p-5 text-center ring-1 ring-white/10 backdrop-blur">
          <p className="text-base font-semibold tracking-wide text-cyan-200 drop-shadow-[0_0_10px_rgba(0,255,255,.4)]">
            Made with ❤ by Team ML4E
          </p>
          <p className="mt-2 text-xs text-slate-400">© {year}</p>
        </div>
      </div>
    </footer>
  );
}