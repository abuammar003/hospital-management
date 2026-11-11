// Is model mein email OTP store hoga, jo registration aur login dono mein use karenge.


import mongoose from "mongoose";

const otpSchema = new mongoose.Schema(
  {
    // Related user ID; registration ke pending stage mein null ho sakta hai
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    // OTP jis email par send hua
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    // OTP ka hashed version, original OTP nahi
    otpHash: {
      type: String,
      required: true,
    },

    // Registration ya login
    purpose: {
      type: String,
      enum: ["registration", "login"],
      required: true,
    },

    // OTP ki expiry (OTP expiry: 5 minutes)
    expiresAt: {
      type: Date,
      required: true,
    },

    // Galat OTP attempts count (OTP attempts: maximum 5)
    attempts: {
      type: Number,
      default: 0,
    },

    // OTP already verify/use hua ya nahi
    isUsed: {
      type: Boolean,
      default: false,
    },

    // Resend cooldown manage karne ke liye (OTP can Re-send after 60 Seconds)
    lastSentAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Automatically delete expired OTP records
otpSchema.index(
  { expiresAt: 1 },
  { expireAfterSeconds: 0 }
);

// Find OTP records by email and purpose
otpSchema.index({
  email: 1,
  purpose: 1,
  createdAt: -1,
});

const OTP = mongoose.models.OTP || mongoose.model("OTP", otpSchema);

export default OTP;
