"use client";

import Sidebar from "@/components/layout/Sidebar";
import Navbar from "@/components/layout/Navbar";
import { AuthProvider } from "@/context/AuthContext";

export default function DashboardLayout({ children }) {
  return (
    <AuthProvider>
      <div className="flex h-screen bg-gray-100">
        <Sidebar />

        <div className="flex flex-col flex-1 overflow-hidden">
          <Navbar />
          <main className="flex-1 overflow-y-auto p-6">
            {children}
          </main>
        </div>
      </div>
    </AuthProvider>
  );
}