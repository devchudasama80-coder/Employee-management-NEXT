import { NextResponse } from "next/server";
import Employee from "@/models/Employee";
import sequelize from "@/lib/db";
import { requireAdmin } from "@/lib/auth";

export async function GET(req, { params }) {
  try {
    await sequelize.authenticate();

    const { id } = await params;
    const employee = await Employee.findByPk(id);

    if (!employee) {
      return NextResponse.json(
        { message: "Employee not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ employee }, { status: 200 });
  } catch (error) {
    console.error("Get Error:", error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  const authError = requireAdmin(req);
  if (authError) return authError;

  try {
    await sequelize.authenticate();

    const { id } = await params;
    const body = await req.json();

    const employee = await Employee.findByPk(id);
    if (!employee) {
      return NextResponse.json(
        { message: "Employee not found" },
        { status: 404 }
      );
    }

    await employee.update(body);

    return NextResponse.json(
      { message: "Employee updated", employee },
      { status: 200 }
    );
  } catch (error) {
    console.error("Update Error:", error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  const authError = requireAdmin(req);
  if (authError) return authError;

  try {
    await sequelize.authenticate();

    const { id } = await params;

    const employee = await Employee.findByPk(id);
    if (!employee) {
      return NextResponse.json(
        { message: "Employee not found" },
        { status: 404 }
      );
    }

    await employee.destroy();

    return NextResponse.json(
      { message: "Employee deleted" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Delete Error:", error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}