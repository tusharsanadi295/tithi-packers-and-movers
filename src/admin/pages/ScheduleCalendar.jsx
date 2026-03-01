import { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

export default function ScheduleCalendar() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("http://localhost:5000/api/bookings", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        const bookings = Array.isArray(data)
          ? data
          : data.bookings || [];

        const formatted = bookings.map((b) => ({
          id: b._id,
          title: `${b.name} • ₹${b.finalAmount}`,
          date: b.shiftingDate?.slice(0, 10),
          extendedProps: b,
        }));

        setEvents(formatted);
      })
      .catch((err) => {
        console.error("Calendar fetch error:", err);
      });
  }, []);

  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200">

      <div className="mb-4">
        <h1 className="text-xl font-black text-slate-800">
          Schedule Calendar
        </h1>
        <p className="text-sm text-slate-500">
          All shifting bookings by date
        </p>
      </div>

      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        height="auto"
        events={events}
        eventColor="#0284c7"
        eventTextColor="#ffffff"
        eventClick={(info) => {
          const booking = info.event.extendedProps;
          alert(
            `Customer: ${booking.name}\nFrom: ${booking.pickup}\nTo: ${booking.drop}\nAmount: ₹${booking.finalAmount}\nMobile: ${booking.mobile}`
          );
        }}
      />
    </div>
  );
}
