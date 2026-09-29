"use client";

import Link from "next/link";
import { Pencil, Trash2 } from "lucide-react";

export default function EmployeeTable({ employees, onEdit, onDelete, isAdmin }) {
  if (employees.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow text-center text-gray-500">
        No employees found.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <table className="w-full text-sm text-left">
        <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
          <tr>
            <th className="px-6 py-3">ID</th>
            <th className="px-6 py-3">Name</th>
            <th className="px-6 py-3">Email</th>
            <th className="px-6 py-3">Phone</th>
            <th className="px-6 py-3">Position</th>
            <th className="px-6 py-3">Department</th>
            <th className="px-6 py-3">Salary</th>
            {isAdmin && <th className="px-6 py-3 text-center">Actions</th>}
          </tr>
        </thead>

        <tbody>
          {employees.map((emp) => (
            <tr key={emp.id} className="border-t hover:bg-gray-50">
              <td className="px-6 py-3">{emp.id}</td>
              <td className="px-6 py-3 font-medium">
                <Link
                  href={`/employees/${emp.id}`}
                  className="text-blue-600 hover:underline"
                >
                  {emp.name}
                </Link>
              </td>
              <td className="px-6 py-3">{emp.email}</td>
              <td className="px-6 py-3">{emp.phone || "-"}</td>
              <td className="px-6 py-3">{emp.position || "-"}</td>
              <td className="px-6 py-3">{emp.department || "-"}</td>
              <td className="px-6 py-3">₹{emp.salary || 0}</td>
              {isAdmin && (
                <td className="px-6 py-3">
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => onEdit(emp)}
                      className="p-2 text-blue-600 hover:bg-blue-100 rounded"
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      onClick={() => onDelete(emp.id)}
                      className="p-2 text-red-600 hover:bg-red-100 rounded"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}