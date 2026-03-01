import React, { useEffect, useState,useRef } from "react";
import {
  Trash2,
  X,
} from "lucide-react";

export default function AdminBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [itemBooking, setItemBooking] = useState(null);
  const months = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December"
];
const [viewBooking, setViewBooking] = useState(null);
const [showViewModal, setShowViewModal] = useState(false);
const [pickupPredictions, setPickupPredictions] = useState([]);
const [dropPredictions, setDropPredictions] = useState([]);
const [pickupLoading, setPickupLoading] = useState(false);
const [dropLoading, setDropLoading] = useState(false);
const pickupDebounceRef = useRef(null);
const dropDebounceRef = useRef(null);
const [showEdit, setShowEdit] = useState(false);
const [editBooking, setEditBooking] = useState(null);
const [pickupLatLng, setPickupLatLng] = useState(null);
const [dropLatLng, setDropLatLng] = useState(null);
const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
const monthFilteredBookings = bookings.filter((b) => {
  const d = new Date(b.createdAt || b.shiftingDate);
  return (
    d.getMonth() === selectedMonth &&
    d.getFullYear() === selectedYear
  );
})
const onPickupChange = (e) => {
  const val = e.target.value;

  setEditBooking(prev => ({ ...prev, pickup: val }));

  if (pickupDebounceRef.current)
    clearTimeout(pickupDebounceRef.current);

  pickupDebounceRef.current = setTimeout(() => {
    if (val.length > 2 && window.google?.maps?.places) {
      setPickupLoading(true);

      const service =
        new window.google.maps.places.AutocompleteService();

      service.getPlacePredictions(
        {
          input: val,
          componentRestrictions: { country: "in" },
        },
        (predictions) => {
          setPickupPredictions(predictions || []);
          setPickupLoading(false);
        }
      );
    } else {
      setPickupPredictions([]);
      setPickupLoading(false);
    }
  }, 400);
};

const onDropChange = (e) => {
  const val = e.target.value;

  setEditBooking(prev => ({ ...prev, drop: val }));

  if (dropDebounceRef.current)
    clearTimeout(dropDebounceRef.current);

  dropDebounceRef.current = setTimeout(() => {
    if (val.length > 2 && window.google?.maps?.places) {
      setDropLoading(true);

      const service =
        new window.google.maps.places.AutocompleteService();

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

const getLatLng = (placeId) => {
  return new Promise((resolve) => {
    const service = new window.google.maps.places.PlacesService(
      document.createElement("div")
    );

    service.getDetails(
      { placeId, fields: ["geometry"] },
      (place, status) => {
        if (status === "OK") {
          resolve(place.geometry.location);
        } else {
          resolve(null);
        }
      }
    );
  });
}; 

const calculateDistance = (origin, destination) => {
  if (!origin || !destination || !window.google?.maps) return;

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
        status === "OK" &&
        response.rows[0].elements[0].status === "OK"
      ) {
        const km =
          response.rows[0].elements[0].distance.value / 1000;

        setEditBooking(prev => ({
          ...prev,
          distance: Math.round(km),
        }));
      }
    }
  );
};
const handleSelectPlace = async (place, type) => {
  const address = place.description;
  const location = await getLatLng(place.place_id);

  if (!location) return;

  if (type === "pickup") {
    setEditBooking(prev => ({
      ...prev,
      pickup: address
    }));
    setPickupPredictions([]);
    setPickupLatLng(location);
  }

  if (type === "drop") {
    setEditBooking(prev => ({
      ...prev,
      drop: address
    }));
    setDropPredictions([]);
    setDropLatLng(location);
  }
};

useEffect(() => {
  if (pickupLatLng && dropLatLng) {
    calculateDistance(pickupLatLng, dropLatLng);
  }
}, [pickupLatLng, dropLatLng]);

const filteredBookings = monthFilteredBookings.filter((b) => {
  const term = search.toLowerCase();
  return (
    b.name?.toLowerCase().includes(term) ||
    b.mobile?.includes(term)
  );
});

  /* ================= FETCH BOOKINGS ================= */
  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("http://localhost:5000/api/bookings", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setBookings(data.bookings || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);
const formatBookingId = (id) => {
  if (!id) return "—";
  return `${id.slice(-8).toUpperCase()}`;
};
  /* ================= SEARCH ================= */
 const filtered = monthFilteredBookings.filter((b) => {
  const term = search.toLowerCase();
  const bookingId = formatBookingId(b._id).toLowerCase();

  return (
    b.name?.toLowerCase().includes(term) ||
    b.mobile?.includes(term) ||
    bookingId.includes(term)
  );
});

  /* ================= STATUS UPDATE ================= */
  const updateStatus = async (id, status) => {
    const token = localStorage.getItem("token");

    await fetch(`http://localhost:5000/api/bookings/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status }),
    });

    setBookings((prev) =>
      prev.map((b) =>
        b._id === id ? { ...b, status } : b
      )
    );
  };

  /* ================= DELETE ================= */
  const deleteBooking = async (id) => {
    if (!window.confirm("Delete booking?")) return;

    const token = localStorage.getItem("token");
    await fetch(`http://localhost:5000/api/bookings/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    setBookings((prev) => prev.filter((b) => b._id !== id));
  };
  
  /* ================= SAVE UPDATE ================= */
const saveUpdate = async () => {
  if (!editBooking?._id) return;

  const token = localStorage.getItem("token");

  const payload = {
    pickup: editBooking.pickup,
    drop: editBooking.drop,
    distance: editBooking.distance,
    pickupFloorNo: Number(editBooking.pickupFloorNo) || 0,
    dropFloorNo: Number(editBooking.dropFloorNo) || 0,
    pickupLift: editBooking.pickupLift || false,
    dropLift: editBooking.dropLift || false,
    finalAmount: Number(editBooking.finalAmount) || 0,
    status: editBooking.status,
  };

  try {
    const res = await fetch(
      `http://localhost:5000/api/bookings/${editBooking._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      }
    );

    const data = await res.json();

    if (data.success) {
      // update frontend list instantly
      setBookings((prev) =>
        prev.map((b) =>
          b._id === editBooking._id
            ? { ...b, ...payload }
            : b
        )
      );

      setShowEdit(false);
      setEditBooking(null);
    } else {
      alert("Update failed");
    }
  } catch (err) {
    console.error(err);
    alert("Server error");
  }
};





  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-10 h-10 border-4 border-sky-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }
  

  return (
    <div className="p-4 md:p-6 bg-[#f8fafc] min-h-screen">

      {/* ================= HEADER ================= */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-2xl font-black text-slate-800">
          Bookings
        </h1>

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search ID,name or mobile..."
          className="w-full md:w-72 px-4 py-2.5 rounded-xl border outline-none"
        />
      </div>
      <div className="flex gap-1 overflow-x-auto mb-4">
  {months.map((m, i) => (
    <button
      key={m}
      onClick={() => setSelectedMonth(i)}
      className={`px-4 py-2 rounded-xl text-xs font-black
        ${selectedMonth === i
          ? "bg-sky-600 text-white"
          : "bg-white border text-slate-600"}
      `}
    >
      {m}
    </button>
  ))}
</div>

      {/* ================= DESKTOP TABLE ================= */}
      <div className="hidden md:block bg-white rounded-2xl border overflow-hidden">
        <div className="grid grid-cols-11 bg-slate-100 text-xs font-black uppercase px-4 py-3">
          <div>Booking ID</div>
          <div>Name</div>
          <div>Mobile</div>
          <div>Service</div>
          <div>Route</div>
          <div>Date</div>
          <div>Amount</div>
          <div>Items</div>
          <div>Status</div>
          <div>Delete</div>
          <div>Update</div>
        </div>

        {filtered.map((b) => (
          <div
            key={b._id}
            className="grid grid-cols-11 px-4 py-4 border-t items-center text-sm"
          >
            <div className="font-mono text-xs font-bold text-sky-700">
  {formatBookingId(b._id)}
</div>
            <div className="font-bold">{b.name}</div>
            <div>{b.mobile}</div>
            <div className="uppercase font-bold text-sky-600">
              {b.serviceType}
            </div>
            <div className="text-xs">
              {b.pickup?.split(",")[0]} → {b.drop?.split(",")[0]}
            </div>
            <div>
              {b.shiftingDate
                ? new Date(b.shiftingDate).toLocaleDateString()
                : "—"}
            </div>
            <div className="font-black">₹{b.finalAmount}</div>

            <button
  onClick={() => {
    setViewBooking(b);
    setShowViewModal(true);
  }}
  className="text-sky-600 font-bold text-xs underline"
>
  View Booking
</button>


            <select
              value={b.status || "PENDING"}
              onChange={(e) =>
                updateStatus(b._id, e.target.value)
              }
              className="text-xs font-black rounded-lg px-2 py-1 border"
            >
              <option>PENDING</option>
              <option>CONFIRMED</option>
              <option>COMPLETED</option>
              <option>CANCELLED</option>
            </select>

            <button
              onClick={() => deleteBooking(b._id)}
              className="text-rose-600 font-bold"
            >
              <Trash2 size={16} />
            </button>
            <button
  onClick={() => {
    setEditBooking(b);
    setShowEdit(true);
  }}
  className="px-3 py-1.5 bg-amber-500 text-white text-xs font-bold rounded-lg"
>
  Update
</button>

          </div>
        ))}
      </div>

      {/* ================= MOBILE CARDS ================= */}
      <div className="md:hidden space-y-4">
        {filtered.map((b) => (
          <div
            key={b._id}
            className="bg-white rounded-2xl border p-4 space-y-3"
          >
            <div className="flex justify-between">
              <p className="font-black">{b.name}</p>
              <p className="font-black">₹{b.finalAmount}</p>
            </div>

            <p className="text-xs text-slate-500">
              {b.pickup?.split(",")[0]} → {b.drop?.split(",")[0]}
            </p>

            <div className="flex justify-between items-center">
              <button
                onClick={() => setItemBooking(b)}
                className="text-sky-600 text-xs font-bold underline"
              >
                View Items
              </button>

              <select
                value={b.status || "PENDING"}
                onChange={(e) =>
                  updateStatus(b._id, e.target.value)
                }
                className="text-xs font-black rounded-lg px-2 py-1 border"
              >
                <option>PENDING</option>
                <option>CONFIRMED</option>
                <option>COMPLETED</option>
                <option>CANCELLED</option>
              </select>
            </div>
          </div>
        ))}
      </div>

      {/* ================= ITEMS MODAL ================= */}
      {itemBooking && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-xl rounded-3xl overflow-hidden">
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="font-black text-lg">
                {itemBooking.name} – Items
              </h2>
              <button onClick={() => setItemBooking(null)}>
                <X />
              </button>
            </div>

            <div className="p-4 max-h-[70vh] overflow-y-auto space-y-3">
              {itemBooking.items?.map((i, idx) => (
                <div
                  key={idx}
                  className="flex justify-between bg-slate-50 p-3 rounded-xl"
                >
                  <div>
                    <p className="font-bold">{i.name}</p>
                    <p className="text-xs text-slate-500">
                      Size: {i.tag} | Qty: {i.qty}
                    </p>
                  </div>
                  <p className="font-black">₹{i.price}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        
      )}

      {showViewModal && viewBooking &&(
  <div className="fixed inset-0 bg-black/60 z-50 flex justify-center items-center p-4">
    <div className="bg-white w-full max-w-2xl rounded-3xl overflow-hidden">

      {/* HEADER */}
      <div className="flex justify-between p-4 border-b">
        <h2 className="font-black text-lg">
          Booking Details – {viewBooking.name}
        </h2>
        <button
  onClick={() => {
    setShowViewModal(false);
    setViewBooking(null);
  }}
>
  ✕
</button>

      </div>

      {/* BODY */}
      <div className="p-5 max-h-[70vh] overflow-y-auto space-y-6">

        {/* PERSONAL */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <p><b>Mobile:</b> {viewBooking.mobile}</p>
          <p><b>Email:</b> {viewBooking.email || "-"}</p>
          <p><b>Status:</b> {viewBooking.status}</p>
          <p><b>Booked On:</b> {new Date(viewBooking.createdAt).toLocaleDateString()}</p>
        </div>

        {/* ROUTE */}
        <div>
          <p className="font-black text-xs uppercase mb-2">Route</p>
          <p><b>Pickup:</b> {viewBooking.pickup}</p>
          <p><b>Drop:</b> {viewBooking.drop}</p>
        </div>

        {/* LIFT */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-slate-50 p-3 rounded-xl">
            Pickup Floor: {viewBooking.pickupFloorNo} <br/>
            Lift: {viewBooking.pickupLift ? "Yes ✅" : "No ❌"}
          </div>
          <div className="bg-slate-50 p-3 rounded-xl">
            Drop Floor: {viewBooking.dropFloorNo} <br/>
            Lift: {viewBooking.dropLift ? "Yes ✅" : "No ❌"}
          </div>
        </div>

        {/* ITEMS */}
        <div>
          <p className="font-black text-xs uppercase mb-2">Items</p>
          {viewBooking.items?.map((i, idx) => (
            <div key={idx} className="flex justify-between bg-slate-50 p-3 rounded-xl mb-2">
              <span>{i.name} ({i.tag}) × {i.qty}</span>
              <span>₹{i.price}</span>
            </div>
          ))}
        </div>

        {/* ADDONS */}
        {viewBooking.addons?.length > 0 && (
          <div>
            <p className="font-black text-xs uppercase mb-2">Add-ons</p>
            {viewBooking.addons.map((a, i) => (
              <div key={i} className="flex justify-between bg-emerald-50 p-3 rounded-xl">
                <span>{a.name}</span>
                <span>₹{a.price}</span>
              </div>
            ))}
          </div>
        )}

        {/* PRICING */}
        <div className="bg-sky-50 p-4 rounded-xl text-center">
          <p className="text-xs uppercase font-black">Final Amount</p>
          <p className="text-2xl font-black">₹{viewBooking.finalAmount}</p>
        </div>

      </div>
    </div>
  </div>

  
)}

{showEdit && editBooking && (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
    <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden max-h-[90vh]">
      
      {/* HEADER */}
      <div className="px-6 py-4 flex items-center justify-between border-b border-slate-100 bg-white">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Update Booking</h2>
          <p className="text-xs text-slate-500 font-medium">Edit the details for booking ID: {editBooking.id || 'N/A'}</p>
        </div>
        <button 
          onClick={() => setShowEdit(false)}
          className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400 hover:text-slate-600"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"/></svg>
        </button>
      </div>

      {/* MODAL BODY */}
      <div className="flex-1 overflow-y-auto p-6 space-y-8">
        
        {/* SECTION 1: CUSTOMER INFO */}
        <section className="space-y-4">
          <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
            <span className="w-4 h-[1px] bg-slate-200"></span> Customer Profile
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-600 ml-1">Full Name</label>
              <input
  value={editBooking.name || ""}
  readOnly
  className="w-full px-4 py-2.5 bg-slate-100 border border-slate-200 rounded-lg text-slate-500 cursor-not-allowed"
/>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-600 ml-1">Mobile Number</label>
             <input
  value={editBooking.mobile || ""}
  readOnly
  className="w-full px-4 py-2.5 bg-slate-100 border border-slate-200 rounded-lg text-slate-500 cursor-not-allowed"
/>
            </div>
            <div className="space-y-1 sm:col-span-2">
              <label className="text-xs font-semibold text-slate-600 ml-1">Email Address</label>
            <input
  value={editBooking.email || ""}
  readOnly
  className="w-full px-4 py-2.5 bg-slate-100 border border-slate-200 rounded-lg text-slate-500 cursor-not-allowed"
/>
            </div>
          </div>
        </section>

        {/* SECTION 2: LOGISTICS */}
        <section className="space-y-4">
          <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
            <span className="w-4 h-[1px] bg-slate-200"></span> Logistics Details
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-600 ml-1">Service Type</label>
              <select 
                value={editBooking.serviceType || ""} 
                onChange={(e) => setEditBooking({ ...editBooking, serviceType: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 outline-none appearance-none"
              >
                <option value="Packers">Packers & Movers</option>
                <option value="Transport">Transport Only</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-600 ml-1">Distance (KM)</label>
             <input
  value={editBooking.distance || ""}
  readOnly
  className="w-full px-4 py-2.5 bg-slate-100 border rounded-lg"
/>
            </div>
         <div className="relative space-y-1 sm:col-span-2">
  <label className="text-xs font-semibold text-slate-600 ml-1">
    Pickup Location
  </label>

  <input
    value={editBooking.pickup || ""}
    onChange={onPickupChange}
    className="w-full px-4 py-2.5 bg-slate-50 border rounded-lg"
  />

  {pickupLoading && (
    <div className="absolute right-3 top-10 w-4 h-4 border-2 border-sky-500 border-t-transparent rounded-full animate-spin" />
  )}

  {pickupPredictions.length > 0 && (
    <div className="absolute z-50 bg-white border rounded-xl shadow-lg mt-1 w-full max-h-48 overflow-y-auto">
      {pickupPredictions.map((p) => (
        <div
          key={p.place_id}
          onClick={() => handleSelectPlace(p, "pickup")}
          className="px-3 py-2 hover:bg-sky-50 cursor-pointer text-sm"
        >
          {p.description}
        </div>
      ))}
    </div>
  )}
</div>
           <div className="relative space-y-1 sm:col-span-2">
  <label className="text-xs font-semibold text-slate-600 ml-1">
    Drop Location
  </label>

  <input
    value={editBooking.drop || ""}
    onChange={onDropChange}
    className="w-full px-4 py-2.5 bg-slate-50 border rounded-lg"
  />

  {dropLoading && (
    <div className="absolute right-3 top-10 w-4 h-4 border-2 border-sky-500 border-t-transparent rounded-full animate-spin" />
  )}

  {dropPredictions.length > 0 && (
    <div className="absolute z-50 bg-white border rounded-xl shadow-lg mt-1 w-full max-h-48 overflow-y-auto">
      {dropPredictions.map((p) => (
        <div
          key={p.place_id}
          onClick={() => handleSelectPlace(p, "drop")}
          className="px-3 py-2 hover:bg-sky-50 cursor-pointer text-sm"
        >
          {p.description}
        </div>
      ))}
    </div>
  )}
</div>
          </div>
        </section>

        {/* SECTION 3: FLOOR & LIFT (BETTER VISUALS) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-4 bg-sky-50/50 rounded-2xl border border-sky-100">
            {/* Pickup Floor */}
            <div className="space-y-3">
               <label className="text-[10px] font-black uppercase text-sky-700 tracking-widest">Pickup Setup</label>
               <input 
                  type="number"
                  value={editBooking.pickupFloorNo || 0}
                  onChange={(e) => setEditBooking({...editBooking, pickupFloorNo: e.target.value})}
                  className="w-full px-4 py-2 bg-white border border-sky-200 rounded-lg outline-none"
               />
               <label className="flex items-center gap-3 cursor-pointer group">
                  <div className="relative flex items-center">
                    <input 
                      type="checkbox" 
                      className="peer h-5 w-5 cursor-pointer appearance-none rounded border border-sky-300 checked:bg-sky-600 transition-all"
                      checked={editBooking.pickupLift || false}
                      onChange={(e) => setEditBooking({...editBooking, pickupLift: e.target.checked})}
                    />
                    <svg className="absolute w-3.5 h-3.5 text-white opacity-0 peer-checked:opacity-100 pointer-events-none ml-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7"/></svg>
                  </div>
                  <span className="text-sm font-semibold text-sky-800">Lift Available</span>
               </label>
            </div>

            {/* Drop Floor */}
            <div className="space-y-3">
               <label className="text-[10px] font-black uppercase text-sky-700 tracking-widest">Drop Setup</label>
               <input 
                  type="number"
                  value={editBooking.dropFloorNo || 0}
                  onChange={(e) => setEditBooking({...editBooking, dropFloorNo: e.target.value})}
                  className="w-full px-4 py-2 bg-white border border-sky-200 rounded-lg outline-none"
               />
               <label className="flex items-center gap-3 cursor-pointer">
                  <div className="relative flex items-center">
                    <input 
                      type="checkbox" 
                      className="peer h-5 w-5 cursor-pointer appearance-none rounded border border-sky-300 checked:bg-sky-600 transition-all"
                      checked={editBooking.dropLift || false}
                      onChange={(e) => setEditBooking({...editBooking, dropLift: e.target.checked})}
                    />
                    <svg className="absolute w-3.5 h-3.5 text-white opacity-0 peer-checked:opacity-100 pointer-events-none ml-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7"/></svg>
                  </div>
                  <span className="text-sm font-semibold text-sky-800">Lift Available</span>
               </label>
            </div>
        </div>

        {/* SECTION 4: BILLING & STATUS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
           <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-600 ml-1">Final Amount (₹)</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">₹</span>
                <input 
                  value={editBooking.finalAmount || ""} 
                  onChange={(e) => setEditBooking({...editBooking, finalAmount: e.target.value})}
                  className="w-full pl-8 pr-4 py-2.5 bg-slate-900 text-white border border-slate-800 rounded-lg focus:ring-2 focus:ring-sky-500/50 outline-none"
                />
              </div>
           </div>
           <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-600 ml-1">Booking Status</label>
              <select 
                value={editBooking.status || "PENDING"} 
                onChange={(e) => setEditBooking({...editBooking, status: e.target.value})}
                className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 outline-none font-bold appearance-none transition-colors
                  ${editBooking.status === 'CONFIRMED' ? 'bg-emerald-50 border-emerald-200 text-emerald-700 focus:ring-emerald-500/20' : 
                    editBooking.status === 'CANCELLED' ? 'bg-rose-50 border-rose-200 text-rose-700 focus:ring-rose-500/20' : 
                    'bg-amber-50 border-amber-200 text-amber-700 focus:ring-amber-500/20'}`}
              >
                <option value="PENDING">PENDING</option>
                <option value="CONFIRMED">CONFIRMED</option>
                <option value="COMPLETED">COMPLETED</option>
                <option value="CANCELLED">CANCELLED</option>
              </select>
           </div>
        </div>
      </div>

      {/* FOOTER */}
      <div className="p-6 bg-slate-50/80 border-t border-slate-100 flex items-center gap-3">
        <button
          onClick={() => setShowEdit(false)}
          className="flex-1 px-4 py-3 text-sm font-bold text-slate-600 hover:bg-slate-200 rounded-xl transition-all"
        >
          Discard Changes
        </button>
        <button
          onClick={saveUpdate}
          className="flex-[2] px-4 py-3 text-sm font-bold text-white bg-sky-600 hover:bg-sky-700 shadow-lg shadow-sky-200 rounded-xl transition-all active:scale-[0.98]"
        >
          Save & Sync Updates
        </button>
      </div>
    </div>
  </div>
)}


    </div>
    
  );
}
