import React from "react";

export default function TithiNameLoader() {
  const brandName = "TITHI PACKERS AND MOVERS";

  return (
    <div className="fixed inset-0 bg-white flex flex-col items-center justify-center overflow-hidden p-4">
      <div className="relative w-full max-w-5xl mx-auto">
        {/* Main Text Container */}
        <h1 className="flex flex-wrap justify-center items-baseline gap-x-3 md:gap-x-5 text-4xl md:text-7xl font-[1000] tracking-tighter uppercase">
          {brandName.split(" ").map((word, wordIdx) => (
            <span key={wordIdx} className="inline-flex overflow-hidden pb-2 whitespace-nowrap">
              {word.split("").map((char, charIdx) => {
                // Logic: TITHI & PACKERS = Black | AND & MOVERS = Sky Blue
                const isSkyBlue = word === "AND" || word === "MOVERS";
                
                return (
                  <span
                    key={charIdx}
                    className="inline-block animate-reveal-letter"
                    style={{ 
                      animationDelay: `${(wordIdx * 4 + charIdx) * 0.04}s`,
                      color: isSkyBlue ? "#0ea5e9" : "#1e293b" // sky-500 vs slate-800
                    }}
                  >
                    {char}
                  </span>
                );
              })}
            </span>
          ))}
        </h1>

        {/* High-End Decorative Sky Blue Line */}
        <div className="relative mt-4 h-[3px] w-full max-w-2xl mx-auto bg-slate-100 rounded-full overflow-hidden">
          <div className="absolute inset-0 bg-sky-500 animate-loading-slide"></div>
          <div className="absolute inset-0 shadow-[0_0_15px_rgba(14,165,233,0.5)]"></div>
        </div>

        {/* Dynamic Sub-text */}
        <div className="mt-8 flex items-center justify-center gap-4 opacity-0 animate-fade-in-slow">
          <span className="h-[1px] w-6 md:w-12 bg-sky-200"></span>
          <p className="text-[9px] md:text-xs font-bold text-slate-400 uppercase tracking-[0.4em] md:tracking-[0.6em] text-center">
            Reliable • Trusted • Fast
          </p>
          <span className="h-[1px] w-6 md:w-12 bg-sky-200"></span>
        </div>
      </div>

      <style>{`
        @keyframes reveal-letter {
          0% { 
            transform: translateY(110%) rotateX(-90deg); 
            opacity: 0; 
          }
          100% { 
            transform: translateY(0) rotateX(0deg); 
            opacity: 1; 
          }
        }

        @keyframes loading-slide {
          0% { left: -100%; width: 30%; }
          50% { width: 40%; }
          100% { left: 100%; width: 30%; }
        }

        @keyframes fade-in-slow {
          0% { opacity: 0; transform: translateY(10px); }
          100% { opacity: 1; transform: translateY(0); }
        }

        .animate-reveal-letter {
          display: inline-block;
          perspective: 1000px;
          animation: reveal-letter 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
          opacity: 0;
          backface-visibility: hidden;
        }

        .animate-loading-slide {
          animation: loading-slide 2s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }

        .animate-fade-in-slow {
          animation: fade-in-slow 1s ease-out forwards;
          animation-delay: 1.4s;
        }
      `}</style>
    </div>
  );
}