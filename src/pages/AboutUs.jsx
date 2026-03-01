import React from "react";
import { ShieldCheck, Truck, Users, MapPin } from "lucide-react";

export default function AboutUs() {
  return (
    <section className="bg-slate-50 py-20">
      <div className="max-w-7xl mx-auto px-4">

        {/* ===== HEADER ===== */}
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900">
            About <span className="text-sky-600">Tithi Packers & Movers</span>
          </h1>
          <p className="mt-4 text-slate-600 text-lg">
            Relocation simplified with trust, professionalism, and care.
          </p>
        </div>

        {/* ===== ABOUT CONTENT ===== */}
        <div className="mt-16 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
              A Trusted Name in Relocation Services
            </h2>
            <p className="mt-4 text-slate-600 leading-relaxed">
              <b>Tithi Packers & Movers</b> is a professional relocation and
              logistics company based in Surat, delivering safe, reliable, and
              affordable moving solutions for households and businesses.
            </p>
            <p className="mt-4 text-slate-600 leading-relaxed">
              From careful packing to timely delivery, our trained team ensures
              every move is smooth, transparent, and stress-free. We don’t just
              move goods — we move trust.
            </p>
          </div>

          {/* ===== TRUST BADGES ===== */}
          <div className="grid sm:grid-cols-2 gap-6">
            <TrustCard
              icon={<ShieldCheck />}
              title="100% Safe Handling"
              desc="High-quality packing materials & trained staff"
            />
            <TrustCard
              icon={<Users />}
              title="Verified Team"
              desc="Background-checked professionals"
            />
            <TrustCard
              icon={<Truck />}
              title="On-Time Delivery"
              desc="Well-maintained vehicles & smart routing"
            />
            <TrustCard
              icon={<MapPin />}
              title="Wide Coverage"
              desc="Within city & intercity relocations"
            />
          </div>
        </div>

        {/* ===== STATS ===== */}
        <div className="mt-20 bg-white rounded-3xl shadow-xl p-8 md:p-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <Stat value="5+" label="Years of Experience" />
            <Stat value="3,000+" label="Successful Moves" />
            <Stat value="25+" label="Cities Covered" />
            <Stat value="98%" label="Customer Satisfaction" />
          </div>
        </div>

        {/* ===== MISSION ===== */}
        <div className="mt-20 text-center max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
            Our Mission & Vision
          </h2>
          <p className="mt-4 text-slate-600 leading-relaxed">
            Our mission is to deliver reliable, affordable, and professional
            relocation services while maintaining complete transparency and
            customer satisfaction. Our vision is to become one of the most
            trusted packers and movers brands in Gujarat.
          </p>
        </div>

        {/* ===== CTA ===== */}
        <div className="mt-16 text-center">
          <p className="text-lg font-semibold text-slate-700">
            From packing to unpacking — <span className="text-sky-600">Tithi Hai Sabse Alag!</span>
          </p>
        </div>

      </div>
    </section>
  );
}

/* ===== REUSABLE COMPONENTS ===== */

function TrustCard({ icon, title, desc }) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition">
      <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-sky-100 text-sky-600">
        {icon}
      </div>
      <h3 className="mt-4 font-bold text-slate-900">{title}</h3>
      <p className="mt-2 text-sm text-slate-600">{desc}</p>
    </div>
  );
}

function Stat({ value, label }) {
  return (
    <div>
      <div className="text-3xl md:text-4xl font-extrabold text-sky-600">
        {value}
      </div>
      <p className="mt-2 text-sm font-medium text-slate-600">
        {label}
      </p>
    </div>
  );
}


 