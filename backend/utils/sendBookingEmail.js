import nodemailer from "nodemailer";

export async function sendBookingEmail(booking) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.verify();

  const itemsHTML = Array.isArray(booking.items)
    ? booking.items.map(
        i => `<li>${i.name} (${i.tag || "-"}) × ${i.qty || 1} — ₹${i.price || 0}</li>`
      ).join("")
    : "<li>No items</li>";

 await transporter.sendMail({
  from: `"Tithi Packers & Movers" <${process.env.EMAIL_USER}>`,
  to: "tusharsanadi295@gmail.com",   // test / admin email
  subject: `📦 New Booking Received - ${booking.name}`,
  html: `
  <div style="font-family: Arial, sans-serif; background:#f8fafc; padding:20px;">
    <div style="max-width:700px; margin:auto; background:#ffffff; border-radius:10px; padding:20px; border:1px solid #e5e7eb;">
      
      <h2 style="color:#0f172a; margin-bottom:5px;">
        📦 New Booking Received
      </h2>
      <p style="color:#64748b; font-size:13px;">
        Tithi Packers & Movers – Admin Notification
      </p>

      <hr style="margin:15px 0;" />

      <!-- CUSTOMER DETAILS -->
      <h3 style="color:#0284c7;">👤 Customer Details</h3>
      <table width="100%" cellpadding="6">
        <tr><td><b>Name</b></td><td>${booking.name}</td></tr>
        <tr><td><b>Mobile</b></td><td>${booking.mobile}</td></tr>
        <tr><td><b>Email</b></td><td>${booking.email || "-"}</td></tr>
        <tr><td><b>Status</b></td><td><b>${booking.status || "PENDING"}</b></td></tr>
        <tr><td><b>Booked On</b></td><td>${booking.createdAt ? new Date(booking.createdAt).toLocaleString() : "-"}</td></tr>
      </table>

      <hr style="margin:15px 0;" />

      <!-- ROUTE DETAILS -->
      <h3 style="color:#0284c7;">📍 Route Details</h3>
      <p><b>Pickup:</b> ${booking.pickup}</p>
      <p><b>Drop:</b> ${booking.drop}</p>

      <p>
        <b>Pickup Floor:</b> ${booking.pickupFloorNo ?? "-"} |
        <b>Lift:</b> ${booking.pickupLift ? "Yes" : "No"}
      </p>
      <p>
        <b>Drop Floor:</b> ${booking.dropFloorNo ?? "-"} |
        <b>Lift:</b> ${booking.dropLift ? "Yes" : "No"}
      </p>

      <hr style="margin:15px 0;" />

      <!-- SHIFTING DETAILS -->
      <h3 style="color:#0284c7;">📅 Shifting Details</h3>
      <p><b>Date:</b> ${booking.shiftingDate ? new Date(booking.shiftingDate).toDateString() : "Not Scheduled"}</p>
      <p><b>Time:</b> ${booking.shiftingTime || "Anytime"}</p>
      <p><b>Distance:</b> ${booking.distance || 0} KM</p>

      <hr style="margin:15px 0;" />

      <!-- ITEMS -->
      <h3 style="color:#0284c7;">📦 Item List</h3>
      <table width="100%" border="1" cellpadding="6" cellspacing="0" style="border-collapse:collapse;">
        <tr style="background:#f1f5f9;">
          <th>#</th>
          <th>Item</th>
          <th>Size</th>
          <th>Qty</th>
          <th>Price</th>
        </tr>
        ${(booking.items || []).map((item, i) => `
          <tr>
            <td>${i + 1}</td>
            <td>${item.name}</td>
            <td>${item.tag || "-"}</td>
            <td>${item.qty || 1}</td>
            <td>₹${item.price || 0}</td>
          </tr>
        `).join("")}
      </table>

      <hr style="margin:15px 0;" />

      <!-- ADDONS -->
      <h3 style="color:#0284c7;">➕ Add-ons</h3>
      ${
        booking.addons && booking.addons.length > 0
        ? `<ul>${booking.addons.map(a => `<li>${a.name} – ₹${a.price}</li>`).join("")}</ul>`
        : `<p>No add-ons selected</p>`
      }

      <hr style="margin:15px 0;" />

      <!-- AMOUNT -->
      <h3 style="color:#16a34a;">💰 Payment Summary</h3>
      <p><b>Add-ons Total:</b> ₹${booking.addonsTotal || 0}</p>
      <p style="font-size:18px;"><b>Final Amount:</b> ₹${booking.pricing?.finalAmount || booking.finalAmount}</p>

      <hr style="margin:20px 0;" />

      <p style="text-align:center; color:#64748b; font-size:12px;">
        © ${new Date().getFullYear()} Tithi Packers & Movers<br/>
        This is an automated system email.
      </p>

    </div>
  </div>
  `
});

}
