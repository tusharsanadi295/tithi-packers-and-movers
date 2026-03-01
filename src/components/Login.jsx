import React, { useState } from "react";
import { Mail, Phone } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import security from "../assets/security.json"
import { Loader2, ArrowRight } from 'lucide-react';
export default function CustomerLogin() {
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
const handleSendOtp = async () => {
    if (!mobile || !email) {
    alert("Enter mobile and email");
    return;
  }

  setLoading(true);

  const res = await fetch("http://localhost:5000/api/customer/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ mobile, email })
  });

  const data = await res.json();
 
  if (!data.success) {
    setLoading(false);
    alert(data.message);
    return;
  }

  // Save temporarily
  navigate("/verify-otp", { state: { mobile, email } });
};

  return (
    <>
 {loading && (
  <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center">
    <div className="w-64 flex flex-col items-center">
      <Lottie animationData={security} loop />
      <p className="text-sm text-slate-600 mt-4 tracking-wide">
        Sending OTP to your email...
      </p>
    </div>
  </div>
)}
    <section className="min-h-screen bg-[#f8fafc] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-[2rem] border border-slate-200 shadow-xl shadow-slate-200/50 p-10">
        
        {/* Header Section */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-sky-50 text-sky-600 mb-4 ring-8 ring-sky-50/50">
            <Mail size={32} />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Welcome Back
          </h1>
          <p className="text-sm text-slate-500 mt-2 font-medium">
            Enter your details to receive an access code
          </p>
        </div>

        <div className="space-y-6">
          {/* Mobile Input */}
          <div className="group">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1 mb-2 block">
              Mobile Number
            </label>
            <div className="relative flex items-center bg-slate-50 border-2 border-slate-100 rounded-2xl px-4 py-3.5 transition-all duration-200 focus-within:border-sky-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-sky-50">
              <Phone size={18} className="text-slate-400 mr-3 group-focus-within:text-sky-500 transition-colors" />
              <input
                type="tel"
                placeholder="98765 43210"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                className="w-full bg-transparent outline-none text-slate-900 font-medium placeholder:text-slate-300"
              />
            </div>
          </div>

          {/* Email Input */}
          <div className="group">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1 mb-2 block">
              Email Address
            </label>
            <div className="relative flex items-center bg-slate-50 border-2 border-slate-100 rounded-2xl px-4 py-3.5 transition-all duration-200 focus-within:border-sky-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-sky-50">
              <Mail size={18} className="text-slate-400 mr-3 group-focus-within:text-sky-500 transition-colors" />
              <input
                type="email"
                placeholder="name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent outline-none text-slate-900 font-medium placeholder:text-slate-300"
              />
            </div>
          </div>

          {/* Submit Button */}
         <button
  onClick={handleSendOtp}
  disabled={loading}
  className={`w-full group relative flex items-center justify-center gap-2 py-4 rounded-2xl text-sm font-bold tracking-wide transition-all duration-300 active:scale-[0.98] 
    ${loading 
      ? "bg-slate-100 text-slate-400 cursor-not-allowed" 
      : "bg-sky-600 text-white hover:bg-sky-800 shadow-lg shadow-sky-200 hover:shadow-xl hover:shadow-sky-300/50"
    }`}
>
  {loading ? (
    <>
      <Loader2 className="animate-spin" size={18} />
      Processing...
    </>
  ) : (
    <>
      Send Verification Code
      <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
    </>
  )}
</button>
        </div>

        {/* Footer Info */}
        <div className="mt-10 flex flex-col items-center gap-4">
          <div className="h-px w-16 bg-slate-100" />
          <p className="text-[11px] text-slate-400 text-center leading-relaxed max-w-[240px]">
            By continuing, you'll receive a secure OTP to your registered email for authentication.
          </p>
        </div>
      </div>
    </section>
    </>
  );
  
}