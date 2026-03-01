import { useNavigate } from "react-router-dom";
import {
  Truck,
  Package,
  Wind,
  SprayCan,
  Sofa,
  Wrench,
  Home,
  ArrowRight,
} from "lucide-react";
import ServicesSEO from "../components/ServicesSEO";
import TrustSection from "../components/TrustSection";
export default function Services() {
  const navigate = useNavigate();

  const goToCalculator = () => {
    navigate("/services/shifting-calculator");
  };

  return (
    <>
      {/* SEO SCHEMA */}
      <ServicesSEO />

      <section className="bg-slate-50 py-20">
        <div className="max-w-7xl mx-auto px-4 space-y-20">

          {/* HERO */}
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900">
              Complete Relocation Services
            </h1>
            <p className="mt-4 text-lg text-slate-600">
              Packing • Moving • Unpacking • Setup — handled professionally
            </p>
          </div>

          {/* SERVICES GRID */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <ServiceCard
              icon={<Truck />}
              title="Packers & Movers"
              desc="Intracity & intercity household and office shifting."
              onBook={goToCalculator}
            />

            <ServiceCard
              icon={<Home />}
              title="Tempo Services (Intracity)"
              desc="Tata Ace, Pickup & mini trucks for local shifting."
              onBook={goToCalculator}
            />

            <ServiceCard
              icon={<Wind />}
              title="AC Relocation"
              desc="Safe dismantling, packing & reinstallation."
              onBook={goToCalculator}
            />

            <ServiceCard
              icon={<SprayCan />}
              title="Cleaning Services"
              desc="Pre & post move deep home cleaning."
              onBook={goToCalculator}
            />

            <ServiceCard
              icon={<Package />}
              title="Professional Packing"
              desc="Bubble wrap, cartons & protective materials."
              onBook={goToCalculator}
            />

            <ServiceCard
              icon={<Sofa />}
              title="Furniture Handling"
              desc="Dismantling, transport & reassembly."
              onBook={goToCalculator}
            />
          </div>

          {/* APPLIANCE + UNPACKING */}
          <div className="grid lg:grid-cols-2 gap-10">

            <HighlightBox
              icon={<Wrench />}
              title="Appliance Handling"
              points={[
                "Split & window AC dismantling",
                "Water purifier / RO safe uninstallation",
                "No damage to walls & fittings",
              ]}
            />

            <HighlightBox
              icon={<Package />}
              title="Unpacking & Setup Assistance"
              highlight
              points={[
                "Opening all packed cartons",
                "Room-wise item placement",
                "Furniture setup support",
                "Packing waste removal",
              ]}
            />

          </div>

        </div>
      </section>
      
      {/* TRUST ICONS */}
      <TrustSection />

    </>
  );
}

/* ================= COMPONENTS ================= */

function ServiceCard({ icon, title, desc, onBook }) {
  return (
    <div
      className="
        bg-white rounded-2xl shadow-md p-6
        hover:shadow-xl transition
        animate-fadeInUp
        flex flex-col
      "
    >
      <div className="w-12 h-12 rounded-xl bg-sky-100 text-sky-600 flex items-center justify-center mb-4">
        {icon}
      </div>

      <h3 className="font-bold text-lg text-slate-900">{title}</h3>
      <p className="text-slate-600 mt-2 flex-grow">{desc}</p>

      <button
        onClick={onBook}
        className="mt-4 inline-flex items-center gap-2 text-sky-600 font-semibold hover:text-sky-700"
      >
        Book Now <ArrowRight size={16} />
      </button>
    </div>
  );
}

function HighlightBox({ icon, title, points, highlight }) {
  return (
    <div
      className={`
        rounded-3xl p-8 shadow-xl
        ${highlight ? "bg-sky-600 text-white" : "bg-white"}
      `}
    >
      <div className="flex items-center gap-4 mb-4">
        <div
          className={`
            w-12 h-12 rounded-xl flex items-center justify-center
            ${highlight ? "bg-white text-sky-600" : "bg-sky-100 text-sky-600"}
          `}
        >
          {icon}
        </div>
        <h3 className="text-2xl font-bold">{title}</h3>
      </div>

      <ul className="space-y-2">
        {points.map((p, i) => (
          <li key={i}>✔ {p}</li>
        ))}
      </ul>
    </div>
  );
}
