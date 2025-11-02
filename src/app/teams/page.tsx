"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "../components/Navbar";

/* ================== Types ================== */
interface TeamMember {
  _id?: string;
  name: string;
  role: string;
  imageUrl: string;
  githubLink?: string;
  linkedinLink?: string;
}

interface MenuItem {
  image: string;
  link: string;
  title: string;
  description: string;
}

type IMProps = {
  items: MenuItem[];
  onSelect?: (item: MenuItem, index: number) => void;
};

type InfiniteMenuHandle = {
  next: () => void;
  prev: () => void;
  goToIndex: (i: number) => void;
};

/* ===== Cast lazy import as ForwardRef so `ref` is allowed ===== */
const InfiniteMenu = React.lazy(
  () => import("@/app/components/InfiniteMenu/InfiniteMenu")
) as React.LazyExoticComponent<
  React.ForwardRefExoticComponent<IMProps & React.RefAttributes<InfiniteMenuHandle>>
>;

/* ================== Demo / Fallback ================== */
// const DEMO_TEAM: TeamMember[] = [
//   {
//     name: "Kunal Kushwaha",
//     role: "President",
//     imageUrl: "/team/president.png",
//     githubLink: "https://github.com/",
//     linkedinLink: "https://linkedin.com/",
//   },
//   {
//     name: "Rishi Das",
//     role: "Vice President",
//     imageUrl: "/team/vp.png",
//     githubLink: "https://github.com/",
//     linkedinLink: "https://linkedin.com/",
//   },
//   {
//     name: "Bibhu",
//     role: "Secretary",
//     imageUrl: "/team/secretary.png",
//     githubLink: "https://github.com/",
//     linkedinLink: "https://linkedin.com/",
//   },
//   {
//     name: "Arko Pravo Dey",
//     role: "Treasurer",
//     imageUrl: "/team/treasurer.png",
//     githubLink: "https://github.com/",
//     linkedinLink: "https://linkedin.com/",
//   },
// ];

/* ================== Loading Screen ================== */
function LoadingScreen() {
  return (
    <div className="relative grid min-h-screen place-items-center overflow-hidden bg-[#0b1117] text-slate-200">
      <div className="pointer-events-none absolute inset-0 -z-10 blur-2xl opacity-70 [background:radial-gradient(50%_50%_at_20%_0%,rgba(34,211,238,.16),transparent_60%),radial-gradient(45%_45%_at_85%_15%,rgba(20,184,166,.14),transparent_60%),radial-gradient(40%_40%_at_50%_120%,rgba(56,189,248,.12),transparent_60%)]" />
      <div className="flex flex-col items-center gap-6">
        <div className="relative h-20 w-20">
          <div className="absolute inset-0 animate-[spin_1.2s_linear_infinite] rounded-full border-4 border-cyan-300/30 border-t-cyan-300 shadow-[0_0_24px_rgba(34,211,238,.35)]" />
          <div className="absolute inset-2 grid place-items-center rounded-full bg-black/40 backdrop-blur-xl">
            <Image
              src="/ml4e.svg"
              alt="ML4E"
              width={44}
              height={44}
              priority
              className="opacity-95 drop-shadow-[0_0_12px_rgba(34,211,238,.45)] animate-[pulse_1.8s_ease-in-out_infinite]"
            />
          </div>
        </div>
        <div className="text-center">
          <h2 className="text-xl font-semibold tracking-wide text-cyan-200 drop-shadow-[0_0_16px_rgba(0,255,255,.35)]">
            Loading Team
          </h2>
          <p className="mt-1 text-sm text-slate-400">Fetching the latest roster…</p>
        </div>
      </div>
    </div>
  );
}

/* ================== Page ================== */
export default function TeamPage() {
  const menuRef = useRef<InfiniteMenuHandle | null>(null);

  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [usingFallback, setUsingFallback] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  // Fetch team → fallback to demo on error
  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/team", { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to fetch team members");
        const data = (await res.json()) as TeamMember[];
        if (!alive) return;
        if (Array.isArray(data) && data.length) {
          setTeamMembers(data);
          setUsingFallback(false);
        } else {
          //setTeamMembers(DEMO_TEAM);
          setUsingFallback(true);
        }
      } catch {
        if (!alive) return;
        //setTeamMembers(DEMO_TEAM);
        setUsingFallback(true);
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  // Map -> InfiniteMenu items
  const menuItems: MenuItem[] = useMemo(
    () =>
      teamMembers.map((m) => ({
        image: m.imageUrl ,
        link: m.linkedinLink || m.githubLink || "#",
        title: m.name || "Member",
        description: m.role || "Team Member",
      })),
    [teamMembers]
  );

  const activeItem = menuItems[activeIndex] || menuItems[0];
  const activeMember = teamMembers[activeIndex] || teamMembers[0];
  const len = menuItems.length || 1;

  // Pager controls (optimistic update; onSelect from menu will also set index)
 const goNext = () => {
   menuRef.current?.next?.();
   // index will update via onSelect fired by InfiniteMenu
 };
 const goPrev = () => {
   menuRef.current?.prev?.();
   // index will update via onSelect fired by InfiniteMenu
 };

  if (loading) return <LoadingScreen />;

  return (
    <>
    <Navbar />
    <main className="min-h-screen w-full bg-[#0b1117] text-slate-200">
      {/* Top: Infinite Menu */}
     
      <section className="relative h-[62vh] w-full overflow-hidden">
        <React.Suspense fallback={<LoadingScreen />}>
          <InfiniteMenu
            ref={menuRef}
            items={menuItems}
            onSelect={(_item, i) => setActiveIndex(i)}
          />
        </React.Suspense>

        {/* soft glow */}
        <div className="pointer-events-none absolute inset-0 -z-10 opacity-50 blur-2xl [background:radial-gradient(50%_50%_at_50%_15%,rgba(34,211,238,.18),transparent_60%)]" />
      </section>

      {/* Bottom iOS-style details sheet */}
      <section className="relative -mt-6 flex w-full items-start justify-center px-4 pb-16">
        <div
          className="
            w-full max-w-5xl rounded-3xl border border-white/10
            bg-white/5 px-6 py-6 sm:px-8 sm:py-8
            shadow-[0_10px_40px_rgba(0,0,0,0.35)]
            backdrop-blur-xl
          "
        >
          {/* Header + Pager */}
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-balance text-2xl font-semibold tracking-tight text-slate-100 sm:text-3xl">
              {activeItem?.title}
            </h2>

            <div className="flex items-center gap-2">
              <span className="inline-flex items-center rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-xs font-medium text-cyan-200 shadow-[0_0_20px_rgba(34,211,238,0.25)]">
                Team Member
              </span>
              {usingFallback && (
                <span className="inline-flex items-center rounded-full border border-yellow-300/30 bg-yellow-300/10 px-2.5 py-1 text-[10px] font-medium text-yellow-200">
                  Demo data
                </span>
              )}

              {/* Pager controls */}
              {/* <div className="ml-2 flex items-center gap-2">
                <button
                  type="button"
                  onClick={goPrev}
                  className="inline-flex items-center justify-center rounded-xl bg-white/10 px-3 py-2 text-slate-100 ring-1 ring-white/15 transition hover:bg-white/15 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
                  aria-label="Previous"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" className="opacity-90">
                    <path fill="currentColor" d="M15.41 7.41 14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={goNext}
                  className="inline-flex items-center justify-center rounded-xl bg-cyan-500/20 px-3 py-2 text-cyan-100 ring-1 ring-cyan-400/30 transition hover:bg-cyan-500/25 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                  aria-label="Next"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" className="opacity-90">
                    <path fill="currentColor" d="M8.59 16.59 10 18l6-6-6-6-1.41 1.41L13.17 12z" />
                  </svg>
                </button>
              </div> */}
            </div>
          </div>

          <p className="text-pretty text-base leading-relaxed text-slate-300/90 sm:text-lg">
            {activeItem?.description}
          </p>

          {/* CTAs */}
          <div className="mt-6 flex flex-wrap items-center gap-3">
            {activeMember?.linkedinLink || activeMember?.githubLink ? (
              <>
                {activeMember.linkedinLink && (
                  <Link
                    href={activeMember.linkedinLink}
                    target="_blank"
                    className="inline-flex items-center gap-2 rounded-xl bg-cyan-500/20 px-4 py-2 text-cyan-100 ring-1 ring-cyan-400/30 transition hover:bg-cyan-500/25 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" className="opacity-90">
                      <path fill="currentColor" d="M14 3h7v7h-2V6.41l-9.29 9.3l-1.42-1.42l9.3-9.29H14V3ZM5 5h6v2H7v10h10v-4h2v6H5z" />
                    </svg>
                    LinkedIn
                  </Link>
                )}
                {activeMember.githubLink && (
                  <Link
                    href={activeMember.githubLink}
                    target="_blank"
                    className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-4 py-2 text-slate-100 ring-1 ring-white/15 transition hover:bg-white/15 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
                  >
                    GitHub
                  </Link>
                )}
              </>
            ) : (
              <span className="rounded-md bg-white/5 px-2.5 py-1 text-xs text-slate-300 ring-1 ring-white/10">
                No links available
              </span>
            )}
          </div>

          <hr className="my-6 border-white/10" />

          {/* Avatar preview + meta */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {/* Avatar */}
            <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-white/10 bg-black/40 shadow-inner">
              {activeMember?.imageUrl ? (
                <Image
                  src={activeMember.imageUrl}
                  alt={activeItem?.title || "Member"}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              ) : (
                <div className="grid h-full w-full place-items-center text-slate-400">No image</div>
              )}
            </div>

            {/* Meta copy */}
            <div className="flex flex-col justify-center gap-2 text-sm text-slate-300/90">
              <p>
                Rotate the sphere above to highlight different team members. The details panel updates
                instantly with their role and links.
              </p>
              {/* <p className="text-slate-400">
                Tip: Ensure your{" "}
                <code className="mx-1 rounded bg-black/30 px-1 py-0.5 text-slate-200">InfiniteMenu</code> stores
                <code className="mx-1 rounded bg-black/30 px-1 py-0.5 text-slate-200">onSelect</code> in a ref to
                avoid resets.
              </p> */}
            </div>
          </div>
        </div>
      </section>
    </main>
    </>
  );
}