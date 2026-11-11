// Is model mein patient, doctor aur hospital users ke notifications store honge.


import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    // Notification kis user ke liye hai
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Notification heading
    title: {
      type: String,
      required: true,
      trim: true,
    },

    // Notification details
    message: {
      type: String,
      required: true,
      trim: true,
    },

    // Appointment, verification, review etc.
    type: {
      type: String,
      enum: [
        "appointment",
        "verification",
        "review",
        "system",
        "general",
      ],
      default: "general",
    },

    // Related appointment ya other record ka ID
    relatedId: {
      type: mongoose.Schema.Types.ObjectId,
      default: null,
    },

    // Notification read hui ya nahi
    isRead: {
      type: Boolean,
      default: false,
    },

    // Notification read karne ka time
    readAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// Fetch a user's latest notifications efficiently
notificationSchema.index({ userId: 1, createdAt: -1 });

const Notification =
  mongoose.models.Notification ||
  mongoose.model("Notification", notificationSchema);

export default Notification;
