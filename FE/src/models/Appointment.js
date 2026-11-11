// Is model mein patient ki booking details, selected doctor, hospital, appointment date, time aur booking status store hoga.


import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema(
  {
    // Booking karne wale patient ka User ID
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Selected doctor ka User ID
    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
      required: true,
    },

    // Selected Hospital ka User ID
    hospitalId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hospital",
      required: true,
    },

    // 	Related department, optional
    departmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
      default: null,
    },

    // 	Appointment ki date
    appointmentDate: {
      type: Date,
      required: true,
    },

    // Appointment timing
    startTime: {
      type: String,
      required: true,
    },

    endTime: {
      type: String,
      required: true,
    },


    reason: {
      type: String,
      default: "",
      trim: true,
    },

    notes: {
      type: String,
      default: "",
      trim: true,
    },

    // 	Booking ke waqt consultation fee
    consultationFee: {
      type: Number,
      required: true,
      min: 0,
    },

    // 	Booking ki current status
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

    // Cancel karne ka reason
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

// Useful for fetching appointments by doctor and date
appointmentSchema.index({
  doctorId: 1,
  appointmentDate: 1,
  status: 1,
});

// Useful for fetching a patient's appointments
appointmentSchema.index({
  patientId: 1,
  appointmentDate: -1,
});

const Appointment =
  mongoose.models.Appointment ||
  mongoose.model("Appointment", appointmentSchema);

export default Appointment;
