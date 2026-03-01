import React from "react";
import { MessageCircle } from "lucide-react";

export default function WhatsAppButton() {
  const phone = "919XXXXXXXXX"; // +91 without +
  const message = encodeURIComponent(
    "Hello Tithi Packers & Movers, I want to enquire about relocation services."
  );

  return (
    <a
      href={`https://wa.me/${phone}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      className="
        fixed bottom-6 right-6 z-50
        bg-green-500 hover:bg-green-600
        text-white rounded-full
        w-14 h-14 flex items-center justify-center
        shadow-xl transition active:scale-95
      "
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle size={28} />
    </a>
  );
}
