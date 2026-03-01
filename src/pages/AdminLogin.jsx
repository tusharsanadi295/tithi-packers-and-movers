import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lock, User, ArrowRight, ShieldCheck, AlertCircle } from "lucide-react";

export default function AdminLogin() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const submit = async () => {
    setLoading(true);
    setError(""); // Purane error ko clear karein

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ login, password }),
      });

      const data = await res.json();

      if (data.success) {
        localStorage.setItem("token", data.token);
        navigate("/admin/dashboard");
      } else {
        setError(data.message || "Invalid credentials");
      }
    } catch (err) {
      setError("Server connection failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center p-4">
      {/* Background Gradients */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-sky-100/50 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-50 rounded-full blur-3xl"></div>
      </div>

      <div className="w-full max-w-md">
        {/* Top Icon & Title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-3xl shadow-sm border border-slate-100 mb-4">
            <ShieldCheck size={32} className="text-sky-500" />
          </div>
          <h1 className="text-2xl font-black text-slate-800 tracking-tight">ADMIN ACCESS</h1>
          <p className="text-slate-500 text-sm">Secure login for management</p>
        </div>

        {/* Login Form Card */}
        <div className="bg-white p-8 rounded-[32px] shadow-xl shadow-slate-200/50 border border-slate-100 transition-all">
          
          {/* Error Message */}
          {error && (
            <div className="mb-6 flex items-center gap-2 bg-rose-50 text-rose-600 p-4 rounded-2xl border border-rose-100 text-sm font-bold animate-shake">
              <AlertCircle size={18} />
              {error}
            </div>
          )}

          <div className="space-y-5">
            {/* Input Email/Mobile */}
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                Identity
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User size={18} className="text-slate-400 group-focus-within:text-sky-500 transition-colors" />
                </div>
                <input
                  type="text"
                  placeholder="Email or Mobile"
                  onChange={(e) => setLogin(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && submit()}
                  className="block w-full pl-11 pr-4 py-4 bg-slate-50 border border-slate-200 text-slate-700 rounded-2xl focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500 focus:bg-white transition-all outline-none text-sm font-medium"
                />
              </div>
            </div>

            {/* Input Password */}
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                Secret Password
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock size={18} className="text-slate-400 group-focus-within:text-sky-500 transition-colors" />
                </div>
                <input
                  type="password"
                  placeholder="••••••••"
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && submit()}
                  className="block w-full pl-11 pr-4 py-4 bg-slate-50 border border-slate-200 text-slate-700 rounded-2xl focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500 focus:bg-white transition-all outline-none text-sm font-medium"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              onClick={submit}
              disabled={loading}
              className="w-full bg-slate-900 hover:bg-sky-600 text-white font-black py-4 rounded-2xl shadow-lg shadow-slate-200 hover:shadow-sky-200 transition-all duration-300 flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  ENTER DASHBOARD
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </div>
        </div>

        {/* System Status Footer */}
        <div className="mt-8 flex items-center justify-center gap-4">
           <div className="h-[1px] w-8 bg-slate-200"></div>
           <p className="text-slate-400 text-[10px] uppercase tracking-widest font-black">
             Server Status: <span className="text-emerald-500">Online</span>
           </p>
           <div className="h-[1px] w-8 bg-slate-200"></div>
        </div>
      </div>
    </div>
  );
}