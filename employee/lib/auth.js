import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export function getCurrentUser(req) {
  try {
    const token = req.cookies.get("token")?.value;
    if (!token) return null;

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
  } catch (error) {
    return null;
  }
}

export function requireAdmin(req) {
  const user = getCurrentUser(req);

  if (!user) {
    return NextResponse.json(
      { message: "Not logged in" },
      { status: 401 }
    );
  }

  if (user.role !== "admin") {
    return NextResponse.json(
      { message: "Admin access required" },
      { status: 403 }
    );
  }

  return null;
}