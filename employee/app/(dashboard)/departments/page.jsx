"use client";

import { useEffect, useState } from "react";
import { Plus, Search } from "lucide-react";
import DepartmentTable from "@/components/department/DepartmentTable";
import DepartmentForm from "@/components/department/DepartmentForm";
import Pagination from "@/components/ui/Pagination";
import { useAuth } from "@/context/AuthContext";

export default function DepartmentsPage() {
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";

  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editDepartment, setEditDepartment] = useState(null);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  
  const itemsPerPage = 5;

  async function loadDepartments() {
    setLoading(true);
    try {
      const res = await fetch("/api/departments");
      const data = await res.json();
      setDepartments(data.departments || []);
    } catch (error) {
      console.error("Error:", error);
    }
    setLoading(false);
  }

  useEffect(() => {
    async function fetchData() {
      await loadDepartments();
    }
    fetchData();
  }, []);

  function handleAdd() {
    setEditDepartment(null);
    setShowForm(true);
  }

  function handleEdit(department) {
    setEditDepartment(department);
    setShowForm(true);
  }

  function handleClose() {
    setShowForm(false);
    setEditDepartment(null);
  }

  async function handleDelete(id) {
    const confirmDelete = confirm("Are you sure you want to delete this department?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`/api/departments/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        loadDepartments();
      } else {
        alert("Failed to delete department");
      }
    } catch (error) {
      alert("Error deleting department");
    }
  }

  const filteredDepartments = departments.filter((dept) => {
    const searchLower = search.toLowerCase();
    return (
      dept.name?.toLowerCase().includes(searchLower) ||
      dept.description?.toLowerCase().includes(searchLower)
    );
  });

  const totalPages = Math.ceil(filteredDepartments.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentDepartments = filteredDepartments.slice(startIndex, startIndex + itemsPerPage);

  useEffect(() => {
    function resetPage() {
      setCurrentPage(1);
    }
    resetPage();
  }, [search]);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Departments</h1>

        {isAdmin && (
          <button
            onClick={handleAdd}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
          >
            <Plus size={18} />
            Add Department
          </button>
        )}
      </div>

      <div className="mb-4 relative">
        <Search
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        />
        <input
          type="text"
          placeholder="Search departments..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {loading ? (
        <div className="text-center text-gray-500">Loading...</div>
      ) : (
        <>
          <DepartmentTable
            departments={currentDepartments}
            onEdit={handleEdit}
            onDelete={handleDelete}
            isAdmin={isAdmin}
          />

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </>
      )}

      {showForm && (
        <DepartmentForm
          department={editDepartment}
          onClose={handleClose}
          onSuccess={loadDepartments}
        />
      )}
    </div>
  );
}