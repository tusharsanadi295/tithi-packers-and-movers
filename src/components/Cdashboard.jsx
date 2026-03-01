import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, Clock, LogOut } from "lucide-react";
import { ChevronRight, Package, Receipt } from 'lucide-react';
export default function CustomerDashboard() {

  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();

  const mobile = localStorage.getItem("mobile");
  const email = localStorage.getItem("email");
  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    const token = localStorage.getItem("customerToken");

const res = await fetch(
  "http://localhost:5000/api/customer/bookings",
  {
    headers: 
    {
      Authorization: `Bearer ${token}`
    }
  }
);
    const data = await res.json();

    if (data.success) {
      setBookings(data.bookings);
    }
console.log("API RESPONSE:", data);
  };

  const logout = () => {
    localStorage.removeItem("customerToken");
    localStorage.setItem("mobile", mobile);   // ✅ ADD
    localStorage.setItem("email", email);  
    navigate("/login");
  };

  const currentBooking = bookings.find(
    (b) => b.status !== "confirmed"
  );

  const pastBookings = bookings.filter(
  (b) => b.status?.trim().toLowerCase() === "completed"
);
  const getStatusStyles = (status) => {
    const styles = {
      completed: "bg-emerald-50 text-emerald-700 border-emerald-100",
      pending: "bg-amber-50 text-amber-700 border-amber-100",
      cancelled: "bg-rose-50 text-rose-700 border-rose-100",
      default: "bg-sky-50 text-sky-700 border-sky-100"
    };
    return styles[status?.toLowerCase()] || styles.default;
  };
  
  return (
   <section className="min-h-screen bg-[#/f8fafc]">
      {/* Header - Added Glassmorphism effect on scroll potential */}
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-slate-200 px-6 py-4">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold tracking-tight text-slate-900">
            My Bookings
          </h1>
          <button
            onClick={logout}
            className="group flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-slate-600 hover:bg-rose-50 hover:text-rose-600 transition-all duration-200"
          >
            <LogOut size={18} className="group-hover:-translate-x-1 transition-transform" />
            Logout
          </button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-10">
        
        {/* Current Booking Section */}
        {currentBooking ? (
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-2 w-2 rounded-full bg-sky-500 animate-pulse" />
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500">
                Active Moving Plan
              </h2>
            </div>

            <div className="relative overflow-hidden bg-white rounded-2xl border border-slate-200 shadow-xl shadow-slate-200/50">
              {/* Subtle accent bar */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-sky-400 to-indigo-500" />
              
              <div className="p-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Tracking Number</span>
                    <p className="text-2xl font-mono font-bold text-slate-900">
                      TPM-{currentBooking._id.slice(-6).toUpperCase()}
                    </p>
                  </div>
                  
                  <div className={`self-start px-4 py-1.5 rounded-full border text-xs font-bold uppercase tracking-wide ${getStatusStyles(currentBooking.status)}`}>
                    {currentBooking.status}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 text-slate-600">
                      <div className="p-2 bg-slate-50 rounded-lg">
                        <Calendar size={20} className="text-sky-600" />
                      </div>
                      <div>
                        <p className="text-xs text-slate-400 font-medium">Shifting Date</p>
                        <p className="font-semibold">{new Date(currentBooking.shiftingDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-slate-600">
                      <div className="p-2 bg-slate-50 rounded-lg">
                        <Clock size={20} className="text-sky-600" />
                      </div>
                      <div>
                        <p className="text-xs text-slate-400 font-medium">Pickup Window</p>
                        <p className="font-semibold">{currentBooking.shiftingTime}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-slate-50 rounded-xl p-6 flex flex-col justify-center items-end">
                    <p className="text-sm text-slate-500 mb-1">Total Quote</p>
                    <p className="text-3xl font-black text-slate-900">
                      ₹{currentBooking.finalAmount.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : null}

        {/* Past Bookings Section */}
        <div>
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-4 flex items-center gap-2">
            <Receipt size={16} />
            Booking History
          </h2>

          <div className="grid gap-3">
            {pastBookings.length > 0 ? (
              pastBookings.map((booking) => (
                <div
                  key={booking._id}
                  className="group bg-white border border-slate-200 rounded-xl p-4 flex items-center justify-between hover:border-sky-200 hover:shadow-md transition-all cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-sky-50 group-hover:text-sky-500 transition-colors">
                      <Package size={20} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900 group-hover:text-sky-600 transition-colors">
                        TPM-{currentBooking._id.slice(-6).toUpperCase()}
                      </p>
                      <p className="text-xs font-medium text-slate-400">
                        Completed on {new Date(booking.shiftingDate).toDateString()}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    <span className="text-sm font-bold text-slate-700">
                      ₹{booking.finalAmount.toLocaleString()}
                    </span>
                    <ChevronRight size={18} className="text-slate-300 group-hover:text-slate-500 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-20 border-2 border-dashed border-slate-200 rounded-2xl">
                <div className="bg-slate-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Package className="text-slate-300" size={32} />
                </div>
                <p className="text-slate-500 font-medium">No past bookings found.</p>
                <p className="text-sm text-slate-400">Your completed journeys will appear here.</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </section>
  );
}