// Is model mein doctor ki medical specializations store hongi, jaise Cardiologist, Dermatologist, Neurologist etc. Doctor registration ke waqt user yahin se specialization select karega.


import mongoose from "mongoose";

const specializationSchema = new mongoose.Schema(
  {
    // Name of the Speciality, Cardiologist, Dermatologist, Dentist etc.
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    // cardiologist, dermatologist, dentist etc.
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
      trim: true,
    },

    image: {
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
