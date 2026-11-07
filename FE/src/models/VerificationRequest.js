
import mongoose from "mongoose";

const verificationRequestSchema = new mongoose.Schema(
  {
    entityType: {
      type: String,
      enum: ["hospital", "doctor"],
      required: true,
    },

    entityId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },

    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },

    submittedAt: {
      type: Date,
      default: Date.now,
    },

    reviewedAt: {
      type: Date,
      default: null,
    },

    reviewedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    rejectionReason: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const VerificationRequest =
  mongoose.models.VerificationRequest ||
  mongoose.model("VerificationRequest", verificationRequestSchema);

export default VerificationRequest;
