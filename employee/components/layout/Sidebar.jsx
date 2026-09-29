"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, Building2 } from "lucide-react";

const menu = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Employees", href: "/employees", icon: Users },
  { name: "Departments", href: "/departments", icon: Building2 },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white border-r hidden md:flex flex-col">
      <div className="h-16 flex items-center justify-center border-b">
        <h1 className="text-xl font-bold text-blue-600">EMS</h1>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {menu.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <Icon size={18} />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t text-xs text-gray-500 text-center">
        2025 EMS
      </div>
    </aside>
  );
}