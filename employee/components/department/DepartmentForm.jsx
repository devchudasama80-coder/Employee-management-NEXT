"use client";

import { useState } from "react";

export default function DepartmentForm({ department, onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    name: department?.name || "",
    description: department?.description || "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const isEdit = !!department;

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const url = isEdit
        ? `/api/departments/${department.id}`
        : "/api/departments";

      

      const method = isEdit ? "PUT" : "POST";

      const res = await fetch(url, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Something went wrong");
        setLoading(false);
        return;
      }

      onSuccess();
      onClose();
    } catch (err) {
      setError("Failed to save department");
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6">
        <h2 className="text-xl font-bold mb-4">
          {isEdit ? "Edit Department" : "Add Department"}
        </h2>

        {error && (
          <div className="bg-red-100 text-red-700 p-2 rounded mb-3 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            name="name"
            placeholder="Department Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full border rounded-lg px-3 py-2"
          />

          <textarea
            name="description"
            placeholder="Description (optional)"
            value={formData.description}
            onChange={handleChange}
            rows="3"
            className="w-full border rounded-lg px-3 py-2"
          />

          <div className="flex justify-end gap-2 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? "Saving..." : isEdit ? "Update" : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}