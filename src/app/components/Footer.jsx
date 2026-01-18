"use client";
import React from "react";
import { Linkedin, Instagram, Mail, Phone, MapPin } from "lucide-react";

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
      id="contact"
      className="relative z-30 w-full overflow-hidden bg-[#0b1117] text-slate-200 border-t border-cyan-500/20 font-sans"
    >
      <Glow />

      <div className="relative w-full max-w-7xl mx-auto px-4 py-16 sm:px-8 flex flex-col items-center">
        <h2 className="mb-12 text-4xl md:text-6xl font-extrabold tracking-widest font-[Orbitron] text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.5)]">
          ML4E
        </h2>

        <div className="grid gap-6 md:gap-8 md:grid-cols-2 w-full max-w-4xl mb-16">
          <div className="group relative w-full h-full p-1 rounded-2xl bg-gradient-to-b from-white/10 to-white/5 hover:from-cyan-500/50 hover:to-blue-600/50 transition-all duration-500">
            <div className="relative h-full flex flex-col items-start p-8 rounded-xl bg-[#0b1117]/90 backdrop-blur-xl border border-white/10 group-hover:border-cyan-500/30 transition-all duration-300">
              <div className="absolute inset-0 bg-cyan-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <h3 className="relative z-10 mb-4 text-2xl font-bold text-cyan-200 font-[Orbitron] tracking-wide group-hover:text-cyan-100 transition-colors">
                Faculty Advisor
              </h3>

              <div className="relative z-10 space-y-3 flex-grow text-left">
                <div>
                  <p className="text-lg font-semibold text-slate-100">
                    Prof. Khalid Mirza
                  </p>
                  <p className="text-sm text-cyan-400/80 font-medium">
                    Assistant Professor, BM-BT Department
                  </p>
                </div>
                <div className="flex items-center gap-2 text-slate-400 text-sm group-hover:text-slate-300 transition-colors">
                  <Phone size={14} /> <span>0661-26462458</span>
                </div>
              </div>

              <a
                href="mailto:baigm@nitrkl.ac.in"
                className="relative z-10 mt-6 w-full flex items-center justify-center gap-2 rounded-lg bg-cyan-950/50 border border-cyan-500/20 px-4 py-3 text-sm text-cyan-300 hover:bg-cyan-500/20 hover:border-cyan-400/50 hover:text-white hover:shadow-[0_0_15px_rgba(34,211,238,0.2)] transition-all duration-300"
              >
                <Mail size={16} /> baigm@nitrkl.ac.in
              </a>
            </div>
          </div>

          <div className="group relative w-full h-full p-1 rounded-2xl bg-gradient-to-b from-white/10 to-white/5 hover:from-purple-500/50 hover:to-pink-600/50 transition-all duration-500">
            <div className="relative h-full flex flex-col items-start p-8 rounded-xl bg-[#0b1117]/90 backdrop-blur-xl border border-white/10 group-hover:border-purple-500/30 transition-all duration-300">
              <div className="absolute inset-0 bg-purple-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <h3 className="relative z-10 mb-4 text-2xl font-bold text-purple-200 font-[Orbitron] tracking-wide group-hover:text-purple-100 transition-colors">
                President
              </h3>

              <div className="relative z-10 space-y-3 flex-grow text-left">
                <div>
                  <p className="text-lg font-semibold text-slate-100">
                    Kunal Kushwaha
                  </p>
                  <p className="text-sm text-purple-400/80 font-medium">
                    Club President
                  </p>
                </div>
                <div className="flex items-center gap-2 text-slate-400 text-sm group-hover:text-slate-300 transition-colors">
                  <Phone size={14} /> <span>+91 70676 21946</span>
                </div>
              </div>

              <a
                href="mailto:123ee0291@nitrkl.ac.in"
                className="relative z-10 mt-6 w-full flex items-center justify-center gap-2 rounded-lg bg-purple-950/30 border border-purple-500/20 px-4 py-3 text-sm text-purple-300 hover:bg-purple-500/20 hover:border-purple-400/50 hover:text-white hover:shadow-[0_0_15px_rgba(168,85,247,0.2)] transition-all duration-300"
              >
                <Mail size={16} /> 123ee0291@nitrkl.ac.in
              </a>
            </div>
          </div>
        </div>

        {/* MAP SECTION */}
        <div className="w-full max-w-5xl mb-16">
          <div className="group relative w-full p-1 rounded-2xl bg-gradient-to-b from-white/10 to-white/5 hover:from-cyan-500/50 hover:to-purple-600/50 transition-all duration-500">
            <div className="relative rounded-xl bg-[#0b1117]/90 backdrop-blur-xl border border-white/10 group-hover:border-cyan-500/30 transition-all duration-300 overflow-hidden">
              <div className="absolute inset-0 bg-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 p-6 md:p-10 items-center">
                {/* Left Text */}
                <div className="text-left">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="p-2 rounded-lg bg-white/5 border border-white/10 group-hover:border-cyan-400/40 transition-all duration-300">
                      <MapPin className="w-5 h-5 text-cyan-300 group-hover:text-cyan-200 transition-colors" />
                    </div>
                    <h3 className="text-2xl md:text-3xl font-extrabold font-[Orbitron] tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-300 to-purple-300 drop-shadow-[0_0_12px_rgba(34,211,238,0.25)]">
                      Our Location
                    </h3>
                  </div>

                  <p className="text-sm md:text-base text-slate-300 leading-relaxed">
                    We are based at{" "}
                    <span className="text-cyan-200 font-semibold">
                      National Institute of Technology, Rourkela
                    </span>
                    . Visit us anytime for workshops, events, and ML sessions.
                  </p>

                  <div className="mt-6 flex flex-wrap gap-3">
                    <a
                      href="https://www.google.com/maps/place/National+Institute+of+Technology,+Rourkela"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center rounded-lg bg-cyan-950/50 border border-cyan-500/20 px-4 py-3 text-sm text-cyan-300 hover:bg-cyan-500/20 hover:border-cyan-400/50 hover:text-white hover:shadow-[0_0_15px_rgba(34,211,238,0.2)] transition-all duration-300"
                    >
                      Open in Google Maps
                    </a>

                    <div className="inline-flex items-center justify-center rounded-lg bg-white/5 border border-white/10 px-4 py-3 text-sm text-slate-400 group-hover:text-slate-300 transition-colors">
                      NIT Rourkela, Odisha
                    </div>
                  </div>
                </div>

                {/* Right Map */}
                <div className="w-full">
                  <div className="relative rounded-2xl overflow-hidden border border-white/10 group-hover:border-cyan-400/30 transition-all duration-300 shadow-[0_0_25px_rgba(34,211,238,0.08)]">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3692.6580075931847!2d84.89836787529116!3d22.253050979720562!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a201f72bbd561c3%3A0xab5c70e76a7b5a!2sNational%20Institute%20of%20Technology%2C%20Rourkela!5e0!3m2!1sen!2sin!4v1768758104936!5m2!1sen!2sin"
                      className="w-full h-[260px] md:h-[320px] rounded-2xl"
                      style={{ border: 0 }}
                      allowFullScreen=""
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="NIT Rourkela Location"
                    ></iframe>
                  </div>

                  <p className="mt-3 text-xs text-slate-500 text-center font-[Orbitron] tracking-wider">
                    ML4E • NIT Rourkela Campus Map
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full max-w-4xl flex items-center gap-4 mb-8">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent"></div>
          <span className="text-xs font-[Orbitron] tracking-[0.2em] text-cyan-500/60 uppercase">
            Connect With Us
          </span>
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent"></div>
        </div>

        <div className="flex gap-8 mb-12">
          <a
            href="https://www.linkedin.com/company/machine-learning-for-everyone-ml4e/?originalSubdomain=in"
            target="_blank"
            rel="noreferrer"
            className="group relative p-4"
          >
            <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative bg-white/5 border border-white/10 p-3 rounded-full group-hover:border-blue-400/50 group-hover:scale-110 transition-all duration-300">
              <Linkedin className="w-6 h-6 text-slate-400 group-hover:text-blue-400 transition-colors" />
            </div>
          </a>

          <a
            href="https://www.instagram.com/ml4e_nitr/"
            target="_blank"
            rel="noreferrer"
            className="group relative p-4"
          >
            <div className="absolute inset-0 bg-pink-500/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative bg-white/5 border border-white/10 p-3 rounded-full group-hover:border-pink-400/50 group-hover:scale-110 transition-all duration-300">
              <Instagram className="w-6 h-6 text-slate-400 group-hover:text-pink-400 transition-colors" />
            </div>
          </a>
        </div>

        <div className="w-full max-w-2xl text-center border-t border-white/5 pt-8">
          <p className="text-base font-medium text-slate-300 mb-2">
            Made with{" "}
            <span className="inline-block animate-pulse text-red-500">❤️</span>{" "}
            by Team ML4E
          </p>
          <p className="text-xs text-slate-600 font-[Orbitron] tracking-wider">
            © {year} ALL RIGHTS RESERVED
          </p>
        </div>
      </div>
    </footer>
  );
}
