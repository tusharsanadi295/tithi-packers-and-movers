import React from "react";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import LocalBusinessSEO from "../components/LocalBusinessSEO";
export default function ContactUs() {
  return (
    <>
      {/* SEO STRUCTURED DATA */}
      <LocalBusinessSEO />

      <section className="bg-slate-50 py-20">
        <div className="max-w-7xl mx-auto px-4">

          {/* ===== HEADER ===== */}
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900">
              Contact <span className="text-sky-600">Tithi Packers & Movers</span>
            </h1>
            <p className="mt-4 text-slate-600 text-lg">
              We’re here to help you with safe, smooth & stress-free relocation.
            </p>
          </div>

          {/* ===== CONTENT ===== */}
          <div className="mt-16 grid lg:grid-cols-2 gap-12">
            {/* LEFT – CONTACT INFO */}
            <div className="space-y-6">
              <InfoCard icon={<Phone />} title="Call Us" value="+91 8160081145 " sub="Available 9 AM – 9 PM" />
              <InfoCard icon={<Mail />} title="Email Us" value="info@tithipackers.in" sub="We reply within 24 hours" />
              <InfoCard icon={<MapPin />} title="Office Address" value="Surat, Gujarat, India" sub="Serving across city & intercity" />
              <InfoCard icon={<Clock />} title="Working Hours" value="Monday – Sunday" sub="9:00 AM – 9:00 PM" />
            </div>

            {/* RIGHT – FORM */}
            <div className="bg-white rounded-3xl shadow-xl p-8 md:p-10">
              {/* form code unchanged */}
              <div className="bg-white rounded-3xl shadow-xl p-8 md:p-10">
  <h2 className="text-2xl font-extrabold text-slate-900 mb-6">
    Get Free Quote
  </h2>

  <form className="space-y-5">
    <input
      type="text"
      placeholder="Full Name"
      className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-sky-500 outline-none"
    />

    <input
      type="tel"
      placeholder="Mobile Number"
      className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-sky-500 outline-none"
    />

    <input
      type="email"
      placeholder="Email Address"
      className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-sky-500 outline-none"
    />

    <textarea
      rows="4"
      placeholder="Your Message"
      className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-sky-500 outline-none"
    ></textarea>

    <button
      type="submit"
      className="w-full bg-sky-600 hover:bg-sky-700 text-white font-semibold py-3 rounded-xl transition"
    >
      Submit Request
    </button>
  </form>
</div>

            </div>
          </div>

          {/* MAP */}
          <div className="mt-20">
            <div className="rounded-3xl shadow-xl overflow-hidden h-[350px]">
              <iframe
                title="Tithi Packers & Movers Location"
                src="https://www.google.com/maps?q=Surat,Gujarat&output=embed"
                width="100%"
                height="100%"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="border-0"
              />
            </div>
          </div>

        </div>
      </section>
    </>
  );
}



/* ===== REUSABLE INFO CARD ===== */
function InfoCard({ icon, title, value, sub }) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 flex items-start gap-4">
      <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-sky-100 text-sky-600">
        {icon}
      </div>
      <div>
        <h3 className="font-bold text-slate-900">{title}</h3>
        <p className="text-slate-700">{value}</p>
        <p className="text-sm text-slate-500">{sub}</p>
      </div>
    </div>
  );
}
