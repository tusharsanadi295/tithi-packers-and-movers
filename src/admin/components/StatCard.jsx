export default function StatCard({ title, value, icon, color }) {
  const colors = {
    sky: "bg-sky-50 text-sky-600",
    indigo: "bg-indigo-50 text-indigo-600",
    emerald: "bg-emerald-50 text-emerald-600",
    rose: "bg-rose-50 text-rose-600",
  };

  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-xs font-black uppercase text-slate-400">
            {title}
          </p>
          <p className="text-3xl font-black text-slate-800 mt-2">
            {value}
          </p>
        </div>
        <div className={`p-3 rounded-2xl ${colors[color]}`}>
          {icon}
        </div>
      </div>
    </div>
  );
}
