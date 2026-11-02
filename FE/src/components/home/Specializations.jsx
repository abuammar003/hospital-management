import Link from "next/link";

import {
  HeartPulse,
  ScanFace,
  Bone,
  Baby,
  Heart,
  Brain,
  Ear,
  Stethoscope,
  ArrowRight,
} from "lucide-react";

import { specializations } from "@/data/specializations";

const icons = {
  HeartPulse,
  ScanFace,
  Bone,
  Baby,
  Heart,
  Brain,
  Ear,
  Stethoscope,
};

const colors = {
  rose: "bg-rose-50 text-rose-600",
  purple: "bg-purple-50 text-purple-600",
  orange: "bg-orange-50 text-orange-600",
  blue: "bg-blue-50 text-blue-600",
  pink: "bg-pink-50 text-pink-600",
  teal: "bg-teal-50 text-teal-600",
  indigo: "bg-indigo-50 text-indigo-600",
  green: "bg-green-50 text-green-600",
};

export default function Specializations() {
  return (
    <section className="bg-slate-50 py-16">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">

        {/* Section Header */}
        <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">

          <div>
            <span className="text-sm font-semibold text-blue-600">
              EXPLORE SPECIALTIES
            </span>

            <h2 className="mt-2 text-3xl font-bold text-slate-900 md:text-4xl">
              Popular Specializations
            </h2>

            <p className="mt-3 text-slate-500">
              Find the right specialist for your healthcare needs.
            </p>
          </div>

          <Link
            href="/doctors"
            className="flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700"
          >
            View All
            <ArrowRight size={18} />
          </Link>
        </div>

        {/* Specializations Grid */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8">

          {specializations.map((specialization) => {
            const Icon = icons[specialization.icon];

            return (
              <Link
                key={specialization.id}
                href={`/doctors?specialization=${encodeURIComponent(
                  specialization.name
                )}`}
                className="group flex flex-col items-center rounded-2xl border border-slate-100 bg-white p-5 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg"
              >

                {/* Icon */}
                <div
                  className={`mb-4 flex h-16 w-16 items-center justify-center rounded-2xl ${colors[specialization.color]}`}
                >
                  <Icon
                    size={30}
                    strokeWidth={1.8}
                    className="transition-transform duration-300 group-hover:scale-110"
                  />
                </div>

                {/* Name */}
                <h3 className="text-sm font-semibold text-slate-700 transition-colors group-hover:text-blue-600">
                  {specialization.name}
                </h3>

              </Link>
            );
          })}

        </div>
      </div>
    </section>
  );
}