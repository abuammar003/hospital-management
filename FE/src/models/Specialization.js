
import mongoose from "mongoose";

const specializationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Specialization =
  mongoose.models.Specialization ||
  mongoose.model("Specialization", specializationSchema);

export default Specialization;
