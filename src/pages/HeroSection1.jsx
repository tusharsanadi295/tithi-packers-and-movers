import React, { useEffect, useState } from "react";
import imageUrl from "../assets/Gemini_Generated_Image_6u6fvp6u6fvp6u6f.png";

export default function HeroSection({ headerHeight = 0 }) {
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < 768 : false
  );

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <section
      className="relative w-full"
      style={{ paddingTop: isMobile ? 0 : headerHeight }}
    >
      {/* HERO WRAPPER */}
      <div
        className={`
          relative w-full overflow-hidden
          ${isMobile ? "aspect-video" : "h-[80vh] lg:h-[85vh]"}
        `}
      >
        {/* IMAGE */}
        <img
          src={imageUrl}
          alt="Tithi Packers & Movers"
          className={`
            absolute inset-0 w-full h-full object-cover
            ${isMobile ? "object-right scale-110" : "object-center"}
          `}
          loading="lazy"
        />

        {/* STRONG LEFT GRADIENT */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-transparent" />

        {/* CONTENT */}
        <div className="relative z-10 h-full max-w-7xl mx-auto px-4 flex items-center">
          <div
            className="
              max-w-xs sm:max-w-md
              animate-heroText
            "
          >
            <h1
              className={`
                font-extrabold text-white leading-tight
                ${isMobile ? "text-xl" : "text-5xl lg:text-6xl"}
              `}
              style={{
                textShadow: "0 6px 18px rgba(0,0,0,0.8)",
              }}
            >
              Packing Se Unpacking Tak,
              <br />
              <span className="text-blue-200">
                Tithi Hai Sabse Alag!
              </span>
            </h1>

            <p
              className={`
                mt-2 text-white/90
                ${isMobile ? "text-xs" : "text-lg"}
              `}
            >
              Safe & professional packers across Surat.
            </p>
          </div>
        </div>

        {/* DESKTOP BRAND TAG */}
        {!isMobile && (
          <div className="absolute right-6 bottom-6 text-white/90 font-semibold">
            Tithi Packers & Movers
          </div>
        )}
      </div>

      {/* ANIMATION STYLES */}
      <style>
        {`
          @keyframes heroText {
            from {
              opacity: 0;
              transform: translateY(12px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .animate-heroText {
            animation: heroText 0.9s ease-out both;
          }
        `}
      </style>
    </section>
  );
}

