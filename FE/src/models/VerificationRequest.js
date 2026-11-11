// Medvion mein Doctor aur Hospital public platform par appear hone se pehle Superadmin se verify honge. Is model mein verification applications aur unka approval/rejection status store hoga.


import mongoose from "mongoose";

const verificationRequestSchema = new mongoose.Schema(
  {
    // 	Application submit karne wale account ka ID
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Doctor ya Hospital
    entityType: {
      type: String,
      enum: ["doctor", "hospital"],
      required: true,
    },

    // Doctor ya Hospital profile ka ID
    entityId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },

    // Medical registration certificate, hospital license etc.
    documents: [
      {
        documentType: {
          type: String,
          required: true,
          trim: true,
        },

        documentUrl: {
          type: String,
          required: true,
          trim: true,
        },
      },
    ],

    // Pending, approved ya rejected
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },

    // Verification karne wale Superadmin ka ID
    reviewedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    // Review complete hone ka time
    reviewedAt: {
      type: Date,
      default: null,
    },

    // Reject hone ka reason
    rejectionReason: {
      type: String,
      default: "",
      trim: true,
    },

    // Admin ke internal notes
    adminNotes: {
      type: String,
      default: "",
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// Find verification requests by entity and latest submission
verificationRequestSchema.index({
  entityType: 1,
  entityId: 1,
  createdAt: -1,
});

// Find pending requests efficiently
verificationRequestSchema.index({
  status: 1,
  createdAt: -1,
});

const VerificationRequest =
  mongoose.models.VerificationRequest ||
  mongoose.model("VerificationRequest", verificationRequestSchema);

export default VerificationRequest;
