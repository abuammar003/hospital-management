// Is model mein hospital ki profile details, address, contact information aur verification status store hoga


import mongoose from "mongoose";

const hospitalSchema = new mongoose.Schema(
  {
    // Hospital account ka User model se connection.
    adminId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    // Name of the Hospital
    name: {
      type: String,
      required: true,
      trim: true,
    },

    // Hospital ka unique URL, jaise city-care-hospital.
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

  
    description: {
      type: String,
      default: "",
      trim: true,
    },

    // Hospital ka structured address.
    address: {
      street: {
        type: String,
        required: true,
        trim: true,
      },

      city: {
        type: String,
        required: true,
        trim: true,
      },

      state: {
        type: String,
        required: true,
        trim: true,
      },

      country: {
        type: String,
        default: "India",
        trim: true,
      },

      pincode: {
        type: String,
        required: true,
        trim: true,
      },
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    // ICU, Emergency, Pharmacy, Laboratory etc.
    facilities: {
      type: [String],
      default: [],
    },

    image: {
      type: String,
      default: "",
    },

    // Admin verification complete hui ya nahi.
    isVerified: {
      type: Boolean,
      default: false,
    },

    // Hospital approval status.
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

const Hospital =
  mongoose.models.Hospital ||
  mongoose.model("Hospital", hospitalSchema);

export default Hospital;
