export function UpcomingOrders({ orders }) {
  return (
    <div className="space-y-4">
      {orders.map(o => (
        <div key={o._id}>
          <p className="font-bold">{o.pickup} → {o.drop}</p>
          <p className="text-xs text-slate-400">
            {new Date(o.shiftingDate).toLocaleDateString()} • {o.status}
          </p>
        </div>
      ))}
    </div>
  );
}
