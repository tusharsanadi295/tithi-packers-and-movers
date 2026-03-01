import React, { useState } from "react";
import {
  ArrowLeft,
  ChevronDown,
  Plus,
  Minus,
  Search,
  X
} from "lucide-react";

export default function AddItemsPage() {
  const [activeRoom, setActiveRoom] = useState("Living Room");
  const [expanded, setExpanded] = useState(null);
  const [items, setItems] = useState({});
  const [showModal, setShowModal] = useState(false);

  const rooms = ["Living Room", "Bedroom", "Kitchen", "Others"];

  // SAMPLE STATIC DATA (Replace with JSON later)
  const sampleData = {
    "Living Room": [
      {
        category: "Sofa",
        items: ["3 Seater", "5 Seater"]
      },
      {
        category: "Tables",
        items: ["Center Table", "Side Table"]
      }
    ]
  };

  const handleQty = (key, type) => {
    setItems((prev) => {
      const current = prev[key] || 0;
      return {
        ...prev,
        [key]: type === "add" ? current + 1 : Math.max(0, current - 1)
      };
    });
  };

  const totalItems = Object.values(items).reduce((a, b) => a + b, 0);

  return (
    <div className="min-h-screen bg-[#F5F7FB] pb-32">

      {/* HEADER */}
      <div className="sticky top-0 bg-white z-40 border-b px-4 py-4 flex justify-between items-center">
        <ArrowLeft />
        <h1 className="font-semibold text-lg">Packers & Movers</h1>
        <button className="border border-sky-600 text-sky-600 px-4 py-2 rounded-xl text-sm font-semibold">
          Get a call
        </button>
      </div>

      {/* STEP INDICATOR */}
      <div className="bg-white px-6 py-4 border-b flex justify-between text-sm font-medium text-slate-400">
        <span className="text-green-500">Moving details</span>
        <span className="text-sky-600">Add items</span>
        <span>Schedule</span>
      </div>

      {/* ROOM TABS */}
      <div className="px-4 mt-4">
        <div className="bg-slate-100 rounded-xl p-1 flex overflow-x-auto">
          {rooms.map((room) => (
            <button
              key={room}
              onClick={() => setActiveRoom(room)}
              className={`flex-1 py-2 text-sm rounded-lg transition ${
                activeRoom === room
                  ? "bg-sky-600 text-white"
                  : "text-slate-600"
              }`}
            >
              {room}
            </button>
          ))}
        </div>
      </div>

      {/* SEARCH */}
      <div className="px-4 mt-4">
        <div className="bg-white border rounded-xl px-4 py-3 flex items-center gap-2">
          <Search size={18} className="text-slate-400" />
          <input
            placeholder="Search item"
            className="outline-none w-full text-sm"
          />
        </div>
      </div>

      {/* CATEGORY LIST */}
      <div className="px-4 mt-6 space-y-4">
        {sampleData[activeRoom]?.map((cat, i) => (
          <div key={i} className="bg-white rounded-2xl border overflow-hidden">
            <div
              onClick={() =>
                setExpanded(expanded === i ? null : i)
              }
              className="flex justify-between items-center px-5 py-4 cursor-pointer"
            >
              <span className="font-semibold">
                {cat.category}
              </span>
              <ChevronDown
                className={`transition ${
                  expanded === i ? "rotate-180" : ""
                }`}
              />
            </div>

            {expanded === i && (
              <div className="border-t">
                {cat.items.map((item) => {
                  const key = `${cat.category}-${item}`;
                  return (
                    <div
                      key={key}
                      className="flex justify-between items-center px-5 py-4 border-b last:border-0"
                    >
                      <span className="text-sm">{item}</span>

                      <div className="flex items-center gap-3 bg-slate-100 px-3 py-1 rounded-lg">
                        <button
                          onClick={() =>
                            handleQty(key, "minus")
                          }
                        >
                          <Minus size={16} />
                        </button>

                        <span className="text-sm font-semibold">
                          {items[key] || 0}
                        </span>

                        <button
                          onClick={() =>
                            handleQty(key, "add")
                          }
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* DESKTOP RIGHT SUMMARY */}
      <div className="hidden lg:block fixed right-0 top-0 h-full w-96 bg-white border-l p-6">
        <h2 className="text-lg font-semibold mb-4">
          Items Summary
        </h2>
        <p className="text-sm text-slate-500">
          {totalItems} items added
        </p>
      </div>

      {/* MOBILE BOTTOM BAR */}
      {totalItems > 0 && (
        <div className="fixed bottom-6 left-4 right-4 bg-white shadow-xl rounded-2xl border px-4 py-4 flex justify-between items-center lg:hidden">
          <div>
            <p className="text-sm font-semibold">
              {totalItems} Items added
            </p>
            <button
              onClick={() => setShowModal(true)}
              className="text-sky-600 text-xs font-semibold"
            >
              View all
            </button>
          </div>
          <button className="bg-sky-600 text-white px-6 py-3 rounded-xl font-semibold">
            Check price
          </button>
        </div>
      )}

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-end">
          <div className="bg-white w-full rounded-t-3xl p-6 max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold">
                {totalItems} Items added
              </h3>
              <button onClick={() => setShowModal(false)}>
                <X />
              </button>
            </div>
            {Object.entries(items)
              .filter(([_, qty]) => qty > 0)
              .map(([key, qty]) => (
                <div
                  key={key}
                  className="flex justify-between py-2 text-sm"
                >
                  <span>{key}</span>
                  <span>x{qty}</span>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}
