import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import crypto from "crypto";
import { Op } from "sequelize";
import User from "@/models/User";
import sequelize from "@/lib/db";

export async function POST(req) {
  try {
    await sequelize.authenticate();
    const { token, password } = await req.json();

    if (!token || !password) {
      return NextResponse.json(
        { message: "Token and password are required" },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { message: "Password must be at least 6 characters" },
        { status: 400 }
      );
    }
                                                              
    const hashedToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");

    const user = await User.findOne({
      where: {
        resetPasswordToken: hashedToken,
        resetPasswordExpires: { [Op.gt]: new Date() },
      },
    });

    if (!user) {
      return NextResponse.json(
        { message: "Invalid or expired reset token" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;
    await user.save();

    return NextResponse.json(
      { message: "Password reset successful. You can now login." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Reset Password Error:", error);
    return NextResponse.json(
      { message: error.message || "Something went wrong" },
      { status: 500 }
    );
  }
}