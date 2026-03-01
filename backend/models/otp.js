// models/Otp.js

import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
  mobile: String,
  email: String,
  otp: String,
  expiresAt: Date,
}, { timestamps: true });

export default mongoose.model("Otp", otpSchema);