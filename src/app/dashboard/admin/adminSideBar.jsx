"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  LayoutDashboard,
  Building2,
  Stethoscope,
  Users,
  CalendarDays,
  ClipboardCheck,
  Settings,
  LogOut,
} from "lucide-react";

const menuItems = [
  {
    name: "Overview",
    href: "/dashboard/admin",
    icon: LayoutDashboard,
  },
  {
    name: "Hospitals",
    href: "/dashboard/admin/hospitals",
    icon: Building2,
  },
  {
    name: "Doctors",
    href: "/dashboard/admin/doctors",
    icon: Stethoscope,
  },
  {
    name: "Patients",
    href: "/dashboard/admin/patients",
    icon: Users,
  },
  {
    name: "Appointments",
    href: "/dashboard/admin/appointments",
    icon: CalendarDays,
  },
  {
    name: "Verification Requests",
    href: "/dashboard/admin/verification",
    icon: ClipboardCheck,
  },
  {
    name: "Settings",
    href: "/dashboard/admin/setting",
    icon: Settings,
  },
];

export default function SuperAdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex w-full flex-col border-r border-slate-200 bg-white lg:min-h-screen lg:w-64">

      <div className="border-b border-slate-200 p-6">
        <h2 className="text-2xl font-bold text-teal-600">
          YourHealth
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Super Admin Panel
        </p>
      </div>

      <nav className="flex-1 space-y-2 p-4">

        {menuItems.map((item) => {
          const Icon = item.icon;

          const isActive = pathname === item.href;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition ${
                isActive
                  ? "bg-teal-50 text-teal-700"
                  : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              <Icon size={20} />
              {item.name}
            </Link>
          );
        })}

      </nav>

      <div className="border-t border-slate-200 p-4">
        <button className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-red-500 hover:bg-red-50">
          <LogOut size={20} />
          Logout
        </button>
      </div>

    </aside>
  );
}