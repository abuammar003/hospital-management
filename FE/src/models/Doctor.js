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

    // Doctor ka professional/display name.
    name: {
      type: String,
      required: true,
      trim: true,
    },

    // Doctor ki specialization.
    specialization: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Specialization",
      required: true,
    },

    // Educational qualification.
    qualification: {
      type: String,
      required: true,
      trim: true,
    },

    // Medical registration number.
    registrationNumber: {
      type: String,
      required: true,
      trim: true,
      uppercase: true,
    },

    // Registration kis medical council/authority ne issue kiya.
    registrationAuthority: {
      type: String,
      required: true,
      trim: true,
    },

    // Total professional experience in years.
    experience: {
      type: Number,
      default: 0,
      min: 0,
    },

    // Doctor ki professional biography.
    bio: {
      type: String,
      default: "",
      trim: true,
      maxlength: 2000,
    },

    // Doctor ki profile image URL.
    image: {
      type: String,
      default: "",
      trim: true,
    },

    // Doctor ki verification/approval status.
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

// Ek doctor account se sirf ek doctor profile.
// doctorSchema.index({ userId: 1 }, { unique: true });

// Registration number ko issuing authority ke saath unique rakhein.
doctorSchema.index(
  { registrationAuthority: 1, registrationNumber: 1 },
  { unique: true }
);

const Doctor =
  mongoose.models.Doctor || mongoose.model("Doctor", doctorSchema);

export default Doctor;
