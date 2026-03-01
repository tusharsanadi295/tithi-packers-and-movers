import React from "react";
import { useParams } from "react-router-dom";
import ShiftingCalculator from "../components/ShiftingCalculator";
import PackersMoverDetails from "../pages/PackersMoverDetails";
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

export default function AreaPackersMovers() {
  const { area } = useParams();
  const areaData = suratAreas[area];

  if (!areaData) return null;

  return (
    <section className="bg-slate-50">
      {/* AREA CONTENT */}

      {/* CALCULATOR */}
      <PackersMoverDetails defaultPickupArea={area} />

    </section>
  );
}
