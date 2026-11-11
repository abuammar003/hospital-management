// User model mein sabhi account types ki common information store hogi.


import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    // User ka full name
    name: {
      type: String,
      required: true,
      trim: true,
    },

    // OTP isi email par send hoga
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    // Mobile number se login identify karenge
    phone: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    // Patient, Doctor, Hospital ya Superadmin
    role: {
      type: String,
      enum: ["patient", "doctor", "hospital", "superadmin"],
      required: true,
    },

    // Account active hai ya blocked 
    isActive: {
      type: Boolean,
      default: true,
    },

    // Email OTP verification complete hui ya nahi
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    // Automatically createdAt aur updatedAt
    timestamps: true,
  }
);

const User =
  mongoose.models.User || mongoose.model("User", userSchema);

export default User;
