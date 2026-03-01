import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    serviceType: String,
    name: String,
    email: String,
    mobile: String,
    pickup: String,
    drop: String,
    date: String,
    size: String,
    distance: Number,

    pickupLift: Boolean,
    pickupFloorNo: Number,
    dropLift: Boolean,
    dropFloorNo: Number,

    // 🔥 NEW FIELDS
    items: [
      {
        itemId: String,
        name: String,
        qty: Number,
        price: Number,
        total: Number,
      }
    ],
   status: {
    type: String,
    enum: ["PENDING", "CONFIRMED", "COMPLETED", "CANCELLED"],
    default: "PENDING",
  },
  shiftingDate: {
    type: Date,
  },

  shiftingTime: {
    type: String,
  },

  addons: [
    {
      id: String,
      label: String,
      price: Number,
    }
  ],

  addonsTotal: {
    type: Number,
    default: 0,
  },

 pricing: {
  basePrice: { type: Number, default: 0 },
  extraItemCharge: { type: Number, default: 0 },
  floorCharge: { type: Number, default: 0 },
  distanceCharge: { type: Number, default: 0 },
  addonsCharge: { type: Number, default: 0 },
  total: { type: Number, default: 0 }
},

finalAmount: { type: Number, default: 0 },

  },
  { timestamps: true }
);


export default mongoose.model("Booking", bookingSchema);
