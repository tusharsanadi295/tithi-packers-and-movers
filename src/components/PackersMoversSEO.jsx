import React from "react";
import { useNavigate, Link } from "react-router-dom";

export default function PackersMoversSEO() {
  const navigate = useNavigate();

 const suratAreas = {
  adajan: {
    title: "Packers & Movers in Adajan, Surat",
    desc:
      "Looking for reliable packers and movers in Adajan, Surat? Get professional home shifting, packing, loading, and safe transportation services at affordable prices.",
  },

  varachha: {
    title: "Packers & Movers in Varachha, Surat",
    desc:
      "Affordable and verified packers and movers in Varachha, Surat. Trusted relocation services for houses, offices, and local shifting with trained staff.",
  },

  vesu: {
    title: "Packers & Movers in Vesu, Surat",
    desc:
      "Premium packers and movers services in Vesu, Surat. Ideal for apartment and society shifting with trained professionals and damage-safe packing.",
  },

  pal: {
    title: "Packers & Movers in Pal, Surat",
    desc:
      "House shifting made easy in Pal, Surat. Compare instant quotes from verified packers and movers for safe and hassle-free relocation.",
  },

  piplod: {
    title: "Packers & Movers in Piplod, Surat",
    desc:
      "Trusted packers and movers in Piplod, Surat offering smooth home and office shifting with high-quality packing materials and timely delivery.",
  },

  althan: {
    title: "Packers & Movers in Althan, Surat",
    desc:
      "Professional packers and movers in Althan, Surat for secure house shifting, careful handling of furniture, and transparent pricing.",
  },

  citylight: {
    title: "Packers & Movers in City Light, Surat",
    desc:
      "Looking for premium relocation services in City Light, Surat? Book verified packers and movers for apartments and gated societies.",
  },

  katargam: {
    title: "Packers & Movers in Katargam, Surat",
    desc:
      "Reliable packers and movers in Katargam, Surat for local house shifting, packing, loading, and safe transportation at budget-friendly rates.",
  },

  udhna: {
    title: "Packers & Movers in Udhna, Surat",
    desc:
      "Experienced packers and movers in Udhna, Surat providing fast and safe home relocation services with professional packing support.",
  },
    dindoli: {
    title: "Packers & Movers in Dindoli, Surat",
    desc:
      "Reliable packers and movers in Dindoli, Surat for affordable house shifting services. Safe packing, careful handling, and on-time relocation guaranteed.",
  },

  katargamroad: {
    title: "Packers & Movers in Katargam Road, Surat",
    desc:
      "Professional packers and movers in Katargam Road, Surat offering secure home and office shifting with experienced staff and transparent pricing.",
  },

  sachin: {
    title: "Packers & Movers in Sachin, Surat",
    desc:
      "Trusted packers and movers in Sachin, Surat for local and intercity house shifting. Quality packing materials and smooth relocation services.",
  },

};


  return (
    <section className="py-20 bg-gradient-to-b from-sky-50 to-white">
      <div className="max-w-7xl mx-auto px-4">

        {/* Heading */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">
            Packers & Movers in Surat
          </h1>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Trusted, verified, and professional relocation services across Surat.
          </p>
        </div>

        {/* Areas Grid */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Object.entries(suratAreas).map(([slug, area]) => (
            <div
              key={slug}
              className="group rounded-xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              {/* SEO link */}
              <Link
                to={`/packers-movers/surat/${slug}`}
                className="no-underline"
              >
                <h2 className="text-lg font-semibold text-slate-900 group-hover:text-sky-600">
                  {area.title}
                </h2>
              </Link>

              <p className="text-sm text-slate-500 mt-2 leading-relaxed">
                {area.desc}
              </p>

              <Link
  to={`/packers-movers/surat/${slug}`}
  className="text-sky-600 text-sm font-semibold hover:underline"
>
  Get Quote →
</Link>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
