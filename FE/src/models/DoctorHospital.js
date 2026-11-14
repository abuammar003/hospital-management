// Doctor ki professional information ek hi jagah rahegi, lekin hospital-wise fee alag records mein hogi.



import mongoose from "mongoose";

const doctorHospitalSchema = new mongoose.Schema(
  {
    // Associated doctor.
    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
      required: true,
    },

    // Associated hospital.
    hospitalId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hospital",
      required: true,
    },

    // Is hospital mein doctor ki consultation fee.
    consultationFee: {
      type: Number,
      required: true,
      min: 0,
    },

    // Hospital ka department jahan doctor practice karta hai.
    departmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
      default: null,
    },

    // Doctor-hospital association status.
    status: {
      type: String,
      enum: ["pending", "approved", "rejected", "inactive"],
      default: "pending",
    },

    // Association active hai ya nahi.
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Ek doctor ko ek hospital ke saath duplicate association se rokein.
doctorHospitalSchema.index(
  { doctorId: 1, hospitalId: 1 },
  { unique: true }
);

// Hospital ke doctors efficiently find karne ke liye.
doctorHospitalSchema.index({ hospitalId: 1, status: 1 });

// Doctor ke associated hospitals efficiently find karne ke liye.
doctorHospitalSchema.index({ doctorId: 1, status: 1 });

const DoctorHospital =
  mongoose.models.DoctorHospital ||
  mongoose.model("DoctorHospital", doctorHospitalSchema);

export default DoctorHospital;
