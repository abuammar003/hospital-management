// Is model mein hospital ki profile details, address, contact information aur verification status store hoga


import mongoose from "mongoose";

const hospitalSchema = new mongoose.Schema(
  {
    // Hospital admin ka User account.
    adminId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    // Hospital name.
    name: {
      type: String,
      required: true,
      trim: true,
    },

    // Unique URL slug.
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    // Hospital registration number.
    registrationNumber: {
      type: String,
      required: true,
      trim: true,
      uppercase: true,
    },

    description: {
      type: String,
      default: "",
      trim: true,
    },

    // Hospital address.
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

    // Hospital facilities.
    facilities: {
      type: [String],
      default: [],
    },

    image: {
      type: String,
      default: "",
      trim: true,
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

// Registration number unique rahega.
hospitalSchema.index(
  { registrationNumber: 1 },
  { unique: true }
);

const Hospital =
  mongoose.models.Hospital ||
  mongoose.model("Hospital", hospitalSchema);

export default Hospital;
