'use client';

import { useState } from 'react';

interface TimelineItemProps {
  item: {
    id: number;
    name: string;
    date: string;
    description: string;
    image: string;
  };
  isVisible: boolean;
  isRight: boolean;
}

export default function TimelineItem({ item, isVisible, isRight }: TimelineItemProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
  };

  const shouldShowButton = item.description.length > 40;

  return (
    <>
      <div className="relative mb-32 md:mb-48">
        {/* Desktop Layout */}
        <div className="hidden md:block">
          <div className="flex items-center justify-center relative min-h-[450px]">
            {/* Content Card - With higher z-index to overlap image */}
            <div
              className={`absolute ${
                isRight ? 'left-0' : 'right-0'
              } w-[40%] top-1/2 -translate-y-1/2 ${
                isRight ? 'pr-8 text-right' : 'pl-8'
              } z-30`} 
            >
              <div
                className={`transform transition-all duration-1000 ${
                  isVisible
                    ? 'translate-x-0 opacity-100'
                    : isRight
                    ? 'translate-x-20 opacity-0'
                    : '-translate-x-20 opacity-0'
                }`}
              >
                <div className="bg-gradient-to-br from-slate-800/90 to-blue-950/90 backdrop-blur-md rounded-2xl p-8 border border-cyan-500/50 shadow-[0_0_50px_rgba(34,211,238,0.3)] hover:shadow-[0_0_70px_rgba(34,211,238,0.5)] transition-all duration-500 hover:scale-[1.02]">
                  <h3 className="text-2xl md:text-3xl font-bold mb-3 bg-gradient-to-r from-cyan-300 to-cyan-400 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(34,211,238,0.8)]">
                    {item.name}
                  </h3>
                  <div className="text-cyan-300 text-sm md:text-base font-semibold mb-4 drop-shadow-[0_0_15px_rgba(34,211,238,0.6)]">
                    {item.date}
                  </div>
                  <p className="text-cyan-200 text-sm md:text-base leading-relaxed drop-shadow-[0_0_10px_rgba(34,211,238,0.4)]">
                    {shouldShowButton ? truncateText(item.description, 40) : item.description}
                  </p>
                  {shouldShowButton && (
                    <button
                      onClick={() => setIsModalOpen(true)}
                      className={`mt-4 px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-lg hover:from-cyan-400 hover:to-blue-400 transition-all duration-300 shadow-[0_0_20px_rgba(34,211,238,0.5)] hover:shadow-[0_0_30px_rgba(34,211,238,0.7)] ${
                        isRight ? 'ml-auto' : 'mr-auto'
                      }`}
                    >
                      View More
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Center Image - Lower z-index */}
            <div className="relative z-20"> {/* Lower z-index than cards */}
              <div
                className={`transform transition-all duration-1000 delay-200 ${
                  isVisible ? 'scale-100 opacity-100' : 'scale-50 opacity-0'
                }`}
              >
                <div className="relative w-[450px] h-[450px]">
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full blur-3xl opacity-60 animate-pulse" />
                  <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-cyan-400/60 shadow-[0_0_60px_rgba(34,211,238,0.8)]">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500 via-transparent to-cyan-500 rounded-full opacity-40 blur-xl" />
                </div>
              </div>

              {/* Timeline Dot - Higher z-index to stay on top */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-cyan-400 rounded-full shadow-[0_0_20px_rgba(34,211,238,0.8)] animate-pulse z-40" />
            </div>
          </div>
        </div>

        {/* Mobile Layout - Cards already properly positioned */}
        <div className="md:hidden">
          <div
            className={`transform transition-all duration-1000 delay-200 ${
              isVisible ? 'scale-100 opacity-100' : 'scale-50 opacity-0'
            }`}
          >
            <div className="relative w-64 h-64 mx-auto mb-8">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full blur-2xl opacity-60 animate-pulse" />
              <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-cyan-400/60 shadow-[0_0_50px_rgba(34,211,238,0.7)]">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-slate-800/90 to-blue-950/90 backdrop-blur-md rounded-2xl p-8 border border-cyan-500/50 shadow-[0_0_50px_rgba(34,211,238,0.3)]">
            <h3 className="text-2xl font-bold mb-3 bg-gradient-to-r from-cyan-300 to-cyan-400 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(34,211,238,0.8)]">
              {item.name}
            </h3>
            <div className="text-cyan-300 text-sm font-semibold mb-4 drop-shadow-[0_0_15px_rgba(34,211,238,0.6)]">
              {item.date}
            </div>
            <p className="text-cyan-200 text-sm leading-relaxed drop-shadow-[0_0_10px_rgba(34,211,238,0.4)]">
              {shouldShowButton ? truncateText(item.description, 150) : item.description}
            </p>
            {shouldShowButton && (
              <button
                onClick={() => setIsModalOpen(true)}
                className="mt-4 px-5 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-sm font-semibold rounded-lg hover:from-cyan-400 hover:to-blue-400 transition-all duration-300 shadow-[0_0_20px_rgba(34,211,238,0.5)]"
              >
                View More
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setIsModalOpen(false)}
        >
          <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-lg" />
          
          <div
            className="relative max-w-3xl w-full bg-gradient-to-br from-slate-800/95 to-blue-950/95 backdrop-blur-xl rounded-3xl p-8 md:p-12 border-2 border-cyan-500/50 shadow-[0_0_80px_rgba(34,211,238,0.4)] transform transition-all duration-300 animate-scaleIn"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center bg-cyan-500/20 hover:bg-cyan-500/40 rounded-full transition-all duration-300 group"
            >
              <svg
                className="w-6 h-6 text-cyan-300 group-hover:text-cyan-100"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-1/3 flex-shrink-0">
                <div className="relative w-full aspect-square">
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl blur-xl opacity-60" />
                  <div className="relative w-full h-full rounded-2xl overflow-hidden border-2 border-cyan-400/60 shadow-[0_0_40px_rgba(34,211,238,0.6)]">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto max-h-[60vh]">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-cyan-300 to-cyan-400 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(34,211,238,0.8)]">
                  {item.name}
                </h2>
                <div className="text-cyan-300 text-lg font-semibold mb-6 drop-shadow-[0_0_15px_rgba(34,211,238,0.6)]">
                  {item.date}
                </div>
                <p className="text-cyan-200 text-base md:text-lg leading-relaxed drop-shadow-[0_0_10px_rgba(34,211,238,0.4)]">
                  {item.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes scaleIn {
          from {
            transform: scale(0.9);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }

        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out;
        }
      `}</style>
    </>
  );
}