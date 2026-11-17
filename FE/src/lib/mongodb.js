// project mein MongoDB connection wali file.



import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("Please add MONGODB_URI in .env.local");
}

// Reuse MongoDB connection during Next.js development hot reload
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = {
    conn: null,
    promise: null,
  };
}

async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      dbName: "medvion_dev",      // medvion_dev => DB for Development.
    });
  }

  try {
    cached.conn = await cached.promise;
    console.log("MongoDB Connected Successfully!");
    return cached.conn;
  } catch (error) {
    cached.promise = null;
    console.log("MongoDB Connection Error:", error.message);
    throw error;
  }
}

export default connectDB;

