import express from "express";
import Booking from "../models/Booking.js";
import { bookingSession } from "../sessions/aiBookingSession.js";
import { isValidEmail, isValidMobile, isValidNumber } from "../utils/validators.js";
import { calculateFinalPrice } from "../utils/priceCalc.js";
import { getAIResponse } from "../utils/aiBrain.js";
const router = express.Router();

router.post("/chat/:userId", async (req,res)=>{
  const userId = req.params.userId;
  const msg = req.body.message.trim();
  const text = msg.toLowerCase();

 if (!bookingSession[userId]) bookingSession[userId] = { step:0, mode:"CHAT" };
const s = bookingSession[userId];


if (s.mode === "CHAT") {
  const reply = getAIResponse(msg, s);

  // If user triggered booking
  if (s.mode === "BOOKING") {
    s.step = 1;
    return res.json({ reply: reply + " What is your name?" });
  }

  return res.json({ reply });
}



  // 1 NAME
// Booking Step 1 Name
if (s.mode === "BOOKING" && s.step === 1) {
  s.name = msg;
  s.step = 2;
  return res.json({ reply: "Your Email?" });
}


  // 2 EMAIL
  if (s.step===2) {
    if (!isValidEmail(msg)) return res.json({ reply:"❌ Invalid email" });
    s.email=msg; s.step=3;
    return res.json({ reply:"Mobile number?" });
  }

  // 3 MOBILE
  if (s.step===3) {
    if (!isValidMobile(msg)) return res.json({ reply:"❌ Enter valid 10-digit mobile" });
    s.mobile=msg; s.step=4;
    return res.json({ reply:"Pickup location?" });
  }

  // 4 PICKUP
  if (s.step===4) {
    s.pickup=msg; s.step=5;
    return res.json({ reply:"Drop location?" });
  }

  // 5 DROP
  if (s.step===5) {
    s.drop=msg; s.step=6;
    return res.json({ reply:"Approx distance (KM)?" });
  }

  // 6 DISTANCE
  if (s.step===6) {
    if (!isValidNumber(msg)) return res.json({ reply:"Enter numeric KM" });
    s.distance=Number(msg); s.step=7;
    return res.json({ reply:"Pickup lift available? (yes/no)" });
  }

  // 7 PICKUP LIFT
  if (s.step===7) {
    s.pickupLiftAvailable = text==="yes";
    if (!s.pickupLiftAvailable) { s.step=8; return res.json({ reply:"Pickup floor number?" }); }
    s.step=9;
    return res.json({ reply:"Drop lift available? (yes/no)" });
  }

  // 8 PICKUP FLOOR
  if (s.step===8) {
    s.pickupFloorNo=Number(msg); s.step=9;
    return res.json({ reply:"Drop lift available? (yes/no)" });
  }

  // 9 DROP LIFT
  if (s.step===9) {
    s.dropLiftAvailable = text==="yes";
    if (!s.dropLiftAvailable) { s.step=10; return res.json({ reply:"Drop floor number?" }); }
    s.step=11;
    return res.json({ reply:"Select Items in UI" });
  }

  // 10 DROP FLOOR
  if (s.step===10) {
    s.dropFloorNo=Number(msg); s.step=11;
    return res.json({ reply:"Select Items in UI" });
  }

  // 11 ITEMS DONE (UI sends items_done)
 if (text === "items_done") {
  s.step = 12;
  return res.json({ reply: "Add Professional Packing addon? (yes/no)" });
}


  // 12 ADDONS
  if (s.step===12) {
    if (text==="yes") {
      s.addons=[{label:"Professional Packing",price:1500}];
      s.addonsTotal=1500;
    } else { s.addons=[]; s.addonsTotal=0; }

    s.step=13;
    return res.json({ reply:"Shifting date (YYYY-MM-DD)?" });
  }

  // 13 DATE
  if (s.step===13) {
    s.shiftingDate=msg; s.step=14;
    return res.json({ reply:"Shifting time? (Morning/Evening)" });
  }

  // 14 TIME
  if (s.step===14) {
    s.shiftingTime=msg;

    s.pricing = calculateFinalPrice(s);
    s.finalAmount = s.pricing.grandTotal;
    s.step=15;

    return res.json({ reply:`Total Price ₹${s.finalAmount}. Type CONFIRM to book.` });
  }

  // 15 CONFIRM
  if (s.step===15 && text==="confirm") {
    const booking = await Booking.create(s);
    delete bookingSession[userId];
    return res.json({ reply:`Booking Confirmed ✅ ID: ${booking._id}` });
  }

  return res.json({ reply:"Type CONFIRM to finish booking." });
});

export default router;
