import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { CheckCircle, ChevronRight, X, Sun, CloudSun, Moon } from "lucide-react";
import singlelayer from "../assets/mycollection/png/002-box.png"
import multilayer from "../assets/mycollection/png/003-parcel-protection.png"
import ac from "../assets/mycollection/png/004-technician.png"
import unpacking from "../assets/mycollection/png/001-unpacking.png"
import fan from "../assets/mycollection/png/006-ceiling-fan.png"
import bed from "../assets/mycollection/png/005-hotel-room.png"

const ADD_ON_CONFIG = {
  single_packing: {
    label: "Single Layer Packing",
    type: "percentage",
    value: 10
  },
  multi_packing: {
    label: "Multi-layer Bubble Wrap",
    type: "percentage",
    value: 20
  },
  unpacking: {
    label: "Unpacking All Items",
    type: "percentage",
    value: 25
  },
  ac_install: {
    label: "AC Installation",
    type: "quantity",
    price: 999
  },
  ac_uninstall: {
    label: "AC Uninstallation",
    type: "quantity",
    price: 799
  },
  fan: {
    label: "Ceiling Fan Install / Remove",
    type: "quantity",
    price: 179
  },
  bed: {
    label: "Bed Assembly / Dismantle",
    type: "quantity",
    price: 299
  }
};
  

const TIME_DATA = [
  { id: "morning", label: "Morning", range: "7 AM - 12 PM", icon: <Sun size={18} />, slots: ["07:00 AM", "08:00 AM", "09:00 AM", "10:00 AM", "11:00 AM"] },
  { id: "afternoon", label: "Afternoon", range: "12 PM - 5 PM", icon: <CloudSun size={18} />, slots: ["12:00 PM", "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM"] },
  { id: "evening", label: "Evening", range: "5 PM - 8 PM", icon: <Moon size={18} />, slots: ["05:00 PM", "06:00 PM", "07:00 PM", "08:00 PM"] }
];

export default function PackersMoverBooking() {
  const location = useLocation();
  const { priceBreakup } = location.state || {};
  const finalPrice = priceBreakup?.total || 0;
  
  useEffect(() => {
  if (!location.state?.bookingId) {
    window.location.href = "/";
  }
}, []);

  const confirmFinalBooking = async () => {


  const payload = {
  shiftingDate: selectedDate.fullDate.toISOString(),
  shiftingTime: selectedTime,
  addons: Object.values(selectedAddOns),
  addonsTotal: addOnTotal,
  basePrice: selectedDate.price,
  totalPayable
};


  try {
    const res = await fetch(
      `http://localhost:5000/api/bookings/${location.state.bookingId}/confirm`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );

    const data = await res.json();

    if (!data.success) {
      alert("Booking confirmation failed");
      return;
    }
    setBookingId(data.bookingId);
    setIsBookingComplete(true);
  } catch (err) {
    console.error(err);
    alert("Server error");
  }
};
  const [bookingId, setBookingId] = useState("");
  const [finalAmount, setFinalAmount] = useState(0);
  const [showTimeSheet, setShowTimeSheet] = useState(false);
  const [selectedTime, setSelectedTime] = useState("");
  const [activeSegment, setActiveSegment] = useState("morning");
const [selectedAddOns, setSelectedAddOns] = useState({
  single_packing: { selected: true }
});

  const [isBookingComplete, setIsBookingComplete] = useState(false);

  const calculateAddonTotal = () => {
  let total = 0;

  Object.entries(selectedAddOns).forEach(([key, data]) => {
    const config = ADD_ON_CONFIG[key];

    if (config.type === "percentage") {
      total += Math.round((selectedDate?.price * config.value) / 100);

    }

    if (config.type === "quantity") {
      total += config.price * data.quantity;
    }
  });

  return total;
};

const removeAddon = (key) => {
  setSelectedAddOns(prev => {
    const updated = { ...prev };
    delete updated[key];

    // Optional: ensure at least one packing remains selected
    if (!updated.single_packing && !updated.multi_packing) {
      updated.single_packing = { selected: true };
    }

    return updated;
  });
};


const togglePercentageAddon = (key) => {
  setSelectedAddOns(prev => {
    const updated = { ...prev };

    // Mutual exclusion
    if (key === "single_packing") {
      delete updated.multi_packing;
    }

    if (key === "multi_packing") {
      delete updated.single_packing;
    }

    // Toggle
    if (updated[key]) {
      delete updated[key];   // allow deselect
    } else {
      updated[key] = { selected: true };
    }

    return updated;
  });
};


const updateQuantity = (key, type) => {
  setSelectedAddOns(prev => {
    const copy = { ...prev };
    const currentQty = copy[key]?.quantity || 0;

    let newQty = type === "inc" ? currentQty + 1 : currentQty - 1;
    if (newQty < 0) newQty = 0;

    if (newQty === 0) {
      delete copy[key];
    } else {
      copy[key] = { quantity: newQty };
    }

    return copy;
  });
};


  // 1. DYNAMIC DATE GENERATOR (Unlimited 60 Days)
  const generateUnlimitedDates = (daysCount = 60) => {
    const days = [];
    for (let i = 0; i < daysCount; i++) {
      const d = new Date();
      d.setDate(d.getDate() + i);
      const isWeekend = d.getDay() === 0 || d.getDay() === 6;
      const dailyPrice = isWeekend ? Math.round(finalPrice * 1.01) : finalPrice;
      
      days.push({
        id: `date-${i}`,
        fullDate: d,
        dateNum: d.getDate(),
        month: d.toLocaleDateString('en-US', { month: 'short' }),
        dayName: d.toLocaleDateString('en-US', { weekday: 'short' }),
        price: dailyPrice,
        isWeekend
      });
    }
    return days;
  };

  const [dates] = useState(generateUnlimitedDates(60));
  const [selectedDate, setSelectedDate] = useState(dates[0]);

const to99Pricing = (amount) => {
  if (!amount) return 0;

  const rounded = Math.round(amount / 100) * 100;
  return rounded - 1;
};
  
  // 2. CALCULATIONS
  const toggleAddOn = (addon) => {
    setSelectedAddOns(prev => {
      const copy = { ...prev };
      if (copy[addon.id]) {
        delete copy[addon.id]; // Now users can deselect packing
      } else {
        copy[addon.id] = addon;
      }
      return copy;
    });
  };
  const addOnTotal = calculateAddonTotal();
const totalPayable =(selectedDate?.price || 0) + addOnTotal;


  const activeSlots = TIME_DATA.find(t => t.id === activeSegment)?.slots || [];
  
  return (
   <section className="w-full bg-slate-50 min-h-screen font-sans">
  <div className="max-w-6xl mx-auto px-6 lg:px-10 pb-40">

      
     {/* ================= PROFESSIONAL ANIMATED STEPPER ================= */}
<div className="w-full max-w-lg mx-auto px-6 pt-4 pb-10">
  <div className="relative flex items-center justify-between">
    
    {/* Background Progress Track */}
    <div className="absolute top-[18px] left-0 w-full h-[3px] bg-slate-100 -z-0 rounded-full" />
    
    {/* Active Progress Fill (Animated) */}
    {/* Since we are at Step 2, the width is 50%. On Step 3, it would be 100% */}
    <div 
      className="absolute top-[18px] left-0 h-[3px] bg-sky-600 -z-0 rounded-full transition-all duration-700 ease-in-out" 
      style={{ width: '50%' }} 
    />

    {[
      { id: 1, label: "Details", status: "complete" },
      { id: 2, label: "Items", status: "complete" },
      { id: 3, label: "Booking", status: "active" }
    ].map((step, idx) => (
      <div key={step.id} className="relative z-10 flex flex-col items-center group">
        
        {/* Step Circle */}
        <div className={`
          w-10 h-10 rounded-2xl flex items-center justify-center transition-all duration-500
          ${step.status === 'complete' ? 'bg-emerald-500 shadow-[0_4px_12px_rgba(16,185,129,0.3)]' : 
            step.status === 'active' ? 'bg-white border-2 border-sky-600 shadow-[0_0_15px_rgba(2,132,199,0.2)] scale-110' : 
            'bg-white border-2 border-slate-100 text-slate-300'}
        `}>
          {step.status === 'complete' ? (
            <svg className="w-5 h-5 text-white animate-in zoom-in duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
            </svg>
          ) : (
            <span className={`text-xs font-black ${step.status === 'active' ? 'text-sky-600' : 'text-slate-300'}`}>
              0{step.id}
            </span>
          )}
        </div>

        {/* Step Label */}
        <span className={`
          absolute -bottom-7 whitespace-nowrap text-[10px] font-black uppercase tracking-[0.1em] transition-colors duration-300
          ${step.status === 'active' ? 'text-sky-700' : 'text-slate-400'}
        `}>
          {step.label}
        </span>

        {/* Pulsing effect for Active Step */}
        {step.status === 'active' && (
          <span className="absolute top-0 left-0 w-10 h-10 bg-sky-400 rounded-2xl animate-ping opacity-20 -z-10" />
        )}
      </div>
    ))}
  </div>
</div>


      {/* 2. DATE SCROLLER */}
      {/* ================= 2. PROFESSIONAL DATE SELECTOR ================= */}
<div className="mb-14 mt-8">

  <div className="flex items-center justify-between mb-5">
    <h3 className="text-[15px] font-bold text-slate-800 uppercase tracking-wider">
      Select Shifting Date
    </h3>
    {selectedDate?.isWeekend && (
      <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-1 rounded border border-amber-100 animate-in fade-in duration-300">
        Peak Day Pricing
      </span>
    )}
  </div>

  {/* Date Grid/Scroll */}
  <div className="flex overflow-x-auto gap-3 pb-4 scrollbar-hide">
    {dates.map((d) => {
      const isSelected = selectedDate?.id === d.id;
      return (
        <button
          key={d.id}
         onClick={() => {
   setSelectedDate(d);
}}
          className="flex-shrink-0 focus:outline-none"
        >
          <div
            className={`
              w-[72px] h-[90px] rounded-xl border transition-all duration-200
              flex flex-col items-center justify-center
              ${isSelected 
                ? "bg-slate-900 border-slate-900 shadow-md" 
                : "bg-white border-slate-200 hover:border-slate-400"
              }
            `}
          >
            <span className={`text-[10px] font-bold uppercase ${isSelected ? "text-slate-400" : "text-slate-400"}`}>
              {d.month}
            </span>
            <span className={`text-xl font-bold my-0.5 ${isSelected ? "text-white" : "text-slate-900"}`}>
              {d.dateNum}
            </span>
            <span className={`text-[11px] font-medium ${isSelected ? "text-slate-400" : "text-slate-500"}`}>
              {d.dayName}
            </span>
          </div>
          
          {/* Base Price - Always Visible Under Card */}
          <div className="mt-2 text-center">
           <span
  className={`text-[13px] font-bold tracking-tight ${
    isSelected ? "text-slate-900" : "text-slate-600"
  }`}
>
  ₹{d.price}
</span>

          </div>
        </button>
      );
    })}
  </div>

  {/* Weekend High Price Message */}
 
</div>

      {/* 3. ADD-ONS */}

<div className="mb-16">

  {/* HEADER */}
  <div className="flex justify-between items-center mb-6">
    <div>
      <h3 className="text-lg font-semibold text-slate-900">
        Service Add-ons
      </h3>
      <p className="text-xs text-slate-500">
        Optional services to enhance your move
      </p>
    </div>

    <span className="text-[11px] font-semibold text-sky-600 bg-sky-50 px-3 py-1 rounded-full">
      {Object.keys(selectedAddOns).length} Selected
    </span>
  </div>

  {/* LIST */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

    {Object.entries(ADD_ON_CONFIG).map(([key, config]) => {
      const isSelected = !!selectedAddOns[key];

      const iconMap = {
        single_packing: singlelayer,
        multi_packing: multilayer,
        unpacking: unpacking,
        ac_install: ac,
        ac_uninstall: ac,
        fan: fan,
        bed: bed,
      };

     const descriptionMap = {
  single_packing:
    "Durable carton packing with protective wrapping for safe transport.",

  multi_packing:
    "Multi-layer bubble protection for fragile and high-value items.",

  unpacking:
    "Complete unpacking and item placement at your new location.",

  ac_install:
    "AC installation by trained technicians within 1–2 days after shifting.",

  ac_uninstall:
    "Safe dismantling and secure preparation of your AC before relocation.",

  fan:
    "Removal and re-installation of ceiling fans at destination.",

  bed:
    "Professional dismantling and re-assembly of beds.",
};


      const percentagePrice =
        config.type === "percentage"
          ? to99Pricing(
              Math.round((selectedDate?.price * config.value) / 100)
            )
          : null;

      return (
      <div
  key={key}
  className={`relative rounded-2xl p-4 transition-all duration-300 overflow-hidden
    ${isSelected
      ? "bg-gradient-to-br from-sky-50 to-white border border-sky-400 shadow-md"
      : "bg-white border border-slate-200 hover:shadow-sm"}
  `}
>
  {/* Left Accent Line when selected */}
  {isSelected && (
    <div className="absolute left-0 top-0 h-full w-1 bg-sky-500 rounded-r"></div>
  )}

  <div className="flex gap-3">
    
    {/* ICON */}
    <div className={`w-12 h-12 rounded-xl flex items-center justify-center p-2 shrink-0 transition-all
      ${isSelected
        ? "bg-white shadow-sm ring-1 ring-sky-100"
        : "bg-slate-50"}
    `}>
      <img
        src={iconMap[key]}
        alt={config.label}
        className="w-full h-full object-contain"
      />
    </div>

    {/* CONTENT */}
    <div className="flex-1 min-w-0">
      <p className="text-sm font-semibold text-slate-900">
        {config.label}
      </p>

      <p className="text-xs text-slate-500 mt-1 leading-snug">
        {descriptionMap[key]}
      </p>

      {/* PRICE + CONTROL */}
      <div className="flex justify-between items-center mt-3">
        <span className="text-base font-bold text-slate-900 tracking-tight">
          ₹{config.type === "percentage"
            ? percentagePrice
            : config.price}
        </span>

        {config.type === "percentage" ? (
          <button
            onClick={() => togglePercentageAddon(key)}
            className={`text-xs font-semibold px-4 py-1.5 rounded-lg transition-all duration-200
              ${isSelected
                ? "bg-sky-600 text-white shadow-sm"
                : "bg-slate-100 text-slate-700 hover:bg-sky-100 hover:text-sky-700"}
            `}
          >
            {isSelected ? "Added ✓" : "Add"}
          </button>
        ) : (
          <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-lg px-1.5 py-1 shadow-sm">
            <button
              onClick={() => updateQuantity(key, "dec")}
              disabled={!selectedAddOns[key]?.quantity}
              className="w-6 h-6 text-xs rounded-md text-slate-600 hover:bg-slate-100 disabled:opacity-30 transition"
            >
              −
            </button>

            <span className="text-xs font-semibold w-5 text-center text-slate-900">
              {selectedAddOns[key]?.quantity || 0}
            </span>

            <button
              onClick={() => updateQuantity(key, "inc")}
              className="w-6 h-6 text-xs rounded-md bg-sky-600 text-white hover:bg-sky-700 transition"
            >
              +
            </button>
          </div>
        )}
      </div>
    </div>
  </div>
</div>

      );
    })}
  </div>
</div>





      {/* 4. STICKY BAR */}
      <div className="fixed bottom-6 inset-x-0 z-[100] px-4">
  <div className="max-w-2xl mx-auto 
                  bg-white 
                  border border-slate-200 
                  rounded-2xl 
                  shadow-lg 
                  px-6 py-4 
                  flex items-center justify-between">

    {/* LEFT: Price Section */}
    <div className="flex flex-col">
      <span className="text-[11px] text-slate-400 uppercase tracking-wide font-medium">
        Total Payable
      </span>
      <span className="text-2xl font-bold text-slate-900 leading-tight">
        ₹{totalPayable}
      </span>
    </div>

    {/* RIGHT: CTA */}
    <button
      onClick={() => setShowTimeSheet(true)}
      className="inline-flex items-center gap-2
                 bg-sky-600 text-white
                 px-6 py-3
                 rounded-xl
                 text-sm font-medium
                 hover:bg-sky-700
                 transition-all duration-200
                 active:scale-95"
    >
      Book Shifting
      <ChevronRight size={16} strokeWidth={2} />
    </button>

  </div>
</div>

      {/* 5. TIME SHEET */}
     {/* ================= TIME SELECTION BOTTOM SHEET ================= */}
{/* ================= COMPACT TIME SELECTION BOTTOM SHEET ================= */}
<div 
  className={`fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[110] transition-opacity ${showTimeSheet ? "opacity-100" : "opacity-0 pointer-events-none"}`} 
  onClick={() => setShowTimeSheet(false)} 
/>

<div 
  className={`fixed inset-x-0 bottom-0 z-[120] bg-white rounded-t-[32px] shadow-2xl transition-transform duration-500 transform ${showTimeSheet ? "translate-y-0" : "translate-y-full"}`}
>
  <div className="max-w-xl mx-auto flex flex-col max-h-[70vh]">
    {/* Header Section */}
    <div className="px-8 pt-6 pb-4">
      <div className="w-10 h-1 bg-slate-200 rounded-full mx-auto mb-6" />
      <h3 className="text-md font-black text-slate-900 mb-5 tracking-tight">Select Arrival Time</h3>
      
      {/* Segmented Control - Slim Version */}
      <div className="flex bg-slate-100 p-1 rounded-xl gap-1 mb-2">
        {TIME_DATA.map((tab) => (
          <button 
            key={tab.id} 
            onClick={() => setActiveSegment(tab.id)} 
            className={`flex-1 py-2.5 rounded-lg text-[12px] font-bold uppercase tracking-tight transition-none flex items-center justify-center gap-2 ${activeSegment === tab.id ? "bg-white shadow-sm text-slate-900" : "text-slate-500"}`}
          >
            <span className="opacity-70">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>
    </div>

    {/* Compact Grid Time Slots */}
        <div className="px-8 py-6 overflow-y-auto">
  <div className="grid grid-cols-3 gap-4">
    {activeSlots.map((slot) => {
      const isSelected = selectedTime === slot;

      return (
        <button
          key={slot}
          onClick={() => setSelectedTime(slot)}
          className={`py-3 rounded-xl border text-sm font-medium transition-all duration-200
            ${
              isSelected
                ? "border-sky-600 bg-sky-50 text-sky-700 shadow-sm"
                : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50"
            }
          `}
        >
          {slot}
        </button>
      );
    })}
  </div>

  <p className="mt-8 text-xs text-slate-400 text-center">
    Our team will arrive within the selected time slot.
  </p>
</div>

    {/* Action Button */}
   <div className="px-8 pb-8">
  <button
    disabled={!selectedTime}
    onClick={async () => {
      await confirmFinalBooking();
      setShowTimeSheet(false);
    }}
    className={`w-full py-3 rounded-xl text-sm font-medium transition-all duration-200
      ${
        selectedTime
          ? "bg-sky-600 text-white hover:bg-sky-700 shadow-sm"
          : "bg-slate-100 text-slate-400 cursor-not-allowed"
      }
    `}
  >
    {selectedTime ? `Confirm ${selectedTime}` : "Select a time slot"}
  </button>
</div>

  </div>
</div>

{isBookingComplete && (
  <div className="fixed inset-0 z-[1000] bg-white flex items-center justify-center px-6">
    
    <div className="w-full max-w-md text-center">

      {/* Success Icon */}
      <div className="mb-10 flex justify-center">
        <div className="relative">
          
          {/* Soft Glow */}
          <div className="absolute inset-0 bg-emerald-100 rounded-full blur-2xl opacity-60"></div>

          {/* Circle */}
          <div className="relative w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center shadow-sm">
            <svg
              className="w-9 h-9 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="3"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>
      </div>

      {/* Heading */}
      <h2 className="text-2xl font-semibold text-slate-900 mb-3">
        Booking Confirmed
      </h2>

      <p className="text-sm text-slate-500 leading-relaxed mb-10">
        Your shifting has been successfully scheduled.  
        Our team will contact you shortly for confirmation.
      </p>

      {/* Summary Card */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 mb-10 text-left">

        <div className="flex justify-between mb-4">
          <div>
            <p className="text-xs text-slate-400 uppercase tracking-wide">
              Date & Time
            </p>
            <p className="text-sm font-medium text-slate-900">
              {selectedDate?.dateNum} {selectedDate?.month} • {selectedTime}
            </p>
          </div>

          <div className="text-right">
            <p className="text-xs text-slate-400 uppercase tracking-wide">
              Booking ID
            </p>
            <p className="text-sm font-medium text-slate-900">
              {bookingId.slice(-6).toUpperCase()}
            </p>
          </div>
        </div>

        <div className="border-t border-slate-200 pt-4 flex justify-between">
          <span className="text-sm text-slate-600">
            Total Amount
          </span>
          <span className="text-lg font-semibold text-slate-900">
            ₹{totalPayable}
          </span>
        </div>

      </div>

      {/* CTA */}
      <button
        onClick={() => window.location.href = "/"}
        className="w-full py-3 rounded-xl bg-sky-600 text-white text-sm font-medium hover:bg-sky-700 transition"
      >
        Go to Dashboard
      </button>

    </div>
  </div>
)}

      </div>
    </section>
    
  );
}