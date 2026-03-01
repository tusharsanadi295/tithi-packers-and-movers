import React from "react";
import {
  MapPin,
  Phone,
  Mail,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function CorporateFooter() {
  const companyLinks = [
    { label: "About Us", to: "/about" },
    { label: "Careers", to: "/careers" },
    { label: "Blog", to: "/blog" },
    { label: "Contact", to: "/contact" },
  ];

  const servicesLinks = [
    { label: "Packers & Movers", to: "/getquote" },
    { label: "Packing Only", to: "/getquote" },
    { label: "Intercity Relocation", to: "/getquote" },
    { label: "Loading/Unloading", to: "getquote" },
  ];

  const supportLinks = [
    { label: "FAQ", to: "/faq" },
    { label: "Terms & Conditions", to: "/terms" },
    { label: "Privacy Policy", to: "/privacy" },
    { label: "Help Center", to: "/support" },
  ];

  const socialLinks = [
    {
      icon: <Facebook size={18} />,
      href: "https://facebook.com/tithipackers",
    },
    {
      icon: <Instagram size={18} />,
      href: "https://instagram.com/tithipackers",
    },
    {
      icon: <Linkedin size={18} />,
      href: "https://linkedin.com/company/tithipackers",
    },
    {
      icon: <Twitter size={18} />,
      href: "https://twitter.com/tithipackers",
    },
  ];

  const officeLocations = [
    {
      city: "Udhna",
      address: "T.V Industries, Road No.6, Udhna, Surat - 394221",
    },
    {
      city: "Dindoli",
      address: "Mahadev Nagar, Near Old Age Home, Surat - 394210",
    },
  ];

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16">
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-5 gap-10">

        {/* Company Info */}
        <div className="md:col-span-2">
          <h3 className="text-white text-2xl font-black mb-4">
            Tithi Packers & Movers
          </h3>
          <p className="text-sm text-slate-400 mb-6 leading-relaxed">
            Trusted relocation services across Surat. We deliver safe,
            transparent, and stress-free moving experiences for homes and
            businesses.
          </p>

          {/* Social Icons */}
          <div className="flex gap-3">
            {socialLinks.map((social, idx) => (
              <a
                key={idx}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center rounded-full 
                           bg-slate-800 hover:bg-sky-600 text-slate-300 
                           hover:text-white transition no-underline"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Office Locations */}
        <div>
          <h4 className="text-white font-bold mb-4">Office Locations</h4>
          <ul className="space-y-3 text-sm text-slate-400">
            {officeLocations.map((loc) => (
              <li key={loc.city} className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-sky-500 mt-1" />
                <span>
                  <strong className="text-slate-200">{loc.city}:</strong>{" "}
                  {loc.address}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Links */}
        <div>
          <h4 className="text-white font-bold mb-4">Company</h4>
          <ul className="space-y-2 text-sm">
            {companyLinks.map((link) => (
              <li key={link.label}>
                <Link
                  to={link.to}
                  className="text-slate-300 no-underline hover:text-sky-500 transition-colors"

                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <h4 className="text-white font-bold mt-6 mb-4">Services</h4>
          <ul className="space-y-2 text-sm">
            {servicesLinks.map((link) => (
              <li key={link.label}>
                <Link
                  to={link.to}
                 className="text-slate-300 no-underline hover:text-sky-500 transition-colors"

                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <h4 className="text-white font-bold mt-6 mb-4">Support</h4>
          <ul className="space-y-2 text-sm">
            {supportLinks.map((link) => (
              <li key={link.label}>
                <Link
                  to={link.to}
                  className="text-slate-300 no-underline hover:text-sky-500 transition-colors"

                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-white font-bold mb-4">Get in Touch</h4>

          <ul className="space-y-3 text-sm text-slate-400 mb-6">
            <li className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-sky-500" />
              <a
                href="tel:8160081145"
                className="text-slate-300 no-underline hover:text-sky-500 transition-colors"

              >
                +91 81600 81145
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-sky-500" />
              <a
                href="mailto:info@tithipackers.in"
                className="text-slate-300 no-underline hover:text-sky-500 transition-colors"

              >
                info@tithipackers.in
              </a>
            </li>
          </ul>

          <Link
            to="/getquote"
            className="no-underline inline-block px-6 py-2.5 rounded-xl 
                       bg-sky-600 hover:bg-sky-700 text-white font-bold transition"
          >
            Request a Quote
          </Link>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-14 border-t border-slate-700 py-6 text-center text-sm text-slate-500">
        © {new Date().getFullYear()} Tithi Packers & Movers. All rights reserved.
      </div>
    </footer>
  );
}
