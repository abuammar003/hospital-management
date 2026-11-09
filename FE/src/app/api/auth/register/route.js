
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import connectDB from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(request) {
  try {
    await connectDB();

    const { name, email, password, phone, role } =
      await request.json();

    // Required fields validation
    if (!name || !phone || !password || !role) {
      return NextResponse.json(
        {
          success: false,
          message: "Name, mobile number and password are required.",
        },
        { status: 400 }
      );
    }

    // Allow only these roles for public registration
    const allowedRoles = ["patient", "doctor", "hospital"];

    if (!allowedRoles.includes(role)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid user role.",
        },
        { status: 400 }
      );
    }

    // Validate mobile number
    const cleanPhone = String(phone).trim();

    if (!/^[0-9]{10}$/.test(cleanPhone)) {
      return NextResponse.json(
        {
          success: false,
          message: "Please enter a valid 10-digit mobile number.",
        },
        { status: 400 }
      );
    }

    // Validate password
    if (typeof password !== "string" || password.length < 8) {
      return NextResponse.json(
        {
          success: false,
          message: "Password must be at least 8 characters.",
        },
        { status: 400 }
      );
    }

    // Email is optional
    const cleanEmail =
      typeof email === "string" ? email.trim().toLowerCase() : "";

    if (
      cleanEmail &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Please enter a valid email address.",
        },
        { status: 400 }
      );
    }

    // Check duplicate mobile number
    const existingPhone = await User.findOne({
      phone: cleanPhone,
    });

    if (existingPhone) {
      return NextResponse.json(
        {
          success: false,
          message: "This mobile number is already registered.",
        },
        { status: 409 }
      );
    }

    // Check duplicate email only when provided
    if (cleanEmail) {
      const existingEmail = await User.findOne({
        email: cleanEmail,
      });

      if (existingEmail) {
        return NextResponse.json(
          {
            success: false,
            message: "This email is already registered.",
          },
          { status: 409 }
        );
      }
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = await User.create({
      name: name.trim(),
      phone: cleanPhone,
      ...(cleanEmail ? { email: cleanEmail } : {}),
      password: hashedPassword,
      role,
      isVerified: false,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Registration successful.",
        user: {
          id: newUser._id,
          name: newUser.name,
          phone: newUser.phone,
          email: newUser.email || null,
          role: newUser.role,
          isVerified: newUser.isVerified,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration Error:", error);

    // Handle duplicate index errors
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern || {})[0];

      const message =
        field === "phone"
          ? "This mobile number is already registered."
          : "This email is already registered.";

      return NextResponse.json(
        { success: false, message },
        { status: 409 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong during registration.",
      },
      { status: 500 }
    );
  }
}
