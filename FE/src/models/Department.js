// Hospital ke andar multiple departments ho sakte hain, jaise Cardiology, Neurology, Orthopedics, Emergency etc.


import mongoose from "mongoose";

const departmentSchema = new mongoose.Schema(
  {
    // Department kis hospital ka hai.
    hospitalId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hospital",
      required: true,
    },

    // Department ka naam.
    name: {
      type: String,
      required: true,
      trim: true,
    },

    // Department ka URL-friendly identifier.
    slug: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
      trim: true,
    },

    // Department ke head doctor ka reference; optional.
    headDoctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
      default: null,
    },

    // Department currently active hai ya nahi.
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Same hospital cannot have duplicate department names
departmentSchema.index(
  { hospitalId: 1, slug: 1 },
  { unique: true }
);

const Department =
  mongoose.models.Department ||
  mongoose.model("Department", departmentSchema);

export default Department;
