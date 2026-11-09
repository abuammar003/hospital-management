
import { NextResponse } from "next/server";

export async function POST() {
  try {
    // Create response
    const response = NextResponse.json(
      {
        success: true,
        message: "Logout successful",
      },
      {
        status: 200,
      }
    );

    // Clear authentication cookie
    response.cookies.set("medvion_token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      expires: new Date(0),
    });

    return response;

  } catch (error) {
    console.log("Logout Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong during logout",
      },
      {
        status: 500,
      }
    );
  }
}
