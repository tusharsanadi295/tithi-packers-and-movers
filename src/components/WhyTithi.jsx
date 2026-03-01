import React from "react";
import { ShieldCheck, Clock, IndianRupee, Users, ArrowRight, Trophy, CheckCircle2, Globe2 } from "lucide-react";

export default function WhyTithi() {
  const features = [
    {
      icon: <ShieldCheck className="w-8 h-8 md:w-10 md:h-10" />,
      tag: "Protection Protocol",
      title: "Enterprise-Grade Safety",
      desc: "Our proprietary 4-layer military packing ensures zero-damage delivery for high-value assets.",
      bgColor: "bg-slate-950", 
      iconColor: "text-sky-400",
      span: "md:col-span-2",
      textColor: "text-white",
      badge: "Industry Standard"
    },
    {
      icon: <Clock className="w-6 h-6 md:w-8 md:h-8" />,
      tag: "Logistics",
      title: "On-Time Guarantee",
      desc: "Precision scheduling with live GPS-tracked fleet operations.",
      bgColor: "bg-white",
      iconColor: "text-sky-600",
      span: "md:col-span-1",
      border: "border border-slate-200"
    },
    {
      icon: <IndianRupee className="w-6 h-6 md:w-8 md:h-8" />,
      tag: "Financials",
      title: "Transparent Billing",
      desc: "Zero hidden costs. Digital invoicing and structured corporate pricing.",
      bgColor: "bg-sky-50",
      iconColor: "text-sky-700",
      span: "md:col-span-1",
    },
    {
      icon: <Users className="w-8 h-8 md:w-10 md:h-10" />,
      tag: "Human Capital",
      title: "Verified Professionals",
      desc: "In-house experts trained in corporate relocation and white-glove handling.",
      bgColor: "bg-sky-600",
      iconColor: "text-white",
      span: "md:col-span-2",
      textColor: "text-white",
    },
  ];

  return (
    <section className="bg-white py-20 md:py-32 px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* TOP HEADER: Corporate Alignment */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-4 text-sky-600 font-bold tracking-[0.2em] uppercase text-xs">
              <Globe2 size={16} />
              <span>Relocation Excellence</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold text-slate-950 leading-tight">
  Your Belongings, <br />
  <span className="text-slate-400">Handled Like Our Own.</span>
</h2>

          </div>
          <div className="hidden md:block text-right">
            <p className="text-slate-500 max-w-xs text-sm mb-4">
              Providing seamless transition services for families and corporations with a focus on integrity and speed.
            </p>
            <div className="flex gap-4 justify-end">
                
                <div className="flex items-center gap-1 text-xs font-bold text-slate-900 uppercase tracking-tighter">
                    <CheckCircle2 size={14} className="text-sky-500" /> Govt. Approved
                </div>
            </div>
          </div>
        </div>

        {/* BENTO GRID: Structured & Solid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {features.map((item, index) => (
            <div
              key={index}
              className={`
                ${item.span} ${item.bgColor} ${item.border || ''}
                rounded-3xl md:rounded-[2rem] 
                p-8 md:p-12 relative group 
                hover:shadow-[0_20px_50px_rgba(14,165,233,0.1)] transition-all duration-700
                flex flex-col justify-between overflow-hidden
                min-h-[240px] md:min-h-[340px]
              `}
            >
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-8 md:mb-12">
                  <div className={`${item.iconColor}`}>
                    {item.icon}
                  </div>
                  {item.badge && (
                    <span className="border border-sky-400/30 text-sky-400 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                      {item.badge}
                    </span>
                  )}
                </div>

                <p className={`text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] mb-3 ${item.textColor ? 'text-sky-400' : 'text-sky-600'}`}>
                  {item.tag}
                </p>
                <h3 className={`text-2xl md:text-4xl font-bold mb-4 tracking-tight ${item.textColor || 'text-slate-950'}`}>
                  {item.title}
                </h3>
                <p className={`text-sm md:text-lg font-medium max-w-md ${item.textColor ? 'text-slate-400' : 'text-slate-500'}`}>
                  {item.desc}
                </p>
              </div>

              <ArrowRight 
                size={24} 
                className={`absolute bottom-10 right-10 ${item.textColor || 'text-slate-300'} opacity-0 group-hover:opacity-100 transition-all duration-300`} 
              />
            </div>
          ))}
        </div>

        {/* TRUST FOOTER: High Authority Stats */}
        <div className="mt-20 pt-16 border-t border-slate-100">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                <div>
                    <p className="text-slate-400 uppercase text-[10px] font-bold tracking-widest mb-2">Global Presence</p>
                    <p className="text-3xl font-bold text-slate-950">5+ <span className="text-sky-500">Cities</span></p>
                </div>
                <div>
                    <p className="text-slate-400 uppercase text-[10px] font-bold tracking-widest mb-2">Service History</p>
                    <p className="text-3xl font-bold text-slate-950">1k+ <span className="text-sky-500">Clients</span></p>
                </div>
                <div>
                    <p className="text-slate-400 uppercase text-[10px] font-bold tracking-widest mb-2">Trust Quotient</p>
                    <p className="text-3xl font-bold text-slate-950">4.8/5 <span className="text-sky-500">Score</span></p>
                </div>
                <div>
                    <p className="text-slate-400 uppercase text-[10px] font-bold tracking-widest mb-2">Support</p>
                    <p className="text-3xl font-bold text-slate-950">24/7 <span className="text-sky-500">Active</span></p>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
}