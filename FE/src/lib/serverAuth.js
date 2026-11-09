
import jwt from "jsonwebtoken";
import User from "@/models/User";

export async function getServerUser(request) {
  try {
    const token = request.cookies.get("medvion_token")?.value;

    if (!token) {
      return null;
    }

    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is missing");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.userId).select("-password");

    if (!user || !user.isActive) {
      return null;
    }

    return user;

  } catch (error) {
    console.log("Authentication Error:", error.message);
    return null;
  }
}
