
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("Please add MONGODB_URI in .env.local");
}

async function connectDB() {
  try {
    await mongoose.connect(MONGODB_URI, {
      dbName: "medvion",
    });

    console.log("MongoDB Connected Successfully!");
  } catch (error) {
    console.log("MongoDB Connection Error:", error.message);
    throw error;
  }
}

export default connectDB;
