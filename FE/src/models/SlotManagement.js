// Is model ka kaam sirf ek doctor ke ek hospital mein, ek particular date aur time ke slot ki capacity manage karna hoga.




import mongoose from "mongoose";

const slotManagementSchema = new mongoose.Schema(
  {
    // Kis doctor ka slot hai
    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
      required: true,
    },

    // Kis hospital mein slot hai
    hospitalId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hospital",
      required: true,
    },

    // Appointment ki date
    date: {
      type: Date,
      required: true,
    },

    // Patient ko dikhne wala slot time (24-hour format)
    slotTime: {
      type: String,
      required: true,
      trim: true,
    },

    // Is slot ki total booking capacity
    totalCapacity: {
      type: Number,
      required: true,
      min: 1,
    },

    // Hospital ya doctor ne online booking ke liye jitni seats block ki hain
    blockedSeats: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);

// One record per doctor, hospital, date and slot
slotManagementSchema.index(
  {
    doctorId: 1,
    hospitalId: 1,
    date: 1,
    slotTime: 1,
  },
  { unique: true }
);

// Find slots for a doctor at a hospital on a date
slotManagementSchema.index({
  hospitalId: 1,
  doctorId: 1,
  date: 1,
});

const SlotManagement =
  mongoose.models.SlotManagement ||
  mongoose.model("SlotManagement", slotManagementSchema);

export default SlotManagement;
