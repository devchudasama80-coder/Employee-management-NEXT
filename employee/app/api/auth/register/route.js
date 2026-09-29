import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import User from "@/models/User";
import sequelize from "@/lib/db";

export async function POST(req) {
  try {
    await sequelize.authenticate();

    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    const existing = await User.findOne({ where: { email } });
    if (existing) {
      return NextResponse.json(
        { message: "Email already registered" },
        { status: 400 }
      );
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "user",
    });

    return NextResponse.json(
      {
        message: "User registered successfully",
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Register Error:", error);
    return NextResponse.json(
      { message: error.message || "Something went wrong" },
      { status: 500 }
    );
  }
}
 
