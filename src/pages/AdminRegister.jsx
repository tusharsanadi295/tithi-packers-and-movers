import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { User, Mail, Phone, Lock, UserPlus, ArrowRight, AlertCircle } from "lucide-react";

export default function AdminRegister() {
  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const submit = async () => {
    if (!form.name || !form.email || !form.password) {
      setError("Please fill all required fields");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (data.success) {
        navigate("/AdminLogin");
      } else {
        setError(data.message || "Registration failed");
      }
    } catch (err) {
      setError("Connection error. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center p-4">
      {/* Background Glow */}
      <div className="fixed top-0 right-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-[-5%] right-[-5%] w-[35%] h-[35%] bg-sky-100/40 rounded-full blur-3xl"></div>
      </div>

      <div className="w-full max-w-lg">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-white rounded-2xl shadow-sm border border-slate-100 mb-4 text-sky-500">
            <UserPlus size={28} />
          </div>
          <h1 className="text-2xl font-black text-slate-800 tracking-tight">CREATE ADMIN</h1>
          <p className="text-slate-500 text-sm">Register a new administrator account</p>
        </div>

        <div className="bg-white p-8 rounded-[32px] shadow-xl shadow-slate-200/50 border border-slate-100">
          {error && (
            <div className="mb-6 flex items-center gap-2 bg-rose-50 text-rose-600 p-4 rounded-2xl border border-rose-100 text-sm font-bold animate-pulse">
              <AlertCircle size={18} />
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Name */}
            <div className="md:col-span-2 space-y-1.5">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  placeholder="John Doe"
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500 outline-none text-sm transition-all"
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  type="email"
                  placeholder="admin@info.com"
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500 outline-none text-sm transition-all"
                />
              </div>
            </div>

            {/* Mobile */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Mobile Number</label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  placeholder="+91 0000000000"
                  onChange={e => setForm({ ...form, mobile: e.target.value })}
                  className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500 outline-none text-sm transition-all"
                />
              </div>
            </div>

            {/* Password */}
            <div className="md:col-span-2 space-y-1.5">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  type="password"
                  placeholder="••••••••"
                  onChange={e => setForm({ ...form, password: e.target.value })}
                  className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500 outline-none text-sm transition-all"
                />
              </div>
            </div>

            {/* Submit */}
            <button 
              onClick={submit}
              disabled={loading}
              className="md:col-span-2 w-full bg-slate-900 hover:bg-sky-600 text-white font-black py-4 rounded-2xl shadow-lg transition-all duration-300 flex items-center justify-center gap-2 group mt-2 disabled:opacity-50"
            >
              {loading ? "CREATING ACCOUNT..." : "REGISTER ADMIN"}
              {!loading && <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />}
            </button>
          </div>

          <div className="mt-6 text-center">
            <p className="text-slate-500 text-xs font-bold uppercase tracking-tighter">
              Already have an account?{" "}
              <Link to="/AdminLogin" className="text-sky-500 hover:underline ml-1">Login here</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}