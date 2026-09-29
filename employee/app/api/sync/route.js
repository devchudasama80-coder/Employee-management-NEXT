import { NextResponse } from "next/server";
import sequelize from "@/lib/db";
import User from "@/models/User";
import Employee from "@/models/Employee";
import Department from "@/models/Department";



export async function GET() {
  try {
    await sequelize.sync({ alter: true });
    return NextResponse.json({ message: "Database synced successfully" });
  } catch (error) {
    console.error("Sync Error:", error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}