import { NextResponse } from "next/server";
import Department from "@/models/Department";
import sequelize from "@/lib/db";
import { requireAdmin } from "@/lib/auth";

export async function GET(req, { params }) {
  try {
    await sequelize.authenticate();

    const { id } = await params;
    const department = await Department.findByPk(id);

    if (!department) {
      return NextResponse.json(
        { message: "Department not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ department }, { status: 200 });
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

    const department = await Department.findByPk(id);
    if (!department) {
      return NextResponse.json(
        { message: "Department not found" },
        { status: 404 }
      );
    }

    await department.update(body);

    return NextResponse.json(
      { message: "Department updated", department },
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

    const department = await Department.findByPk(id);
    if (!department) {
      return NextResponse.json(
        { message: "Department not found" },
        { status: 404 }
      );
    }

    await department.destroy();

    return NextResponse.json(
      { message: "Department deleted" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Delete Error:", error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}