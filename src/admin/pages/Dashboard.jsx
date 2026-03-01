import React, { useEffect, useState } from "react";
import { LineChart, Line, ResponsiveContainer, Tooltip } from "recharts";
import { LatestOrders } from "../components/LatestOrders";
import { UpcomingOrders } from "../components/UpcomingOrders";
import { fetchDashboardStats } from "../../api/admin";
import { Calendar, Download, RefreshCcw } from "lucide-react";

/* ---------------- MINI CHART CARD (REFINED) ---------------- */
const MiniChartCard = ({ title, value, color, data }) => {
  const colorMap = {
    blue: { text: "text-blue-600", stroke: "#2563eb", bg: "bg-blue-50" },
    emerald: { text: "text-emerald-600", stroke: "#10b981", bg: "bg-emerald-50" },
    amber: { text: "text-amber-600", stroke: "#f59e0b", bg: "bg-amber-50" },
    rose: { text: "text-rose-600", stroke: "#ef4444", bg: "bg-rose-50" },
  };
  const selected = colorMap[color] || colorMap.blue;

  return (
    <div className="bg-white p-6 rounded-[24px] border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 group">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
            {title}
          </p>
          <h2 className="text-3xl font-black text-slate-800 tracking-tight">
            {value.toLocaleString()}
          </h2>
        </div>
        <div className={`p-2 rounded-xl ${selected.bg} ${selected.text}`}>
           <RefreshCcw size={14} className="group-hover:rotate-180 transition-transform duration-500" />
        </div>
      </div>

      <div className="h-[60px] w-full mt-4 -ml-2">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <Line
              type="monotone"
              dataKey="val"
              stroke={selected.stroke}
              strokeWidth={3}
              dot={false}
              animationDuration={2000}
            />
            <Tooltip contentStyle={{ display: "none" }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

/* ---------------- DASHBOARD ---------------- */
export default function Dashboard() {
  const [stats, setStats] = useState({ total: 0, completed: 0, pending: 0, cancelled: 0 });
  const [completedOrders, setCompletedOrders] = useState([]);
  const [upcomingOrders, setUpcomingOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardStats()
      .then((data) => {
        setStats(data.stats);
        setCompletedOrders(data.completedOrders || []);
        setUpcomingOrders(data.upcomingOrders || []);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  // Loading State - Ab ye full screen text nahi, ek sundar placeholder hoga
  if (loading) {
    return <div className="p-8 space-y-8 animate-pulse">
      <div className="h-10 bg-slate-200 w-1/4 rounded-lg"></div>
      <div className="grid grid-cols-4 gap-6">
        {[1,2,3,4].map(i => <div key={i} className="h-32 bg-slate-200 rounded-3xl"></div>)}
      </div>
    </div>;
  }

  return (
    <div className="p-6 lg:p-10 bg-[#f8fafc] min-h-screen space-y-10">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-[1000] text-slate-900 tracking-tight">
            Analytics Dashboard
          </h1>
          <div className="flex items-center gap-2 mt-1">
             <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
             <p className="text-slate-500 text-sm font-medium italic">
               Real-time performance tracking
             </p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 bg-white border border-slate-200 px-4 py-2.5 rounded-xl text-sm font-bold text-slate-700 hover:bg-slate-50 transition-all">
            <Calendar size={18} />
            <span>Jan 2026</span>
          </button>
          <button className="flex items-center gap-2 bg-slate-900 text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-slate-800 shadow-xl shadow-slate-200 transition-all active:scale-95">
            <Download size={18} />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* STATS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <MiniChartCard title="Total Volume" value={stats.total} color="blue" data={chartData} />
        <MiniChartCard title="Completed" value={stats.completed} color="emerald" data={chartData} />
        <MiniChartCard title="In Progress" value={stats.pending} color="amber" data={chartData} />
        <MiniChartCard title="Loss/Cancelled" value={stats.cancelled} color="rose" data={chartData} />
      </div>

      {/* MAIN CONTENT TABLES */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* LEFT: COMPLETED ORDERS */}
        <div className="lg:col-span-8 bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden flex flex-col">
          <div className="p-8 border-b border-slate-50 flex justify-between items-center bg-white/50 backdrop-blur-sm sticky top-0 z-10">
            <div>
              <h3 className="font-black text-slate-800 text-xl tracking-tight">Recent Completions</h3>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Last 10 success stories</p>
            </div>
            <button className="text-blue-600 text-xs font-bold bg-blue-50 px-4 py-2 rounded-full hover:bg-blue-100 transition-colors">
              View All History
            </button>
          </div>
          <div className="flex-1 overflow-x-auto">
            <LatestOrders orders={completedOrders} />
          </div>
        </div>

        {/* RIGHT: UPCOMING */}
        <div className="lg:col-span-4 bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden flex flex-col">
          <div className="p-8 border-b border-slate-50 bg-white/50 backdrop-blur-sm sticky top-0 z-10">
            <h3 className="font-black text-slate-800 text-xl tracking-tight">Today's Schedule</h3>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Pending deployments</p>
          </div>
          <div className="p-6 flex-1 overflow-y-auto max-h-[600px] scrollbar-hide">
            <UpcomingOrders orders={upcomingOrders} />
          </div>
        </div>

      </div>
    </div>
  );
}

// Sparkline graph ke liye extra dummy days
const chartData = [
  { day: "M", val: 10 }, { day: "T", val: 18 }, { day: "W", val: 15 },
  { day: "T", val: 28 }, { day: "F", val: 22 }, { day: "S", val: 35 },
  { day: "S", val: 30 },
];