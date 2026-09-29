import { NextResponse } from "next/server";
import Department from "@/models/Department";
import sequelize from "@/lib/db";
import { requireAdmin } from "@/lib/auth";

export async function POST(req) {
  const authError = requireAdmin(req);
  if (authError) return authError;

  try {
    await sequelize.authenticate();

    const { name, description } = await req.json();

    if (!name) {
      return NextResponse.json(
        { message: "Department name is required" },
        { status: 400 }
      );
    }

    const department = await Department.create({ name, description });

    return NextResponse.json(
      { message: "Department created", department },
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

    const departments = await Department.findAll({
      order: [["createdAt", "DESC"]],
    });

    return NextResponse.json({ departments }, { status: 200 });
  } catch (error) {
    console.error("Get Error:", error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}