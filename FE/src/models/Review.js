// Is model mein patients ke reviews aur ratings store honge. Patient appointment complete hone ke baad doctor aur hospital ke liye review de sakta hai.


import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    // Review dene wale patient ka ID.
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Kis doctor ke liye review diya gaya.
    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
      required: true,
    },

    // Kis hospital se related review hai.
    hospitalId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hospital",
      required: true,
    },

    // Review ko completed appointment se connect karta hai.
    appointmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Appointment",
      required: true,
      unique: true,
    },

    // Rating 1 se 5 stars.
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },

    // Patient ka feedback.
    comment: {
      type: String,
      default: "",
      trim: true,
      maxlength: 1000,
    },

    // Admin review ko hide kar sakta hai.
    isVisible: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

reviewSchema.index({ doctorId: 1, createdAt: -1 });
reviewSchema.index({ hospitalId: 1, createdAt: -1 });

const Review =
  mongoose.models.Review || mongoose.model("Review", reviewSchema);

export default Review;
