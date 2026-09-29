import sequelize from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await sequelize.authenticate();
    return NextResponse.json({
      success: true,
      message: "Database Connected Successfully",
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 }
    );
  }
}
