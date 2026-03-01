import React, { useState } from "react";
import { Truck, Home, Building2, Check, ArrowRight, Info, MapPin, Globe } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function PopularRoutes() {
  const [activeTab, setActiveTab] = useState("local");
  const navigate = useNavigate();

  const pricingData = [
    {
      size: "1 BHK",
      icon: <Home size={24} />,
      local: "4,500 - 8,000",
      intercity: "12,000 - 22,000",
      features: ["Small Truck", "2 Professional Labors", "Basic Packing", "2-4 Hours Service"],
      color: "sky"
    },
    {
      size: "2 BHK",
      icon: <Building2 size={24} />,
      local: "7,500 - 13,000",
      intercity: "18,000 - 35,000",
      features: ["Medium Truck (14ft)", "3 Professional Labors", "Multi-layer Packing", "5-8 Hours Service"],
      color: "indigo"
    },
    {
      size: "3 BHK / Villa",
      icon: <Truck size={24} />,
      local: "11,000 - 19,000",
      intercity: "28,000 - 55,000",
      features: ["Large Container", "4-5 Labors", "Premium Packing", "Full Day Service"],
      color: "slate"
    },
  ];
  
  return (
    <section  id="pricing-heading" className="pt-1 pb-2 bg-slate-50">
      <div className="max-w-6xl mx-auto px-4">
        
        {/* HEADER & TOGGLE */}
        <div className="text-center mb-14">
  <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
    Affordable Packers & Movers Pricing
  </h2>

  <p className="text-slate-500 mt-3 max-w-xl mx-auto text-sm md:text-base leading-relaxed">
    Transparent pricing for local and intercity house shifting.
    Get instant estimates based on your home size in Surat and nearby cities.
  </p>


          {/* CUSTOM TAB TOGGLE */}
          <div className="inline-flex p-1.5 bg-slate-100 rounded-2xl border border-slate-200">
            <button
              onClick={() => setActiveTab("local")}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all ${
activeTab === "local"
  ? "bg-white text-sky-600 shadow-md"
  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              <MapPin size={16} /> Local Shifting
            </button>
            <button
              onClick={() => setActiveTab("intercity")}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all ${
                activeTab === "intercity" ? "bg-white text-sky-600 shadow-sm" : "text-slate-500 hover:text-slate-700"
              }`}
            >
              <Globe size={16} /> Intercity (Outstation)
            </button>
          </div>
        </div>

        {/* PRICING CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingData.map((plan, i) => (
            <div 
              key={i} 
             className="
  relative group bg-white
  rounded-[2rem]
  p-7
  border border-slate-100
  shadow-lg shadow-slate-200/40
  hover:-translate-y-1.5
  hover:shadow-xl
  transition-all duration-300
"

            >
              {/* Icon & Label */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center">
                  {plan.icon}
                </div>
                <div>
                  <h3 className="text-xl font-black text-slate-900">{plan.size}</h3>
<span className="text-[10px] font-bold text-sky-600 uppercase tracking-widest">
  Fair & Clear Pricing
</span>
                </div>
              </div>

              {/* Price */}
              <div className="mb-8">
                <div className="flex items-end gap-1 text-slate-900">
  <span className="text-xl font-semibold">₹</span>
  <span className="text-[2.2rem] font-extrabold tracking-tight leading-none">
    {activeTab === "local" ? plan.local : plan.intercity}
  </span>
</div>

                <p className="text-slate-400 text-xs mt-1 font-medium italic">
                  *Estimate for {activeTab === "local" ? "within 15km" : "standard distance"}
                </p>
              </div>

              {/* Features List */}
              <div className="space-y-4 mb-10">
                {plan.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="shrink-0 w-5 h-5 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center">
                      <Check size={12} strokeWidth={3} />
                    </div>
                    <span className="text-sm text-slate-600 font-medium">{feature}</span>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <button
  onClick={() =>
    navigate("/calculate")
  }
  className="
  w-full py-3.5 px-6
  bg-slate-900 text-white
  rounded-xl
  text-sm font-semibold
  flex items-center justify-center gap-2
  hover:bg-sky-600
  transition-colors
"

>
  Book This Move
  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
</button>

            </div>
          ))}
        </div>

        {/* PRO TIP / FOOTER */}
       <div className="mt-16 py-8 border-t border-slate-100">
  <div className="flex flex-col md:flex-row items-center justify-between gap-6 opacity-80 hover:opacity-100 transition-opacity duration-300">
    
    {/* Text Section */}
    <div className="flex items-center gap-4">
      <div className="h-10 w-1 flex-shrink-0 bg-sky-600 rounded-full"></div>
      <div>
        <div className="flex items-center gap-2 mb-1">
          <Info size={14} className="text-sky-600" />
          <span className="text-xs font-black uppercase tracking-[0.15em] text-slate-400">
            Pricing Disclaimer
          </span>
        </div>
        <p className="text-sm md:text-base text-slate-600 font-medium">
          Prices are indicative. Final quote depends on 
          <span className="text-slate-900 font-bold"> floor level</span>, 
          <span className="text-slate-900 font-bold"> lift availability</span>, and 
          <span className="text-slate-900 font-bold"> packing quality</span>.
        </p>
      </div>
    </div>

    {/* Right Side: Trust Badge (Minimal) */}
    <div className="flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-lg">
      <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
        Updated Jan 2024
      </span>
    </div>

  </div>
</div>

      </div>
      <title>Packers & Movers Pricing in Surat | Local & Intercity Shifting</title>
<meta
  name="description"
  content="Check affordable packers and movers pricing in Surat. Get instant estimates for local and intercity house shifting based on 1 BHK, 2 BHK, and 3 BHK."
/>

    </section>
  );
}