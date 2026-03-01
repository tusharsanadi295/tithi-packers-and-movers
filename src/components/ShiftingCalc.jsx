import React, { useState, useEffect } from "react";
import {
  ArrowLeft,
  ArrowUpCircle,
  ArrowDownCircle,
  X,
  MapPin,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ShieldCheck, CheckCircle2, Zap, Clock, ArrowRight } from "lucide-react";
export default function ShiftingCalc() {
  const navigate = useNavigate();

  /* ================= STATE ================= */
  const [pickup, setPickup] = useState("");
  const [drop, setDrop] = useState("");
  const [distance, setDistance] = useState(null);

  const [pickupGround, setPickupGround] = useState(true);
  const [pickupLift, setPickupLift] = useState(true);
  const [pickupFloor, setPickupFloor] = useState("");

  const [dropGround, setDropGround] = useState(true);
  const [dropLift, setDropLift] = useState(true);
  const [dropFloor, setDropFloor] = useState("");

  const [pickupPredictions, setPickupPredictions] = useState([]);
  const [dropPredictions, setDropPredictions] = useState([]);
  
  /* ================= GOOGLE ================= */

  const handleAutocomplete = (value, type) => {
    if (!window.google || value.length < 2) return;

    const service = new window.google.maps.places.AutocompleteService();

    service.getPlacePredictions(
      {
        input: value,
        componentRestrictions: { country: "in" },
      },
      (predictions, status) => {
        if (
          status === window.google.maps.places.PlacesServiceStatus.OK
        ) {
          type === "pickup"
            ? setPickupPredictions(predictions)
            : setDropPredictions(predictions);
        }
      }
    );
  };

  const calculateDistance = (origin, destination) => {
    if (!window.google || !origin || !destination) return;

    const service = new window.google.maps.DistanceMatrixService();

    service.getDistanceMatrix(
      {
        origins: [origin],
        destinations: [destination],
        travelMode: window.google.maps.TravelMode.DRIVING,
        unitSystem: window.google.maps.UnitSystem.METRIC,
      },
      (response, status) => {
        if (
          status === window.google.maps.DistanceMatrixStatus.OK
        ) {
          const result = response.rows[0].elements[0];
          if (result.status === "OK") {
            setDistance(Math.round(result.distance.value / 1000));
          }
        }
      }
    );
  };

  const selectPlace = (place, type) => {
    const address = place.description;

    if (type === "pickup") {
      setPickup(address);
      setPickupPredictions([]);
      if (drop) calculateDistance(address, drop);
    } else {
      setDrop(address);
      setDropPredictions([]);
      if (pickup) calculateDistance(pickup, address);
    }
  };

  /* ================= FLOOR LOGIC ================= */

  useEffect(() => {
    if (pickupGround) {
      setPickupLift(true);
      setPickupFloor("");
    }
  }, [pickupGround]);

  useEffect(() => {
    if (pickupLift) setPickupFloor("");
  }, [pickupLift]);

  useEffect(() => {
    if (dropGround) {
      setDropLift(true);
      setDropFloor("");
    }
  }, [dropGround]);

  useEffect(() => {
    if (dropLift) setDropFloor("");
  }, [dropLift]);

  /* ================= UI ================= */

  return (
    <div className="min-h-screen bg-[#F4F8FC] text-slate-800">

        <div className="sticky top-0 z-50 bg-white border-b px-5 py-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-sky-50 rounded-full"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-lg font-semibold tracking-tight">
            Packers & Movers
          </h1>
        </div>
        <span className="text-sky-600 font-medium text-sm cursor-pointer">
          FAQs
        </span>
      </div>
        
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-6">
        <div className="grid lg:grid-cols-2 gap-12">
        
          {/* LEFT FORM */}
         <div className="max-w-2xl mx-auto space-y-8">
  {/* Header Section (Optional) */}
  <div className="px-2">
    <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Trip Details</h2>
    <p className="text-slate-500 text-sm">Specify your locations and property access for an accurate quote.</p>
  </div>

 <div className="max-w-2xl mx-auto space-y-6">
  {/* Pickup Card */}
  <LocationCard
    title="Pickup Details"
    icon={<ArrowUpCircle className="w-5 h-5 text-emerald-500" />}
    accentColor="emerald"
    location={pickup}
    setLocation={setPickup}
    predictions={pickupPredictions}
    setPredictions={setPickupPredictions}
    handleAutocomplete={(v) => handleAutocomplete(v, "pickup")}
    selectPlace={(p) => selectPlace(p, "pickup")}
    ground={pickupGround}
    setGround={setPickupGround}
    lift={pickupLift}
    setLift={setPickupLift}
    floor={pickupFloor}
    setFloor={setPickupFloor} // Fixed: Passing the correct setter
  />

  {/* Drop Card */}
  <LocationCard
    title="Drop Details"
    icon={<ArrowDownCircle className="w-5 h-5 text-rose-500" />}
    accentColor="rose"
    location={drop}
    setLocation={setDrop}
    predictions={dropPredictions}
    setPredictions={setDropPredictions}
    handleAutocomplete={(v) => handleAutocomplete(v, "drop")}
    selectPlace={(p) => selectPlace(p, "drop")}
    ground={dropGround}
    setGround={setDropGround}
    lift={dropLift}
    setLift={setDropLift}
    floor={dropFloor}
    setFloor={setDropFloor} // Fixed: Passing the correct setter
  />
</div>

  {distance && (
    <div className="bg-sky-50 border border-sky-100 rounded-2xl p-4 flex justify-between items-center shadow-sm animate-in fade-in slide-in-from-bottom-2">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-white rounded-lg shadow-sm">
          <MapPin size={18} className="text-sky-600" />
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-wider font-bold text-sky-900/50 leading-none mb-1">Total Route</p>
          <p className="text-sm font-bold text-sky-900">Estimated Distance</p>
        </div>
      </div>
      <div className="text-right">
        <span className="text-2xl font-black text-sky-600 leading-none">{distance}</span>
        <span className="text-xs font-bold text-sky-600 ml-1">KM</span>
      </div>
    </div>
  )}
</div>

          {/* RIGHT SIDE DESKTOP */}
          <div className="hidden lg:block">
  <div className="sticky top-28 bg-white rounded-[2rem] border border-slate-100 shadow-[0_20px_50px_rgba(0,0,0,0.04)] p-8 space-y-8">
    
    {/* Header Section */}
    <div>
      <h3 className="text-xl font-bold text-slate-900 tracking-tight">
        Why Choose TPM?
      </h3>
      <p className="text-[13px] text-slate-500 mt-1 font-medium">
        Premium moving services, simplified.
      </p>
    </div>

    {/* Feature List with custom iconography */}
    <ul className="space-y-4">
      {[
        { text: "Verified Packers", icon: <ShieldCheck className="w-4 h-4 text-emerald-600" /> },
        { text: "Damage Protection", icon: <CheckCircle2 className="w-4 h-4 text-emerald-600" /> },
        { text: "Transparent Pricing", icon: <Zap className="w-4 h-4 text-emerald-600" /> },
        { text: "On-Time Pickup", icon: <Clock className="w-4 h-4 text-emerald-600" /> },
      ].map((item, idx) => (
        <li key={idx} className="flex items-center group">
          <div className="mr-3 flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 transition-colors group-hover:bg-emerald-100">
            {item.icon}
          </div>
          <span className="text-[14px] font-semibold text-slate-700 tracking-tight">{item.text}</span>
        </li>
      ))}
    </ul>

    {/* Distance Indicator with "Glassmorphism" feel */}
    {distance ? (
      <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100/80 relative overflow-hidden">
        <div className="relative z-10">
          <p className="text-[10px] uppercase tracking-[0.1em] font-bold text-slate-400 mb-1">
            Trip Estimate
          </p>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-black text-sky-600 tracking-tighter">{distance}</span>
            <span className="text-xs font-bold text-sky-600/60 uppercase">Kilometers</span>
          </div>
        </div>
        {/* Subtle decorative background circle */}
        <div className="absolute -right-4 -bottom-4 w-16 h-16 bg-sky-100 rounded-full blur-2xl opacity-50" />
      </div>
    ) : (
      <div className="py-4 px-6 border-2 border-dashed border-slate-100 rounded-2xl text-center">
        <p className="text-xs text-slate-400 font-medium italic">
          Enter route to see distance
        </p>
      </div>
    )}

    {/* Primary Action with high-end hover state */}
    <button
      disabled={!pickup || !drop}
      className={`group relative w-full py-4 rounded-2xl font-extrabold text-[15px] transition-all duration-300 ${
        !pickup || !drop
          ? "bg-slate-50 text-slate-300 cursor-not-allowed border border-slate-100"
          : "bg-slate-900 text-white shadow-[0_10px_20px_rgba(0,0,0,0.1)] hover:bg-sky-600 hover:shadow-sky-200 hover:-translate-y-1 active:scale-95"
      }`}
    >
      <span className="flex items-center justify-center gap-2">
        {!pickup || !drop ? "Calculate Route" : "Check Price"}
        {!(!pickup || !drop) && <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />}
      </span>
    </button>

    {/* Trust Disclaimer */}
    <p className="text-[11px] text-center text-slate-400 font-medium px-2 leading-relaxed">
      Prices include basic transit insurance and 
      <span className="text-slate-500"> zero hidden fees.</span>
    </p>
  </div>
</div>
        </div>
      </div>

     
{/* CHECK PRICE BUTTON */}
<div className="lg:hidden fixed bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-lg border-t border-slate-100 z-[100]">
  <div className="max-w-md mx-auto flex items-center gap-4">
    {/* Optional: Summary info next to button */}
    {distance && (
       <div className="flex flex-col">
         <span className="text-[10px] uppercase font-bold text-slate-400 leading-none">Total</span>
         <span className="text-lg font-black text-slate-900">{distance}km</span>
       </div>
    )}

    <button
      disabled={!pickup || !drop}
      className={`flex-1 py-4 rounded-2xl font-bold text-[15px] shadow-2xl transition-all duration-300 active:scale-95 ${
        !pickup || !drop
          ? "bg-slate-100 text-slate-400 cursor-not-allowed"
          : "bg-slate-900 text-white shadow-slate-200"
      }`}
    >
      <span className="flex items-center justify-center gap-2">
        Check Price
        {!(!pickup || !drop) && <ArrowRight size={18} />}
      </span>
    </button>
  </div>
</div>



    </div>
  );
}

/* ================= LOCATION CARD ================= */
function LocationCard({
  title,
  icon,
  location,
  setLocation,
  predictions,
  setPredictions,
  handleAutocomplete,
  selectPlace,
  ground,
  setGround,
  lift,
  setLift,
  floor,
  setFloor,
  accentColor = "sky"
}) {

  const accentBg =
    accentColor === "sky"
      ? "bg-sky-50 text-sky-600"
      : accentColor === "emerald"
      ? "bg-emerald-50 text-emerald-600"
      : "bg-slate-100 text-slate-600";

  return (
    <div className="bg-white rounded-3xl border border-slate-100 p-6 space-y-6 shadow-[0_6px_30px_rgba(0,0,0,0.04)] transition-all duration-300 hover:shadow-[0_10px_40px_rgba(0,0,0,0.08)]">

      {/* HEADER */}
      <div className="flex items-center gap-3">
        <div className={`p-3 rounded-2xl ${accentBg}`}>
          {icon}
        </div>
        <div>
          <h3 className="font-semibold text-slate-800 tracking-tight">
            {title}
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Enter accurate details for better pricing
          </p>
        </div>
      </div>

      {/* LOCATION INPUT */}
      <div className="relative">
        <input
          value={location}
          placeholder="Search area, building, or landmark"
          onChange={(e) => {
            setLocation(e.target.value);
            handleAutocomplete(e.target.value);
          }}
          className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-sm font-medium focus:bg-white focus:ring-4 focus:ring-sky-50 focus:border-sky-400 outline-none transition-all duration-200"
        />

        {location && (
          <button
            onClick={() => {
              setLocation("");
              setPredictions([]);
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition"
          >
            <X size={18} />
          </button>
        )}

        {/* AUTOCOMPLETE DROPDOWN */}
        {predictions.length > 0 && (
          <div className="absolute w-full bg-white border border-slate-100 rounded-2xl mt-2 shadow-2xl z-50 overflow-hidden animate-fadeIn">
            {predictions.map((p) => (
              <div
                key={p.place_id}
                onClick={() => selectPlace(p)}
                className="px-5 py-3 text-sm text-slate-700 hover:bg-sky-50 cursor-pointer border-b border-slate-50 last:border-0 transition"
              >
                {p.description}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ACCESS DETAILS */}
      <div className="pt-4 border-t border-slate-100 space-y-5">

        <div className="space-y-1">
  <ToggleRow
    label="Ground Floor Access"
    value={ground}
    onChange={setGround}
  />
  <p className="text-[11px] text-slate-400 ml-1">
    This information is important for accurate pricing.
  </p>
</div>


        {!ground && (
          <div className="space-y-5 pt-2 animate-fadeIn">
            <ToggleRow
              label="Service Lift Available"
              value={lift}
              onChange={setLift}
            />

            {!lift && (
              <div className="flex flex-col gap-2">
                <label className="text-[11px] font-bold text-slate-400 uppercase ml-1 tracking-wide">
                  Which floor?
                </label>

                <input
                  type="number"
                  placeholder="e.g. 5"
                  value={floor}
                  onChange={(e) => setFloor(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm font-semibold focus:ring-4 focus:ring-sky-50 focus:border-sky-400 outline-none transition"
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}


/* ================= TOGGLE ================= */

function ToggleRow({ label, value, onChange }) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-sm font-medium text-slate-700">
        {label}
      </span>

      <div className="flex bg-slate-100 p-1 rounded-full w-28">
        <button
          onClick={() => onChange(true)}
          className={`flex-1 py-1.5 text-xs font-semibold rounded-full transition ${
            value
              ? "bg-sky-600 text-white shadow"
              : "text-slate-400"
          }`}
        >
          Yes
        </button>

        <button
          onClick={() => onChange(false)}
          className={`flex-1 py-1.5 text-xs font-semibold rounded-full transition ${
            !value
              ? "bg-sky-600 text-white shadow"
              : "text-slate-400"
          }`}
        >
          No
        </button>
      </div>
    </div>
  );
}

