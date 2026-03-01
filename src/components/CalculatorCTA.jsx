// src/components/CalculatorCTA.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { Calculator, ArrowRight } from "lucide-react";

export default function CalculatorCTA() {
  const navigate = useNavigate();

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
      <div
  className="relative overflow-hidden rounded-3xl shadow-2xl animate-fadeInUp"
  style={{
    background: "linear-gradient(135deg, #0284c7, #4338ca)",
  }}
>
  {/* DARK GLASS OVERLAY */}
  <div className="absolute inset-0 bg-black/40" />

  {/* GLOW */}
  <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-3xl" />

  <div className="relative p-6 sm:p-8 md:p-10 flex flex-col md:flex-row gap-6 md:gap-10 items-start md:items-center justify-between">

          {/* LEFT CONTENT */}
          <div className="max-w-xl">
            <div className="flex items-center gap-2 mb-2">
              <Calculator className="w-5 h-5 text-white" />
              <span className="text-xs uppercase tracking-wider font-semibold text-white/90">
                Shifting Calculator
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-white drop-shadow-[0_3px_10px_rgba(0,0,0,0.6)]">
              Get Exact Shifting Cost <br className="hidden sm:block" />
              in just <span className="text-yellow-300">60 Seconds</span>
            </h3>

            <p className="mt-3 text-sm sm:text-base text-white/90">
              Enter pickup & drop location, floor details and items.
              Get transparent pricing with no hidden charges.
            </p>

            {/* TRUST POINTS */}
            <div className="mt-4 flex flex-wrap gap-3 text-xs sm:text-sm">
              <span className="bg-white/20 text-white px-3 py-1 rounded-full">
                ✓ Instant Quote
              </span>
              <span className="bg-white/20 text-white px-3 py-1 rounded-full">
                ✓ Verified Labour
              </span>
              <span className="bg-white/20 text-white px-3 py-1 rounded-full">
                ✓ No Hidden Cost
              </span>
            </div>
          </div>

          {/* CTA BUTTON */}
          <div className="w-full md:w-auto">
            <button
                onClick={() =>
    navigate("/calculate", {
      state: { scrollTo: "calculate" },
    })
  }
              className="
                w-full md:w-auto
                flex items-center justify-center gap-2
                bg-white text-sky-700
                font-extrabold
                px-6 py-4
                rounded-2xl
                shadow-xl
                hover:scale-[1.04]
                active:scale-95
                transition
                animate-bounceSlow
              "
            >
              Calculate Now
              <ArrowRight className="w-5 h-5" />
            </button>

            <p className="mt-2 text-[11px] text-white/80 text-center md:text-left">
              Takes less than a minute
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
