import { NextResponse } from "next/server";
import Employee from "@/models/Employee";
import Department from "@/models/Department";
import User from "@/models/User";
import sequelize from "@/lib/db";

export async function GET() {
  try {
    await sequelize.authenticate();

    const totalEmployees = await Employee.count();
    const totalDepartments = await Department.count();
    const totalUsers = await User.count();

    const employees = await Employee.findAll();

    const deptCount = {};
    employees.forEach((emp) => {
      const dept = emp.department || "Unassigned";
      deptCount[dept] = (deptCount[dept] || 0) + 1;
    });

    const departmentChart = Object.keys(deptCount).map((name) => ({
      name,
      count: deptCount[name],
    }));

    const recentEmployees = await Employee.findAll({
      order: [["createdAt", "DESC"]],
      limit: 5,
    });

    return NextResponse.json(
      {
        totalEmployees,
        totalDepartments,
        totalUsers,
        departmentChart,
        recentEmployees,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Stats Error:", error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

