"use client";
import React, { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

gsap.registerPlugin(ScrollTrigger);

const WhatWeDo = () => {
  const container = useRef<HTMLElement>(null);
  const blackLine = useRef<HTMLDivElement>(null);
  const blackLine2 = useRef<HTMLDivElement>(null);
  const blackLine3 = useRef<HTMLDivElement>(null);
  const lottieRef1 = useRef<HTMLDivElement>(null);
  const lottieRef2 = useRef<HTMLDivElement>(null);
  const lottieRef3 = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Header Animation
      gsap.from("#processhead", {
        scale: 1.5,
        scrollTrigger: {
          trigger: "#processhead",
          scrub: true,
        },
      });

      // Lines Animation - Logic updated to use fromTo for robust animation
      [blackLine, blackLine2, blackLine3].forEach((ref) => {
        if (ref.current) {
          gsap.fromTo(
            ref.current,
            { width: "0%" },
            {
              width: "100%",
              scrollTrigger: {
                trigger: ref.current,
                scrub: true,
                start: "top bottom",
              },
            }
          );
        }
      });

      // Lottie Scale Animation - Logic aligned with user's reference
      [lottieRef1, lottieRef2, lottieRef3].forEach((ref) => {
        if (ref.current) {
          gsap.from(ref.current, {
            scale: 0.8,
            autoAlpha: 0,
            scrollTrigger: {
              trigger: ref.current,
              scrub: true,
              start: "top bottom",
            },
          });
        }
      });

      // Text Slide Animations - Logic aligned with user's reference
      gsap.from("#textLeftFirst", {
        x: -100,
        scrollTrigger: {
          trigger: "#textLeftFirst",
          scrub: true,
          start: "top bottom",
        },
      });

      gsap.from("#textRight", {
        x: 100,
        scrollTrigger: {
          trigger: "#textRight",
          scrub: true,
          start: "top bottom",
        },
      });

      gsap.from("#textLeftSecond", {
        x: -100,
        scrollTrigger: {
          trigger: "#textLeftSecond",
          scrub: true,
          start: "top bottom",
        },
      });
    },
    { scope: container }
  );

  return (
    <section
      ref={container}
      className="w-full min-h-screen py-[180px] max-md:py-[80px] relative flex justify-center items-center flex-col overflow-x-hidden"
    >
      <div className="w-[1200px] max-lg:w-[90%] max-sm:w-[95%] flex flex-col gap-[64px] items-center">
        {/* Heading */}
        <h1
          id="processhead"
          className="
    font-orbitron
    text-[7vw] max-lg:text-[10vw] max-sm:text-[11vw]
    font-black
    leading-[100%]
    text-center
    bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-600
    bg-clip-text text-transparent
    drop-shadow-[0_0_25px_rgba(0,200,255,0.6)]
  "
        >
          WHAT WE DO
        </h1>

        {/* Steps */}
        <div className="flex flex-col gap-[64px]">
          {/* STEP 1 */}
          <div className=" backdrop-blur-lg rounded-sm flex max-md:flex-col-reverse items-center">
            <div className=" w-1/2 max-md:w-full flex flex-col gap-[28px]">
              <div id="textLeftFirst" className="  text-right text-white">
                <h2 className="pr-5 font-orbitron text-[36px] font-bold">Open Source</h2>
                <p className="pr-5 text-[20px] opacity-90">
                  Collaborate globally and build real-world machine learning products with developers and researchers.
                  Work on scalable systems, AI tools, and community-driven innovations used worldwide.
                  Leave your mark on open-source while accelerating your growth as a machine learning engineer.
                </p>
              </div>

              <div className="h-[30px] bg-white rounded-full">
                <div className="h-full flex justify-end">
                  <div
                    ref={blackLine}
                    className="bg-black w-0 h-full rounded-full"
                  ></div>
                </div>
              </div>
            </div>

            <div
              ref={lottieRef1}
              className="w-1/2 max-md:w-full my-24 max-md:my-4"
            >
              <DotLottieReact
                src="https://lottie.host/f1899756-1dc6-496f-a81c-a0104d02d048/UgBJ4PguFT.lottie"
                loop
                autoplay
              />
            </div>
          </div>

          {/* STEP 2 */}
          <div className=" backdrop-blur-lg rounded-sm flex flex-row-reverse max-md:flex-col-reverse items-center">
            <div className="w-1/2 max-md:w-full flex flex-col gap-[28px]">
              <div id="textRight" className="text-left text-white">
                <h2 className="pl-5 font-orbitron text-[36px] font-bold">Hackathons</h2>
                <p className="pl-5 text-[20px] opacity-90">
                  Participate in global hackathons, workshops, and collaborative tech events to sharpen your skills.
                  Build real-world AI solutions, compete with top innovators, and gain hands-on industry experience.
                  Showcase your talent, expand your network, and turn ideas into impactful projects.
                </p>
              </div>

              <div className="h-[30px] bg-white rounded-full">
                <div className="h-full flex justify-start">
                  <div
                    ref={blackLine2}
                    className="bg-black w-0 h-full rounded-full"
                  ></div>
                </div>
              </div>
            </div>

            <div ref={lottieRef2} className="w-1/2 max-md:w-full">
              <DotLottieReact
                src="https://assets10.lottiefiles.com/packages/lf20_tfb3estd.json"
                loop
                autoplay
              />
            </div>
          </div>

          {/* STEP 3 */}
          <div className=" backdrop-blur-lg rounded-sm flex max-md:flex-col-reverse items-center">
            <div className="w-1/2 max-md:w-full flex flex-col gap-[28px]">
              <div id="textLeftSecond" className="text-right text-white">
                <h2 className="pr-5 font-orbitron text-[36px] font-bold">
                  Data Science &  Much More
                </h2>
                <p className="pr-5 text-[20px] opacity-90">
                  Learn AI, data science, deep learning, MLOps, and many more industry-ready technologies.
                  Master modern tools, frameworks, and workflows used by top tech companies.
                  Transform your learning into deployable solutions and job-ready expertise.
                </p>
              </div>

              <div className="h-[30px] bg-white rounded-full">
                <div className="h-full flex justify-end">
                  <div
                    ref={blackLine3}
                    className="bg-black w-0 h-full rounded-full"
                  ></div>
                </div>
              </div>
            </div>

            <div
              ref={lottieRef3}
              className="w-1/2 max-md:w-full my-24 max-md:my-4"
            >
              <DotLottieReact
                src="https://assets5.lottiefiles.com/packages/lf20_w51pcehl.json"
                loop
                autoplay
              />
            </div>
          </div>
        </div>

        {/* Button */}
        <button
          onClick={() => {
            if (typeof window !== "undefined") {
              window.dispatchEvent(new Event("open-navigation"));
            }
          }}
          className="mt-12 rounded-full bg-white px-10 py-4 text-[20px] font-orbitron font-bold text-black border-2 border-white hover:bg-transparent hover:text-white transition-all duration-300 cursor-pointer"
        >
          LEARN MORE
        </button>
      </div>
    </section>
  );
};

export default WhatWeDo;
