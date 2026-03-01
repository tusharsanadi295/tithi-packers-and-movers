import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import bookingRoutes from "./routes/BookingRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import adminRoutes from "./routes/admin.js"
import blogRoutes from "./routes/blogRoutes.js"
import aiBookingFlow from "./routes/aiBookingFlow.js";
import aiItems from "./routes/aiItems.js";
import customerRoutes from "./routes/customer.js";

dotenv.config();
connectDB();
const app = express();


app.use(express.urlencoded({ extended: true }));
app.use("/api/aiBooking", aiItems);

/* MIDDLEWARE */
app.use(cors({
  origin: "http://localhost:5173",
}));
app.use(express.json());
app.use("/api/customer", customerRoutes);
/* TEST ROUTE */
app.get("/", (req, res) => {
  res.send("Backend running ✅");
});

app.use(cors());
app.use(express.json());
app.use("/api/admin",adminRoutes);

app.use("/api/auth", authRoutes);

/* API ROUTES */
app.use("/api/bookings", bookingRoutes);
app.use("/api/blogs", blogRoutes);

app.use("/api/aiBooking", aiBookingFlow);


/* SERVER START */
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
