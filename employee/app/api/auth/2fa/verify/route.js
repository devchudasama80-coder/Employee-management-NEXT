import { NextResponse } from "next/server";
import speakeasy from "speakeasy";
import crypto from "crypto";
import User from "@/models/User";
import sequelize from "@/lib/db";
import { verifyTempToken, generateToken } from "@/lib/jwt";

export async function POST(req) {
  try {
    const tempToken = req.cookies.get("2fa_temp")?.value;
    if (!tempToken) {
      return NextResponse.json(
        { message: "Session expired. Please login again." },
        { status: 401 }
      );
    }

    let decoded;
    try {
      decoded = verifyTempToken(tempToken);
    } catch {
      return NextResponse.json(
        { message: "Invalid or expired 2FA session" },
        { status: 401 }
      );
    }

    if (!decoded.twoFactorPending) {
      return NextResponse.json({ message: "Invalid session" }, { status: 401 });
    }

    const { token } = await req.json();
    if (!token) {
      return NextResponse.json({ message: "OTP required" }, { status: 400 });
    }

    await sequelize.authenticate();
    const user = await User.findByPk(decoded.id);

    if (!user || !user.twoFactorSecret) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    if (!user || !user.twoFactorSecret) {
      return NextResponse.json({message:"User not found "} , {status:404})
    }

    let verified = speakeasy.totp.verify({
      secret: user.twoFactorSecret,
      encoding: "base32",
      token,
      window: 1,
    });

    if (!verified && user.twoFactorBackupCodes) {
      const codes = JSON.parse(user.twoFactorBackupCodes);
      const index = codes.indexOf(token.toUpperCase());
      if (index !== -1) {
        verified = true;
        codes.splice(index, 1);
        user.twoFactorBackupCodes = JSON.stringify(codes);
        await user.save();
      }
    }

    if (!verified) {
      return NextResponse.json({ message: "Invalid code" }, { status: 400 });
    }

    if (!user.twoFactorBackupCodes) {
      const backupCodes = Array.from({ length: 8 }, () =>
        crypto.randomBytes(4).toString("hex").toUpperCase()
      );
      user.twoFactorBackupCodes = JSON.stringify(backupCodes);
    }

    if (!user.twoFactorEnabled) {
      user.twoFactorEnabled = true;
    }

    await user.save();

    const authToken = generateToken(user);

    const response = NextResponse.json({
      message: "Login successful",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

    response.cookies.set("token", authToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    response.cookies.set("2fa_temp", "", {
      httpOnly: true,
      expires: new Date(0),
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("2FA Verify Error:", error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}