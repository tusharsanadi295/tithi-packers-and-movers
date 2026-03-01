import express from "express";
import Booking from "../models/Booking.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

/**
 * DASHBOARD DATA
 */
router.get("/dashboard", authMiddleware, async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });

    const stats = {
      total: bookings.length,
      completed: bookings.filter(b => b.status === "COMPLETED").length,
      pending: bookings.filter(b => b.status === "PENDING").length,
      cancelled: bookings.filter(b => b.status === "CANCELLED").length,
    };

    const completedOrders = bookings
      .filter(b => b.status === "COMPLETED")
      .slice(0, 5);

    const upcomingOrders = bookings
      .filter(b => ["PENDING", "CONFIRMED"].includes(b.status))
      .slice(0, 5);

    res.json({
      stats,
      completedOrders,
      upcomingOrders,
    });
  } catch (err) {
    res.status(500).json({ message: "Dashboard data error" });
  }
});

export default router;
