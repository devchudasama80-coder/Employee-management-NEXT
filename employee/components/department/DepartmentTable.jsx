"use client";

import { Pencil, Trash2 } from "lucide-react";

export default function DepartmentTable({ departments, onEdit, onDelete, isAdmin }) {
  if (departments.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow text-center text-gray-500">
        No departments found.
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
            <th className="px-6 py-3">Description</th>
            {isAdmin && <th className="px-6 py-3 text-center">Actions</th>}
          </tr>
        </thead>

        <tbody>
          {departments.map((dept) => (
            <tr key={dept.id} className="border-t hover:bg-gray-50">
              <td className="px-6 py-3">{dept.id}</td>
              <td className="px-6 py-3 font-medium">{dept.name}</td>
              <td className="px-6 py-3">{dept.description || "-"}</td>
              {isAdmin && (
                <td className="px-6 py-3">
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => onEdit(dept)}
                      className="p-2 text-blue-600 hover:bg-blue-100 rounded"
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      onClick={() => onDelete(dept.id)}
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