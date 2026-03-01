// routes/customer.js

import express from "express";
import Booking from "../models/Booking.js";
import Otp from "../models/otp.js";
import { sendOtpEmail } from "../utils/sendOtpEmail.js";
import jwt from "jsonwebtoken";
import { customerAuth } from "../middleware/customerAuth.js";

const router = express.Router();

router.post("/login", async (req, res) => {
  const { mobile, email } = req.body;

  const booking = await Booking.findOne({ mobile, email });

  if (!booking) {
    return res.json({
      success: false,
      message: "Mobile and email do not match."
    });
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  await Otp.create({
    mobile,
    email,
    otp,
    expiresAt: new Date(Date.now() + 5 * 60 * 1000)
  });

  await sendOtpEmail(email, otp);

  res.json({ success: true });
});

router.post("/verify-otp", async (req, res) => {
  try {
    const { mobile, email, otp } = req.body;

    // 1️⃣ Check OTP exists
    const record = await Otp.findOne({ mobile, email, otp });

    if (!record) {
      return res.json({
        success: false,
        message: "Invalid OTP"
      });
    }

    // 2️⃣ Check expiry
    if (record.expiresAt < new Date()) {
      return res.json({
        success: false,
        message: "OTP expired"
      });
    }

    // 3️⃣ Delete OTP after successful use
    await Otp.deleteMany({ mobile, email });

    // 4️⃣ Generate JWT Token
    const token = jwt.sign(
      { mobile, email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      success: true,
      token
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false });
  }
});

router.get("/bookings", async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ success: false });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const bookings = await Booking.find({
      mobile: decoded.mobile,
      email: decoded.email
    }).sort({ createdAt: -1 });

    res.json({ success: true, bookings });

  } catch (err) {
    res.status(401).json({ success: false });
  }
});

export default router;