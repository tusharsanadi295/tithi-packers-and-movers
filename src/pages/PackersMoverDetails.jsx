import React from "react";
import { useParams } from "react-router-dom";
import ShiftingCalculator from "../components/ShiftingCalculator";

 const suratAreas = {
  adajan: {
    city : "Surat",
    area : "Adajan",
    title: "Packers & Movers in Adajan, Surat",
    desc:
      "Looking for reliable packers and movers in Adajan, Surat? Get professional home shifting, packing, loading, and safe transportation services at affordable prices.",
  },

  varachha: {
    city : "Surat",
    area : "Varachha",
    title: "Packers & Movers in Varachha, Surat",
    desc:
      "Affordable and verified packers and movers in Varachha, Surat. Trusted relocation services for houses, offices, and local shifting with trained staff.",
  },

  vesu: {
    city : "Surat",
    area : "Vesu",
    title: "Packers & Movers in Vesu, Surat",
    desc:
      "Premium packers and movers services in Vesu, Surat. Ideal for apartment and society shifting with trained professionals and damage-safe packing.",
  },

  pal: {
    city : "Surat",
    area : "Pal",
    title: "Packers & Movers in Pal, Surat",
    desc:
      "House shifting made easy in Pal, Surat. Compare instant quotes from verified packers and movers for safe and hassle-free relocation.",
  },

  piplod: {
    city : "Surat",
    area : "Piplod",
    title: "Packers & Movers in Piplod, Surat",
    desc:
      "Trusted packers and movers in Piplod, Surat offering smooth home and office shifting with high-quality packing materials and timely delivery.",
  },

  althan: {
    city : "Surat",
    area : "Althan",
    title: "Packers & Movers in Althan, Surat",
    desc:
      "Professional packers and movers in Althan, Surat for secure house shifting, careful handling of furniture, and transparent pricing.",
  },

  citylight: {
    city : "Surat",
    area : "CityLight",
    title: "Packers & Movers in City Light, Surat",
    desc:
      "Looking for premium relocation services in City Light, Surat? Book verified packers and movers for apartments and gated societies.",
  },

  katargam: {
    city : "Surat",
    area : "Katargam",
    title: "Packers & Movers in Katargam, Surat",
    desc:
      "Reliable packers and movers in Katargam, Surat for local house shifting, packing, loading, and safe transportation at budget-friendly rates.",
  },

  udhna: {
    city : "Surat",
    area : "Udhna",
    title: "Packers & Movers in Udhna, Surat",
    desc:
      "Experienced packers and movers in Udhna, Surat providing fast and safe home relocation services with professional packing support.",
  },
    dindoli: {
        city : "Surat",
    area : "Dindoli",
    title: "Packers & Movers in Dindoli, Surat",
    desc:
      "Reliable packers and movers in Dindoli, Surat for affordable house shifting services. Safe packing, careful handling, and on-time relocation guaranteed.",
  },

  katargamroad: {
    city : "Surat",
    area : "Katargamroad",
    title: "Packers & Movers in Katargam Road, Surat",
    desc:
      "Professional packers and movers in Katargam Road, Surat offering secure home and office shifting with experienced staff and transparent pricing.",
  },

  sachin: {
    city : "Surat",
    area : "Sachin",
    title: "Packers & Movers in Sachin, Surat",
    desc:
      "Trusted packers and movers in Sachin, Surat for local and intercity house shifting. Quality packing materials and smooth relocation services.",
  },

};

export default function PackersMoverDetails() {
  const { area } = useParams();
    const areaData = suratAreas[area]; 
  return (
    <section className="bg-slate-50">
      {/* AREA HEADER */}
      <div className="relative overflow-hidden">
  {/* Soft background accent */}
  <div className="absolute inset-0 bg-gradient-to-br from-sky-50 via-white to-white pointer-events-none" />

  <div className="relative max-w-6xl mx-auto px-4 pt-14 pb-10">
    {/* Breadcrumb / Context */}
    <span className="inline-flex items-center gap-2 rounded-full bg-sky-100 px-4 py-1 text-[11px] font-semibold text-sky-700 mb-4">
      Trusted Packers & Movers
    </span>

    {/* Heading */}
    <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900">
  Packers & Movers in{" "}
  <span className="text-sky-600 font-extrabold">
    {areaData?.area}, {areaData?.city}
  </span>
</h1>



    {/* Description */}
    <p className="mt-4 max-w-3xl text-slate-600 text-sm md:text-base leading-relaxed">
      {suratAreas[area]?.desc ||
        "Professional house shifting services with verified movers, safe packing, and transparent pricing."}
    </p>

    {/* Trust Points */}
    <div className="mt-6 flex flex-wrap gap-3">
      <span className="inline-flex items-center rounded-full bg-emerald-50 px-4 py-1.5 text-xs font-semibold text-emerald-700">
        ✓ Verified Movers
      </span>
      <span className="inline-flex items-center rounded-full bg-emerald-50 px-4 py-1.5 text-xs font-semibold text-emerald-700">
        ✓ Damage-Safe Packing
      </span>
      <span className="inline-flex items-center rounded-full bg-emerald-50 px-4 py-1.5 text-xs font-semibold text-emerald-700">
        ✓ Instant Pricing
      </span>
    </div>
  </div>
</div>


      {/* CALCULATOR (PACKERS ONLY MODE) */}
      <ShiftingCalculator
        defaultPickupArea={area}
        onlyPackers={true}
      />
    </section>
  );
}
