"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { ArrowLeft, Mail, Phone, Briefcase, Building2, DollarSign, Calendar } from "lucide-react";

export default function EmployeeProfilePage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id;
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadEmployee() {
      try {
        const res = await fetch(`/api/employees/${id}`);
        const data = await res.json();

        if (!res.ok) {
          setError(data.message || "Employee not found");
          setLoading(false);
          return;
        }

        setEmployee(data.employee);
      } catch (err) {
        setError("Failed to load employee");
      }
      setLoading(false);
    }

    loadEmployee();
  }, [id]);

  if (loading) {
    return <div className="text-center text-gray-500">Loading...</div>;
  }

  if (error) {
    return (
      <div className="bg-red-100 text-red-700 p-4 rounded-lg">
        {error}
      </div>
    );
  }

  return (
    <div>
      <button
        onClick={() => router.push("/employees")}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-4"
      >
        <ArrowLeft size={18} />
        Back to Employees
      </button>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center gap-4 pb-6 border-b">
          <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center text-3xl font-bold text-blue-600">
            {employee.name.charAt(0).toUpperCase()}
          </div>

          <div>
            <h1 className="text-2xl font-bold text-gray-800">{employee.name}</h1>
            <p className="text-gray-500">{employee.position || "No position"}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Mail size={18} className="text-blue-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Email</p>
              <p className="font-medium">{employee.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <Phone size={18} className="text-green-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Phone</p>
              <p className="font-medium">{employee.phone || "-"}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Briefcase size={18} className="text-purple-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Position</p>
              <p className="font-medium">{employee.position || "-"}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2 bg-orange-100 rounded-lg">
              <Building2 size={18} className="text-orange-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Department</p>
              <p className="font-medium">{employee.department || "-"}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <DollarSign size={18} className="text-yellow-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Salary</p>
              <p className="font-medium">₹{employee.salary || 0}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2 bg-pink-100 rounded-lg">
              <Calendar size={18} className="text-pink-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Joined</p>
              <p className="font-medium">
                {new Date(employee.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}