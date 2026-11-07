
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import connectDB from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(request) {
  try {
    // Connect to MongoDB
    await connectDB();

    // Get data from frontend
    const { name, email, password, phone, role } =
      await request.json();

    // Check required fields
    if (!name || !email || !password || !phone || !role) {
      return NextResponse.json(
        {
          success: false,
          message: "All fields are required",
        },
        { status: 400 }
      );
    }

    // Allow only these roles
    const allowedRoles = ["patient", "doctor", "hospital"];

    if (!allowedRoles.includes(role)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid user role",
        },
        { status: 400 }
      );
    }

    // Basic password validation
    if (password.length < 8) {
      return NextResponse.json(
        {
          success: false,
          message: "Password must be at least 8 characters",
        },
        { status: 400 }
      );
    }

    // Check if email already exists
    const existingUser = await User.findOne({
      email: email.toLowerCase().trim(),
    });

    if (existingUser) {
      return NextResponse.json(
        {
          success: false,
          message: "Email already registered",
        },
        { status: 409 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = await User.create({
      name,
      email: email.toLowerCase().trim(),
      password: hashedPassword,
      phone,
      role,
      isVerified: false,
    });

    // Send response without password
    return NextResponse.json(
      {
        success: true,
        message: "Registration successful",
        user: {
          id: newUser._id,
          name: newUser.name,
          email: newUser.email,
          phone: newUser.phone,
          role: newUser.role,
          isVerified: newUser.isVerified,
        },
      },
      { status: 201 }
    );

  } catch (error) {
    console.log("Registration Error:", error);

    // Handle duplicate email error
    if (error.code === 11000) {
      return NextResponse.json(
        {
          success: false,
          message: "Email already registered",
        },
        { status: 409 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong during registration",
      },
      { status: 500 }
    );
  }
}
