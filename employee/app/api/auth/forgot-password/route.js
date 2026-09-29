import { NextResponse } from "next/server";
import crypto from "crypto";
import User from "@/models/User";
import sequelize from "@/lib/db";

export async function POST(req) {
  try {
    await sequelize.authenticate();
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { message: "Email is required" },
        { status: 400 }
      );
    }

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return NextResponse.json(
        { message: "Email not found" },
        { status: 404 }
      );
    }

    const resetToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpires = new Date(Date.now() + 60 * 60 * 1000);
    await user.save(); 

    const resetLink = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password/${resetToken}`;
      return NextResponse.json(
      {
        message: "Reset link generated successfully",
        resetLink: resetLink,
      },
      { status: 200 }
    );

  } catch (error) {
    console.error("Forgot Password Error:", error);
    return NextResponse.json(
      { message: error.message || "Something went wrong" },
      { status: 500 }
    );
  }
}

