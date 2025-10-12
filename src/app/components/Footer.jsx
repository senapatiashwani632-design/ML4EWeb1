// src/components/Footer.jsx
"use client"
import React from "react";

const Glow = ({ className = "" }) => (
  <div
    className={`pointer-events-none absolute inset-0 opacity-60 blur-2xl 
                [background:radial-gradient(60%_60%_at_20%_0%,rgba(0,255,255,.15),transparent_60%),radial-gradient(50%_50%_at_90%_20%,rgba(0,255,200,.12),transparent_60%),radial-gradient(40%_40%_at_50%_120%,rgba(0,200,255,.1),transparent_60%)] ${className}`}
  />
);

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-24 w-full overflow-hidden border-t border-cyan-500/20 bg-[#0b1117] text-slate-200">
      <Glow />

      {/* Container */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 relative">
        {/* Sponsors */}
        <h2 className="mb-8 text-3xl font-extrabold tracking-wide text-cyan-200 drop-shadow-[0_0_18px_rgba(0,255,255,.45)]">
          Our Proud Sponsors
        </h2>

        <div className="mb-14 flex flex-wrap items-center gap-10 rounded-2xl bg-white/5 p-6 ring-1 ring-white/10 backdrop-blur">
          {/* Replace src paths with your real logo files in /src/assets */}
          <img
            src="/src/assets/solidworks.svg"
            alt="SOLIDWORKS"
            className="h-10 w-auto brightness-200 contrast-125 drop-shadow-[0_0_12px_rgba(0,255,255,.35)]"
            onError={(e) => (e.currentTarget.style.display = "none")}
          />
          <img
            src="/src/assets/ansys.svg"
            alt="ANSYS"
            className="h-10 w-auto brightness-200 contrast-125 drop-shadow-[0_0_12px_rgba(0,255,255,.35)]"
            onError={(e) => (e.currentTarget.style.display = "none")}
          />
        </div>

        {/* Contact cards */}
        <div className="grid gap-8 md:grid-cols-3">
          {/* ML4E block */}
          <div className="rounded-2xl bg-white/5 p-6 ring-1 ring-white/10 backdrop-blur">
            <h3 className="mb-3 text-2xl font-bold text-cyan-200 drop-shadow-[0_0_12px_rgba(0,255,255,.4)]">
              Cyborg
            </h3>
            <p className="text-sm leading-6 text-slate-300">
              Club under Technical Society,
              <br />
              SAC NIT Rourkela EC 440 building,
              <br />
              NIT Rourkela, Pin-769008
            </p>

            <div className="mt-4 text-sm">
              <a
                href="mailto:cyborg.team.nitr@gmail.com"
                className="inline-flex items-center gap-2 rounded-lg bg-cyan-400/10 px-3 py-1.5 font-medium text-cyan-200 ring-1 ring-cyan-400/30 hover:bg-cyan-400/20"
              >
                {/* mail icon */}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M4 6h16v12H4z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    fill="none"
                  />
                  <path
                    d="m4 6 8 6 8-6"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    fill="none"
                  />
                </svg>
                cyborg.team.nitr@gmail.com
              </a>
            </div>
          </div>

          {/* Faculty Advisor */}
          <div className="rounded-2xl bg-white/5 p-6 ring-1 ring-white/10 backdrop-blur">
            <h3 className="mb-3 text-2xl font-bold text-cyan-200 drop-shadow-[0_0_12px_rgba(0,255,255,.4)]">
              Faculty Advisor
            </h3>
            <p className="text-sm leading-6 text-slate-300">
              Prof. Ayas Kanta Swain,
              <br />
              Assistant Professor, ECE department
            </p>
            <p className="mt-3 text-sm text-slate-300">
              Phone:{" "}
              <a className="text-cyan-200 hover:underline" href="tel:066126462458">
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
              <a className="text-cyan-200 hover:underline" href="tel:9022275481">
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

        {/* Tagline */}
        <div className="mt-12 rounded-2xl bg-white/5 p-5 text-center ring-1 ring-white/10 backdrop-blur">
          <p className="text-base font-semibold tracking-wide text-cyan-200 drop-shadow-[0_0_10px_rgba(0,255,255,.4)]">
            From our circuits to your screen, with ❤️ — Cyborg NITR
          </p>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 sm:flex-row">
          <p className="text-sm text-slate-400">
            Copyright © {year} Cyborg NITR · National Institute of Technology,
            Rourkela
          </p>

          <div className="flex items-center gap-4">
            {/* Instagram */}
            <a
              href="https://instagram.com"
              className="group inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/5 ring-1 ring-white/10 hover:bg-cyan-400/10 hover:text-cyan-200"
              aria-label="Instagram"
              target="_blank"
              rel="noreferrer"
            >
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7zm5 3a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 2.2A2.8 2.8 0 1 0 12 16.8 2.8 2.8 0 0 0 12 9.2zm5.8-2.1a1.1 1.1 0 1 1-2.2 0 1.1 1.1 0 0 1 2.2 0z" />
              </svg>
            </a>
            {/* GitHub */}
            <a
              href="https://github.com"
              className="group inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/5 ring-1 ring-white/10 hover:bg-cyan-400/10 hover:text-cyan-200"
              aria-label="GitHub"
              target="_blank"
              rel="noreferrer"
            >
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                <path d="M12 .5a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2.2c-3.3.7-4-1.6-4-1.6-.6-1.5-1.3-1.9-1.3-1.9-1-0.7.1-0.7.1-0.7 1.1.1 1.7 1.1 1.7 1.1 1 1.7 2.7 1.2 3.4.9.1-.7.4-1.2.7-1.4-2.7-.3-5.5-1.4-5.5-6a4.7 4.7 0 0 1 1.3-3.2 4.4 4.4 0 0 1 .1-3.1s1-.3 3.3 1.2a11.3 11.3 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2a4.4 4.4 0 0 1 .1 3.1 4.7 4.7 0 0 1 1.3 3.2c0 4.6-2.8 5.7-5.5 6 .4.3.8 1 .8 2.2v3.2c0 .3.2.7.8.6A12 12 0 0 0 12 .5z" />
              </svg>
            </a>
            {/* LinkedIn */}
            <a
              href="https://linkedin.com"
              className="group inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/5 ring-1 ring-white/10 hover:bg-cyan-400/10 hover:text-cyan-200"
              aria-label="LinkedIn"
              target="_blank"
              rel="noreferrer"
            >
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                <path d="M4.98 3.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM3 8.98h3.96V21H3V8.98zM9.5 8.98H13v1.65h.05c.49-.93 1.7-1.9 3.5-1.9 3.74 0 4.43 2.46 4.43 5.66V21H17V15.4c0-1.34-.02-3.07-1.87-3.07-1.88 0-2.17 1.47-2.17 2.98V21H9.5V8.98z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}