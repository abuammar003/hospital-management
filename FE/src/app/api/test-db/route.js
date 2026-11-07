
import { NextResponse } from "next/server";

import connectDB from "@/lib/mongodb";

import User from "@/models/User";
import Hospital from "@/models/Hospital";
import Doctor from "@/models/Doctor";

export async function GET() {
  try {
    // Connect to MongoDB
    await connectDB();

    // Get database name
    const databaseName = User.db.db.databaseName;

    // Count records
    const users = await User.countDocuments();
    const hospitals = await Hospital.countDocuments();
    const doctors = await Doctor.countDocuments();

    return NextResponse.json({
      success: true,
      message: "MongoDB Connected Successfully!",
      database: databaseName,

      records: {
        users,
        hospitals,
        doctors,
      },
    });

  } catch (error) {
    console.log("Database Test Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "MongoDB Connection Failed",
        error: error.message,
      },
      {
        status: 500,
      }
    );
  }
}
