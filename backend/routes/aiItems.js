import express from "express";
import { bookingSession } from "../sessions/aiBookingSession.js";

const router = express.Router();

router.post("/items/:userId", (req, res) => {
  const userId = req.params.userId;
  bookingSession[userId].items = req.body.items;
  console.log("ITEMS SAVED:", bookingSession[userId].items);
  res.json({ success: true });
});

export default router;
