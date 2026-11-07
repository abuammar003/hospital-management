
import mongoose from "mongoose";

const doctorScheduleSchema = new mongoose.Schema(
  {
    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
      required: true,
    },

    hospitalId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hospital",
      required: true,
    },

    day: {
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

    startTime: {
      type: String,
      required: true,
    },

    endTime: {
      type: String,
      required: true,
    },

    slotDuration: {
      type: Number,
    //   default: 30,/
      min: 5,
      max: 30, 
    },

    isAvailable: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const DoctorSchedule =
  mongoose.models.DoctorSchedule ||
  mongoose.model("DoctorSchedule", doctorScheduleSchema);

export default DoctorSchedule;
