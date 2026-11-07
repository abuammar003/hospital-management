
import mongoose from "mongoose";

const hospitalSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    description: {
      type: String,
      default: "",
    },

    address: {
      street: {
        type: String,
        required: true,
      },

      city: {
        type: String,
        required: true,
      },

      state: {
        type: String,
        required: true,
      },

      country: {
        type: String,
        default: "India",
      },

      pincode: {
        type: String,
        required: true,
      },
    },

    phone: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
    },

    adminId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    facilities: {
      type: [String],
      default: [],
    },

    image: {
      type: String,
      default: "",
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

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
