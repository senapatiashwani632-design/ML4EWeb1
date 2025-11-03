'use client';

import { useEffect, useRef, useState } from 'react';
import TimelineItem from './TimelineItem';
import NeuralBackground from './NeuralBackground';
import Navbar from './Navbar';

interface TimelineData {
  id: number;
  name: string;
  date: string;
  description: string;
  image: string;
}

// Function to parse date string and convert to Date object
const parseDate = (dateString: string): Date => {
  const months: { [key: string]: number } = {
    january: 0, february: 1, march: 2, april: 3, may: 4, june: 5,
    july: 6, august: 7, september: 8, october: 9, november: 10, december: 11
  };
  
  const parts = dateString.toLowerCase().split(' ');
  const month = months[parts[0]];
  const year = parseInt(parts[1]);
  
  return new Date(year, month, 1);
};

export default function Timeline() {
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());
  const itemRefs = useRef<Map<number, HTMLDivElement>>(new Map());
  const [timelineData, settimelineData] = useState<TimelineData[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch events
  useEffect(() => {
    async function fetchEvents() {
      try {
        const response = await fetch('/api/events');
        const data = await response.json();
        settimelineData(data);
        console.log("Fetched events data:", data);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchEvents();
  }, []);

  // Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = Number(entry.target.getAttribute('data-id'));
          if (entry.isIntersecting) {
            setVisibleItems((prev) => new Set(prev).add(id));
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px',
      }
    );

    itemRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      itemRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, [timelineData]); // Re-run when timelineData changes

  // Sort timeline data - this recalculates on every render when timelineData changes
  const sortedTimelineData = [...timelineData].sort((a, b) => {
    const dateA = parseDate(a.date);
    const dateB = parseDate(b.date);
    return dateA.getTime() - dateB.getTime();
  });

  // NOW you can have conditional rendering AFTER all hooks
  if (loading) {
    return (
      <div className="relative min-h-screen py-20 px-4 sm:px-6 lg:px-8 font-[Orbitron]">
        <NeuralBackground />
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400 mb-4"></div>
            <p className="text-cyan-300 text-xl">Loading events...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative py-20 px-4 sm:px-6 lg:px-8 font-[Orbitron]">
      <NeuralBackground />
      <Navbar />
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold  mb-32 text-center tracking-widest relative font-[Orbitron]">
          <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-600 drop-shadow-[0_0_25px_rgba(0,200,255,0.6)]">
            OUR EVENTS
          </span>
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-[3px] bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full" />
        </h1>

        <div className="relative">
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-cyan-500/50 via-cyan-400/30 to-cyan-500/50 shadow-[0_0_20px_rgba(34,211,238,0.3)]" />

          {sortedTimelineData.map((item, index) => (
            <div
              key={index}
              ref={(el) => {
                if (el) itemRefs.current.set(index, el);
              }}
              data-id={index}
            >
              <TimelineItem
                item={item}
                isVisible={visibleItems.has(index)}
                isRight={index % 2 === 0}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}