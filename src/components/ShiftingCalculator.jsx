import React, { useEffect, useRef, useState } from "react";
import {
  MapPin,
  Calendar,
  Home,
  Phone,
  Briefcase,
  ArrowRight,
  ShieldCheck,
  Clock,
  UserCircle,
  Mail,
  AlertCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import packersIcon from "../assets/packing.png";
import tempoIcon from "../assets/icon2.png";
import acIcon from "../assets/icon3.png";
import cleaningIcon from "../assets/icon4.png";
import Lottie from "lottie-react";
import loaderAnimation from "../assets/loader.json";

export default function ShiftingCalculator({ defaultPickupArea,onlyPackers = false, }) {
  
  const allServices = [
  { id: "packers", label: "Packers & Movers", icon: packersIcon },
  { id: "tempo", label: "Tempo / Truck", icon: tempoIcon },
  { id: "ac", label: "AC Relocation", icon: acIcon },
  { id: "cleaning", label: "Cleaning", icon: cleaningIcon },
];

const services = onlyPackers
  ? allServices.filter((s) => s.id === "packers")
  : allServices;

  useEffect(() => {
  if (defaultPickupArea) {
    setPickup(
      defaultPickupArea.charAt(0).toUpperCase() +
      defaultPickupArea.slice(1) +
      ", Surat"
    );
  }
}, [defaultPickupArea]);


  const navigate = useNavigate();
const [showCalculator, setShowCalculator] = useState(false);
const [pickupPredictions, setPickupPredictions] = useState([]);
const [dropPredictions, setDropPredictions] = useState([]);
  const pickupRef = useRef(null);
  const dropRef = useRef(null);
const [pickupLift, setPickupLift] = useState(true);
const [dropLift, setDropLift] = useState(true);
const [timeSlot, setTimeSlot] = useState("");
const timeSlots = [
  "08:00 AM – 10:00 AM",
  "10:00 AM – 12:00 PM",
  "12:00 PM – 02:00 PM",
  "02:00 PM – 04:00 PM",
  "04:00 PM – 06:00 PM",
  "06:00 PM – 08:00 PM",
];
const calculateDistance = (origin, destination) => {
  if (!origin || !destination || !window.google) return;

  const service = new window.google.maps.DistanceMatrixService();
  service.getDistanceMatrix(
    {
      origins: [origin],
      destinations: [destination],
      travelMode: "DRIVING",
      unitSystem: window.google.maps.UnitSystem.METRIC,
    },
    (res, status) => {
      if (status === "OK") {
        const el = res.rows[0].elements[0];
        if (el.status === "OK") {
          const km = Math.round(el.distance.value / 1000);
          setDistance(km);
        }
      }
    }
  );
};
const [loading, setLoading] = useState(false);

const [pickupFloor, setPickupFloor] = useState("");
const [dropFloor, setDropFloor] = useState("");
const [pickupLiftAvailable, setPickupLiftAvailable] = useState(true);
const [dropLiftAvailable, setDropLiftAvailable] = useState(true);
const LiftToggle = ({ value, onChange }) => (
  <div className="flex items-center gap-2">
    <button
      type="button"
      onClick={() => onChange(true)}
      className={`px-3 py-1.5 text-xs rounded-full border transition
        ${value ? "bg-sky-600 text-white border-sky-600" : "bg-white text-slate-600 border-slate-300"}
      `}
    >
      Yes
    </button>

    <button
      type="button"
      onClick={() => onChange(false)}
      className={`px-3 py-1.5 text-xs rounded-full border transition
        ${!value ? "bg-red-500 text-white border-red-500" : "bg-white text-slate-600 border-slate-300"}
      `}
    >
      No
    </button>
  </div>
);

const [moveType, setMoveType] = useState("inside"); 
// inside = Move Inside City
// outside = Move to Another City
  const [pickupLoading, setPickupLoading] = useState(false);
const [dropLoading, setDropLoading] = useState(false);
  const [locationError, setLocationError] = useState("");
  const [errors, setErrors] = useState({});
  const [serviceType, setServiceType] = useState("packers");
  const [pickup, setPickup] = useState("");
  const [drop, setDrop] = useState("");
  const today = new Date().toISOString().split("T")[0];
  const [date, setDate] = useState(today);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [size, setSize] = useState("");
  const [mobile, setMobile] = useState("");
  const [distance, setDistance] = useState(null);
  const SURAT_CENTER = { lat: 21.1702, lng: 72.8311 }; // Surat coordinates
  useEffect(() => {
  if (location.state?.scrollTo) {
    const el = document.getElementById(location.state.scrollTo);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  } else {
    window.scrollTo({ top: 0 });
  }
}, []);


  /* ================= GOOGLE API ================= */

useEffect(() => {
  if (!window.google) {
    console.error("Google Maps Script not loaded!");
  }
}, []);

// Typing aur Suggestions ke liye Functions
const pickupDebounceRef = useRef(null);

const onPickupChange = (e) => {
  const val = e.target.value;
  setPickup(val);

  if (pickupDebounceRef.current) {
    clearTimeout(pickupDebounceRef.current);
  }

  pickupDebounceRef.current = setTimeout(() => {

    if (val.length > 2 && window.google) {

      setPickupLoading(true); // 🔥 YAHAN lagana hai (API call se pehle)

      const service = new window.google.maps.places.AutocompleteService();

      service.getPlacePredictions(
        {
          input: val,
          componentRestrictions: { country: "in" },
          locationBias: {
            radius: 50000,
            center: { lat: 21.1702, lng: 72.8311 },
          },
        },
        (predictions) => {
          setPickupPredictions(predictions || []);
          setPickupLoading(false); // 🔥 YAHAN lagana hai (response ke baad)
        }
      );

    } else {
      setPickupPredictions([]);
      setPickupLoading(false);   }

  }, 400);
};


const dropDebounceRef = useRef(null);

const onDropChange = (e) => {
  const val = e.target.value;
  setDrop(val);

  if (dropDebounceRef.current) {
    clearTimeout(dropDebounceRef.current);
  }

  dropDebounceRef.current = setTimeout(() => {

    if (val.length > 2 && window.google) {

      setDropLoading(true);

      const service = new window.google.maps.places.AutocompleteService();

      service.getPlacePredictions(
        {
          input: val,
          componentRestrictions: { country: "in" },
        },
        (predictions) => {
          setDropPredictions(predictions || []);
          setDropLoading(false);
        }
      );

    } else {
      setDropPredictions([]);
      setDropLoading(false);
    }

  }, 400);
};


// Selection Handler
const handleSelectPlace = (place, type) => {
  const address = place.description;

  if (type === 'pickup') {
    // Check if the selected address belongs to Surat or within 50km
    const service = new window.google.maps.DistanceMatrixService();
    service.getDistanceMatrix(
      {
        origins: [{ lat: 21.1702, lng: 72.8311 }], // Surat Center
        destinations: [address],
        travelMode: "DRIVING",
      },
      (res, status) => {
        if (status === "OK") {
          const element = res.rows[0].elements[0];
          
          if (element.status === "OK") {
            const distInKm = element.distance.value / 1000;

            if (distInKm > 50) {
              // Agar 50km se bahar hai
              setLocationError("Currently, our pickup services are exclusively available Surat.");
              setPickup(""); 
              setPickupPredictions([]);
              setTimeout(() => setLocationError(""), 6000);
            } else {
              // Agar area sahi hai
              setLocationError(""); 
              setPickup(address);
              setPickupPredictions([]);
              if (drop) calculateDistance(address, drop);
            }
          } else {
            // Agar Google distance calculate nahi kar paya
            setLocationError("We couldn't verify this location. Please select a spot within Surat.");
          }
        }
      }
    );
  } else {
    // Drop location ke liye no restriction
    setDrop(address);
    setDropPredictions([]);
    if (pickup) calculateDistance(pickup, address);
  }
};

  /* ================= SUBMIT ================= */
const submitHandler = async (e) => {
  // submitHandler ke andar shuruat mein ye add karein:
if (pickup && !pickup.toLowerCase().includes("surat") && distance > 50) {
  alert("Hum abhi sirf Surat area mein pickup provide karte hain.");
  return;
}
  if (e) e.preventDefault();

  let newErrors = {};

  if (!name || name.trim() === "") newErrors.name = "Name is missing";

  const mobileRegex = /^[6-9]\d{9}$/;
  if (!mobile) newErrors.mobile = "Mobile number is required";
  else if (!mobileRegex.test(mobile))
    newErrors.mobile = "Invalid mobile number";

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email))
    newErrors.email = "Invalid email";

  if (Object.keys(newErrors).length > 0) {
    setErrors(newErrors);
    return;
  }

  setLoading(true);
  const payload = {
    serviceType,
    name,
    email,
    mobile,
    pickup,
    drop,
    date,
    size,
    distance,
    pickupLift: pickupLiftAvailable,
    pickupFloorNo: pickupLiftAvailable ? 0 : Number(pickupFloor),
    dropLift: dropLiftAvailable,
    dropFloorNo: dropLiftAvailable ? 0 : Number(dropFloor),
  };

  try {
    const res = await fetch("http://localhost:5000/api/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (!data.success || !data.booking?._id) {
      setLoading(false);
      alert("Booking creation failed");
      return;
    }

    navigate("/packermover", {
      state: {
        ...payload,
        _id: data.booking._id,
      },
    });

  } catch (err) {
    console.error(err);
    alert("Server error");
  } finally {
    setLoading(false); // 🔥 STOP LOADING
  }
};



  return (
    <section id="shiftingcalculator" className="bg-gradient-to-b from-slate-50 via-sky-50/40 to-white py-16">
      <div className="max-w-6xl mx-auto px-4">
        {/* Top heading */}
        {!onlyPackers && (
        <div className="text-center mb-10">
          <span className="text-[10px] font-bold uppercase tracking-[0.1em] text-slate-500">Instant Quotes · Pan India</span>
      <h2 className="text-3xl md:text-5xl font-[900] text-slate-900 tracking-tight leading-tight">
        Get an instant estimate <br className="hidden md:block" />
        <span className="text-sky-600 italic">for your move</span>
      </h2>
      <p className="mt-4 text-slate-500 text-sm md:text-lg max-w-2xl mx-auto font-medium">
        Complete 3 simple steps to get an accurate price from our verified shifting partners.
      </p>
        </div>)}

        {/* Main card */}
        <div className="bg-white/90 backdrop-blur-sm border border-slate-100 rounded-3xl shadow-[0_24px_60px_rgba(15,23,42,0.10)] overflow-hidden">
          <div className="grid md:grid-cols-[3fr,2fr]">
            {/* Left: Form */}
            <div className="p-6 md:p-8 lg:p-10 border-b md:border-b-0 md:border-r border-slate-100">
              <div className="text-center mb-10">

  {/* Small Step Label */}

  {/* Main Big Heading */}
<div className="text-center mb-10">
          <span className="text-[10px] font-bold uppercase tracking-[0.1em] text-slate-500">Instant Quotes · Pan India</span>
      <h2 className="text-3xl md:text-5xl font-[900] text-slate-900 tracking-tight leading-tight">
        Get an instant estimate <br className="hidden md:block" />
        <span className="text-sky-600 italic">for your move</span>
      </h2>
      <p className="mt-4 text-slate-500 text-sm md:text-lg max-w-2xl mx-auto font-medium">
        Complete 3 simple steps to get an accurate price from our verified shifting partners.
      </p>
        </div>


  {/* Sub Heading */}
  

  {/* Subtle Divider */}
  <div className="mt-6 h-px w-32 mx-auto 
                  bg-gradient-to-r 
                  from-transparent via-sky-300 to-transparent"></div>

</div>


              <div className="space-y-8">
                {/* Service Type */}
                {!onlyPackers && (
                <div>
                  <label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-600">
                    <Briefcase className="h-4 w-4 text-sky-600" />
                    Choose service
                  </label>

                  {/* ================= Service Type ================= */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-3">
  {services.map((service) => {
    const active = serviceType === service.id;

    return (
      <button
        key={service.id}
        type="button"
        onClick={() => setServiceType(service.id)}
        className={`relative rounded-2xl border px-3 py-3 sm:px-4 sm:py-4 text-center
          transition-all duration-200 ease-out cursor-pointer transform
          ${active ? "border-sky-600 bg-gradient-to-br from-sky-50 to-sky-100 shadow-lg scale-105" 
                    : "border-slate-200 bg-white hover:border-sky-300 hover:shadow-md hover:scale-105"}
        `}
      >
        {/* Selected Tick */}
        {active && (
          <span
            className="absolute -top-2 -right-2 bg-sky-600 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-md"
            aria-hidden="true"
          >
            ✓
          </span>
        )}

        <img
          src={service.icon}
          alt={service.label}
          className={`mx-auto mb-2 h-9 w-9 sm:h-11 sm:w-11 object-contain transition-transform duration-200
            ${active ? "scale-110" : "group-hover:scale-105"}
          `}
        />

        <p className={`text-xs sm:text-sm font-semibold leading-snug
          ${active ? "text-sky-800" : "text-slate-600 group-hover:text-sky-600"}
        `}>
          {service.label}
        </p>
      </button>
    );
  })}
</div>

                </div>
                )}

                {/* Locations */}
              {/* ================= Service-Specific Inputs ================= */}
<div className="space-y-4">
  {serviceType === "packers" && (
<div className="w-full mb-6">
  <div className="max-w-5xl mx-auto">
    {!onlyPackers && (
    <div className="flex gap-2 p-2 bg-slate-100 rounded-2xl">
      
      <button
        type="button"
        onClick={() => setMoveType("inside")}
        className={`flex-1 flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold transition
          ${
            moveType === "inside"
              ? "bg-sky-600 text-white shadow-md"
              : "bg-white text-slate-600"
          }
        `}
      >
         Move Inside City
      </button>

      <button
        type="button"
        onClick={() => setMoveType("outside")}
        className={`flex-1 flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold transition
          ${
            moveType === "outside"
              ? "bg-indigo-600 text-white shadow-md"
              : "bg-white text-slate-600"
          }
        `}
      >
        Move to Another City
      </button>

    </div>
    )}
  </div>
</div>
)}

  <div className="grid md:grid-cols-2 gap-4">
    
    
    
 <div className="relative">
  <label className="text-xs font-semibold uppercase tracking-wide text-slate-1000">
    Pickup location
  </label>
  <div className="mt-2 flex items-center gap-3 border border-slate-200 rounded-2xl px-3.5 py-2.5 focus-within:border-sky-500 bg-slate-50/40">
    <MapPin className="text-sky-600 h-4 w-4" />
    <input
      type="text"
      placeholder="Enter pickup location"
      value={pickup}
      onChange={onPickupChange}
      className="w-full bg-transparent text-sm outline-none placeholder:text-slate-600"
      
    />
    {pickupLoading && (
  <div className="absolute right-3 top-10">
    <div className="h-4 w-4 border-2 border-sky-500 border-t-transparent rounded-full animate-spin"></div>
  </div>
)}
  </div>
  {locationError && (
  <div className="mt-2 flex items-start gap-2 px-3 py-2.5 bg-red-50 border border-red-100 rounded-xl animate-shake">
    <AlertCircle size={15} className="text-red-500 mt-0.5 flex-shrink-0" />
    <div className="flex flex-col">
      <p className="text-[12px]  text-red-800 leading-none">
        Location Restricted
      </p>
      <p className="text-[11px] text-red-600/90 mt-1 leading-tight font-medium">
        {locationError}
      </p>
    </div>
  </div>
)}

{/* Is style tag ko apne existing style section mein add karein */}
<style>{`
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-4px); }
    75% { transform: translateX(4px); }
  }
  .animate-shake {
    animation: shake 0.4s cubic-bezier(.36,.07,.19,.97) both;
  }
`}</style>

  {/* Pickup Suggestions */}

{pickupPredictions.length > 0 && (
  <div className="absolute z-[999] left-0 right-0 mt-1 bg-white shadow-[0_12px_30px_rgba(0,0,0,0.15)] rounded-xl border border-slate-200 overflow-hidden">
    {pickupPredictions.map((p) => (
      <div
        key={p.place_id}
        onClick={() => handleSelectPlace(p, 'pickup')}
        className="flex items-start gap-2.5 px-3 py-2 hover:bg-sky-50 active:bg-sky-100 border-b border-slate-50 last:border-0 cursor-pointer transition-colors group"
      >
        {/* Compact Location Icon */}
        <div className="mt-0.5 flex-shrink-0">
          <MapPin className="text-slate-400 h-3.5 w-3.5 group-hover:text-sky-600 transition-colors" />
        </div>
        
        {/* Text Content - Compact & Full Display */}
        <div className="flex-1 min-w-0">
          <p className="text-[13px] font-bold text-slate-800 leading-[1.2] truncate">
            {p.structured_formatting.main_text}
          </p>
          <p className="text-[11px] text-slate-500 leading-[1.3] mt-0.5 break-words">
            {p.structured_formatting.secondary_text}
          </p>
        </div>
      </div>
    ))}
  </div>
)}
</div>
    {serviceType === "packers" && (
  <div className="mt-3 space-y-2">
    <div className="flex items-center justify-between">
      <div className="flex flex-col">
  <span className="text-sm font-semibold text-slate-800">
    Lift available (Pickup)
  </span>

  <span className="text-[11px] text-slate-500 mt-0.5">
    Having a lift available may reduce your overall quotation amount.
  </span>
</div>


      <LiftToggle
        value={pickupLiftAvailable}
        onChange={(val) => {
          setPickupLiftAvailable(val);
          if (val) setPickupFloor(""); // lift yes → floor reset
        }}
      />
    </div>

    {!pickupLiftAvailable && (
      <input
        type="number"
        min="0"
        placeholder="Enter pickup floor number"
        value={pickupFloor}
        onChange={(e) => setPickupFloor(e.target.value)}
        className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-sky-100"
      />
    )}
  </div>
)}


    <div className="relative">
  <label className="text-xs font-semibold uppercase tracking-wide text-slate-1000">
    Drop location
  </label>
  <div className="mt-2 flex items-center gap-3 border border-slate-200 rounded-2xl px-3.5 py-2.5 focus-within:border-sky-500 bg-slate-50/40">
    <MapPin className="text-sky-600 h-4 w-4" />
    <input
      type="text"
      placeholder="Enter drop location"
      value={drop}
      onChange={onDropChange} // <--- Ye missing tha
      className="w-full bg-transparent text-sm outline-none placeholder:text-slate-600"
    />
    {dropLoading && (
  <div className="absolute right-3 top-10">
    <div className="h-4 w-4 border-2 border-sky-500 border-t-transparent rounded-full animate-spin"></div>
  </div>
)}
      </div>

  {/* Drop Suggestions */}
{/* Professional & Compact Suggestions Dropdown */}
{dropPredictions.length > 0 && (
  <div className="absolute z-[999] left-0 right-0 mt-1 bg-white shadow-[0_12px_30px_rgba(0,0,0,0.15)] rounded-xl border border-slate-200 overflow-hidden">
    {dropPredictions.map((p) => (
      <div
        key={p.place_id}
        onClick={() => handleSelectPlace(p, 'drop')}
        className="flex items-start gap-2.5 px-3 py-2 hover:bg-sky-50 active:bg-sky-100 border-b border-slate-50 last:border-0 cursor-pointer transition-colors group"
      >
        {/* Compact Location Icon */}
        <div className="mt-0.5 flex-shrink-0">
          <MapPin className="text-slate-400 h-3.5 w-3.5 group-hover:text-sky-600 transition-colors" />
        </div>
        
        {/* Text Content - Compact & Full Display */}
        <div className="flex-1 min-w-0">
          <p className="text-[13px] font-bold text-slate-800 leading-[1.2] truncate">
            {p.structured_formatting.main_text}
          </p>
          <p className="text-[11px] text-slate-500 leading-[1.3] mt-0.5 break-words">
            {p.structured_formatting.secondary_text}
          </p>
        </div>
      </div>
    ))}
  </div>
)}
</div>
    {serviceType === "packers" && (
  <div className="mt-3 space-y-2">
    <div className="flex items-center justify-between">
      <div className="flex flex-col">
  <span className="w-full text-sm font-semibold text-slate-800">
    Lift available (Drop)
  </span>

  <span className="text-[11px] text-slate-500 mt-0.5">
    Having a lift available may reduce your overall quotation amount.
  </span>
</div>

      <LiftToggle
        value={dropLiftAvailable}
        onChange={(val) => {
          setDropLiftAvailable(val);
          if (val) setDropFloor("");
        }}
      />
    </div>

    {!dropLiftAvailable && (
      <input
        type="number"
        min="0"
        placeholder="Enter drop floor number"
        value={dropFloor}
        onChange={(e) => setDropFloor(e.target.value)}
        className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-sky-100"
      />
    )}
  </div>
)}


  </div>




  {/* User Full Name Input */}
<div>
  <label className="text-xs font-semibold uppercase tracking-wide text-slate-1000">
     Full Name
  </label>
<div className="mt-2 flex items-center gap-3 px-3.5 py-3 rounded-2xl border transition-all duration-300 focus-within:ring-4
  ${errors.name 
    ? 'border-red-500 bg-red-50/50 ring-red-100' 
    : 'border-slate-200 bg-slate-50/40 focus-within:border-sky-500 focus-within:ring-sky-100'
  }">
  
  {/* Icon ka color bhi error ke hisaab se change hoga */}
  <UserCircle className={`h-5 w-5 flex-shrink-0 transition-colors ${errors.name ? 'text-red-500' : 'text-sky-600'}`} />
  
  <input
    type="text"
    placeholder="e.g. John Doe"
    className="w-full bg-transparent text-sm outline-none placeholder:text-slate-600 "
    onChange={(e) => {
      setName(e.target.value);
      if (errors.name) setErrors({ ...errors, name: "" }); // User type kare toh error hat jaye
    }}
    value={name}
    required
  />
</div>
  {errors.name && (
  <div className="flex items-center gap-1.5 mt-1.5 ml-2 animate-in fade-in slide-in-from-top-1 duration-200">
    {/* Chota Alert Icon */}
    <AlertCircle size={12} className="text-red-500" />
    
    <p className="text-[11px] font-medium text-red-500 tracking-tight">
      {errors.name}
    </p>
  </div>
)}
</div>

  {/* Conditional Fields */}
  
  {serviceType === "tempo" && (
    <div>
      <label className="text-xs font-semibold uppercase tracking-wide text-slate-600">
        Select Booking Type
      </label>
      <div className="mt-2 flex items-center gap-3 border border-slate-200 rounded-2xl px-3.5 py-2.5 focus-within:border-sky-500 focus-within:ring-2 focus-within:ring-sky-100 bg-slate-50/40">
        <Home className="text-sky-600 h-4 w-4 flex-shrink-0" />
        <select
          className="w-full bg-transparent text-sm outline-none text-slate-700"
          onChange={(e) => setSize(e.target.value)}
        >
          <option value="">Select Type</option>
          <option value="Intercity">Intercity Tempo Service</option>
          <option value="Intracity">Intracity Tempo Service</option>
          
        </select>
      </div>
    </div>
  )}


  {serviceType === "ac" && (
    <div>
      <label className="text-xs font-semibold uppercase tracking-wide text-slate-600">
        AC type
      </label>
      <div className="mt-2 flex items-center gap-3 border border-slate-200 rounded-2xl px-3.5 py-2.5 focus-within:border-sky-500 focus-within:ring-2 focus-within:ring-sky-100 bg-slate-50/40">
        <Home className="text-sky-600 h-4 w-4 flex-shrink-0" />
        <select
          className="w-full bg-transparent text-sm outline-none text-slate-700"
          onChange={(e) => setSize(e.target.value)}
        >
          <option value="">Select AC type</option>
          <option>Window AC</option>
          <option>Split AC</option>
        </select>
      </div>
    </div>
  )}

  {serviceType === "cleaning" && (
    <div>
      <label className="text-xs font-semibold uppercase tracking-wide text-slate-600">
        Cleaning type
      </label>
      <div className="mt-2 flex items-center gap-3 border border-slate-200 rounded-2xl px-3.5 py-2.5 focus-within:border-sky-500 focus-within:ring-2 focus-within:ring-sky-100 bg-slate-50/40">
        <Home className="text-sky-600 h-4 w-4 flex-shrink-0" />
        <select
          className="w-full bg-transparent text-sm outline-none text-slate-700"
          onChange={(e) => setSize(e.target.value)}
        >
          <option value="">Select cleaning type</option>
          <option>Deep Cleaning</option>
          <option>Normal Cleaning</option>
          <option>Sofa Cleaning</option>
        </select>
      </div>
    </div>
  )}

  {/* Mobile / Tempo case: no House size */}
  {serviceType === "tempo" && null}

  {/* Mobile number (always) */}
  <div>
    <label className="text-xs font-semibold uppercase tracking-wide text-slate-1000">
      Mobile
    </label>
<div className="mt-2 flex items-center gap-3 px-3.5 py-3 rounded-2xl border transition-all duration-300 focus-within:ring-4
  ${errors.name 
    ? 'border-red-500 bg-red-50/50 ring-red-100' 
    : 'border-slate-200 bg-slate-50/40 focus-within:border-sky-500 focus-within:ring-sky-100'
  }">      <Phone className="text-sky-600 h-4 w-4 flex-shrink-0" />
      <div className="flex items-center gap-2 w-full">
        <span className="text-xs font-semibold text-slate-500 border-r border-slate-200 pr-2">
          +91
        </span>
        <input
          type="tel"
          maxLength={10}
          placeholder="Enter 10-digit mobile"
          className="w-full bg-transparent text-sm outline-none placeholder:text-slate-600"
          onChange={(e) => setMobile(e.target.value)}
        />
      </div>
    </div>
    <p className="mt-1.5 text-[11px] text-slate-400">
      We share quotes and updates on WhatsApp & SMS. No spam.
    </p>
    {errors.mobile && (
  <div className="flex items-center gap-1.5 mt-1.5 ml-2 animate-in fade-in slide-in-from-top-1 duration-200">
    {/* Chota Alert Icon */}
    <AlertCircle size={12} className="text-red-500" />
    
    <p className="text-[11px] font-medium text-red-500 tracking-tight">
      {errors.mobile}
    </p>
  </div>
)}
  </div>

    {/*EMAIL INUT */}
  <div>
  <label className="text-xs font-semibold uppercase tracking-wide text-slate-1000">
    Email
  </label>
<div className="mt-2 flex items-center gap-3 px-3.5 py-3 rounded-2xl border transition-all duration-300 focus-within:ring-4
  ${errors.name 
    ? 'border-red-500 bg-red-50/50 ring-red-100' 
    : 'border-slate-200 bg-slate-50/40 focus-within:border-sky-500 focus-within:ring-sky-100'
  }">    {/* Mail Icon jo focus hone par blue ho jayega */}
    <Mail className="text-sky-600 h-5 w-5 flex-shrink-0 group-focus-within:scale-110 transition-transform" />
    <input
      type="email"
      placeholder="e.g. rahul@example.com"
          className="w-full bg-transparent text-sm outline-none placeholder:text-slate-600"
      onChange={(e) => setEmail(e.target.value)}
      required
    />
  </div>
  {errors.email && (
  <div className="flex items-center gap-1.5 mt-1.5 ml-2 animate-in fade-in slide-in-from-top-1 duration-200">
    {/* Chota Alert Icon */}
    <AlertCircle size={12} className="text-red-500" />
    
    <p className="text-[11px] font-medium text-red-500 tracking-tight">
      {errors.email}
    </p>
  </div>
)}
</div>
  


</div>


                {/* CTA */}
                <div className="pt-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <button
  type="button"
  onClick={submitHandler}
  className="relative inline-flex items-center justify-center gap-2 
  rounded-full bg-sky-600 
  px-8 py-3.5 text-sm font-bold text-white 
  shadow-[0_10px_25px_rgba(2,132,199,0.4)] 
  hover:shadow-[0_15px_35px_rgba(2,132,199,0.5)] 
  hover:-translate-y-1 
  active:translate-y-0 
  transition-all duration-300"
>
 Get Instant Price
</button>


                  {distance && (
                    <p className="text-xs text-slate-500 text-left sm:text-right">
                      Approx distance:&nbsp;
                      <span className="font-semibold text-slate-800">
                        {distance} km
                      </span>
                    </p>
                  )}
                </div>
              </div>
            </div>

<div className="hidden md:flex flex-col justify-between p-8 lg:p-10 bg-gradient-to-br from-sky-50 via-white to-white rounded-3xl shadow-lg">
  {/* Top */}
  <div>
    <span className="inline-flex items-center gap-2 rounded-full bg-sky-100 px-3 py-1 text-[11px] font-semibold text-sky-700">
      Trusted & Verified
    </span>

    <h3 className="mt-4 text-xl font-extrabold text-slate-900 leading-snug">
      Why move with us?
    </h3>

    <p className="mt-2 text-sm text-slate-600 leading-relaxed">
      Smooth, reliable, and transparent relocation services. Instant quotes,
      verified partners, and complete peace of mind.
    </p>

    {/* Features */}
    <ul className="mt-8 space-y-6">
      {[
        { icon: ShieldCheck, title: "Verified professionals", desc: "Background-checked partners with ratings" },
        { icon: Clock, title: "Instant estimates", desc: "Get quick quotes without calls or follow-ups" },
        { icon: ArrowRight, title: "Transparent pricing", desc: "No hidden charges. Know cost upfront" },
      ].map((item, idx) => (
        <li key={idx} className="flex items-start gap-4">
          <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-xl bg-sky-100">
            <item.icon className="h-5 w-5 text-sky-600" />
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-900">{item.title}</p>
            <p className="mt-0.5 text-xs text-slate-500">{item.desc}</p>
          </div>
        </li>
      ))}
    </ul>
  </div>

  {/* Bottom Summary */}
  <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-md">
    <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
      Your move summary
    </p>

    <div className="mt-3 space-y-2">
      <p className="text-sm font-semibold text-slate-800">
        {serviceType
          ? services.find((s) => s.id === serviceType)?.label
          : "Select a service"}
      </p>

      {distance ? (
        <p className="text-xs text-slate-500">
          Approx distance: <span className="font-semibold">{distance} km</span>
        </p>
      ) : (
        <p className="text-xs text-slate-400">Distance will be calculated automatically</p>
      )}
    </div>

    <div className="mt-4 rounded-xl bg-sky-50 px-4 py-3 text-xs text-sky-700">
      Secure & reliable quotes sent via WhatsApp & SMS. No spam.
    </div>
  </div>
</div>



          </div>
        </div>
      </div>
      {/* Mobile sticky CTA */}
<div className="fixed inset-x-0 bottom-0 z-40 md:hidden">
  <div className="mx-auto max-w-6xl px-4 pb-4">
    <button
      type="button"
      onClick={submitHandler}
      disabled={!serviceType || !pickup || !drop || !distance}
      className={`relative z-50 w-full rounded-2xl px-6 py-4 text-sm font-semibold text-white shadow-xl transition
        ${!serviceType || !pickup || !drop || !distance
          ? "bg-slate-300 cursor-not-allowed"
          : "bg-sky-600 active:scale-[0.98]"}
      `}
    >
      Get instant quote
    </button>
  </div>
</div>

{loading && (
  <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white/80 backdrop-blur-sm">
    <div className="text-center">
      <Lottie
        animationData={loaderAnimation}
        loop
        style={{ width: 180, height: 180 }}
      />
      <p className="text-sm font-semibold text-slate-700 mt-2">
        Finding best price for you...

      </p>
    </div>
  </div>
)}


    </section>
  );
}
