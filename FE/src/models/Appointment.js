// Is model mein patient ki booking details, selected doctor, hospital, appointment date, time aur booking status store hoga.



import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema(
  {
    // Online booking mein patient ka User ID required hoga.
    // Offline booking mein patientId null rahega.
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
      required: function () {
        return this.bookingSource === "online";
      },
    },

    // Patient ki basic details
    patientName: {
      type: String,
      required: true,
      trim: true,
    },

    patientPhone: {
      type: String,
      required: true,
      trim: true,
    },

    // Selected doctor
    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
      required: true,
    },

    // Selected hospital
    hospitalId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hospital",
      required: true,
    },

    // Optional department
    departmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
      default: null,
    },

    // Appointment date
    appointmentDate: {
      type: Date,
      required: true,
    },

    // Patient ko dikhaya jane wala slot time
    // Example: "21:00" = 9:00 PM
    bookingSlotTime: {
      type: String,
      required: true,
    },

    // Booking source
    bookingSource: {
      type: String,
      enum: ["online", "offline"],
      default: "online",
      required: true,
    },

    // Appointment reason
    reason: {
      type: String,
      default: "",
      trim: true,
    },

    // Additional notes
    notes: {
      type: String,
      default: "",
      trim: true,
    },

    // Booking ke waqt consultation fee
    consultationFee: {
      type: Number,
      required: true,
      min: 0,
    },

    // Appointment status
    status: {
      type: String,
      enum: [
        "pending",
        "confirmed",
        "rejected",
        "cancelled",
        "completed",
      ],
      default: "pending",
    },

    // Cancellation reason
    cancellationReason: {
      type: String,
      default: "",
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// Doctor + Hospital + Date + Slot ke appointments fetch karne ke liye
appointmentSchema.index({
  doctorId: 1,
  hospitalId: 1,
  appointmentDate: 1,
  bookingSlotTime: 1,
  status: 1,
});

// Patient ki appointments fetch karne ke liye
appointmentSchema.index({
  patientId: 1,
  appointmentDate: -1,
});

const Appointment =
  mongoose.models.Appointment ||
  mongoose.model("Appointment", appointmentSchema);

export default Appointment;
