import Link from "next/link";

import {
  Stethoscope,
  Hospital,
  CalendarCheck,
  HeartPulse,
  ArrowUpRight,
} from "lucide-react";

const quickActions = [
  {
    id: 1,
    title: "Find Doctors",
    description: "Search doctors by name or specialization.",
    icon: Stethoscope,
    href: "/doctors",
    color: "blue",
  },
  {
    id: 2,
    title: "Find Hospitals",
    description: "Discover hospitals near your location.",
    icon: Hospital,
    href: "/hospitals",
    color: "teal",
  },
  {
    id: 3,
    title: "Book Appointment",
    description: "Book your doctor appointment easily.",
    icon: CalendarCheck,
    href: "/doctors",
    color: "purple",
  },
  {
    id: 4,
    title: "Manage Health",
    description: "View and manage your appointments.",
    icon: HeartPulse,
    href: "/patient",
    color: "rose",
  },
];

const colorStyles = {
  blue: "bg-blue-50 text-blue-600 group-hover:bg-blue-600",
  teal: "bg-teal-50 text-teal-600 group-hover:bg-teal-600",
  purple: "bg-purple-50 text-purple-600 group-hover:bg-purple-600",
  rose: "bg-rose-50 text-rose-600 group-hover:bg-rose-600",
};

export default function QuickActions() {
  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">

        {/* Section Heading */}
        <div className="mb-10 text-center">
          <span className="text-sm font-semibold text-blue-600">
            QUICK & EASY
          </span>

          <h2 className="mt-2 text-3xl font-bold text-slate-900 md:text-4xl">
            How Can We Help You?
          </h2>

          <p className="mt-3 text-slate-500">
            Everything you need for better healthcare in one place.
          </p>
        </div>

        {/* Quick Action Cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">

          {quickActions.map((action) => {
            const Icon = action.icon;

            return (
              <Link
                key={action.id}
                href={action.href}
                className="group rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-100 hover:shadow-xl"
              >
                {/* Icon */}
                <div
                  className={`mb-5 flex h-14 w-14 items-center justify-center rounded-xl transition-all duration-300 group-hover:text-white ${colorStyles[action.color]}`}
                >
                  <Icon size={27} />
                </div>

                {/* Title */}
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-lg font-semibold text-slate-900">
                    {action.title}
                  </h3>

                  <ArrowUpRight
                    size={19}
                    className="text-slate-400 transition-colors group-hover:text-blue-600"
                  />
                </div>

                {/* Description */}
                <p className="mt-3 text-sm leading-6 text-slate-500">
                  {action.description}
                </p>
              </Link>
            );
          })}

        </div>
      </div>
    </section>
  );
}