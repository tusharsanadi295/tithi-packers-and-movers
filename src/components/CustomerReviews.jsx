import React, { useEffect, useRef } from "react";
import { Star, BadgeCheck } from "lucide-react";

const reviews = [
  {
    name: "Rajesh Patel",
    city: "Adajan,Surat",
    review:
      "The entire shifting process was smooth and well-organized. The packing quality was excellent and all items were delivered safely."
  },
  {
    name: "Neha Sharma",
    city: "Kamrej,Surat",
    review:
      "Very professional team. They arrived on time and handled all household items carefully. Pricing was transparent with no hidden charges."
  },
  {
    name: "Amit Verma",
    city: "Piplod",
    review:
      "Furniture and electronics were packed securely and delivered without any damage. The staff was polite and cooperative."
  },
  {
    name: "Pooja Shah",
    city: "Vesu",
    review:
      "Stress-free relocation experience. The booking process was simple and the support team was very responsive."
  },
  {
    name: "Kunal Mehta",
    city: "Parvat Patiya",
    review:
      "Highly reliable service. The team was skilled, fast, and careful with fragile items. Would definitely recommend them."
  },
  {
    name: "Anjali Desai",
    city: "Mota Varachha",
    review:
      "Excellent service from start to finish. Timely pickup, safe delivery, and professional behavior throughout the move."
  },
  {
    name: "Rohit Jain",
    city: "Dabholi",
    review:
      "Good experience overall. The team handled heavy furniture efficiently even without a lift. Very satisfied with the service."
  },
  {
    name: "Sneha Kulkarni",
    city: "Pal",
    review:
      "Packing quality was impressive and the staff was courteous. The entire move was completed faster than expected."
  }
];


export default function GoogleReviews() {
  const scrollRef = useRef(null);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    let animationFrameId;
    let scrollAmount = 0;
    const speed = 0.5; // Speed adjust karein

    const scroll = () => {
      scrollAmount += speed;
      
      // Agar end tak pahunch jaye, toh seamlessly reset karein
      if (scrollAmount >= container.scrollWidth / 2) {
        scrollAmount = 0;
      }
      
      container.scrollLeft = scrollAmount;
      animationFrameId = requestAnimationFrame(scroll);
    };

    animationFrameId = requestAnimationFrame(scroll);
    
    // Pause on Hover
    const handleMouseEnter = () => cancelAnimationFrame(animationFrameId);
    const handleMouseLeave = () => animationFrameId = requestAnimationFrame(scroll);

    container.addEventListener('mouseenter', handleMouseEnter);
    container.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      cancelAnimationFrame(animationFrameId);
      container.removeEventListener('mouseenter', handleMouseEnter);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <section className="bg-slate-50/50 py-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* HEADER SECTION */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => <Star key={i} size={18} fill="currentColor" />)}
              </div>
              <span className="font-bold text-slate-900">4.8 / 5 Rating</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
              Trusted by 1000+ Customers
            </h2>
          </div>

          <div className="flex items-center gap-3 bg-white p-3 rounded-2xl shadow-sm border border-slate-100">
             <div className="bg-blue-600 p-2 rounded-lg text-white">
                <BadgeCheck size={20} />
             </div>
             <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Verified Reviews</p>
                <p className="text-sm font-bold text-slate-900">Google Business Profile</p>
             </div>
          </div>
        </div>

        {/* INFINITE SCROLL CONTAINER */}
        <div 
          ref={scrollRef}
          className="flex gap-6 overflow-x-hidden whitespace-nowrap py-4 select-none cursor-grab active:cursor-grabbing"
          style={{ maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}
        >
          {/* Hum reviews ko double kar denge seamless loop ke liye */}
          {[...reviews, ...reviews].map((item, index) => (
            <div
              key={index}
              className="inline-block min-w-[320px] bg-white rounded-3xl p-8 border border-slate-100 shadow-sm hover:shadow-xl hover:border-blue-100 transition-all duration-500 group"
            >
              <div className="flex gap-1 text-yellow-400 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} fill="currentColor" />
                ))}
              </div>

              <p className="text-slate-600 italic whitespace-normal leading-relaxed mb-6">
                "{item.review}"
              </p>

              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-gradient-to-tr from-blue-600 to-indigo-400 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  {item.name.charAt(0)}
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {item.name}
                  </div>
                  <div className="text-[10px] font-medium text-slate-400 uppercase tracking-widest">
                    {item.city}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
