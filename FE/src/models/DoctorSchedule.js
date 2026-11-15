// Is model mein doctor ke available days, consultation timings aur appointment slot duration store honge.


import mongoose from "mongoose";

const doctorScheduleSchema = new mongoose.Schema(
  {
    // Doctor ka Unique ID (Provided by US while Registering).
    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
      required: true,
    },

    // Hospital ID (Provided by US while Registering)
    hospitalId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hospital",
      required: true,
    },

    // Doctors Availble Days.
    dayOfWeek: {
      type: String,
      enum: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      required: true,
    },

    // Doctors Start Time of Work.
    startTime: {
      type: String,
      required: true,
    },

    // Doctors EndTime of Work.
    endTime: {
      type: String,
      required: true,
    },

    // Doctor' Slot's Duration. (Patient ko dikhaye jane wale slots ka)
    slotDuration: {
      type: Number,
      default: 30,
      min: 30,
    },

    // Checkup Time for Each Patient. 
    consultationDuration: {
      type: Number,
      default: 10,
      min: 5,
    },

    // Ek displayed slot mein maximum appointments (Only 3 Max)
    maxPatientsPerSlot: {
      type: Number,
      required: true,
      default: 3,
      min: 1,
    },

    // Doctor is Available or NOT.
    isAvailable: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// One schedule per doctor, hospital and weekday
doctorScheduleSchema.index(
  { doctorId: 1, hospitalId: 1, dayOfWeek: 1 },
  { unique: true }
);

const DoctorSchedule =
  mongoose.models.DoctorSchedule ||
  mongoose.model("DoctorSchedule", doctorScheduleSchema);

export default DoctorSchedule;
