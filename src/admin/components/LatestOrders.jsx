import { Eye, MapPin, IndianRupee, Calendar } from "lucide-react";

export function LatestOrders({ orders = [] }) {
  if (orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-slate-400">
        <div className="bg-slate-50 p-4 rounded-full mb-3">
          <Eye size={24} className="text-slate-300" />
        </div>
        <p className="text-sm font-medium">No completed orders found</p>
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full text-left border-separate border-spacing-0">
        <thead>
          <tr className="bg-slate-50/50">
            <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">
              Customer & Date
            </th>
            <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">
              Route Details
            </th>
            <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">
              Amount
            </th>
            <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">
              Status
            </th>
            <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 text-right">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-50">
          {orders.map((o) => (
            <tr key={o._id} className="group hover:bg-blue-50/30 transition-all duration-200">
              {/* Customer Info */}
              <td className="px-6 py-4">
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-slate-800 group-hover:text-blue-600 transition-colors">
                    {o.name || "Unknown"}
                  </span>
                  <div className="flex items-center gap-1 text-[10px] text-slate-400 mt-0.5">
                    <Calendar size={10} />
                    {new Date(o.date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })}
                  </div>
                </div>
              </td>

              {/* Route */}
              <td className="px-6 py-4">
                <div className="flex flex-col max-w-[200px]">
                  <div className="flex items-center gap-1.5 no-underline">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div>
                    <span className="text-[11px] font-medium text-slate-500 truncate">{o.pickup}</span>
                  </div>
                  <div className="flex items-center gap-1.5 mt-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400"></div>
                    <span className="text-[11px] font-medium text-slate-500 truncate">{o.drop}</span>
                  </div>
                </div>
              </td>

              {/* Amount */}
              <td className="px-6 py-4">
                <div className="flex items-center font-black text-slate-700 text-sm">
                  <IndianRupee size={12} className="text-slate-400" />
                  {o.finalAmount?.toLocaleString() || "0"}
                </div>
              </td>

              {/* Status Badge */}
              <td className="px-6 py-4">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-600 border border-emerald-100 uppercase tracking-tighter">
                  Completed
                </span>
              </td>

              {/* Action Button */}
              <td className="px-6 py-4 text-right">
                <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all active:scale-90">
                  <Eye size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}