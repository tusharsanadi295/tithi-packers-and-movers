import React from "react";
import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import { ArrowRight, Zap, ShieldCheck } from "lucide-react";

// Lottie JSON imports
import packersLottie from "../animations/truck.json";
import truckLottie from "../animations/outstation1.json";
import acLottie from "../animations/packing.json";
import panIndiaLottie from "../animations/loading.json";

export default function PromosSection() {
  const navigate = useNavigate();

  const services = [
    { animation: packersLottie, title: "Between City Moving", desc: "Local Shifting", cta: "Estimate", popular: true, path: "/calculate", bg: "bg-sky-50" },
    { animation: truckLottie, title: "OutStation Moving", desc: "InterCity Shifting", cta: "Book Now", path: "/calculate", bg: "bg-blue-50" },
    { animation: acLottie, title: "Packing Only", desc: "Packing/Unpacking", cta: "Book Now", path: "/calculate", bg: "bg-slate-50" },
    { animation: panIndiaLottie, title: "Loading/Unloading", desc: "State to state", cta: "Book Now", path: "/calculate", bg: "bg-sky-50" },
  ];

  return (
    <section className="w-full bg-[#f8fafc] py-10 md:py-20 px-2 md:px-4">
      <div className="max-w-6xl mx-auto">
        
        {/* --- Header Section --- */}
        <div className="flex flex-col items-center text-center mb-8 md:mb-12">
          <div className="flex items-center gap-2 bg-white shadow-sm border border-sky-100 px-3 py-1 rounded-full mb-3">
            <Zap size={12} className="text-sky-500 fill-sky-500" />
            <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest">Premium Moving</span>
          </div>
          
           <div className="text-center mb-10">
          <span className="text-[10px] font-bold uppercase tracking-[0.1em] text-slate-500">Instant Quotes · Pan India</span>
      <h2 className="text-3xl md:text-5xl font-[900] text-slate-900 tracking-tight leading-tight">
        We Provide Speciallized<br className="hidden md:block" />
        <span className="text-sky-600 italic">services</span>
      </h2>
      <p className="mt-4 text-slate-500 text-sm md:text-lg max-w-2xl mx-auto font-medium">
        Complete 3 simple steps to get an accurate price from our verified shifting calculator.
      </p>
        </div>
        </div>

        {/* --- Services Grid --- */}
       <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 md:gap-6">
  {services.map((s, i) => (
    <div
      key={i}
      onClick={() => navigate(s.path)}
      className="group relative bg-white border border-slate-200/50 rounded-3xl md:rounded-[2.5rem] p-3.5 md:p-8 flex flex-col items-center transition-all active:scale-[0.96] duration-300 hover:border-sky-300 hover:shadow-[0_20px_40px_rgba(0,0,0,0.05)] cursor-pointer overflow-hidden"
    >
      {/* Popular Tag - Clean Typography */}
      {s.popular && (
        <div className="absolute top-0 right-0 bg-sky-500 text-white text-[7px] md:text-[10px] font-bold px-3 py-1 rounded-bl-xl uppercase tracking-[0.1em] z-20 shadow-sm">
          Popular
        </div>
      )}

      {/* Lottie Animation Container (ZOOMED) */}
      <div className={`relative w-full aspect-square max-w-[90px] md:max-w-[160px] ${s.bg} rounded-2xl md:rounded-[2.2rem] flex items-center justify-center mb-4 overflow-hidden group-hover:scale-[1.03] transition-transform duration-500`}>
        <Lottie 
          animationData={s.animation} 
          loop={true} 
          className="w-full h-full scale-[1.3] md:scale-[1.15]" 
        />
      </div>

      {/* Text Info - Professional Typography */}
      <div className="text-center w-full mb-3">
        {/* Title: Semibold for professional look, not too heavy */}
        <h3 className="text-[13px] md:text-[20px] font-bold text-slate-800 leading-tight mb-1 tracking-tight px-1">
          {s.title}
        </h3>
        {/* Desc: Slate-500 for secondary feel, Medium weight */}
        <p className="text-[9px] md:text-[14px] text-slate-500 font-medium leading-none tracking-wide">
          {s.desc}
        </p>
      </div>

      {/* CTA Button - Subtle & Elegant */}
      <div className="mt-auto pt-3 border-t border-slate-50 w-full flex justify-center">
        <div className="flex items-center gap-1.5 text-sky-600 text-[10px] md:text-[14px] font-semibold uppercase tracking-wider">
          {s.cta}
          <ArrowRight size={13} strokeWidth={2.5} className="group-hover:translate-x-1 transition-transform duration-300" />
        </div>
      </div>
    </div>
  ))}
</div>

        {/* --- Trust Footer --- */}
        <div className="mt-12 flex justify-center gap-x-6 opacity-40 grayscale font-bold">
            <div className="flex items-center gap-1.5">
               <ShieldCheck size={14} />
               <span className="text-[9px] md:text-xs uppercase tracking-widest">IBA Approved</span>
            </div>
            <div className="flex items-center gap-1.5">
               <ShieldCheck size={14} />
               <span className="text-[9px] md:text-xs uppercase tracking-widest">Safe & Secure</span>
            </div>
        </div>

      </div>
    </section>
  );
}