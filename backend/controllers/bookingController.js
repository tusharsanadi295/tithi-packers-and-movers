import Booking from "../models/Booking.js";

/* ===============================
   1️⃣ CREATE BOOKING (STEP 1)
================================ */
export const createBooking = async (req, res) => {
  try {
    const booking = await Booking.create({
      ...req.body,
      status: "PENDING",
    });

    res.status(201).json({ success: true, booking });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


/* ===============================
   2️⃣ ADD ITEMS + BASE PRICING
================================ */
export const addItemsToBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          items: req.body.items,
          pricing: req.body.pricing, // without addons
        },
      },
      { new: true }
    );

    if (!booking) {
      return res.status(404).json({ success: false, message: "Booking not found" });
    }

    res.json({ success: true, booking });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


/* ===============================
   3️⃣ CONFIRM BOOKING (FINAL)
================================ */
export const confirmBooking = async (req, res) => {
  try {
    const { shiftingDate, shiftingTime, addons = [], addonsTotal = 0 } = req.body;

    const booking = await Booking.findById(req.params.id);
    console.log("PRICING BEFORE 👉", booking.pricing);

    if (!booking) {
      return res.status(404).json({ success: false, message: "Booking not found" });
    }

    const pricing = booking.pricing || {};

const basePrice = Number(pricing.basePrice || 0);
const extraItemCharge = Number(pricing.extraItemCharge || 0);
const floorCharge = Number(pricing.floorCharge || 0);
const distanceCharge = Number(pricing.distanceCharge || 0);
const addonsCharge = Number(addonsTotal || 0);

const finalTotal =
  basePrice +
  extraItemCharge +
  floorCharge +
  distanceCharge +
  addonsCharge;

booking.pricing = {
  ...pricing,
  addonsCharge,
  total: finalTotal
};

booking.finalAmount = finalTotal;


    await booking.save();
    await booking.save();

console.log("FINAL AMOUNT SAVED 👉", booking.finalAmount);


    return res.json({ success: true, booking });
  } catch (err) {
    console.error("CONFIRM BOOKING ERROR:", err);
    return res.status(500).json({ success: false, message: err.message });
  }
};


/* ===============================
   4️⃣ ADMIN – GET ALL BOOKINGS
================================ */
export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    res.json({ success: true, bookings });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
