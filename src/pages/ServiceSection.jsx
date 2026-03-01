import React, { useState } from "react";

/**
 * ServicesSection.jsx
 * - Tailwind v3
 * - Inline SVG icons + small float animation
 * - Modal for details with optional Lottie integration
 *
 * Usage: import and render <ServicesSection /> in App.jsx below Header
 */

const SERVICES = [
  {
    id: "1bhk",
    title: "1BHK Shifting",
    subtitle: "Small home moves — fast & careful",
    color: "from-amber-300 to-amber-400",
    short: "Packing, transport, unpacking for 1BHK homes.",
    details:
      "Perfect for small apartments. We handle fragile items, disassembly/assembly of furniture and provide full packing material.",
    // optional: lottieUrl: "https://assets.lottiefiles.com/....json"
  },
  {
    id: "2bhk",
    title: "2BHK Shifting",
    subtitle: "Medium home moves with care",
    color: "from-emerald-300 to-emerald-400",
    short: "Comprehensive shifting for 2BHK with team & vehicle.",
    details:
      "Includes packing of electricals, wooden furniture protection, insured transit and on-time delivery.",
  },
  {
    id: "3bhk",
    title: "3BHK Shifting",
    subtitle: "Larger homes & multi-room moves",
    color: "from-sky-300 to-sky-400",
    short: "Full-service shifting for 3BHK homes and bigger.",
    details:
      "Experienced crew with large trucks, protective blankets, and secure loading for heavy furniture and appliances.",
  },
  {
    id: "office",
    title: "Office Relocation",
    subtitle: "Zero-downtime office moves",
    color: "from-indigo-300 to-indigo-400",
    short: "We plan and execute office relocations with minimal downtime.",
    details:
      "We handle IT equipment, cubicles, packing sensitive documents, and phased moving to keep your business running.",
  },
  {
    id: "car",
    title: "Car Transportation",
    subtitle: "Door-to-door car transport",
    color: "from-pink-300 to-pink-400",
    short: "Safe car pickup and door delivery with tracking.",
    details:
      "Open/closed carriers, vehicle insurance options, scheduled pickups and delivery to your destination.",
  },
  {
    id: "bike",
    title: "Bike Transportation",
    subtitle: "Secure bike carriers",
    color: "from-lime-300 to-lime-400",
    short: "Careful bike handling with custom crating available.",
    details:
      "We secure two-wheelers for long distance with cradles and padding to prevent movement and scratches.",
  },
  {
    id: "warehouse",
    title: "Warehouse & Storage",
    subtitle: "Short & long term storage",
    color: "from-rose-300 to-rose-400",
    short: "Safe, climate-controlled storage with pickup & delivery.",
    details:
      "Inventory management, monthly billing, palletized storage and insured warehousing for personal or business goods.",
  },
];

export default function ServicesSection() {
  const [active, setActive] = useState(null); // id of service in modal

  return (
    <section id="services-section" className="py-16 bg-gradient-to-b from-white to-slate-50">
      <div className="max-w-[1200px] mx-auto px-6">
        <header className="mb-8 text-center">
          <h2 className="text-3xl font-extrabold text-slate-900">Our Services</h2>
          <p className="text-slate-600 mt-2 max-w-[720px] mx-auto">
            We offer full moving & logistics services — whether a small flat move or a full office relocation.
            Tap any card to learn more or get an instant quote.
          </p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((s) => (
            <article key={s.id} className="relative group">
              <div
                className={`rounded-2xl p-6 bg-gradient-to-b ${s.color} shadow-md transform transition hover:-translate-y-2`}
                role="button"
                tabIndex={0}
                onClick={() => setActive(s.id)}
                onKeyDown={(e) => { if (e.key === "Enter") setActive(s.id); }}
                aria-label={`View details for ${s.title}`}
              >
                {/* Icon circle */}
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-xl flex items-center justify-center bg-white/40 shadow-inner animate-float">
                    {/* Inline illustrative SVG — replace with <img src=... /> or Lottie if desired */}
                    {renderIcon(s.id)}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">{s.title}</h3>
                    <p className="text-sm text-slate-800 mt-1">{s.subtitle}</p>
                  </div>
                </div>

                <p className="mt-4 text-slate-800 text-sm">{s.short}</p>

                <div className="mt-4 flex items-center justify-between">
                  <button
                    onClick={(e) => { e.stopPropagation(); setActive(s.id); }}
                    className="inline-flex items-center gap-2 bg-white px-3 py-2 rounded-md text-sky-600 font-medium shadow-sm hover:shadow-md transition"
                  >
                    View Details
                  </button>

                  <a
                    href={`tel:8160081145`}
                    onClick={(e) => e.stopPropagation()}
                    className="text-sm text-slate-900 underline"
                  >
                    Call Now
                  </a>
                </div>
              </div>

              {/* subtle badge */}
              <div className="absolute -top-3 left-6 px-2 py-1 bg-white rounded-full text-xs text-slate-700 shadow">Trusted</div>
            </article>
          ))}
        </div>
      </div>

      {/* Modal */}
      {active && <ServiceModal service={SERVICES.find((x) => x.id === active)} onClose={() => setActive(null)} />}
    </section>
  );
}

/* Small floating animation */
const styles = `
@keyframes floaty {
  0% { transform: translateY(0px); }
  50% { transform: translateY(-6px); }
  100% { transform: translateY(0px); }
}
.animate-float { animation: floaty 3s ease-in-out infinite; }
`;

/* Renders simple inline SVG icons per service id — replaceable */
function renderIcon(id) {
  switch (id) {
    case "1bhk":
      return (
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
          <path d="M3 10l9-6 9 6v8a1 1 0 0 1-1 1h-5v-5H9v5H4a1 1 0 0 1-1-1v-8z" stroke="#0f172a" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      );
    case "2bhk":
      return (
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
          <rect x="2.5" y="7" width="19" height="11" rx="1.5" stroke="#0f172a" strokeWidth="1.4" />
          <path d="M7 12h4M13 12h3" stroke="#0f172a" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      );
    case "3bhk":
      return (
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
          <rect x="2.5" y="6" width="19" height="12" rx="1.5" stroke="#0f172a" strokeWidth="1.4" />
          <path d="M3 12h18" stroke="#0f172a" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      );
    case "office":
      return (
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
          <rect x="3" y="4" width="18" height="16" rx="2" stroke="#0f172a" strokeWidth="1.4" />
          <path d="M8 9h8M8 13h8" stroke="#0f172a" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      );
    case "car":
      return (
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
          <path d="M3 13l2-4h14l2 4v4a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1v-1H6v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-4z" stroke="#0f172a" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="7.5" cy="16.5" r="1" fill="#0f172a" />
          <circle cx="17.5" cy="16.5" r="1" fill="#0f172a" />
        </svg>
      );
    case "bike":
      return (
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
          <circle cx="6.5" cy="16.5" r="2" stroke="#0f172a" strokeWidth="1.4" />
          <circle cx="17.5" cy="16.5" r="2" stroke="#0f172a" strokeWidth="1.4" />
          <path d="M8 14l3-6h3" stroke="#0f172a" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "warehouse":
      return (
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
          <path d="M3 9l9-4 9 4v8a1 1 0 0 1-1 1h-1v-5H5v5H4a1 1 0 0 1-1-1V9z" stroke="#0f172a" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      );
    default:
      return null;
  }
}

/* Modal component: can embed static SVG or Lottie player if lottieUrl provided */
// inside src/ServicesSection.jsx replace ServiceModal with this version
function ServiceModal({ service, onClose }) {
  if (!service) return null;

  return (
    <>
      {/* full-screen centered modal using flex (fixes half-left issue) */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          className="absolute inset-0 bg-black/40"
          onClick={onClose}
        />

        <div className="relative z-50 w-full max-w-3xl bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="p-6">
            <div className="flex items-start gap-6">
              <div className="w-28 h-28 rounded-xl bg-gradient-to-b from-slate-100 to-white flex items-center justify-center shadow">
                {renderIcon(service.id)}
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-900">{service.title}</h3>
                <p className="text-slate-700 mt-2">{service.details}</p>

                <div className="mt-4 flex items-center gap-3">
                  <a href={`tel:8160081145`} className="inline-flex items-center gap-2 bg-sky-600 text-white px-4 py-2 rounded-md shadow">📞 Call Now</a>
                  <a href="#book-service" className="inline-flex items-center gap-2 border border-slate-200 px-4 py-2 rounded-md">Get Quote</a>
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 bg-slate-50 flex justify-end">
            <button onClick={onClose} className="px-4 py-2 rounded-md">Close</button>
          </div>
        </div>
      </div>
    </>
  );
}


/* inject small animation style to page head */
if (typeof document !== "undefined" && !document.getElementById("services-section-styles")) {
  const style = document.createElement("style");
  style.id = "services-section-styles";
  style.innerHTML = styles;
  document.head.appendChild(style);
}
