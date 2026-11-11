// Is model mein doctor ki professional details store hongi. userId ke through doctor ka account User model se connect hoga.


import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema(
  {
    // Doctor ke login account se connection.
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    // Doctors Name
    name: {
      type: String,
      required: true,
      trim: true,
    },

    // Doctor ke login account se connection.
    specialization: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Specialization",
      required: true,
    },

    // Doctor Ki Qualification Collect Karna
    qualification: {
      type: String,
      required: true,
      trim: true,
    },

    // Doctor ka medical registration number; unique rahega.
    registrationNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    // Doctor Ka Experience
    experience: {
      type: Number,
      default: 0,
      min: 0,
    },

    // Doctor ki Fees
    consultationFee: {
      type: Number,
      default: 0,
      min: 0,
    },

    // Doctor ek ya multiple hospitals mein work kar sakta hai.
    hospitalIds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Hospital",
      },
    ],

    location: {
      type: String,
      default: "",
      trim: true,
    },

    bio: {
      type: String,
      default: "",
      trim: true,
    },

    image: {
      type: String,
      default: "",
    },

    // Verification approval ka status.
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
  mongoose.models.Doctor || mongoose.model("Doctor", doctorSchema);

export default Doctor;
