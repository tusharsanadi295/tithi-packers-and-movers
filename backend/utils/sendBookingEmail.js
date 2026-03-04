import nodemailer from "nodemailer";

export async function sendBookingEmail(booking, type = "inquiry") {

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.verify();

  let subject =
    type === "confirmed"
      ? `📦 Booking Confirmed - ${booking.name}`
      : `🚚 New Route Inquiry - ${booking.name || "Customer"}`;

  let htmlContent;

  if (type === "inquiry") {
    htmlContent = `
      <h2>🚚 New Pickup & Drop Inquiry</h2>
      <p><b>Pickup:</b> ${booking.pickup}</p>
      <p><b>Drop:</b> ${booking.drop}</p>
      <p><b>Mobile:</b> ${booking.mobile || "-"}</p>
    `;
  } else {
    htmlContent = `
      <h2>📦 Full Booking Details</h2>
      <p><b>Name:</b> ${booking.name}</p>
      <p><b>Mobile:</b> ${booking.mobile}</p>
      <p><b>Email:</b> ${booking.email || "-"}</p>

      <hr/>

      <p><b>Pickup:</b> ${booking.pickup}</p>
      <p><b>Drop:</b> ${booking.drop}</p>

      <hr/>

      <h3>Items</h3>
      <ul>
        ${(booking.items || []).map(i =>
          `<li>${i.name} × ${i.qty} - ₹${i.price}</li>`
        ).join("")}
      </ul>

      <h3>Final Amount: ₹${booking.finalAmount || 0}</h3>
    `;
  }

  await transporter.sendMail({
    from: `"Tithi Packers & Movers" <${process.env.EMAIL_USER}>`,
    to: "tusharsanadi295@gmail.com",
    subject,
    html: htmlContent
  });
}