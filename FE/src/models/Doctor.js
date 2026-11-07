
import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    specialization: {
      type: String,
      required: true,
    },

    qualification: {
      type: String,
      required: true,
    },

    experience: {
      type: Number,
      required: true,
      min: 0,
    },

    consultationFee: {
      type: Number,
      required: true,
      min: 0,
    },

    hospitalIds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Hospital",
      },
    ],

    location: {
      type: String,
      required: true,
    },

    bio: {
      type: String,
      default: "",
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

const Doctor =
  mongoose.models.Doctor ||
  mongoose.model("Doctor", doctorSchema);

export default Doctor;
