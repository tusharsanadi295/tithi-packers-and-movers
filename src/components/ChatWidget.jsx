import { useState } from "react";
import AIChat from "./AIChat";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Floating Button with Hover Effect */}
      <button
        onClick={() => setOpen(!open)}
        style={{
          position: "fixed",
          bottom: "24px",
          right: "24px",
          background: "linear-gradient(135deg, #25D366 0%, #128C7E 100%)",
          color: "white",
          width: "60px",
          height: "60px",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "28px",
          cursor: "pointer",
          border: "none",
          boxShadow: "0 4px 15px rgba(37, 211, 102, 0.4)",
          zIndex: 9999,
          transition: "transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
          transform: open ? "rotate(90deg) scale(0.9)" : "scale(1)",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = open ? "rotate(90deg) scale(0.9)" : "scale(1)")}
      >
        {open ? "✕" : "🤖"}
      </button>

      {/* Popup Chat Window with Smooth Appearance */}
      <div
        style={{
          position: "fixed",
          bottom: "100px",
          right: "24px",
          width: "380px",
          height: "600px",
          maxHeight: "80vh",
          background: "#ffffff",
          borderRadius: "20px",
          boxShadow: "0 10px 40px rgba(0,0,0,0.15)",
          zIndex: 9999,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          transition: "all 0.3s ease-in-out",
          opacity: open ? 1 : 0,
          transform: open ? "translateY(0)" : "translateY(20px)",
          pointerEvents: open ? "all" : "none",
        }}
      >
        {/* Modern Header */}
        <div
          style={{
            background: "#25D366",
            background: "linear-gradient(90deg, #25D366 0%, #128C7E 100%)",
            color: "white",
            padding: "16px 20px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{ width: "8px", height: "8px", background: "#4ce417", borderRadius: "50%" }}></div>
            <span style={{ fontWeight: "600", letterSpacing: "0.5px" }}>Tithi AI Assistant</span>
          </div>
          <button
            onClick={() => setOpen(false)}
            style={{
              background: "rgba(255,255,255,0.2)",
              color: "white",
              border: "none",
              borderRadius: "50%",
              width: "24px",
              height: "24px",
              cursor: "pointer",
              fontSize: "12px"
            }}
          >
            ✕
          </button>
        </div>

        {/* Chat Body */}
        <div style={{ flex: 1, overflowY: "auto", background: "#f9f9f9" }}>
          <AIChat />
        </div>
      </div>
    </>
  );
}