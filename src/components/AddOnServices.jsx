import React from "react";
import { Plus, ChevronRight, CheckCircle2, Star } from "lucide-react";

// Local assets ko waise hi rakhein
import packingIcon from "../assets/mycollection/png/003-parcel-protection.png";
import acIcon from "../assets/mycollection/png/004-technician.png";
import roIcon from "../assets/ro.png";
import furnitureIcon from "../assets/furniture.png";
import unpackingIcon from "../assets/unpacking.png";
import unpacking from "../assets/mycollection/png/001-unpacking.png"
import Fan from "../assets/mycollection/png/006-ceiling-fan.png"
export default function AddOnServicesInfo() {
  const services = [
    { title: "Professional Packing", desc: "Multi-layer protection for fragile items", price: "799", icon: packingIcon, tag: "Popular" },
    { title: "AC Installation & Uninstallation", desc: "Expert dismantling & gas check-up", price: "1599", icon: acIcon, tag: "Expert" },
    { title: "RO Service", desc: "Safe uninstallation & filter protection", price: "199", icon: roIcon, tag: "Quick" },
    { title: "Furniture Assembly", desc: "Beds, wardrobes & hydraulic lifting", price: "599", icon: furnitureIcon, tag: "Heavy" },
    { title: "Unpacking Help", desc: "Systematic unpacking & box removal", price: "699", icon: unpacking, tag: "Value" },
    { title: "Ceiling Fan Install & Remove", desc: "Safely Install & Remove Ceiling Fan", price: "150", icon: Fan, tag: "Value" },
  ];

  return (
    <section className="py-10 bg-[#F8FAFC]">
      <div className="max-w-6xl mx-auto px-4">
        
        {/* PROFESSIONAL HEADER */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 mb-3">
            <span className="bg-sky-600 w-10 h-[3px] rounded-full"></span>
            <span className="text-sky-600 font-black text-[11px] uppercase tracking-[0.2em]">Our Ecosystem</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 leading-tight">
            Comprehensive <span className="text-sky-600">Add-on</span> Services
          </h2>
          <p className="mt-4 text-slate-500 text-lg font-medium leading-relaxed">
            Beyond just moving boxes, we provide technical assistance to ensure your home is set up perfectly.
          </p>
        </div>

        {/* MODERN LIST UI */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
  {services.map((s, i) => (
    <div
      key={i}
      className="group relative bg-white rounded-3xl p-4 md:p-5 border border-slate-100 hover:border-sky-200 transition-all duration-500 shadow-[0_2px_4px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] flex items-center gap-4 md:gap-6"
    >
      {/* LEFT: ICON AREA */}
      <div className="relative shrink-0">
        {/* Glow effect on hover */}
        <div className="absolute inset-0 bg-sky-400 opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500 rounded-full"></div>
        
        <div className="relative w-16 h-16 md:w-20 md:h-20 bg-slate-50 rounded-[1.5rem] border border-slate-50 flex items-center justify-center group-hover:bg-white group-hover:border-sky-100 transition-all duration-500">
          <img
            src={s.icon}
            alt={s.title}
            className="w-10 h-10 md:w-12 md:h-12 object-contain group-hover:scale-110 transition-transform duration-500"
          />
        </div>
      </div>

      {/* MIDDLE: CONTENT AREA */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <h3 className="text-base md:text-lg font-bold text-slate-900 tracking-tight leading-none group-hover:text-sky-600 transition-colors">
            {s.title}
          </h3>
          {/* Subtle Pro Tag */}
          <span className="bg-slate-100 text-slate-500 text-[9px] font-bold px-1.5 py-0.5 rounded group-hover:bg-sky-600 group-hover:text-white transition-colors">
            PRO
          </span>
        </div>
        
        <p className="text-slate-500 text-xs md:text-sm font-medium line-clamp-1 mb-3">
          {s.desc}
        </p>

        {/* Bottom Info Row */}
        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase">From</span>
            <span className="text-lg font-black text-slate-900">₹{s.price}</span>
          </div>
          
          {/* Mobile visible Action Label */}
          <div className="flex items-center gap-1 text-[10px] font-bold text-sky-600 uppercase tracking-widest opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all">
            Add Service <Plus size={12} strokeWidth={3} />
          </div>
        </div>
      </div>

      {/* Decoration: Subtle Index Number */}
      <span className="absolute top-4 right-6 text-4xl font-black text-slate-50/50 group-hover:text-sky-50/50 transition-colors pointer-events-none select-none">
        0{i + 1}
      </span>
    </div>
  ))}


          {/* CUSTOM BANNER (PRO STYLE) */}
          <div className="lg:col-span-2 mt-8 relative group">
  {/* Outer Glow Effect */}
  <div className="absolute -inset-1 bg-gradient-to-r from-sky-600 to-sky-400 rounded-[2.5rem] blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>

  <div className="relative bg-white rounded-[2rem] p-6 md:p-10 border border-slate-100 overflow-hidden shadow-sm">
    
    {/* Subtle Background Decoration */}
    <div className="absolute top-0 right-0 w-1/3 h-full bg-slate-50 skew-x-12 translate-x-16 z-0"></div>

    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
      
      {/* Left: Branding & Content */}
      <div className="flex flex-col md:flex-row items-center gap-6">
        <div className="w-16 h-16 bg-sky-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-sky-200 shrink-0">
          <Star fill="currentColor" size={28} className="animate-pulse" />
        </div>
        
        <div className="text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2 mb-1">
            <span className="h-1 w-1 bg-sky-600 rounded-full"></span>
            <span className="text-[10px] font-black text-sky-600 uppercase ">Custom Solutions</span>
          </div>
          <h4 className="text-2xl font-black text-slate-900 tracking-tight">
            Need a custom service?
          </h4>
          <p className="text-slate-500 text-sm font-medium mt-1">
            We handle everything from specialized item packing <br className="hidden md:block" /> 
            to complex electronic setups. Just ask.
          </p>
        </div>
      </div>

      {/* Right: Action Area */}
      <div className="flex flex-col items-center md:items-end gap-3 w-full md:w-auto">
        <a href="tel:8160081145" className="no-underline">
        <button  className="w-full md:w-auto bg-slate-900 hover:bg-sky-600 text-white px-10 py-4 rounded-2xl font-bold text-sm transition-all duration-300 shadow-lg shadow-slate-200 flex items-center justify-center gap-2 group/btn">
          Consult our Expert
          <ChevronRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
        </button>
        </a>
        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
           Response time: <span className="text-emerald-500">Under 5 mins</span>
        </p>
      </div>

    </div>
  </div>
</div>
        </div>

      </div>
    </section>
  );
}