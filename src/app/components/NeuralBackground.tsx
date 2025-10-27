'use client';

import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { ISourceOptions } from "@tsparticles/engine";

const NeuralBackground: React.FC = () => {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particleOptions: ISourceOptions = useMemo(
    () => ({
      background: {
        color: {
          value: "transparent",
        },
      },
      fpsLimit: 60,
      interactivity: {
        events: {
          onHover: { 
            enable: true,
            mode: "repulse", 
          },
        },
        modes: {
          repulse: {
            distance: 100,
            duration: 0.4,
          },
        },
      },
      particles: {
        color: {
          value: "#0EA5E9", 
        },
        links: {
          color: "#ffffff", 
          distance: 150,    
          enable: true,    
          opacity: 0.2,     
          width: 1,
        },
        move: {
          direction: "none",
          enable: true,
          outModes: "out",
          random: true,
          speed: 0.01, 
          straight: false,
        },
        number: {
          density: {
            enable: true,
          },
          value: 120, 
        },
        opacity: {
          value: 0.3, 
        },
        shape: {
          type: "circle",
        },
        size: {
          value: { min: 1, max: 3 }, 
        },
      },
      detectRetina: true,
    }),
    [],
  );

  if (init) {
    return (
      <Particles
        id="tsparticles"
        options={particleOptions}
        className="absolute inset-0 z-0 pointer-events-none"
      />
    );
  }

  return null;
};

export default NeuralBackground;