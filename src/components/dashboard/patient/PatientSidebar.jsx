"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  LayoutDashboard,
  CalendarDays,
  UserRound,
  Stethoscope,
  Home,
  HeartPulse,
} from "lucide-react";

const menuItems = [
  {
    name: "Overview",
    href: "/dashboard/patient",
    icon: LayoutDashboard,
  },
  {
    name: "My Appointments",
    href: "/dashboard/patient/appointments",
    icon: CalendarDays,
  },
  {
    name: "My Profile",
    href: "/dashboard/patient/profile",
    icon: UserRound,
  },
];

export default function PatientSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-full shrink-0 border-b border-slate-200 bg-white lg:min-h-screen lg:w-64 lg:border-b-0 lg:border-r">

      {/* Logo */}
      <Link
        href="/"
        className="flex items-center gap-2 border-b border-slate-100 px-6 py-6"
      >
        <HeartPulse size={29} className="text-teal-600" />

        <span className="text-xl font-bold text-slate-900">
          Your<span className="text-teal-600">Health</span>
        </span>
      </Link>

      {/* Menu */}
      <nav className="flex gap-2 overflow-x-auto p-4 lg:flex-col">

        {menuItems.map((item) => {
          const Icon = item.icon;

          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex shrink-0 items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                isActive
                  ? "bg-teal-50 text-teal-700"
                  : "text-slate-600 hover:bg-slate-50 hover:text-teal-600"
              }`}
            >
              <Icon size={19} />

              {item.name}
            </Link>
          );
        })}

      </nav>

      {/* Quick Links */}
      <div className="hidden border-t border-slate-100 p-4 lg:block">

        <p className="mb-3 px-4 text-xs font-semibold uppercase tracking-wider text-slate-400">
          Quick Links
        </p>

        <Link
          href="/doctors"
          className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-slate-600 hover:bg-slate-50"
        >
          <Stethoscope size={19} />
          Find Doctors
        </Link>

        <Link
          href="/"
          className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-slate-600 hover:bg-slate-50"
        >
          <Home size={19} />
          Back to Home
        </Link>

      </div>

    </aside>
  );
}