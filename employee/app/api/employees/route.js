import { NextResponse } from "next/server";
import Employee from "@/models/Employee";
import sequelize from "@/lib/db";
import { requireAdmin } from "@/lib/auth";

export async function POST(req) {
  const authError = requireAdmin(req);
  if (authError) return authError;

  try {
    await sequelize.authenticate();

    const { name, email, phone, position, department, salary } = await req.json();

    if (!name || !email) {
      return NextResponse.json(
        { message: "Name and email are required" },
        { status: 400 }
      );
    }

    const employee = await Employee.create({
      name,email,phone,position,department,salary,
    });

    return NextResponse.json(
      { message: "Employee created", employee },
      { status: 201 }
    );
  } catch (error) {
    console.error("Create Error:", error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    await sequelize.authenticate();

    const employees = await Employee.findAll({
      order: [["createdAt", "DESC"]],
    });

    return NextResponse.json({ employees }, { status: 200 });
  } catch (error) {
    console.error("Get Error:", error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}