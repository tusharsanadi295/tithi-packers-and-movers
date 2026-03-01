import { ShieldCheck, Users, PackageCheck, Home } from "lucide-react";

export default function TrustSection() {
  return (
    <section className="bg-white py-14">
      <div className="max-w-7xl mx-auto px-4">

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">

          <TrustItem
            icon={<ShieldCheck />}
            title="Damage-Free Handling"
            desc="Safe packing & careful loading to avoid damage"
          />

          <TrustItem
            icon={<Users />}
            title="Trained Staff"
            desc="Professionally trained & verified team"
          />

          <TrustItem
            icon={<PackageCheck />}
            title="Premium Packing"
            desc="Bubble wrap, cartons & protective materials"
          />

          <TrustItem
            icon={<Home />}
            title="End-to-End Service"
            desc="Packing, moving & unpacking at destination"
          />

        </div>

      </div>
    </section>
  );
}

function TrustItem({ icon, title, desc }) {
  return (
    <div
      className="
        flex flex-col items-center gap-3
        p-5 rounded-2xl
        hover:shadow-lg transition
        animate-fadeInUp
      "
    >
      <div className="w-14 h-14 rounded-2xl bg-sky-100 text-sky-600 flex items-center justify-center">
        {icon}
      </div>

      <h3 className="font-bold text-slate-900">{title}</h3>
      <p className="text-sm text-slate-600">{desc}</p>
    </div>
  );
}
