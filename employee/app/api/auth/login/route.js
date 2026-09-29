import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import speakeasy from "speakeasy";
import qrcode from "qrcode";
import User from "@/models/User";
import sequelize from "@/lib/db";
import { generateTempToken } from "@/lib/jwt";

export async function POST(req) {
  try {
    await sequelize.authenticate();

    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password are required" },
        { status: 400 }
      );
    }

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 401 }
      );
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 401 }
      );
    }

    const tempToken = generateTempToken(user);

    const responseData = {
      message: "2FA required",
      twoFactorRequired: true,
    };

    if (!user.twoFactorSecret) {
      const secret = speakeasy.generateSecret({
        name: `EmployeeMgmt (${user.email})`,
        length: 20,
      });

      user.twoFactorSecret = secret.base32;
      user.twoFactorEnabled = true;
      await user.save();

      const qrCodeDataURL = await qrcode.toDataURL(secret.otpauth_url);

      responseData.message = "2FA setup required";
      responseData.twoFactorSetupRequired = true;
      responseData.qrCode = qrCodeDataURL;
      responseData.secret = secret.base32;
    }

    const response = NextResponse.json(responseData, { status: 200 });

    response.cookies.set("2fa_temp", tempToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 5,
    });

    return response;
  } catch (error) {
    console.error("Login Error:", error);
    return NextResponse.json(
      { message: error.message || "Something went wrong" },
      { status: 500 }
    );
  }
}