"use client";

import { useRouter } from "next/navigation";
import { LogOut, UserCircle } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const router = useRouter();
  const { user } = useAuth();

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
    router.refresh();
  };
 
  return (
    <header className="h-16 bg-white border-b flex items-center justify-between px-6">
      <h2 className="text-lg font-semibold text-gray-800">Dashboard</h2>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-gray-700">
          <UserCircle size={22} />
          <span className="text-sm font-medium">{user?.name || "Guest"}</span>
        </div>
              
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white text-sm px-3 py-1.5 rounded-lg transition"
        >
          <LogOut size={16} />
          Logout
        </button>
      </div>
    </header>
  );
}