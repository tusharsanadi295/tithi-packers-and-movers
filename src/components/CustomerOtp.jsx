import React, { useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Lottie from "lottie-react";
import verify from "../assets/Verify.json";
import { ShieldCheck, ArrowLeft, RefreshCw } from "lucide-react";

export default function CustomerOtp() {
  const navigate = useNavigate();
  const location = useLocation();

  const { mobile, email } = location.state || {};

  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [activeInput, setActiveInput] = useState(0);
  const [success, setSuccess] = useState(false);

  const inputRefs = useRef([]);

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (isNaN(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleVerifyOtp = async () => {
    const finalOtp = otp.join("");

    if (finalOtp.length !== 6) {
      alert("Enter complete OTP");
      return;
    }

    const res = await fetch("http://localhost:5000/api/customer/verify-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mobile, email, otp: finalOtp })
    });

    const data = await res.json();

    if (!data.success) {
      alert(data.message);
      return;
    }

    localStorage.setItem("customerToken", data.token);

    setSuccess(true);

    setTimeout(() => {
      navigate("/dashboard");
    }, 1500);
  };

  return (
    <>
      {success && (
        <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
          <div className="w-80 text-center">
            <Lottie animationData={verify} loop={false} />
            <p className="text-lg font-semibold text-emerald-600 mt-4">
              Login Successful
            </p>
          </div>
        </div>
      )}

      <section className="min-h-screen bg-slate-50 flex flex-col items-center justify-center px-4 font-sans">
        <div className="w-full max-w-md bg-white p-10 rounded-[2.5rem] border border-slate-200 shadow-2xl shadow-slate-200/60">
          
          <div className="mb-8 flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-sky-50 rounded-2xl flex items-center justify-center mb-4 ring-8 ring-sky-50/50">
              <ShieldCheck className="text-sky-600" size={32} />
            </div>

            <h2 className="text-2xl font-bold text-slate-900">
              Security Verification
            </h2>

            <p className="text-slate-500 mt-2 text-sm">
              Enter the 6-digit code sent to <br />
              <span className="font-semibold text-slate-900">
                {email}
              </span>
            </p>
          </div>

          {/* OTP Inputs */}
          <div className="flex justify-between gap-2 mb-10">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onFocus={() => setActiveInput(index)}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className={`w-full h-14 text-center text-2xl font-bold rounded-2xl border-2 outline-none transition
                  ${activeInput === index
                    ? "border-sky-500 ring-4 ring-sky-50 bg-white"
                    : "border-slate-200 bg-slate-50 text-slate-600"}
                `}
              />
            ))}
          </div>

          <button
            onClick={handleVerifyOtp}
            className="w-full py-4 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl text-base font-semibold transition active:scale-[0.98]"
          >
            Verify & Continue
          </button>

          <div className="flex flex-col items-center gap-4 mt-6">
            <div className="h-px w-full bg-slate-100" />
            <button className="flex items-center gap-1 text-sky-600 text-sm font-semibold hover:text-sky-700">
              <RefreshCw size={14} />
              Resend OTP
            </button>
          </div>
        </div>
      </section>
    </>
  );
}