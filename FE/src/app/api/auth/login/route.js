
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import connectDB from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(request) {
  try {
    await connectDB();

    const { phone, password, role } = await request.json();

    // Required fields validation
    if (!phone || !password || !role) {
      return NextResponse.json(
        {
          success: false,
          message: "Mobile number, password and role are required.",
        },
        { status: 400 }
      );
    }

    // Validate role
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

    const cleanPhone = String(phone).trim();

    // Find user using mobile number
    const user = await User.findOne({
      phone: cleanPhone,
    });

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid mobile number or password.",
        },
        { status: 401 }
      );
    }

    // Check account status
    if (!user.isActive) {
      return NextResponse.json(
        {
          success: false,
          message: "Your account is inactive.",
        },
        { status: 403 }
      );
    }

    // Check password
    const isPasswordCorrect = await bcrypt.compare(
      password,
      user.password
    );

    if (!isPasswordCorrect) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid mobile number or password.",
        },
        { status: 401 }
      );
    }

    // Verify selected role
    if (user.role !== role) {
      return NextResponse.json(
        {
          success: false,
          message: `This account is registered as ${user.role}. Please select the correct role.`,
        },
        { status: 403 }
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
      { expiresIn: "1d" }
    );

    // Send response
    const response = NextResponse.json(
      {
        success: true,
        message: "Login successful.",
        user: {
          id: user._id,
          name: user.name,
          phone: user.phone,
          email: user.email || null,
          role: user.role,
          isVerified: user.isVerified,
        },
      },
      { status: 200 }
    );

    // Store token in HTTP-only cookie
    response.cookies.set("medvion_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24,
    });

    return response;
  } catch (error) {
    console.error("Login Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong during login.",
      },
      { status: 500 }
    );
  }
}
