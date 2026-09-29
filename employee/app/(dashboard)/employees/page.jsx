"use client";

import { useEffect, useState } from "react";
import { Plus, Search } from "lucide-react";
import EmployeeTable from "@/components/employee/EmployeeTable";
import EmployeeForm from "@/components/employee/EmployeeForm";
import Pagination from "@/components/ui/Pagination";
import { useAuth } from "@/context/AuthContext";

export default function EmployeesPage() {
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";

  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editEmployee, setEditEmployee] = useState(null);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 5;

  async function loadEmployees() {
    setLoading(true);
    try {
      const res = await fetch("/api/employees");
      const data = await res.json();
      setEmployees(data.employees || []);
    } catch (error) {
      console.error("Error:", error);
    }
    setLoading(false);
  }

  useEffect(() => {
    async function fetchData() {
      await loadEmployees();
    }
    fetchData();
  }, []);

  

  function handleAdd() {
    setEditEmployee(null);
    setShowForm(true);
  }

  function handleEdit(employee) {
    setEditEmployee(employee);
    setShowForm(true);
  }

  function handleClose() {
    setShowForm(false);
    setEditEmployee(null);
  }

  async function handleDelete(id) {
    const confirmDelete = confirm("Are you sure you want to delete this employee?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`/api/employees/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        loadEmployees();
      } else {
        alert("Failed to delete employee");
      }
    } catch (error) {
      alert("Error deleting employee");
    }
  }


  const filteredEmployees = employees.filter((emp) => {
    const searchLower = search.toLowerCase();
    return (
      emp.name?.toLowerCase().includes(searchLower) ||
      emp.email?.toLowerCase().includes(searchLower) ||
      emp.department?.toLowerCase().includes(searchLower) ||
      emp.position?.toLowerCase().includes(searchLower)
    );
  });

  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentEmployees = filteredEmployees.slice(startIndex, startIndex + itemsPerPage);

  useEffect(() => {
    function resetPage() {
      setCurrentPage(1);
    }
    resetPage();
  }, [search]);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Employees</h1>

        {isAdmin && (
          <button
            onClick={handleAdd}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
          >
            <Plus size={18} />
            Add Employee
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
          placeholder="Search by name, email, department, position..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {loading ? (
        <div className="text-center text-gray-500">Loading...</div>
      ) : (
        <>
          <EmployeeTable
            employees={currentEmployees}
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
        <EmployeeForm
          employee={editEmployee}
          onClose={handleClose}
          onSuccess={loadEmployees}
        />
      )}
    </div>
  );
}