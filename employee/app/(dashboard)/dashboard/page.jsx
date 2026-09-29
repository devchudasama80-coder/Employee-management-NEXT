"use client";

import { useEffect, useState } from "react";
import StatCard from "@/components/dashboard/StatCard";
import DepartmentChart from "@/components/dashboard/DepartmentChart";
import RecentEmployees from "@/components/dashboard/RecentEmployees";
import { Users, Building2, UserCheck } from "lucide-react";

export default function DashboardPage() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      try {
        const res = await fetch("/api/stats");
        const data = await res.json();
        setStats(data);
      } catch (error) {
        console.error("Error:", error);
      }
      setLoading(false);
    }

    loadStats();
  }, []);

  if (loading) {
    return <div className="text-center text-gray-500">Loading...</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Welcome Back 
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-6">
        <StatCard
          title="Total Employees"
          value={stats.totalEmployees}
          icon={<Users className="text-blue-600" />}
          color="bg-blue-100"
        />

        <StatCard
          title="Departments"
          value={stats.totalDepartments}
          icon={<Building2 className="text-green-600" />}
          color="bg-green-100"
        />

        <StatCard
          title="Total Users"
          value={stats.totalUsers}
          icon={<UserCheck className="text-purple-600" />}
          color="bg-purple-100"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <DepartmentChart data={stats.departmentChart} />
        <RecentEmployees employees={stats.recentEmployees} />
      </div>
    </div>
  );
}