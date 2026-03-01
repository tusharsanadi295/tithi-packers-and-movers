import Lottie from "lottie-react";
import truckAnimation from "../animations/truck.json";
import outstationAnimation from "../animations/outstation1.json";

export default function MainServices() {
  return (
    // Section wrapper with Sky Blue theme
    <section className="w-full py-8 px-3 md:py-16 md:px-6 bg-slate-50">
      <div className="max-w-5xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-2xl md:text-4xl font-black text-gray-900 leading-tight">
            Our <span className="text-[#0ea5e9]">Moving Services</span>
          </h1>
          <p className="mt-2 text-sm md:text-lg text-gray-500 font-medium">
            Fast, Reliable & Affordable Relocation
          </p>
        </div>

        {/* Grid: Mobile pe bhi 2 columns (grid-cols-2) hi rahenge */}
        <div className="grid grid-cols-2 gap-3 md:gap-8">
          <ServiceCard
            title="Local"
            subtitle="Within City"
            animation={truckAnimation}
            primary
          />

          <ServiceCard
            title="Outstation"
            subtitle="Intercity"
            animation={outstationAnimation}
          />
        </div>

        {/* Trust Badges for Mobile (Minimalist) */}
        <div className="mt-8 flex justify-center gap-4 text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-widest">
           <span>● Safe Packing</span>
           <span>● 24/7 Tracking</span>
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ title, subtitle, animation, primary }) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl p-4 md:p-8 transition-all duration-300 cursor-pointer shadow-md hover:shadow-xl active:scale-95 ${
        // Sky Blue Color Logic (#0ea5e9 is standard Sky-500)
        primary 
          ? "bg-[#0ea5e9] text-white" 
          : "bg-white text-gray-800 border border-sky-100"
      }`}
    >
      {/* Decorative Circle */}
      <div className={`absolute -right-4 -top-4 w-16 h-16 md:w-24 md:h-24 rounded-full transition-transform duration-500 group-hover:scale-125 ${
        primary ? "bg-white/10" : "bg-sky-50"
      }`} />

      <div className="relative z-10 flex flex-col items-center text-center">
        {/* Title & Subtitle */}
        <h3 className="text-sm md:text-2xl font-bold leading-tight">{title}</h3>
        <p className={`text-[10px] md:text-sm font-medium mt-0.5 opacity-80`}>
          {subtitle}
        </p>

        {/* Animation Container - Mobile pe thoda chota kiya hai */}
        <div className="my-4 md:my-8">
          <div className={`h-16 w-16 md:h-32 md:w-32 flex items-center justify-center rounded-full ${
            primary ? "bg-white/20" : "bg-sky-50"
          }`}>
            <Lottie animationData={animation} loop={true} className="h-12 w-12 md:h-24 md:w-24" />
          </div>
        </div>

        {/* Action Link */}
        <div className={`flex items-center text-[10px] md:text-xs font-black uppercase tracking-tighter md:tracking-widest ${
            primary ? "text-white" : "text-[#0ea5e9]"
          }`}
        >
          Book Now
          <span className="ml-1 md:ml-2">→</span>
        </div>
      </div>
    </div>
  );
}