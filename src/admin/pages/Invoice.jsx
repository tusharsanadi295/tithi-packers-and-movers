import { useEffect, useState } from "react";
import { Download, Eye } from "lucide-react";
import { generateInvoicePDF } from "../utils/invoiceGenerator";

export default function Invoices() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("http://localhost:5000/api/bookings", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        const list = Array.isArray(data)
          ? data
          : data.bookings || [];
        setBookings(list);
      });
  }, []);

  function testPDF() {
  alert("FUNCTION CALLED");
}


  return (
    <div className="space-y-6">

      <h1 className="text-2xl font-black text-slate-800">
        Invoices
      </h1>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-slate-500 uppercase text-xs font-black">
            <tr>
              <th className="p-4 text-left">Customer</th>
              <th>Date</th>
              <th>Route</th>
              <th>Amount</th>
              <th className="text-right p-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {bookings.map((b, i) => (
              <tr
                key={b._id}
                className="border-t hover:bg-slate-50"
              >
                <td className="p-4 font-bold text-slate-700">
                  {b.name}
                </td>
                <td>{b.shiftingDate?.slice(0, 10)}</td>
                <td className="text-xs">
                  {b.pickup} → {b.drop}
                </td>
                <td className="font-black text-slate-800">
                  ₹{b.finalAmount}
                </td>
                <td className="p-4 flex justify-end gap-2">
                 <button
  onClick={() => {
    
    generateInvoicePDF(b);
  }}
>
  Download
</button>

                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
