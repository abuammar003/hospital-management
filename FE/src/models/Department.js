
import mongoose from "mongoose";

const departmentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    hospitalId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hospital",
      required: true,
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

const Department =
  mongoose.models.Department ||
  mongoose.model("Department", departmentSchema);

export default Department;
