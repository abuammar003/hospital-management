
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import connectDB from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(request) {
  try {
    // Connect to MongoDB
    await connectDB();

    // Get login details
    const { email, password } = await request.json();

    // Check required fields
    if (!email || !password) {
      return NextResponse.json(
        {
          success: false,
          message: "Email and password are required",
        },
        { status: 400 }
      );
    }

    // Find user by email
    const user = await User.findOne({
      email: email.toLowerCase().trim(),
    });

    // Check if user exists
    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid email or password",
        },
        { status: 401 }
      );
    }

    // Check if account is active
    if (!user.isActive) {
      return NextResponse.json(
        {
          success: false,
          message: "Your account is inactive",
        },
        { status: 403 }
      );
    }

    // Compare entered password with hashed password
    const isPasswordCorrect = await bcrypt.compare(
      password,
      user.password
    );

    if (!isPasswordCorrect) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid email or password",
        },
        { status: 401 }
      );
    }

    // Check JWT secret
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is missing in .env.local");
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        userId: user._id.toString(),
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    // Create response
    const response = NextResponse.json(
      {
        success: true,
        message: "Login successful",
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          role: user.role,
          isVerified: user.isVerified,
        },
      },
      { status: 200 }
    );

    // Store JWT in secure HTTP-only cookie
    response.cookies.set("medvion_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24,
    });

    return response;

  } catch (error) {
    console.log("Login Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong during login",
      },
      { status: 500 }
    );
  }
}
