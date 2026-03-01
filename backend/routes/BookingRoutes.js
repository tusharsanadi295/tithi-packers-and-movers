import express from "express";
import Booking from "../models/Booking.js";
import authMiddleware from "../middleware/authMiddleware.js";
import { sendBookingEmail } from "../utils/sendBookingEmail.js";

const router = express.Router();

/* =========================
   CREATE BOOKING + EMAIL
========================= */
router.post("/", async (req, res) => {
  try {
    console.log("📦 CREATE BOOKING REQ:", req.body);

    const booking = await Booking.create(req.body);

    // 📧 SEND EMAIL
    console.log("📧 Sending booking email...");
    await sendBookingEmail(booking);
    console.log("✅ Booking email sent");

    res.status(201).json({
      success: true,
      booking,
    });
  } catch (err) {
    console.error("❌ BOOKING ERROR:", err);
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

/* =========================
   GET ALL BOOKINGS (ADMIN)
========================= */
router.get("/", async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    res.json({ success: true, bookings });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

/* =========================
   GET SINGLE BOOKING
========================= */
router.get("/:id", async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    res.json({ success: true, booking });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

/* =========================
   UPDATE BOOKING (ADMIN)
========================= */
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.json({
      success: true,
      booking,
    });
  } catch (err) {
    res.status(500).json({ message: "Update failed" });
  }
});

/* =========================
   CONFIRM BOOKING
========================= */
router.put("/:id/confirm", async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    // Update allowed fields
    booking.shiftingDate = req.body.shiftingDate;
    booking.shiftingTime = req.body.shiftingTime;
    booking.addons = req.body.addons || [];
    booking.addonsTotal = req.body.addonsTotal || 0;

    // 🔥 IMPORTANT: Calculate final amount on backend
    booking.finalAmount =
      (booking.pricing?.total || 0) +
      (req.body.addonsTotal || 0);

    booking.status = "CONFIRMED";

    await booking.save();

    res.json({
      success: true,
      booking,
      bookingId: booking._id,
    });

  } catch (err) {
    console.error("CONFIRM ERROR:", err);
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});


/* =========================
   DELETE BOOKING
========================= */
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.json({ message: "Booking deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Delete failed" });
  }
});

// ✅ ADD / UPDATE ITEMS IN BOOKING
router.put("/:id/items", async (req, res) => {
  try {
    const { items, pricing } = req.body;

    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      {
        items,
        pricing,
      },
      { new: true }
    );

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    res.json({
      success: true,
      booking,
    });
  } catch (err) {
    console.error("ITEM UPDATE ERROR:", err);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});



export default router;
