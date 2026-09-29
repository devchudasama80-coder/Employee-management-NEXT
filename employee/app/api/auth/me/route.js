import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import User from "@/models/User";
import sequelize from "@/lib/db";

export async function GET(req) {
  try {
    const decoded = getCurrentUser(req);
    if (!decoded) {
      return NextResponse.json({ message: "Not logged in" }, { status: 401 });
    }

    await sequelize.authenticate();
    const user = await User.findByPk(decoded.id, {
      attributes: ["id", "name", "email", "role", "twoFactorEnabled"],
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    
    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    console.error("Me Error:", error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}